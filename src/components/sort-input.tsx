import { ChartColumnIcon } from 'lucide-react';
import type { SelectHTMLAttributes } from 'react';

export function SortInput({ ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div
      className="flex items-right border-2 rounded-xl px-3 py-2 transition-all hover:rounded-none focus-within:rounded-none focus-within:border-blue-500"
    >
      <ChartColumnIcon />
      <select {...props} className="outline-none">
        <option value="" disabled>Ordenar por</option>
        <option value="p99">P99</option>
        <option value="bonus">Bônus</option>
        <option value="multa">Multa</option>
        <option value="lucro">Lucro</option>
      </select>
    </div>
  );
}
