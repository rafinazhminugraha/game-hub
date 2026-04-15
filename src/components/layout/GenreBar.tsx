import { IoClose } from "react-icons/io5";
import { GENRES } from "../../data/mockGames";
import { useTheme } from "../../lib/useTheme";

interface Props {
  onClickGenre: (item: string) => void;
  onCloseGenre: () => void;
}

export default function GenreBar({ onClickGenre, onCloseGenre }: Props) {
  const { isDark, toggle } = useTheme();

  return (
    <aside className="w-60 xl:w-80 rounded-3xl bg-base xl:bg-transparent flex flex-col gap-6 py-6">
      <header className="flex flex-row items-center justify-between px-6 xl:px-0">
        <p className="text-2xl xl:text-4xl font-bold">Genres</p>
        <IoClose className="text-3xl xl:hidden" onClick={onCloseGenre} />
      </header>
      <ul className="flex flex-col">
        {GENRES.map((item, index) => (
          <li
            className="text-lg xl:text-2xl cursor-pointer hover:text-tx-muted transition-all duration-200 px-6 xl:px-0 py-2 xl:py-6"
            key={index}
            value={item.name}
            onClick={() => onClickGenre(item.name)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <button
        className="cursor-pointer xl:hidden bg-surface border-border p-2 mx-6 border rounded-xl"
        onClick={toggle}
      >
        {isDark ? "Dark" : "Light"}
      </button>
    </aside>
  );
}
