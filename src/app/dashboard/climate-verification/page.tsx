'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiCheckCircle, FiClock, FiActivity, FiFileText, FiAward, FiAlertCircle, FiExternalLink } from 'react-icons/fi';
import type { VerificationRecord } from '@/lib/types';

const statusConfig: Record<string, { label: string; icon: typeof FiCheckCircle; color: string; bg: string }> = {
  registered: { label: 'Registered', icon: FiFileText, color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/20' },
  monitoring: { label: 'In Monitoring', icon: FiActivity, color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/20' },
  pending_verification: { label: 'Pending Verification', icon: FiClock, color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/20' },
  verified: { label: 'Verified', icon: FiCheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/20' },
  rejected: { label: 'Rejected', icon: FiAlertCircle, color: 'text-red-400', bg: 'bg-red-500/15 border-red-500/20' },
};

export default function ClimateVerificationPage() {
  const [records, setRecords] = useState<VerificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<VerificationRecord | null>(null);

  useEffect(() => {
    fetch('/api/verification')
      .then((r) => r.json())
      .then((data) => { setRecords(data.records); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? records : records.filter((r) => r.status === filter);

  const stats = {
    total: records.length,
    verified: records.filter((r) => r.status === 'verified').length,
    totalReduced: records.reduce((sum, r) => sum + r.emissionsReduced, 0),
    totalIssued: records.reduce((sum, r) => sum + r.creditsIssued, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <FiShield className="text-emerald-400" /> Climate Impact Verification
        </h1>
        <p className="text-gray-400 mt-1">Carbon registry–grade verification tracking — modeled on Verra VCS & Gold Standard protocols</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: stats.total, icon: FiFileText, color: 'blue' },
          { label: 'Verified Projects', value: stats.verified, icon: FiCheckCircle, color: 'emerald' },
          { label: 'Emissions Reduced', value: `${stats.totalReduced.toLocaleString()} tCO₂e`, icon: FiActivity, color: 'teal' },
          { label: 'Credits Issued', value: `${stats.totalIssued.toLocaleString()} tCO₂e`, icon: FiAward, color: 'amber' },
        ].map((stat) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/15 flex items-center justify-center`}>
                <stat.icon className={`text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'registered', 'monitoring', 'pending_verification', 'verified', 'rejected'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${filter === f ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}>
            {f === 'all' ? 'All' : statusConfig[f]?.label || f}
          </button>
        ))}
      </div>

      {/* Records */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((record, i) => {
            const cfg = statusConfig[record.status] || statusConfig.registered;
            const isOpen = selected?.id === record.id;
            return (
              <motion.div key={record.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <button onClick={() => setSelected(isOpen ? null : record)}
                  className="w-full text-left glass-card p-5 hover:bg-white/[0.03] transition-all">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${cfg.bg} ${cfg.color} shrink-0`}>
                      <cfg.icon className="text-sm" /> {cfg.label}
                    </div>

                    {/* Project Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate">{record.projectName}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{record.methodology}</p>
                    </div>

                    {/* Key Numbers */}
                    <div className="flex gap-6 text-sm shrink-0">
                      <div>
                        <p className="text-xs text-gray-500">Baseline</p>
                        <p className="text-white font-semibold">{record.baselineEmissions} tCO₂e</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Reduced</p>
                        <p className="text-emerald-400 font-semibold">{record.emissionsReduced} tCO₂e</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Issued</p>
                        <p className="text-teal-400 font-semibold">{record.creditsIssued || '—'} tCO₂e</p>
                      </div>
                    </div>

                    {/* Registry ID */}
                    {record.registryId && (
                      <div className="flex items-center gap-1.5 text-xs text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20 shrink-0">
                        <FiExternalLink className="text-xs" /> {record.registryId}
                      </div>
                    )}
                  </div>
                </button>

                {/* Expanded Detail */}
                {isOpen && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card mt-2 p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-xs text-gray-500">Monitoring Period</p>
                        <p className="text-sm text-white font-medium mt-1">
                          {new Date(record.monitoringPeriod.start).toLocaleDateString()} — {new Date(record.monitoringPeriod.end).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-xs text-gray-500">Emission Reduction Rate</p>
                        <p className="text-sm text-emerald-400 font-semibold mt-1">
                          {((record.emissionsReduced / record.baselineEmissions) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-xs text-gray-500">Documents</p>
                        <p className="text-sm text-white font-medium mt-1">{record.documents.length} files</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-xs text-gray-500">Last Updated</p>
                        <p className="text-sm text-white font-medium mt-1">{new Date(record.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Verification Timeline */}
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">Verification Pipeline</h4>
                    <div className="flex items-center gap-2">
                      {['registered', 'monitoring', 'pending_verification', 'verified'].map((step, idx) => {
                        const stepOrder = { registered: 0, monitoring: 1, pending_verification: 2, verified: 3, rejected: -1 };
                        const currentOrder = stepOrder[record.status as keyof typeof stepOrder] ?? -1;
                        const stepIdx = stepOrder[step as keyof typeof stepOrder] ?? 0;
                        const isCompleted = currentOrder >= stepIdx;
                        const isCurrent = currentOrder === stepIdx;
                        return (
                          <div key={step} className="flex items-center gap-2 flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 ${isCompleted ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-gray-600'} ${isCurrent ? 'ring-2 ring-emerald-500/30' : ''}`}>
                              {isCompleted ? <FiCheckCircle className="text-sm" /> : <span className="text-xs">{idx + 1}</span>}
                            </div>
                            {idx < 3 && <div className={`flex-1 h-0.5 ${isCompleted && stepIdx < currentOrder ? 'bg-emerald-500' : 'bg-white/10'}`} />}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {['Registered', 'Monitoring', 'Verification', 'Verified'].map((label) => (
                        <span key={label} className="flex-1 text-center text-[10px] text-gray-500">{label}</span>
                      ))}
                    </div>

                    {/* Documents */}
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Documents</h4>
                      <div className="flex flex-wrap gap-2">
                        {record.documents.map((doc) => (
                          <span key={doc} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300">
                            <FiFileText className="text-gray-500" /> {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16">
          <FiShield className="text-5xl text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No verification records found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}
