'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiAward, FiDollarSign, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Scheme {
  name: string;
  ministry: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  maxSubsidy: number;
  category: string;
  matchScore: number;
}

export default function GovernmentSchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ farmSize: '', cropType: 'rice', state: 'Punjab', practices: ['no_burn', 'residue_management'] });
  const [searched, setSearched] = useState(false);

  const practiceOptions = [
    { value: 'no_burn', label: 'No Burning' },
    { value: 'residue_management', label: 'Residue Management' },
    { value: 'organic_farming', label: 'Organic Farming' },
    { value: 'solar_energy', label: 'Solar Energy' },
    { value: 'biochar_production', label: 'Biochar Production' },
    { value: 'crop_rotation', label: 'Crop Rotation' },
    { value: 'drip_irrigation', label: 'Drip Irrigation' },
  ];

  const states = ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Bihar', 'Karnataka', 'Tamil Nadu', 'Gujarat'];

  async function findSchemes() {
    if (!form.farmSize) { toast.error('Enter your farm size'); return; }
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch('/api/schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmSize: parseFloat(form.farmSize),
          cropType: form.cropType,
          state: form.state,
          practices: form.practices,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSchemes(data.schemes);
        toast.success(`Found ${data.schemes.length} matching schemes`);
      }
    } catch {
      toast.error('Failed to find schemes');
    }
    setLoading(false);
  }

  const categoryColors: Record<string, string> = {
    agriculture: 'text-green-400 bg-green-400/10',
    environment: 'text-emerald-400 bg-emerald-400/10',
    energy: 'text-yellow-400 bg-yellow-400/10',
    machinery: 'text-blue-400 bg-blue-400/10',
    carbon: 'text-purple-400 bg-purple-400/10',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Government Scheme Finder</h1>
        <p className="text-gray-400 text-sm mt-1">AI-powered subsidy recommendation engine</p>
      </div>

      {/* Search Form */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><FiSearch className="text-emerald-400" /> Find Matching Schemes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Farm Size (acres)</label>
            <input type="number" value={form.farmSize} onChange={(e) => setForm({ ...form, farmSize: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white" placeholder="e.g., 10" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Primary Crop</label>
            <select value={form.cropType} onChange={(e) => setForm({ ...form, cropType: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white">
              <option value="rice">Rice</option>
              <option value="wheat">Wheat</option>
              <option value="sugarcane">Sugarcane</option>
              <option value="cotton">Cotton</option>
              <option value="maize">Maize</option>
              <option value="soybean">Soybean</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">State</label>
            <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-3 py-2 text-white">
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm text-gray-400 mb-2 block">Farming Practices</label>
          <div className="flex flex-wrap gap-2">
            {practiceOptions.map(p => (
              <button key={p.value} onClick={() => {
                setForm(prev => ({
                  ...prev,
                  practices: prev.practices.includes(p.value) ? prev.practices.filter(x => x !== p.value) : [...prev.practices, p.value],
                }));
              }} className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${form.practices.includes(p.value) ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <button onClick={findSchemes} disabled={loading} className="mt-4 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl transition-all flex items-center gap-2">
          {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiSearch />}
          {loading ? 'Searching with AI...' : 'Find Schemes'}
        </button>
      </div>

      {/* Results */}
      {searched && !loading && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Recommended Schemes ({schemes.length})</h3>
          {schemes.map((scheme, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass-card glass-card-hover p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-white">{scheme.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[scheme.category] || 'text-gray-400 bg-gray-400/10'}`}>
                      {scheme.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{scheme.ministry}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-400">Match</span>
                    <span className={`text-lg font-bold ${scheme.matchScore >= 80 ? 'text-emerald-400' : scheme.matchScore >= 60 ? 'text-yellow-400' : 'text-orange-400'}`}>
                      {scheme.matchScore}%
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">{scheme.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Max Subsidy</p>
                  <p className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <FiDollarSign /> ₹{scheme.maxSubsidy?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Eligibility</p>
                  <div className="space-y-1">
                    {scheme.eligibility?.slice(0, 2).map((e, j) => (
                      <p key={j} className="flex items-center gap-1 text-sm text-gray-300">
                        <FiCheckCircle className="text-emerald-400 text-xs flex-shrink-0" /> {e}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Benefits</p>
                  <div className="space-y-1">
                    {scheme.benefits?.slice(0, 2).map((b, j) => (
                      <p key={j} className="flex items-center gap-1 text-sm text-gray-300">
                        <FiAward className="text-yellow-400 text-xs flex-shrink-0" /> {b}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!searched && (
        <div className="glass-card p-12 text-center">
          <FiAward className="text-5xl text-emerald-400/30 mx-auto mb-4" />
          <p className="text-gray-400">Enter your farm details above to discover matching government schemes</p>
          <p className="text-gray-500 text-sm mt-1">Powered by Gemini AI</p>
        </div>
      )}
    </div>
  );
}
