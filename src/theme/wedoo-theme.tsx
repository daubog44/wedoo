import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type WedooTheme = "dark" | "light";

const storageKey = "wedoo-theme";
const defaultTheme: WedooTheme = "dark";

type WedooThemeContextValue = {
  setTheme: (theme: WedooTheme) => void;
  theme: WedooTheme;
  toggleTheme: () => void;
};

const WedooThemeContext = createContext<WedooThemeContextValue | null>(null);

function getInitialTheme(): WedooTheme {
  if (typeof window === "undefined") {
    return defaultTheme;
  }

  const storedTheme = window.localStorage.getItem(storageKey);
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return defaultTheme;
}

export function WedooThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<WedooTheme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.wedooTheme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <WedooThemeContext.Provider
      value={{
        setTheme,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </WedooThemeContext.Provider>
  );
}

export function useWedooTheme() {
  const context = useContext(WedooThemeContext);

  if (!context) {
    throw new Error("useWedooTheme must be used within WedooThemeProvider");
  }

  return context;
}
