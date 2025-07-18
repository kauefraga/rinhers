import { GithubIcon, GlobeIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

export function SmartIcon({ src }: { src: string }) {
  if (src.includes('github')) {
    return <GithubIcon className="hover:scale-105" />;
  }

  if (src.includes('linkedin')) {
    return <LinkedinIcon className="hover:scale-105" />;
  }

  if (src.includes('twitter') || src.includes('x')) {
    return <TwitterIcon className="hover:scale-105" />;
  }

  return <GlobeIcon className="hover:scale-105" />;
}
