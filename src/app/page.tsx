'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiArrowRight, FiShield, FiTrendingUp, FiGlobe, FiZap, FiLayers, FiCheck, FiActivity, FiStar } from 'react-icons/fi';
import { GiSolidLeaf, GiWheat, GiFactory, GiEarthAmerica } from 'react-icons/gi';

function AnimatedEarth() {
  return (
    <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px]">
      {/* Outer glow rings */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/5 animate-ping" style={{ animationDuration: '4s' }} />
      <div className="absolute -inset-4 rounded-full border border-emerald-500/10 animate-spin" style={{ animationDuration: '30s' }} />
      <div className="absolute -inset-8 rounded-full border border-teal-500/5 animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />

      {/* Orbit dots */}
      <div className="absolute -inset-4 animate-spin" style={{ animationDuration: '20s' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" />
      </div>
      <div className="absolute -inset-8 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50" />
      </div>

      {/* Main Earth circle */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-600/30 via-teal-700/20 to-blue-900/30 border border-emerald-500/20 shadow-2xl shadow-emerald-500/20 overflow-hidden">
        {/* Continents overlay */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '60s' }}>
          <div className="absolute top-[15%] left-[20%] w-[30%] h-[25%] bg-emerald-500/15 rounded-[40%] rotate-12" />
          <div className="absolute top-[25%] right-[15%] w-[20%] h-[35%] bg-emerald-500/12 rounded-[30%] -rotate-6" />
          <div className="absolute bottom-[20%] left-[30%] w-[25%] h-[20%] bg-teal-500/10 rounded-[35%] rotate-3" />
          <div className="absolute top-[45%] left-[10%] w-[15%] h-[25%] bg-emerald-400/10 rounded-[40%] -rotate-12" />
          <div className="absolute bottom-[30%] right-[20%] w-[22%] h-[18%] bg-teal-500/12 rounded-[30%] rotate-8" />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-[20%] rounded-full border border-emerald-400/30" />
          <div className="absolute inset-[40%] rounded-full border border-emerald-400/20" />
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-px w-px bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent" />
          <div className="absolute left-0 right-0 top-1/2 -translate-y-px h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
        </div>

        {/* Atmosphere glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-emerald-500/10 via-transparent to-teal-500/5" />
      </div>

      {/* Carbon capture nodes */}
      {[
        { top: '10%', left: '50%', delay: '0s' },
        { top: '30%', left: '85%', delay: '1s' },
        { top: '70%', left: '80%', delay: '2s' },
        { top: '85%', left: '45%', delay: '0.5s' },
        { top: '60%', left: '10%', delay: '1.5s' },
        { top: '25%', left: '15%', delay: '2.5s' },
      ].map((pos, i) => (
        <div key={i} className="absolute w-3 h-3" style={{ top: pos.top, left: pos.left }}>
          <div className="w-full h-full bg-emerald-400/60 rounded-full animate-pulse" style={{ animationDelay: pos.delay }} />
          <div className="absolute inset-0 bg-emerald-400/30 rounded-full animate-ping" style={{ animationDelay: pos.delay, animationDuration: '3s' }} />
        </div>
      ))}
    </div>
  );
}

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Home() {
  return (
    <div className="bg-[#0a0f0d] min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-animated" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[200px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-32">
            <div className="text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Climate Technology Operating System
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              >
                <span className="text-white">The Future of</span>
                <br />
                <span className="gradient-text">Carbon Capture</span>
                <br />
                <span className="text-white">& Climate</span>
                <br />
                <span className="gradient-text">Intelligence</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed"
              >
                AI-powered satellite monitoring. CO₂ capture marketplace. Verified carbon credits. The complete infrastructure for climate-positive agriculture.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href="/signup" className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 flex items-center justify-center gap-2">
                  Get Started
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/co2-marketplace" className="px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all flex items-center justify-center gap-2">
                  <FiGlobe className="text-emerald-400" />
                  CO₂ Marketplace
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="hidden lg:flex justify-center items-center"
            >
              <AnimatedEarth />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-emerald-500/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-emerald-400/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Live Impact Counter */}
      <section className="relative py-24 border-y border-emerald-500/10">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Carbon Offset Generated', value: 24800, suffix: ' tCO₂', icon: GiSolidLeaf, color: 'emerald' },
              { label: 'Farmers Onboarded', value: 8500, suffix: '+', icon: GiWheat, color: 'teal' },
              { label: 'CO₂ Captured & Traded', value: 4200, suffix: ' tons', icon: GiFactory, color: 'blue' },
              { label: 'Countries Reached', value: 28, suffix: '+', icon: GiEarthAmerica, color: 'emerald' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <div className={`inline-flex w-14 h-14 items-center justify-center rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 mb-4`}>
                  <stat.icon className={`text-${stat.color}-400 text-2xl`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[150px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Our Mission</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
                Ending crop residue burning.{' '}
                <span className="gradient-text">One farm at a time.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Every year, millions of tons of crop residue are burned across India, causing severe air pollution and destroying soil health. CarbonTech creates economic incentives for farmers to adopt sustainable alternatives, generating carbon credits and connecting them to biomass markets.
              </p>
              <div className="space-y-4">
                {[
                  'Eliminate crop burning pollution',
                  'Generate carbon credits from sustainable farming',
                  'Connect farmers to biomass supply chains',
                  'AI-powered farming recommendations',
                ].map((item, i) => (
                  <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <FiCheck className="text-emerald-400 text-xs" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative">
              <div className="glass-card p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'CO₂ Prevented', value: '45,600 tCO₂e', icon: FiShield, color: 'emerald' },
                    { label: 'Revenue Generated', value: '₹3.4 Cr+', icon: FiTrendingUp, color: 'teal' },
                    { label: 'Verified Projects', value: '89+', icon: FiCheck, color: 'blue' },
                    { label: 'Active Buyers', value: '145+', icon: FiGlobe, color: 'emerald' },
                  ].map((item, i) => (
                    <div key={i} className="glass-card p-5 glass-card-hover">
                      <item.icon className={`text-${item.color}-400 text-xl mb-3`} />
                      <p className="text-2xl font-bold text-white mb-1">{item.value}</p>
                      <p className="text-xs text-gray-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CO₂ Capture Innovation */}
      <section className="py-24 relative border-t border-emerald-500/10">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <FiZap className="text-emerald-400" />
              Core Innovation
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
              CO₂ Capture & <span className="gradient-text">Utilization Marketplace</span>
            </h2>
            <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
              The world&apos;s first agricultural CO₂ capture marketplace. Processing plants capture CO₂ from biomass conversion and sell it to industries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { step: 'Capture', icon: GiFactory, desc: 'Processing plants capture CO₂ from biomass pyrolysis and gasification', color: 'emerald' },
              { step: 'Purify', icon: FiShield, desc: 'CO₂ is purified to 95-99.9% concentration for industrial applications', color: 'teal' },
              { step: 'List', icon: FiLayers, desc: 'Processors list captured CO₂ on the marketplace with pricing and specs', color: 'blue' },
              { step: 'Deliver', icon: FiGlobe, desc: 'Buyers purchase CO₂ for beverages, greenhouses, dry ice, and chemicals', color: 'emerald' },
            ].map((item, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="glass-card p-6 glass-card-hover text-center">
                <div className={`w-14 h-14 rounded-xl bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`text-${item.color}-400 text-2xl`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.step}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <Link href="/co2-marketplace" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all shadow-2xl shadow-emerald-500/25">
              Explore CO₂ Marketplace
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative border-t border-emerald-500/10">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
              From Farm to <span className="gradient-text">Carbon Credit</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: '01', title: 'Register Farm', desc: 'Farmers onboard their farms with crop and land details', icon: GiWheat },
              { step: '02', title: 'Track Practices', desc: 'Sustainable farming practices are logged and verified', icon: FiLayers },
              { step: '03', title: 'AI Monitoring', desc: 'AI analyzes satellite data and monitors carbon impact', icon: FiZap },
              { step: '04', title: 'Credits Generated', desc: 'Verified carbon credits are minted on the platform', icon: GiSolidLeaf },
              { step: '05', title: 'Companies Buy', desc: 'Companies purchase credits to offset their emissions', icon: FiGlobe },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative group"
              >
                <div className="glass-card p-6 h-full glass-card-hover">
                  <div className="text-emerald-500/30 text-5xl font-black mb-4">{item.step}</div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <item.icon className="text-emerald-400 text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
                {i < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] bg-gradient-to-r from-emerald-500/40 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Calculator */}
      <section className="py-24 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Revenue Estimator</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
                  Calculate Your <span className="gradient-text">Carbon Revenue</span>
                </h2>
                <p className="text-gray-400 mb-8">
                  Estimate how much you could earn by converting crop residue into carbon credits and selling biomass.
                </p>
                <div className="space-y-6">
                  {[
                    { label: 'Avg. 5-acre farm generates', value: '₹25,000-50,000/year' },
                    { label: 'Carbon credit price', value: '₹600-1,200 per tCO₂e' },
                    { label: 'Biomass sale revenue', value: '₹1,500-3,500 per ton' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-emerald-500/10">
                      <span className="text-gray-400 text-sm">{item.label}</span>
                      <span className="text-emerald-400 font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-card p-6 bg-emerald-500/5">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                    <FiTrendingUp className="text-emerald-400 text-3xl" />
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Potential Annual Earnings</p>
                  <p className="text-5xl font-bold gradient-text mb-2">₹50,000+</p>
                  <p className="text-gray-500 text-sm mb-6">per 5-acre farm</p>
                  <Link href="/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/25">
                    Start Earning <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Grid */}
      <section className="py-24 relative border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Platform</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
              A complete <span className="gradient-text">climate technology OS</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'CO₂ Capture Marketplace', desc: 'Buy and sell captured CO₂ from agricultural processing. Industrial-grade CO₂ for beverages, greenhouses, and more.', icon: FiActivity, gradient: 'from-emerald-500/20 to-emerald-600/5' },
              { title: 'Satellite Farm Monitoring', desc: 'Real-time NDVI analysis, soil moisture tracking, and residue burning detection via satellite imagery.', icon: FiGlobe, gradient: 'from-teal-500/20 to-teal-600/5' },
              { title: 'AI Carbon Intelligence', desc: 'Gemini-powered predictions for carbon credit potential, CO₂ capture optimization, and revenue forecasting.', icon: FiZap, gradient: 'from-blue-500/20 to-blue-600/5' },
              { title: 'Climate Verification', desc: 'Verra & Gold Standard compliant verification pipeline for carbon credits with full audit trail.', icon: FiShield, gradient: 'from-emerald-500/20 to-teal-500/5' },
              { title: 'Processing Plant Analytics', desc: 'Track biomass input, CO₂ capture rates, biochar production, and energy generation in real-time.', icon: FiTrendingUp, gradient: 'from-teal-500/20 to-blue-500/5' },
              { title: 'Carbon Credit Marketplace', desc: 'Trade verified carbon credits from sustainable agriculture with transparent pricing and instant settlement.', icon: GiSolidLeaf, gradient: 'from-blue-500/20 to-emerald-500/5' },
              { title: 'Biomass Supply Chain', desc: 'End-to-end biomass supply chain connecting farmers to processing plants and industrial buyers.', icon: GiFactory, gradient: 'from-emerald-500/20 to-emerald-600/5' },
              { title: 'Interactive Platform Map', desc: 'Visualize farms, processing plants, CO₂ storage facilities, and biomass supply clusters on a live map.', icon: FiLayers, gradient: 'from-teal-500/20 to-teal-600/5' },
              { title: 'Real-time Climate Analytics', desc: 'Global dashboard with live CO₂ reduction tracking, regional distribution, and environmental impact metrics.', icon: FiStar, gradient: 'from-blue-500/20 to-blue-600/5' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card p-6 glass-card-hover shine-effect"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} border border-white/5 flex items-center justify-center mb-4`}>
                  <feature.icon className="text-emerald-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
              Trusted by <span className="gradient-text">farmers & enterprises</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Rajesh Kumar', role: 'Farmer, Punjab', text: 'CarbonTech helped me earn an additional ₹45,000 last season by converting my rice straw into carbon credits instead of burning it.' },
              { name: 'Priya Sharma', role: 'Sustainability Head, TCS', text: 'The platform made it incredibly easy for us to purchase verified agricultural carbon credits for our net-zero commitments.' },
              { name: 'Mohan Singh', role: 'Farmer, Haryana', text: 'The AI assistant recommended cover cropping which improved my soil health and generated even more carbon credits this year.' },
            ].map((t, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="glass-card p-6 glass-card-hover">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-emerald-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm uppercase tracking-wider mb-8">Backed by leading climate & agriculture organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
            {['NABARD', 'ICAR', 'World Bank', 'UNFCCC', 'Verra', 'Gold Standard'].map((name) => (
              <span key={name} className="text-gray-400 text-lg font-bold tracking-wider">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The complete platform for <span className="gradient-text">climate-positive agriculture</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of farmers, processing plants, and companies using CarbonTech to capture CO₂, generate carbon credits, and build a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all shadow-2xl shadow-emerald-500/25 flex items-center justify-center gap-2">
                Get Started Free
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/how-it-works" className="px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}