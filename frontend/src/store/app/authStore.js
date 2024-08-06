import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: false, // 기본으로 false 세팅 -> 나중에 함수에서 true로 가게
});

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email, password) => {
    try {
      const response = await api.post("/member/login", { email, password }, { withCredentials: true });
      if (response.data.success) {
        set({ isAuthenticated: true, user: response.data.user });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  },
  // logout: async () => {
  //   try {
  //     await api.post("/member/logout");
  //     set({ isAuthenticated: false, user: null });
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // },
  logout: async () => {
    try {
      const response = await api.post("/member/logout", {}, { withCredentials: true });
      if (response.data.success) {
        set({ isAuthenticated: false, user: null});
        return true;
      }
      console.error("Logout failed:", response.data.message);
      return false;
    } catch (error) {
      console.error("Logout failed:", error.response ? error.response.data : error.message);
      return false;
    }
  },
  checkAuth: async () => {
    try {
      const response = await api.get("/member/me", { withCredentials: true });
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
