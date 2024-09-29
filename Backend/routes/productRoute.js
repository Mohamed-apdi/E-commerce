import  express  from "express";
import {
    addWishlist, 
    createProduct, 
    deleteProduct, 
    getaProdect, 
    getallProdects, 
    ratings, 
    updateProduct, 
} from "../controller/productControl.js";


import {isAdmin, authMiddleware} from "../middlewares/authMiddleware.js"
import { resizeAndUploadImage, upload } from "../middlewares/uploadImages.js";
import { uploadImages } from "../controller/uploadImages.js";
const productRoute = express.Router();

productRoute.post("/",authMiddleware, isAdmin, upload.array("images", 5), uploadImages, resizeAndUploadImage, createProduct);




productRoute.get("/:id",authMiddleware, getaProdect);
productRoute.put("/rating", authMiddleware, ratings);
productRoute.put("/wishlist", authMiddleware , addWishlist);

productRoute.get("/", authMiddleware , getallProdects);
productRoute.put("/:id",authMiddleware, isAdmin, updateProduct);

productRoute.delete("/delete/:id",authMiddleware, isAdmin, deleteProduct);

export default productRoute;
