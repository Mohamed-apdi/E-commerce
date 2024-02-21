import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";
//import validateMongoDbId from "../utils/validateMongoDbId.js"


export const createCategory = asyncHandler( async (req,res) => {

    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});