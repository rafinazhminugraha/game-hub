import { useState } from "react";
import GameGrid from "./components/game/GameGrid";
import FilterBar from "./components/layout/FilterBar";
import GenreBar from "./components/layout/GenreBar";
import NavBar from "./components/layout/NavBar";
import Hero from "./components/ui/Hero";

export default function App() {
  // ----------------------------------------------------- Universal Endpoint Query State
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({
    genre: "",
    platform: "",
    sort: "",
    search: "",
  });

  // ----------------------------------------------------- Genre
  const [isGenreBarOpen, setIsGenreBarOpen] = useState(false);

  const handleClickGenre = (genre: string) => {
    setQuery((prev) => ({ ...prev, genre }));
  };

  const handleOnCloseGenre = () => {
    setIsGenreBarOpen(false);
  };

  const handleClickNavbar = () => {
    setIsGenreBarOpen(true);
  };

  // use this when to block the scroll when isGenreOpen === true
  // useEffect(() => {
  //   document.body.style.overflow = isGenreBarOpen ? "hidden" : "auto";
  // }, [isGenreBarOpen]);

  // ----------------------------------------------------- Search

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery((prev) => ({ ...prev, search: search }));
  };

  const handleQuery = (search: string) => {
    setSearch(search);
  };

  // ----------------------------------------------------- Filter

  const handleChangePlatform = (platform: string) => {
    setQuery((prev) => ({ ...prev, platform }));
  };

  const handleChangeSort = (sort: string) => {
    setQuery((prev) => ({ ...prev, sort }));
  };

  // ----------------------------------------------------- MAIN JSX
  return (
    <div className="flex flex-col gap-8 p-6 xl:p-12 relative">
      <NavBar
        onCLickNavbar={handleClickNavbar}
        onChangeQuery={handleQuery}
        onSubmitQuery={handleSubmit}
      />
      {isGenreBarOpen && (
        <div className="xl:hidden">
          <div className="fixed inset-0 bg-surface/80 z-40"></div>
          <div className="fixed top-3 right-3 h-full z-50">
            <GenreBar
              onCloseGenre={handleOnCloseGenre}
              onClickGenre={handleClickGenre}
            />
          </div>
        </div>
      )}
      <Hero />
      <div className="flex flex-row gap-6">
        <div className="max-xl:hidden">
          <GenreBar
            onCloseGenre={handleOnCloseGenre}
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

// --------------STRUCTURE--------------
// src/
// ├── components/
// │   ├── ui/                // "Atoms" - Reusable, logic-less UI pieces
// │   │   ├── Button.tsx
// │   │   ├── Badge.tsx
// │   │   └── Select.tsx
// │   ├── game/              // "Molecules/Organisms" - Domain-specific
// │   │   ├── GameCard.tsx
// │   │   ├── GameGrid.tsx
// │   │   └── GameHeading.tsx
// │   └── layout/            // Layout wrappers
// │       ├── Navbar.tsx
// │       └── FilterBar.tsx
// ├── lib/
// │   └── utils.ts           // Your cn() helper
// ├── pages/
// │   └── GameHub.tsx        // The "Template/Page" that brings it all together
// ├── App.tsx                // Entry point & Routing
// └── index.css              // Tailwind v4 imports & @theme
