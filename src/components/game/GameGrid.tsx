/**
 * Component for rendering a grid of games with infinite scroll pagination.
 * Uses IntersectionObserver to trigger loading more games as the user scrolls.
 */

import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import useGames from "../../hooks/useGames";
import GameCardSkeleton from "../ui/GameCardSkeleton";
import GameCard from "./GameCard";

interface Props {
  query: {
    genre: string;
    platform: string;
    sort: string;
  };
}

export default function GameGrid({ query }: Props) {
  const [searchParams] = useSearchParams();

  // URL search parameter synchronization
  const search = searchParams.get("search") ?? "";

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGames({ ...query, search, pageSize: 20 });

  // Flatten paginated data into a single list
  const games = data?.pages.flatMap((p) => p.results) ?? [];

  // Ref for the sentinel element used to trigger infinite scroll
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "400px",
      threshold: 0.1,
    });
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect]);

  if (error) return <p>{error.message}</p>;
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {isLoading &&
          Array.from({ length: 10 }).map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}

        {!isLoading &&
          games.map((item) => <GameCard key={item.id} game={item} />)}
      </section>

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} />

      {/* Pagination controls */}
      <div className="flex justify-center mt-6">
        {isFetchingNextPage ? (
          <button className="btn" disabled>
            Loading...
          </button>
        ) : hasNextPage ? (
          <button
            className="btn"
            onClick={() => fetchNextPage()}
            aria-label="Load more games"
          >
            Load more
          </button>
        ) : (
          <span className="text-tx-muted">No more games</span>
        )}
      </div>
    </>
  );
}

