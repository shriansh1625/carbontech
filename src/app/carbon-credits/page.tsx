'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiTrendingUp, FiGlobe, FiAward, FiDownload } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const projects = [
  { name: 'Punjab No-Burn Initiative', type: 'Stubble Management', credits: 500, price: 800, verified: true },
  { name: 'Haryana Biochar Project', type: 'Biochar Production', credits: 300, price: 1200, verified: true },
  { name: 'MP Soil Carbon Program', type: 'Soil Carbon', credits: 800, price: 600, verified: true },
  { name: 'UP Methane Reduction', type: 'Methane Reduction', credits: 450, price: 950, verified: true },
  { name: 'Rajasthan Agroforestry', type: 'Agroforestry', credits: 1200, price: 700, verified: false },
  { name: 'Maharashtra Cover Crop', type: 'Cover Cropping', credits: 350, price: 550, verified: true },
];

export default function CarbonCreditsPage() {
  return (
    <div className="bg-[#0a0f0d] min-h-screen">
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Carbon Credits</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              Offset your emissions with <span className="gradient-text">verified agricultural credits</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              Purchase high-quality carbon credits generated from real sustainable farming practices. Every credit is third-party verified and fully traceable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-2xl shadow-emerald-500/25">
                Buy Carbon Credits <FiArrowRight />
              </Link>
              <Link href="/marketplace" className="px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all text-center">
                Browse Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Credits Available', value: '45,600+', icon: GiSolidLeaf },
              { label: 'Verified Projects', value: '89', icon: FiShield },
              { label: 'Active Buyers', value: '145', icon: FiGlobe },
              { label: 'Avg. Price/Credit', value: '₹850', icon: FiTrendingUp },
            ].map((s, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="glass-card p-5 text-center glass-card-hover">
                <s.icon className="text-emerald-400 text-2xl mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured <span className="gradient-text">Projects</span></h2>
            <p className="text-gray-400 mt-3">Browse verified agricultural carbon credit projects</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="glass-card p-6 glass-card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                    <p className="text-sm text-gray-400">{p.type}</p>
                  </div>
                  {p.verified && (
                    <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs flex items-center gap-1">
                      <FiShield className="text-[10px]" /> Verified
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-end mt-6">
                  <div>
                    <p className="text-xs text-gray-500">Available Credits</p>
                    <p className="text-xl font-bold text-white">{p.credits} <span className="text-sm text-gray-400">tCO₂e</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-xl font-bold text-emerald-400">₹{p.price}</p>
                  </div>
                </div>
                <button className="w-full mt-4 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm font-medium hover:bg-emerald-500/20 transition-all">
                  Purchase Credits
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy */}
      <section className="py-20 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Verified & Audited', desc: 'Every credit follows Verra/Gold Standard protocols with third-party audits.', icon: FiShield },
              { title: 'Carbon Certificates', desc: 'Download official carbon neutral certificates for your ESG reporting.', icon: FiDownload },
              { title: 'Impact Portfolio', desc: 'Track your total offset, supported projects, and sustainability metrics.', icon: FiAward },
            ].map((b, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="glass-card p-6 glass-card-hover">
                <b.icon className="text-emerald-400 text-2xl mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to offset your <span className="gradient-text">carbon footprint</span>?</h2>
          <p className="text-gray-400 mb-8">Join 145+ companies already offsetting through Bharat Credits agricultural credits.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-2xl shadow-emerald-500/25">
            Start Buying Credits <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}