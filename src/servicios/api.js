import axios from 'axios';

// Configuración base de Axios para consumir el backend a futuro
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // Reemplazar con la URL base del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar token de autenticación (ejemplo)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas (errores globales, etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Lógica de logout si el token es inválido
      console.error('No autorizado');
    }
    return Promise.reject(error);
  }
);

export default api;
