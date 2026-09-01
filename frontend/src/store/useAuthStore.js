import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('hubmall_user') || 'null'),
  token: localStorage.getItem('hubmall_token') || null,

  setAuth: (user, token) => {
    localStorage.setItem('hubmall_user', JSON.stringify(user));
    localStorage.setItem('hubmall_token', token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem('hubmall_user');
    localStorage.removeItem('hubmall_token');
    set({ user: null, token: null });
  }
}));
