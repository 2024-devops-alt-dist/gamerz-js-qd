import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

const app: Application = express();
/* const corsOptions = {
    origin:  'http://localhost:5173', // Remplace par l'URL de ton front
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  }; */


const version = "v1";
const path = `/api/${version}`;

// Middleware pour autoriser les requêtes CORS
app.use(cors());

// Middleware pour analyser les corps de requêtes JSON
app.use(express.json());

app.use(`${path}/users`, userRoutes);

export default app;