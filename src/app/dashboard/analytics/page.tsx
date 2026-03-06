'use client';

import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiDollarSign, FiActivity } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';
import { TrendChart, DistributionChart, RevenueChart } from '@/components/Charts';

const revenueData = [
  { name: 'Oct', value: 500000 },
  { name: 'Nov', value: 800000 },
  { name: 'Dec', value: 650000 },
  { name: 'Jan', value: 1200000 },
  { name: 'Feb', value: 950000 },
  { name: 'Mar', value: 1100000 },
];

const regionData = [
  { name: 'Punjab', value: 4500 },
  { name: 'Haryana', value: 3200 },
  { name: 'UP', value: 2800 },
  { name: 'MP', value: 1200 },
  { name: 'Others', value: 800 },
];

const userTrend = [
  { name: 'Oct', farmers: 800, industry: 50, companies: 30 },
  { name: 'Nov', farmers: 1500, industry: 80, companies: 50 },
  { name: 'Dec', farmers: 3000, industry: 120, companies: 75 },
  { name: 'Jan', farmers: 5500, industry: 180, companies: 110 },
  { name: 'Feb', farmers: 8500, industry: 250, companies: 160 },
  { name: 'Mar', farmers: 12500, industry: 340, companies: 220 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400">Platform-wide analytics and insights.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '₹52L', change: '+22%', icon: FiDollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Active Users', value: '13,105', change: '+520', icon: FiUsers, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Credits Traded', value: '45K tCO2e', change: '+18%', icon: GiSolidLeaf, color: 'text-teal-400', bg: 'bg-teal-500/10' },
          { label: 'Growth Rate', value: '32%', change: 'MoM', icon: FiTrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
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
          <h3 className="font-bold text-white mb-4">Platform Revenue (₹)</h3>
          <RevenueChart data={revenueData} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">Regional Distribution</h3>
          <DistributionChart data={regionData} />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">User Growth Trend</h3>
        <TrendChart data={userTrend} lines={[{ key: 'farmers', color: '#34d399' }, { key: 'industry', color: '#38bdf8' }, { key: 'companies', color: '#fbbf24' }]} />
      </motion.div>
    </div>
  );
}