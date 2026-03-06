'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiZap, FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import AnimatedCounter from '@/components/AnimatedCounter';

interface TwinNode {
  id: string;
  type: string;
  label: string;
  value: number;
  unit: string;
  status: string;
}

interface TwinFlow {
  from: string;
  to: string;
  volume: number;
  unit: string;
  active: boolean;
}

const nodeColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  farm: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', glow: 'shadow-green-500/20' },
  collection: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', glow: 'shadow-yellow-500/20' },
  processing: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
  co2_capture: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  credit_issuance: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
  buyer: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400', glow: 'shadow-pink-500/20' },
};

const nodeIcons: Record<string, string> = {
  farm: '🌾', collection: '🚛', processing: '🏭', co2_capture: '💨', credit_issuance: '📜', buyer: '🏢',
};

export default function DigitalTwinPage() {
  const [nodes, setNodes] = useState<TwinNode[]>([]);
  const [flows, setFlows] = useState<TwinFlow[]>([]);
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  useEffect(() => {
    fetchTwinData();
  }, []);

  async function fetchTwinData() {
    try {
      const res = await fetch('/api/climate?type=digital-twin');
      const data = await res.json();
      setNodes(data.nodes || []);
      setFlows(data.flows || []);
      setMetrics(data.metrics || {});
    } catch { /* empty */ }
    setLoading(false);
  }

  const stages = [
    { type: 'farm', label: 'Farm Residue', description: 'Agricultural waste collected from farms' },
    { type: 'collection', label: 'Collection Hubs', description: 'Aggregation and logistics centers' },
    { type: 'processing', label: 'Processing Plants', description: 'Biomass conversion and pyrolysis' },
    { type: 'co2_capture', label: 'CO₂ Capture', description: 'Carbon dioxide capture and storage' },
    { type: 'credit_issuance', label: 'Credits Issued', description: 'Verified carbon credit generation' },
    { type: 'buyer', label: 'Buyers', description: 'Industrial and corporate offset buyers' },
  ];

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Climate Digital Twin</h1>
        <p className="text-gray-400 text-sm mt-1">Real-time carbon economy simulation</p>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Residue Collected', value: metrics.totalResidueCollected || 7500, suffix: ' t', color: 'emerald' },
          { label: 'CO₂ Captured', value: metrics.totalCO2Captured || 850, suffix: ' t', color: 'purple' },
          { label: 'Credits Issued', value: metrics.totalCreditsIssued || 12500, suffix: '', color: 'blue' },
          { label: 'System Efficiency', value: metrics.systemEfficiency || 89.5, suffix: '%', color: 'yellow', decimals: 1 },
        ].map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <p className="text-xs text-gray-400 mb-1">{m.label}</p>
            <AnimatedCounter target={m.value} suffix={m.suffix} decimals={m.decimals || 0} className={`text-2xl font-bold text-${m.color}-400`} />
          </motion.div>
        ))}
      </div>

      {/* Flow Visualization */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2"><FiActivity className="text-emerald-400" /> Carbon Economy Flow</h3>

        {/* Pipeline Stages */}
        <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
          {stages.map((stage, i) => {
            const stageNodes = nodes.filter(n => n.type === stage.type);
            const colors = nodeColors[stage.type];
            const isActive = activeNode === stage.type;

            return (
              <div key={stage.type} className="flex-1 flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15 }}
                  onClick={() => setActiveNode(isActive ? null : stage.type)}
                  className={`flex-1 p-4 rounded-xl border cursor-pointer transition-all ${colors.bg} ${colors.border} ${isActive ? `shadow-lg ${colors.glow}` : 'hover:shadow-md'}`}
                >
                  <div className="text-center">
                    <span className="text-2xl">{nodeIcons[stage.type]}</span>
                    <p className={`text-sm font-semibold mt-1 ${colors.text}`}>{stage.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stage.description}</p>
                    {stageNodes.map(n => (
                      <div key={n.id} className="mt-2 p-2 bg-black/20 rounded-lg">
                        <p className="text-xs text-gray-300">{n.label}</p>
                        <p className={`text-sm font-bold ${colors.text}`}>{n.value.toLocaleString()} {n.unit}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
                {i < stages.length - 1 && (
                  <div className="hidden md:flex items-center px-1">
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-emerald-400/50">
                      <FiArrowRight />
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Flow Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><FiZap className="text-yellow-400" /> Active Flows</h3>
          <div className="space-y-2">
            {flows.map((flow, i) => {
              const fromNode = nodes.find(n => n.id === flow.from);
              const toNode = nodes.find(n => n.id === flow.to);
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{fromNode?.label || flow.from}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-emerald-400">
                      <FiArrowRight />
                    </motion.div>
                    <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded">{flow.volume} {flow.unit}</span>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-sm text-white font-medium">{toNode?.label || flow.to}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><FiTrendingUp className="text-emerald-400" /> System Performance</h3>
          <div className="space-y-4">
            {[
              { label: 'Collection Efficiency', value: 78, color: 'emerald' },
              { label: 'Processing Throughput', value: 92, color: 'blue' },
              { label: 'CO₂ Capture Rate', value: 85, color: 'purple' },
              { label: 'Credit Verification Rate', value: 96, color: 'green' },
              { label: 'Market Absorption', value: 71, color: 'yellow' },
            ].map((bar, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">{bar.label}</span>
                  <span className={`text-sm font-bold text-${bar.color}-400`}>{bar.value}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${bar.value}%` }} transition={{ duration: 1, delay: i * 0.15 }}
                    className={`h-full bg-gradient-to-r from-${bar.color}-500 to-${bar.color}-400 rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
