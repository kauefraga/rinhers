import { useTheme } from '../hooks/use-theme';
import { Button } from './button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 ' : '🌞 '}

      {theme === 'light' ? 'Modo escuro' : 'Modo claro'}
    </Button>
  );
}
