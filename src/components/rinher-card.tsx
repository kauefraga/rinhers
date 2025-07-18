import { useState } from 'react';
import type { Rinher } from '../types/rinher';
import { SmartIcon } from './smart-icon';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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

  const barColors = ['#2563eb', '#ea580c', '#ef4444', '#22c55e'];
  const resultDescriptions: Record<string, string> = {
    'Lucro': 'É sua pontuação final. Equivale ao seu lucro.',
    'Multa ($)': 'Se o total de inconsistência for maior que zero, há multa de 35%.',
    'p99': 'É o que determina o bônus por performance.',
    'Bônus (%)': 'Fórmula: max((11 - p99.valor) * 0.02, 0)',
  };
  const partialResults = rinher.partialResults;
  const chartData = partialResults
    ? [
        { name: 'p99', value: Number(partialResults.p99.replace('ms', '')) || 0 },
        { name: 'Bônus (%)', value: Number(partialResults.bonus) || 0 },
        { name: 'Multa ($)', value: Number(partialResults.multa) || 0 },
        { name: 'Lucro', value: Number(partialResults.lucro) || 0 },
      ]
    : [];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      return (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded p-2 shadow text-xs">
          <b>
            {name}
            :
          </b>
          {' '}
          {value}
          <br />
          <span className="text-neutral-500">{resultDescriptions[name]}</span>
        </div>
      );
    }
    return null;
  };

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
                className="ml-1 hover:text-blue-600"
                style={{ fontSize: 18, lineHeight: 1 }}
              >
                <span role="img" aria-label="Ver gráfico">📊</span>
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

      {partialResults && showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-6 min-w-[300px] max-w-xs relative">
            <button
              className="absolute top-2 right-3 text-2xl text-neutral-400 hover:text-neutral-800 cursor-pointer"
              onClick={() => { setShowModal(false); }}
              aria-label="Fechar"
            >
              ×
            </button>
            <div className="font-bold mb-1">{rinher.name}</div>
            <div className="mb-3 text-[12px] text-neutral-500">{rinher.langs?.join(', ')}</div>
            <div className="mb-2">
              <ul className="grid gap-1 text-xs">
                <li title={resultDescriptions['p99']}>
                  <b>p99:</b>
                  {' '}
                  {partialResults.p99}
                </li>
                <li title={resultDescriptions['Bônus (%)']}>
                  <b>Bônus (%):</b>
                  {' '}
                  {partialResults.bonus}
                </li>
                <li title={resultDescriptions['Multa ($)']}>
                  <b>Multa ($):</b>
                  {' '}
                  {partialResults.multa}
                </li>
                <li title={resultDescriptions['Lucro']}>
                  <b>Lucro:</b>
                  {' '}
                  {partialResults.lucro}
                </li>
              </ul>
            </div>
            <ResponsiveContainer width={260} height={200}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value">
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${String(index)}`} fill={barColors[index % barColors.length]} radius={[8, 8, 0, 0]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
