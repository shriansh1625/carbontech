'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiTrendingUp, FiShield, FiZap, FiDollarSign } from 'react-icons/fi';
import { GiSolidLeaf, GiWheat, GiPlantSeed, GiGrain } from 'react-icons/gi';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function FarmersPage() {
  return (
    <div className="bg-[#0a0f0d] min-h-screen">
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">For Farmers</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Turn your farm into a <span className="gradient-text">revenue machine</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Stop burning crop residue. Start earning from it. Our platform helps you generate carbon credits, sell biomass, and access AI-powered farming advice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all shadow-2xl shadow-emerald-500/25 flex items-center justify-center gap-2">
                  Register Your Farm <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/how-it-works" className="px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all text-center">
                  Learn More
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative">
              <div className="glass-card p-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Avg. Annual Income', value: '₹50,000+', icon: FiDollarSign },
                    { label: 'Carbon Credits/yr', value: '15-30', icon: GiSolidLeaf },
                    { label: 'Setup Time', value: '10 min', icon: FiZap },
                    { label: 'Active Farmers', value: '3,200+', icon: GiWheat },
                  ].map((s, i) => (
                    <div key={i} className="glass-card p-4 glass-card-hover">
                      <s.icon className="text-emerald-400 text-xl mb-2" />
                      <p className="text-xl font-bold text-white">{s.value}</p>
                      <p className="text-xs text-gray-400">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Why farmers <span className="gradient-text">love CarbonTech</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Carbon Credit Income', desc: 'Earn ₹600-1,200 per carbon credit generated from sustainable practices. No upfront cost.', icon: FiTrendingUp },
              { title: 'Biomass Marketplace', desc: 'Sell rice straw, wheat residue, and other biomass directly to verified industrial buyers.', icon: GiGrain },
              { title: 'AI Farming Assistant', desc: 'Get personalized recommendations on crop management, soil health, and carbon optimization.', icon: FiZap },
              { title: 'Verified & Transparent', desc: 'All credits are third-party verified. Track your earnings, credits, and farm analytics in real-time.', icon: FiShield },
              { title: 'Multiple Revenue Streams', desc: 'Earn from carbon credits, biomass sales, and sustainable practice incentives simultaneously.', icon: FiDollarSign },
              { title: 'Easy Onboarding', desc: 'Register in 10 minutes. No technical knowledge required. Our team helps you every step.', icon: GiPlantSeed },
            ].map((b, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="glass-card p-6 glass-card-hover">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <b.icon className="text-emerald-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">Farmer <span className="gradient-text">Success Stories</span></h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Rajesh Kumar', location: 'Punjab', earned: '₹68,000', credits: 28, text: 'Stopped burning rice straw and earned more in one season than I expected in a year.' },
                { name: 'Sunita Devi', location: 'Haryana', earned: '₹42,000', credits: 18, text: 'The AI assistant helped me improve my soil carbon by 30% with cover cropping techniques.' },
                { name: 'Vikram Patel', location: 'MP', earned: '₹55,000', credits: 22, text: 'Selling biomass through the marketplace was so easy. I got better prices than local brokers.' },
              ].map((story, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="glass-card p-6">
                  <p className="text-gray-300 text-sm mb-4">&ldquo;{story.text}&rdquo;</p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">{story.name[0]}</div>
                    <div>
                      <p className="text-white font-medium text-sm">{story.name}</p>
                      <p className="text-gray-500 text-xs">{story.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-xs">
                    <span className="text-emerald-400">Earned: {story.earned}</span>
                    <span className="text-teal-400">{story.credits} Credits</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-emerald-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start earning from your farm <span className="gradient-text">today</span></h2>
          <p className="text-gray-400 mb-8">Free to join. No upfront costs. Start generating carbon credits within weeks.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-2xl shadow-emerald-500/25">
            Register as Farmer <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}