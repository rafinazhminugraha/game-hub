import { useEffect, useState } from "react";

export function useTheme() {
  // it means to get boolean data about is there a .dark class on html or not
  // for restoreing last prefrence of the suer
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // its for other component(mainly the toogle) can toogle the theme
  const toggle = () => setIsDark((prev) => !prev);

  return { isDark, toggle };
}
