// import {cloudinaryUploadImage,cloudinaryDeleteImage} from "../utils/cloudinary.js"
// import asyncHandler from "express-async-handler";
// import fs from "fs";

// // Upload images
// export const uploadImages = asyncHandler(async (req, res) => {
//   try {
//     const uploader = (path) => cloudinaryUploadImage(path);
//     const urls = [];
//     const files = req.files;

//     for (const file of files) {
//       const { path } = file;
//       const newPath = await uploader(path);
//       urls.push(newPath);
//       fs.unlinkSync(path); // Remove file from server after uploading to Cloudinary
//     }
//     res.json(urls);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// // Delete image
// export const deleteImages = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     await cloudinaryDeleteImage(id);
//     res.json({ message: "Delete success" });
//   } catch (error) {
//     throw new Error(error);
//   }
// });


import {cloudinaryUploadImage} from "../utils/cloudinary.js";
import {cloudinaryDeleteImage} from '../utils/cloudinary.js'
import asyncHandler from "express-async-handler";
import fs from "fs"

// upload image
export const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImage(path, "images");
    const urls = [];
    const files = req.files;

    if (files.length > 5) {
      res.status(400);
      throw new Error("Maximum 5 files are allowed.");
    }

    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      // fs.unlinkSync(path); // Remove file from server after uploading to Cloudinary
    }
    res.json(urls);
  } catch (error) {
    throw new Error(error);
  }
});



  // delete image
  export const deleteImages = asyncHandler( async (req,res) => {
    const { id } = req.params;
    try {
      const deleted =  cloudinaryDeleteImage(id, "images");
    
      res.json({message:"delete success"});
    } catch (error) {
      throw new Error(error);
    }
  });