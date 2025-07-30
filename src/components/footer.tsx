import { Link } from './link';

interface FooterProps {
  generatedAt: string;
}

export function Footer({ generatedAt }: FooterProps) {
  return (
    <footer className="mt-5 border-t-2 border-slate-600">
      <div className="w-full max-w-5xl mx-auto flex justify-between p-5">
        <p>
          Feito por
          {' '}
          <Link href="https://kauefraga.dev" type="secondary">Kauê Fraga</Link>
        </p>

        <p className="text-black/50">
          dados gerados em
          {' '}
          {generatedAt}
        </p>

        <p>
          <Link href="https://github.com/kauefraga/rinhers" type="secondary">Repositório Rinhers™</Link>
        </p>
      </div>
    </footer>
  );
}
