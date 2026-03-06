'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiGlobe, FiTrendingUp, FiZap, FiMapPin } from 'react-icons/fi';
import { TrendChart, DistributionChart } from '@/components/Charts';
import dynamic from 'next/dynamic';
import AnimatedCounter from '@/components/AnimatedCounter';
import toast from 'react-hot-toast';

const MapboxMap = dynamic(() => import('@/components/MapboxMap'), { ssr: false });

interface SupplyRegion {
  region: string;
  country: string;
  lat: number;
  lng: number;
  carbonPotential: number;
  activeFarms: number;
  residueAvailable: number;
  creditPrice: number;
  topCrops?: string[];
  growthRate?: number;
}

interface Prediction {
  estimatedCredits: number;
  co2CapturePotential: number;
  biomassProductionPotential: number;
  estimatedRevenue: number;
  confidenceScore: number;
  recommendations: string[];
  breakdown?: { biochar: number; energy: number; co2Avoidance: number };
}

export default function ACINDashboardPage() {
  const [regions, setRegions] = useState<SupplyRegion[]>([]);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);
  const [form, setForm] = useState({ farmSize: '25', cropType: 'rice', residueAmount: '40', practices: ['no_burn', 'biochar'] });

  useEffect(() => { fetchGlobalSupply(); }, []);

  async function fetchGlobalSupply() {
    try {
      const res = await fetch('/api/climate?type=global-supply');
      const data = await res.json();
      if (data.success && data.data?.regions) {
        setRegions(data.data.regions);
      }
    } catch { /* empty */ }
    setLoading(false);
  }

  async function runPrediction() {
    setPredicting(true);
    try {
      const res = await fetch('/api/carbon-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmSize: parseFloat(form.farmSize),
          cropType: form.cropType,
          residueAmount: parseFloat(form.residueAmount),
          practices: form.practices,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPrediction(data.prediction);
        toast.success(`Prediction generated (${data.prediction.confidenceScore || data.confidenceScore}% confidence)`);
      }
    } catch { toast.error('Prediction failed'); }
    setPredicting(false);
  }

  const mapPoints = regions.map(r => ({
    lat: r.lat,
    lng: r.lng,
    label: r.region,
    popup: `${r.country} • ${r.carbonPotential.toLocaleString()} tCO₂e potential • ${r.activeFarms.toLocaleString()} farms`,
    color: r.carbonPotential > 50000 ? '#10b981' : r.carbonPotential > 25000 ? '#f59e0b' : '#3b82f6',
  }));

  const supplyData = regions.map(r => ({ name: r.region.slice(0, 10), value: r.carbonPotential }));
  const priceData = regions.map(r => ({ name: r.region.slice(0, 10), price: r.creditPrice, potential: r.carbonPotential / 1000 }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Autonomous Carbon Intelligence Network</h1>
        <p className="text-gray-400 text-sm mt-1">AI-powered climate economy prediction engine</p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Carbon Potential', value: regions.reduce((s, r) => s + r.carbonPotential, 0), suffix: ' tCO₂e', color: 'emerald' },
          { label: 'Active Farms Worldwide', value: regions.reduce((s, r) => s + r.activeFarms, 0), suffix: '', color: 'blue' },
          { label: 'Avg Credit Price', value: regions.length > 0 ? regions.reduce((s, r) => s + r.creditPrice, 0) / regions.length : 0, prefix: '$', decimals: 2, color: 'yellow' },
          { label: 'Regions Tracked', value: regions.length, suffix: '', color: 'purple' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
            <AnimatedCounter target={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix} decimals={stat.decimals || 0} className={`text-2xl font-bold text-${stat.color}-400`} />
          </motion.div>
        ))}
      </div>

      {/* AI Prediction Engine */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><FiCpu className="text-emerald-400" /> AI Prediction Engine</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Farm Size (acres)</label>
            <input type="number" value={form.farmSize} onChange={(e) => setForm({ ...form, farmSize: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Crop Type</label>
            <select value={form.cropType} onChange={(e) => setForm({ ...form, cropType: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white">
              <option value="rice">Rice</option><option value="wheat">Wheat</option><option value="sugarcane">Sugarcane</option><option value="corn">Corn</option><option value="cotton">Cotton</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Residue (tons)</label>
            <input type="number" value={form.residueAmount} onChange={(e) => setForm({ ...form, residueAmount: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" />
          </div>
          <div className="flex items-end">
            <button onClick={runPrediction} disabled={predicting} className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl transition-all flex items-center justify-center gap-2">
              {predicting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiZap />}
              {predicting ? 'Analyzing...' : 'Predict'}
            </button>
          </div>
        </div>

        {prediction && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[
                { label: 'Carbon Credits', value: `${prediction.estimatedCredits} tCO₂e`, color: 'emerald' },
                { label: 'CO₂ Capture', value: `${prediction.co2CapturePotential} tons`, color: 'blue' },
                { label: 'Biomass Potential', value: `${prediction.biomassProductionPotential} tons`, color: 'green' },
                { label: 'Projected Revenue', value: `₹${prediction.estimatedRevenue?.toLocaleString()}`, color: 'yellow' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                  <p className={`text-lg font-bold text-${item.color}-400`}>{item.value}</p>
                </div>
              ))}
            </div>
            {prediction.recommendations && (
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-sm font-medium text-white mb-2">AI Recommendations</p>
                <ul className="space-y-1">
                  {prediction.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <FiZap className="text-emerald-400 mt-0.5 flex-shrink-0" /> {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Global Carbon Supply Map */}
      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <FiGlobe className="text-emerald-400" /> Global Carbon Supply Map
        </h3>
        {loading ? (
          <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <MapboxMap points={mapPoints} center={[15, 60]} zoom={2} height="450px" />
        )}
      </div>

      {/* Regional Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><FiTrendingUp className="text-emerald-400" /> Carbon Potential by Region</h3>
          <DistributionChart data={supplyData} />
        </div>
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><FiTrendingUp className="text-blue-400" /> Regional Price vs Potential</h3>
          <TrendChart data={priceData} lines={[{ key: 'price', color: '#10b981', name: 'Price (USD)' }, { key: 'potential', color: '#3b82f6', name: 'Potential (K tCO₂e)' }]} />
        </div>
      </div>

      {/* Region Cards */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Regions Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {regions.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white/5 rounded-xl p-4 hover:bg-white/8 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <FiMapPin className="text-emerald-400" />
                <p className="font-semibold text-white text-sm">{r.region}</p>
              </div>
              <p className="text-xs text-gray-400 mb-2">{r.country}</p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between"><span className="text-gray-400">Carbon Potential</span><span className="text-emerald-400 font-medium">{r.carbonPotential.toLocaleString()} tCO₂e</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Farms</span><span className="text-white">{r.activeFarms.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Credit Price</span><span className="text-yellow-400">${r.creditPrice}</span></div>
                {r.growthRate && <div className="flex justify-between"><span className="text-gray-400">Growth</span><span className="text-green-400">+{r.growthRate}%</span></div>}
                {r.topCrops && <div className="flex gap-1 mt-1 flex-wrap">{r.topCrops.map((c, j) => <span key={j} className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px]">{c}</span>)}</div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
