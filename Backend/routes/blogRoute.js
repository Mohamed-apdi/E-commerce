import express from "express";
import { createBlog } from "../controller/blogControl.js";

const blogRoute = express.Router();

blogRoute.post('/create', createBlog);

export default blogRoute;