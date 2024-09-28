// router file call uploadRouter
import express from 'express';
import { isAdmin, authMiddleware } from '../middlewares/authMiddleware.js';
import { uploadImages, deleteImages } from '../controller/uploadImages.js';
import { upload, resizeAndUploadImage } from '../middlewares/uploadImages.js';

const uploadRoute = express.Router();

uploadRoute.post(
    '/', 
    authMiddleware, 
    isAdmin, 
    upload.array('images', 5),
    resizeAndUploadImage);
uploadRoute.delete('/delete-img/:id', authMiddleware, isAdmin, deleteImages);

export default uploadRoute;