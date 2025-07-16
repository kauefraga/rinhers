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
      className="flex items-center border-2 rounded-xl px-3 py-2 flex-1 transition-all hover:rounded-none focus-within:rounded-none focus-within:border-blue-500 data-[has-results=false]:border-red-500"
    >
      <input
        type="text"
        className="border-none outline-none flex-1 ml-2"
        {...props}
      />
      <img src="/search.svg" alt="lupa" width="32" height="32" />
    </div>
  );
}
