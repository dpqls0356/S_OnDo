// src/stores/createBoardStore.js
import { create } from 'zustand';

const useCreateBoardStore = create((set) => ({
  title: '',
  content: '',
  member_name: '',
  image: null,
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setMemberName: (member_name) => set({ member_name }),
  setImage: (image) => set({ image }),
  reset: () => set({ title: '', content: '', member_name: '', image: null }),
}));

export default useCreateBoardStore;