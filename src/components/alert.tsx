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
      className="mt-3 p-3 text-sm rounded-lg border text-slate-600 data-[type='info']:border-slate-300 data-[type='warning']:border-yellow-500 data-[type='warning']:bg-yellow-50"
    >
      {children}
    </div>
  );
}
