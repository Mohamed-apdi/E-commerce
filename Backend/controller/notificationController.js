import asyncHandler from "express-async-handler";
import Notification from "../models/notifications.js";

// POST /api/notify
export const createNotification = asyncHandler(async (req, res) => {
    const { app, title, content } = req.body;

    if (!app || !content) {
        res.status(400);
        throw new Error("App and content are required");
    }

    const notify = new Notification({ app, title, content });
    await notify.save();

    res.status(201).json(notify);
});
