'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiSearch } from 'react-icons/fi';

const contacts = [
  { id: '1', name: 'Rajesh Kumar', role: 'Farmer', lastMsg: 'Shipment will be ready by Friday', time: '2h ago', unread: 2 },
  { id: '2', name: 'Green Energy Corp', role: 'Industry', lastMsg: 'We need 20 tons of rice straw', time: '1d ago', unread: 0 },
  { id: '3', name: 'EcoOffset Ltd', role: 'Company', lastMsg: 'Interested in purchasing credits', time: '3d ago', unread: 1 },
];

export default function MessagesPage() {
  const [active, setActive] = useState('1');
  const [msg, setMsg] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-gray-400">Communicate with buyers, sellers, and partners.</p>
      </div>

      <div className="glass-card overflow-hidden" style={{ height: 'calc(100vh - 220px)' }}>
        <div className="flex h-full">
          <div className="w-80 border-r border-white/10 flex flex-col">
            <div className="p-3 border-b border-white/10">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input placeholder="Search contacts..." className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500/30" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contacts.map((c) => (
                <button key={c.id} onClick={() => setActive(c.id)} className={`w-full p-4 text-left border-b border-white/5 transition-all ${active === c.id ? 'bg-emerald-500/10' : 'hover:bg-white/5'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold">{c.name[0]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-white text-sm truncate">{c.name}</p>
                        <span className="text-xs text-gray-500">{c.time}</span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{c.lastMsg}</p>
                    </div>
                    {c.unread > 0 && <span className="w-5 h-5 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{c.unread}</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-white/10">
              <p className="font-medium text-white">{contacts.find((c) => c.id === active)?.name}</p>
              <p className="text-xs text-gray-500">{contacts.find((c) => c.id === active)?.role}</p>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex justify-start mb-4"><div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl text-sm text-gray-300 max-w-[70%]">{contacts.find((c) => c.id === active)?.lastMsg}</div></div>
            </div>
            <div className="p-4 border-t border-white/10 flex gap-3">
              <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-2.5 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none text-sm focus:border-emerald-400/50" />
              <button className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-400 hover:to-teal-400"><FiSend /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}