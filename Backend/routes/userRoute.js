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
    resetPassword
} from "../controller/userControl.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const userRoute = express.Router();


userRoute.post("/register",createUser);
userRoute.post("/login", loginUser);
userRoute.post("/forget-password-token",authMiddleware, forgetPasswordToken);
userRoute.put("/reset-password/:token",authMiddleware, resetPassword);
userRoute.post("/password/:id", authMiddleware, updatePassword);
userRoute.get("/all-users", getAllUser);
userRoute.get("/refresh", handleRefreshToken);
userRoute.get("/logout", logOut)
userRoute.get("/:id", authMiddleware, isAdmin, getaUser);
userRoute.delete("/:id", deleteUser);
userRoute.put("/edit-user/:id", authMiddleware, updateUser);
userRoute.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
userRoute.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);


export default userRoute;