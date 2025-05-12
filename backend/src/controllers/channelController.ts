import { Request, Response } from 'express';
import { IChannel, IChannelInput } from '../interfaces/channelInterface';
import channelModel from '../models/channelModel';

// Créer un channel
export const createChannel = async (req: Request<{}, {}, IChannel>, res: Response) => {

    console.log("Données reçues :", req.body);
    console.log("Fichier image :", req.file);

    let imagePath = '';
    if (req.file && req.file.filename) {
        imagePath = `/uploads/${req.file.filename}`;
    }

    try {
        const channelData: IChannelInput = {
            title: req.body.title,
            description: req.body.description,
            image: imagePath ? { path: imagePath } : undefined,
        };

        const newChannel = await channelModel.create(channelData);
        res.status(201).json(newChannel);
    } catch (error) {
        res.status(500).json({ message: 'Error creating channel', error });
    }
};

// Récupérer tous les channels
export const getChannels = async (_req: Request, res: Response) => {
    try {
        const channels: IChannel[] = await channelModel.find();
        res.status(200).json(channels);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching channels', error });
    }
};

// Récupérer un channel par ID
export const getChannelById = async (
    req: Request<{ id: string }>,
    res: Response<IChannel | { message: string }>
) => {
    try {
        const { id } = req.params;
        const channel = await channelModel.findById(id).exec();

        if (!channel) {
            res.status(404).json({ message: 'Channel not find' });
            return;
        }

        res.status(200).json(channel);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching channel' });
    }
};

// Mettre à jour un channel
export const updateChannel = async (
    req: Request<{ id: string }, {}, Partial<IChannel>>,
    res: Response<IChannel | { message: string }>
) => {
    try {
        const { id } = req.params;

        let imagePath = req.body.image?.path;
        if (req.file && req.file.filename) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        const updateData = {
            ...req.body,
            image: imagePath ? { path: imagePath } : undefined,
            updatedAt: new Date()
        };

        const updatedChannel = await channelModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedChannel) {
            res.status(404).json({ message: 'Channel not find' });
            return;
        }

        res.status(200).json(updatedChannel);
    } catch (error) {
        res.status(500).json({ message: 'Error while updating the channel' });
    }
};

// Supprimer un channel
export const deleteChannel = async (
    req: Request<{ id: string }>,
    res: Response<{ message: string }>
) => {
    try {
        const { id } = req.params;
        const deletedChannel = await channelModel.findByIdAndDelete(id);
        if (!deletedChannel) {
            res.status(404).json({ message: 'Channel not find' });
            return;
        }

        res.status(200).json({ message: 'Channel deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while deleting the channel' });
    }
};