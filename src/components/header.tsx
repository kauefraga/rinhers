import { Button } from './button';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="flex justify-between">
      <div className="flex items-center gap-3">
        <img src="/icon.png" alt="" width="50" height="50" />
        <h1 className="text-2xl font-bold">Rinhers™</h1>
      </div>

      <div className="flex gap-8">
        <Button>
          Atualizar
        </Button>

        <ThemeToggle />
      </div>
    </header>
  );
}
