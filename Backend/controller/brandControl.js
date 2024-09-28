import asyncHandler from "express-async-handler";
import {validateMongoDbId} from "../utils/validateMongoDbId.js"
import Brand from "../models/brandModel.js";


export const createBrand = asyncHandler( async (req,res) => {

    try {
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch (error) {
        throw new Error(error);
    }
});

export const updateBrand = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);

    try {
        const updateC = await Brand.findByIdAndUpdate(
            id,
            req.body,
            {new:true});
        res.json(updateC)
    } catch (error) {
        throw new Error(error)
    }
});

export const getaBrand = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        const brand = await Brand.findById(id);
        res.json(brand)
    } catch (error) {
        throw new Error(error);
    }

});

export const getallBrand = asyncHandler(async (req,res) => {
    try {
        const brand = await Brand.find();
        res.json(brand);
    } catch (error) {
        throw new Error(error);
    }
});

export const deleteBrand = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);

    try {
        const deleteB = await Brand.findByIdAndDelete(id);
        res.json(deleteB);
    } catch (error) {
        throw new Error(error);
    }
});