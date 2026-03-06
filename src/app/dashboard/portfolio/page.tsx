'use client';

import { motion } from 'framer-motion';
import { FiTrendingUp, FiPieChart } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';
import { DistributionChart, TrendChart } from '@/components/Charts';

const portfolioData = [
  { name: 'No-Burn', value: 400 },
  { name: 'Soil Carbon', value: 250 },
  { name: 'Biochar', value: 200 },
  { name: 'Methane', value: 150 },
];

const trendData = [
  { name: 'Q1', purchased: 200, retired: 150 },
  { name: 'Q2', purchased: 350, retired: 300 },
  { name: 'Q3', purchased: 500, retired: 420 },
  { name: 'Q4', purchased: 700, retired: 600 },
];

const holdings = [
  { project: 'Punjab No-Burn Initiative', credits: 400, status: 'Active', purchased: 'Jan 2026', value: '₹4,80,000' },
  { project: 'Haryana Biochar Project', credits: 200, status: 'Active', purchased: 'Feb 2026', value: '₹3,00,000' },
  { project: 'UP Zero Tillage Program', credits: 250, status: 'Retired', purchased: 'Oct 2025', value: '₹2,75,000' },
  { project: 'Rajasthan Methane Capture', credits: 150, status: 'Retired', purchased: 'Aug 2025', value: '₹2,70,000' },
];

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">My Portfolio</h1>
        <p className="text-gray-400">Track your carbon credit investments and offsets.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Credits', value: '1,000 tCO2e', icon: GiSolidLeaf, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Portfolio Value', value: '₹12,25,000', icon: FiTrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Offset Rate', value: '75%', icon: FiPieChart, color: 'text-teal-400', bg: 'bg-teal-500/10' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-xl`}><stat.icon className={`text-xl ${stat.color}`} /></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">Portfolio Distribution</h3>
          <DistributionChart data={portfolioData} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">Purchase vs Retired</h3>
          <TrendChart data={trendData} lines={[{ key: 'purchased', color: '#34d399' }, { key: 'retired', color: '#38bdf8' }]} />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Holdings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-400 border-b border-white/10"><th className="pb-3">Project</th><th className="pb-3">Credits</th><th className="pb-3">Value</th><th className="pb-3">Purchased</th><th className="pb-3">Status</th></tr></thead>
            <tbody>
              {holdings.map((h, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3 font-medium text-white">{h.project}</td>
                  <td className="py-3 text-gray-300">{h.credits} tCO2e</td>
                  <td className="py-3 text-emerald-400">{h.value}</td>
                  <td className="py-3 text-gray-500">{h.purchased}</td>
                  <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full ${h.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>{h.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}