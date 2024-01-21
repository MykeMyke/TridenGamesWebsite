import { create } from 'zustand'

const useUserStore = create((set) => ({
    user: { logginIn: false },
    setUser: (us) => set((state) => ({ user: us })),
    login: ((() => { })),
    logoout: ((() => { })),
    isLoading: false,
    setIsLoading: (load) => set({isLoading: load}),
    setMethods: (prop) => set((state) => ({ login: prop.in, logout: prop.out }))
}));
    



export default useUserStore;
