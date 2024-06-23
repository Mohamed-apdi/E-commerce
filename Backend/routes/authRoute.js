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
    userCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrder,
    updateOrder,
    getAllOrder,
    getRecentOrders,
} from "../controller/userControl.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

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
userRoute.post("/cart/cash-order", authMiddleware, createOrder);

// get 
userRoute.get("/all-users", authMiddleware , isAdmin, getAllUser);
userRoute.get("/all-orders", authMiddleware, isAdmin, getAllOrder);
userRoute.get("/recent-orders", authMiddleware , isAdmin, getRecentOrders);
userRoute.get("/get-wishlist", authMiddleware , getWishlist);
userRoute.get("/cart" ,authMiddleware,getUserCart);
userRoute.get("/get-order", authMiddleware, getOrder);
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