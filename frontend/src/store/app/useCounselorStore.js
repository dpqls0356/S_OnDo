import { create } from 'zustand';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: baseUrl,
  // withCredentials: false, // 기본으로 false 세팅 -> 나중에 함수에서 true로 가게
});

const useCounselorStore = create((set, get) => ({
  reservations: [],
  counselors: [],
  selectedCounselor: null,
  counselorSchedule: [],
  loading: false,
  error: null,

  fetchReservations: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/member/reservation/getReservation', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      set({ reservations: response.data.data.reservationList, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchCounselors: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/counselors');
      set({ counselors: response.data.data.counselors, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchCounselorSchedule: async (counselorId) => {
    set({ loading: true });
    try {
      const response = await api.get(`/member/reservation/counselor/${counselorId}`);
      set({ counselorSchedule: response.data.data.counselorSchedule, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  makeReservation: async (counselorId, reservationDate, detail) => {
    set({ loading: true });
    try {
      const response = await api.post('/member/reservation/make', {
        counselorId,
        reservationDate: reservationDate.toISOString(),
        detail
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setSelectedCounselor: (counselor) => set({ selectedCounselor: counselor }),

  getCounselorById: (id) => {
    return get().counselors.find(counselor => counselor.id === id);
  },
}));

export default useCounselorStore;