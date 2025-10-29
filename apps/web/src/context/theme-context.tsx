import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = "healthily-fit-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // LOCKED TO LIGHT MODE - Dark theme disabled but infrastructure preserved
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme class
    root.classList.remove("light", "dark");
    
    // Force light mode only
    root.classList.add("light");
    
    // Clear any dark mode preference from localStorage
    localStorage.removeItem(THEME_STORAGE_KEY);
  }, [theme]);

  const toggleTheme = () => {
    // Theme toggle disabled - always stay in light mode
    // Infrastructure kept for future dark mode implementation
    console.log("Theme toggle is currently disabled. Light mode only.");
  };

  const setTheme = (newTheme: Theme) => {
    // Theme setting disabled - always use light mode
    console.log("Theme setting is currently disabled. Light mode only.");
  };

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

