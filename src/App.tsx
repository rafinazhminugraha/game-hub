import { useEffect, useState } from "react";
import GameGrid from "./components/game/GameGrid";
import FilterBar from "./components/layout/FilterBar";
import GenreBar from "./components/layout/GenreBar";
import NavBar from "./components/layout/NavBar";
import Hero from "./components/ui/Hero";

export default function App() {
  // ----------------------------------------------------- Genre
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isGenreBarOpen, setIsGenreBarOpen] = useState(false);

  const handleClickGenre = (item: string) => {
    setSelectedGenre(item);
    console.log(selectedGenre);
  };

  const handleOnCloseGenre = () => {
    setIsGenreBarOpen(false);
  };

  const handleClickNavbar = () => {
    setIsGenreBarOpen(true);
  };

  // ----------------------------------------------------- Search

  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(query);
  };

  const handleQuery = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    document.body.style.overflow = isGenreBarOpen ? "hidden" : "auto";
  }, [isGenreBarOpen]);

  // ----------------------------------------------------- Filter
  const [platform, setPlatform] = useState("");
  const [generalFilter, setGeneralFilter] = useState("");
  
  const handleChangePlatform = (platform: string) => {
    setPlatform(platform);
  };
  console.log(platform);

  const handleChangeGeneral = (generalFilter: string) => {
    setGeneralFilter(generalFilter);
  };
  console.log(generalFilter);

  return (
    <div className="flex flex-col gap-8 p-6">
      <NavBar
        onCLickNavbar={handleClickNavbar}
        onChangeQuery={handleQuery}
        onSubmitQuery={handleSubmit}
      />
      <Hero />
      <FilterBar
        onChangePlatform={handleChangePlatform}
        onChangeGeneral={handleChangeGeneral}
      />
      <GameGrid />
      {isGenreBarOpen && (
        <>
          <div className="fixed inset-0 bg-surface/80 z-40"></div>
          <div className="fixed inset-0 h-full z-50">
            <GenreBar
              onCloseGenre={handleOnCloseGenre}
              onClickGenre={handleClickGenre}
            />
          </div>
        </>
      )}
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
