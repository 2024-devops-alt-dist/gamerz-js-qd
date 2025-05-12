import { Request, Response, NextFunction } from "express";
import messageModel from '../models/messageModel';
import { IMessage } from "../interfaces/messageInterface";

// Créer un message
export const createMessage = async (req: Request<{}, {}, IMessage>, res: Response) => {
    const today = new Date();
    try {
        let oneMessage = req.body
        oneMessage.createdAt = today;
        oneMessage.updatedAt = today;
        const newMessage = await messageModel.create(oneMessage);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error creating message', error });
    }
};

// Récupérer tous les messages
export const getMessages = async (_req: Request, res: Response) => {
    try {
        const messages: IMessage[] = await messageModel.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};

// Récupérer tous les messages par l'id d'un channel
export const getMessagesByIdChannel = async (_req: Request, res: Response) => {
    try {
        const messages: IMessage[] = await messageModel.find();
        let messagesByChannel:  IMessage[] = [];
        messages.forEach(message => {
            messagesByChannel.push(message)
        });
        res.status(200).json(messagesByChannel);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};

// Supprimer un message
export const deleteMessage = async (
    req: Request<{ id: string }>,
    res: Response<{ message: string }>
) => {
    try {
        const messageId = req.params.id;
        const deletedMessage = await messageModel.findByIdAndDelete(messageId);
        if (!deletedMessage) {
            res.status(404).json({ message: 'Message not found' });
            return;
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting message' });
    }
};

// Mettre à jour un message
export const updateMessage = async (
    req: Request<{ id: string }, {}, Partial<IMessage>>,
    res: Response<IMessage | { message: string }>
) => {
    const today = new Date();

    try {
        const messageId = req.params.id;
        const updatedMessage = await messageModel.findByIdAndUpdate(messageId, req.body, { new: true });
  
        if (!updatedMessage) {
            res.status(404).json({ message: 'Message not found' });
            return;
        }  
        updatedMessage.updatedAt = today;
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error updating message'});
    }
};



