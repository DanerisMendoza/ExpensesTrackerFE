import { create } from "zustand";


export interface ExpensesState {
  action: string,

  set_action: (action: any) => void;
}

export const ExpensesStore = create<ExpensesState>((set) => ({
  action: '',

  set_action: (action: string) => set({ action: action }),
}));