import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button disabled title="Em breve..." className="border-2 border-white rounded-xl px-8 py-2 hover:cursor-pointer transition-all text-black/80 hover:border-black/50 active:border-dashed" {...props}>
      {children}
    </button>
  );
}
