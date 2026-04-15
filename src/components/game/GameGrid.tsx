import useGames from "../../hooks/useGames";
import GameCard from "./GameCard";

export default function GameGrid() {
  const { games, error, loading } = useGames();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
      {games.map((item) => (
        <GameCard key={item.id} game={item} />
      ))}
    </section>
  );
}
