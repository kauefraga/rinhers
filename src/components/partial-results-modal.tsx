import type { Rinher } from '../types/rinher';
import { PartialResultsChart } from './partial-results-chart';
import { PartialResultsList } from './partial-results-list';

export function PartialResultsModal({ show, onClose, rinher }: { show: boolean; onClose: () => void; rinher: Rinher }) {
  if (!show) return null;
  const { name, langs, partialResults } = rinher;
  const chartData = partialResults
    ? [
        { name: 'p99', value: Number(partialResults.p99.replace('ms', '')) || 0 },
        { name: 'Bônus (%)', value: Number(partialResults.bonus) || 0 },
        { name: 'Multa ($)', value: Number(partialResults.multa) || 0 },
        { name: 'Lucro', value: Number(partialResults.lucro) || 0 },
      ]
    : [];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-6 min-w-[300px] max-w-xs relative">
        <button
          className="absolute top-2 right-3 text-2xl text-neutral-400 hover:text-neutral-800 cursor-pointer"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <div className="font-bold mb-1">{name}</div>
        <div className="mb-3 text-[12px] text-neutral-500">{langs?.join(', ')}</div>
        <div className="mb-2">
          <PartialResultsList partialResults={partialResults} />
        </div>
        <PartialResultsChart chartData={chartData} />
      </div>
    </div>
  );
}
