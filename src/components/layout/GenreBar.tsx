import { IoClose } from "react-icons/io5";
import { useTheme } from "../../lib/useTheme";
import GENRES from "../../hooks/useGenres";
import cropImage from "../../services/crop-image";

interface Props {
  onClickGenre: (slug: string) => void;
  onCloseGenre: () => void;
  selectedGenre: string;
}

export default function GenreBar({
  onClickGenre,
  onCloseGenre,
  selectedGenre,
}: Props) {
  const { isDark, toggle } = useTheme();
  const { genres } = GENRES();

  return (
    <aside className="w50 lg:w-70 rounded-3xl bg-base lg:bg-transparent flex flex-col gap-6 py-6">
      <header className="flex flex-row items-center justify-between px-6 lg:px-0">
        <p className="text-2xl lg:text-4xl font-bold">Genres</p>
        <IoClose className="text-3xl lg:hidden" onClick={onCloseGenre} />
      </header>
      <ul className="flex flex-col">
        <li
          className="text-lg lg:text-2xl cursor-pointer hover:text-tx-muted transition-all duration-200 px-6 lg:px-0 py-2 lg:py-3"
          value={""}
          onClick={() => onClickGenre("")}
        >
          All
        </li>
        {genres.map((genre, index) => (
          <li
            className={`flex text-lg gap-4 items-center lg:text-2xl cursor-pointer hover:text-tx-muted ${selectedGenre === genre.slug && `font-extrabold`} transition-all duration-200 px-6 lg:px-0 py-2 lg:py-3`}
            key={index}
            value={genre.name}
            onClick={() => onClickGenre(genre.slug)}
          >
            <figure className="w-8 h-8 lg:w-12 lg:h-12 shrink-0 overflow-hidden rounded-md">
              <img className="w-full h-full object-cover" src={cropImage(genre.image_background)} />
            </figure>
            <p>{genre.name}</p>
          </li>
        ))}
      </ul>
      <button
        className="cursor-pointer lg:hidden bg-surface border-border p-2 mx-6 border rounded-xl"
        onClick={toggle}
      >
        {isDark ? "Dark" : "Light"}
      </button>
    </aside>
  );
}
