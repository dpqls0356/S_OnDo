import { create } from 'zustand';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const calculateDday = (reservationDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const reservDate = new Date(reservationDate);
  reservDate.setHours(0, 0, 0, 0);
  const timeDiff = reservDate.getTime() - today.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  if (dayDiff > 0) return `D-${dayDiff}`;
  if (dayDiff === 0) return 'D-day';
  if (dayDiff === -1) return '상담완료';
  return null; // D-day가 지난 경우 null을 반환
};

const useCounselorStore = create((set, get) => ({
  counselors: [],  // 모든 상담사 목록
  selectedCounselor: null,  // 특정 상담사의 상세 정보
  counselorSchedule: [], // 상담사의 가능한 일정
  userReservations: [], // 사용자의 예약 목록
  isLoading: false, // 비동기 작업 위한 로딩 상태
  error: null,

  // 모든 상담사 목록 가져오기
  fetchCounselors: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/counseling/list');
      set({ counselors: response.data.data.counselors, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // 특정 상담사의 상세 정보 가져오기
  fetchCounselorDetails: async (counselorId) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/counseling/${counselorId}`);
      set({ selectedCounselor: response.data.data.counselor, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // 상담사의 가능한 일정 가져오기
  fetchCounselorSchedule: async (counselorId, date) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/member/reservation/counselor/${counselorId}`);
      const schedule = response.data.data.counselorSchedule.map(dateStr => new Date(dateStr));
      set({ counselorSchedule: schedule, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // 예약하기
  makeReservation: async (counselorId, reservationDate, detail) => {
    set({ isLoading: true });
    try {
      const dateString = reservationDate.toISOString();
      const response = await api.post('/member/reservation/make', {
        counselorId,
        reservationDate: dateString,
        detail
      });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // 사용자의 예약 목록 가져오기
  fetchUserReservations: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/member/reservation/getReservation');
      const reservations = response.data.data.reservationList.map(reservation => ({
        ...reservation,
        dday: calculateDday(reservation.reservationDate)
      }));
      set({ userReservations: reservations, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // 예약 취소하기
  cancelReservation: async (reservationId) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`/member/reservation/cancel/${reservationId}`);
      if (response.data.success) {
        const updatedReservations = get().userReservations.filter(r => r.id !== reservationId);
        set({ userReservations: updatedReservations, isLoading: false });
      }
      return response.data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  calculateDday
}));

export default useCounselorStore;