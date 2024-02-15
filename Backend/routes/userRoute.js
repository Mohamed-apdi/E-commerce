import express from "express"
import { registerUser } from "../controller/userControl.js";

const userRoute = express.Router();


userRoute.post("/register",registerUser);


export default userRoute;