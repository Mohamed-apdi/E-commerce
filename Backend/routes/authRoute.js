import express from "express"
import { 
    getAllUser, 
    loginUser, 
    createUser, 
    getaUser, 
    deleteUser, 
    updateUser, 
    blockUser, 
    unBlockUser, 
    handleRefreshToken,
    logOut,
    updatePassword,
    forgetPasswordToken,
    resetPassword,
    loginAdmin,
    getWishlist,
    saveUserAddress,
} from "../controller/userControl.js";
import { 
    createOrder, 
    getAllOrder, 
    getOrder, 
    getRecentOrders, 
    updateOrder 
} from '../controller/orderController.js';
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { 
    applyCoupon, 
    emptyCart, 
    userCart,
    getUserCart, 
} from "../controller/userCartController.js";

const userRoute = express.Router();

//post
userRoute.post("/register",createUser);
userRoute.post("/login", loginUser);
userRoute.post("/refresh-token", handleRefreshToken);
userRoute.post("/cart", authMiddleware, userCart);
userRoute.post("/cart/applyCoupon",authMiddleware,applyCoupon);
userRoute.post("/admin-login", loginAdmin);
userRoute.post("/forget-password-token", forgetPasswordToken);
userRoute.post("/password/:id", authMiddleware, updatePassword);
userRoute.post("/cart/create-order", authMiddleware, createOrder);

// get 
userRoute.get("/all-users", authMiddleware , isAdmin, getAllUser);
userRoute.get("/orders", authMiddleware, isAdmin, getAllOrder);
userRoute.get("/recent-orders", authMiddleware , isAdmin, getRecentOrders);
userRoute.get("/get-wishlist", authMiddleware , getWishlist);
userRoute.get("/cart" ,authMiddleware,getUserCart);
userRoute.get("/myorders", authMiddleware, getOrder);
userRoute.get("/logout", logOut)
userRoute.get("/", authMiddleware, isAdmin, getaUser);

// delete
userRoute.delete("/empty-cart", authMiddleware , emptyCart);
userRoute.delete("/:id", authMiddleware , deleteUser);

// update
userRoute.put("/edit-user", authMiddleware, updateUser);
userRoute.put("/save-address", authMiddleware, saveUserAddress);
userRoute.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
userRoute.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);
userRoute.put("/reset-password/:token", resetPassword);
userRoute.put("/update-order/:id",authMiddleware,isAdmin, updateOrder);


export default userRoute;