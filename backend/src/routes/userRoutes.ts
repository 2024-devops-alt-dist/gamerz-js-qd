import { Router, Request, Response } from "express";
import { IUser } from "../interfaces/userInterface";
import {
    login,  
    register,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    logout,
} from "../controllers/userController";
import multer from "multer";
import  path  from "path";
import { verifyAccessToken, refreshAccessToken } from "../middlewares/authMiddlewares";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Dossier où stocker les images
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Nom unique
    },
  });

const upload = multer({ storage: storage });

const router = Router();

// Définition des routes utilisateur

router.get("/", verifyAccessToken, getUsers);
router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);
router.get("/:id", verifyAccessToken, getUserById);
router.put("/:id", verifyAccessToken, updateUser);
router.delete("/:id", verifyAccessToken, deleteUser);

export default router;