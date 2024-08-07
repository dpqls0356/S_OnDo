import { create } from 'zustand';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
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
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  fetchCounselorSchedule: async (counselorId) => {
    set({ loading: true });
    try {
      const response = await api.get(`/member/reservation/counselor/${counselorId}`);
      set({ counselorSchedule: response.data.data.counselorSchedule, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  makeReservation: async (counselorId, reservationDate, detail) => {
    set({ loading: true });
    try {
      const requestData = {
        counselorId,
        reservationDate: reservationDate.toISOString(),
        detail
      };
      const response = await api.post('/member/reservation/make', requestData);
      set({ loading: false });
      return { success: true, message: response.data.message };
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },

  cancelReservation: async (reservationId) => {
    set({ loading: true });
    try {
      await api.delete(`/member/reservation/cancel/${reservationId}`);
      set(state => ({
        reservations: state.reservations.filter(res => res.id !== reservationId),
        loading: false
      }));
      return { success: true, message: "예약이 취소되었습니다." };
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },

  setSelectedCounselor: (counselor) => set({ selectedCounselor: counselor }),

  getCounselorById: (id) => {
    return get().counselors.find(counselor => counselor.id === id);
  },
}));

export default useCounselorStore;