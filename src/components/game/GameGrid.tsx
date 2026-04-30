import { useSearchParams } from "react-router-dom";
import useGames from "../../hooks/useGames";
import GameCardSkeleton from "../ui/GameCardSkeleton";
import GameCard from "./GameCard";

interface Props {
  query: {
    genre: string;
    platform: string;
    sort: string;
    // search is removed from Props -- GameGrid reads it from the URL directly
  };
}

export default function GameGrid({ query }: Props) {
  const [searchParams] = useSearchParams();

  // Read search from the URL, which NavBar already writes to.
  // This means GameGrid stays in sync automatically whenever the URL changes.
  const search = searchParams.get("search") ?? "";

  // Merge URL search with the rest of the query from props
  const { data = [], isLoading, error } = useGames({ ...query, search });

  if (error) return <p>{error.message}</p>;
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <GameCardSkeleton key={index} />
          ))
        : data.map((item) => <GameCard key={item.id} game={item} />)}
    </section>
  );
}
