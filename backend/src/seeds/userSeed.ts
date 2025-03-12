import mongoose from "mongoose";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import {connectDB} from "../data/db";

const users = [
    {
        name: "Juliette Dupont",
        email: "juliette@example.com",
        password: "password1",
        admissionText: "Je suis une administratrice",
        role: ["admin"],
        avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        allowNotification: true,
        seenAdmission: false,
        status: ["active"]
    },
    {
        name: "Quentin Martin",
        email: "quentin@example.com",
        password: "password2",
        admissionText: "Je suis un administrateur",
        role: ["admin"],
        avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        allowNotification: true,
        seenAdmission: true,
        status: ["inactive"]
    },
    {
        name: "Charlie Durand",
        email: "charlie@example.com",
        password: "password3",
        admissionText: "Je suis un utilisateur",
        role: ["user"],
        avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        allowNotification: false,
        seenAdmission: false,
        status: ["active"]
    },
    {
        name: "David Leroy",
        email: "david@example.com",
        password: "password4",
        admissionText: "Je suis un utilisateur",
        role: ["user"],
        avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        allowNotification: true,
        seenAdmission: true,
        status: ["active"]
    },
    {
        name: "Emma Lambert",
        email: "emma@example.com",
        password: "password5",
        admissionText: "Je suis un utilisateur",
        role: ["user"],
        avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        allowNotification: false,
        seenAdmission: false,
        status: ["inactive"]
    },
    {
        name: "François Morel",
        email: "francois@example.com",
        password: "password6",
        admissionText: "Je suis un utilisateur",
        role: ["user"],
        avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        allowNotification: true,
        seenAdmission: true,
        status: ["active"]
    },
    {
        name: "Giselle Poirier",
        email: "giselle@example.com",
        password: "password7",
        admissionText: "Je suis un utilisateur",
        role: ["user"],
        avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        allowNotification: false,
        seenAdmission: false,
        status: ["active"]
    },
    {
        name: "Hugo Richard",
        email: "hugo@example.com",
        password: "password8",
        admissionText: "Je suis un joueur",
        role: ["gamer"],
        avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        allowNotification: true,
        seenAdmission: false,
        status: ["inactive"]
    },
    {
        name: "Isabelle Thomas",
        email: "isabelle@example.com",
        password: "password9",
        admissionText: "Je suis un joueur",
        role: ["gamer"],
        avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        allowNotification: true,
        seenAdmission: true,
        status: ["active"]
    },
    {
        name: "Jean-Pierre Simon",
        email: "jeanpierre@example.com",
        password: "password10",
        admissionText: "Je suis un joueur",
        role: ["gamer"],
        avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        allowNotification: false,
        seenAdmission: false,
        status: ["active"]
    }
];

// Fonction pour insérer les utilisateurs
const seedUsers = async () => {
    try {
        await connectDB(); // Connexion à MongoDB

        // // Supprimer tous les utilisateurs existants
        await userModel.deleteMany();
        console.log("🔥 Anciennes données supprimées");

        // Hasher les mots de passe avant insertion
        const usersPasswordHashed = await Promise.all(
            users.map(async (user) => ({
                ...user,
                password: await bcrypt.hash(user.password, 10)
            }))
        );

        // Insérer les utilisateurs
        await userModel.insertMany(usersPasswordHashed);
        console.log("✅ 10 utilisateurs ajoutés avec succès !");
        
        process.exit(); // Fermer le script après exécution TODO : ça empêche Express de tourner après l'execution du script !
    } catch (error) {
        console.error("❌ Erreur d'insertion :", error);
        process.exit(1);
    }
};

export default seedUsers;