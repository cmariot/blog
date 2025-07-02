import axios from 'axios';

// Détection environnement serveur ou client
const isServer = typeof window === 'undefined';

const api = axios.create({
    baseURL: isServer
        ? process.env.API_BASE_URL || 'http://backend:8000/' // Pour SSR/Docker
        : process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost/api/', // Pour le navigateur
});

export default api;
