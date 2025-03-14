import { Router, Request, Response } from "express";
import { IUser } from "../interfaces/userInterface";
import {
    login,  
    register,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/userController";
import multer from "multer";
import  path  from "path";

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

router.get("/", getUsers);
router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;