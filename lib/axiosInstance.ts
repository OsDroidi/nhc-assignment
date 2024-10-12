// lib/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com', // Base URL for DummyJSON API
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
  timeout: 10000, // Timeout set to 10 seconds
});

// Optional: Request and response interceptors for logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request sent:', config);
    return config;
  },
  (error) => {
    console.log('Request error:', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response);
    return response;
  },
  (error) => {
    console.log('Response error:', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
