import express from 'express';
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createCheckoutSession } from '../controller/checkoutController.js';
const checkoutRoutes = express.Router();

checkoutRoutes.post('/create-checkout-session', authMiddleware, createCheckoutSession);

export default checkoutRoutes;
