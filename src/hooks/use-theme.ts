import { useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(
    () => (localStorage.getItem('theme') ?? 'light') as 'light' | 'dark',
  );

  const toggleTheme = () => {
    const html = document.documentElement;

    if (html.classList.contains('dark')) {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      html.classList.remove('dark');
      return;
    }

    setTheme('dark');
    localStorage.setItem('theme', 'dark');
    html.classList.add('dark');
  };

  return {
    theme,
    toggleTheme,
  };
}
