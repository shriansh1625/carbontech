'use client';

import { motion } from 'framer-motion';
import { FiFileText, FiCheckCircle, FiClock, FiPlus } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';

const projects = [
  { id: 1, name: 'Punjab No-Burn Initiative 2025', farmer: 'Rajesh Kumar', area: '50 acres', credits: '40 tCO2e', status: 'Verified', methodology: 'CDM AMS-III.H' },
  { id: 2, name: 'Haryana Biochar Project', farmer: 'Sunita Devi', area: '20 acres', credits: '60 tCO2e', status: 'Pending', methodology: 'Verra VCS' },
  { id: 3, name: 'UP Zero Tillage Program', farmer: 'Mohan Lal', area: '35 acres', credits: '14 tCO2e', status: 'In Review', methodology: 'Gold Standard' },
  { id: 4, name: 'MP Composting Initiative', farmer: 'Arun Patel', area: '15 acres', credits: '10 tCO2e', status: 'Verified', methodology: 'CDM AMS-III.D' },
  { id: 5, name: 'Rajasthan Crop Rotation', farmer: 'Geeta Rani', area: '28 acres', credits: '22 tCO2e', status: 'Pending', methodology: 'Verra VCS' },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Carbon Projects</h1>
          <p className="text-gray-400">Manage and monitor all carbon credit projects.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all text-sm font-medium">
          <FiPlus /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Projects', value: '5', icon: FiFileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Verified', value: '2', icon: FiCheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Pending', value: '3', icon: FiClock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-xl`}><stat.icon className={`text-xl ${stat.color}`} /></div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">All Projects</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-400 border-b border-white/10"><th className="pb-3">Project</th><th className="pb-3">Farmer</th><th className="pb-3">Area</th><th className="pb-3">Credits</th><th className="pb-3">Methodology</th><th className="pb-3">Status</th></tr></thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-white/5">
                  <td className="py-3 font-medium text-white">{p.name}</td>
                  <td className="py-3 text-gray-300">{p.farmer}</td>
                  <td className="py-3 text-gray-300">{p.area}</td>
                  <td className="py-3 text-emerald-400 font-medium">{p.credits}</td>
                  <td className="py-3"><span className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded-full border border-white/10">{p.methodology}</span></td>
                  <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full ${p.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : p.status === 'In Review' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}