'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiBell, FiShield, FiSave } from 'react-icons/fi';
import { useAuthStore } from '@/lib/store';

export default function SettingsPage() {
  const { profile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'security', label: 'Security', icon: FiShield },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">Manage your account preferences.</p>
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10'}`}>
            <tab.icon /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
          <h3 className="font-bold text-white mb-6">Profile Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Display Name</label>
              <input defaultValue={profile?.displayName || ''} className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Email</label>
              <input defaultValue={profile?.email || ''} disabled className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-500 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Phone</label>
              <input placeholder="+91 xxxxxxxxxx" className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Location</label>
              <input placeholder="City, State" className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
            </div>
          </div>
          <button className="mt-6 flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-400 hover:to-teal-400 text-sm font-medium">
            <FiSave /> Save Changes
          </button>
        </motion.div>
      )}

      {activeTab === 'notifications' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
          <h3 className="font-bold text-white mb-6">Notification Preferences</h3>
          <div className="space-y-4">
            {['Email notifications for new orders', 'SMS alerts for carbon credit updates', 'Push notifications for messages', 'Weekly summary reports'].map((label) => (
              <div key={label} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="text-sm text-gray-300">{label}</span>
                <div className="w-12 h-6 bg-emerald-500/20 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-emerald-400 rounded-full absolute top-0.5 right-0.5" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'security' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
          <h3 className="font-bold text-white mb-6">Security Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Current Password</label>
              <input type="password" className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white outline-none focus:border-emerald-400/50" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">New Password</label>
              <input type="password" className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white outline-none focus:border-emerald-400/50" />
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-400 hover:to-teal-400 text-sm font-medium">
              <FiShield /> Update Password
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}