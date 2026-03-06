'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FiRadio, FiAlertTriangle, FiCheckCircle, FiActivity, FiLayers, FiEye } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';
import type { Farm, SatelliteFarmData } from '@/lib/types';

const FarmMap = dynamic(() => import('@/components/FarmMap'), { ssr: false, loading: () => <div className="h-full bg-[#0d1512] rounded-xl animate-pulse" /> });

interface FarmSatellite { farm: Farm; satellite: SatelliteFarmData; }

export default function SatelliteMonitoringPage() {
  const [farms, setFarms] = useState<FarmSatellite[]>([]);
  const [summary, setSummary] = useState({ totalArea: 0, avgNDVI: 0, burningDetected: 0, onTrack: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedFarm, setSelectedFarm] = useState<FarmSatellite | null>(null);
  const [layer, setLayer] = useState<'ndvi' | 'carbon' | 'moisture'>('ndvi');

  useEffect(() => {
    fetch('/api/satellite')
      .then((r) => r.json())
      .then((data) => {
        setFarms(data.farms);
        setSummary(data.summary);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    if (status === 'on_track') return 'text-emerald-400';
    if (status === 'needs_attention') return 'text-amber-400';
    return 'text-red-400';
  };

  const getStatusBg = (status: string) => {
    if (status === 'on_track') return 'bg-emerald-500/15 border-emerald-500/20';
    if (status === 'needs_attention') return 'bg-amber-500/15 border-amber-500/20';
    return 'bg-red-500/15 border-red-500/20';
  };

  const getNDVIColor = (ndvi: number) => {
    if (ndvi >= 0.7) return 'text-emerald-400';
    if (ndvi >= 0.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const mapMarkers = farms.map((f) => ({
    lat: f.farm.lat,
    lng: f.farm.lng,
    popup: `<div class="text-xs">
      <strong>${f.farm.name}</strong><br>
      ${f.farm.cropType} · ${f.farm.area} acres<br>
      NDVI: ${f.satellite.ndvi.toFixed(2)}<br>
      Status: ${f.satellite.carbonReductionStatus.replace('_', ' ')}
    </div>`,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FiRadio className="text-emerald-400" /> Satellite Farm Monitoring
          </h1>
          <p className="text-gray-400 mt-1">Real-time satellite imagery analysis and carbon reduction tracking</p>
        </div>
        <div className="flex gap-2">
          {(['ndvi', 'carbon', 'moisture'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLayer(l)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${layer === l ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}
            >
              <FiLayers className="inline mr-1.5" />
              {l === 'ndvi' ? 'Vegetation' : l === 'carbon' ? 'Carbon' : 'Moisture'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Monitored Area', value: `${summary.totalArea} acres`, icon: GiSolidLeaf, color: 'emerald' },
          { label: 'Avg Vegetation Index', value: summary.avgNDVI.toFixed(2), icon: FiActivity, color: 'teal' },
          { label: 'Burning Detected', value: summary.burningDetected.toString(), icon: FiAlertTriangle, color: summary.burningDetected > 0 ? 'red' : 'emerald' },
          { label: 'On Track', value: `${summary.onTrack}/${farms.length}`, icon: FiCheckCircle, color: 'emerald' },
        ].map((stat) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/15 flex items-center justify-center`}>
                <stat.icon className={`text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map + Farm List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 glass-card p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Farm Locations</h2>
            <span className="text-xs text-gray-500">{farms.length} farms monitored</span>
          </div>
          <div className="h-[500px] rounded-xl overflow-hidden">
            {!loading && (
              <FarmMap
                center={[26.5, 78.5]}
                zoom={5}
                markers={mapMarkers}
                height="500px"
              />
            )}
            {loading && <div className="h-full bg-[#0d1512] rounded-xl flex items-center justify-center"><div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" /></div>}
          </div>
        </div>

        {/* Farm List */}
        <div className="glass-card p-4 overflow-hidden">
          <h2 className="text-lg font-semibold text-white mb-3">Farm Status</h2>
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {farms.map((f) => (
              <motion.button
                key={f.farm.id}
                onClick={() => setSelectedFarm(selectedFarm?.farm.id === f.farm.id ? null : f)}
                className={`w-full text-left p-3 rounded-xl transition-all border ${selectedFarm?.farm.id === f.farm.id ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-white truncate">{f.farm.name}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getStatusBg(f.satellite.carbonReductionStatus)} ${getStatusColor(f.satellite.carbonReductionStatus)}`}>
                    {f.satellite.carbonReductionStatus.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{f.farm.cropType}</span>
                  <span>·</span>
                  <span>{f.farm.area} acres</span>
                  <span>·</span>
                  <span className={getNDVIColor(f.satellite.ndvi)}>NDVI {f.satellite.ndvi.toFixed(2)}</span>
                </div>
                {f.satellite.residueBurning && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
                    <FiAlertTriangle /> Burning activity detected
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Farm Detail */}
      {selectedFarm && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FiEye className="text-emerald-400" /> {selectedFarm.farm.name} — Detailed Analysis
            </h2>
            <button onClick={() => setSelectedFarm(null)} className="text-gray-500 hover:text-white text-sm">Close</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: 'Farmer', value: selectedFarm.farm.farmerName },
              { label: 'Location', value: selectedFarm.farm.location },
              { label: 'Crop Type', value: selectedFarm.farm.cropType },
              { label: 'Farm Size', value: `${selectedFarm.farm.area} acres` },
              { label: 'Residue Available', value: `${selectedFarm.farm.residueAvailable} tons` },
              { label: 'NDVI Index', value: selectedFarm.satellite.ndvi.toFixed(2) },
              { label: 'Soil Moisture', value: `${selectedFarm.satellite.soilMoisture}%` },
              { label: 'Soil Carbon', value: `${selectedFarm.satellite.soilCarbonEstimate.toFixed(1)} tCO₂e/ha` },
              { label: 'Biomass Collected', value: `${selectedFarm.satellite.biomassCollected} tons` },
              { label: 'Burning Detected', value: selectedFarm.satellite.residueBurning ? 'YES' : 'No' },
              { label: 'Carbon Status', value: selectedFarm.satellite.carbonReductionStatus.replace(/_/g, ' ') },
              { label: 'Last Updated', value: new Date(selectedFarm.satellite.lastUpdated).toLocaleDateString() },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-xl bg-white/5">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className={`text-sm font-semibold ${item.label === 'Burning Detected' && item.value === 'YES' ? 'text-red-400' : 'text-white'}`}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Verification Progress */}
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-semibold text-gray-300">Verification Checks</h3>
            {[
              { label: 'Residue burning reduction verified', status: !selectedFarm.satellite.residueBurning },
              { label: 'Soil carbon increase measured', status: selectedFarm.satellite.soilCarbonEstimate > 2 },
              { label: 'Biomass collection confirmed', status: selectedFarm.satellite.biomassCollected > 10 },
            ].map((check) => (
              <div key={check.label} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${check.status ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  <FiCheckCircle className="text-xs" />
                </div>
                <span className={`text-sm ${check.status ? 'text-gray-300' : 'text-gray-500'}`}>{check.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
