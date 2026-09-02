import { Link } from 'react-router-dom';
import logoImage from '../../assets/3dicons-folder-dynamic-color.png';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-(--color-border) bg-(--color-surface)/80 mt-auto"
      role="contentinfo"
    >
      <div className="container py-12 sm:py-16 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand Col */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link to="/" className="flex items-center gap-3 w-fit group" aria-label="ArchiveX home">
              <img
                src={logoImage}
                alt="ArchiveX logo"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover shadow-(--shadow-glow-primary) group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-(--color-text-primary)">
                Archive<span className="text-(--color-primary)">X</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-(--color-text-secondary) leading-relaxed">
              Academic Rigor &amp; Precision. Access a central, free digital library of university past questions and study materials.
            </p>
            <p className="text-xs text-(--color-text-muted) mt-1">
              © {year} ArchiveX. All rights reserved.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-14 w-full md:w-auto">
            {/* Navigation */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-(--color-text-primary)">
                Navigation
              </h4>
              <Link
                to="/browse"
                className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors duration-200"
              >
                Browse Archive
              </Link>
              <Link
                to="/about"
                className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors duration-200"
              >
                About ArchiveX
              </Link>
              <Link
                to="/browse?tab=faculty"
                className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors duration-200"
              >
                Faculties Directory
              </Link>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-(--color-text-primary)">
                Legal
              </h4>
              <Link
                to="/privacy-policy"
                className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/fair-use-policy"
                className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors duration-200"
              >
                Fair Use Policy
              </Link>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-(--color-text-primary)">
                Resources
              </h4>
              <Link
                to="/browse?tab=level"
                className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors duration-200"
              >
                Browse by Level
              </Link>
              <Link
                to="/browse?tab=semester"
                className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors duration-200"
              >
                Browse by Semester
              </Link>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-(--color-success)">
                <span className="w-2 h-2 rounded-full bg-(--color-success) animate-pulse" />
                Systems Operational
              </span>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="mt-10 pt-6 border-t border-(--color-border) flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-(--color-text-muted)">
          <p>Built for university students with speed and precision.</p>
          <p className="font-medium">Powered by ArchiveX Platform</p>
        </div>
      </div>
    </footer>
  );
}
