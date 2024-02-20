import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";
import slugify from "slugify";



 // create product
export const createProduct = asyncHandler( async (req,res) => {
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
       const newProduct = await Product.create(req.body);
       res.json(newProduct);
    } catch (error) {
        throw new Error(error)
    }
});

// update product
export const updateProduct = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const product = await Product.findByIdAndUpdate(id,req.body,{new: true,});

        res.json(product);

    } catch (error) {
        throw new Error(error);
    }
});

// delete product

export const deleteProduct = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const productDelete = await Product.findByIdAndDelete(id);
        res.json({productDelete});
    } catch (error) {
         new Error(error)
    }
});

// get a single product
export const getaProdect = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {

        const product = await Product.findById(id);
        res.json(product)

    } catch (error) {
        throw new Error(error)
    }
});

// get all products
export const getallProdects = asyncHandler( async (req,res) => {
  
    try {
        // filtering
        const queryObj = {...req.query};
        const excludeFields = ['page','sort','limit','fields'];
        excludeFields.forEach((el) => delete queryObj[el] )
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte)\b/g, (match) => `$${match}`);

        let query =  Product.find(JSON.parse(queryStr));

        // sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        }

        // limiting fieldes 

        if(req.query.fields){
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        }else{
            query = query.select("-__v")
        }

        // pagination
        const page = req.query.page;
        const limit= req.query.limit;
        const skip = (page -1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page){
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error("This page does not exixts.");
        }
        console.log(page, limit, skip);

        const products = await query;
        res.json(products);
    } catch (error) {
        throw new Error(error)
    }
})
