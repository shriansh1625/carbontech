'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiMapPin, FiTruck, FiShield, FiDroplet, FiWind, FiZap } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';
import Link from 'next/link';
import type { CO2Listing } from '@/lib/types';

const industryBadges: Record<string, { label: string; color: string }> = {
  beverage: { label: 'Beverage', color: 'emerald' },
  greenhouse: { label: 'Greenhouse', color: 'teal' },
  dry_ice: { label: 'Dry Ice', color: 'blue' },
  welding: { label: 'Welding', color: 'amber' },
  chemical: { label: 'Chemical', color: 'purple' },
  synthetic_fuel: { label: 'Syn-Fuel', color: 'rose' },
};

const methodLabels: Record<string, string> = {
  biomass_gasification: 'Biomass Gasification',
  pyrolysis: 'Pyrolysis',
  direct_air: 'Direct Air Capture',
  fermentation: 'Fermentation',
};

const storageLabels: Record<string, string> = {
  compressed_gas: 'Compressed Gas',
  liquid: 'Liquid CO₂',
  solid: 'Solid (Dry Ice)',
  supercritical: 'Supercritical',
};

export default function CO2MarketplacePage() {
  const [listings, setListings] = useState<CO2Listing[]>([]);
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/co2')
      .then((r) => r.json())
      .then((data) => { setListings(data.listings); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = listings.filter((l) => {
    const matchSearch = !search || l.processorName.toLowerCase().includes(search.toLowerCase()) || l.location.toLowerCase().includes(search.toLowerCase()) || l.description.toLowerCase().includes(search.toLowerCase());
    const matchMethod = !methodFilter || l.captureMethod === methodFilter;
    return matchSearch && matchMethod;
  });

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-6">
              <FiWind className="text-base" /> CO₂ Capture & Utilization Marketplace
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Trade Captured </span>
              <span className="gradient-text">CO₂</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Agricultural residue processed through gasification and pyrolysis plants captures CO₂ instead of releasing it. Buy and sell captured carbon dioxide as an industrial commodity.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {Object.values(industryBadges).map((badge) => (
                <span key={badge.label} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm">
                  {badge.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { label: 'CO₂ Available', value: '1,200 tons', icon: FiDroplet },
              { label: 'Active Processors', value: '24', icon: FiZap },
              { label: 'Avg Price/ton', value: '₹10,800', icon: FiTruck },
              { label: 'Verified Purity', value: '98.5%+', icon: FiShield },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-5 text-center">
                <stat.icon className="text-emerald-400 text-2xl mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="glass-card p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by processor, location, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500/50 focus:outline-none"
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="pl-11 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white appearance-none cursor-pointer focus:border-emerald-500/50 focus:outline-none min-w-[220px]"
            >
              <option value="">All Capture Methods</option>
              <option value="biomass_gasification">Biomass Gasification</option>
              <option value="pyrolysis">Pyrolysis</option>
              <option value="direct_air">Direct Air Capture</option>
              <option value="fermentation">Fermentation</option>
            </select>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((listing, i) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card glass-card-hover p-6 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{listing.processorName}</h3>
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1">
                      <FiMapPin className="text-xs" /> {listing.location}
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                    {listing.co2Purity}% Pure
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-2">{listing.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-400 text-xs font-medium border border-teal-500/20">
                    {methodLabels[listing.captureMethod]}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                    {storageLabels[listing.storageType]}
                  </span>
                </div>

                {/* Transport */}
                <div className="flex items-center gap-2 mb-4">
                  <FiTruck className="text-gray-500 text-sm" />
                  <span className="text-gray-400 text-xs">{listing.transportOptions.join(' • ')}</span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3 mb-5 p-3 rounded-xl bg-white/5">
                  <div>
                    <p className="text-xs text-gray-500">Quantity</p>
                    <p className="text-white font-semibold">{listing.quantity} tons</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Price/ton</p>
                    <p className="text-emerald-400 font-semibold">₹{listing.pricePerTon.toLocaleString()}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/25">
                    Purchase CO₂
                  </button>
                  <button className="px-4 py-2.5 border border-white/10 text-gray-300 text-sm font-medium rounded-xl hover:bg-white/5 transition-all">
                    Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <FiWind className="text-5xl text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No CO₂ listings found matching your criteria.</p>
          </div>
        )}
      </section>

      {/* How CO2 Capture Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">How CO₂ Capture Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Agricultural residue is processed through advanced technology, capturing carbon dioxide instead of releasing it into the atmosphere.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Residue Collection', desc: 'Farmers collect crop residue (parali) instead of burning it', icon: GiSolidLeaf, color: 'emerald' },
            { step: '02', title: 'Processing', desc: 'Biomass undergoes gasification or pyrolysis at processing plants', icon: FiZap, color: 'teal' },
            { step: '03', title: 'CO₂ Capture', desc: 'Released carbon dioxide is captured and purified to industrial grade', icon: FiDroplet, color: 'blue' },
            { step: '04', title: 'Utilization', desc: 'Industries purchase CO₂ for beverages, dry ice, welding, and more', icon: FiTruck, color: 'amber' },
          ].map((item, i) => (
            <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center relative">
              <div className="text-5xl font-black text-white/5 absolute top-4 right-4">{item.step}</div>
              <item.icon className={`text-3xl mx-auto mb-4 text-${item.color}-400`} />
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="glass-card p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-blue-500/10" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Trade Captured CO₂?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Join the circular carbon economy. List your captured CO₂ or purchase industrial-grade carbon dioxide from verified processors.</p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup" className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/25">
                Start Trading
              </Link>
              <Link href="/how-it-works" className="px-8 py-3 border border-white/10 text-gray-300 font-medium rounded-xl hover:bg-white/5 transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
