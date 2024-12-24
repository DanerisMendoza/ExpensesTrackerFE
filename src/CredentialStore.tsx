import { create } from "zustand";

interface CredentialState {
  user_details: any;
  set_user_details: (active_tab: any) => void;
}

const CredentialStore = create<CredentialState>((set) => ({
  user_details: {},
  set_user_details: (user_details) => set({ user_details: user_details }),
}));

export { CredentialStore };
