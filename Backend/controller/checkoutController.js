// controllers/checkoutController.js
import asyncHandler from 'express-async-handler';
import stripe from '../config/stripe.js';
import Cart from '../models/cartModel.js';
import User from '../models/userModel.js';
import { validateMongoDbId } from '../utils/validateMongoDbId.js';

export const createCheckoutSession = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    const user = await User.findById(_id);
    const userCart = await Cart.findOne({ orderby: user._id }).populate('products.product');

    if (!userCart || userCart.products.length === 0) {
        return res.status(400).json({ message: 'Your cart is empty' });
    }

    const product_items = userCart.products.map((item) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    title: item.product.title,
                },
                unit_amount: item.product.price * 100, // Stripe expects the amount in cents
            },
            quantity: item.count,
        };
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        product_items,
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/checkout-success`,
        cancel_url: `${req.protocol}://${req.get('host')}/checkout-cancel`,
        customer_email: user.email,
        client_reference_id: user._id.toString(),
    });

    res.json({ url: session.url });
});
