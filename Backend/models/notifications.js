import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    app: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: "",
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
