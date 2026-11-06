import { create } from "zustand";

type AuthStore = {
  authenticated: boolean;
  email: string | null;
  name: string | null;
  token: string | null;
  setAuth: (authenticated: boolean, email: string | null, name: string | null, token: string | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  authenticated: false,
  email: null,
  name: null,
  token: null,
  setAuth: (authenticated, email, name, token) => set({ authenticated, email, name, token }),
  clearAuth: () => set({ authenticated: false, email: null, name: null, token: null }),
}));
