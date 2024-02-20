import dotenv from "dotenv"

dotenv.config();
export const db_url = process.env.MONGO_URL;
export const PORT = process.env.PORT;
export const jwt_secret = process.env.jwt_secret;
export const email = process.env.MAIL;
export const pass = process.env.MP;