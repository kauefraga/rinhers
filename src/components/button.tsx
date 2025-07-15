import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="border-2 border-black rounded-xl px-8 py-2 hover:cursor-pointer transition-all hover:rounded-none active:border-dashed" {...props}>
      {children}
    </button>
  );
}
