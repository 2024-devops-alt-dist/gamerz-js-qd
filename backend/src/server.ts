import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB} from "./data/db";
import app from "./app";
import seedUsers from "./seeds/userSeed";
import mongoose from "mongoose";

// configures dotenv to work in your application
dotenv.config();

// Connexion for MongoDB
connectDB();

// Insertion des données utilisateur 
//seedUsers(); // à décommenter quand on veut remettre les faux utilisateurs de base dans la BDD

const PORT = process.env.PORT || 3000;

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});

// Lors de l'arrêt du serveur, assurez-vous de fermer la connexion MongoDB
process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection...');
  await mongoose.disconnect();
  process.exit(0); // Fermez proprement le processus
});