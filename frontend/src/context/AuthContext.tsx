import { IUser } from "../interfaces/IUser";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import React from "react";
import {axiosClient} from '../auth/axios-config';

// Définition du contexte 
interface AuthContextType {
    user: IUser | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
    getCurrentUser: () => any;
    isLoading: boolean;
  }

  export const AuthContext = createContext<AuthContextType | undefined>(undefined);

  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate(); 
    

    // Vérification de l'authentification lors du montage du composant
    useEffect(() => {
        const init = async () => {
            await getCurrentUser();
        };
        init();
    }, []);

    // Connexion de l'utilisateur
    const login = async (email: string, password: string) => {
        try {
            const response = await axiosClient.post("/auth/login", {
                email,
                password,
            });

            setUser(response.data); // Sauvegarde l'utilisateur dans l'état
            setAuthenticated(true); // Met à jour l'état d'authentification
            navigate("/"); // Redirection vers la page d'accueil
        } catch (error) {
            console.error("Erreur de connexion", error);
        }
    };

    // Déconnexion de l'utilisateur
    const logout = async () => {
        try {
            await axiosClient.post("/auth/logout");

            setUser(null); // Réinitialise l'utilisateur
            setAuthenticated(false); // Réinitialise l'état d'authentification
            navigate("/login"); // Redirection vers la page de connexion
        } catch (error) {
            console.error("Erreur de déconnexion", error);
        }
    };

    // Vérification de l'authentification à chaque chargement de la page
    const getCurrentUser = async () => {
        try {
            const response = await axiosClient.get("/users/me/info");
    
            setUser(response.data);
            setAuthenticated(true); // Met à jour l'état
        } catch {
            setUser(null);
            setAuthenticated(false); // Réinitialise l'état
        } finally {
            setIsLoading(false); // Arrêt du chargement une fois l'opération terminée
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: authenticated, getCurrentUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour accéder au contexte
export const useAuthentification = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthentification doit être utilisé à l'intérieur d'un AuthProvider");
    }
    return context;
};
