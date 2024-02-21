import express  from "express";
import  { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js"
import { createCategory } from "../controller/categoryControl.js";

const categoryRoute = express.Router();

categoryRoute.post("/create", authMiddleware, isAdmin,  createCategory);


export default categoryRoute;