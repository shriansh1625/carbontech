'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiMapPin, FiStar, FiShoppingCart } from 'react-icons/fi';
import { GiSolidLeaf, GiWheat } from 'react-icons/gi';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
};

const allListings = [
  { id: 1, crop: 'Rice Straw', type: 'crop_residue', farmer: 'Rajesh Kumar', location: 'Amritsar, Punjab', quantity: 25, price: 2500, quality: 'Premium', carbonCredits: 10 },
  { id: 2, crop: 'Wheat Straw', type: 'crop_residue', farmer: 'Mohan Singh', location: 'Karnal, Haryana', quantity: 40, price: 2200, quality: 'Standard', carbonCredits: 16 },
  { id: 3, crop: 'Corn Stalks', type: 'crop_residue', farmer: 'Priya Devi', location: 'Ludhiana, Punjab', quantity: 15, price: 1800, quality: 'Premium', carbonCredits: 6 },
  { id: 4, crop: 'Biochar', type: 'biochar', farmer: 'Arun Patel', location: 'Indore, MP', quantity: 8, price: 8000, quality: 'Premium', carbonCredits: 24 },
  { id: 5, crop: 'Rice Husk', type: 'agricultural_waste', farmer: 'Lakshmi Bai', location: 'Varanasi, UP', quantity: 30, price: 1500, quality: 'Standard', carbonCredits: 12 },
  { id: 6, crop: 'Sugarcane Bagasse', type: 'biomass', farmer: 'Vijay Sharma', location: 'Kolhapur, MH', quantity: 50, price: 1200, quality: 'Standard', carbonCredits: 20 },
  { id: 7, crop: 'Mustard Stalks', type: 'crop_residue', farmer: 'Geeta Rani', location: 'Jaipur, Rajasthan', quantity: 18, price: 1900, quality: 'Premium', carbonCredits: 7 },
  { id: 8, crop: 'Cotton Stalks', type: 'crop_residue', farmer: 'Deepak Yadav', location: 'Nagpur, MH', quantity: 35, price: 2100, quality: 'Standard', carbonCredits: 14 },
  { id: 9, crop: 'Groundnut Shells', type: 'agricultural_waste', farmer: 'Kiran Kaur', location: 'Rajkot, Gujarat', quantity: 12, price: 3200, quality: 'Premium', carbonCredits: 8 },
];

const types = ['all', 'crop_residue', 'biochar', 'biomass', 'agricultural_waste'];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [listings, setListings] = useState(allListings);

  useEffect(() => {
    let filtered = allListings;
    if (typeFilter !== 'all') filtered = filtered.filter((l) => l.type === typeFilter);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((l) => l.crop.toLowerCase().includes(q) || l.farmer.toLowerCase().includes(q) || l.location.toLowerCase().includes(q));
    }
    setListings(filtered);
  }, [search, typeFilter]);

  return (
    <div className="bg-[#0a0f0d] min-h-screen">
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-emerald-500/8 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Marketplace</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
              Biomass <span className="gradient-text">Marketplace</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Browse verified biomass listings from farmers across India. Purchase directly with transparent pricing.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <div className="glass-card p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by crop, farmer, or location..."
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400/50 transition-all"
                />
              </div>
              <div className="flex items-center gap-2">
                <FiFilter className="text-gray-500" />
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      typeFilter === t
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:border-emerald-500/20'
                    }`}
                  >
                    {t === 'all' ? 'All' : t.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="text-gray-500 text-sm mb-6">{listings.length} listings found</p>

          {/* Listings Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing, i) => (
              <motion.div
                key={listing.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card p-6 glass-card-hover group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{listing.crop}</h3>
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1">
                      <FiMapPin className="text-xs" />
                      {listing.location}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    listing.quality === 'Premium'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}>
                    {listing.quality}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-[10px] font-bold">
                    {listing.farmer[0]}
                  </div>
                  {listing.farmer}
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <p className="text-white font-bold">{listing.quantity}t</p>
                    <p className="text-[10px] text-gray-500">Quantity</p>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <p className="text-emerald-400 font-bold">₹{listing.price.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-500">Per Ton</p>
                  </div>
                  <div className="text-center p-2 bg-emerald-500/5 rounded-lg">
                    <p className="text-teal-400 font-bold">{listing.carbonCredits}</p>
                    <p className="text-[10px] text-gray-500">Credits</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center justify-center gap-1.5">
                    <FiShoppingCart className="text-xs" /> Order Now
                  </button>
                  <button className="px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl hover:bg-white/10 transition-all">
                    Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}