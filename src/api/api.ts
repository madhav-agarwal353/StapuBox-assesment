
import axios from 'axios';

const API_TOKEN = 'YOUR_TRIAL_TOKEN_HERE'; // 🚨 Put your actual token here

const api = axios.create({
    baseURL: 'https://stapubox.com/trial',
    headers: {
        'X-Api-Token': API_TOKEN,
        'Content-Type': 'application/json',
    },
});

export default api;