import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

const app: Application = express();

const version = "v1";
const path = `/api/${version}`;

// Middleware pour autoriser les requêtes CORS
app.use(cors());

// Middleware pour analyser les corps de requêtes JSON
app.use(express.json());

app.use(`${path}/users`, userRoutes);

export default app;