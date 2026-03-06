'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { FiTool, FiPlus, FiStar, FiMapPin, FiCalendar, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Equipment {
  id: string;
  ownerId: string;
  ownerName: string;
  name: string;
  type: string;
  description: string;
  pricePerDay: number;
  pricePerAcre?: number;
  location: string;
  available: boolean;
  rating?: number;
  totalRentals?: number;
}

const equipmentTypes = [
  { value: 'happy_seeder', label: 'Happy Seeder', icon: '🌾' },
  { value: 'straw_baler', label: 'Straw Baler', icon: '📦' },
  { value: 'mulcher', label: 'Mulcher', icon: '🔄' },
  { value: 'shredder', label: 'Shredder', icon: '✂️' },
  { value: 'rotavator', label: 'Rotavator', icon: '🚜' },
  { value: 'other', label: 'Other', icon: '🔧' },
];

export default function MachineryMarketplacePage() {
  const { profile } = useAuthStore();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showRentModal, setShowRentModal] = useState<Equipment | null>(null);
  const [form, setForm] = useState({
    name: '', type: 'happy_seeder', description: '', pricePerDay: '', pricePerAcre: '', location: '', lat: '30.9', lng: '75.8',
  });
  const [rentForm, setRentForm] = useState({ startDate: '', endDate: '', acres: '' });

  useEffect(() => { fetchEquipment(); }, []);

  async function fetchEquipment() {
    try {
      const res = await fetch('/api/equipment');
      const data = await res.json();
      const items = data.equipment || [];
      if (items.length === 0) {
        // Seed demo data
        setEquipment([
          { id: 'd1', ownerId: 'demo-1', ownerName: 'Gurmeet Singh', name: 'Happy Seeder Pro 2024', type: 'happy_seeder', description: 'Latest model Happy Seeder for direct sowing in standing stubble. Perfect for wheat sowing after paddy harvest.', pricePerDay: 3500, pricePerAcre: 800, location: 'Ludhiana, Punjab', available: true, rating: 4.8, totalRentals: 45 },
          { id: 'd2', ownerId: 'demo-2', ownerName: 'Rajveer Farms', name: 'Square Baler New Holland', type: 'straw_baler', description: 'High capacity straw baler for efficient residue collection. Makes 30-40 bales per hour.', pricePerDay: 5000, pricePerAcre: 1200, location: 'Karnal, Haryana', available: true, rating: 4.5, totalRentals: 32 },
          { id: 'd3', ownerId: 'demo-3', ownerName: 'AgriTech Rentals', name: 'Straw Mulcher SM-200', type: 'mulcher', description: 'Heavy duty residue mulcher for in-situ management. Chops and spreads residue evenly.', pricePerDay: 2800, pricePerAcre: 600, location: 'Patiala, Punjab', available: true, rating: 4.6, totalRentals: 28 },
          { id: 'd4', ownerId: 'demo-4', ownerName: 'KisanHub', name: 'Super Seeder Combo', type: 'happy_seeder', description: 'Combined tillage and seeding in one pass. Works in heavy residue conditions.', pricePerDay: 4000, pricePerAcre: 900, location: 'Ambala, Haryana', available: true, rating: 4.7, totalRentals: 38 },
          { id: 'd5', ownerId: 'demo-5', ownerName: 'Farm Solutions', name: 'Rotavator Premium', type: 'rotavator', description: 'Multi-speed rotavator for residue incorporation. Adjustable depth control.', pricePerDay: 2500, pricePerAcre: 500, location: 'Lucknow, UP', available: true, rating: 4.3, totalRentals: 22 },
          { id: 'd6', ownerId: 'demo-6', ownerName: 'Crop Care Machines', name: 'Straw Shredder Industrial', type: 'shredder', description: 'Industrial grade straw shredder for biomass preparation. High throughput capacity.', pricePerDay: 6000, pricePerAcre: 1500, location: 'Chandigarh', available: true, rating: 4.9, totalRentals: 15 },
        ]);
      } else {
        setEquipment(items);
      }
    } catch { /* empty */ }
    setLoading(false);
  }

  async function listEquipment() {
    if (!form.name || !form.pricePerDay) { toast.error('Fill required fields'); return; }
    try {
      const res = await fetch('/api/equipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'list',
          ownerId: profile?.uid,
          ownerName: profile?.displayName,
          ...form,
          pricePerDay: parseFloat(form.pricePerDay),
          pricePerAcre: form.pricePerAcre ? parseFloat(form.pricePerAcre) : undefined,
          lat: parseFloat(form.lat),
          lng: parseFloat(form.lng),
        }),
      });
      if (res.ok) {
        toast.success('Equipment listed!');
        setShowForm(false);
        fetchEquipment();
      }
    } catch { toast.error('Failed to list equipment'); }
  }

  async function rentEquipment() {
    if (!showRentModal || !rentForm.startDate || !rentForm.endDate) { toast.error('Select dates'); return; }
    const days = Math.ceil((new Date(rentForm.endDate).getTime() - new Date(rentForm.startDate).getTime()) / 86400000);
    if (days <= 0) { toast.error('End date must be after start date'); return; }
    try {
      const res = await fetch('/api/equipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'rent',
          equipmentId: showRentModal.id,
          equipmentName: showRentModal.name,
          renterId: profile?.uid,
          renterName: profile?.displayName,
          ownerId: showRentModal.ownerId,
          startDate: rentForm.startDate,
          endDate: rentForm.endDate,
          totalCost: days * showRentModal.pricePerDay,
          acres: rentForm.acres ? parseFloat(rentForm.acres) : undefined,
        }),
      });
      if (res.ok) {
        toast.success('Rental request sent!');
        setShowRentModal(null);
        setRentForm({ startDate: '', endDate: '', acres: '' });
      }
    } catch { toast.error('Failed to rent'); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Farm Machinery Marketplace</h1>
          <p className="text-gray-400 text-sm mt-1">Rent residue management equipment</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-xl border border-emerald-500/20 transition-all">
          <FiPlus /> List Equipment
        </button>
      </div>

      {/* List Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">List Your Equipment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Equipment Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" placeholder="e.g., Happy Seeder Pro" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white">
                {equipmentTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Price per Day (₹)</label>
              <input type="number" value={form.pricePerDay} onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Price per Acre (₹, optional)</label>
              <input type="number" value={form.pricePerAcre} onChange={(e) => setForm({ ...form, pricePerAcre: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Location</label>
              <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" placeholder="City, State" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-400 mb-1 block">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" rows={2} />
            </div>
          </div>
          <button onClick={listEquipment} className="mt-4 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all">List Equipment</button>
        </motion.div>
      )}

      {/* Equipment Grid */}
      {loading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map((eq, i) => {
            const typeInfo = equipmentTypes.find(t => t.value === eq.type);
            return (
              <motion.div key={eq.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass-card glass-card-hover p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{typeInfo?.icon || '🔧'}</span>
                  {eq.available && <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs rounded-full">Available</span>}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{eq.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{eq.description?.slice(0, 100)}...</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FiMapPin className="text-emerald-400" /> {eq.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FiDollarSign className="text-emerald-400" /> ₹{eq.pricePerDay}/day {eq.pricePerAcre && `• ₹${eq.pricePerAcre}/acre`}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FiStar className="text-yellow-400" /> {eq.rating || 0} ({eq.totalRentals || 0} rentals)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FiTool className="text-blue-400" /> {typeInfo?.label || eq.type}
                  </div>
                </div>
                <button onClick={() => setShowRentModal(eq)}
                  className="w-full py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-xl transition-all text-sm font-medium">
                  Rent Now
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Rent Modal */}
      {showRentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowRentModal(null)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-1">Rent {showRentModal.name}</h3>
            <p className="text-sm text-gray-400 mb-4">₹{showRentModal.pricePerDay}/day • {showRentModal.ownerName}</p>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Start Date</label>
                <input type="date" value={rentForm.startDate} onChange={(e) => setRentForm({ ...rentForm, startDate: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">End Date</label>
                <input type="date" value={rentForm.endDate} onChange={(e) => setRentForm({ ...rentForm, endDate: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Acres (optional)</label>
                <input type="number" value={rentForm.acres} onChange={(e) => setRentForm({ ...rentForm, acres: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" />
              </div>
              {rentForm.startDate && rentForm.endDate && (() => {
                const days = Math.ceil((new Date(rentForm.endDate).getTime() - new Date(rentForm.startDate).getTime()) / 86400000);
                return days > 0 ? <p className="text-emerald-400 font-semibold">Total: ₹{(days * showRentModal.pricePerDay).toLocaleString()} ({days} days)</p> : null;
              })()}
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={rentEquipment} className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all">Confirm Rental</button>
              <button onClick={() => setShowRentModal(null)} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 rounded-xl transition-all">Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
