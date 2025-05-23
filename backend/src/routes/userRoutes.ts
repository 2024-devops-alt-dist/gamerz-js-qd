import { Router, Request, Response } from "express";
import { IUser } from "../interfaces/userInterface";
import { 
    register,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getMe,
} from "../controllers/userController";
import multer from "multer";
import  path  from "path";
import { verifyAccessToken, refreshAccessToken } from "../middlewares/authMiddlewares";
import { requireRole } from '../middlewares/requireRoleMiddleware';

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

router.get("/", verifyAccessToken, requireRole(['admin']), getUsers);
router.post("/register", upload.single("avatar"), register);
router.get("/:id", verifyAccessToken, getUserById);
router.put("/:id", verifyAccessToken,requireRole(['admin']), updateUser);
router.delete("/:id", verifyAccessToken,requireRole(['admin']), deleteUser);
router.get('/me/info', getMe);


export default router;