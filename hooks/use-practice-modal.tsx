import { create } from "zustand";

type PracticeModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const usePracticeModal = create<PracticeModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default usePracticeModal;
