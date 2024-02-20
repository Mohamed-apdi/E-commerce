import  express  from "express";
import { createProduct, deleteProduct, getaProdect, getallProdects, updateProduct } from "../controller/productControl.js";
import {isAdmin, authMiddleware} from "../middlewares/authMiddleware.js"
const productRoute = express.Router();

productRoute.post("/",authMiddleware, isAdmin, createProduct);
productRoute.get("/:id",authMiddleware, getaProdect);
productRoute.get("/", getallProdects);
productRoute.put("/:id",authMiddleware, isAdmin, updateProduct);
productRoute.delete("/delete/:id",authMiddleware, isAdmin, deleteProduct);

export default productRoute;
