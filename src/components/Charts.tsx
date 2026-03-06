'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

const COLORS = ['#34d399', '#38bdf8', '#fbbf24', '#f87171', '#a78bfa', '#f472b6'];

interface ChartData {
  name: string;
  [key: string]: string | number;
}

export function RevenueChart({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} />
        <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
        <Tooltip contentStyle={{ backgroundColor: '#0d1512', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 12, color: '#fff' }} />
        <Area type="monotone" dataKey="value" stroke="#34d399" fill="rgba(52,211,153,0.1)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function CarbonCreditsChart({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} />
        <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
        <Tooltip contentStyle={{ backgroundColor: '#0d1512', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 12, color: '#fff' }} />
        <Bar dataKey="value" fill="#34d399" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DistributionChart({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
          outerRadius={100}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: '#0d1512', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 12, color: '#fff' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function TrendChart({ data, lines }: { data: ChartData[]; lines: { key: string; color: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} />
        <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
        <Tooltip contentStyle={{ backgroundColor: '#0d1512', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 12, color: '#fff' }} />
        <Legend wrapperStyle={{ color: '#9ca3af' }} />
        {lines.map((line) => (
          <Line key={line.key} type="monotone" dataKey={line.key} stroke={line.color} strokeWidth={2} dot={{ r: 3 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
