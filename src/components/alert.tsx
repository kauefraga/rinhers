import type { ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
  type?: 'info' | 'warning';
}

export function Alert({ children, type = 'info' }: AlertProps) {
  return (
    <div
      role="alert"
      data-type={type}
      className="mt-3 p-3 text-sm rounded-lg border text-black/60 data-[type='info']:border-black/30 data-[type='warning']:border-yellow-500 data-[type='warning']:bg-yellow-50 dark:text-white/60 dark:data-[type='info']:border-white/30 dark:data-[type='warning']:bg-yellow-500/20"
    >
      {children}
    </div>
  );
}
