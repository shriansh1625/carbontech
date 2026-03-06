'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiShield, FiZap, FiGlobe } from 'react-icons/fi';
import { GiSolidLeaf, GiWheat } from 'react-icons/gi';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const steps = [
  { step: '01', title: 'Farm Registration', desc: 'Farmers register their farms with location, crop type, and land area. Our platform verifies the details and onboards them within 24 hours.', icon: GiWheat, color: 'emerald' },
  { step: '02', title: 'Sustainable Practice Tracking', desc: 'Log sustainable farming practices like no-burn residue management, cover cropping, and organic farming. Each practice generates carbon offset data.', icon: FiCheck, color: 'teal' },
  { step: '03', title: 'AI & Satellite Monitoring', desc: 'Our AI system combined with satellite imagery monitors farm practices, verifies claims, and calculates accurate carbon sequestration metrics.', icon: FiZap, color: 'blue' },
  { step: '04', title: 'Carbon Credits Generated', desc: 'Verified practices are converted into tradeable carbon credits following international standards (Verra, Gold Standard).', icon: GiSolidLeaf, color: 'emerald' },
  { step: '05', title: 'Companies Purchase Offsets', desc: 'Companies buy carbon credits to offset their emissions. Farmers receive direct payments, creating a sustainable income stream.', icon: FiGlobe, color: 'teal' },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-[#0a0f0d] min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">How It Works</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              From Farm to <span className="gradient-text">Carbon Credit</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A transparent, technology-driven process that turns sustainable farming into verified carbon credits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-teal-500/20 to-transparent hidden md:block" />
            <div className="space-y-12">
              {steps.map((s, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="relative flex gap-8">
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <s.icon className="text-emerald-400 text-2xl" />
                    </div>
                  </div>
                  <div className="glass-card p-6 md:p-8 flex-1 glass-card-hover">
                    <div className="text-emerald-500/30 text-3xl font-black mb-2">{s.step}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Each Role */}
      <section className="py-20 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Built for <span className="gradient-text">everyone</span> in the value chain</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Farmers', items: ['Register farms in minutes', 'Track sustainable practices', 'Earn carbon credits & sell biomass', 'Get AI-powered advice'], cta: '/farmers', ctaText: 'For Farmers' },
              { title: 'Industries', items: ['Browse biomass suppliers', 'Place & track orders', 'Transparent supply chain', 'Logistics management'], cta: '/industries', ctaText: 'For Industries' },
              { title: 'Companies', items: ['Purchase verified carbon credits', 'Track offset portfolio', 'Download certificates', 'Meet ESG goals'], cta: '/carbon-credits', ctaText: 'For Companies' },
            ].map((role, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="glass-card p-6 glass-card-hover">
                <h3 className="text-xl font-bold text-white mb-4">{role.title}</h3>
                <ul className="space-y-3 mb-6">
                  {role.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-400 text-sm">
                      <FiCheck className="text-emerald-400 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
                <Link href={role.cta} className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium hover:text-emerald-300">
                  {role.ctaText} <FiArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <FiShield className="text-emerald-400 text-4xl mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">Verified & Transparent</h2>
                <p className="text-gray-400 leading-relaxed">
                  Every carbon credit on our platform is verified through multi-layer validation: satellite data, AI analysis, field audits, and third-party certification bodies. Full transparency on the blockchain ledger.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Verification Accuracy', value: '99.2%' },
                  { label: 'Avg. Verification Time', value: '48 hours' },
                  { label: 'Certified Partners', value: '12+' },
                  { label: 'Standards Supported', value: 'Verra, GS' },
                ].map((s, i) => (
                  <div key={i} className="glass-card p-4 text-center">
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-emerald-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-gray-400 mb-8">Join the platform that&apos;s transforming agriculture into a climate-positive industry.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all shadow-2xl shadow-emerald-500/25">
            Create Your Account <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}