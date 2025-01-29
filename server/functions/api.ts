import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import db from '../db/db';
import transactionRoutes from '../routes/transactions';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

db().catch(console.error);

app.use('/api', transactionRoutes);

const handler = serverless(app);
export { handler };
