import { genereteToken } from "../config/jwtToken.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";
import { genereteRefreshToken } from "../config/refreshToken.js";
import  Jwt  from "jsonwebtoken";
import { jwt_secret } from "../config/config.js";
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

        if(!findUser) return res.status(400).send("Invalid Email please provide a valid email");


        const isCorrectPassword = await findUser.comparePassword(password);

        if(!isCorrectPassword) res.status(400).send("Incorrect password");


        if(findUser && isCorrectPassword ) {
            const refreshToken = await genereteRefreshToken(findUser?._id);
            const updateuser = await User.findByIdAndUpdate(findUser.id,{
                refreshToken: refreshToken,
            },{
                new:true
            });
            res.cookie('refreshToken', refreshToken,{
                httpOnly:true,
                maxAge:72 * 60 * 60 * 1000,
            })
            res.json({
                _id: findUser?._id,
                fastname:findUser?.fastname,
                lastname:findUser?.lastname,
                email:findUser?.email,
                mobile:findUser?.mobile,
                password:findUser?.password,
                token:genereteToken(findUser?._id)
            })
        }
       
}

// handle refresh token

export const handleRefreshToken = asyncHandler( async  (req,res) => {
    const cookie = req.cookies;
    if(!cookie?.refreshToken) throw new Error('No refresh token in cookies');
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});
    if(!user) throw new Error("no refresh token in db or not matched")

    Jwt.verify(refreshToken,jwt_secret, (err, decoded) => {
        if(err || user.id !== decoded.id){
            throw new Error("there is somrthing wrong with refresh token")
        }
        const accesstoken = genereteRefreshToken(user?._id);

        res.json({accesstoken})
    })

});

// log out funtion



// update a user

export const updateUser = asyncHandler( async (req,res) => {
    
    const {_id} = req.user;
    validateMongoDbId(id);
    const updateuser = await User.findByIdAndUpdate(_id, {
        fastname: req?.body.fastname,
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

// get all users

export const getAllUser = asyncHandler(async (req,res) => {
    try {
        const getUser = await User.find();

        res.json(getUser);
        
    } catch (error) {
        throw new Error(error)
    }
});

// get a single user

export const getaUser = asyncHandler( async (req,res) => {
    
    const {id} = req.params;
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




