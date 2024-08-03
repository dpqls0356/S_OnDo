import axios from 'axios';
import { useAuthStore } from './authStore'

// axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // 기본 URL 설정
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getAccessToken();
    if (token) {
        config.headers['Authorization'] = token; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Sending request with token:', token);
      console.log('Request headers:', config.headers);
    }
    return config;
  });

export default api;