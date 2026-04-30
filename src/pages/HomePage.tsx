// ROLE: Owns query state (genre, platform, sort, search via URL).
//       Reads isGenreOpen from Zustand to conditionally render the mobile sidebar.
//       Does NOT own NavBar anymore -- RootLayouts does.

import { useState } from "react";
import GameGrid from "../components/game/GameGrid";
import FilterBar from "../components/layout/FilterBar";
import GenreBar from "../components/layout/GenreBar";
import Hero from "../components/ui/Hero";
import { useUiStore } from "../lib/useUiStore";
// ^-- NavBar import is REMOVED. RootLayouts renders it now.

export default function HomePage() {
  // ---- QUERY STATE (local -- only this page and its children use it) ----

  const [query, setQuery] = useState({
    genre: "",
    platform: "",
    sort: "",
    // Note: search is removed from here because NavBar now manages
    // search via URL params independently. If GameGrid needs the search
    // value, read it from useSearchParams() inside GameGrid directly.
  });

  // ---- GLOBAL STATE (from Zustand store) ----

  // 1. Subscribe to isGenreOpen from the store.
  //    When NavBar calls setIsGenreOpen(true), the store updates,
  //    and THIS component re-renders because it is subscribed here.
  const isGenreOpen = useUiStore((s) => s.isGenreOpen);

  // 2. Also pull the setter so we can close the sidebar from this component.
  const setIsGenreOpen = useUiStore((s) => s.setIsGenreOpen);

  // ---- HANDLERS ----

  const handleClickGenre = (genre: string) => {
    setQuery((prev) => ({ ...prev, genre }));
  };

  const handleChangePlatform = (platform: string) => {
    setQuery((prev) => ({ ...prev, platform }));
  };

  const handleChangeSort = (sort: string) => {
    setQuery((prev) => ({ ...prev, sort }));
  };

  // ---- JSX ----

  return (
    // 3. The padding/gap that was here moved to RootLayouts wrapper div.
    //    If you keep it here too, you will get double padding. Remove one.
    <div className="flex flex-col gap-8 relative">
      {/* 4. NavBar is NOT rendered here anymore.
              It lives in RootLayouts and is already on screen. */}

      {/* 5. isGenreOpen comes from the Zustand store.
              NavBar wrote true to it. Now we read it here to show the sidebar.
              These two components (NavBar, HomePage) are siblings -- they share
              no parent that could pass props between them.
              Zustand is the bridge. */}
      {isGenreOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 bg-surface/80 z-40" />
          <div className="fixed top-3 right-3 h-full z-50">
            <GenreBar
              selectedGenre={query.genre}
              onCloseGenre={() => setIsGenreOpen(false)}
              // 6. Closing writes false back to the store.
              //    Store updates --> this component re-renders --> sidebar disappears.
              onClickGenre={handleClickGenre}
            />
          </div>
        </div>
      )}

      <Hero />

      <div className="flex flex-row gap-6">
        {/* 7. Desktop GenreBar is always visible, not controlled by the store.
                It closes by selecting a genre, not by a toggle. */}
        <div className="max-lg:hidden">
          <GenreBar
            selectedGenre={query.genre}
            onCloseGenre={() => setIsGenreOpen(false)}
            onClickGenre={handleClickGenre}
          />
        </div>

        <div className="flex flex-col gap-6">
          <FilterBar
            onChangePlatform={handleChangePlatform}
            onChangeSort={handleChangeSort}
          />
          <GameGrid query={query} />
        </div>
      </div>
    </div>
  );
}

// APP BOOT
//   --> Zustand store is created ONCE outside React's tree
//   --> { isGenreOpen: false } lives in memory
//   --> React mounts: RootLayouts --> NavBar + Outlet --> HomePage

// ─────────────────────────────────────────────────────────────

// STORE SUBSCRIPTION MAP (who reads what)

//   NavBar    --> subscribes to: setIsGenreOpen (action only, not state)
//                so NavBar NEVER re-renders when isGenreOpen changes
//   HomePage  --> subscribes to: isGenreOpen, setIsGenreOpen
//                so HomePage re-renders when isGenreOpen changes

//   Why this matters: only HomePage pays the re-render cost.
//   NavBar is unaffected. This is the performance benefit of selectors.

// ─────────────────────────────────────────────────────────────

// FLOW 1: User opens genre sidebar (mobile)

//   [NavBar]  user clicks hamburger
//     --> calls setIsGenreOpen(true)
//     --> Zustand: isGenreOpen = true
//     --> notifies all subscribers

//   [NavBar]  not subscribed to isGenreOpen value --> does NOT re-render

//   [HomePage] subscribed to isGenreOpen --> re-renders
//     --> {isGenreOpen && <GenreBar />} evaluates to true
//     --> mobile GenreBar mounts on screen

// ─────────────────────────────────────────────────────────────

// FLOW 2: User closes genre sidebar

//   [GenreBar] user clicks close button
//     --> calls onCloseGenre() prop
//     --> that prop is () => setIsGenreOpen(false) defined in HomePage
//     --> Zustand: isGenreOpen = false
//     --> notifies subscribers

//   [HomePage] re-renders
//     --> {isGenreOpen && <GenreBar />} evaluates to false
//     --> mobile GenreBar unmounts

// ─────────────────────────────────────────────────────────────

// FLOW 3: User searches (this is NOT Zustand -- important distinction)

//   [NavBar]  user types and submits the search form
//     --> calls setSearchParams({ search: "halo" })
//     --> this updates the URL: /?search=halo
//     --> React Router detects URL change
//     --> any component using useSearchParams() re-renders

//   [GameGrid] uses useSearchParams() internally
//     --> reads search = "halo" from URL
//     --> passes { ...query, search } to useGames()
//     --> API call fires with new search param
//     --> games list updates

//   Zustand is NOT involved here.
//   URL params = right tool for search because it survives refresh
//                and can be copy-pasted/shared.
//   Zustand = right tool for UI toggles (isGenreOpen) because
//             they don't need to survive refresh or appear in URL.

// ─────────────────────────────────────────────────────────────

// FLOW 4: User picks a genre or filter (local state in HomePage)

//   [GenreBar / FilterBar] user picks a value
//     --> calls onClickGenre(genre) or onChangePlatform(platform)
//     --> these are handlers defined in HomePage
//     --> calls setQuery(prev => ({ ...prev, genre }))
//     --> this is plain React useState, not Zustand

//   [HomePage] re-renders (its own local state changed)
//     --> passes updated query down to <GameGrid query={query} />
//     --> GameGrid re-renders, useGames fires with new params

//   Zustand is NOT involved here either.
//   genre/platform/sort don't need to be global --
//   only HomePage and its direct children care about them.

// ─────────────────────────────────────────────────────────────

// STATE OWNERSHIP SUMMARY

//   isGenreOpen       --> Zustand    (shared between NavBar and HomePage,
//                                     no common parent to hold it)

//   search            --> URL params (needs to survive refresh, be shareable)

//   genre/platform/sort --> useState in HomePage (only local subtree needs it)
