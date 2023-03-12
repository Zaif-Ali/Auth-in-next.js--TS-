import { create } from "zustand";

interface IFislogged {
    flag: boolean | null;
    loggedtrue: () => void;
    loggedfalse: () => void;
}

export const useisLogged = create<IFislogged>((set) => ({
    flag: false,
    loggedtrue: () => set((state) => ({ flag: state.flag = true })),
    loggedfalse: () => set((state) => ({ flag: state.flag = false })),
}));