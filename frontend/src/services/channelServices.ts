import { axiosClient } from '../auth/axios-config';
import { IChannel } from "../interfaces/IChannel";

// Créer un nouveau channel
export async function createChannel(channelData: FormData): Promise<IChannel> {
    const response = await axiosClient.post<IChannel>('/channels', channelData);
    return response.data;
}

// Récupérer tous les channels
export async function fetchChannels(): Promise<IChannel[]> {
    const response = await axiosClient.get<IChannel[]>("/channels");
    return response.data;
}

// Récupérer un channel par ID
export async function fetchChannelById(id: string): Promise<IChannel> {
    const response = await axiosClient.get<IChannel>(`/channels/${id}`);
    return response.data;
}

// Mettre à jour un channel
export async function updateChannel(id: string, channelData: FormData): Promise<IChannel> {
    const response = await axiosClient.put<IChannel>(`/channels/${id}`, channelData);
    return response.data;
}

// Supprimer un channel
export async function deleteChannel(id: string): Promise<{ message: string }> {
    const response = await axiosClient.delete<{ message: string }>(`/channels/${id}`);
    return response.data;
}
