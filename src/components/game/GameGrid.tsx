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
  const { data = [], isPending, error } = useGames(query);

  if (error) return <p>{error.message}</p>;
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {isPending
        ? Array.from({ length: 10 }).map((_, index) => (
            <GameCardSkeleton key={index} />
          ))
        : data.map((item) => <GameCard key={item.id} game={item} />)}
    </section>
  );
}

