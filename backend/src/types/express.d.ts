import { IUser } from '../interfaces/userInterface';

declare global {
    namespace Express {
        interface Request {
            user?: IUser; // Ajoute la propriété user à l'objet Request
        }
    }
}