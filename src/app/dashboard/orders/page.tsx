'use client';

import { motion } from 'framer-motion';
import { FiTruck, FiPackage, FiCheck, FiClock } from 'react-icons/fi';

const orders = [
  { id: '#ORD-001', crop: 'Rice Straw', farmer: 'Rajesh Kumar', qty: '15 tons', total: '₹37,500', status: 'Delivered', date: 'Mar 18, 2026' },
  { id: '#ORD-002', crop: 'Wheat Stubble', farmer: 'Suresh Yadav', qty: '20 tons', total: '₹44,000', status: 'In Transit', date: 'Mar 22, 2026' },
  { id: '#ORD-003', crop: 'Biochar', farmer: 'Amrita Devi', qty: '5 tons', total: '₹50,000', status: 'Processing', date: 'Mar 25, 2026' },
  { id: '#ORD-004', crop: 'Rice Husk', farmer: 'Lakshmi Bai', qty: '30 tons', total: '₹45,000', status: 'Delivered', date: 'Mar 10, 2026' },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">My Orders</h1>
        <p className="text-gray-400">Track your biomass orders and deliveries.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Orders', value: '4', icon: FiPackage, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'In Transit', value: '1', icon: FiTruck, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Delivered', value: '2', icon: FiCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
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

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Order History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-400 border-b border-white/10"><th className="pb-3">Order</th><th className="pb-3">Crop</th><th className="pb-3">Farmer</th><th className="pb-3">Qty</th><th className="pb-3">Total</th><th className="pb-3">Date</th><th className="pb-3">Status</th></tr></thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3 font-medium text-white">{o.id}</td>
                  <td className="py-3 text-gray-300">{o.crop}</td>
                  <td className="py-3 text-gray-300">{o.farmer}</td>
                  <td className="py-3 text-gray-300">{o.qty}</td>
                  <td className="py-3 text-emerald-400 font-medium">{o.total}</td>
                  <td className="py-3 text-gray-500">{o.date}</td>
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