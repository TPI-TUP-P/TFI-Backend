import axios from 'axios';
import { useLoaderStore } from '../Components/stores/useLoaderStore';
import { useAuthStore } from '../Components/stores/useAuthStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7258/api',
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    if (!config.skipGlobalLoader) {
      useLoaderStore.getState().showLoader();
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (!error.config?.skipGlobalLoader) {
      useLoaderStore.getState().hideLoader();
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (!response.config?.skipGlobalLoader) {
      useLoaderStore.getState().hideLoader();
    }
    return response.data;
  },
  (error) => {
    if (!error.config?.skipGlobalLoader) {
      useLoaderStore.getState().hideLoader();
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      useAuthStore.getState().logout();
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