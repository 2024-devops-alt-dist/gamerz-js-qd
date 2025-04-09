import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/userInterface'; 
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

// Middleware pour vérifier le rôle
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction):void => {
        const accessToken = req.cookies.accessToken;

        console.log("Cookies:", req.cookies); // Vérifie les cookies dans la requête
        console.log("accessToken:", accessToken); // Vérifie la présence du token dans les cookies
    
        if (!accessToken) {
            console.log("Aucun token trouvé dans les cookies");
            res.status(403).json({ message: 'Access token missing' });
            return;
        }
    
        try {
            const decoded = jwt.verify(accessToken, SECRET_KEY) as jwt.JwtPayload;
            const user = decoded as IUser; 
        
        // Vérifie si l'utilisateur possède un des rôles demandés
        const hasRole = roles.some(role => user.role && user.role.includes(role));

        if (!hasRole) {
            console.log("Rôle insuffisant");
            res.status(403).json({ message: 'Forbidden: insufficient role' });
            return;
          }

          next(); // Passe au prochain middleware ou à la route
        } catch (error) {
          console.error("Erreur de vérification du token:", error);
          res.status(401).json({ message: 'Invalid or expired token' });
          return;
        }
  };
};
