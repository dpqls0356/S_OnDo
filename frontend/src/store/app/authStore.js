import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set, get) => ({
  accessToken: null,
  refreshToken: null,
  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/member/login', { email, password });
      const { accessToken, refreshToken } = response.data.data.token;
      set({ accessToken, refreshToken });
      
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  logout: () => set({ accessToken: null, refreshToken: null }),
  getAccessToken: () => get().accessToken,
}));

export default useAuthStore