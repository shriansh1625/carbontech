'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiMapPin, FiEdit2 } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';
import dynamic from 'next/dynamic';

const FarmMap = dynamic(() => import('@/components/FarmMap'), { ssr: false });

const demoFarms = [
  { id: '1', name: 'Green Acres Farm', location: 'Ludhiana, Punjab', area: 15, cropType: 'Rice & Wheat', practices: ['No-burn', 'Zero tillage'], lat: 30.9, lng: 75.85 },
  { id: '2', name: 'Sunrise Fields', location: 'Karnal, Haryana', area: 10, cropType: 'Wheat', practices: ['Cover cropping', 'Composting'], lat: 29.69, lng: 76.98 },
];

export default function FarmPage() {
  const [showForm, setShowForm] = useState(false);
  const [farms] = useState(demoFarms);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">My Farms</h1>
          <p className="text-gray-400">Manage your farm profiles and land details.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all text-sm font-medium">
          <FiPlus /> Add Farm
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">Add New Farm</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input placeholder="Farm Name" className="px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
            <input placeholder="Location (City, State)" className="px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
            <input placeholder="Area (acres)" type="number" className="px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
            <input placeholder="Crop Type" className="px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
            <input placeholder="Latitude" type="number" step="0.01" className="px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
            <input placeholder="Longitude" type="number" step="0.01" className="px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Sustainable Practices</label>
            <div className="flex flex-wrap gap-2">
              {['No-burn', 'Zero tillage', 'Cover cropping', 'Composting', 'Biochar', 'Crop rotation'].map((p) => (
                <label key={p} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-300 cursor-pointer hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20">
                  <input type="checkbox" className="rounded text-emerald-500" /> {p}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-400 hover:to-teal-400 text-sm font-medium">Save Farm</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 border border-white/10 text-gray-300 rounded-xl hover:bg-white/5 text-sm">Cancel</button>
          </div>
        </motion.div>
      )}

      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Farm Locations</h3>
        <FarmMap
          points={farms.map((f) => ({ lat: f.lat, lng: f.lng, label: f.name, details: `${f.area} acres - ${f.cropType}` }))}
          center={[30.0, 76.5]}
          zoom={7}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {farms.map((farm, i) => (
          <motion.div key={farm.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 glass-card-hover">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-white text-lg">{farm.name}</h3>
                <p className="text-sm text-gray-400 flex items-center gap-1"><FiMapPin className="text-xs" /> {farm.location}</p>
              </div>
              <button className="p-2 text-gray-500 hover:text-emerald-400"><FiEdit2 /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-gray-500">Area</p>
                <p className="font-bold text-white">{farm.area} acres</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-gray-500">Crop Type</p>
                <p className="font-bold text-white">{farm.cropType}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2">Sustainable Practices</p>
              <div className="flex flex-wrap gap-1">
                {farm.practices.map((p) => (
                  <span key={p} className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20">{p}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}