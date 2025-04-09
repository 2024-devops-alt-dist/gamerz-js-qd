import {axiosClient} from '../auth/axios-config';
import { User } from '../entities';

//Pour enregistrer un nouvel utilisateur
//@returns User
export async function postUser(user: FormData) {
    const response = await axiosClient.post<User>('/users/register', user);
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