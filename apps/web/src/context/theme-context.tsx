import React, { createContext, useContext, useEffect } from "react";

interface ThemeContextValue {
  theme: "light";
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = window.document.documentElement;
    // Ensure light mode is always applied
    root.classList.add("light");
    root.classList.remove("dark");
  }, []);

  const value: ThemeContextValue = {
    theme: "light",
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
