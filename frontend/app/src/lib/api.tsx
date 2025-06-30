import axios from 'axios';

const api = axios.create({
    baseURL: 'https://charles-mariot.fr/api/',
});

export default api;
