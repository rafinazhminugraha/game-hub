import useGames from "../../hooks/useGames";
import GameCardSkeleton from "../ui/GameCardSkeleton";
import GameCard from "./GameCard";

interface Props {
  query: {
    genre: string;
    platform: string;
    sort: string;
    search: string;
  };
}

export default function GameGrid({ query }: Props) {
  const { games, error, loading } = useGames(query);

  if (error) return <p>{error}</p>;
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
      {loading
        ? Array.from({ length: 10 }).map((_, index) => (
            <GameCardSkeleton key={index} />
          ))
        : games.map((item) => <GameCard key={item.id} game={item} />)}
    </section>
  );
}

