'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { useSidebar } from '@/lib/sidebar-context';
import {
  FiHome, FiMap, FiPackage, FiDollarSign, FiMessageCircle,
  FiSettings, FiMenu, FiX, FiUsers, FiShield, FiBarChart2,
  FiCpu, FiFileText, FiShoppingCart, FiAward, FiTruck,
  FiGlobe, FiActivity, FiCheckCircle, FiLayers, FiZap,
  FiTool, FiSearch, FiCreditCard, FiGrid,
} from 'react-icons/fi';

const roleMenus: Record<string, { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[]> = {
  farmer: [
    { href: '/dashboard', label: 'Overview', icon: FiHome },
    { href: '/dashboard/farm', label: 'My Farm', icon: FiMap },
    { href: '/dashboard/listings', label: 'My Listings', icon: FiPackage },
    { href: '/dashboard/carbon', label: 'Carbon Credits', icon: FiAward },
    { href: '/dashboard/parali-collection', label: 'Parali Collection', icon: FiTruck },
    { href: '/dashboard/machinery', label: 'Rent Machinery', icon: FiTool },
    { href: '/dashboard/satellite', label: 'Satellite Monitor', icon: FiGlobe },
    { href: '/dashboard/wallet', label: 'Revenue Wallet', icon: FiCreditCard },
    { href: '/dashboard/schemes', label: 'Govt Schemes', icon: FiSearch },
    { href: '/dashboard/carbon-intelligence', label: 'AI Intelligence', icon: FiZap },
    { href: '/dashboard/ai-assistant', label: 'AI Assistant', icon: FiCpu },
    { href: '/dashboard/messages', label: 'Messages', icon: FiMessageCircle },
    { href: '/dashboard/settings', label: 'Settings', icon: FiSettings },
  ],
  industry: [
    { href: '/dashboard', label: 'Overview', icon: FiHome },
    { href: '/dashboard/browse', label: 'Browse Biomass', icon: FiShoppingCart },
    { href: '/dashboard/orders', label: 'My Orders', icon: FiTruck },
    { href: '/dashboard/co2-listings', label: 'CO₂ Listings', icon: FiLayers },
    { href: '/dashboard/processing', label: 'Processing Plant', icon: FiActivity },
    { href: '/dashboard/global-exchange', label: 'Carbon Exchange', icon: FiGlobe },
    { href: '/dashboard/carbon-market', label: 'Market Prices', icon: FiBarChart2 },
    { href: '/dashboard/digital-twin', label: 'Digital Twin', icon: FiGrid },
    { href: '/dashboard/satellite', label: 'Satellite Monitor', icon: FiGlobe },
    { href: '/dashboard/messages', label: 'Messages', icon: FiMessageCircle },
    { href: '/dashboard/settings', label: 'Settings', icon: FiSettings },
  ],
  company: [
    { href: '/dashboard', label: 'Overview', icon: FiHome },
    { href: '/dashboard/credits', label: 'Buy Credits', icon: FiAward },
    { href: '/dashboard/co2-orders', label: 'Buy CO₂', icon: FiShoppingCart },
    { href: '/dashboard/global-exchange', label: 'Carbon Exchange', icon: FiGlobe },
    { href: '/dashboard/carbon-market', label: 'Market Prices', icon: FiBarChart2 },
    { href: '/dashboard/portfolio', label: 'My Portfolio', icon: FiBarChart2 },
    { href: '/dashboard/climate-verification', label: 'Verification', icon: FiCheckCircle },
    { href: '/dashboard/certificates', label: 'Certificates', icon: FiAward },
    { href: '/dashboard/settings', label: 'Settings', icon: FiSettings },
  ],
  admin: [
    { href: '/dashboard', label: 'Overview', icon: FiHome },
    { href: '/dashboard/users', label: 'Users', icon: FiUsers },
    { href: '/dashboard/projects', label: 'Carbon Projects', icon: FiFileText },
    { href: '/dashboard/verification', label: 'Verification', icon: FiShield },
    { href: '/dashboard/realtime-analytics', label: 'Live Analytics', icon: FiActivity },
    { href: '/dashboard/acin', label: 'ACIN Intelligence', icon: FiCpu },
    { href: '/dashboard/digital-twin', label: 'Digital Twin', icon: FiGrid },
    { href: '/dashboard/global-exchange', label: 'Carbon Exchange', icon: FiGlobe },
    { href: '/dashboard/carbon-market', label: 'Market Prices', icon: FiBarChart2 },
    { href: '/dashboard/platform-map', label: 'Platform Map', icon: FiGlobe },
    { href: '/dashboard/climate-analytics', label: 'Climate Analytics', icon: FiActivity },
    { href: '/dashboard/climate-verification', label: 'Impact Verify', icon: FiCheckCircle },
    { href: '/dashboard/analytics', label: 'Analytics', icon: FiBarChart2 },
    { href: '/dashboard/settings', label: 'Settings', icon: FiSettings },
  ],
  verifier: [
    { href: '/dashboard', label: 'Overview', icon: FiHome },
    { href: '/dashboard/projects', label: 'Assigned Projects', icon: FiFileText },
    { href: '/dashboard/verification', label: 'Verification', icon: FiShield },
    { href: '/dashboard/climate-verification', label: 'Climate Verify', icon: FiCheckCircle },
    { href: '/dashboard/settings', label: 'Settings', icon: FiSettings },
  ],
};

export default function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const { profile } = useAuthStore();
  const role = profile?.role || 'farmer';
  const menu = roleMenus[role] || roleMenus.farmer;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-20 left-4 z-50 bg-[#0d1512] border border-emerald-500/20 shadow-lg rounded-xl p-2 text-white"
      >
        {mobileOpen ? <FiX /> : <FiMenu />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-[#0d1512]/95 backdrop-blur-xl border-r border-emerald-500/10 z-40 transition-all duration-300 ease-in-out overflow-hidden ${
          sidebarOpen ? 'w-64' : 'md:w-16 w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Sidebar header with toggle */}
        <div className="flex items-center gap-3 p-4 border-b border-emerald-500/10">
          <button
            onClick={toggleSidebar}
            className="hidden md:flex items-center justify-center w-9 h-9 min-w-[2.25rem] rounded-lg text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            aria-label="Toggle sidebar"
          >
            <FiMenu size={20} />
          </button>
          <span className={`text-lg font-semibold gradient-text whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden ${
            sidebarOpen ? 'opacity-100 w-auto' : 'md:opacity-0 md:w-0 opacity-100 w-auto'
          }`}>
            Bharat Credits
          </span>
        </div>

        {/* User profile section */}
        <div className="p-4 border-b border-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 min-w-[2.5rem] bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {profile?.displayName?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              sidebarOpen ? 'opacity-100 w-auto' : 'md:opacity-0 md:w-0 opacity-100 w-auto'
            }`}>
              <p className="font-semibold text-white text-sm whitespace-nowrap">{profile?.displayName || 'User'}</p>
              <p className="text-xs text-emerald-400/70 capitalize whitespace-nowrap">{role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-9rem)]">
          {menu.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={sidebarOpen ? undefined : item.label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out ${
                  active
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                } ${!sidebarOpen ? 'md:justify-center' : ''}`}
              >
                <item.icon className={`text-lg flex-shrink-0 ${active ? 'text-emerald-400' : ''}`} />
                <span className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                  sidebarOpen ? 'opacity-100 w-auto' : 'md:opacity-0 md:w-0 opacity-100 w-auto'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}