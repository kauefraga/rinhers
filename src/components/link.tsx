import type { AnchorHTMLAttributes } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  type?: 'primary' | 'secondary';
}

export function Link({ type = 'primary', ...props }: LinkProps) {
  return (
    <a
      data-type={type}
      className="underline decoration-2 hover:decoration-dashed data-[type='primary']:decoration-blue-500"
      target="_blank"
      {...props}
    >
      {props.children}
    </a>
  );
}
