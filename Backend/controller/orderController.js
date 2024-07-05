import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";
import Order, { orderStatusEnum } from "../models/orderModel.js";

export const createOrder = asyncHandler(async (req, res) => {
    const { paymentIntentId, couponApplied } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
  
    const user = await User.findById(_id);
    const userCart = await Cart.findOne({ orderby: user._id });
    console.log(userCart)
    
    if (!userCart || userCart.products.length === 0) {
        return res.status(400).json({ message: 'Your cart is empty' });
    }


    let finalAmount = 0;

    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount.toFixed(2);
    } else {
      finalAmount = userCart.cartTotal.toFixed(2);
    }
  
    const newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: paymentIntentId,
        amount: finalAmount,
        currency: 'usd',
        status: 'pending',
      },
      orderby: user._id,
      orderStatus: 'Payment Pending',
    }).save();
  
    // Decrease product quantity and increase sold count
    const bulkOptions = userCart.products.map(item => ({
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    }));
    await Product.bulkWrite(bulkOptions, {});
  
    res.json({ message: 'Order created successfully', newOrder });
  });


export const getSingleOrder = asyncHandler( async (req,res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const findOrder = await Order.findById(id).populate("products.product").populate("orderby").exec();
        res.send(findOrder)
    } catch (error) {
        res.send(error);
    }
})


export const getAllOrder = asyncHandler( async (req,res) => {
    try {
        const userOrders = await Order.find().populate("products.product")
        .populate("orderby").exec();
        res.json(userOrders);
    } catch (error) {
        throw new Error(error)
    }
});

export const getOrderStatusEnum = (req, res) => {
    try {
      if (!orderStatusEnum || orderStatusEnum.length === 0) {
        return res.status(404).json({ message: 'Order status enum values not found' });
      }
      res.status(200).json(orderStatusEnum);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

export const getRecentOrders =  asyncHandler( async (req,res) => {
    try {
        const userOrders = await Order.find().sort({
            createdAt: -1}).limit(2).populate("products.product")
            .populate("orderby")
            .exec();
        res.json(userOrders);
    } catch (error) {
        throw new Error(error)
    }
})

export const updateOrder = asyncHandler( async (req,res) => {
    const {status} = req.body;
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        const updateOrderStatus = await Order.findByIdAndUpdate(
            id,
            {
                orderStatus: status,
                paymentIntent:{
                    status:status
                }
            }, 
            {new:true});
        res.json(updateOrderStatus)
    } catch (error) {
        throw new Error
    }
})