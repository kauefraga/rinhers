import { useEffect, useState } from "react";
import type { RinhersPartialResultsData } from "../types/rinhers-partial-results-data.ts";

async function fetchPartialResults() {
  const res = await fetch(
    "https://raw.githubusercontent.com/zanfranceschi/rinha-de-backend-2025/main/PREVIA_RESULTADOS.md"
  );
  if (!res.ok)
    throw new Error(`Failed to fetch PREVIA_RESULTADOS.md: ${res.statusText}`);
  const md = await res.text();

  const lines = md
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("|") && !l.startsWith("| --"));

  if (lines.length < 2) return {};

  lines.shift(); // Remove header

  const results: Record<string, RinhersPartialResultsData> = {};
  for (const line of lines) {
    const cols = line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    // Table columns: [slug, p99, bonus, multa, lucro]
    const slug = cols[0];
    if (!slug) continue;
    results[slug] = {
      p99: String(cols[1]).endsWith("ms") ? cols[1] : "-",
      bonus: !isNaN(parseFloat(cols[2])) ? cols[2] : "0.0",
      multa: !isNaN(parseFloat(cols[3])) ? cols[3] : "0.0",
      lucro: !isNaN(parseFloat(cols[4])) ? cols[4] : "0.0",
    };
  }
  return results;
}

export function RinhersRanking() {
  const [data, setData] = useState<
    { name: string; data: RinhersPartialResultsData }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await fetchPartialResults();

        const parsed = Object.entries(results)
          .map(([name, data]) => ({
            name,
            data,
          }))
          .sort((a, b) => {
            return (
              parseFloat(b.data.lucro || "0") - parseFloat(a.data.lucro || "0")
            );
          });

        setData(parsed);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Carregando resultados...</p>;
  const top3 = data.slice(0, 3);
  const rest = data.slice(3);
  return (
    <div className="w-full py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
        🏆 Top 3 Participantes
      </h2>

      <div className="flex flex-col items-center mb-10 gap-6">
        {/* Primeiro lugar no topo */}
        <div className="flex-1 p-4 rounded-xl shadow-md text-center text-gray-800 bg-yellow-300">
          <h3 className="text-xl font-semibold">1º - {top3[0].name}</h3>
          <p className="text-left">
            <strong>Lucro:</strong> {parseFloat(top3[0].data.lucro).toFixed(2)}
          </p>
          <p className="text-left">
            <strong>P99:</strong> {top3[0].data.p99}
          </p>
          <p className="text-left">
            <strong>Bônus:</strong> {top3[0].data.bonus}
          </p>
          <p className="text-left">
            <strong>Multa:</strong> {top3[0].data.multa}
          </p>
        </div>

        {/* Segundo e terceiro lugares lado a lado */}
        <div className="flex flex-col lg:flex-row gap-6">
          {[1, 2].map((i, index) => {
            const bgColors = ["bg-gray-300", "bg-orange-400"];
            return (
              <div
                key={top3[i].name}
                className={`flex-1 p-4 rounded-xl shadow-md text-center text-gray-800 ${bgColors[index]}`}
              >
                <h3 className="text-xl font-semibold">
                  {i + 1}º - {top3[i].name}
                </h3>
                <p className="text-left">
                  <strong>Lucro:</strong>{" "}
                  {parseFloat(top3[i].data.lucro).toFixed(2)}
                </p>
                <p className="text-left">
                  <strong>P99:</strong> {top3[i].data.p99}
                </p>
                <p className="text-left">
                  <strong>Bônus:</strong> {top3[i].data.bonus}
                </p>
                <p className="text-left">
                  <strong>Multa:</strong> {top3[i].data.multa}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-md overflow-hidden table-auto">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Posição</th>
              <th className="px-4 py-2 text-left">Participante</th>
              <th className="px-4 py-2 text-left">Lucro</th>
              <th className="px-4 py-2 text-left">P99</th>
              <th className="px-4 py-2 text-left">Bônus</th>
              <th className="px-4 py-2 text-left">Multa</th>
            </tr>
          </thead>
          <tbody className={"divide-y-2 divide-gray-200 dark:divide-gray-700"}>
            {rest.map(({ name, data }, index) => (
              <tr
                key={name}
                className="text-sm text-black/60 hover:bg-gray-50 hover:text-black dark:text-white/50 dark:hover:bg-gray-800 dark:hover:text-white transition"
              >
                <td className="py-4 px-6">{index + 4}º</td>
                <td className="py-4 px-6">{name}</td>
                <td className="py-4 px-6">
                  {parseFloat(data.lucro).toFixed(2)}
                </td>
                <td className="py-4 px-6">{data.p99}</td>
                <td className="py-4 px-6">{data.bonus}</td>
                <td className="py-4 px-6">{data.multa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
