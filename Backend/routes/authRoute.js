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
    updateOrder
} from "../controller/userControl.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const userRoute = express.Router();

//post
userRoute.post("/register",createUser);
userRoute.post("/login", loginUser);
userRoute.post("/cart", authMiddleware, userCart);
userRoute.post("/cart/applyCoupon",authMiddleware,applyCoupon);
userRoute.post("/admin-login", loginAdmin);
userRoute.post("/forget-password-token",authMiddleware, forgetPasswordToken);
userRoute.post("/password/:id", authMiddleware, updatePassword);
userRoute.post("/cart/cash-order", authMiddleware, createOrder);

// get 
userRoute.get("/all-users", getAllUser);
userRoute.get("/get-wishlist", authMiddleware , getWishlist);
userRoute.get("/cart" ,authMiddleware,getUserCart);
userRoute.get("/refresh", handleRefreshToken);
userRoute.get("/get-order", authMiddleware, getOrder);
userRoute.get("/logout", logOut)
userRoute.get("/:id", authMiddleware, isAdmin, getaUser);


// delete
userRoute.delete("/empty-cart", authMiddleware , emptyCart);
userRoute.delete("/:id", authMiddleware , deleteUser);

// update
userRoute.put("/edit-user", authMiddleware, updateUser);
userRoute.put("/save-address", authMiddleware, saveUserAddress);
userRoute.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
userRoute.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);
userRoute.put("/reset-password/:token",authMiddleware, resetPassword);
userRoute.put("/update-order/:id",authMiddleware,isAdmin, updateOrder);


export default userRoute;