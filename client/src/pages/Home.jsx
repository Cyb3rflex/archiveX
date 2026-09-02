import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  ArrowRight,
  BookOpen,
  Download,
  Building2,
  GraduationCap,
  Layers,
  Calendar,
  Sparkles,
  Star,
  CheckCircle2,
  FileText,
  Users,
  Shield,
} from 'lucide-react';
import PastQuestionCard from '../components/cards/PastQuestionCard';
import {
  BookStack,
  LibraryShelf,
  OpenBook,
  PDFDocument,
  GraduationCap as GradCap,
} from '../components/illustrations/BookIllustration';
import { getRecentlyAdded } from '../data/mockData';

const STATS = [
  { icon: BookOpen, value: '17+', label: 'Available Courses', color: 'var(--color-accent)' },
  { icon: Download, value: '25+', label: 'Past Questions', color: 'var(--color-primary)' },
  { icon: Users, value: '500+', label: 'Active Students', color: '#f59e0b' },
  { icon: FileText, value: '100%', label: 'Free Access', color: 'var(--color-success)' },
];

const EXPLORE_CARDS = [
  {
    title: 'By Faculty',
    desc: 'Browse resources grouped by main academic faculties and colleges.',
    icon: Building2,
    href: '/browse?tab=faculty',
    badge: '2 Faculties',
    accent: 'primary',
  },
  {
    title: 'By Department',
    desc: 'Find specific materials tailored to your departmental curriculum.',
    icon: GraduationCap,
    href: '/browse?tab=department',
    badge: '4 Departments',
    accent: 'accent',
  },
  {
    title: 'By Level',
    desc: 'Filter courses and past questions by your current academic year.',
    icon: Layers,
    href: '/browse?tab=level',
    badge: '100L – 500L',
    accent: 'warning',
  },
  {
    title: 'By Semester',
    desc: 'Access materials categorized by First or Second semester offerings.',
    icon: Calendar,
    href: '/browse?tab=semester',
    badge: '1st & 2nd Sem',
    accent: 'success',
  },
];

const ACCENT_STYLES = {
  primary: {
    icon: 'bg-(--color-primary-muted) text-(--color-primary)',
    badge: 'bg-(--color-primary-muted) text-(--color-primary)',
  },
  accent: {
    icon: 'bg-(--color-accent-muted) text-(--color-accent)',
    badge: 'bg-(--color-accent-muted) text-(--color-accent)',
  },
  warning: {
    icon: 'bg-(--color-warning-muted) text-(--color-warning)',
    badge: 'bg-(--color-warning-muted) text-(--color-warning)',
  },
  success: {
    icon: 'bg-(--color-success-muted) text-(--color-success)',
    badge: 'bg-(--color-success-muted) text-(--color-success)',
  },
};

const LEVELS = [
  { label: '100L', level: 100, desc: 'Freshman Year' },
  { label: '200L', level: 200, desc: 'Sophomore Year' },
  { label: '300L', level: 300, desc: 'Junior Year' },
  { label: '400L', level: 400, desc: 'Senior Year' },
  { label: '500L', level: 500, desc: 'Final Year' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const recentlyAdded = useMemo(() => getRecentlyAdded(4), []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/browse?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/browse');
    }
  };

  return (
    <main>
      {/* ─── HERO SECTION ─── */}
      <section className="relative overflow-hidden py-12 md:pt-20 md:pb-32 flex flex-col items-center text-center">
        {/* Background ambient orbs */}
        <div className="orb orb-primary absolute -top-32 -left-24 w-[420px] h-[420px]" aria-hidden="true" />
        <div
          className="orb orb-secondary absolute top-1/3 -right-20 w-[380px] h-[380px]"
          aria-hidden="true"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="orb orb-primary-light absolute bottom-0 left-1/3 w-[300px] h-[300px]"
          aria-hidden="true"
          style={{ animationDelay: '8s', opacity: 0.06 }}
        />

        <div className="container relative z-10 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center lg:items-start text-left gap-8"
            >
              {/* Pill Tag */}
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center justify-center gap-2 px-4 py-1.5 h-7 rounded-full bg-(--color-primary-muted) text-(--color-primary) text-xs font-semibold tracking-wide border border-(--color-primary-muted)">
                  <Sparkles size={13} className="text-(--color-accent)" />
                  University Past Question Archive
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-(--color-text-primary) leading-[1.05]"
              >
                Find the Past Questions{' '}
                <span className="gradient-text">You Need.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg text-(--color-text-secondary) max-w-xl leading-relaxed"
              >
                Access a comprehensive, organized digital library of university past questions,
                course materials, and academic resources — designed to enhance your exam preparation with precision.
              </motion.p>

              {/* Search Input Box */}
              <motion.div variants={fadeUp} className="w-full max-w-xl">
                <form onSubmit={handleSearch} className="relative flex items-center group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-(--color-text-muted) group-focus-within:text-(--color-primary) transition-colors">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search course code, title, or session..."
                    className="block w-full pl-11 pr-32 py-3.5 sm:py-4 rounded-xl border border-(--color-border) bg-(--color-surface) text-(--color-text-primary) text-sm sm:text-base placeholder-(--color-text-muted) focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary-muted) shadow-(--shadow-sm) hover-shadow outline-none transition-all"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <button
                      type="submit"
                      className="bg-(--color-primary) text-(--color-on-primary) hover:bg-(--color-primary-hover) font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-lg shadow-(--shadow-sm) transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 h-9"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </motion.div>

              {/* Quick action buttons & links */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link to="/browse">
                  <button
                    type="button"
                    className="bg-(--color-primary) text-(--color-on-primary) hover:bg-(--color-primary-hover) font-semibold text-sm px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-(--shadow-sm)"
                  >
                    Browse Archive <ArrowRight size={15} />
                  </button>
                </Link>
                <Link
                  to="/about"
                  className="text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors px-2 py-1"
                >
                  How it works →
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Glass3D illustration card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full max-w-md aspect-square">
                {/* Floating illustrations behind glass */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute top-4 left-4 animate-float">
                    <OpenBook size={100} style={{ opacity: 0.85 }} />
                  </div>
                  <div className="absolute top-8 right-2 animate-float-2">
                    <BookStack size={120} style={{ opacity: 0.8 }} />
                  </div>
                  <div className="absolute bottom-8 left-8 animate-float-3">
                    <PDFDocument size={80} style={{ opacity: 0.85 }} />
                  </div>
                  <div className="absolute bottom-4 right-8 animate-float">
                    <GradCap size={90} style={{ opacity: 0.8 }} />
                  </div>
                </div>

                {/* Central glass3D card with stats */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass3d relative rounded-3xl p-6 bg-(--color-surface)/40 w-72 animate-pulse-soft">
                    <div className="text-center space-y-3">
                      <div className="flex justify-center">
                        <LibraryShelf size={120} />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-(--color-text-primary)">25+</p>
                        <p className="text-xs text-(--color-text-secondary) font-medium">
                          Verified PDF documents
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-(--color-border)">
                        <div>
                          <p className="text-sm font-bold text-(--color-primary)">17+</p>
                          <p className="text-[9px] text-(--color-text-muted)">Courses</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-(--color-accent)">4</p>
                          <p className="text-[9px] text-(--color-text-muted)">Depts</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-(--color-success)">2</p>
                          <p className="text-[9px] text-(--color-text-muted)">Faculties</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl mx-auto mt-16 pt-8 border-t border-(--color-border-subtle)"
          >
            {STATS.map(({ icon: Icon, value, label, color }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl bg-(--color-surface) border border-(--color-border) hover-shadow transition-all cursor-default"
              >
                <div style={{ color }} className="mb-2">
                  <Icon size={18} />
                </div>
                <p className="text-xl sm:text-2xl font-black text-(--color-text-primary)">{value}</p>
                <p className="text-[11px] text-(--color-text-muted) font-medium text-center mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── EXPLORE THE ARCHIVE (Browse Section) ─── */}
      <section className="w-full py-16 sm:py-20 md:py-28 border-t border-(--color-border-subtle) bg-(--color-surface-alt)/40 relative overflow-hidden">
        <div
          className="orb orb-accent absolute -top-20 -right-20 w-80 h-80"
          aria-hidden="true"
          style={{ opacity: 0.08 }}
        />
        <div className="container max-w-6xl relative z-10">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-(--color-text-primary) tracking-tight">
              Explore the Archive
            </h2>
            <p className="text-sm sm:text-base text-(--color-text-secondary) mt-2">
              Navigate through our meticulously organized academic hierarchy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {EXPLORE_CARDS.map(({ title, desc, icon: Icon, href, badge, accent }) => {
              const styles = ACCENT_STYLES[accent] ?? ACCENT_STYLES.primary;
              return (
                <Link
                  key={title}
                  to={href}
                  className="group bg-(--color-surface) border border-(--color-border) rounded-xl p-5 sm:p-6 transition-all hover-shadow flex flex-col items-start h-full hover:border-(--color-primary) hover:bg-(--color-surface-alt)/50"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${styles.icon}`}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="w-full flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-(--color-text-primary) group-hover:text-(--color-primary) transition-colors">
                      {title}
                    </h3>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border border-(--color-border) ${styles.badge}`}
                    >
                      {badge}
                    </span>
                  </div>
                  <p className="text-xs text-(--color-text-secondary) leading-relaxed mt-auto">
                    {desc}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-(--color-primary) mt-4 pt-3 border-t border-(--color-border-subtle) w-full group-hover:gap-2.5 transition-all">
                    Explore <ArrowRight size={13} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BROWSE BY LEVEL SECTION ─── */}
      <section className="w-full py-16 sm:py-20 md:py-24 border-t border-(--color-border-subtle) bg-(--color-surface)/60 relative overflow-hidden">
        <div
          className="orb orb-secondary absolute -bottom-20 -left-20 w-72 h-72"
          aria-hidden="true"
          style={{ opacity: 0.08 }}
        />
        <div className="container max-w-5xl text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-(--color-text-primary) mb-2 tracking-tight">
            Browse by Level
          </h2>
          <p className="text-sm text-(--color-text-secondary) mb-10 max-w-lg mx-auto">
            Directly access past questions tailored to your academic standing.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {LEVELS.map(({ label, level, desc }) => (
              <Link
                key={label}
                to={`/browse?tab=level&level=${level}`}
                className="group bg-(--color-surface) border border-(--color-border) rounded-xl px-8 py-5 font-bold text-lg sm:text-xl text-(--color-text-primary) hover:border-(--color-primary) hover:text-(--color-primary) hover:bg-(--color-primary-muted) transition-all hover-shadow flex flex-col items-center min-w-28"
              >
                <span>{label}</span>
                <span className="text-[11px] font-normal text-(--color-text-muted) group-hover:text-(--color-primary) mt-1">
                  {desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RECENTLY ADDED SECTION ─── */}
      <section className="w-full py-16 sm:py-20 md:py-28 border-t border-(--color-border-subtle)">
        <div className="container max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-(--color-border-subtle) gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-(--color-text-primary)">
                Recently Added Questions
              </h2>
              <p className="text-xs sm:text-sm text-(--color-text-secondary) mt-1.5">
                Latest examination documents verified and uploaded to the archive.
              </p>
            </div>
            <Link
              to="/browse"
              className="text-sm font-semibold text-(--color-primary) hover:underline flex items-center gap-1.5 self-start sm:self-auto"
            >
              View All <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {recentlyAdded.map((pq, idx) => (
              <PastQuestionCard
                key={pq.id}
                pq={pq}
                _courseSlug={pq.course?.slug}
                variant="grid"
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section className="w-full py-16 sm:py-20 md:py-28 border-t border-(--color-border-subtle) bg-(--color-surface-alt)/40 relative overflow-hidden">
        <div
          className="orb orb-primary absolute top-20 right-0 w-72 h-72"
          aria-hidden="true"
          style={{ opacity: 0.07 }}
        />
        <div className="container max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-(--color-text-primary) mb-2 tracking-tight">
              Built for Serious Students
            </h2>
            <p className="text-sm text-(--color-text-secondary) max-w-xl mx-auto">
              Everything you need to ace your next exam — organized, fast, and always free.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: Shield,
                title: 'Verified & Safe',
                desc: 'Every document is reviewed for quality and accuracy before being added.',
                color: 'var(--color-primary)',
              },
              {
                icon: Sparkles,
                title: 'Lightning Fast',
                desc: 'Find what you need in seconds with our smart search and filters.',
                color: 'var(--color-accent)',
              },
              {
                icon: CheckCircle2,
                title: 'Always Free',
                desc: 'No paywalls, no signups. Just open, browse, and download.',
                color: 'var(--color-success)',
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="glass3d bg-(--color-surface)/60 rounded-2xl p-6 sm:p-8 text-center"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: `color-mix(in srgb, ${color} 12%, transparent)`,
                    color,
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-(--color-text-primary) mb-2">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-(--color-text-secondary) leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA SECTION ─── */}
      <section className="w-full py-16 sm:py-20 md:py-28 bg-(--color-surface-alt)/40 border-t border-(--color-border-subtle) text-center relative overflow-hidden">
        <div className="orb orb-primary absolute -bottom-24 -left-24 w-80 h-80 opacity-10" aria-hidden="true" />
        <div className="orb orb-secondary absolute -top-16 right-1/4 w-60 h-60" aria-hidden="true" style={{ opacity: 0.07 }} />

        {/* Floating books */}
        <div className="hidden md:block absolute top-12 right-12 animate-float-2 opacity-30" aria-hidden="true">
          <OpenBook size={80} />
        </div>
        <div className="hidden md:block absolute bottom-12 left-12 animate-float opacity-30" aria-hidden="true">
          <BookStack size={100} />
        </div>

        <div className="container max-w-3xl relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-(--color-primary-muted) text-(--color-primary) flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={26} />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-(--color-text-primary) mb-4 tracking-tight leading-tight">
            Your next exam preparation starts here.
          </h2>
          <p className="text-sm sm:text-base text-(--color-text-secondary) mb-10 max-w-lg mx-auto leading-relaxed">
            Join thousands of students utilizing ArchiveX for academic excellence and top grade performance.
          </p>
          <Link to="/browse">
            <button
              type="button"
              className="bg-(--color-primary) text-(--color-on-primary) hover:bg-(--color-primary-hover) font-bold text-sm sm:text-base px-10 py-4 rounded-xl shadow-(--shadow-md) transition-all cursor-pointer inline-flex items-center gap-2.5"
            >
              Access the Archive Now <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
