import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

import type { Theme } from "@/shared/types/theme";

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

  root.classList.toggle("dark", isDark);
  root.classList.toggle("light", !isDark);

  root.style.backgroundColor =
    getComputedStyle(root).getPropertyValue("--mv-bg");
}, [isDark]);
  
   

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
