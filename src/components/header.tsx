import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src="/icon.png" alt="Logo Rinhers™" width="50" height="50" />
        <h1 className="text-2xl font-bold">Rinhers™</h1>
      </div>

      <ThemeToggle />
    </header>
  );
}
