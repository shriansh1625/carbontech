'use client';

import { motion } from 'framer-motion';
import { FiDollarSign, FiTrendingUp, FiArrowUpRight } from 'react-icons/fi';
import { RevenueChart } from '@/components/Charts';

const revenueData = [
  { name: 'Oct', value: 5000 },
  { name: 'Nov', value: 12000 },
  { name: 'Dec', value: 8000 },
  { name: 'Jan', value: 15000 },
  { name: 'Feb', value: 22000 },
  { name: 'Mar', value: 18000 },
];

const transactions = [
  { id: 1, desc: 'Biomass sale — Rice Straw 5t', amount: '+₹15,000', date: 'Mar 20, 2026', type: 'credit' },
  { id: 2, desc: 'Carbon credit sale — 8 tCO2e', amount: '+₹9,600', date: 'Mar 15, 2026', type: 'credit' },
  { id: 3, desc: 'Platform fee', amount: '-₹1,200', date: 'Mar 10, 2026', type: 'debit' },
  { id: 4, desc: 'Biomass sale — Wheat Stubble 10t', amount: '+₹25,000', date: 'Feb 28, 2026', type: 'credit' },
];

export default function RevenuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Revenue</h1>
        <p className="text-gray-400">Track your earnings from biomass sales and carbon credits.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue', value: '₹80,000', change: '+18%', icon: FiDollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'This Month', value: '₹24,600', change: '+12%', icon: FiTrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Pending', value: '₹5,000', change: '2 orders', icon: FiArrowUpRight, color: 'text-amber-400', bg: 'bg-amber-500/10' },
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

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Revenue Trend (₹)</h3>
        <RevenueChart data={revenueData} />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div>
                <p className="font-medium text-white text-sm">{t.desc}</p>
                <p className="text-xs text-gray-500">{t.date}</p>
              </div>
              <span className={`font-bold text-sm ${t.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>{t.amount}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}