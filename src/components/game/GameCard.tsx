import { IoLogoPlaystation, IoLogoWindows, IoLogoXbox } from "react-icons/io";
import { IoLogoApple } from "react-icons/io5";

export default function GameCard() {
  const link: string =
    "https://media.rawg.io/media/resize/640/-/games/ed6/ed613937e113a4d43fa0db771e527a2f.jpg";
  return (
    <article className="flex flex-col bg-surface rounded-xl overflow-hidden transition-all duration-200 hover:bg-surface-hover cursor-pointer">
      <figure>
        <img
          src={link}
          alt="Prince of Persia The Sands of Time Remake gameplay scene"
        />
      </figure>
      <div className="flex flex-col gap-8 p-4">
        <ul className="flex flex-row gap-1.5" aria-label="Available platforms">
          <li className="text-2xl">
            {" "}
            <IoLogoXbox />{" "}
          </li>
          <li className="text-2xl">
            {" "}
            <IoLogoWindows />{" "}
          </li>
          <li className="text-2xl">
            {" "}
            <IoLogoPlaystation />{" "}
          </li>
          <li className="text-2xl">
            {" "}
            <IoLogoApple />{" "}
          </li>
        </ul>
        <header>
          <h2 className="text-3xl font-bold">
            Prince of Persia: The Sands of Time Remake<span>👍</span>
          </h2>
        </header>
        <footer>
          <ul className="flex flex-row gap-2">
            <li className="font-medium text-xl text-tx-muted">Action</li>
            <li className="font-medium text-xl text-tx-muted">Horror</li>
          </ul>
        </footer>
      </div>
    </article>
  );
}
