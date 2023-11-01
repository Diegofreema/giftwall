import { create } from 'zustand';
interface ModalState {
  //   isOpen: boolean;
  //   onOpen: () => void;
  //   onClose: () => void;
  //   loggedIn: boolean;
  //   login: () => void;
  //   logout: () => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
// let loggedIn = false;
// if (typeof window !== 'undefined') {
//   loggedIn = Boolean(window.localStorage.getItem('loggedIn')) || false;
// }

export const useAuthHook = create<ModalState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  //   loggedIn: loggedIn,
  //   login: async () => {
  //     if (typeof window !== 'undefined') {
  //       window.localStorage.setItem('loggedIn', 'true');
  //     }

  //     set({ loggedIn: true });
  //   },
  //   logout: async () => {
  //     if (typeof window !== 'undefined') {
  //       window.localStorage.removeItem('loggedIn');
  //     }

  //     set({ loggedIn: false });
  //   },
  //   isOpen: false,
  //   onOpen: () => set({ isOpen: true }),
  //   onClose: () => set({ isOpen: false }),
}));
