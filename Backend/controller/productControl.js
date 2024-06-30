import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";
import slugify from "slugify";
import User from "../models/userModel.js"



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
    try {
        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }

        const product = await Product.findById(id);
        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }


        const updatedProduct  = await Product.findByIdAndUpdate(id,req.body,{new: true,});

        res.json(updatedProduct);

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

        // filtering
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
        
        // populate color field
        query = query.populate('color');
        const products = await query;
        res.json(products);

    } catch (error) {
        throw new Error(error)
    }
});



// add wishlist

export const addWishlist = asyncHandler( async (req,res) => {
    const { _id } = req.user;
    const  {prodId}  = req.body;
    try {
      const user = await User.findById(_id);
      const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
      if (alreadyadded) {
        let user = await User.findByIdAndUpdate(
          _id,
          {
            $pull: { wishlist: prodId },
          },
          {
            new: true,
          }
        );
        res.json(user);
      } else {
        let user = await User.findByIdAndUpdate(
          _id,
          {
            $push: { wishlist: prodId },
          },
          {
            new: true,
          }
        );
        res.json(user);
      }
    } catch (error) {
      throw new Error(error);
    }
});


export const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
      const product = await Product.findById(prodId);
      let alreadyRated = product.ratings.find(
        (userId) => userId.postedby.toString() === _id.toString()
      );
      if (alreadyRated) {
        const updateRating = await Product.updateOne(
          {
            ratings: { $elemMatch: alreadyRated },
          },
          {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment },
          },
          {
            new: true,
          }
        );
      } else {
        const rateProduct = await Product.findByIdAndUpdate(
          prodId,
          {
            $push: {
              ratings: {
                star: star,
                comment: comment,
                postedby: _id,
              },
            },
          },
          {
            new: true,
          }
        );
      }
      const getallratings = await Product.findById(prodId);
      let totalRating = getallratings.ratings.length;
      let ratingsum = getallratings.ratings
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0);
      let actualRating = Math.round(ratingsum / totalRating);
      let finalproduct = await Product.findByIdAndUpdate(
        prodId,
        {
          totalrating: actualRating,
        },
        { new: true }
      );
      res.json(finalproduct);
    } catch (error) {
      throw new Error(error);
    }
  });

