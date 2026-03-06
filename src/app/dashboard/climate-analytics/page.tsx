'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiTrendingUp, FiActivity, FiDroplet, FiUsers, FiZap, FiBarChart2, FiRefreshCw } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';
import { TrendChart, DistributionChart, CarbonCreditsChart } from '@/components/Charts';

function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      countRef.current = Math.floor(eased * end);
      setCount(countRef.current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const monthlyMetrics = [
  { name: 'Oct', co2Captured: 850, creditsIssued: 720, biomassProcessed: 2100 },
  { name: 'Nov', co2Captured: 920, creditsIssued: 800, biomassProcessed: 2300 },
  { name: 'Dec', co2Captured: 1050, creditsIssued: 890, biomassProcessed: 2600 },
  { name: 'Jan', co2Captured: 1180, creditsIssued: 950, biomassProcessed: 2900 },
  { name: 'Feb', co2Captured: 1300, creditsIssued: 1100, biomassProcessed: 3200 },
  { name: 'Mar', co2Captured: 1450, creditsIssued: 1250, biomassProcessed: 3500 },
];

const regionData = [
  { name: 'Punjab', value: 3200 },
  { name: 'Haryana', value: 2400 },
  { name: 'UP', value: 1800 },
  { name: 'MP', value: 1200 },
  { name: 'Maharashtra', value: 950 },
  { name: 'Gujarat', value: 700 },
];

const creditsByMonth = [
  { name: 'Oct', value: 4200 },
  { name: 'Nov', value: 4800 },
  { name: 'Dec', value: 5500 },
  { name: 'Jan', value: 6100 },
  { name: 'Feb', value: 7200 },
  { name: 'Mar', value: 8100 },
];

export default function ClimateAnalyticsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastRefresh(new Date());
    }, 1500);
  };

  const liveMetrics = [
    { label: 'CO₂ Captured', value: 12450, suffix: ' tons', icon: FiDroplet, color: 'teal', change: '+18.2%' },
    { label: 'Carbon Credits Issued', value: 45600, suffix: ' tCO₂e', icon: GiSolidLeaf, color: 'emerald', change: '+22.5%' },
    { label: 'Biomass Processed', value: 28400, suffix: ' tons', icon: FiActivity, color: 'blue', change: '+15.8%' },
    { label: 'Active Farms', value: 3200, suffix: '', icon: FiUsers, color: 'amber', change: '+12%' },
    { label: 'Processing Plants', value: 24, suffix: '', icon: FiZap, color: 'purple', change: '+4' },
    { label: 'Total Revenue', value: 34500000, prefix: '₹', suffix: '', icon: FiBarChart2, color: 'rose', change: '+28%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FiGlobe className="text-emerald-400" /> Real-time Climate Analytics
          </h1>
          <p className="text-gray-400 mt-1">Live platform metrics and environmental impact monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">Last refresh: {lastRefresh.toLocaleTimeString()}</span>
          <button onClick={refresh} disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-all text-sm">
            <FiRefreshCw className={refreshing ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {/* Live Pulse Indicator */}
      <div className="glass-card p-4 flex items-center gap-3 border-emerald-500/20">
        <div className="relative flex items-center justify-center">
          <div className="w-3 h-3 bg-emerald-500 rounded-full" />
          <div className="absolute w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
        </div>
        <span className="text-sm text-emerald-400 font-medium">Platform is live</span>
        <span className="text-xs text-gray-500 ml-auto">Data updates every 30 seconds</span>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {liveMetrics.map((metric, i) => (
          <motion.div key={metric.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
            className="glass-card p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full" />
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-${metric.color}-500/15 flex items-center justify-center`}>
                <metric.icon className={`text-${metric.color}-400`} />
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{metric.change}</span>
            </div>
            <p className="text-2xl font-bold text-white">
              <AnimatedCounter end={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
            </p>
            <p className="text-xs text-gray-400 mt-1">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-emerald-400" /> Impact Growth Trend
          </h3>
          <TrendChart
            data={monthlyMetrics}
            lines={[
              { key: 'co2Captured', color: '#2dd4bf' },
              { key: 'creditsIssued', color: '#34d399' },
              { key: 'biomassProcessed', color: '#60a5fa' },
            ]}
          />
        </div>
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Regional Distribution</h3>
          <DistributionChart data={regionData} />
        </div>
      </div>

      {/* Credits Chart */}
      <div className="glass-card p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Carbon Credits Issued (Cumulative)</h3>
        <CarbonCreditsChart data={creditsByMonth} />
      </div>

      {/* Impact Summary */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Environmental Impact Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/10">
            <p className="text-4xl font-bold text-emerald-400 mb-2">
              <AnimatedCounter end={12450} suffix=" tons" />
            </p>
            <p className="text-sm text-gray-400">CO₂ prevented from entering the atmosphere</p>
            <p className="text-xs text-gray-600 mt-2">Equivalent to planting 620,000 trees</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-500/10">
            <p className="text-4xl font-bold text-teal-400 mb-2">
              <AnimatedCounter end={28400} suffix=" tons" />
            </p>
            <p className="text-sm text-gray-400">Agricultural residue diverted from burning</p>
            <p className="text-xs text-gray-600 mt-2">Saving 85,200 kg of particulate matter</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/10">
            <p className="text-4xl font-bold text-blue-400 mb-2">
              <AnimatedCounter end={3200} suffix=" farms" />
            </p>
            <p className="text-sm text-gray-400">Farms participating in the carbon economy</p>
            <p className="text-xs text-gray-600 mt-2">Covering 125,000 acres across 12 states</p>
          </div>
        </div>
      </div>
    </div>
  );
}
