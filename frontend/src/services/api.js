import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT interceptor — attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('debatex_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (username, password) =>
    api.post('/api/auth/signin', { username, password }),

  register: (username, email, password) =>
    api.post('/api/auth/signup', { username, email, password }),
};

// Debate APIs
export const debateAPI = {
  sendMessage: (message, persona, topic) =>
    api.post('/api/debate/send', { message, persona, topic }),

  healthCheck: () =>
    api.get('/api/debate/health'),
};

export default api;
