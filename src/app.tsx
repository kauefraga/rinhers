import { useState } from 'react';
import { Alert } from './components/alert';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { RinherCard } from './components/rinher-card';
import { SearchInput } from './components/search-input';
import { SortInput } from './components/sort-input';
import { Hero } from './components/hero';

import r from '../rinhers.json';
import type { Rinher } from './types/rinher';

const { summary, data: rinhers } = r;
/** Rinhers.json was generated in this date */
const generatedAt = new Date(summary.generated_at).toLocaleString('pt-br');

export function App() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const filteredRinhers = (search
    ? rinhers.filter((r) => {
        if (typeof r.name !== 'string') {
          return r['langs'].some(l => l.toLowerCase().includes(search.toLowerCase()))
            || r['storages']?.some(l => l.toLowerCase().includes(search.toLowerCase()))
            || r['messaging']?.some(l => l.toLowerCase().includes(search.toLowerCase()))
            || r['load-balancers']?.some(l => l.toLowerCase().includes(search.toLowerCase()))
            || r['other-technologies']?.some(l => l.toLowerCase().includes(search.toLowerCase()))
            || r['source-code-repo'].toLowerCase().includes(search.toLowerCase());
        }

        return r.name.toLowerCase().includes(search.toLowerCase())
          || r['langs'].some(l => l.toLowerCase().includes(search.toLowerCase()))
          || r['storages']?.some(l => l.toLowerCase().includes(search.toLowerCase()))
          || r['messaging']?.some(l => l.toLowerCase().includes(search.toLowerCase()))
          || r['load-balancers']?.some(l => l.toLowerCase().includes(search.toLowerCase()))
          || r['other-technologies']?.some(l => l.toLowerCase().includes(search.toLowerCase()))
          || r['source-code-repo'].toLowerCase().includes(search.toLowerCase());
      })
    : rinhers) as Rinher[];

  const hasResults = filteredRinhers.length > 0;

  if (sort) {
    filteredRinhers.sort((a, b) => {
      if (sort === 'p99') {
        // Lower is better
        return (Number(a.partialResults?.p99?.replace('ms', '')) || 99999) - (Number(b.partialResults?.p99?.replace('ms', '')) || 99999);
      }
      if (sort === 'bonus') {
        return (Number(b.partialResults?.bonus) || 0) - (Number(a.partialResults?.bonus) || 0);
      }
      if (sort === 'multa') {
        return (Number(b.partialResults?.multa) || 0) - (Number(a.partialResults?.multa) || 0);
      }
      if (sort === 'lucro') {
        return (Number(b.partialResults?.lucro) || 0) - (Number(a.partialResults?.lucro) || 0);
      }
      return 0;
    });
  }

  return (
    <>
      <Header />

      <main>
        <Hero count={{
          rinhers: summary.successful_downloads,
          rinhersWithIssues: summary.failed_downloads,
        }}
        />

        <div className="flex flex-col my-8 md:flex-row items-center gap-5">
          <SearchInput
            placeholder="Participante, nome da submissão, linguagens..."
            onChange={(e) => { setSearch(e.target.value); }}
            value={search}
            hasResults={hasResults}
          />
          <SortInput
            onChange={(e) => { setSort(e.target.value); }}
            value={sort}
          />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 my-4 gap-4">
          {
            filteredRinhers.map((rinher, idx) => (
              <RinherCard key={`${rinher['source-code-repo']}#${String(idx)}`} rinher={rinher} />
            ))
          }
        </ul>

        <div id="issues">
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
        </div>
      </main>

      <Footer generatedAt={generatedAt} />
    </>
  );
}
