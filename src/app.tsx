import { useMemo, useState } from 'react';
import { Alert } from './components/alert';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Hero } from './components/hero';
import { RinherCard } from './components/rinher-card';
import { SearchInput } from './components/search-input';
import { SortInput } from './components/sort-input';

import r from '../rinhers.json';
import type { Rinher } from './types/rinher';
import { preprocessRinher } from './utils/preprocess-rinher';

const { summary, data } = r;
const rinhers = data.map(d => preprocessRinher(d as Rinher));
/** Rinhers.json was generated in this date */
const generatedAt = new Date(summary.generated_at).toLocaleString('pt-br');

export function App() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const normalizedSearch = search.trim().toLowerCase();

  const filteredRinhers = useMemo(() => {
    const includesSearch = (value?: unknown) =>
      (String(value ?? '')).toLowerCase().includes(normalizedSearch);

    const matched = rinhers.filter((rinher) => {
      if (!normalizedSearch) return true;

      if (includesSearch(rinher.name)) return true;
      if (includesSearch(rinher.technologies)) return true;
      if (includesSearch(rinher.submission?.name)) return true;
      if (includesSearch((rinher as unknown)['source-code-repo'])) return true;

      const arrayKeys = [
        'langs',
        'storages',
        'messaging',
        'load-balancers',
        'other-technologies',
      ];

      for (const key of arrayKeys) {
        const maybeArray = (rinher as any)[key];
        if (Array.isArray(maybeArray) && maybeArray.some((v: any) => includesSearch(v))) {
          return true;
        }
      }

      return false;
    });

    if (!sort) return matched;

    const sorted = [...matched];

    sorted.sort((a, b) => {
      if (sort === 'p99') {
        // Lower is better. strip 'ms' and fallback to big number
        const aVal = Number(a.partialResults?.p99?.replace?.('ms', '')) || 9999999;
        const bVal = Number(b.partialResults?.p99?.replace?.('ms', '')) || 9999999;
        return aVal - bVal;
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

    return sorted;
  }, [normalizedSearch, sort]);

  const hasResults = filteredRinhers.length > 0;

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
              <RinherCard key={idx} rinher={rinher} />
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
