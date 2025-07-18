import type { Rinher } from '../types/rinher';
import { resultDescriptions } from '../utils/result-descriptions';

export function PartialResultsList({ partialResults }: { partialResults: Rinher['partialResults'] }) {
  if (!partialResults) return null;
  return (
    <ul className="grid gap-1 text-xs">
      <li title={resultDescriptions['p99']}>
        <b>p99:</b>
        {' '}
        {partialResults.p99}
      </li>
      <li title={resultDescriptions['Bônus (%)']}>
        <b>Bônus (%):</b>
        {' '}
        {partialResults.bonus}
      </li>
      <li title={resultDescriptions['Multa ($)']}>
        <b>Multa ($):</b>
        {' '}
        {partialResults.multa}
      </li>
      <li title={resultDescriptions['Lucro']}>
        <b>Lucro:</b>
        {' '}
        {partialResults.lucro}
      </li>
    </ul>
  );
}
