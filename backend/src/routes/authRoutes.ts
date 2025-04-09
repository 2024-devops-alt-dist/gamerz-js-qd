import { Router, Request, Response } from "express";
import { 
    login,
    logout,
} from "../controllers/authController";
import { refreshAccessToken } from "../middlewares/authMiddlewares";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshAccessToken);

export default router;