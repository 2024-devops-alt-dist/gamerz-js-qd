import { Router } from 'express';
import {
  createChannel,
  getChannelById,
  updateChannel,
  deleteChannel,
  getChannels
} from '../controllers/channelController';
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

router.post('/', verifyAccessToken, requireRole(['admin', 'gamer']), createChannel);
router.get('/', verifyAccessToken, getChannels);
router.get('/:id', verifyAccessToken, getChannelById);
router.put('/:id', verifyAccessToken, requireRole(['admin', 'gamer']), updateChannel);
router.delete('/:id', verifyAccessToken, requireRole(['admin']), deleteChannel);

export default router;
