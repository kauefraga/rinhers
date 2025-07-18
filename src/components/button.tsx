import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({ icon, children, ...props }: ButtonProps) {
  return (
    <button
      className="flex gap-2 items-center border-2 border-transparent rounded-xl px-8 py-2 hover:cursor-pointer transition hover:border-black active:border-dashed dark:hover:border-white"
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
