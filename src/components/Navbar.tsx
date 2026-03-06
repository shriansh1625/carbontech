'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { FiMenu, FiX, FiUser, FiLogOut, FiGrid } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How it Works' },
  { href: '/farmers', label: 'Farmers' },
  { href: '/industries', label: 'Industries' },
  { href: '/carbon-credits', label: 'Carbon Credits' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/co2-marketplace', label: 'CO₂ Market' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#0a0f0d]/80 backdrop-blur-xl border-b border-emerald-500/10 shadow-lg shadow-emerald-900/5'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <GiSolidLeaf className="text-emerald-400 text-2xl transition-transform group-hover:scale-110 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-emerald-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold gradient-text">CarbonTech</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors group">
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-4/5 transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-400 bg-emerald-400/10 rounded-lg hover:bg-emerald-400/20 border border-emerald-400/20 transition-all">
                  <FiGrid className="text-xs" /> Dashboard
                </Link>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
                  <FiUser className="text-xs" />
                  <span className="capitalize">{profile?.role || 'User'}</span>
                </div>
                <button onClick={logout} className="p-2 text-gray-500 hover:text-red-400 transition-colors">
                  <FiLogOut />
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors px-3 py-2">
                  Login
                </Link>
                <Link href="/signup"
                  className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden p-2 text-gray-300 hover:text-emerald-400" onClick={() => setOpen(!open)}>
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0f0d]/95 backdrop-blur-xl border-b border-emerald-500/10">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all"
                  onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-emerald-500/10 pt-3 mt-3 space-y-1">
                {user ? (
                  <>
                    <Link href="/dashboard" className="block px-3 py-2.5 text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 rounded-lg" onClick={() => setOpen(false)}>
                      Dashboard
                    </Link>
                    <button onClick={() => { logout(); setOpen(false); }} className="block w-full text-left px-3 py-2.5 text-sm text-red-400 font-medium hover:bg-red-500/10 rounded-lg">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-emerald-500/10 rounded-lg" onClick={() => setOpen(false)}>
                      Login
                    </Link>
                    <Link href="/signup" className="block px-3 py-2.5 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/10 rounded-lg" onClick={() => setOpen(false)}>
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}