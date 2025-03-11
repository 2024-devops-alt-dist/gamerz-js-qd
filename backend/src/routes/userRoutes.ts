import { Router, Request, Response } from "express";
import { IUser } from "../interfaces/userInterface";
import {
    insertUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/userController";

const router = Router();

// Définition des routes utilisateur
router.post("/", insertUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;