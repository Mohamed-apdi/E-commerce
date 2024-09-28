import express  from "express";
import  { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js"
import { 
    createColor, 
    deleteColor, 
    getaColor, 
    getallColor, 
    updateColor,
} from "../controller/colorControl.js";

const colorRoute = express.Router();

colorRoute.post("/create", authMiddleware, isAdmin,  createColor);
colorRoute.get("/", authMiddleware, isAdmin, getallColor);
colorRoute.put("/:id", authMiddleware, isAdmin,  updateColor);
colorRoute.get("/:id", authMiddleware, isAdmin, getaColor);
colorRoute.delete("/:id", authMiddleware, isAdmin, deleteColor);


export default colorRoute
;