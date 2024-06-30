import { genereteToken } from "../config/jwtToken.js"
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";
import { genereteRefreshToken } from "../config/refreshToken.js";
import  Jwt  from "jsonwebtoken";
import { jwt_secret } from "../config/config.js";
import { sendMail } from "./emailCtrl.js";
import crypto from 'crypto';
import Product from "../models/productModel.js"
import Cart from "../models/cartModel.js";
import Coupon from "../models/couponModel.js"
import Order from "../models/orderModel.js";
import uniqid from "uniqid"

// create user
export const createUser = asyncHandler( async (req,res) => {
    const email = req.body;

    const findUser = await User.findOne(email);

    if(!findUser) {
        const newUser = new User(req.body);
        await newUser.save();
        res.json(newUser);
        }else{
            throw new Error("User Already Exists");
        }
    }
);

// login user
export const loginUser = async (req,res) => {
        const {email, password} = req.body;

        const findUser = await User.findOne({email});

        if(!findUser) return res.status(400).json({ message: "Invalid Email, please provide a valid email" });


        const isCorrectPassword = await findUser.comparePassword(password);

        if(!isCorrectPassword) return res.status(400).json({ message: "Incorrect password" });


        if(findUser && isCorrectPassword ) {
            const refreshToken = await genereteRefreshToken(findUser?._id);
            const updateuser = await User.findByIdAndUpdate(findUser.id,{
                refreshToken: refreshToken,
            },{
                new:true
            });
            updateuser.save();
            res.cookie('refreshToken', refreshToken,{
                httpOnly:true,
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            })
            res.json({
                _id: findUser?._id,
                firstname:findUser?.firstname,
                lastname:findUser?.lastname,
                email:findUser?.email,
                mobile:findUser?.mobile,
                token:genereteToken(findUser?._id),
                refreshToken: refreshToken
            })
        }
       
}

//login admin 
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const findAdmin = await User.findOne({ email });
        if (!findAdmin) return res.status(400).json({ message: "Invalid Email please provide a valid email" });
        if (findAdmin.role !== 'admin') return res.status(403).json({ message: "Not Authorized" });

        const isCorrectPassword = await findAdmin.comparePassword(password);
        if (!isCorrectPassword) return res.status(400).json({ message: "Incorrect password" });

        const refreshToken = await genereteRefreshToken(findAdmin._id);
        const updateUser = await User.findByIdAndUpdate(findAdmin.id, {
            refreshToken: refreshToken,
        }, {
            new: true
        });
        updateUser.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        res.json({
            _id: findAdmin._id,
            firstname: findAdmin.firstname,
            lastname: findAdmin.lastname,
            email: findAdmin.email,
            mobile: findAdmin.mobile,
            token: genereteToken(findAdmin._id),
            refreshToken: refreshToken
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// handle refresh token

export const handleRefreshToken = asyncHandler( async  (req,res) => {
    const cookie = req.cookies;
    if(!cookie?.refreshToken) throw new Error('No refresh token in cookies');
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});
    if(!user) throw new Error("No refresh token in DB or not matched")

    Jwt.verify(refreshToken,jwt_secret, (err, decoded) => {
        if (err || user._id.toString() !== decoded.id){
            throw new Error("There is something wrong with the refresh token")
        }
        const newAccessToken = genereteToken(user._id);
        const newRefreshToken = genereteRefreshToken(user._id);
        user.refreshToken = newRefreshToken;
        user.save();

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.json({ accessToken: newAccessToken,refreshToken:newRefreshToken });
    })

});

// logout funtion

export const logOut = asyncHandler( async (req,res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); // No content
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); // No content
    }
    await User.findOneAndUpdate({ refreshToken: refreshToken }, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204); // No content
    })



// update a user

export const updateUser = asyncHandler( async (req,res) => {
    
    const {id} = req.user;
    validateMongoDbId(id);
    const updateuser = await User.findByIdAndUpdate(id, {
        firstname: req?.body.firstname,
        lastname:req?.body.lastname,
        email:req?.body.email,
        mobile:req?.body.mobile,
    },{
        new:true,
    })

    res.json(updateuser)
    try {
        
    } catch (error) {
        throw new Error(error)
    }
})

export const getAllUser = asyncHandler(async (req,res) => {
    // sort filter limiting fieldes pagination
    try {
        const getUser = await User.find();

        res.json(getUser);
        
    } catch (error) {
        throw new Error(error)
    }
});




// save address user
export const saveUserAddress = asyncHandler(async (req,res, next) => {
    const {id} = req.user;
    validateMongoDbId(id);
    try {
        const updateuser = await User.findByIdAndUpdate(id, {
            address: req?.body.address,
        },{
            new:true,
        })
    
        res.json(updateuser)
    } catch (error) {
        throw new Error(error)
    }
})
// get a single user

export const getaUser = asyncHandler( async (req,res) => {
    
    const {id} = req.user;
    validateMongoDbId(id);
    try {

        const getaUser = await User.findById(id);

        res.json(getaUser);
        
    } catch (error) {
        throw new Error(error);
    }
})

// delete user

export const deleteUser = asyncHandler( async (req,res) => {
    
    const {id} = req.params;
    validateMongoDbId(id);
    try {

        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
        deleteaUser,
        });
        
    } catch (error) {
        throw new Error(error);
    }
})

// block user

export const blockUser = asyncHandler(async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const block = await User.findByIdAndUpdate(id, {
            isBlocked:true
        },{
            new:true
        });

        res.json({
            message: "User Blocked"
        });
``
    } catch (error) {
        throw new Error(error)
    }
})

// unblock user

export const unBlockUser = asyncHandler(async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const unblock = await User.findByIdAndUpdate(id, {
            isBlocked:false
        },{
            new:true
        });

        res.json({
            message: "User unBlocked"
        });

    } catch (error) {
        throw new Error(error)
    }
})

export const updatePassword = asyncHandler( async (req,res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(id)
    try {
        const user = await User.findById(id);
        if(password){
            user.password = password;
            const updatePassword = await user.save();
            res.json(updatePassword);
        }else{
            res.json(user)
        }
    } catch (error) {
        throw new Error(error)
    } 
})

export const forgetPasswordToken = asyncHandler( async (req,res) => {
    const {email} = req.body;
    const user = await User.findOne({email}); 
    if(!user) throw new Error("user not found with this email");
    try {
        const token = await user.createResetPasswordToken();
        await user.save();
        const resetUrl = `Hi, please follow this link to reset your password. so This link is valid till 10 minutes from now. <a href='http://localhost:5173/reset-password/${token}'>Click here</a>`;
        const data = {
            to:email,
            text:"hey, User have nice day💖✌️",
            subject:"Forget Password Link",
            html:resetUrl,
        };
        sendMail(data);

        res.json(token);
    } catch (error) {
        throw new Error(error)
    }
});



export const resetPassword = asyncHandler( async (req,res) => {
    const {password} = req.body;
    const { token } = req.params;
    const hasheToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        passwordResetToken:hasheToken,
        passwordExpires:{$gt: Date.now()},
        
    });
    if(!user) throw new Error('Token Expired, please try again later.');
    user.password = password;
    user.passwordResetToken= undefined;
    user.passwordExpires = undefined;
    await user.save();
    res.json(user);
    
})

export const getWishlist = asyncHandler( async (req,res) => {
    const {id} = req.user;

    try {
        const findUser = await User.findById(id).populate("wishlist");
        res.json(findUser);
    } catch (error) {
        throw new Error(error)
    }
})




