import { create } from 'zustand';

const useCreateBoardStore = create((set) => ({
  title: '',
  content: '',
  member_name: '',
  image: null, // image 없는 경우도 생각해서
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setMemberName: (member_name) => set({ member_name }),
  setImage: (image) => set({ image }),
  reset: () => set({ title: '', content: '', member_name: '', image: null }),
}));

export default useCreateBoardStore;