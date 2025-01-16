import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import db from '../db/db';
import { readdirSync } from 'fs';
import path from 'path';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

db().catch(console.error);

const routePath = path.join(__dirname, '../routes');
readdirSync(routePath).forEach(async (route) => {
    const { default: router } = await import(`../routes/${route}`);
    app.use('/api', router);
});

const handler = serverless(app);
export { handler };
