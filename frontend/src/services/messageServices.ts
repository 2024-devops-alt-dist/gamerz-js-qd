import { axiosClient } from '../auth/axios-config';
import { IMessage } from "../interfaces/IMessage";

// Créer un nouveau message
export async function createMessage(messageData: { text: string, channel_id: string, user_id: string }): Promise<IMessage> {
    const response = await axiosClient.post<IMessage>('/messages', messageData);
    return response.data;
}

// Récupérer tous les messages
export async function fetchMessages(): Promise<IMessage[]> {
    const response = await axiosClient.get<IMessage[]>('/messages');
    return response.data;
}

// Récupérer tous les messages d'un channel
export async function fetchMessagesByChannel(channelId: string): Promise<IMessage[]> {
    const response = await axiosClient.get<IMessage[]>(`/messages/${channelId}`);
    return response.data;
}

// Mettre à jour un message
export async function updateMessage(id: string, messageData: { text: string }): Promise<IMessage> {
    const response = await axiosClient.put<IMessage>(`/messages/${id}`, messageData);
    return response.data;
}

// Supprimer un message
export async function deleteMessage(id: string): Promise<{ message: string }> {
    const response = await axiosClient.delete<{ message: string }>(`/messages/${id}`);
    return response.data;
}
