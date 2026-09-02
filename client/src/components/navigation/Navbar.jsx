import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';
import logoImage from '../../assets/3dicons-folder-dynamic-color.png';
import { useTheme } from '../../context/ThemeContext';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Browse Archive', to: '/browse' },
  { label: 'About', to: '/about' },
];

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="relative w-10 h-10 flex items-center justify-center rounded-lg border border-(--color-border) bg-(--color-surface-alt) text-(--color-text-primary) hover:border-(--color-primary) hover:text-(--color-primary) transition-all cursor-pointer overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon size={16} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        role="banner"
        className={[
          'sticky top-0 left-0 right-0 z-(--z-navbar) backdrop-blur-xl border-b transition-all duration-300',
          scrolled
            ? 'bg-(--color-surface)/90 border-(--color-border-subtle) shadow-(--shadow-sm)'
            : 'bg-(--color-surface)/70 border-transparent',
        ].join(' ')}
      >
        <div className="container flex items-center justify-between h-16 sm:h-18 gap-4 sm:gap-6">
          {/* Logo */}
  <Link
    to="/"
    className="flex items-center gap-2.5 sm:gap-3 shrink-0 group"
    aria-label="ArchiveX home"
  >
    <img
      src={logoImage}
      alt="ArchiveX logo"
      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover shadow-(--shadow-glow-primary) group-hover:scale-105
  group-hover:rotate-3 transition-transform duration-300"
    />
    <span className="text-xl sm:text-2xl font-black tracking-tight text-(--color-text-primary)">
      Archive<span className="text-(--color-primary)">X</span>
    </span>
  </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => [
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-(--color-primary) text-(--color-on-primary) shadow-sm'
                    : 'text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface-alt)',
                ].join(' ')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/browse"
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-(--color-surface-alt) border border-(--color-border) text-xs font-medium text-(--color-text-secondary) hover:text-(--color-text-primary) hover:border-(--color-primary) transition-all w-56"
            >
              <Search size={14} className="text-(--color-primary)" />
              <span>Search archive...</span>
              <kbd className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded border border-(--color-border) bg-(--color-surface) text-(--color-text-muted)">
                ⌘K
              </kbd>
            </Link>

            <ThemeToggle />

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
              className="fixed top-0 right-0 bottom-0 w-80 z-50 bg-(--color-surface) border-l border-(--color-border) flex flex-col p-6 gap-2 md:hidden shadow-2xl"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between pb-4 border-b border-(--color-border)">
                <div className="flex items-center gap-2.5">
                  <img
                    src={logoImage}
                    alt="ArchiveX logo"
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <span className="font-bold text-lg text-(--color-text-primary)">ArchiveX</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface-alt)"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-1 mt-4">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => [
                      'flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all',
                      isActive
                        ? 'bg-(--color-primary) text-(--color-on-primary)'
                        : 'text-(--color-text-secondary) hover:bg-(--color-surface-alt) hover:text-(--color-text-primary)',
                    ].join(' ')}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-(--color-border) space-y-3">
                <Link
                  to="/browse"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-(--color-primary) text-(--color-on-primary) font-semibold text-sm shadow-md hover:bg-(--color-primary-hover) transition-colors"
                >
                  <Search size={16} /> Open Search
                </Link>
                <p className="text-[10px] text-center text-(--color-text-muted)">
                  ArchiveX © {new Date().getFullYear()}
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
