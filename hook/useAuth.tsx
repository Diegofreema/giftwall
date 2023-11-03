import { create } from 'zustand';
interface ModalState {
  isOpen: boolean;
  delete: boolean;
  onClose: () => void;
  onOpen: () => void;
  id: string;
  getId: (id: string) => void;
  onDelete: () => void;

  doNotDelete: () => void;
}

export const useDeleteHook = create<ModalState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  id: '',
  getId(id) {
    set({ id });
  },
  delete: false,
  doNotDelete: () => set({ delete: false }),
  onDelete: () => set({ delete: true }),
}));
