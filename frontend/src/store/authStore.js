import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('debatex_user') || 'null'),
  token: localStorage.getItem('debatex_token') || null,
  isAuthenticated: !!localStorage.getItem('debatex_token'),

  login: (userData, token) => {
    localStorage.setItem('debatex_user', JSON.stringify(userData));
    localStorage.setItem('debatex_token', token);
    set({ user: userData, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('debatex_user');
    localStorage.removeItem('debatex_token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
