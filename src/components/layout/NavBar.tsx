import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/gamepad-icon.png";
import { CiSearch } from "react-icons/ci";
import { useTheme } from "../../lib/useTheme";

interface Props {
  onCLickNavbar: () => void;
  onSubmitQuery: (e: React.FormEvent) => void;
  onChangeQuery: (query: string) => void;
}

export default function NavBar({
  onCLickNavbar,
  onSubmitQuery,
  onChangeQuery,
}: Props) {
  const { isDark, toggle } = useTheme();

  return (
    <nav className="flex flex-row justify-between items-center">
      <figure>
        <img className="h-12 w-auto" src={logo} alt="Gamehub Logo" />
      </figure>
      <form
        className="flex flex-row items-center gap-2 rounded-2xl bg-surface p-2 min-w-80 focus-within:bg-surface-hover"
        onSubmit={onSubmitQuery}
      >
        <CiSearch className="text-3xl" />
        <input
          // value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
          className="focus:outline-none bg-transparent"
          type="text"
          placeholder="Search"
        />
      </form>
      <RxHamburgerMenu
        className="text-3xl cursor-pointer xl:hidden"
        onClick={onCLickNavbar}
      />
      <button
        className="cursor-pointer hover:bg-surface-hover max-xl:hidden bg-surface border-border border p-4 rounded-xl"
        onClick={toggle}
      >
        {isDark ? "Dark" : "Light"}
      </button>
    </nav>
  );
}
