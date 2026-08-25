import axios from 'axios';
import { useLoaderStore } from '../Components/stores/useLoaderStore';
import { useAuthStore } from '../Components/stores/useAuthStore';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7256/api',
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
const isLoginRequest = error.config?.url?.includes('/auth/login');
    if (error.response?.status === 401 &&  !isLoginRequest) {
      localStorage.removeItem('token');
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }

    const errorMessage =
      error.response?.data?.detail ||
      error.response?.data?.title ||
      'Ocurrió un error inesperado';
       toast.error(errorMessage)
      return Promise.reject(new Error(errorMessage));
  }
);

export default api;