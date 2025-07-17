export function SmartIcon({ src }: { src: string }) {
  if (src.includes('github')) {
    return <img src="/github.svg" alt="Ícone GitHub" width="32" height="32" />;
  }

  if (src.includes('linkedin')) {
    return <img src="/linkedin.svg" alt="Ícone LinkedIn" width="32" height="32" />;
  }

  if (src.includes('twitter') || src.includes('x')) {
    return <img src="/twitter.svg" alt="Ícone Twitter/X" width="32" height="32" />;
  }

  return <img src="/globe.svg" alt="Ícone de globo" width="32" height="32" />;
}
