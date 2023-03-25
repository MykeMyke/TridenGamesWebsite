import { create } from "zustand";

const userDataStore = create((set) => ({
  data: null,
  setData: (newVal) => set((state) => ({ data: newVal })),
}));

export default userDataStore;
