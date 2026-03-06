'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiDroplet, FiMapPin, FiTruck } from 'react-icons/fi';
import { useAuthStore } from '@/lib/store';
import toast from 'react-hot-toast';
import type { CO2Listing } from '@/lib/types';

const captureMethodLabels: Record<string, string> = {
  biomass_gasification: 'Biomass Gasification',
  pyrolysis: 'Pyrolysis',
  direct_air: 'Direct Air Capture',
  fermentation: 'Fermentation',
};

export default function CO2ListingsPage() {
  const { profile } = useAuthStore();
  const [listings, setListings] = useState<CO2Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    co2Purity: 99,
    quantity: 100,
    pricePerTon: 10000,
    location: '',
    captureMethod: 'biomass_gasification',
    storageType: 'compressed_gas',
    transportOptions: ['Tanker Truck'],
    description: '',
  });

  useEffect(() => {
    fetch('/api/co2')
      .then((r) => r.json())
      .then((data) => {
        const mine = data.listings.filter((l: CO2Listing) => l.processorId === profile?.uid);
        setListings(mine.length > 0 ? mine : data.listings.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [profile?.uid]);

  const handleSubmit = async () => {
    if (!form.location || !form.description) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch('/api/co2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-listing',
          processorId: profile?.uid,
          processorName: profile?.displayName || 'Processor',
          ...form,
          lat: 28.6,
          lng: 77.2,
          status: 'available',
          createdAt: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        toast.success('CO₂ listing created!');
        setShowForm(false);
      }
    } catch {
      toast.error('Failed to create listing');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FiDroplet className="text-teal-400" /> My CO₂ Listings
          </h1>
          <p className="text-gray-400 mt-1">Manage your captured CO₂ inventory for sale</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/25">
          <FiPlus /> List CO₂
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">New CO₂ Listing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">CO₂ Purity (%)</label>
              <input type="number" min={90} max={100} step={0.1} value={form.co2Purity}
                onChange={(e) => setForm({ ...form, co2Purity: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Quantity (tons)</label>
              <input type="number" min={1} value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Price per Ton (₹)</label>
              <input type="number" min={1000} value={form.pricePerTon}
                onChange={(e) => setForm({ ...form, pricePerTon: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Location</label>
              <input type="text" value={form.location} placeholder="City, State"
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Capture Method</label>
              <select value={form.captureMethod} onChange={(e) => setForm({ ...form, captureMethod: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500/50 focus:outline-none">
                <option value="biomass_gasification">Biomass Gasification</option>
                <option value="pyrolysis">Pyrolysis</option>
                <option value="direct_air">Direct Air Capture</option>
                <option value="fermentation">Fermentation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Storage Type</label>
              <select value={form.storageType} onChange={(e) => setForm({ ...form, storageType: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500/50 focus:outline-none">
                <option value="compressed_gas">Compressed Gas</option>
                <option value="liquid">Liquid CO₂</option>
                <option value="solid">Solid (Dry Ice)</option>
                <option value="supercritical">Supercritical</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea rows={3} value={form.description} placeholder="Describe your CO₂ product, quality, and ideal use cases..."
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500/50 focus:outline-none resize-none" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl">
              Create Listing
            </button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/5">Cancel</button>
          </div>
        </motion.div>
      )}

      {/* Listings */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listings.map((listing, i) => (
            <motion.div key={listing.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold">{listing.processeName || listing.processorName}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><FiMapPin /> {listing.location}</p>
                </div>
                <div className="flex gap-1">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${listing.status === 'available' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/15 text-amber-400 border-amber-500/20'}`}>
                    {listing.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{listing.description}</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-white/5 text-center">
                  <p className="text-xs text-gray-500">Purity</p>
                  <p className="text-sm text-white font-semibold">{listing.co2Purity}%</p>
                </div>
                <div className="p-2 rounded-lg bg-white/5 text-center">
                  <p className="text-xs text-gray-500">Quantity</p>
                  <p className="text-sm text-white font-semibold">{listing.quantity}t</p>
                </div>
                <div className="p-2 rounded-lg bg-white/5 text-center">
                  <p className="text-xs text-gray-500">₹/ton</p>
                  <p className="text-sm text-emerald-400 font-semibold">₹{listing.pricePerTon.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <FiTruck /> {listing.transportOptions?.join(' • ') || 'Tanker'}
                <span className="ml-auto">{captureMethodLabels[listing.captureMethod] || listing.captureMethod}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 text-sm text-gray-300 border border-white/10 rounded-xl hover:bg-white/5 flex items-center justify-center gap-1"><FiEdit2 /> Edit</button>
                <button className="px-3 py-2 text-sm text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/10"><FiTrash2 /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
