import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import db from '../db/db';
import transactionRoutes from '../routes/transactions';

const app = express();

app.use(cors({
    origin: ['https://jmw-my-finances.netlify.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

db().catch(console.error);

app.use('/api', transactionRoutes);

const handler = serverless(app);
export { handler };
