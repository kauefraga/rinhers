import type { InputHTMLAttributes } from 'react';

export function SearchInput({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
  // TODO data-has-results vindo do pai
  // data-[has-results=true]:border-green-500
  // border-red-500
  return (
    <div className="flex items-center border-2 rounded-xl px-3 py-2 flex-1 transition-all hover:rounded-none focus-within:rounded-none focus-within:border-blue-500">
      <input
        type="text"
        className="border-none outline-none flex-1 ml-2"
        {...props}
      />
      <img src="/search.svg" alt="lupa" width="32" height="32" />
    </div>
  );
}
