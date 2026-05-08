/**
 * Main landing page component that manages game discovery, 
 * filtering, and infinite scroll logic.
 */

import { useState } from "react";
import GameGrid from "../components/game/GameGrid";
import FilterBar from "../components/layout/FilterBar";
import GenreBar from "../components/layout/GenreBar";
import Hero from "../components/ui/Hero";
import { useUiStore } from "../lib/useUiStore";

export default function HomePage() {
  // Query state for active filters
  const [query, setQuery] = useState({
    genre: "",
    platform: "",
    sort: "",
  });

  // UI state from global store
  const isGenreOpen = useUiStore((s) => s.isGenreOpen);
  const setIsGenreOpen = useUiStore((s) => s.setIsGenreOpen);

  // Filter change handlers
  const handleClickGenre = (genre: string) => {
    setQuery((prev) => ({ ...prev, genre }));
  };

  const handleChangePlatform = (platform: string) => {
    setQuery((prev) => ({ ...prev, platform }));
  };

  const handleChangeSort = (sort: string) => {
    setQuery((prev) => ({ ...prev, sort }));
  };

  return (
    <div className="flex flex-col gap-8 relative">
      {/* Mobile Sidebar Overlay */}
      {isGenreOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 bg-surface/80 z-40" />
          <div className="fixed top-3 right-3 h-full z-50">
            <GenreBar
              selectedGenre={query.genre}
              onCloseGenre={() => setIsGenreOpen(false)}
              onClickGenre={handleClickGenre}
            />
          </div>
        </div>
      )}

      <Hero />

      <div className="flex flex-row gap-6">
        {/* Desktop Sidebar */}
        <div className="max-lg:hidden">
          <GenreBar
            selectedGenre={query.genre}
            onCloseGenre={() => setIsGenreOpen(false)}
            onClickGenre={handleClickGenre}
          />
        </div>

        {/* Game Discovery Grid */}
        <div className="flex flex-col gap-6 flex-1">
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
