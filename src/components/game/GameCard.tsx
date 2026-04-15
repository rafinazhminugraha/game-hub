import type { JSX } from "react";
import { IoLogoPlaystation, IoLogoWindows, IoLogoXbox } from "react-icons/io";
import { IoLogoApple } from "react-icons/io5";

import type { Game } from "../../hooks/useGames";

// Map platform slugs to icons
const platformIconMap: Record<string, JSX.Element> = {
  pc: <IoLogoWindows />,
  playstation: <IoLogoPlaystation />,
  xbox: <IoLogoXbox />,
  mac: <IoLogoApple />,
};

// 6. take the Props from custom hooks, then rendem them (always pay attention the interface that already created)
interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  return (
    <article className="flex flex-col bg-surface rounded-xl overflow-hidden transition-all duration-200 hover:bg-surface-hover cursor-pointer">
      <figure className="w-full aspect-video overflow-hidden">
        <img className="w-full h-full object-cover" src={game.background_image} alt={game.name} />
      </figure>
      <div className="flex flex-col gap-8 p-4">
        <ul className="flex flex-row gap-1.5" aria-label="Available platforms">
          {/* Render based on the slug then use the component match the slug */}
          {game.platforms?.map(({ platform }) => {
            const slug = Object.keys(platformIconMap).find((key) =>
              platform.slug.startsWith(key),
            );
            const icon = slug ? platformIconMap[slug] : null;
            return icon ? (
              <li key={platform.id} className="text-2xl">
                {icon}
              </li>
            ) : null;
          })}
        </ul>

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
