import asyncHandler from "express-async-handler";
import {validateMongoDbId} from "../utils/validateMongoDbId.js"
import Color from "../models/colorModel.js";


export const createColor = asyncHandler( async (req,res) => {

    try {
        const newColor = await Color.create(req.body);
        res.json(newColor);
    } catch (error) {
        throw new Error(error);
    }
});

export const updateColor = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);

    try {
        const updateC = await Color.findByIdAndUpdate(
            id,
            req.body,
            {new:true});
        res.json(updateC)
    } catch (error) {
        throw new Error(error)
    }
});

export const getaColor = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id)
    try {
       const color = await Color.findById(id);
       res.json(color);
    } catch (error) {
        throw new Error(error);
    }

});

export const getallColor = asyncHandler(async (req,res) => {
    try {
        const color = await  Color.find();
        res.json(color);
    } catch (error) {
        throw new Error(error);
    }
});

export const deleteColor = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);

    try {
        const deleteB = await Color.findByIdAndDelete(id);
        res.json(deleteB);
    } catch (error) {
        throw new Error(error);
    }
});