import { create } from "zustand";

export interface user_details_type {
  email: string
  name: string
  username: string
  role: number[]
  profile_pic_path: string
  exp?: Number
};

export interface GlobalState {
  user_details: user_details_type,
  is_mobile: boolean;

  set_user_details: (user_details: any) => void;
  set_is_mobile: (is_mobile: boolean) => void;
}

export const user_details_value = {
  name: '',
  email: '',
  username: '',
  role: [1],
  profile_pic_path: ''
}

export const GlobalStore = create<GlobalState>((set) => ({
  user_details: user_details_value,
  is_mobile: false,

  set_is_mobile: (is_mobile) => set({ is_mobile: is_mobile }),
  set_user_details: (user_details) => set({ user_details: user_details }),
}));