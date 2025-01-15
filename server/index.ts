import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';
import db from './db/db';

const port = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').map((route) => app.use('/api', require(`./routes/${route}`)));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const server = () => {
    db()
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

server();