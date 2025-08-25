import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Get initial theme synchronously to prevent flashing
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';
    
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme;
      }
      
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      console.warn('Error getting initial theme:', e);
      return 'light';
    }
  };

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    console.log('Theme initialization - current theme:', theme);
    applyTheme(theme);
    setIsLoaded(true);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    
    console.log('Applying theme:', newTheme, 'Current classes:', root.className);
    
    if (newTheme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark');
    } else {
      root.setAttribute('data-theme', 'light');
      root.classList.remove('dark');
    }
    
    console.log('Theme applied - New classes:', root.className, 'Data theme:', root.getAttribute('data-theme'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Toggling theme from', theme, 'to', newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
