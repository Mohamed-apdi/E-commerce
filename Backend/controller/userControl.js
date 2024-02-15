import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"




  export const registerUser = asyncHandler( async (req,res) => {
    const email = req.body;

    const findUser = await User.findOne(email);

    if(!findUser) {
        const newUser = User.create(req.body);
            res.status(201).json(newUser);
        }else{
            throw new Error("User Already Exists");
        }
    });

    export const loginUser = async (req,res) => {
        const {email, password} = req.body;

        const findUser = await User.findOne({email});

       
    }









