import { useState } from 'react';
import { Alert } from './components/alert';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Link } from './components/link';
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
    <>
      <div className="w-full max-w-5xl mx-auto flex flex-col mt-3">
        <Header />

        <main>
          <div className="flex items-center max-w-3xl mx-auto">
            <img src="/banner.jpg" alt="Banner da Rinha de Back end escrito 'Rinha de Back end'" width="400" height="250" />

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

          <Alert>
            Essas informações foram todas tiradas do arquivo
            {' '}
            <code>`info.json`</code>
            , adotado na edição 2025 da Rinha de Backend.
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
      </div>

      <Footer />
    </>
  );
}
