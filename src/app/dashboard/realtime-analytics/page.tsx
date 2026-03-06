'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiGlobe, FiTrendingUp, FiAward, FiCloud, FiUsers, FiDollarSign } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';
import AnimatedCounter from '@/components/AnimatedCounter';
import { TrendChart, DistributionChart } from '@/components/Charts';

interface AnalyticsData {
  co2Captured: { value: number; unit: string; change: number };
  creditsIssued: { value: number; unit: string; change: number };
  biomassProcessed: { value: number; unit: string; change: number };
  activeFarms: { value: number; unit: string; change: number };
  marketVolume: { value: number; unit: string; change: number };
  projectsVerified: { value: number; unit: string; change: number };
  countriesActive: { value: number; unit: string; change: number };
  averageCreditPrice: { value: number; unit: string; change: number };
}

export default function RealTimeAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  async function fetchAnalytics() {
    try {
      const res = await fetch('/api/climate');
      const data = await res.json();
      setAnalytics(data.analytics);
    } catch { /* empty */ }
    setLoading(false);
  }

  const metricIcons: Record<string, React.ReactNode> = {
    co2Captured: <FiCloud className="text-purple-400" />,
    creditsIssued: <GiSolidLeaf className="text-emerald-400" />,
    biomassProcessed: <FiActivity className="text-green-400" />,
    activeFarms: <FiUsers className="text-blue-400" />,
    marketVolume: <FiDollarSign className="text-yellow-400" />,
    projectsVerified: <FiAward className="text-pink-400" />,
    countriesActive: <FiGlobe className="text-teal-400" />,
    averageCreditPrice: <FiTrendingUp className="text-orange-400" />,
  };

  const metricLabels: Record<string, string> = {
    co2Captured: 'CO₂ Captured',
    creditsIssued: 'Credits Issued',
    biomassProcessed: 'Biomass Processed',
    activeFarms: 'Active Farms',
    marketVolume: 'Market Volume',
    projectsVerified: 'Projects Verified',
    countriesActive: 'Countries Active',
    averageCreditPrice: 'Avg Credit Price',
  };

  const metricColors: Record<string, string> = {
    co2Captured: 'purple',
    creditsIssued: 'emerald',
    biomassProcessed: 'green',
    activeFarms: 'blue',
    marketVolume: 'yellow',
    projectsVerified: 'pink',
    countriesActive: 'teal',
    averageCreditPrice: 'orange',
  };

  // Simulated trend data
  const trendData = [
    { name: 'Jan', co2: 85, credits: 320, biomass: 650 },
    { name: 'Feb', co2: 92, credits: 345, biomass: 690 },
    { name: 'Mar', co2: 98, credits: 380, biomass: 720 },
    { name: 'Apr', co2: 105, credits: 395, biomass: 760 },
    { name: 'May', co2: 112, credits: 420, biomass: 800 },
    { name: 'Jun', co2: 118, credits: 435, biomass: 830 },
    { name: 'Jul', co2: 121, credits: 448, biomass: 855 },
    { name: 'Aug', co2: 125, credits: 458, biomass: 892 },
  ];

  const distributionData = [
    { name: 'South Asia', value: 45 },
    { name: 'SE Asia', value: 22 },
    { name: 'Africa', value: 15 },
    { name: 'Latin America', value: 12 },
    { name: 'Europe', value: 6 },
  ];

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Real-Time Climate Analytics</h1>
          <p className="text-gray-400 text-sm mt-1">Global carbon economy metrics • Live updates</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 bg-emerald-400 rounded-full" />
          <span className="text-xs text-emerald-400">LIVE</span>
        </div>
      </div>

      {/* Live Metrics Grid */}
      {analytics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(analytics).map(([key, metric], i) => {
            const prefix = key === 'marketVolume' ? '$' : key === 'averageCreditPrice' ? '$' : '';
            return (
              <motion.div key={key} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-card glass-card-hover p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full" />
                <div className="flex items-center gap-2 mb-3">
                  {metricIcons[key]}
                  <p className="text-xs text-gray-400">{metricLabels[key]}</p>
                </div>
                <AnimatedCounter
                  target={metric.value}
                  prefix={prefix}
                  suffix={metric.unit !== 'USD' && metric.unit !== 'USD/tCO₂e' ? ` ${metric.unit}` : ''}
                  decimals={key === 'averageCreditPrice' ? 1 : 0}
                  className={`text-3xl font-bold text-${metricColors[key]}-400`}
                />
                <div className="flex items-center gap-1 mt-2">
                  <FiTrendingUp className={`text-xs ${metric.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`} />
                  <span className={`text-xs font-medium ${metric.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {metric.change >= 0 ? '+' : ''}{metric.change}%
                  </span>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Trend Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><FiActivity className="text-emerald-400" /> Growth Trends</h3>
          <TrendChart data={trendData} lines={[
            { key: 'co2', color: '#8b5cf6', name: 'CO₂ Captured (K tons)' },
            { key: 'credits', color: '#10b981', name: 'Credits Issued (K)' },
            { key: 'biomass', color: '#3b82f6', name: 'Biomass (K tons)' },
          ]} />
        </div>
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><FiGlobe className="text-blue-400" /> Regional Distribution</h3>
          <DistributionChart data={distributionData} />
        </div>
      </div>

      {/* Impact Summary */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Environmental Impact Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Equivalent Trees Planted', value: 5750000, icon: '🌳', desc: 'Based on CO₂ captured' },
            { label: 'Cars Offset per Year', value: 28700, icon: '🚗', desc: 'Annual emissions equivalent' },
            { label: 'Residue Fires Prevented', value: 42500, icon: '🔥', desc: 'Stubble burning incidents avoided' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-white/5 rounded-xl p-5 text-center">
              <span className="text-4xl">{item.icon}</span>
              <AnimatedCounter target={item.value} className="block text-3xl font-bold text-white mt-2" duration={3} />
              <p className="text-sm font-medium text-emerald-400 mt-1">{item.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
