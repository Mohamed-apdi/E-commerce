import dotenv from "dotenv"

dotenv.config();
export const db_url = process.env.MONGO_URL;
export const PORT = process.env.PORT;
export const jwt_secret = process.env.jwt_secret;
export const email = process.env.MAIL;
export const pass = process.env.MP;
export const cloud_name = process.env.CLOUD_NAME;
export const cloud_api = process.env.CLOUD_API_KEY;
export const cloud_secret = process.env.CLOUD_SECRET_KEY;
export const stripe_secret_key = process.env.STRIPE_SECRET_KEY;
export const stripe_webhook_key = process.env.STRIPE_WEBHOOK_SECRET;