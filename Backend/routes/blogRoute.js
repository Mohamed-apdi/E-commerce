import express from "express";
import {isAdmin, authMiddleware} from '../middlewares/authMiddleware.js'
import { 
    allblogs,
    createBlog,
    deleteBlog,
    dislikeblog,
    getablog,
    likeblog,
    updateBlog, 
    uploudimages
} from "../controller/blogControl.js";
import { resizeAndUploadImage,  upload } from "../middlewares/uploadImages.js";
const blogRoute = express.Router();


blogRoute.post('/create',authMiddleware, isAdmin, createBlog);
blogRoute.put("/likes", authMiddleware, likeblog);
blogRoute.put("/dislikes",authMiddleware, dislikeblog);
blogRoute.get("/all-blog", authMiddleware, allblogs);
blogRoute.get("/:id", authMiddleware, getablog);
blogRoute.put("/:id", authMiddleware, isAdmin, updateBlog);
blogRoute.delete("/:id", authMiddleware, isAdmin, deleteBlog);
blogRoute.put('/upload/:id',
authMiddleware,
isAdmin,
upload.array("images", 2),
resizeAndUploadImage,
uploudimages);

export default blogRoute;