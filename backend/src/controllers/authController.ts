import { Request, Response } from "express";
import { IUser } from '../interfaces/userInterface';
import userModel from '../models/userModel';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { SECRET_KEY, REFRESH_SECRET_KEY } from '../config';

// Login 
export const login = async (req: Request<{}, {}, IUser>, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) { 
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }

        // Céation d'un payload minimal pour éviter de révéler trop d'infos (mot de passe hachés)
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        // JWT token dans le cas où tout va bien
        const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' }) // durée de validité du token 
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '30d' });
    
        res.cookie('accessToken', accessToken, {
            httpOnly:true,
            secure: false, // true : Https uniquement en prod
            sameSite: 'lax', // niveau de sécurité pour les cookies
            maxAge: 1000 * 60 * 60 * 24, // 1 jour (durée de vie du cookie dans le navigateur)
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 30, 
        });

        res.status(200).json({msg: "utilisateur connecté", payload});
        console.log("Utilisateur connecté :", payload);
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Logout
export const logout = (req: Request, res: Response): void => {
    // Supprimer les cookies contenant les tokens
    res.clearCookie("accessToken", { httpOnly: true, secure: false, sameSite: "lax" });
    res.clearCookie("refreshToken", { httpOnly: true, secure: false, sameSite: "lax" });

    // Répondre avec un message de succès
    res.status(200).json({ message: "Successfully logged out" });
};