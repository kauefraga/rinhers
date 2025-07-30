import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';
import { Button } from './button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      icon={theme === 'light' ? <MoonIcon /> : <SunIcon />}
    >
    </Button>
  );
}
