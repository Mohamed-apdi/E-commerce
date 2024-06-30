import Coupon from "../models/couponModel.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";
import asyncHandler from "express-async-handler";


export const createCoupon = asyncHandler( async (req,res) => {
    try {
        
        const newCoupon = await Coupon.create(req.body);
        const checkCoupon = await Coupon.find(newCoupon);
        if(checkCoupon){
            throw new Error("This coupon already exist.")
        }
        res.json(newCoupon);
    } catch (error) {
        throw new Error(error)
    }
});

export const updateCoupon = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const updateC = await Coupon.findByIdAndUpdate(id, req.body,{ new:true});
        res.json(updateC);
    } catch (error) {
        throw new Error(error)
    }
});

export const getallcoupon = asyncHandler(async (req,res) => {
    try {
        const getall = await Coupon.find();
        res.json(getall)
    } catch (error) {
        throw new Error(error);
    }
});

export const getacoupon = asyncHandler(async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const getacoupn = await Coupon.findById(id);
        res.json(getacoupn);
    } catch (error) {
        throw new Error(error);
    }
});

export const deletecoupon = asyncHandler(async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);

    try {
        const deletecoupon = await Coupon.findByIdAndDelete(id);
        res.json(deletecoupon);
    } catch (error) {
        throw new Error(error)
    }
});
