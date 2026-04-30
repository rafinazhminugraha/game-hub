// ROLE: Reads from the Zustand store to trigger the genre sidebar.
//       Owns its own search state via URL params.
//       No props needed from any parent.

import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { useTheme } from "../../lib/useTheme";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUiStore } from "../../lib/useUiStore";

export default function NavBar() {
  const { isDark, toggle } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Subscribe to only the action we need from the store.
  //    This component does NOT read isGenreOpen -- it only writes it.
  //    So NavBar will NOT re-render when isGenreOpen changes.
  //    That is intentional and correct.
  const setIsGenreOpen = useUiStore((s) => s.setIsGenreOpen);

  // REMOVE THIS -- it's unnecessary and causes the error:
  // useEffect(() => {
  //   setValue(searchParams.get("search") ?? "");
  // }, [searchParams]);

  // `initial` already seeds the input correctly on first mount.
  // After the user submits, the URL updates but the input keeps its value,
  // which is the correct UX (user sees what they searched for).
  const initial = searchParams.get("search") ?? "";
  const [value, setValue] = useState(initial);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 2. Search is managed via URL params, not Zustand.
    //    URL params are the right tool here because search state
    //    should survive a page refresh and be shareable via URL.
    const params = new URLSearchParams(
      Object.fromEntries(searchParams.entries()),
    );
    if (value) params.set("search", value);
    else params.delete("search");
    setSearchParams(params);
  };

  return (
    <nav className="flex max-h-24 flex-wrap items-center justify-between gap-6 overflow-y-auto lg:max-h-none lg:flex-nowrap lg:items-center lg:gap-6 lg:overflow-visible">
      <p className="text-lg md:text-xl lg:text-2xl font-extrabold tracking-widest">
        GAMEHUB
      </p>

      <form
        className="flex min-w-0 max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl flex-1 items-center gap-2 rounded-2xl bg-surface p-2 focus-within:bg-surface-hover lg:w-2/3"
        onSubmit={onSubmit}
      >
        <CiSearch className="text-3xl" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="focus:outline-none bg-transparent w-4/5"
          type="text"
          placeholder="Search"
        />
      </form>

      {/* 3. Click writes true to the store.
              NavBar does not care what happens next.
              HomePage is subscribed to isGenreOpen and will react. */}
      <RxHamburgerMenu
        className="text-3xl cursor-pointer lg:hidden"
        onClick={() => setIsGenreOpen(true)}
      />

      <button
        className="cursor-pointer hover:bg-surface-hover max-lg:hidden bg-surface border-border border p-4 rounded-xl"
        onClick={toggle}
      >
        {isDark ? "Dark" : "Light"}
      </button>
    </nav>
  );
}
