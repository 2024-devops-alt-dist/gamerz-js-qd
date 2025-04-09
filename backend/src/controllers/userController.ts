import { Request, Response, NextFunction } from "express";
import { IUser } from '../interfaces/userInterface';
import userModel from '../models/userModel';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { SECRET_KEY, REFRESH_SECRET_KEY } from '../config';

// Créer un utilisateur
export const register = async (req: Request<{}, {}, IUser>, res: Response) => {
    const today = new Date();
    console.log(req.headers)
    console.log("Données :", req.body);
    console.log(req.file);

    let avatarPath = "";
    if (req.file && req.file.filename) {
        avatarPath = `/uploads/${req.file.filename}`;
    }
    
    try {
        let oneUser = req.body
        oneUser.password = await bcrypt.hash(oneUser.password, 10)
        oneUser.createdAt = today;
        oneUser.updatedAt = today;
        if (avatarPath) {
            oneUser.avatar = { path: avatarPath }; 
        }
        oneUser.role = ["user"];

        const newUser = await userModel.create(oneUser);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};


// Récupérer tous les utilisateurs
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users: IUser[] = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Récupérer un utilisateur par ID
export const getUserById = async (
    req: Request<{ id: string }>,
    res: Response<IUser | { message: string }>
): Promise<void> => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId).exec();

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Ici, TypeScript sait que `user` est bien de type `IUser`, pas `null`.
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};

// Mettre à jour un utilisateur
export const updateUser = async (
    req: Request<{ id: string }, {}, Partial<IUser>>,
    res: Response<IUser | { message: string }>
) => {
    try {
        const userId = req.params.id;
        const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user'});
    }
};

// Supprimer un utilisateur
export const deleteUser = async (
    req: Request<{ id: string }>,
    res: Response<{ message: string }>
) => {
    try {
        const userId = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

// Fonction pour renvoyer les informations de l'utilisateur connecté
export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("Inside getMe function");
    try {
        
        const token = req.cookies.accessToken;
        console.log("Cookies:", req.cookies); // Vérifie les cookies dans la requête
        console.log("Token:", token); // Vérifie la présence du token dans les cookies
        if (!token) {
            res.status(403).json({ message: 'No token, access forbidden' });
            return;
            
        }
        

        const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
        console.log('Decoded token:', decoded);

        const user = await userModel.findById(decoded.id); // Utilise l'ID de l'utilisateur extrait du token

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        console.log('User found:', user);
        // Renvoie les informations essentielles de l'utilisateur
        res.status(200).json({
            _id: user._id,
            username: user.name,
            email: user.email,
            role: user.role,
            admissionText: user.admissionText,
            avatar: user.avatar,
            allowNotification: user.allowNotification,
            seenAdmission: user.seenAdmission,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        
    }
};