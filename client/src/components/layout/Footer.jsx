import { Link } from 'react-router-dom';
import { Archive, GitFork, Share2 } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-(--color-border) bg-(--color-surface) mt-auto" role="contentinfo">
      <div className="container py-14 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand Col */}
          <div className="flex flex-col gap-3 max-w-sm">
            <Link to="/" className="flex items-center gap-2.5" aria-label="ArchiveX home">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-(--color-primary) to-(--color-accent) flex items-center justify-center shadow-(--shadow-glow-primary)">
                <Archive size={16} className="text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-(--color-text-primary)">
                Archive<span className="text-(--color-primary)">X</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-(--color-text-secondary) leading-relaxed">
              Academic Rigor & Precision. Access a central, free digital library of university past questions and study materials.
            </p>
            <p className="text-xs text-(--color-text-muted) mt-1">
              © {year} ArchiveX. All rights reserved.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 w-full md:w-auto">
            {/* Column 1: Navigation */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-(--color-text-primary)">
                Navigation
              </h4>
              <Link to="/browse" className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors">
                Browse Archive
              </Link>
              <Link to="/about" className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors">
                About ArchiveX
              </Link>
              <Link to="/browse?tab=faculty" className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors">
                Faculties Directory
              </Link>
            </div>

            {/* Column 2: Legal */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-(--color-text-primary)">
                Legal
              </h4>
              <Link to="/about" className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors">
                Privacy Policy
              </Link>
              <Link to="/about" className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors">
                Terms of Service
              </Link>
              <Link to="/about" className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors">
                Fair Use Policy
              </Link>
            </div>

            {/* Column 3: System */}
            {/* <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-(--color-text-primary)">
                System
              </h4>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors flex items-center gap-1.5"
              >
                <GitFork size={13} /> Open Source
              </a>
              <Link to="/about" className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors">
                Submit Material
              </Link>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-(--color-success)">
                <span className="w-2 h-2 rounded-full bg-(--color-success) animate-pulse" />
                Systems Operational
              </span>
            </div> */}
          </div>
        </div>

        {/* Bottom Social Bar */}
        {/* <div className="mt-10 pt-6 border-t border-(--color-border) flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-(--color-text-muted)">
          <p>Designed for university students with speed and precision.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-(--color-primary) transition-colors"
            >
              <GitFork size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="hover:text-(--color-primary) transition-colors"
            >
              <Share2 size={16} />
            </a>
          </div>
        </div> */}
      </div>
    </footer>
  );
}
