import Link from 'next/link';
import { GiSolidLeaf } from 'react-icons/gi';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="relative bg-[#060a08] border-t border-emerald-500/10">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <GiSolidLeaf className="text-emerald-400 text-2xl" />
              <span className="text-xl font-bold gradient-text">CarbonTech</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Building climate-positive infrastructure for agriculture. Connecting farmers to carbon markets.
            </p>
            <div className="flex gap-3">
              {[FiTwitter, FiLinkedin, FiGithub].map((Icon, i) => (
                <div key={i} className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400/40 transition-all cursor-pointer">
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/how-it-works', label: 'How it Works' },
                { href: '/farmers', label: 'For Farmers' },
                { href: '/industries', label: 'For Industries' },
                { href: '/carbon-credits', label: 'Carbon Credits' },
                { href: '/marketplace', label: 'Marketplace' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5 text-sm">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((label) => (
                <li key={label}>
                  <span className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-gray-400">
                <FiMail className="text-emerald-400 flex-shrink-0" />
                hello@carbontech.in
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiPhone className="text-emerald-400 flex-shrink-0" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiMapPin className="text-emerald-400 flex-shrink-0" />
                New Delhi, India
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-emerald-500/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CarbonTech. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-emerald-500/60">Building a sustainable future for agriculture</p>
        </div>
      </div>
    </footer>
  );
}