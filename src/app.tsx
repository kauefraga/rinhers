import { useState } from 'react';
import { Alert } from './components/alert';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Link } from './components/link';
import { RinherCard } from './components/rinher-card';
import { SearchInput } from './components/search-input';

import r from '../rinhers.json';

const { summary, data: rinhers } = r;
/** Rinhers.json was generated in this date */
const generatedAt = new Date(summary.generated_at).toLocaleDateString('pt-br');

export function App() {
  const [search, setSearch] = useState('');

  const filteredRinhers = rinhers.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
    || r.langs.some(l => l.toLowerCase().includes(search.toLowerCase()))
    || r['source-code-repo'].toLowerCase().includes(search.toLowerCase()),
  );
  const hasResults = filteredRinhers.length > 0;

  return (
    <>
      <Header />

      <main>
        <div className="flex flex-col md:flex-row items-center max-w-3xl mx-auto">
          <img src="/banner.png" alt="Banner da Rinha de Back end escrito 'Rinha de Back end'" width="400" height="250" />

          <p>
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

        <div className="flex flex-col my-8 md:flex-row items-center gap-5">
          <SearchInput
            placeholder="Participante, nome da submissão, linguagens..."
            onChange={(e) => { setSearch(e.target.value); }}
            value={search}
            hasResults={hasResults}
          />

          <div className="text-center md:text-right">
            <p>
              {summary.successful_downloads}
              {' '}
              Rinhers no momento*
            </p>
            <p>
              Dados de
              {' '}
              {generatedAt}
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 my-4 gap-4">
          {
            filteredRinhers.map(rinher => (
              <RinherCard key={rinher['source-code-repo']} rinher={rinher} />
            ))
          }
        </ul>

        <Alert>
          Essas informações foram todas tiradas do arquivo
          {' '}
          <code>`info.json`</code>
          , adotado na edição 2025 da Rinha de Back end.
        </Alert>

        <Alert type="warning">
          *
          {' '}
          {summary.failed_downloads}
          {' '}
          Rinhers sem o arquivo
          {' '}
          <code>`info.json`</code>
          , que não estão inclusos na contagem 🙁
        </Alert>
      </main>

      <Footer />
    </>
  );
}
