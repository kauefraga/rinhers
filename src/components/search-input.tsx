import { SearchIcon } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasResults: boolean;
}

/**
 * Define `data-has-results` with a boolean to show red when there are no search results.
 * */
export function SearchInput({ hasResults = true, ...props }: SearchInputProps) {
  return (
    <div
      data-has-results={hasResults}
      className="w-full flex items-center border-2 rounded-xl px-3 py-2 transition-all hover:rounded-none focus-within:rounded-none focus-within:border-blue-500 data-[has-results=false]:border-red-500"
    >
      <input
        type="text"
        className="border-none outline-none flex-1 ml-2 placeholder-black/50 dark:placeholder-white/50"
        {...props}
      />
      <SearchIcon color="#7900FE" />
    </div>
  );
}
