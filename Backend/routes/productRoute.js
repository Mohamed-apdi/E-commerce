import  express  from "express";
import {
    addWishlist, 
    createProduct, 
    deleteProduct, 
    getaProdect, 
    getallProdects, 
    ratings, 
    updateProduct, 
    uploudimages
} from "../controller/productControl.js";
import {isAdmin, authMiddleware} from "../middlewares/authMiddleware.js"
import { productImageResize, upload } from "../middlewares/uploadImages.js";
const productRoute = express.Router();

productRoute.post("/",authMiddleware, isAdmin, createProduct);

productRoute.put('/upload/:id',
authMiddleware,
isAdmin,
upload.array("images", 10),
productImageResize,
uploudimages);


productRoute.get("/:id",authMiddleware, getaProdect);
productRoute.put("/rating", authMiddleware, ratings);
productRoute.put("/wishlist", authMiddleware , addWishlist);

productRoute.get("/", authMiddleware, getallProdects);
productRoute.put("/:id",authMiddleware, isAdmin, updateProduct);

productRoute.delete("/delete/:id",authMiddleware, isAdmin, deleteProduct);

export default productRoute;
