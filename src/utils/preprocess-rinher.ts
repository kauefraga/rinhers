import type { Rinher } from '../types/rinher';

export interface PreprocessedRinher extends Rinher {
  technologies: string[];
  profileImage: string;
  submission: {
    name: string;
    link: string;
  };
}

export function preprocessRinher(rinher: Rinher): PreprocessedRinher {
  const technologies = [
    ...rinher.langs ?? [],
    ...rinher.storages ?? [],
    ...rinher['load-balancers'] ?? [],
    ...rinher.messaging ?? [],
  ];

  // e.g. /kauefraga/esquilo-aniquilador
  //      ^0   ^1           ^2
  const githubUser = new URL(rinher['source-code-repo']).pathname.split('/')[1];

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
