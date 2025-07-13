import fs from 'fs/promises';
import { gray, green, yellow } from './colors';
import { DEFAULT_REPO, headers, showErrors } from './config';

/* To improve:
  - Use streams to fetch one file at a time, process it and
  write to rinhers.json as soon as it's available (memory efficient
  - Maybe store info.json metadata (sha and size) to check if they
  have changed, if not don't fetch them again
 */

type DirectoryEntry = {
  name: string,
  path: string,
  sha: string,
  size: number,
  html_url: string,
  type: 'dir' | 'file'
}

type Repository = {
  owner: string,
  repo: string,
}

/**
 * Get all entries (directories, files) of a given path in a GitHub public repository.
 * Use GitHub Contents API (`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)
 * to fetch all participants of the Rinha de Back end 2025 edition
 * @param path where to retrieve all the entries (default `participantes`)
 */
async function getParticipants({ owner, repo }: Repository, path: string = 'participantes') {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers
  });

  const participants = await response.json() as DirectoryEntry[]; // validate json?

  return participants.filter((p) => p.type === 'dir');
}

function mapParticipantsToInfoJsonUrls({ owner, repo }: Repository, participants: DirectoryEntry[]) {
  // doesn't get file size and sha, but reduces N requests to GitHub API
  return participants.map(p => `https://raw.githubusercontent.com/${owner}/${repo}/main/${p.path}/info.json`);
}

type FileUrls = ReturnType<typeof mapParticipantsToInfoJsonUrls>;

function splitInChunks(urls: FileUrls, concurrency: number) {
  // chunk = [fileUrl1, fileUrl2, fileUrl3, ...]
  // chunks = [chunk1, chunk2, ...]
  const chunks: FileUrls[] = [];

  for (let i = 0; i < urls.length; i += concurrency) {
    chunks.push(urls.slice(i, i + concurrency));
  }

  return chunks;
}

type FilePathsChunks = ReturnType<typeof splitInChunks>;

async function fetchChunks(chunks: FilePathsChunks, filesNumber: number, concurrency: number) {
  const results = [];

  for (const chunk of chunks) {
    const promises = chunk.map(async (fileDownloadUrl) => {
      try {
        const response = await fetch(fileDownloadUrl, { headers });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const text = await response.text();
        const jsonData = JSON.parse(text);

        return {
          success: true,
          data: {
            ...jsonData,
            _metadata: {
              source_url: fileDownloadUrl,
              downloaded_at: new Date().toISOString()
            }
          }
        };
      } catch (error: any) {
        if (showErrors) {
          console.error(`Falha ao baixar ${fileDownloadUrl}:`, error.message);
        }

        return {
          success: false,
          error: error.message,
          url: fileDownloadUrl
        };
      }
    });

    const chunkResults = await Promise.allSettled(promises);
    results.push(...chunkResults);

    gray(`Processados ${Math.min((chunks.indexOf(chunk) + 1) * concurrency, filesNumber)} de ${filesNumber} arquivos`);
  }

  return results;
}

function generateRinhersOutput(results: Awaited<ReturnType<typeof fetchChunks>>) {
  const successful: any[] = [];
  const failed: any[] = [];

  results.forEach(result => {
    if (result.status === 'fulfilled') {
      if (result.value.success) {
        successful.push(result.value.data);
      } else {
        failed.push(result.value);
      }
    } else {
      failed.push({
        error: result.reason?.message || 'Promise rejeitada',
        url: 'unknown'
      });
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
      generated_at: new Date().toISOString()
    },
    data: successful,
    errors: failed
  };
}

const participants = await getParticipants(DEFAULT_REPO);

console.log(`Uhuu!! ${participants.length} rinhers encontrados.`);

const infoJsonUrls = mapParticipantsToInfoJsonUrls(DEFAULT_REPO, participants);

const concurrency = 10;

const chunks = splitInChunks(infoJsonUrls, concurrency);
const results = await fetchChunks(chunks, infoJsonUrls.length, concurrency);

const output = generateRinhersOutput(results);

await fs.writeFile('rinhers.json', JSON.stringify(output, null, 2));

console.log(':> Veja a lista de rinhers em `rinhers.json`');
