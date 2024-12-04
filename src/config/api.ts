export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const endpoints = {
    mosques: `${API_URL}/mosques`,
    auth: `${API_URL}/auth`,
    // Add more endpoints as needed
};
