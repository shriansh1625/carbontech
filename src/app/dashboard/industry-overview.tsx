'use client';

import { motion } from 'framer-motion';
import { FiShoppingCart, FiTruck, FiPackage, FiMessageCircle } from 'react-icons/fi';
import { RevenueChart } from '@/components/Charts';
import { useAuthStore } from '@/lib/store';

const spendData = [
  { name: 'Oct', value: 50000 },
  { name: 'Nov', value: 80000 },
  { name: 'Dec', value: 65000 },
  { name: 'Jan', value: 120000 },
  { name: 'Feb', value: 95000 },
  { name: 'Mar', value: 110000 },
];

export default function IndustryDashboard() {
  const { profile } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome, {profile?.displayName || 'Industry Partner'}!</h1>
        <p className="text-gray-400">Manage your biomass orders and supply chain.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Orders', value: '8', change: '3 in transit', icon: FiShoppingCart, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Total Purchased', value: '250 tons', change: 'This quarter', icon: FiPackage, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Deliveries', value: '12', change: 'Completed', icon: FiTruck, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Active Chats', value: '5', change: 'With farmers', icon: FiMessageCircle, color: 'text-purple-400', bg: 'bg-purple-500/10' },
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
        <h3 className="font-bold text-white mb-4">Procurement Spending (₹)</h3>
        <RevenueChart data={spendData} />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-400 border-b border-white/10"><th className="pb-3">Order</th><th className="pb-3">Farmer</th><th className="pb-3">Type</th><th className="pb-3">Qty</th><th className="pb-3">Status</th></tr></thead>
            <tbody>
              {[
                { id: '#001', farmer: 'Rajesh Kumar', type: 'Rice Straw', qty: '15 tons', status: 'Delivered' },
                { id: '#002', farmer: 'Suresh Yadav', type: 'Wheat Stubble', qty: '20 tons', status: 'In Transit' },
                { id: '#003', farmer: 'Amrita Devi', type: 'Biochar', qty: '5 tons', status: 'Processing' },
              ].map((o, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3 font-medium text-white">{o.id}</td>
                  <td className="py-3 text-gray-300">{o.farmer}</td>
                  <td className="py-3 text-gray-300">{o.type}</td>
                  <td className="py-3 text-gray-300">{o.qty}</td>
                  <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full ${o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400' : o.status === 'In Transit' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'}`}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}