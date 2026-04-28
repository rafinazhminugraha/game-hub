import { RxHamburgerMenu } from "react-icons/rx";
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
    <nav className="flex max-h-24 flex-wrap items-center  gap-3 overflow-y-auto lg:max-h-none lg:flex-nowrap lg:items-center lg:gap-6 lg:overflow-visible">
      <p className="text-lg md:text-xl lg:text-2xl font-extrabold tracking-widest">
        GAMEHUB
      </p>
      <form
        className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl bg-surface p-2 focus-within:bg-surface-hover lg:w-2/3"
        onSubmit={onSubmitQuery}
      >
        <CiSearch className="text-3xl" />
        <input
          // value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
          className="focus:outline-none bg-transparent w-4/5"
          type="text"
          placeholder="Search"
        />
      </form>
      <RxHamburgerMenu
        className="text-3xl cursor-pointer lg:hidden"
        onClick={onCLickNavbar}
      />
      <button
        className="cursor-pointer hover:bg-surface-hover max-lg:hidden bg-surface border-border border p-4 rounded-xl"
        onClick={toggle}
      >
        {isDark ? "Dark" : "Light"}
      </button>
    </nav>
  );
}
