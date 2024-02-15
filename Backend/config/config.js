import dotenv from "dotenv"

dotenv.config();
export const db_url = process.env.MONGO_URL;
export const PORT = process.env.PORT;