
import Stripe from 'stripe';
import { stripe_secret_key } from './config.js';


const stripe = new Stripe(stripe_secret_key);

export default stripe;
