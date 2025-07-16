import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="border-2 border-white rounded-xl px-8 py-2 hover:cursor-pointer transition-all hover:border-black active:border-dashed" {...props}>
      {children}
    </button>
  );
}
