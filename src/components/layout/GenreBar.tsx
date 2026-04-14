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
    <aside className="absolute top-3 right-3 w-60 rounded-3xl bg-base p-6 flex flex-col gap-6">
      <header className="flex flex-row items-center justify-between">
        <p className="text-2xl font-bold">Genres</p>
        <IoClose className="text-3xl" onClick={onCloseGenre} />
      </header>
      <ul className="flex flex-col gap-4">
        {GENRES.map((item, index) => (
          <li
            className="text-lg"
            key={index}
            value={item.name}
            onClick={() => onClickGenre(item.name)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <button className="cursor-pointer lg:hidden bg-surface border-border p-2 border rounded-xl" onClick={toggle}>
        {isDark ? "Dark" : "Light"}
      </button>
    </aside>
  );
}
