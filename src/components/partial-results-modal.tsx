import type { Rinher } from '../types/rinher';
import { PartialResultsChart } from './partial-results-chart';
import { PartialResultsList } from './partial-results-list';

interface PartialResultsModalProps {
  show: boolean;
  onClose: () => void;
  rinher: Rinher;
}

export function PartialResultsModal({ show, onClose, rinher }: PartialResultsModalProps) {
  if (!show) return null;

  const { name, langs, 'partial-results': partialResults } = rinher;
  const chartData = partialResults
    ? [
        { name: 'p99', value: Number(partialResults.p99?.replace('ms', '')) || 0 },
        { name: 'Bônus (%)', value: Number(partialResults.bonus) || 0 },
        { name: 'Multa ($)', value: Number(partialResults.multa) || 0 },
        { name: 'Lucro', value: Number(partialResults.lucro) || 0 },
      ]
    : [];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 min-w-[400px] max-w-xs relative">
        <button
          className="absolute top-3 right-6 text-2xl text-neutral-400 hover:text-neutral-800 cursor-pointer"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>

        <div className="mb-5">
          <p className="font-medium">{name}</p>
          <p className="text-sm text-black/50 dark:text-white/50">{langs?.join(', ')}</p>
        </div>

        <div className="mb-5">
          <PartialResultsList partialResults={partialResults} />
        </div>

        <PartialResultsChart chartData={chartData} />
      </div>
    </div>
  );
}
