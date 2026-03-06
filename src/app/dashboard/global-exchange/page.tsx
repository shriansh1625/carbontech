'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { FiGlobe, FiShoppingCart, FiDollarSign, FiTrendingUp, FiPlus } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import AnimatedCounter from '@/components/AnimatedCounter';

const MapboxMap = dynamic(() => import('@/components/MapboxMap'), { ssr: false });

interface Trade {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerCountry: string;
  buyerId?: string;
  buyerName?: string;
  buyerCountry?: string;
  creditType: string;
  quantity: number;
  pricePerCredit: number;
  totalValue: number;
  status: string;
  vintage: string;
  methodology: string;
  createdAt: string;
}

const countryCoords: Record<string, { lat: number; lng: number }> = {
  India: { lat: 20.5, lng: 78.9 },
  Brazil: { lat: -14.2, lng: -51.9 },
  Kenya: { lat: 0.0, lng: 37.9 },
  Thailand: { lat: 15.9, lng: 100.9 },
  Indonesia: { lat: -0.8, lng: 113.9 },
  Mexico: { lat: 23.6, lng: -102.5 },
  USA: { lat: 37.1, lng: -95.7 },
  Germany: { lat: 51.2, lng: 10.4 },
};

export default function GlobalExchangePage() {
  const { profile } = useAuthStore();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({ creditType: 'VCS', quantity: '', pricePerCredit: '', vintage: '2025', methodology: 'VM0006' });

  useEffect(() => { fetchTrades(); }, []);

  async function fetchTrades() {
    try {
      const res = await fetch('/api/exchange?type=trades');
      const data = await res.json();
      setTrades(data.trades || []);
    } catch { /* empty */ }
    setLoading(false);
  }

  async function createTrade() {
    if (!form.quantity || !form.pricePerCredit) { toast.error('Fill required fields'); return; }
    try {
      const res = await fetch('/api/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-trade',
          sellerId: profile?.uid,
          sellerName: profile?.displayName,
          sellerCountry: profile?.location || 'India',
          creditType: form.creditType,
          quantity: parseInt(form.quantity),
          pricePerCredit: parseFloat(form.pricePerCredit),
          vintage: form.vintage,
          methodology: form.methodology,
        }),
      });
      if (res.ok) {
        toast.success('Trade listed on exchange!');
        setShowCreateForm(false);
        fetchTrades();
      }
    } catch { toast.error('Failed to create trade'); }
  }

  async function buyTrade(trade: Trade) {
    try {
      const res = await fetch('/api/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'settle-trade',
          tradeId: trade.id,
          buyerId: profile?.uid,
          buyerName: profile?.displayName,
          buyerCountry: profile?.location || 'India',
        }),
      });
      if (res.ok) {
        toast.success('Trade settled successfully!');
        fetchTrades();
      }
    } catch { toast.error('Failed to settle trade'); }
  }

  const totalVolume = trades.reduce((s, t) => s + t.totalValue, 0);
  const totalCredits = trades.reduce((s, t) => s + t.quantity, 0);
  const avgPrice = trades.length > 0 ? trades.reduce((s, t) => s + t.pricePerCredit, 0) / trades.length : 0;

  const mapPoints = trades.map(t => {
    const coords = countryCoords[t.sellerCountry] || { lat: 20, lng: 78 };
    return {
      lat: coords.lat + (Math.random() - 0.5) * 2,
      lng: coords.lng + (Math.random() - 0.5) * 2,
      label: t.sellerName,
      popup: `${t.quantity} ${t.creditType} credits @ $${t.pricePerCredit}`,
      color: '#10b981',
      type: 'buyer' as const,
    };
  });

  const creditTypeColors: Record<string, string> = {
    VCS: 'text-emerald-400 bg-emerald-400/10',
    GS: 'text-yellow-400 bg-yellow-400/10',
    CDM: 'text-blue-400 bg-blue-400/10',
    ACR: 'text-purple-400 bg-purple-400/10',
    CAR: 'text-pink-400 bg-pink-400/10',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Global Carbon Exchange</h1>
          <p className="text-gray-400 text-sm mt-1">International carbon credit trading platform</p>
        </div>
        <button onClick={() => setShowCreateForm(!showCreateForm)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-xl border border-emerald-500/20 transition-all">
          <FiPlus /> List Credits
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Volume', value: totalVolume, prefix: '$', icon: FiDollarSign },
          { label: 'Credits Listed', value: totalCredits, suffix: ' tCO₂e', icon: FiShoppingCart },
          { label: 'Avg Price', value: avgPrice, prefix: '$', decimals: 2, icon: FiTrendingUp },
          { label: 'Countries', value: new Set(trades.map(t => t.sellerCountry)).size, icon: FiGlobe },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="text-emerald-400" />
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
            <AnimatedCounter target={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} decimals={stat.decimals || 0} className="text-2xl font-bold text-white" />
          </motion.div>
        ))}
      </div>

      {/* Create Trade Form */}
      {showCreateForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">List Credits on Exchange</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Credit Type</label>
              <select value={form.creditType} onChange={(e) => setForm({ ...form, creditType: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white">
                <option value="VCS">VCS (Verra)</option>
                <option value="GS">Gold Standard</option>
                <option value="CDM">CDM</option>
                <option value="ACR">ACR</option>
                <option value="CAR">CAR</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Quantity (tCO₂e)</label>
              <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Price per Credit ($)</label>
              <input type="number" step="0.01" value={form.pricePerCredit} onChange={(e) => setForm({ ...form, pricePerCredit: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Vintage</label>
              <select value={form.vintage} onChange={(e) => setForm({ ...form, vintage: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white">
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>
          <button onClick={createTrade} className="mt-4 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all">List on Exchange</button>
        </motion.div>
      )}

      {/* Global Map */}
      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <FiGlobe className="text-emerald-400" /> Global Trading Map
        </h3>
        <MapboxMap points={mapPoints} center={[20, 40]} zoom={2} height="350px" />
      </div>

      {/* Trade Book */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Order Book</h3>
        {loading ? (
          <div className="flex justify-center py-8"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-white/10">
                  <th className="text-left py-3 px-2">Seller</th>
                  <th className="text-left py-3 px-2">Country</th>
                  <th className="text-left py-3 px-2">Type</th>
                  <th className="text-right py-3 px-2">Qty (tCO₂e)</th>
                  <th className="text-right py-3 px-2">Price</th>
                  <th className="text-right py-3 px-2">Total</th>
                  <th className="text-left py-3 px-2">Vintage</th>
                  <th className="text-center py-3 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade, i) => (
                  <motion.tr key={trade.id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-all">
                    <td className="py-3 px-2 text-white font-medium">{trade.sellerName}</td>
                    <td className="py-3 px-2 text-gray-300">{trade.sellerCountry}</td>
                    <td className="py-3 px-2"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${creditTypeColors[trade.creditType] || ''}`}>{trade.creditType}</span></td>
                    <td className="py-3 px-2 text-right text-white">{trade.quantity.toLocaleString()}</td>
                    <td className="py-3 px-2 text-right text-emerald-400">${trade.pricePerCredit.toFixed(2)}</td>
                    <td className="py-3 px-2 text-right text-white font-medium">${trade.totalValue.toLocaleString()}</td>
                    <td className="py-3 px-2 text-gray-400">{trade.vintage}</td>
                    <td className="py-3 px-2 text-center">
                      {trade.status === 'open' && trade.sellerId !== profile?.uid && (
                        <button onClick={() => buyTrade(trade)} className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-xs transition-all">Buy</button>
                      )}
                      {trade.status === 'settled' && <span className="text-gray-500 text-xs">Settled</span>}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
