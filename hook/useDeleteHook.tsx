import { create } from 'zustand';
interface ModalState {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useAuthHook = create<ModalState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
