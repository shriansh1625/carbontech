'use client';

import { motion } from 'framer-motion';
import { FiTrendingUp, FiPackage, FiDollarSign, FiMapPin } from 'react-icons/fi';
import { GiSolidLeaf, GiWheat } from 'react-icons/gi';
import { RevenueChart, CarbonCreditsChart } from '@/components/Charts';
import { useAuthStore } from '@/lib/store';

const revenueData = [
  { name: 'Oct', value: 5000 },
  { name: 'Nov', value: 12000 },
  { name: 'Dec', value: 8000 },
  { name: 'Jan', value: 15000 },
  { name: 'Feb', value: 22000 },
  { name: 'Mar', value: 18000 },
];

const creditData = [
  { name: 'Oct', value: 2 },
  { name: 'Nov', value: 5 },
  { name: 'Dec', value: 3 },
  { name: 'Jan', value: 7 },
  { name: 'Feb', value: 10 },
  { name: 'Mar', value: 8 },
];

export default function FarmerDashboard() {
  const { profile } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome back, {profile?.displayName || 'Farmer'}!</h1>
        <p className="text-gray-400">Here&apos;s your farm overview and earnings summary.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '₹39,500', change: '+12%', icon: FiDollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Carbon Credits', value: '35 tCO2e', change: '+8 new', icon: GiSolidLeaf, color: 'text-teal-400', bg: 'bg-teal-500/10' },
          { label: 'Biomass Listed', value: '45 tons', change: '3 active', icon: GiWheat, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Farm Area', value: '25 acres', change: '2 farms', icon: FiMapPin, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 glass-card-hover"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <p className="text-xs text-emerald-400 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <stat.icon className={`text-xl ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">Revenue Trend (₹)</h3>
          <RevenueChart data={revenueData} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">Carbon Credits Earned (tCO2e)</h3>
          <CarbonCreditsChart data={creditData} />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { text: 'Carbon project verified — 8 credits generated', time: '2 hours ago', icon: GiSolidLeaf, color: 'text-emerald-400' },
            { text: 'Biomass order received — 5 tons wheat straw', time: '1 day ago', icon: FiPackage, color: 'text-blue-400' },
            { text: 'Payment received — ₹15,000 from biomass sale', time: '3 days ago', icon: FiDollarSign, color: 'text-amber-400' },
            { text: 'New carbon credits listed — 10 tCO2e at ₹1,200', time: '5 days ago', icon: FiTrendingUp, color: 'text-purple-400' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <item.icon className={`${item.color} flex-shrink-0`} />
              <div className="flex-1">
                <p className="text-sm text-gray-300">{item.text}</p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}