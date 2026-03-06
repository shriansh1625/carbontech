'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiDroplet, FiMapPin, FiTruck, FiShield, FiSearch, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import type { CO2Listing } from '@/lib/types';
import { useAuthStore } from '@/lib/store';

export default function CO2OrdersPage() {
  const { profile } = useAuthStore();
  const [listings, setListings] = useState<CO2Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [orderQty, setOrderQty] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch('/api/co2')
      .then((r) => r.json())
      .then((data) => { setListings(data.listings); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = listings.filter((l) =>
    !search || l.processorName.toLowerCase().includes(search.toLowerCase()) || l.location.toLowerCase().includes(search.toLowerCase())
  );

  const placeOrder = async (listing: CO2Listing) => {
    const qty = orderQty[listing.id] || 10;
    try {
      const res = await fetch('/api/co2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'place-order',
          buyerId: profile?.uid,
          sellerId: listing.processorId,
          listingId: listing.id,
          quantity: qty,
          totalPrice: qty * listing.pricePerTon,
          industry: 'other',
          status: 'pending',
          createdAt: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        toast.success(`Order placed for ${qty} tons of CO₂!`);
      }
    } catch {
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <FiShoppingCart className="text-teal-400" /> Purchase CO₂
        </h1>
        <p className="text-gray-400 mt-1">Browse and purchase captured CO₂ from verified processing plants</p>
      </div>

      {/* Search */}
      <div className="glass-card p-4 flex gap-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="Search processors or locations..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500/50 focus:outline-none" />
        </div>
      </div>

      {/* Listings */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((listing, i) => (
            <motion.div key={listing.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card glass-card-hover p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold text-lg">{listing.processorName}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1"><FiMapPin /> {listing.location}</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/20 flex items-center gap-1">
                  <FiShield /> {listing.co2Purity}% Pure
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-4">{listing.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-xs text-gray-500">Available</p>
                  <p className="text-lg font-bold text-white">{listing.quantity} tons</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-xs text-gray-500">Price/ton</p>
                  <p className="text-lg font-bold text-emerald-400">₹{listing.pricePerTon.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <FiTruck /> {listing.transportOptions?.join(' • ') || 'Tanker'}
                <span className="ml-auto px-2 py-0.5 rounded bg-white/5 text-gray-400">{listing.captureMethod.replace(/_/g, ' ')}</span>
              </div>

              {/* Order */}
              <div className="flex gap-3 items-center">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500">Qty (tons):</label>
                  <input type="number" min={1} max={listing.quantity}
                    value={orderQty[listing.id] || 10}
                    onChange={(e) => setOrderQty({ ...orderQty, [listing.id]: Number(e.target.value) })}
                    className="w-20 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-emerald-500/50 focus:outline-none" />
                </div>
                <button onClick={() => placeOrder(listing)}
                  className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/25">
                  Place Order — ₹{((orderQty[listing.id] || 10) * listing.pricePerTon).toLocaleString()}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20">
          <FiDroplet className="text-5xl text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No CO₂ listings match your search.</p>
        </div>
      )}
    </div>
  );
}
