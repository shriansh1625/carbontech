'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiMapPin, FiEdit2, FiTrash2 } from 'react-icons/fi';

const typeLabels: Record<string, string> = {
  crop_residue: 'Crop Residue',
  biochar: 'Biochar',
  biomass: 'Biomass',
  agricultural_waste: 'Agri Waste',
};

const demoListings = [
  { id: '1', type: 'crop_residue', cropType: 'Rice', quantity: 15, pricePerTon: 3000, location: 'Ludhiana, Punjab', status: 'available', description: 'High-quality rice straw, baled.' },
  { id: '2', type: 'biochar', cropType: 'Rice', quantity: 5, pricePerTon: 10000, location: 'Ludhiana, Punjab', status: 'available', description: 'Premium biochar from rice husk.' },
  { id: '3', type: 'crop_residue', cropType: 'Wheat', quantity: 20, pricePerTon: 2500, location: 'Karnal, Haryana', status: 'sold', description: 'Wheat stubble, freshly harvested.' },
];

export default function ListingsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">My Listings</h1>
          <p className="text-gray-400">Manage your biomass listings on the marketplace.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all text-sm font-medium">
          <FiPlus /> New Listing
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">Create New Listing</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <select className="px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white outline-none focus:border-emerald-400/50">
              <option value="" className="bg-[#0a0f0d]">Select Type</option>
              <option value="crop_residue" className="bg-[#0a0f0d]">Crop Residue</option>
              <option value="biochar" className="bg-[#0a0f0d]">Biochar</option>
              <option value="biomass" className="bg-[#0a0f0d]">Biomass</option>
              <option value="agricultural_waste" className="bg-[#0a0f0d]">Agricultural Waste</option>
            </select>
            <input placeholder="Crop Type (e.g., Rice, Wheat)" className="px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
            <input placeholder="Quantity (tons)" type="number" className="px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
            <input placeholder="Price per Ton (₹)" type="number" className="px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
            <input placeholder="Location" className="px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
            <input placeholder="Select Farm" className="px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
          </div>
          <textarea placeholder="Description of your biomass..." className="w-full mt-4 px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50 resize-none" rows={3} />
          <div className="flex gap-3 mt-4">
            <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-400 hover:to-teal-400 text-sm font-medium">Publish Listing</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 border border-white/10 text-gray-300 rounded-xl hover:bg-white/5 text-sm">Cancel</button>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {demoListings.map((listing, i) => (
          <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-5 glass-card-hover">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-white">{listing.cropType} {typeLabels[listing.type]}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${listing.status === 'available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-gray-400 border border-white/10'}`}>
                    {listing.status === 'available' ? 'Active' : 'Sold'}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{listing.description}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1"><FiMapPin className="text-xs" /> {listing.location}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Quantity</p>
                  <p className="font-bold text-white">{listing.quantity} tons</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Price/Ton</p>
                  <p className="font-bold text-emerald-400">₹{listing.pricePerTon.toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-500 hover:text-emerald-400 transition-colors"><FiEdit2 /></button>
                  <button className="p-2 text-gray-500 hover:text-red-400 transition-colors"><FiTrash2 /></button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}