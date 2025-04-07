import { Router, Request, Response } from "express";
import { IUser } from "../interfaces/userInterface";
import { 
    login,
    logout,
} from "../controllers/authController";
import multer from "multer";
import  path  from "path";
import { verifyAccessToken, refreshAccessToken } from "../middlewares/authMiddlewares";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshAccessToken);

export default router;