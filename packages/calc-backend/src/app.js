import express from 'express';
import cors from 'cors';
import routeManager from './routes';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());

// use routes
routeManager(app);

export default app;
