/**
 * Global UI state management using Zustand.
 * Handles cross-component UI states like sidebars and drawers.
 */

import { create } from "zustand";

interface UiState {
  isGenreOpen: boolean;
  setIsGenreOpen: (open: boolean) => void;
}

/**
 * Zustand store for UI-related state.
 */
export const useUiStore = create<UiState>((set) => ({
  isGenreOpen: false,
  setIsGenreOpen: (open) => set({ isGenreOpen: open }),
}));