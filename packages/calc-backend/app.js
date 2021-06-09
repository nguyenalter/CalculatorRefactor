import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

// Use process.env.* in .env file
dotenv.config();
app.use(express.json({ limit: "50mb" }));

app.use(cors());

import routeManager from "./src/routes";
// use routes
routeManager(app);

export default app;
