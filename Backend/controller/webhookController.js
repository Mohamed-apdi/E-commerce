// controllers/webhookController.js
import asyncHandler from 'express-async-handler';
import stripe from '../config/stripe.js';
import Order from '../models/orderModel.js';
import {stripe_webhook_key} from "../config/config.js"


export const stripeWebhook = asyncHandler(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, stripe_webhook_key);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const order = await Order.findOne({ 'paymentIntent.id': paymentIntent.id });

        if (order) {
            order.orderStatus = 'Paid';
            order.paymentIntent.status = 'succeeded';
            await order.save();
        }
    } else if (event.type === 'payment_intent.payment_failed') {
        const paymentIntent = event.data.object;
        const order = await Order.findOne({ 'paymentIntent.id': paymentIntent.id });

        if (order) {
            order.orderStatus = 'Payment Failed';
            order.paymentIntent.status = 'failed';
            await order.save();
        }
    }

    res.json({ received: true });
});
