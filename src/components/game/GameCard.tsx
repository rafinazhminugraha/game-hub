/**
 * Component for displaying an individual game card.
 * Features hover effects, image cropping, and navigation links.
 */

import type { Game } from "../../hooks/useGames";
import IconList from "./IconList";
import cropImage from "../../services/crop-image";
import { Link } from "react-router-dom";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  return (
    <Link
      className="group relative flex flex-col bg-surface rounded-xl overflow-hidden transition-all duration-100 hover:bg-surface-hover/80 cursor-pointer"
      to={`/games/${game.id}`}
    >
      <figure className="w-full aspect-video overflow-hidden relative">
        <img
          className="w-full h-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-115"
          src={cropImage(game.background_image)}
          alt={game.name}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent transition-transform duration-200 ease-in-out translate-y-full group-hover:translate-y-0" />
      </figure>

      <div className="flex flex-col gap-4 p-4 z-10">
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
    </Link>
  );
}

