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

  // Read search from the URL, which NavBar already writes to.
  // This means GameGrid stays in sync automatically whenever the URL changes.
  const search = searchParams.get("search") ?? "";

  // Merge URL search with the rest of the query from props.
  // The hook returns paginated data, so the list below can keep growing.
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGames({ ...query, search, pageSize: 20 });

  // Flatten pages into a single render list.
  // `data.pages` is the full pagination history: page 1, page 2, and so on.
  const games = data?.pages.flatMap((p) => p.results) ?? [];

  // This invisible element is the trigger point for the next request.
  // When the user scrolls near it, we fetch the next page automatically.
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        // Critical flow: tell React Query to request the next page.
        // React Query uses getNextPageParam() from useGames() to know which page comes next.
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "400px", // prefetch before user reaches the bottom
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

      {/* Sentinel element observed by IntersectionObserver.
          When it becomes visible we call fetchNextPage() above. */}
      <div ref={sentinelRef} />

      {/* Fallback controls for accessibility / manual load */}
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
