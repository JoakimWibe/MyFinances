import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export type ApiResponse<T> = {
    data: T;
    message: string;
};