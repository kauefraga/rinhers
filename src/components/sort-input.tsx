import { ChartColumnIcon } from 'lucide-react';
import type { SelectHTMLAttributes } from 'react';

export function SortInput({ ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div
      className="flex items-right border-2 rounded-xl px-1 py-2 transition-all"
    >
      <ChartColumnIcon />
      <select {...props}>
        <option value="" disabled>Ordenar por</option>
        <option value="p99">P99</option>
        <option value="bonus">Bônus</option>
        <option value="multa">Multa</option>
        <option value="lucro">Lucro</option>
      </select>
    </div>
  );
}
