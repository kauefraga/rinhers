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
  const technologies: string[] = [];

  if (rinher.langs && rinher.langs instanceof Array) {
    technologies.push(...rinher.langs.map(normalizeLangName));
  }
  if (rinher.storages && rinher.storages instanceof Array) {
    technologies.push(...rinher.storages.map(s => s.toLowerCase()));
  }
  if (rinher['load-balancers'] && rinher['load-balancers'] instanceof Array) {
    technologies.push(...rinher['load-balancers'].map(l => l.toLowerCase()));
  }
  if (rinher.messaging && rinher.messaging instanceof Array) {
    technologies.push(...rinher.messaging.map(m => m.toLowerCase()));
  }
  if (rinher['other-technologies'] && rinher['other-technologies'] instanceof Array) {
    technologies.push(...rinher['other-technologies'].map(o => o.toLowerCase()));
  }

  let githubUser: string | undefined;

  if (rinher['source-code-repo'] && rinher['source-code-repo'].includes('https://')) {
    // e.g. /kauefraga/esquilo-aniquilador
    //      ^0   ^1           ^2
    githubUser = new URL(rinher['source-code-repo']).pathname.split('/')[1];
  }

  const profileImage = githubUser ? `https://github.com/${githubUser}.png` : '/icon.png';

  // e.g. /zanfranceschi/rinha-de-backend-2025/main/participantes/alexroza-rs/info.json
  //      ^0   ^1               ^2              ^3       ^4          ^5           ^6
  const submissionUrl = new URL(rinher._metadata.source_url).pathname.split('/');
  const submissionName = submissionUrl[5];
  const submissionLink = `https://github.com/zanfranceschi/rinha-de-backend-2025/blob/main/participantes/${submissionName}`;

  return {
    ...rinher,
    social: rinher.social ? [...rinher.social] : [],
    technologies: technologies.join(',').replace(',,', ','),
    profileImage,
    submission: {
      name: submissionName,
      link: submissionLink,
    },
  };
}
