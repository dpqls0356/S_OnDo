import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  
  login: async (credentials) => {
    try {
      const response = await axios.post('/api/v1/member/login', credentials);
      const { user, accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      set({ isAuthenticated: true, user, accessToken });
    } catch (error) {
      console.error('Login failed:', error);
    }
  },
  
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ isAuthenticated: false, user: null, accessToken: null });
  },
  
  checkAuth: async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const response = await axios.get('/api/v1/member/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        set({ isAuthenticated: true, user: response.data.user, accessToken: token });
      } catch (error) {
        set({ isAuthenticated: false, user: null, accessToken: null });
      }
    }
  }
}));

export default useAuthStore;