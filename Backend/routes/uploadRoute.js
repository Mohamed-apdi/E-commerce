// router file call uploadRouter
import express from 'express';
import { isAdmin, authMiddleware } from '../middlewares/authMiddleware.js';
import { uploadImages, deleteImages } from '../controller/uploadImages.js';
import { upload, resizeAndUploadImage } from '../middlewares/uploadImages.js';

const uploadRoute = express.Router();

uploadRoute.post(
    '/', 
    upload.array('images', 1000),
    resizeAndUploadImage, uploadImages);

uploadRoute.delete('/delete-img/:id', authMiddleware, isAdmin, deleteImages);

export default uploadRoute;