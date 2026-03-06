'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiBarChart2, FiActivity } from 'react-icons/fi';
import { TrendChart, DistributionChart } from '@/components/Charts';

interface MarketData {
  creditType: string;
  pricePerTon: number;
  volume: number;
  change24h: number;
  high24h: number;
  low24h: number;
  date: string;
}

interface Forecast {
  forecast: { month: string; predictedPrice: number; confidence: number }[];
  trend: string;
  factors: string[];
  recommendation: string;
}

export default function CarbonMarketPage() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [selectedType, setSelectedType] = useState('VCS');
  const [loading, setLoading] = useState(true);
  const [forecastLoading, setForecastLoading] = useState(false);

  useEffect(() => { fetchMarketData(); }, []);

  async function fetchMarketData() {
    try {
      const res = await fetch('/api/exchange?type=market');
      const data = await res.json();
      setMarketData(data.data || []);
    } catch { /* empty */ }
    setLoading(false);
  }

  async function loadForecast() {
    setForecastLoading(true);
    try {
      const res = await fetch(`/api/exchange?type=forecast&creditType=${selectedType}`);
      const data = await res.json();
      if (data.success) setForecast(data.forecast);
    } catch { /* empty */ }
    setForecastLoading(false);
  }

  const creditTypes = ['VCS', 'GS', 'CDM', 'ACR', 'CAR'];

  const getLatestByType = (type: string) => {
    const items = marketData.filter(d => d.creditType === type).sort((a, b) => b.date.localeCompare(a.date));
    return items[0] || null;
  };

  const getChartData = (type: string) => {
    return marketData
      .filter(d => d.creditType === type)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-14)
      .map(d => ({ name: d.date.slice(5), price: d.pricePerTon, volume: d.volume / 100 }));
  };

  const volumeByType = creditTypes.map(t => ({
    name: t,
    value: marketData.filter(d => d.creditType === t).reduce((s, d) => s + d.volume, 0),
  }));

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Carbon Market Price Engine</h1>
        <p className="text-gray-400 text-sm mt-1">Real-time carbon credit pricing & analytics</p>
      </div>

      {/* Price Tickers */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {creditTypes.map((type, i) => {
          const latest = getLatestByType(type);
          if (!latest) return null;
          const isUp = latest.change24h >= 0;
          return (
            <motion.div key={type} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedType(type)}
              className={`glass-card glass-card-hover p-4 cursor-pointer ${selectedType === type ? 'border-emerald-500/40 bg-emerald-500/5' : ''}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-white">{type}</span>
                {isUp ? <FiTrendingUp className="text-emerald-400 text-xs" /> : <FiTrendingDown className="text-red-400 text-xs" />}
              </div>
              <p className="text-xl font-bold text-white">${latest.pricePerTon.toFixed(2)}</p>
              <p className={`text-xs font-medium ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                {isUp ? '+' : ''}{latest.change24h.toFixed(2)}%
              </p>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>H: ${latest.high24h.toFixed(2)}</span>
                <span>L: ${latest.low24h.toFixed(2)}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Price Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FiActivity className="text-emerald-400" /> {selectedType} Price History (14-Day)
          </h3>
          <div className="flex gap-2">
            {creditTypes.map(t => (
              <button key={t} onClick={() => setSelectedType(t)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${selectedType === t ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-gray-400'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <TrendChart data={getChartData(selectedType)} lines={[{ key: 'price', color: '#10b981', name: 'Price (USD)' }, { key: 'volume', color: '#3b82f6', name: 'Volume (×100)' }]} />
      </div>

      {/* Forecast */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FiBarChart2 className="text-blue-400" /> AI Price Forecast — {selectedType}
          </h3>
          <button onClick={loadForecast} disabled={forecastLoading}
            className="px-4 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm transition-all disabled:opacity-50">
            {forecastLoading ? 'Generating...' : 'Generate Forecast'}
          </button>
        </div>
        {forecast ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${forecast.trend === 'bullish' ? 'bg-emerald-500/10 text-emerald-400' : forecast.trend === 'bearish' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                {forecast.trend?.toUpperCase()}
              </span>
              <p className="text-sm text-gray-300">{forecast.recommendation}</p>
            </div>
            {forecast.forecast && (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {forecast.forecast.map((f, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">{f.month}</p>
                    <p className="text-lg font-bold text-white">${f.predictedPrice?.toFixed(2)}</p>
                    <p className="text-xs text-emerald-400">{f.confidence}% conf</p>
                  </div>
                ))}
              </div>
            )}
            {forecast.factors && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 uppercase mb-2">Key Factors</p>
                <div className="flex flex-wrap gap-2">
                  {forecast.factors.map((f, i) => (
                    <span key={i} className="px-2 py-1 bg-white/5 text-gray-300 rounded-lg text-xs">{f}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">Click &quot;Generate Forecast&quot; to get AI-powered price predictions</p>
        )}
      </div>

      {/* Volume Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Volume by Credit Type</h3>
          <DistributionChart data={volumeByType} />
        </div>
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Market Summary</h3>
          <div className="space-y-3">
            {creditTypes.map(type => {
              const latest = getLatestByType(type);
              if (!latest) return null;
              const totalVol = marketData.filter(d => d.creditType === type).reduce((s, d) => s + d.volume, 0);
              return (
                <div key={type} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white w-10">{type}</span>
                    <span className="text-sm text-gray-400">${latest.pricePerTon.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-300">{totalVol.toLocaleString()} tCO₂e</span>
                    <span className={`ml-3 text-xs font-medium ${latest.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {latest.change24h >= 0 ? '+' : ''}{latest.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
