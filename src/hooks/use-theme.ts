import { useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(
    () => (localStorage.getItem('theme') ?? 'light') as 'light' | 'dark',
  );

  const html = document.documentElement;

  if (theme === 'dark') {
    html.classList.add('dark');
  }

  const toggleTheme = () => {
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
