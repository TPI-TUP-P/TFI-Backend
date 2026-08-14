import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7258/api',
  timeout: 10000,
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data, 
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.title ||
      'Ocurrió un error inesperado';

    return Promise.reject(new Error(errorMessage));
  }
);

export default api;