import axios from 'axios';

const api = axios.create({
    // baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
    baseURL: 'http://localhost:4000',
    withCredentials: true,
});

export default api;