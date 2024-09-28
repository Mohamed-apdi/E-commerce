import express  from "express";
import  { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js"
import { 
    createCategory, 
    deleteCategory, 
    getacategory, 
    getallcategory, 
    updateCategory 
} from "../controller/pCategoryCtrl.js";

const categoryRoute = express.Router();

categoryRoute.post("/create", authMiddleware, isAdmin,  createCategory);
categoryRoute.put("/:id", authMiddleware, isAdmin,  updateCategory);
categoryRoute.get("/:id", getacategory);
categoryRoute.get("/", getallcategory);
categoryRoute.delete("/:id", deleteCategory);

export default categoryRoute;