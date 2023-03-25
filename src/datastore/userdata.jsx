import { create } from "zustand";

const userDataStore = create((set) => ({
  username: "",
  setUsername: (newVal) => set((state) => ({ username: newVal })),

  ranks: [],
  setRanks: (newVal) => set((state) => ({ ranks: newVal })),
}));

export default userDataStore;
