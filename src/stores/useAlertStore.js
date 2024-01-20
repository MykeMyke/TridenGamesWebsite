import { create } from 'zustand'
import { v4 as uuidv4 } from "uuid";

const useAlertStore = create((set) => ({
    messages: [],
    message: { text: undefined, severity: undefined, autoHideDuration: undefined, elevation: undefined },
    setMessage: (msg) => set((state) => ({ messages: [...state.messages, { ...msg, id: uuidv4() }] })),
    setSuccess: (text) => set((state) => ({ messages: [...state.messages, { text, severity: "success", autoHideDuration: 6000, elevation: 6, id: uuidv4() }] })),
    setWarning: (text) => set((state) => ({ messages: [...state.messages, { text, severity: "warning", autoHideDuration: 6000, elevation: 6, id: uuidv4() }] })),
    setError: (text) => set((state) => ({ messages: [...state.messages, { text, severity: "error", autoHideDuration: 6000, elevation: 6, id: uuidv4() }] })),
    setInfo: (text) => set((state) => ({ messages: [...state.messages, { text, severity: "info", autoHideDuration: 6000, elevation: 6, id: uuidv4() }] })),
    removeMessage: (id) => set((state) => {
        return { messages: state.messages.filter((msg) => msg.id !== id) };
    })
}))

export default useAlertStore;
