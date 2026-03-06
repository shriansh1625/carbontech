'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FiMap, FiLayers, FiUsers, FiActivity, FiDroplet, FiZap } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';

const FarmMap = dynamic(() => import('@/components/FarmMap'), { ssr: false, loading: () => <div className="h-full bg-[#0d1512] rounded-xl animate-pulse" /> });

interface MapEntity {
  lat: number;
  lng: number;
  popup: string;
  type: 'farm' | 'processor' | 'storage' | 'biomass';
}

export default function InteractiveMapPage() {
  const [entities, setEntities] = useState<MapEntity[]>([]);
  const [layer, setLayer] = useState<'all' | 'farm' | 'processor' | 'storage' | 'biomass'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demoEntities: MapEntity[] = [
      // Farms
      { lat: 30.91, lng: 75.85, popup: '<b>Kumar Organic Farm</b><br>Rice · 15 acres<br>22 tons residue', type: 'farm' },
      { lat: 29.69, lng: 76.98, popup: '<b>Singh Family Fields</b><br>Wheat · 25 acres<br>40 tons residue', type: 'farm' },
      { lat: 23.02, lng: 72.57, popup: '<b>Patel Green Acres</b><br>Cotton · 10 acres<br>12 tons residue', type: 'farm' },
      { lat: 23.26, lng: 77.41, popup: '<b>Yadav Bio Farm</b><br>Soybean · 30 acres<br>55 tons residue', type: 'farm' },
      { lat: 26.85, lng: 80.95, popup: '<b>Devi Sustainable Farm</b><br>Sugarcane · 8 acres<br>18 tons residue', type: 'farm' },
      { lat: 21.15, lng: 79.09, popup: '<b>Reddy Agro Estate</b><br>Rice · 45 acres<br>85 tons residue', type: 'farm' },
      { lat: 31.63, lng: 74.87, popup: '<b>Kaur Heritage Farm</b><br>Wheat · 20 acres<br>32 tons residue', type: 'farm' },
      { lat: 26.92, lng: 75.78, popup: '<b>Das Eco Fields</b><br>Mustard · 12 acres<br>14 tons residue', type: 'farm' },
      // Processors
      { lat: 30.85, lng: 75.9, popup: '<b>🏭 GreenGas Punjab</b><br>Biomass Gasification<br>CO₂: 250 tons available', type: 'processor' },
      { lat: 29.75, lng: 76.9, popup: '<b>🏭 BioCarbon Haryana</b><br>Pyrolysis Plant<br>CO₂: 180 tons available', type: 'processor' },
      { lat: 26.9, lng: 80.9, popup: '<b>🏭 AgriCapture UP</b><br>Biomass Gasification<br>CO₂: 120 tons available', type: 'processor' },
      { lat: 21.2, lng: 79.0, popup: '<b>🏭 EcoGas Maharashtra</b><br>Pyrolysis Plant<br>CO₂: 150 tons available', type: 'processor' },
      // Storage
      { lat: 28.6, lng: 77.2, popup: '<b>💎 Delhi CO₂ Storage Hub</b><br>Capacity: 500 tons<br>Utilization: 72%', type: 'storage' },
      { lat: 19.07, lng: 72.88, popup: '<b>💎 Mumbai Storage Facility</b><br>Capacity: 800 tons<br>Utilization: 58%', type: 'storage' },
      // Biomass supply clusters
      { lat: 30.5, lng: 76.5, popup: '<b>🌾 Punjab Supply Cluster</b><br>Rice & Wheat residue<br>12,000 tons/season', type: 'biomass' },
      { lat: 29.3, lng: 77.2, popup: '<b>🌾 Haryana Supply Cluster</b><br>Wheat & Cotton<br>8,500 tons/season', type: 'biomass' },
      { lat: 22.5, lng: 78.0, popup: '<b>🌾 Central India Cluster</b><br>Soybean & Cotton<br>6,200 tons/season', type: 'biomass' },
    ];
    setEntities(demoEntities);
    setLoading(false);
  }, []);

  const filtered = layer === 'all' ? entities : entities.filter((e) => e.type === layer);
  const markers = filtered.map((e) => ({ lat: e.lat, lng: e.lng, popup: e.popup }));

  const layerOptions = [
    { id: 'all', label: 'All', icon: FiLayers, count: entities.length },
    { id: 'farm', label: 'Farms', icon: GiSolidLeaf, count: entities.filter((e) => e.type === 'farm').length },
    { id: 'processor', label: 'Processors', icon: FiZap, count: entities.filter((e) => e.type === 'processor').length },
    { id: 'storage', label: 'CO₂ Storage', icon: FiDroplet, count: entities.filter((e) => e.type === 'storage').length },
    { id: 'biomass', label: 'Biomass Hubs', icon: FiActivity, count: entities.filter((e) => e.type === 'biomass').length },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <FiMap className="text-emerald-400" /> Interactive Platform Map
        </h1>
        <p className="text-gray-400 mt-1">View farms, processing plants, storage facilities, and biomass supply clusters</p>
      </div>

      {/* Layer Controls */}
      <div className="flex gap-2 flex-wrap">
        {layerOptions.map((opt) => (
          <button key={opt.id} onClick={() => setLayer(opt.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${layer === opt.id ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}>
            <opt.icon className="text-base" /> {opt.label}
            <span className="text-xs opacity-60">({opt.count})</span>
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="glass-card p-4 overflow-hidden">
        <div className="h-[600px] rounded-xl overflow-hidden">
          {!loading && <FarmMap center={[25.5, 78.5]} zoom={5} markers={markers} height="600px" />}
          {loading && <div className="h-full bg-[#0d1512] rounded-xl flex items-center justify-center"><div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" /></div>}
        </div>
      </div>

      {/* Legend */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Map Legend</h3>
        <div className="flex flex-wrap gap-6">
          {[
            { color: 'emerald', label: 'Active Farms', desc: 'Registered farmer locations' },
            { color: 'teal', label: 'Processing Plants', desc: 'Gasification & pyrolysis facilities' },
            { color: 'blue', label: 'CO₂ Storage', desc: 'Carbon storage and distribution hubs' },
            { color: 'amber', label: 'Biomass Supply', desc: 'Agricultural residue collection zones' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full bg-${item.color}-400`} />
              <div>
                <p className="text-sm text-white font-medium">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
