import type { Rinher } from '../types/rinher';
import { preprocessRinher } from '../utils/preprocess-rinher';
import { SmartIcon } from './smart-icon';

interface RinherCardProps {
  rinher: Rinher;
}

export function RinherCard({ rinher }: RinherCardProps) {
  const {
    profileImage,
    name,
    submission,
    technologies,
    'source-code-repo': sourceCodeRepo,
    social,
  } = preprocessRinher(rinher);

  return (
    <li className="flex flex-col justify-center gap-6 border-2 rounded-xl px-6 py-4 transition-all hover:rounded-none">
      <div className="flex items-center gap-3">
        <img
          src={profileImage}
          alt="Foto de perfil"
          className="h-12 rounded"
          loading="lazy"
        />
        <div>
          <h3 className="font-medium">{name}</h3>
          <a
            href={submission.link}
            target="_blank"
            className="text-sm text-black/50 hover:text-black/70 dark:text-white/50 dark:hover:text-white/70"
          >
            {submission.name}
          </a>
        </div>
      </div>

      <img
        src={`https://skillicons.dev/icons?i=${technologies.join(',')}`}
        alt="Ícones das tecnologias"
        loading="lazy"
        className="h-8 self-start"
      />

      <div className="flex justify-between">
        <a href={sourceCodeRepo} target="_blank"><code>Source code</code></a>

        <div className="flex gap-4">
          {social.map(s => <a key={s} href={s}><SmartIcon src={s} /></a>)}
        </div>
      </div>
    </li>
  );
};
