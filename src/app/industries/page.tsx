'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiTruck, FiShield, FiBarChart2 } from 'react-icons/fi';
import { GiSolidLeaf, GiFactory, GiGrain } from 'react-icons/gi';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function IndustriesPage() {
  return (
    <div className="bg-[#0a0f0d] min-h-screen">
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-wider">For Industries</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              Sustainable <span className="gradient-text">Biomass Supply Chain</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              Source verified agricultural biomass directly from farmers. Transparent pricing, reliable supply, and complete logistics support.
            </p>
            <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-2xl shadow-emerald-500/25">
              Start Sourcing <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Verified Suppliers', value: '850+', icon: GiFactory },
              { label: 'Active Listings', value: '2,400+', icon: GiGrain },
              { label: 'On-Time Delivery', value: '97%', icon: FiTruck },
              { label: 'Biomass Types', value: '15+', icon: GiSolidLeaf },
            ].map((s, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="glass-card p-6 text-center glass-card-hover">
                <s.icon className="text-emerald-400 text-3xl mx-auto mb-3" />
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-gray-400 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">How it works for <span className="gradient-text">industries</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Browse & Filter', desc: 'Search by crop type, location, quantity, and quality grade. Real-time availability and pricing.', icon: FiBarChart2 },
              { title: 'Place Orders', desc: 'Order directly from farmers with transparent pricing. No middlemen, no hidden fees.', icon: GiGrain },
              { title: 'Track Logistics', desc: 'Full supply chain visibility from farm to factory. Real-time tracking and delivery updates.', icon: FiTruck },
            ].map((step, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="glass-card p-6 glass-card-hover">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4">
                  <step.icon className="text-teal-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Quality <span className="gradient-text">Guaranteed</span></h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Every biomass listing on CarbonTech is quality-graded and verified. We ensure consistent supply, competitive pricing, and full traceability.
                </p>
                <ul className="space-y-3">
                  {['Multi-tier quality grading system', 'Lab-tested moisture & calorific values', 'Verified farmer profiles', 'Dedicated supply chain manager'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                      <FiCheck className="text-emerald-400 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { type: 'Rice Straw', price: '₹2,200-3,500/ton' },
                  { type: 'Wheat Residue', price: '₹1,800-2,800/ton' },
                  { type: 'Corn Stalks', price: '₹1,500-2,500/ton' },
                  { type: 'Sugarcane Bagasse', price: '₹1,200-2,000/ton' },
                ].map((b, i) => (
                  <div key={i} className="glass-card p-4 glass-card-hover">
                    <p className="text-white font-medium text-sm mb-1">{b.type}</p>
                    <p className="text-emerald-400 text-sm font-semibold">{b.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Secure reliable <span className="gradient-text">biomass supply</span></h2>
          <p className="text-gray-400 mb-8">Join 150+ industries already sourcing sustainably through CarbonTech.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-2xl shadow-emerald-500/25">
            Register as Industry <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}