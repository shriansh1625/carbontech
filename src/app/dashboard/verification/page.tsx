'use client';

import { motion } from 'framer-motion';
import { FiShield, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

const verifications = [
  { id: 1, project: 'Punjab No-Burn #128', farmer: 'Rajesh Kumar', area: '15 acres', credits: '12 tCO2e', submitted: 'Mar 20, 2026', status: 'Pending', docs: 3 },
  { id: 2, project: 'Haryana Biochar #045', farmer: 'Sunita Devi', area: '8 acres', credits: '24 tCO2e', submitted: 'Mar 18, 2026', status: 'In Review', docs: 5 },
  { id: 3, project: 'UP Zero Till #089', farmer: 'Mohan Lal', area: '20 acres', credits: '8 tCO2e', submitted: 'Mar 15, 2026', status: 'Pending', docs: 2 },
  { id: 4, project: 'MP Compost #067', farmer: 'Arun Patel', area: '12 acres', credits: '6 tCO2e', submitted: 'Mar 10, 2026', status: 'Approved', docs: 4 },
  { id: 5, project: 'Rajasthan Rotation #034', farmer: 'Geeta Rani', area: '28 acres', credits: '22 tCO2e', submitted: 'Mar 5, 2026', status: 'Rejected', docs: 1 },
];

export default function VerificationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Verification</h1>
        <p className="text-gray-400">Review and verify carbon credit project submissions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: '5', icon: FiShield, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Pending', value: '2', icon: FiClock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Approved', value: '2', icon: FiCheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Rejected', value: '1', icon: FiXCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
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
        <h3 className="font-bold text-white mb-4">Verification Queue</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-400 border-b border-white/10"><th className="pb-3">Project</th><th className="pb-3">Farmer</th><th className="pb-3">Area</th><th className="pb-3">Credits</th><th className="pb-3">Docs</th><th className="pb-3">Submitted</th><th className="pb-3">Status</th><th className="pb-3">Action</th></tr></thead>
            <tbody>
              {verifications.map((v) => (
                <tr key={v.id} className="border-b border-white/5">
                  <td className="py-3 font-medium text-white">{v.project}</td>
                  <td className="py-3 text-gray-300">{v.farmer}</td>
                  <td className="py-3 text-gray-300">{v.area}</td>
                  <td className="py-3 text-emerald-400 font-medium">{v.credits}</td>
                  <td className="py-3 text-gray-300">{v.docs}</td>
                  <td className="py-3 text-gray-500">{v.submitted}</td>
                  <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full ${v.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : v.status === 'In Review' ? 'bg-blue-500/10 text-blue-400' : v.status === 'Rejected' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>{v.status}</span></td>
                  <td className="py-3">{v.status === 'Pending' || v.status === 'In Review' ? <button className="text-sm text-emerald-400 hover:underline">Review</button> : <span className="text-xs text-gray-600">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}