import { create } from "zustand";


export interface ExpensesState {
  action: string,

}

export const ExpensesStore = create<ExpensesState>((set) => ({
  action: '',

  set_action: (action: string) => set({ action: action }),
}));