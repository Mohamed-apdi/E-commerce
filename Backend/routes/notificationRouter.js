import express from "express"
import { createNotification } from "../controller/notificationController.js";

const notificationRoute = express.Router();

notificationRoute.post("/",createNotification);

export default notificationRoute;