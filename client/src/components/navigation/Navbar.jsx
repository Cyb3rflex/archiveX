import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, Search, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',           to: '/' },
  { label: 'Browse Archive', to: '/browse' },
  { label: 'About',          to: '/about' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        role="banner"
        className="sticky top-0 left-0 right-0 z-(--z-navbar) bg-(--color-surface)/90 backdrop-blur-md border-b border-(--color-border) shadow-(--shadow-sm)"
      >
        <div className="container flex items-center justify-between h-18 gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 group"
            aria-label="ArchiveX home"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-(--color-primary) to-(--color-accent) flex items-center justify-center shadow-(--shadow-glow-primary) group-hover:scale-105 transition-transform">
              <Archive size={20} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-(--color-text-primary)">
              Archive<span className="text-(--color-primary)">X</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => [
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-(--transition-fast)',
                  isActive
                    ? 'bg-(--color-primary) text-white shadow-sm'
                    : 'text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface-alt)',
                ].join(' ')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <Link
              to="/browse"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-(--color-surface-alt) border border-(--color-border) text-xs font-medium text-(--color-text-secondary) hover:text-(--color-text-primary) hover:border-(--color-primary) transition-all"
            >
              <Search size={14} className="text-(--color-primary)" />
              <span>Search archive...</span>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-(--color-border) bg-(--color-surface-alt) text-(--color-text-primary) hover:border-(--color-primary) transition-colors cursor-pointer"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 bg-(--color-surface) border-l border-(--color-border) flex flex-col p-6 gap-3 md:hidden shadow-2xl"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between pb-4 border-b border-(--color-border)">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-(--color-primary) to-(--color-accent) flex items-center justify-center">
                    <Archive size={16} className="text-white" />
                  </div>
                  <span className="font-bold text-lg text-(--color-text-primary)">ArchiveX</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-(--color-text-secondary) hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => [
                      'flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all',
                      isActive
                        ? 'bg-(--color-primary) text-white'
                        : 'text-(--color-text-secondary) hover:bg-(--color-surface-alt) hover:text-(--color-text-primary)',
                    ].join(' ')}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-(--color-border)">
                <Link
                  to="/browse"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-(--color-primary) text-white font-semibold text-sm shadow-md"
                >
                  <Search size={16} /> Open Search
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}