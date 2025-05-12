import {axiosClient} from '../auth/axios-config';
import { IUser } from "../interfaces/IUser";

//Pour enregistrer un nouvel utilisateur
//@returns IUser
export async function postUser(user: FormData): Promise<IUser> {
    const response = await axiosClient.post<IUser>('/users/register', user);
    return response.data;
}

// //Pour connecter un utilisateur
// //@returns User
// export async function loginUser(user: {email: string, password: string}) {
//     const response = await axiosClient.post<User>('/auth/login', user);
//     return response.data;
// }

// export async function logoutUser() {
//     await axiosClient.post('/auth/logout');
//   }

// Pour récupérer tous les utilisateurs
export async function fetchUsers(): Promise<IUser[]> {
    const response = await axiosClient.get<IUser[]>("/users");
    return response.data;
  }
  
  // Pour actualiser le seenAdmission d'un utilisateur
export async function updateUserSeenAdmission(id: string, seen: boolean): Promise<IUser> {
    const response = await axiosClient.put<IUser>(`/users/${id}`, {
        seenAdmission: seen,
    });
    return response.data;
}