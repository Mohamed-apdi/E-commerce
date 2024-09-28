import Category from "../models/ProductCategoryModel.js";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongoDbId.js"


export const createCategory = asyncHandler( async (req,res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});

export const updateCategory = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);

    try {
        const updateC = await Category.findByIdAndUpdate(
            id,
            req.body,
            {new:true});
        res.json(updateC)
    } catch (error) {
        throw new Error(error)
    }
});

export const getacategory = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        const category = await Category.findById(id);
        res.json(category)
    } catch (error) {
        throw new Error(error);
    }

});

export const getallcategory = asyncHandler(async (req,res) => {
    try {
        const category = await Category.find();
        res.json(category);
    } catch (error) {
        throw new Error(error);
    }
});

export const deleteCategory = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);

    try {
        const deleteC = await Category.findByIdAndDelete(id);
        res.json(deleteC);
    } catch (error) {
        throw new Error(error);
    }
});