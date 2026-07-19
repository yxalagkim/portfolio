import { create } from 'zustand';
import Lenis from '@studio-freight/lenis';

type Store = {
  lenis: Lenis | null;
  setLenis: (lenis: Lenis) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  introOut: boolean;
  setIntroOut: (introOut: boolean) => void;
  hoverText: string | null;
  setHoverText: (hoverText: string | null) => void;
};

export const useStore = create<Store>((set) => ({
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
  introOut: false,
  setIntroOut: (introOut) => set({ introOut }),
  hoverText: null,
  setHoverText: (hoverText) => set({ hoverText }),
}));
