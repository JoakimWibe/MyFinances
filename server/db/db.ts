import mongoose from 'mongoose';

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error('MONGO_URL environment variable is not defined');
        }
        await mongoose.connect(mongoUrl);
        console.log('Database connected');
    } catch (error) {
        throw new Error(`Database connection failed: ${error}`);
    }
};

export default db;