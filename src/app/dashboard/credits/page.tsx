'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';

const projects = [
  { id: 1, name: 'Punjab No-Burn Initiative 2025', type: 'Stubble Burning Prevention', credits: 500, price: 1200, vintage: '2025', standard: 'Verra VCS' },
  { id: 2, name: 'Haryana Biochar Project', type: 'Biochar Carbon Sequestration', credits: 200, price: 1500, vintage: '2025', standard: 'Gold Standard' },
  { id: 3, name: 'UP Zero Tillage Program', type: 'Soil Carbon Enhancement', credits: 300, price: 1100, vintage: '2025', standard: 'CDM' },
  { id: 4, name: 'Rajasthan Methane Capture', type: 'Methane Recovery', credits: 150, price: 1800, vintage: '2025', standard: 'Verra VCS' },
];

export default function CreditsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Buy Carbon Credits</h1>
        <p className="text-gray-400">Purchase verified carbon credits from sustainable agriculture projects.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 glass-card-hover">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{project.type}</p>
              </div>
              <GiSolidLeaf className="text-emerald-400 text-2xl" />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-white font-bold">{project.credits}</p>
                <p className="text-[10px] text-gray-500">tCO2e Avail</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-emerald-400 font-bold">₹{project.price.toLocaleString()}</p>
                <p className="text-[10px] text-gray-500">Per tCO2e</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-teal-400 font-bold">{project.vintage}</p>
                <p className="text-[10px] text-gray-500">Vintage</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20">{project.standard}</span>
            </div>
            <button className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center justify-center gap-1.5">
              <FiShoppingCart className="text-xs" /> Purchase Credits
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}