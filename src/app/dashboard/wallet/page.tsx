'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { FiDollarSign, FiTrendingUp, FiArrowDown, FiArrowUp, FiCreditCard } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';
import { DistributionChart, RevenueChart } from '@/components/Charts';

interface WalletData {
  balance: number;
  totalEarnings: number;
  totalWithdrawals: number;
  carbonCreditEarnings: number;
  biomassSalesEarnings: number;
  co2SalesEarnings: number;
  equipmentRentalEarnings: number;
}

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  category: string;
  amount: number;
  description: string;
  balanceAfter: number;
  createdAt: string;
}

export default function WalletPage() {
  const { profile } = useAuthStore();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.uid) fetchWallet();
  }, [profile]);

  async function fetchWallet() {
    try {
      const res = await fetch(`/api/wallet?userId=${profile?.uid}`);
      const data = await res.json();
      setWallet(data.wallet);
      setTransactions(data.transactions || []);
    } catch { /* empty */ }
    setLoading(false);
  }

  // Seed demo data if wallet empty
  const displayWallet = wallet || {
    balance: 247500,
    totalEarnings: 385000,
    totalWithdrawals: 137500,
    carbonCreditEarnings: 156000,
    biomassSalesEarnings: 128000,
    co2SalesEarnings: 64000,
    equipmentRentalEarnings: 37000,
  };

  const demoTransactions: Transaction[] = transactions.length > 0 ? transactions : [
    { id: '1', type: 'credit', category: 'carbon_credit_sale', amount: 12500, description: 'Carbon Credit Sale - 25 tCO₂e @ ₹500', balanceAfter: 247500, createdAt: '2025-12-01T10:00:00Z' },
    { id: '2', type: 'credit', category: 'biomass_sale', amount: 18000, description: 'Biomass Sale - 12 tons rice straw', balanceAfter: 235000, createdAt: '2025-11-28T14:30:00Z' },
    { id: '3', type: 'debit', category: 'withdrawal', amount: 50000, description: 'Bank Transfer - SBI Account', balanceAfter: 217000, createdAt: '2025-11-25T09:15:00Z' },
    { id: '4', type: 'credit', category: 'co2_sale', amount: 32000, description: 'CO₂ Sale - 8 tons captured CO₂', balanceAfter: 267000, createdAt: '2025-11-22T16:00:00Z' },
    { id: '5', type: 'credit', category: 'equipment_rental', amount: 8500, description: 'Happy Seeder rental income - 5 days', balanceAfter: 235000, createdAt: '2025-11-20T11:00:00Z' },
    { id: '6', type: 'credit', category: 'subsidy', amount: 25000, description: 'CRM Scheme Subsidy Credit', balanceAfter: 226500, createdAt: '2025-11-18T08:00:00Z' },
    { id: '7', type: 'credit', category: 'carbon_credit_sale', amount: 45000, description: 'Carbon Credit Sale - 90 tCO₂e @ ₹500', balanceAfter: 201500, createdAt: '2025-11-15T13:00:00Z' },
    { id: '8', type: 'debit', category: 'withdrawal', amount: 75000, description: 'Bank Transfer - PNB Account', balanceAfter: 156500, createdAt: '2025-11-10T10:00:00Z' },
  ];

  const distributionData = [
    { name: 'Carbon Credits', value: displayWallet.carbonCreditEarnings },
    { name: 'Biomass Sales', value: displayWallet.biomassSalesEarnings },
    { name: 'CO₂ Sales', value: displayWallet.co2SalesEarnings },
    { name: 'Equipment Rental', value: displayWallet.equipmentRentalEarnings },
  ];

  const revenueData = [
    { name: 'Jul', value: 28000 }, { name: 'Aug', value: 35000 }, { name: 'Sep', value: 42000 },
    { name: 'Oct', value: 55000 }, { name: 'Nov', value: 68000 }, { name: 'Dec', value: 89000 },
  ];

  const categoryIcons: Record<string, React.ReactNode> = {
    carbon_credit_sale: <GiSolidLeaf className="text-emerald-400" />,
    biomass_sale: <FiTrendingUp className="text-green-400" />,
    co2_sale: <FiCreditCard className="text-blue-400" />,
    equipment_rental: <FiDollarSign className="text-yellow-400" />,
    withdrawal: <FiArrowDown className="text-red-400" />,
    subsidy: <FiArrowUp className="text-purple-400" />,
    bonus: <FiArrowUp className="text-pink-400" />,
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Carbon Revenue Wallet</h1>
        <p className="text-gray-400 text-sm mt-1">Track all your climate earnings in one place</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 md:col-span-2">
          <p className="text-sm text-gray-400 mb-1">Available Balance</p>
          <p className="text-4xl font-bold gradient-text">₹{displayWallet.balance.toLocaleString()}</p>
          <div className="flex gap-3 mt-3">
            <button className="px-4 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-sm transition-all">Withdraw</button>
            <button className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg text-sm transition-all">Transfer</button>
          </div>
        </motion.div>
        {[
          { label: 'Total Earnings', value: displayWallet.totalEarnings, icon: FiTrendingUp, color: 'emerald' },
          { label: 'Total Withdrawn', value: displayWallet.totalWithdrawals, icon: FiArrowDown, color: 'orange' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * (i + 1) }} className="glass-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`text-${stat.color}-400`} />
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
            <p className="text-2xl font-bold text-white">₹{stat.value.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>

      {/* Earnings Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Carbon Credits', value: displayWallet.carbonCreditEarnings, color: 'from-emerald-500 to-teal-500' },
          { label: 'Biomass Sales', value: displayWallet.biomassSalesEarnings, color: 'from-green-500 to-emerald-500' },
          { label: 'CO₂ Sales', value: displayWallet.co2SalesEarnings, color: 'from-blue-500 to-cyan-500' },
          { label: 'Equipment Rental', value: displayWallet.equipmentRentalEarnings, color: 'from-yellow-500 to-orange-500' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="glass-card p-4">
            <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${item.color} mb-3`} />
            <p className="text-xs text-gray-400">{item.label}</p>
            <p className="text-lg font-bold text-white">₹{item.value.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend</h3>
          <RevenueChart data={revenueData} dataKey="value" color="#10b981" />
        </div>
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Earnings Distribution</h3>
          <DistributionChart data={distributionData} />
        </div>
      </div>

      {/* Transaction History */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {demoTransactions.map((tx, i) => (
            <motion.div key={tx.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/8 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg">
                  {categoryIcons[tx.category] || <FiDollarSign className="text-gray-400" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{tx.description}</p>
                  <p className="text-xs text-gray-500">{new Date(tx.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${tx.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Bal: ₹{tx.balanceAfter.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
