import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // URL par défaut de Laravel
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Crucial pour Laravel Sanctum plus tard
});

export default api;