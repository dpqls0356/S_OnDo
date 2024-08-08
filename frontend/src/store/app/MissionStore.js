import { create } from 'zustand'

const useMissionStore = create((set) => ({
    missions: {
        daily: [],
        typical: []
    },
    setMissions: (missions) => {
        // console.log('Setting missions in store:', missions);
        set({ missions })},
    completeMission: (type, missionIndex) => set(state => ({
        missions: {
            ...state.missions,
            [type]: state.missions[type].map((mission, index) => 
                index === missionIndex ? { ...mission, completeFlag: true } : mission
            )
        }
    })),
}))

export default useMissionStore