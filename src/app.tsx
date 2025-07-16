import { useState } from 'react';
import { Header } from './components/header';
import { SearchInput } from './components/search-input';

import r from '../rinhers.json';

const { summary, data: rinhers } = r;
/** Rinhers.json was generated in this date */
const generatedAt = new Date(summary.generated_at).toLocaleDateString('pt-br');

export function App() {
  const [search, setSearch] = useState('');

  const filteredRinhers = rinhers.filter(r =>
    r.name.toLowerCase().includes(search)
    || r.langs.map(l => l.toLowerCase()).includes(search)
    || r['source-code-repo'].toLowerCase().includes(search),
  );

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col mt-3 h-dvh">
      <Header />

      <main>
        <div className="flex items-center max-w-3xl mx-auto">
          <img src="/banner.jpg" alt="Banner da Rinha de Back end escrito 'Rinha de Back end'" width="400" height="250" />

          <p>
            A rinha de Back end é uma competição super divertida.
            Veja mais sobre a Rinha 2025 no
            {' '}
            <a
              href="https://github.com/zanfranceschi/rinha-de-backend-2025"
              target="_blank"
              className="underline decoration-2 decoration-blue-500 hover:decoration-dashed"
            >
              repositório oficial
            </a>
            {' '}
            e no
            {' '}
            <a
              href="https://x.com/search?q=rinha%20de%20backend"
              target="_blank"
              className="underline decoration-2 decoration-blue-500 hover:decoration-dashed"
            >
              Twitter
            </a>
            .
          </p>
        </div>

        {/* search bar and rinhers count */}
        <div className="flex items-center gap-5">
          <SearchInput
            placeholder="Digite o nome da submissão..."
            onChange={(e) => { setSearch(e.target.value); }}
            value={search}
          />

          <div className="text-right">
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

        <ul className="my-5">
          {filteredRinhers.map(r => <li>{r.name}</li>)}
        </ul>

        <div role="alert" className="mt-3 relative flex w-full p-3 text-sm text-slate-600 border border-slate-300 rounded-lg">
          Essas informações foram todas tiradas do arquivo
          {' '}
          <code className="px-0.5">`info.json`</code>
          , adotado na edição 2025 da Rinha de Backend.
        </div>

        <div role="alert" className="mt-3 relative flex w-full p-3 text-sm text-slate-600 border border-yellow-500 bg-yellow-50 rounded-lg font-regular">
          *
          {' '}
          {summary.failed_downloads}
          {' '}
          Rinhers sem o arquivo
          {' '}
          <code className="px-0.5">`info.json`</code>
          , que não estão inclusos na contagem 🙁
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
