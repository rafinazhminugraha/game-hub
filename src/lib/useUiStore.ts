import { create } from "zustand"; // use named import, not default

// The store is a plain object with:
// - state (the data)
// - actions (functions that update the data)

type UiState = {
  // STATE: what we're tracking
  isGenreOpen: boolean;

  // ACTION: how we change it
  // setIsGenreOpen replaces the whole boolean
  setIsGenreOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  // Initial values
  isGenreOpen: false,

  // `set` is Zustand's way to update state
  // It merges the object you pass into existing state
  setIsGenreOpen: (open) => set({ isGenreOpen: open }),
  //                         ^-- only updates isGenreOpen, leaves other fields untouched
}));

// Key insight: this store is created ONCE, outside React's lifecycle.
// Every component that calls useUiStore() reads from the SAME instance.
// When state changes, only the components that subscribed to that slice re-render.

// -----The Data Flow, Summarized-----
// User clicks hamburger (NavBar)
//   --> setIsGenreOpen(true)        writes to Zustand store
//   --> store.isGenreOpen = true    store updates
//   --> HomePage re-renders         because it subscribes to isGenreOpen
//   --> GenreBar appears            because isGenreOpen is now true

// User clicks close (GenreBar)
//   --> setIsGenreOpen(false)       writes to Zustand store
//   --> store.isGenreOpen = false
//   --> HomePage re-renders
//   --> GenreBar disappears