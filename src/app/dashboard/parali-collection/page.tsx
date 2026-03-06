'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { FiTruck, FiMapPin, FiPackage, FiClock, FiPlus, FiCheck } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

const MapboxMap = dynamic(() => import('@/components/MapboxMap'), { ssr: false });

interface PickupRequest {
  id: string;
  farmerId: string;
  farmerName: string;
  farmId: string;
  residueType: string;
  quantity: number;
  lat: number;
  lng: number;
  address: string;
  preferredDate: string;
  status: string;
  logisticsProviderName?: string;
  createdAt: string;
}

export default function ParaliCollectionPage() {
  const { profile } = useAuthStore();
  const [requests, setRequests] = useState<PickupRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    residueType: 'rice_straw',
    quantity: '',
    address: '',
    lat: '30.9',
    lng: '75.8',
    preferredDate: '',
    notes: '',
  });

  useEffect(() => {
    fetchRequests();
  }, [profile]);

  async function fetchRequests() {
    try {
      const url = profile?.role === 'farmer'
        ? `/api/pickups?farmerId=${profile?.uid}`
        : '/api/pickups?pending=true';
      const res = await fetch(url);
      const data = await res.json();
      setRequests(data.requests || []);
    } catch { /* empty */ }
    setLoading(false);
  }

  async function createRequest() {
    if (!form.quantity || !form.address || !form.preferredDate) {
      toast.error('Fill all required fields');
      return;
    }
    try {
      const res = await fetch('/api/pickups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          farmerId: profile?.uid,
          farmerName: profile?.displayName,
          farmId: '',
          residueType: form.residueType,
          quantity: parseFloat(form.quantity),
          lat: parseFloat(form.lat),
          lng: parseFloat(form.lng),
          address: form.address,
          preferredDate: form.preferredDate,
          notes: form.notes,
        }),
      });
      if (res.ok) {
        toast.success('Pickup request created!');
        setShowForm(false);
        setForm({ residueType: 'rice_straw', quantity: '', address: '', lat: '30.9', lng: '75.8', preferredDate: '', notes: '' });
        fetchRequests();
      }
    } catch {
      toast.error('Failed to create request');
    }
  }

  async function acceptRequest(requestId: string) {
    try {
      const res = await fetch('/api/pickups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'accept',
          requestId,
          logisticsProviderId: profile?.uid,
          logisticsProviderName: profile?.displayName,
        }),
      });
      if (res.ok) {
        toast.success('Pickup accepted!');
        fetchRequests();
      }
    } catch {
      toast.error('Failed to accept');
    }
  }

  const mapPoints = requests.map((r) => ({
    lat: r.lat,
    lng: r.lng,
    label: r.farmerName,
    popup: `${r.residueType} - ${r.quantity} tons`,
    color: r.status === 'pending' ? '#f59e0b' : r.status === 'accepted' ? '#10b981' : '#3b82f6',
    type: 'collection' as const,
  }));

  const statusColors: Record<string, string> = {
    pending: 'text-yellow-400 bg-yellow-400/10',
    accepted: 'text-emerald-400 bg-emerald-400/10',
    in_transit: 'text-blue-400 bg-blue-400/10',
    collected: 'text-green-400 bg-green-400/10',
    cancelled: 'text-red-400 bg-red-400/10',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Smart Parali Collection</h1>
          <p className="text-gray-400 text-sm mt-1">Residue pickup network — no more burning</p>
        </div>
        {profile?.role === 'farmer' && (
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-xl border border-emerald-500/20 transition-all">
            <FiPlus /> Request Pickup
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: requests.length, icon: FiPackage, color: 'emerald' },
          { label: 'Pending', value: requests.filter(r => r.status === 'pending').length, icon: FiClock, color: 'yellow' },
          { label: 'Accepted', value: requests.filter(r => r.status === 'accepted').length, icon: FiCheck, color: 'blue' },
          { label: 'Collected', value: requests.filter(r => r.status === 'collected').length, icon: FiTruck, color: 'green' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                <stat.icon className={`text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">New Pickup Request</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Residue Type</label>
              <select value={form.residueType} onChange={(e) => setForm({ ...form, residueType: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white">
                <option value="rice_straw">Rice Straw</option>
                <option value="wheat_straw">Wheat Straw</option>
                <option value="sugarcane_bagasse">Sugarcane Bagasse</option>
                <option value="corn_stover">Corn Stover</option>
                <option value="cotton_stalks">Cotton Stalks</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Quantity (tons)</label>
              <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" placeholder="e.g., 50" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Pickup Address</label>
              <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" placeholder="Village, District, State" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Preferred Date</label>
              <input type="date" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Latitude</label>
              <input type="text" value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Longitude</label>
              <input type="text" value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-400 mb-1 block">Notes (optional)</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" rows={2} />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={createRequest} className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all">Submit Request</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 bg-white/5 hover:bg-white/10 text-gray-400 rounded-xl transition-all">Cancel</button>
          </div>
        </motion.div>
      )}

      {/* Map */}
      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold text-white mb-3">
          <FiMapPin className="inline mr-2 text-emerald-400" />
          Pickup Route Map
        </h3>
        <MapboxMap
          points={mapPoints}
          center={[29.5, 77.0]}
          zoom={6}
          height="400px"
        />
      </div>

      {/* Requests List */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Pickup Requests</h3>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No pickup requests yet</p>
        ) : (
          <div className="space-y-3">
            {requests.map((req, i) => (
              <motion.div key={req.id || i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-emerald-500/10 hover:border-emerald-500/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <FiPackage className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{req.farmerName}</p>
                    <p className="text-sm text-gray-400">{req.residueType.replace('_', ' ')} • {req.quantity} tons • {req.address}</p>
                    <p className="text-xs text-gray-500">Preferred: {req.preferredDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[req.status] || 'text-gray-400 bg-gray-400/10'}`}>
                    {req.status.replace('_', ' ')}
                  </span>
                  {profile?.role !== 'farmer' && req.status === 'pending' && (
                    <button onClick={() => acceptRequest(req.id)} className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-sm transition-all">
                      Accept
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
