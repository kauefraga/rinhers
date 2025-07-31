import { ArrowDown } from 'lucide-react';
import { Link } from './link';

interface HeroProps {
  count: {
    rinhers: number;
    rinhersWithIssues: number;
  };
}

export function Hero({ count }: HeroProps) {
  return (
    <section className="flex flex-col gap-5 mt-5">
      <div className="flex flex-col md:flex-row items-center">
        <img src="/banner.png" alt="Banner da Rinha de Back end escrito 'Rinha de Back end'" width="400" height="250" />

        <p className="text-center md:text-left">
          A rinha de Back end é uma competição super divertida.
          Veja mais sobre a Rinha 2025 no
          {' '}
          <Link href="https://github.com/zanfranceschi/rinha-de-backend-2025">
            repositório oficial
          </Link>
          {' '}
          e no
          {' '}
          <Link href="https://x.com/search?q=rinha%20de%20backend">
            Twitter
          </Link>
          .
        </p>

      </div>

      <div className="flex flex-col items-center gap-8 md:gap-0 md:flex-row md:justify-around px-6 py-4 rounded-xl border-2 border-black/50 dark:border-white/50 transition-all hover:rounded-none">
        <div className="flex flex-col items-center">
          <span className="text-[#7900FE] text-4xl font-bold">{count.rinhers}</span>
          <p>Rinhers participando</p>
        </div>

        <a href="#issues" className="flex flex-col items-center">
          <span className="text-[#7900FE] text-4xl font-bold">{count.rinhersWithIssues}</span>
          <p>Rinhers com problemas</p>
          <ArrowDown />
        </a>

        <div className="flex flex-col items-center">
          <span className="text-[#7900FE] text-4xl font-bold">17/08</span>
          <p>Data final de entrega</p>
        </div>
      </div>
    </section>
  );
}
