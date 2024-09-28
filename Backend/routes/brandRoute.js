import express  from "express";
import  { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js"
import { 
    createBrand, 
    deleteBrand, 
    getaBrand, 
    getallBrand, 
    updateBrand,
} from "../controller/brandControl.js";

const brandRoute = express.Router();

brandRoute.post("/create", authMiddleware, isAdmin,  createBrand);
brandRoute.put("/:id", authMiddleware, isAdmin,  updateBrand);
brandRoute.get("/:id", authMiddleware, isAdmin, getaBrand);
brandRoute.get("/", authMiddleware, getallBrand);
brandRoute.delete("/:id", authMiddleware, isAdmin, deleteBrand);


export default brandRoute
;