'use client';

import { motion } from 'framer-motion';
import { FiUsers, FiFileText, FiShield } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';
import { TrendChart, DistributionChart } from '@/components/Charts';

const userGrowth = [
  { name: 'Oct', farmers: 800, industry: 50, companies: 30 },
  { name: 'Nov', farmers: 1500, industry: 80, companies: 50 },
  { name: 'Dec', farmers: 3000, industry: 120, companies: 75 },
  { name: 'Jan', farmers: 5500, industry: 180, companies: 110 },
  { name: 'Feb', farmers: 8500, industry: 250, companies: 160 },
  { name: 'Mar', farmers: 12500, industry: 340, companies: 220 },
];

const userDist = [
  { name: 'Farmers', value: 12500 },
  { name: 'Industry', value: 340 },
  { name: 'Companies', value: 220 },
  { name: 'Verifiers', value: 45 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400">Platform overview and management.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '13,105', change: '+520 this week', icon: FiUsers, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Carbon Projects', value: '284', change: '42 pending', icon: FiFileText, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Credits Generated', value: '45,000', change: 'tCO2e', icon: GiSolidLeaf, color: 'text-teal-400', bg: 'bg-teal-500/10' },
          { label: 'Verifications', value: '156', change: '28 pending', icon: FiShield, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5 glass-card-hover">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <p className="text-xs text-emerald-400 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-xl`}><stat.icon className={`text-xl ${stat.color}`} /></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">User Growth</h3>
          <TrendChart data={userGrowth} lines={[{ key: 'farmers', color: '#34d399' }, { key: 'industry', color: '#38bdf8' }, { key: 'companies', color: '#fbbf24' }]} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">User Distribution</h3>
          <DistributionChart data={userDist} />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Pending Verifications</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-400 border-b border-white/10"><th className="pb-3">Project</th><th className="pb-3">Farmer</th><th className="pb-3">Area</th><th className="pb-3">Est. Credits</th><th className="pb-3">Status</th><th className="pb-3">Action</th></tr></thead>
            <tbody>
              {[
                { project: 'Punjab No-Burn #128', farmer: 'Rajesh Kumar', area: '15 acres', credits: '12 tCO2e', status: 'Pending' },
                { project: 'Haryana Biochar #045', farmer: 'Sunita Devi', area: '8 acres', credits: '24 tCO2e', status: 'In Review' },
                { project: 'UP Zero Till #089', farmer: 'Mohan Lal', area: '20 acres', credits: '8 tCO2e', status: 'Pending' },
              ].map((p, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3 font-medium text-white">{p.project}</td>
                  <td className="py-3 text-gray-300">{p.farmer}</td>
                  <td className="py-3 text-gray-300">{p.area}</td>
                  <td className="py-3 text-gray-300">{p.credits}</td>
                  <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full ${p.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>{p.status}</span></td>
                  <td className="py-3"><button className="text-sm text-emerald-400 hover:underline">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}