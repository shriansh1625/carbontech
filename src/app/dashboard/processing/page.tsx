'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiTrendingUp, FiDroplet, FiZap, FiDatabase, FiBarChart2 } from 'react-icons/fi';
import { RevenueChart, TrendChart, DistributionChart } from '@/components/Charts';

const monthlyData = [
  { name: 'Oct', biomassInput: 120, co2Captured: 48, co2Sold: 35, biochar: 24, energy: 180 },
  { name: 'Nov', biomassInput: 145, co2Captured: 58, co2Sold: 42, biochar: 29, energy: 210 },
  { name: 'Dec', biomassInput: 160, co2Captured: 64, co2Sold: 55, biochar: 32, energy: 240 },
  { name: 'Jan', biomassInput: 180, co2Captured: 72, co2Sold: 60, biochar: 36, energy: 270 },
  { name: 'Feb', biomassInput: 200, co2Captured: 80, co2Sold: 68, biochar: 40, energy: 300 },
  { name: 'Mar', biomassInput: 220, co2Captured: 88, co2Sold: 75, biochar: 44, energy: 330 },
];

const distributionData = [
  { name: 'CO₂ Sold', value: 335 },
  { name: 'CO₂ Stored', value: 75 },
  { name: 'Biochar', value: 205 },
  { name: 'Energy', value: 1530 },
];

export default function ProcessingPage() {
  const [period] = useState('6m');

  const stats = [
    { label: 'Biomass Processed', value: '1,025 tons', change: '+18%', icon: FiDatabase, color: 'emerald' },
    { label: 'CO₂ Captured', value: '410 tons', change: '+22%', icon: FiDroplet, color: 'teal' },
    { label: 'CO₂ Sold', value: '335 tons', change: '+15%', icon: FiTrendingUp, color: 'blue' },
    { label: 'Energy Generated', value: '1,530 MWh', change: '+20%', icon: FiZap, color: 'amber' },
    { label: 'Biochar Produced', value: '205 tons', change: '+12%', icon: FiBarChart2, color: 'purple' },
    { label: 'Avg Efficiency', value: '87.5%', change: '+3%', icon: FiActivity, color: 'rose' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <FiActivity className="text-emerald-400" /> Processing Plant Analytics
        </h1>
        <p className="text-gray-400 mt-1">Track biomass processing, CO₂ capture, storage, and sales metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/15 flex items-center justify-center`}>
                <stat.icon className={`text-${stat.color}-400`} />
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Processing Trend */}
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Processing Trends ({period === '6m' ? 'Last 6 Months' : 'YTD'})</h3>
          <TrendChart
            data={monthlyData}
            lines={[
              { key: 'biomassInput', color: '#34d399' },
              { key: 'co2Captured', color: '#38bdf8' },
              { key: 'co2Sold', color: '#fbbf24' },
            ]}
          />
        </div>

        {/* Output Distribution */}
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Output Distribution</h3>
          <DistributionChart data={distributionData} />
        </div>
      </div>

      {/* Energy & Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Energy Generation</h3>
          <RevenueChart data={monthlyData.map((d) => ({ name: d.name, value: d.energy }))} />
        </div>
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Biochar Production</h3>
          <RevenueChart data={monthlyData.map((d) => ({ name: d.name, value: d.biochar }))} />
        </div>
      </div>

      {/* CO2 Storage Detail */}
      <div className="glass-card p-5">
        <h3 className="text-lg font-semibold text-white mb-4">CO₂ Capture & Sales Detail</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Month</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Biomass In</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">CO₂ Captured</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">CO₂ Sold</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">CO₂ Stored</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((row) => (
                <tr key={row.name} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="py-3 px-4 text-white font-medium">{row.name} 2026</td>
                  <td className="py-3 px-4 text-right text-gray-300">{row.biomassInput} tons</td>
                  <td className="py-3 px-4 text-right text-teal-400">{row.co2Captured} tons</td>
                  <td className="py-3 px-4 text-right text-emerald-400">{row.co2Sold} tons</td>
                  <td className="py-3 px-4 text-right text-blue-400">{row.co2Captured - row.co2Sold} tons</td>
                  <td className="py-3 px-4 text-right text-amber-400">{((row.co2Captured / row.biomassInput) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
