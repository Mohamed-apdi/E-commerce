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
    getSingleOrder, 
    getRecentOrders, 
    updateOrder, 
    getOrderStatusEnum,
    deleteOrder
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
userRoute.get("/my-orders/:id", authMiddleware, getSingleOrder);
userRoute.get('/order-status-enum', authMiddleware, isAdmin, getOrderStatusEnum);
userRoute.get("/logout", logOut)
userRoute.get("/:id", authMiddleware, isAdmin, getaUser);

// delete
userRoute.delete("/empty-cart", authMiddleware , emptyCart);
userRoute.delete("/:id", authMiddleware , deleteUser);
userRoute.delete("/order/:id", authMiddleware , isAdmin, deleteOrder);

// update
userRoute.put("/:id", authMiddleware, updateUser);
userRoute.put("/save-address", authMiddleware, saveUserAddress);
userRoute.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
userRoute.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);
userRoute.put("/reset-password/:token", resetPassword);
userRoute.put("/update-order/:id", authMiddleware,isAdmin, updateOrder);


export default userRoute;