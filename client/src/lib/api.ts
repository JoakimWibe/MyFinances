import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export type ApiResponse<T> = {
    data: T;
    message: string;
};