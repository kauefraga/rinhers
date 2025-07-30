import type { Rinher } from '../types/rinher';

export interface PreprocessedRinher extends Rinher {
  technologies: string;
  profileImage: string;
  submission: {
    name: string;
    link: string;
  };
}

function normalizeLangName(lang: string) {
  const l = lang.toLowerCase();

  if (l === 'c#' || l === 'csharp') {
    return 'cs';
  }

  if (l === '.net') {
    return 'dotnet';
  }

  if (l === 'node' || l === 'node.js') {
    return 'nodejs';
  }

  return l;
}

export function preprocessRinher(rinher: Rinher): PreprocessedRinher {
  const technologies = [
    ...rinher.langs ? rinher.langs.map(normalizeLangName) : [],
    ...rinher.storages ? rinher.storages.map(s => s.toLowerCase()) : [],
    ...rinher['load-balancers'] ? rinher['load-balancers'].map(l => l.toLowerCase()) : [],
    ...rinher.messaging ? rinher.messaging.map(m => m.toLowerCase()) : [],
    ...rinher['other-technologies'] ? rinher['other-technologies'].map(o => o.toLowerCase()) : [],
  ].join(',').replace(',,', ',');

  // e.g. /kauefraga/esquilo-aniquilador
  //      ^0   ^1           ^2
  const githubUser = rinher['source-code-repo'].includes('https://')
    ? new URL(rinher['source-code-repo']).pathname.split('/')[1]
    : '';

  const profileImage = `https://github.com/${githubUser}.png`;

  // e.g. /zanfranceschi/rinha-de-backend-2025/main/participantes/alexroza-rs/info.json
  //      ^0   ^1               ^2              ^3       ^4          ^5           ^6
  const submissionUrl = new URL(rinher._metadata.source_url).pathname.split('/');
  const submissionName = submissionUrl[5];
  const submissionLink = `https://github.com/zanfranceschi/rinha-de-backend-2025/blob/main/participantes/${submissionName}`;

  return {
    ...rinher,
    technologies,
    profileImage,
    submission: {
      name: submissionName,
      link: submissionLink,
    },
  };
}
