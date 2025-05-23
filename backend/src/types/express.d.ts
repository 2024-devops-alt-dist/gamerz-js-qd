import { IUser } from '../interfaces/userInterface';

declare global {
    namespace Express {
        interface Request {
            user?: IUser; 
        }
    }
}