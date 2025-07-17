import type { Rinher } from '../types/rinher';
import { SmartIcon } from './smart-icon';

interface RinherCardProps {
  rinher: Rinher;
}

export function RinherCard({ rinher }: RinherCardProps) {
  const technologies = rinher.langs?.join(',')
    + ',' + rinher.storages?.join(',')
    + ',' + rinher['load-balancers']?.join(',')
    + ',' + rinher.messaging?.join(',');

  const githubUser = rinher['source-code-repo']
    .substring(8) // removes https://
    .split('/')[1]; // split in 3, assuming github.com [0] / user [1] / repo [2]

  const profileImage = `https://github.com/${githubUser}.png`;

  return (
    <li className="flex flex-col gap-5 border-2 rounded-xl p-6 transition-all hover:rounded-none">
      <div className="flex items-center gap-3">
        <img
          src={profileImage}
          alt="Foto de perfil"
          className="h-12 rounded"
          loading="lazy"
        />
        <h3 className="font-medium">{rinher.name}</h3>
      </div>

      <img
        src={`https://skillicons.dev/icons?i=${technologies}`}
        alt="Ícones das tecnologias"
        loading="lazy"
        className="h-8 self-start"
      />

      <div className="flex justify-between">
        <a href={rinher['source-code-repo']}><code>Source code</code></a>

        <div className="flex gap-4">
          {rinher.social.map(s => <a href={s}><SmartIcon key={s} src={s} /></a>)}
        </div>
      </div>
    </li>
  );
}
