import express  from "express";
import  { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js"
import { 
    createCategory,
    deleteCategory,
    getacategory,
    getallcategory,
    updateCategory 
} from "../controller/blogcategoryControl.js";

const blogcategoryRoute = express.Router();

blogcategoryRoute.post("/create", authMiddleware, isAdmin,  createCategory);
blogcategoryRoute.put("/:id", authMiddleware, isAdmin,  updateCategory);
blogcategoryRoute.get("/:id", authMiddleware, isAdmin, getacategory);
blogcategoryRoute.get("/", authMiddleware, isAdmin, getallcategory);
blogcategoryRoute.delete("/:id", authMiddleware, isAdmin, deleteCategory);


export default blogcategoryRoute;