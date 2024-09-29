import express from "express";

export const testRou = express.Router();

testRou.get("/", (req, res) => {
    res.json({ message: "API is working correctly" });
});
