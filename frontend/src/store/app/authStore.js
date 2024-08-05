import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email, password) => {
    try {
      const response = await api.post("/member/login", { email, password });
      if (response.data.success) {
        set({ isAuthenticated: true });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  },
  logout: async () => {
    try {
      await api.post("/member/logout");
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
  checkAuth: async () => {
    try {
      const response = await api.get("/member/me");
      if (response.data.success) {
        set({ isAuthenticated: true, user: response.data.data.user });
        return true;
      }
      set({ isAuthenticated: false, user: null });
      return false;
    } catch (error) {
      console.error("Auth check failed:", error);
      set({ isAuthenticated: false, user: null });
      return false;
    }
  },
  counselorLogin: async (id, password) => {
    try {
      const response = await api.post("/counselor/login", { id, password });
      if (response.data.success) {
        localStorage.setItem("isAuthenticated", true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  },
  counselorLogout: async () => {
    try {
      await api.post("/counselor/logout");
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
  checkLoggedIn: async () => {
    if (localStorage.getItem("isAuthenticated")) {
      return true;
    }
    return false;
  },
}));

export default useAuthStore;
