import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';
import db from './db/db';

const port = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

const server = async () => {
    try {
        await db();
        const routes = readdirSync('./routes');
        for (const route of routes) {
            const { default: router } = await import(`./routes/${route}`);
            app.use('/api', router);
        }
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

server();
