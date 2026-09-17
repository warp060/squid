import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'arena' | 'squidgame';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'arena',
  toggleTheme: () => {},
});

const STORAGE_KEY = 'in26-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'squidgame') return 'squidgame';
    } catch { /* noop */ }
    return 'arena';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'squidgame') {
      root.setAttribute('data-theme', 'squidgame');
    } else {
      root.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch { /* noop */ }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'arena' ? 'squidgame' : 'arena'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
