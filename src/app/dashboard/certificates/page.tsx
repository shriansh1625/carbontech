'use client';

import { motion } from 'framer-motion';
import { FiAward, FiDownload, FiExternalLink } from 'react-icons/fi';

const certificates = [
  { id: 1, title: 'Carbon Neutral Certificate Q1 2026', credits: 250, date: 'Jan 2026', project: 'Punjab No-Burn Initiative', status: 'Active' },
  { id: 2, title: 'Carbon Neutral Certificate Q4 2025', credits: 300, date: 'Oct 2025', project: 'Haryana Biochar Project', status: 'Active' },
  { id: 3, title: 'Carbon Neutral Certificate Q3 2025', credits: 200, date: 'Jul 2025', project: 'UP Zero Tillage Program', status: 'Expired' },
];

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Certificates</h1>
        <p className="text-gray-400">Your carbon offset certificates and documentation.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Certificates', value: '3' },
          { label: 'Total Credits Offset', value: '750 tCO2e' },
          { label: 'Active', value: '2' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        {certificates.map((cert, i) => (
          <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.3 }} className="glass-card p-6 glass-card-hover">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                  <FiAward className="text-emerald-400 text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{cert.title}</h3>
                  <p className="text-sm text-gray-400">{cert.project} &bull; {cert.credits} tCO2e</p>
                  <p className="text-xs text-gray-500 mt-1">Issued: {cert.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full ${cert.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-gray-400 border border-white/10'}`}>{cert.status}</span>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 text-sm transition-all">
                  <FiDownload className="text-xs" /> PDF
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-400 hover:to-teal-400 text-sm transition-all">
                  <FiExternalLink className="text-xs" /> View
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}