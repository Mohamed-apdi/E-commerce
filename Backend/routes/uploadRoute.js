import express from 'express';
import { isAdmin, authMiddleware } from '../middlewares/authMiddleware.js';
import { deleteImages, uploadImages } from '../controller/uploadImages.js';
import { upload } from '../middlewares/uploadImages.js';

const uploadRoute = express.Router();

uploadRoute.post('/image', authMiddleware, isAdmin, upload.array('images', 5), uploadImages);
uploadRoute.delete('/delete-img/:id', authMiddleware, isAdmin, deleteImages);

export default uploadRoute;