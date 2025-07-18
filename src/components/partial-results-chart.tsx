import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { resultDescriptions } from '../utils/result-descriptions';

const barColors = ['#2563eb', '#ea580c', '#ef4444', '#22c55e'];

export function PartialResultsChart({ chartData }: { chartData: { name: string; value: number }[] }) {
  const CustomTooltip = ({ active, payload }: any) => {
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
    <ResponsiveContainer width={350} height={200}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value">
          {chartData.map((_, index) => (
            <Cell key={`cell-${String(index)}`} fill={barColors[index % barColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
