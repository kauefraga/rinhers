import { Button } from './button';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="flex justify-between">
      <h1 className="text-2xl font-bold">Rinhers™</h1>

      <div className="flex gap-8">
        <Button>
          Atualizar
        </Button>

        <ThemeToggle />
      </div>
    </header>
  );
}
