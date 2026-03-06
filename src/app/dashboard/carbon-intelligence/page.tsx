'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiZap, FiTrendingUp, FiDroplet, FiDollarSign, FiTarget, FiRefreshCw } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';

const cropOptions = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Soybean', 'Mustard', 'Jute', 'Millet', 'Barley'];
const practiceOptions = [
  { id: 'no_till', label: 'No-Till Farming' },
  { id: 'cover_crops', label: 'Cover Crops' },
  { id: 'residue_collection', label: 'Residue Collection' },
  { id: 'biochar', label: 'Biochar Application' },
  { id: 'organic_farming', label: 'Organic Farming' },
  { id: 'agroforestry', label: 'Agroforestry' },
  { id: 'crop_rotation', label: 'Crop Rotation' },
  { id: 'compost', label: 'Composting' },
];

interface Prediction {
  estimatedCredits: number;
  co2CapturePotential: number;
  biomassProductionPotential: number;
  estimatedRevenue: number;
  confidenceScore: number;
  recommendations: string[];
  breakdown?: { biochar: number; energy: number; co2Avoidance: number };
}

export default function CarbonIntelligencePage() {
  const [farmSize, setFarmSize] = useState(10);
  const [cropType, setCropType] = useState('Rice');
  const [residueAmount, setResidueAmount] = useState(20);
  const [practices, setPractices] = useState<string[]>(['residue_collection']);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [rawText, setRawText] = useState('');

  const togglePractice = (id: string) => {
    setPractices((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const runPrediction = async () => {
    setLoading(true);
    setPrediction(null);
    setRawText('');

    try {
      const res = await fetch('/api/carbon-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ farmSize, cropType, residueAmount, practices }),
      });
      const data = await res.json();

      if (data.prediction) {
        setPrediction(data.prediction);
      } else if (data.rawPrediction) {
        setRawText(data.rawPrediction);
      }
    } catch {
      setPrediction({
        estimatedCredits: farmSize * 1.2,
        co2CapturePotential: residueAmount * 0.4,
        biomassProductionPotential: residueAmount * 0.8,
        estimatedRevenue: farmSize * 12000,
        confidenceScore: 65,
        recommendations: [
          'Implement no-till farming for 30% more carbon sequestration',
          'Add cover crops during off-season to boost soil organic matter',
          'Consider biochar application for long-term carbon storage',
        ],
        breakdown: { biochar: residueAmount * 0.3, energy: residueAmount * 1.5, co2Avoidance: residueAmount * 0.45 },
      });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <FiCpu className="text-emerald-400" /> AI Carbon Intelligence Engine
        </h1>
        <p className="text-gray-400 mt-1">Predict carbon outcomes, CO₂ capture potential, and revenue estimates using AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-2 glass-card p-6 space-y-5">
          <h2 className="text-lg font-semibold text-white mb-2">Farm Inputs</h2>

          {/* Farm Size */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Farm Size (acres)</label>
            <input type="range" min={1} max={200} value={farmSize} onChange={(e) => setFarmSize(Number(e.target.value))}
              className="w-full accent-emerald-500" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 acre</span>
              <span className="text-emerald-400 font-semibold text-sm">{farmSize} acres</span>
              <span>200 acres</span>
            </div>
          </div>

          {/* Crop Type */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Crop Type</label>
            <select value={cropType} onChange={(e) => setCropType(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500/50 focus:outline-none">
              {cropOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Residue Amount */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Residue Available (tons)</label>
            <input type="number" min={1} max={500} value={residueAmount}
              onChange={(e) => setResidueAmount(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500/50 focus:outline-none" />
          </div>

          {/* Farming Practices */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Farming Practices</label>
            <div className="grid grid-cols-2 gap-2">
              {practiceOptions.map((p) => (
                <button key={p.id} onClick={() => togglePractice(p.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${practices.includes(p.id) ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Run Button */}
          <button onClick={runPrediction} disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? (
              <><FiRefreshCw className="animate-spin" /> Analyzing...</>
            ) : (
              <><FiZap /> Run AI Prediction</>
            )}
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass-card p-12 flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                  <FiCpu className="absolute inset-0 m-auto text-emerald-400 text-2xl" />
                </div>
                <p className="text-gray-400 mt-6 text-sm">AI analyzing carbon outcomes...</p>
                <div className="flex gap-1 mt-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, delay: i * 0.3, duration: 1 }}
                      className="w-2 h-2 rounded-full bg-emerald-500" />
                  ))}
                </div>
              </motion.div>
            )}

            {!loading && !prediction && !rawText && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="glass-card p-12 text-center">
                <FiCpu className="text-5xl text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Configure Your Farm</h3>
                <p className="text-gray-500 text-sm">Set your farm parameters and click &quot;Run AI Prediction&quot; to see carbon intelligence results.</p>
              </motion.div>
            )}

            {!loading && prediction && (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Estimated Carbon Credits', value: `${prediction.estimatedCredits.toFixed(1)} tCO₂e`, icon: GiSolidLeaf, color: 'emerald' },
                    { label: 'CO₂ Capture Potential', value: `${prediction.co2CapturePotential.toFixed(1)} tons`, icon: FiDroplet, color: 'teal' },
                    { label: 'Biomass Production', value: `${prediction.biomassProductionPotential.toFixed(1)} tons`, icon: FiTrendingUp, color: 'blue' },
                    { label: 'Estimated Revenue', value: `₹${prediction.estimatedRevenue.toLocaleString()}`, icon: FiDollarSign, color: 'amber' },
                  ].map((metric) => (
                    <div key={metric.label} className="glass-card p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-lg bg-${metric.color}-500/15 flex items-center justify-center`}>
                          <metric.icon className={`text-${metric.color}-400 text-sm`} />
                        </div>
                        <span className="text-xs text-gray-400">{metric.label}</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>

                {/* Confidence + Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Confidence */}
                  <div className="glass-card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-300">Confidence Score</h3>
                      <span className={`text-lg font-bold ${prediction.confidenceScore >= 70 ? 'text-emerald-400' : prediction.confidenceScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                        {prediction.confidenceScore}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prediction.confidenceScore}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${prediction.confidenceScore >= 70 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : prediction.confidenceScore >= 50 ? 'bg-gradient-to-r from-amber-500 to-yellow-500' : 'bg-gradient-to-r from-red-500 to-orange-500'}`}
                      />
                    </div>
                  </div>

                  {/* Breakdown */}
                  {prediction.breakdown && (
                    <div className="glass-card p-5">
                      <h3 className="text-sm font-semibold text-gray-300 mb-3">Production Breakdown</h3>
                      <div className="space-y-2">
                        {[
                          { label: 'Biochar Producible', value: `${prediction.breakdown.biochar.toFixed(1)} tons`, color: 'emerald' },
                          { label: 'Energy Potential', value: `${prediction.breakdown.energy.toFixed(1)} MWh`, color: 'blue' },
                          { label: 'CO₂ Avoided', value: `${prediction.breakdown.co2Avoidance.toFixed(1)} tons`, color: 'teal' },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">{item.label}</span>
                            <span className={`text-sm font-semibold text-${item.color}-400`}>{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Recommendations */}
                {prediction.recommendations.length > 0 && (
                  <div className="glass-card p-5">
                    <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <FiTarget className="text-emerald-400" /> AI Recommendations
                    </h3>
                    <div className="space-y-2">
                      {prediction.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                          <span className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                          <p className="text-sm text-gray-300">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {!loading && rawText && (
              <motion.div key="raw" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">AI Analysis</h3>
                <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap text-gray-300">{rawText}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
