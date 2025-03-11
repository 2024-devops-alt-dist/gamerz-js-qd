import { Request, Response } from "express";
import { IUser } from '../interfaces/userInterface';
import userModel from '../models/userModel';

// Créer un utilisateur
export const insertUser = async (req: Request<{}, {}, IUser>, res: Response) => {
    try {
        const newUser = await userModel.create(req.body);
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