import { useState } from 'react';
import { type PreprocessedRinher } from '../utils/preprocess-rinher';
import { PartialResultsModal } from './partial-results-modal';
import { SmartIcon } from './smart-icon';

interface RinherCardProps {
  rinher: PreprocessedRinher;
}

export function RinherCard({ rinher }: RinherCardProps) {
  const [showModal, setShowModal] = useState(false);

  const {
    profileImage,
    name,
    submission,
    technologies,
    'source-code-repo': sourceCodeRepo,
    social,
    'partial-results': partialResults,
  } = rinher;

  return (
    <>
      <li className="flex flex-col justify-center gap-6 border-2 border-black/50 rounded-xl px-6 py-4 transition-all hover:rounded-none dark:border-white/50">
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
          <a href={sourceCodeRepo} target="_blank"><code>Source code</code></a>

          <div className="flex gap-4">
            {social?.map(s => <a key={Math.random() * s.length} href={s}><SmartIcon src={s} /></a>)}
          </div>
        </div>
      </li>

      <PartialResultsModal show={!!(partialResults && showModal)} onClose={() => { setShowModal(false); }} rinher={rinher} />
    </>
  );
};
