import express from 'express';
import { stripeWebhook } from '../controller/webhookController.js';
const webhookRouter = express.Router();

webhookRouter.post('/stripe', express.json({ type: "application/json" }), stripeWebhook);

export default webhookRouter;
