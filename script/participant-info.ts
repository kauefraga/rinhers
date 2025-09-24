import stripJsonComments from "strip-json-comments";
import { gray } from "./colors";
import { headers, showErrors } from "./config";
import { PartialResult } from "./results";

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
export async function getParticipants({ owner, repo }: Repository, path: string = 'participantes') {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers
  });

  const participants = await response.json() as DirectoryEntry[]; // validate json?

  return participants.filter((p) => p.type === 'dir');
}

export function mapParticipantsToInfoJsonUrls({ owner, repo }: Repository, participants: DirectoryEntry[]) {
  return participants.map(p => `https://raw.githubusercontent.com/${owner}/${repo}/main/${p.path}/info.json`);
}

export function splitInChunks(urls: string[], concurrency: number) {
  // chunk1 = [fileUrl1, fileUrl2, fileUrl3, ...]
  // chunks = [chunk1, chunk2, ...]
  const chunks: string[][] = [];

  for (let i = 0; i < urls.length; i += concurrency) {
    chunks.push(urls.slice(i, i + concurrency));
  }

  return chunks;
}

export type ParticipantResult = {
  success: true;
  data: {
    'name': string;
    'social'?: string[];
    'source-code-repo': string;
    'langs'?: string[];
    'storages'?: string[];
    'load-balancers'?: string[];
    'messaging'?: string[];
    'other-technologies'?: string[];
    'partial-results': Record<string, PartialResult>;
    '_metadata': {
      source_url: string;
      downloaded_at: string;
    };
  };
} | {
  success: false;
  error: string;
  url: string;
};

export async function fetchParticipantsInfo(chunks: string[][], filesNumber: number, concurrency: number, partialResults: Record<string, PartialResult>) {
  const results: ParticipantResult[] = [];

  for (const chunk of chunks) {
    const promises = chunk.map(async (fileDownloadUrl) => {
      try {
        const response = await fetch(fileDownloadUrl, { headers });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const text = await response.text();
        const sanitized = stripJsonComments(text, { whitespace: false });
        const jsonData = JSON.parse(sanitized);

        const slugMatch = fileDownloadUrl.match(/participantes\/([^/]+)\//);
        const slug = slugMatch ? slugMatch[1] : undefined;

        if (slug && partialResults[slug]) {
          jsonData['partial-results'] = partialResults[slug];
        }

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
    const fulfilledResults = chunkResults
      .filter(c => c.status === 'fulfilled')
      .map(f => f.value) as ParticipantResult[];

    results.push(...fulfilledResults);

    gray(`Processados ${Math.min((chunks.indexOf(chunk) + 1) * concurrency, filesNumber)} de ${filesNumber} arquivos`);
  }

  return results;
}
