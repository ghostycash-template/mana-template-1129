import express from "express";
import submitRouter from './routes/routes.js';
import cors from "cors";

const app = express();
app.use(cors());
app
    .use(express.json()) 
    .use('/api', submitRouter);


export { app };
