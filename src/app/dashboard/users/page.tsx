'use client';

import { motion } from 'framer-motion';
import { FiUsers, FiSearch, FiMoreVertical } from 'react-icons/fi';

const users = [
  { name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'farmer', status: 'Active', joined: 'Jan 2026' },
  { name: 'Green Energy Corp', email: 'info@greenenergy.com', role: 'industry', status: 'Active', joined: 'Feb 2026' },
  { name: 'EcoOffset Ltd', email: 'team@ecooffset.com', role: 'company', status: 'Active', joined: 'Dec 2025' },
  { name: 'Priya Verma', email: 'priya.v@example.com', role: 'verifier', status: 'Active', joined: 'Mar 2026' },
  { name: 'Suresh Yadav', email: 'suresh@example.com', role: 'farmer', status: 'Suspended', joined: 'Nov 2025' },
  { name: 'BioEnergy India', email: 'hello@bioenergy.in', role: 'industry', status: 'Active', joined: 'Jan 2026' },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-gray-400">Manage platform users and roles.</p>
        </div>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input placeholder="Search users..." className="pl-9 pr-4 py-2 bg-white/5 border border-emerald-500/20 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-400 border-b border-white/10"><th className="pb-3">Name</th><th className="pb-3">Email</th><th className="pb-3">Role</th><th className="pb-3">Joined</th><th className="pb-3">Status</th><th className="pb-3"></th></tr></thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{u.name[0]}</div>
                      <span className="font-medium text-white">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-400">{u.email}</td>
                  <td className="py-3"><span className="text-xs capitalize bg-white/5 text-gray-300 px-2 py-1 rounded-full border border-white/10">{u.role}</span></td>
                  <td className="py-3 text-gray-500">{u.joined}</td>
                  <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full ${u.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{u.status}</span></td>
                  <td className="py-3"><button className="text-gray-500 hover:text-white"><FiMoreVertical /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}