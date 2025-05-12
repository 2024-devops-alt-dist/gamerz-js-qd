import { Router } from "express";
import { 
    createMessage, getMessages,
    getMessagesByIdChannel, deleteMessage, updateMessage
} from "../controllers/messageController";
import { verifyAccessToken } from "../middlewares/authMiddlewares";
import { requireRole } from '../middlewares/requireRoleMiddleware';


const router = Router();

// Définition des routes messages
router.post("/", verifyAccessToken, requireRole(['admin', 'gamer']), createMessage);
router.get("/", verifyAccessToken, requireRole(['admin']), getMessages);
router.get("/:channelId", verifyAccessToken, getMessagesByIdChannel);
router.delete("/:id", verifyAccessToken, requireRole(['admin']), deleteMessage);
router.put("/:id", verifyAccessToken, requireRole(['admin']), updateMessage);





export default router;