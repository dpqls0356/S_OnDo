import { create } from 'zustand'

const useGenderStore = create((set) => ({
  selectedGender: '전체',
  setGender: (gender) => set({ selectedGender: gender }),
}))

export default useGenderStore