import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

type Props = { mobile?: boolean };

export function ThemeBoton({ mobile = false }: Props) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const size = mobile ? 26 : 24;

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-12 h-12 cursor-pointer flex items-center justify-center overflow-hidden transition-colors text-zinc-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white
    ${!mobile ? "rounded-xl hover:bg-zinc-200 dark:hover:bg-gray-900" : ""}`}
    >
      <Sun
        size={size}
        strokeWidth={2}
        className={`absolute transition-all duration-300
          ${isDark ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"}`}
      />
      <Moon
        size={size}
        strokeWidth={2}
        className={`absolute transition-all duration-300
          ${isDark ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"}`}
      />
    </button>
  );
}
