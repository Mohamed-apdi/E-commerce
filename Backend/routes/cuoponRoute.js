import express from "express";
import {authMiddleware, isAdmin}  from "../middlewares/authMiddleware.js"
import { createCoupon, deletecoupon, getacoupon, getallcoupon, updateCoupon } from "../controller/couponControl.js";
const couponRoute = express.Router();

couponRoute.post("/", authMiddleware,  createCoupon);
couponRoute.put("/:id", authMiddleware, isAdmin, updateCoupon);
couponRoute.get("/", authMiddleware, isAdmin, getallcoupon);
couponRoute.get("/:id", authMiddleware, isAdmin, getacoupon);
couponRoute.delete("/:id", authMiddleware, isAdmin, deletecoupon);
export default couponRoute;