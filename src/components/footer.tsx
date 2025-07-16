import { Link } from './link';

export function Footer() {
  return (
    <footer className="mt-5 border-t-2 border-slate-600">
      <div className="w-full max-w-5xl mx-auto flex justify-between p-5">
        <p>
          Feito por
          {' '}
          <Link href="https://kauefraga.dev" type="secondary">Kauê Fraga</Link>
        </p>

        <p>
          <Link href="https://github.com/kauefraga/rinhers" type="secondary">Repositório Rinhers™</Link>
        </p>
      </div>
    </footer>
  );
}
