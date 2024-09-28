import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { 
    createEnq, 
    deleteEng, 
    getAllEnq, 
    getSingleEnq, 
    updateEng 
} from "../controller/enqControl.js";
export const enqRoute = express.Router();

enqRoute.post("/create",authMiddleware,createEnq);
enqRoute.get("/", authMiddleware,getAllEnq);
enqRoute.get("/:id",authMiddleware, getSingleEnq);
enqRoute.put("/:id",authMiddleware, updateEng);
enqRoute.delete("/:id",authMiddleware, deleteEng);
