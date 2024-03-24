import { useEffect, useState, useCallback, useMemo } from 'react';

const useThemeSwitcher = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [theme, setTheme] = useState<string>(() => localStorage.theme || 'dark');

  const activeTheme: string = useMemo(() => (theme === 'dark' ? 'light' : 'dark'), [theme]);

  const handleThemeChange = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(activeTheme);
    root.classList.add(theme);
  }, [theme, activeTheme]);

  return [activeTheme, handleThemeChange];
};

export default useThemeSwitcher;
