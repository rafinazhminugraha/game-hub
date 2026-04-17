import type { Game } from "../../hooks/useGames";
import IconList from "./IconList";

// 6. take the Props from custom hooks, then rendem them (always pay attention the interface that already created)
interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  return (
    <article className="flex flex-col bg-surface rounded-xl overflow-hidden transition-all duration-200 hover:bg-surface-hover cursor-pointer">
      <figure className="w-full aspect-video overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={game.background_image}
          alt={game.name}
        />
      </figure>
      <div className="flex flex-col gap-4 p-4">
        <IconList
          Platforms={game.parent_platforms.map((platform) => platform.platform)}
        />
        <header>
          <h2 className="text-3xl font-bold">
            {game.name}{" "}
            <span className="font-semibold text-xl text-tx-muted">
              | {game.rating}
            </span>
          </h2>
        </header>
        <footer>
          <ul className="flex flex-row gap-2 flex-wrap">
            {game.genres.map((genre) => (
              <li key={genre.id} className="font-medium text-lg text-tx-muted">
                {genre.name}
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </article>
  );
}
