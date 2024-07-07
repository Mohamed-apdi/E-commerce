import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import Coupon from "../models/couponModel.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";

export const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    let products = [];
    const user = await User.findById(_id);

    // Check if user already has a cart and delete it
    const alreadyExistCart = await Cart.findOne({ orderby: user._id });
    if (alreadyExistCart) {
      await alreadyExistCart.deleteOne();
    }

    const productIds = new Set();

    for (let i = 0; i < cart.length; i++) {
      let product = await Product.findById(cart[i]._id);
      if (!product) continue; // Skip if the product doesn't exist

      // Check if the product count is 0
      if (cart[i].count === 0) {
        return res.status(400).json({ message: 'Product count cannot be zero'});
      }

      // Check if the product quantity is less than the requested count
      if (product.quantity < cart[i].count) {
        return res.status(400).json({ message: 'out of stock'});
      }

      // Check if the product is already in the cart
      if (productIds.has(cart[i]._id)) continue;
      productIds.add(cart[i]._id);

      let object = {
        product,
        count: cart[i].count,
        color: cart[i].color,
        price: product.price,
      };

      products.push(object);
    }

    if (products.length === 0) {
      return res.status(400).json({ message: 'No valid products to add to the cart' });
    }

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user._id,
    }).save();

    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

export const getUserCart = asyncHandler( async (req,res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const cart = await Cart.findOne({orderby: _id}).populate("products.product");
        if(!cart){
          return res.status(400).json({ message: 'Your cart is empty' });
        }
        res.json(cart);
        
    } catch (error) {
        throw new Error(err)
    }
})

export const emptyCart = asyncHandler(async (req,res) => {
    const {_id} = req.user;

    try {
        const user = await User.findById(_id);
        const cart = await Cart.findOneAndDelete({orderby: user._id});
        res.json(cart);
    } catch (error) {
        throw new Error(error)
    }
});

export const applyCoupon = asyncHandler( async (req,res) => {
    const { coupon } = req.body;
    const {_id} = req.user;
    validateMongoDbId(_id)
    const validCoupon = await Coupon.findOne({name: coupon});
    if(validCoupon == null){
        throw new Error("invalid coupon")
    }
    
   // Check if the coupon has expired
   const currentDate = new Date();
   if (validCoupon.expiry < currentDate) {
       throw new Error("Coupon has expired");
   }

   // Check if the coupon usage limit has been reached
   if (validCoupon.used >= validCoupon.limit) {
       throw new Error("Coupon usage limit has been reached");
   }

   // Check if the user has already used this coupon
   if (validCoupon.usedBy.includes(_id)) {
    throw new Error("You have already used this coupon");
}

    const user = await User.findOne({_id});
    let {cartTotal} = await Cart.findOne({orderby: user._id})
    .populate("products.product");
    let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);
    // Update the coupon usage count
    await Coupon.findOneAndUpdate({ name: coupon }, { $inc: { used: 1 }, $push: { usedBy: _id } });

    await Cart.findOneAndUpdate({orderby: user._id},{totalAfterDiscount},{new:true});

    res.json(totalAfterDiscount);
});