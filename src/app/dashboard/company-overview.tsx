'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiAward, FiTrendingUp, FiDollarSign, FiDownload } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';
import { DistributionChart, TrendChart } from '@/components/Charts';
import { useAuthStore } from '@/lib/store';

const offsetData = [
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

export default function CompanyDashboard() {
  const { profile } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome, {profile?.displayName || 'Company'}!</h1>
        <p className="text-gray-400">Track your carbon offset portfolio and purchase credits.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Credits Purchased', value: '1,000', change: 'tCO2e total', icon: GiSolidLeaf, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Credits Retired', value: '750', change: 'tCO2e offset', icon: FiTrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Total Investment', value: '₹12L', change: 'This year', icon: FiDollarSign, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Certificates', value: '3', change: 'Downloaded', icon: FiAward, color: 'text-purple-400', bg: 'bg-purple-500/10' },
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
          <h3 className="font-bold text-white mb-4">Offset Distribution by Type</h3>
          <DistributionChart data={offsetData} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">Purchase vs Retired Trend</h3>
          <TrendChart data={trendData} lines={[{ key: 'purchased', color: '#34d399' }, { key: 'retired', color: '#38bdf8' }]} />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-white">Certificates</h3>
          <Link href="/dashboard/certificates" className="text-sm text-emerald-400 font-medium hover:underline">View All</Link>
        </div>
        <div className="space-y-3">
          {[
            { title: 'Carbon Neutral Certificate Q1 2026', credits: 250, date: 'Jan 2026' },
            { title: 'Carbon Neutral Certificate Q4 2025', credits: 300, date: 'Oct 2025' },
            { title: 'Carbon Neutral Certificate Q3 2025', credits: 200, date: 'Jul 2025' },
          ].map((cert, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <FiAward className="text-emerald-400 text-xl" />
                <div>
                  <p className="font-medium text-white text-sm">{cert.title}</p>
                  <p className="text-xs text-gray-500">{cert.credits} tCO2e &bull; {cert.date}</p>
                </div>
              </div>
              <button className="flex items-center gap-1 text-sm text-emerald-400 hover:underline">
                <FiDownload /> Download
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}