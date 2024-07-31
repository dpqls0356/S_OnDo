import create from 'zustand';

const useStore = create((set) => ({
  contacts: [],
  filter: 'all',
  setFilter: (filter) => set({ filter }),
  addContact: (contact) => set((state) => ({ contacts: [...state.contacts, contact] })),
}));

export default useStore;