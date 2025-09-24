export type PartialResult = {
  p99: string;
  bonus: string;
  multa: number;
  lucro: number;
};

/**
 * Fetches and parses the markdown table of partial results.
 * Returns an object mapping slug -> results
 */
export async function fetchPartialResults() {
  const res = await fetch('https://raw.githubusercontent.com/zanfranceschi/rinha-de-backend-2025/main/PREVIA_RESULTADOS.md');
  if (!res.ok) throw new Error(`Failed to fetch PREVIA_RESULTADOS.md: ${res.statusText}`);
  const md = await res.text();

  const lines = md
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('|') && !l.startsWith('| --'));

  if (lines.length < 2) return {};

  lines.shift(); // Remove header

  const results: Record<string, PartialResult> = {};
  for (const line of lines) {
    const cols = line.split('|').map(c => c.trim()).filter(Boolean);
    // Table columns: [slug, p99, bonus, multa, lucro]
    const slug = cols[0];
    if (!slug) continue;

    results[slug] = {
      p99: cols[1],
      bonus: cols[2],
      multa: Number(cols[3]),
      lucro: Number(cols[4]),
    };
  }
  return results;
}
