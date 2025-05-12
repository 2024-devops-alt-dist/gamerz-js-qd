import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import channelRoutes from "./routes/channelRoutes";
import messageRoutes from "./routes/messageRoutes";
import cookieParser from 'cookie-parser';

const app: Application = express();
app.use(cookieParser());

const corsOptions = {
    origin:  'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // En-têtes autorisés
    credentials: true, // Autoriser les cookies
  }; 


const version = "v1";
const path = `/api/${version}`;

// Middleware pour autoriser les requêtes CORS
app.use(cors(corsOptions));

// Middleware pour analyser les corps de requêtes JSON
app.use(express.json());

app.use(`${path}/auth`, authRoutes);
app.use(`${path}/users`, userRoutes);
app.use(`${path}/channels`, channelRoutes);
app.use(`${path}/messages`, messageRoutes);


export default app;