import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Theme } from "../types";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
  isDark: true,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")
  useEffect(() => {
  const saved = localStorage.getItem("mv-theme") as Theme | null;

  if (saved) {
    setThemeState(saved);
  }
}, []);

  const isDark = theme === "dark";

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem("mv-theme", t);
  }

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.style.backgroundColor = vars["--mv-bg"];
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
