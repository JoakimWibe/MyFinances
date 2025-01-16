import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';
import db from './db/db';
import path from 'path';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to database
db().catch(console.error);

const routePath = path.join(__dirname, 'routes');
readdirSync(routePath).forEach(async (route) => {
    const { default: router } = await import(`./routes/${route}`);
    app.use('/api', router);
});

export default app;