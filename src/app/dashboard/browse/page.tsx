'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiMapPin, FiShoppingCart } from 'react-icons/fi';

const allListings = [
  { id: 1, crop: 'Rice Straw', farmer: 'Rajesh Kumar', location: 'Amritsar, Punjab', quantity: 25, price: 2500, quality: 'Premium' },
  { id: 2, crop: 'Wheat Straw', farmer: 'Mohan Singh', location: 'Karnal, Haryana', quantity: 40, price: 2200, quality: 'Standard' },
  { id: 3, crop: 'Corn Stalks', farmer: 'Priya Devi', location: 'Ludhiana, Punjab', quantity: 15, price: 1800, quality: 'Premium' },
  { id: 4, crop: 'Biochar', farmer: 'Arun Patel', location: 'Indore, MP', quantity: 8, price: 8000, quality: 'Premium' },
  { id: 5, crop: 'Rice Husk', farmer: 'Lakshmi Bai', location: 'Varanasi, UP', quantity: 30, price: 1500, quality: 'Standard' },
  { id: 6, crop: 'Sugarcane Bagasse', farmer: 'Vijay Sharma', location: 'Kolhapur, MH', quantity: 50, price: 1200, quality: 'Standard' },
];

export default function BrowsePage() {
  const [search, setSearch] = useState('');
  const [listings, setListings] = useState(allListings);

  useEffect(() => {
    if (!search) { setListings(allListings); return; }
    const q = search.toLowerCase();
    setListings(allListings.filter((l) => l.crop.toLowerCase().includes(q) || l.farmer.toLowerCase().includes(q) || l.location.toLowerCase().includes(q)));
  }, [search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Browse Biomass</h1>
        <p className="text-gray-400">Find and purchase biomass from verified farmers.</p>
      </div>

      <div className="glass-card p-4">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by crop, farmer, or location..." className="w-full pl-11 pr-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50" />
        </div>
      </div>

      <p className="text-gray-500 text-sm">{listings.length} listings found</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing, i) => (
          <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-6 glass-card-hover">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">{listing.crop}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${listing.quality === 'Premium' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-gray-400 border border-white/10'}`}>{listing.quality}</span>
            </div>
            <p className="text-sm text-gray-400 flex items-center gap-1 mb-1"><FiMapPin className="text-xs" />{listing.location}</p>
            <p className="text-sm text-gray-500 mb-4">by {listing.farmer}</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-white font-bold">{listing.quantity}t</p>
                <p className="text-[10px] text-gray-500">Quantity</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-emerald-400 font-bold">₹{listing.price.toLocaleString()}</p>
                <p className="text-[10px] text-gray-500">Per Ton</p>
              </div>
            </div>
            <button className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center justify-center gap-1.5">
              <FiShoppingCart className="text-xs" /> Place Order
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}