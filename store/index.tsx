import { create } from "zustand";

type Store = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const useGlobalStore = create<Store>()((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

export default {
  useGlobalStore,
};
