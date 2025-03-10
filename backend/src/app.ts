import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

const version = "v1";
const path = `/api/${version}`;

//import {router as beersRoutes} from "./routes/beers";



// Middleware pour autoriser les requêtes CORS
app.use(cors());

// Middleware pour analyser les corps de requêtes JSON
app.use(express.json());

export default app;