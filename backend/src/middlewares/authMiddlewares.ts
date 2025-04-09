import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY, REFRESH_SECRET_KEY } from '../config';
import userModel from '../models/userModel';

// Middleware pour vérifier l'access token
export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        console.log("Aucun token trouvé dans les cookies");
        res.status(403).json({ message: 'Access token missing' });
        return;
    }

    try {
        const decoded = jwt.verify(accessToken, SECRET_KEY) as jwt.JwtPayload;

        // On extrait l'ID de l'utilisateur à partir du token décrypté
        const user = await userModel.findById(decoded.id);
        console.log("User trouvé:", user);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired access token' });
    }
};

// Middleware pour rafraîchir le token d'accès en utilisant le refresh token
export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(403).json({ message: 'Refresh token missing' });
        return;
    }

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY) as { id: string; email: string; role: string };

        // Vérifier si l'utilisateur existe toujours
        const user = await userModel.findById(decoded.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        } 
        // Créer un nouveau access token à partir du payload du refresh token
        const payload = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };

        const newAccessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24, // 1 jour
        });

        res.status(200).json({ message: 'Access token refreshed' });
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};

