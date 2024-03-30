import Enquiry from "../models/enqModel.js";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";


export const createEnq = asyncHandler( async (req,res) => {
    try {
        const newEnq = await Enquiry.create(req.body);
        res.json(newEnq);
    } catch (error) {
        throw new Error(error);
    }
});

export const  getAllEnq = asyncHandler( async (req,res) => {
    try {
        const getallenq = await Enquiry.find();
        res.json(getallenq);
    } catch (error) {
      throw new Error(error);  
    }
    
});

export const  getSingleEnq = asyncHandler( async (req,res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {
        const getAenq = await Enquiry.findById(id);
        res.json(getAenq);
    } catch (error) {
      throw new Error(error);  
    }
    
});

export const updateEng = asyncHandler(async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);

    try {
        const update = await Enquiry.findByIdAndUpdate(id,req.body,{new:true});
        res.json(update);
    } catch (error) {
        throw new Error(error)
    }
});


export const deleteEng = asyncHandler(async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);

    try {
        const deleteenq = await Enquiry.findByIdAndDelete(id,{new:true});
        res.json(deleteenq);
    } catch (error) {
        throw new Error(error)
    }
});

