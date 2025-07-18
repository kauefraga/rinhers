import { useState } from 'react';
import type { Rinher } from '../types/rinher';
import { SmartIcon } from './smart-icon';
import { PartialResultsModal } from './partial-results-modal';

interface RinherCardProps {
  rinher: Rinher;
}

export function RinherCard({ rinher }: RinherCardProps) {
  const [showModal, setShowModal] = useState(false);

  const technologies = rinher.langs?.join(',')
    + ',' + rinher.storages?.join(',')
    + ',' + rinher['load-balancers']?.join(',')
    + ',' + rinher.messaging?.join(',');

  const githubUser = rinher['source-code-repo']
    .substring(8) // removes https://
    .split('/')[1]; // split in 3, assuming github.com [0] / user [1] / repo [2]

  const profileImage = `https://github.com/${githubUser}.png`;
  const partialResults = rinher.partialResults;

  return (
    <>
      <li className="flex flex-col gap-5 border-2 rounded-xl p-6 transition-all hover:rounded-none">
        <div className="flex items-center gap-3">
          <img
            src={profileImage}
            alt="Foto de perfil"
            className="h-12 rounded"
            loading="lazy"
          />
          <h3 className="font-medium">{rinher.name}</h3>
          {partialResults
            && (
              <button
                onClick={() => { setShowModal(true); }}
                title="Ver resultado parcial"
                className="ml-1 hover:text-blue-600 text-[18px] leading-[1] cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  viewBox="0 0 20 20"
                  fill="none"
                  className="inline align-middle"
                >
                  <rect x="2" y="10" width="3" height="7" rx="1" fill="#2563eb" />
                  <rect x="8.5" y="6" width="3" height="11" rx="1" fill="#ea580c" />
                  <rect x="15" y="3" width="3" height="14" rx="1" fill="#22c55e" />
                </svg>
              </button>
            )}
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

      <PartialResultsModal show={!!(partialResults && showModal)} onClose={() => { setShowModal(false); }} rinher={rinher} />
    </>
  );
}
