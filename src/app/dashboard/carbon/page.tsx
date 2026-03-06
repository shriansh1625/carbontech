'use client';

import { motion } from 'framer-motion';
import { FiAward, FiTrendingUp, FiClock } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';
import { CarbonCreditsChart } from '@/components/Charts';

const creditData = [
  { name: 'Oct', value: 2 },
  { name: 'Nov', value: 5 },
  { name: 'Dec', value: 3 },
  { name: 'Jan', value: 7 },
  { name: 'Feb', value: 10 },
  { name: 'Mar', value: 8 },
];

const projects = [
  { id: 1, name: 'No-Burn Initiative - Kharif 2025', status: 'Verified', credits: 12, methodology: 'CDM AMS-III.H' },
  { id: 2, name: 'Biochar Production - Rabi 2025', status: 'Pending', credits: 8, methodology: 'Verra VCS' },
  { id: 3, name: 'Zero Tillage - Kharif 2024', status: 'Verified', credits: 15, methodology: 'Gold Standard' },
];

export default function CarbonPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Carbon Credits</h1>
        <p className="text-gray-400">Track your carbon credit generation and projects.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Credits', value: '35 tCO2e', icon: GiSolidLeaf, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Active Projects', value: '3', icon: FiTrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Pending Verification', value: '1', icon: FiClock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5 glass-card-hover">
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

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Credits Over Time (tCO2e)</h3>
        <CarbonCreditsChart data={creditData} />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Carbon Projects</h3>
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <GiSolidLeaf className="text-emerald-400 text-xl" />
                <div>
                  <p className="font-medium text-white text-sm">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.methodology} &bull; {p.credits} tCO2e</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${p.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>{p.status}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}