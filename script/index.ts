import fs from 'fs/promises';
import { green, yellow } from './colors';
import { DEFAULT_REPO, showErrors } from './config';
import { fetchParticipantsInfo, getParticipants, mapParticipantsToInfoJsonUrls, ParticipantResult, splitInChunks } from './participant-info';
import { fetchPartialResults } from './results';

function generateRinhersOutput(results: Awaited<ReturnType<typeof fetchParticipantsInfo>>) {
  type SuccessfulResult = Extract<ParticipantResult, { success: true }>['data'];
  const successful: SuccessfulResult[] = [];

  type FailedResult = Pick<Extract<ParticipantResult, { success: false }>, 'error' | 'url'>;
  const failed: FailedResult[] = [];

  results.forEach(result => {
    if (result.success) {
      successful.push(result.data);
    } else {
      failed.push(result);
    }
  });

  green(`👍 ${successful.length} rinhers tão ok`);
  yellow(
    `😭 ${failed.length} rinhers ficaram de fora`
    + (showErrors ? '' : ' (use a flag --errors para ver o que ocorreu)')
  );

  return {
    summary: {
      total_files: results.length,
      successful_downloads: successful.length,
      failed_downloads: failed.length,
      generated_at: new Date().toISOString(),
    },
    data: successful,
    errors: failed,
  };
}

// -- MAIN

const participants = await getParticipants(DEFAULT_REPO);
console.log(`Uhuu!! ${participants.length} rinhers encontrados.`);

const infoJsonUrls = mapParticipantsToInfoJsonUrls(DEFAULT_REPO, participants);

const concurrency = 10;

const chunks = splitInChunks(infoJsonUrls, concurrency);
const partialResults = await fetchPartialResults();
const participantsInfo = await fetchParticipantsInfo(chunks, infoJsonUrls.length, concurrency, partialResults);

const output = generateRinhersOutput(participantsInfo);

await fs.writeFile('rinhers.json', JSON.stringify(output, null, 2));

console.log(':> Veja a lista de rinhers em `rinhers.json`');
