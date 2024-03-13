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
    saveUserAddress
} from "../controller/userControl.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const userRoute = express.Router();


userRoute.post("/register",createUser);
userRoute.post("/login", loginUser);
userRoute.post("/admin-login", loginAdmin);
userRoute.post("/forget-password-token",authMiddleware, forgetPasswordToken);
userRoute.put("/reset-password/:token",authMiddleware, resetPassword);
userRoute.post("/password/:id", authMiddleware, updatePassword);
userRoute.get("/all-users", getAllUser);
userRoute.get("/get-wishlist", authMiddleware , getWishlist);
userRoute.get("/refresh", handleRefreshToken);
userRoute.get("/logout", logOut)
userRoute.get("/:id", authMiddleware, isAdmin, getaUser);
userRoute.delete("/:id", deleteUser);
userRoute.put("/edit-user", authMiddleware, updateUser);
userRoute.put("/save-address", authMiddleware, saveUserAddress);
userRoute.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
userRoute.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);


export default userRoute;