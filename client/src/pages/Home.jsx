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
  Zap,
  Star,
  CheckCircle2,
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import PastQuestionCard from '../components/cards/PastQuestionCard';
import { getRecentlyAdded } from '../data/mockData';

const STATS = [
  { icon: BookOpen,  value: '17+',  label: 'Available Courses' },
  { icon: Download,  value: '25+',  label: 'Past Questions' },
  { icon: Star,      value: '4',    label: 'Major Departments' },
  { icon: Zap,       value: '100%', label: 'Free Student Access' },
];

const EXPLORE_CARDS = [
  {
    title: 'By Faculty',
    desc: 'Browse resources grouped by main academic faculties and colleges.',
    icon: Building2,
    href: '/browse?tab=faculty',
    badge: '2 Faculties',
  },
  {
    title: 'By Department',
    desc: 'Find specific materials tailored to your departmental curriculum.',
    icon: GraduationCap,
    href: '/browse?tab=department',
    badge: '4 Departments',
  },
  {
    title: 'By Level',
    desc: 'Filter courses and past questions by your current academic year.',
    icon: Layers,
    href: '#levels',
    badge: '100L - 500L',
  },
  {
    title: 'By Semester',
    desc: 'Access materials categorized by First or Second semester offerings.',
    icon: Calendar,
    href: '/browse?tab=semester',
    badge: '1st & 2nd Sem',
  },
];

const LEVELS = [
  { label: '100L', level: 100, desc: 'Freshman Year' },
  { label: '200L', level: 200, desc: 'Sophomore Year' },
  { label: '300L', level: 300, desc: 'Junior Year' },
  { label: '400L', level: 400, desc: 'Senior Year' },
  { label: '500L', level: 500, desc: 'Final Year' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
      <section className="relative overflow-hidden py-8 md:pt-10 md:pb-28 flex flex-col items-center text-center">
        {/* Background ambient orbs */}
        <div className="orb orb-primary absolute -top-24 -left-20 w-112.5 h-112.5" aria-hidden="true" />
        <div
          className="orb orb-accent absolute top-1/2 -right-20 w-100 h-100"
          aria-hidden="true"
          style={{ animationDelay: '3s' }}
        />

        <div className="container relative z-10 max-w-5xl">
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center gap-7">
            {/* Pill Tag */}
            <motion.div variants={fadeUp}>
              <span className="flex items-center justify-center gap-2 px-3.5 py-1.5 w-fit h-6 rounded-full bg-(--color-primary-muted) text-(--color-primary) text-xs font-semibold tracking-wide border border-(--color-primary-muted) shadow-sm">
                <Sparkles size={13} className="text-(--color-primary) animate-pulse" />
                University Past Question Archive
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-(--color-text-primary) max-w-4xl mx-auto mb-6 leading-[1.15]"
            >
              Find the Past Questions{' '}
              <span className="gradient-text">You Need.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-(--color-text-secondary) max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Access a comprehensive, organized digital library of university past questions,
              course materials, and academic resources designed to enhance your exam preparation with precision.
            </motion.p>

            {/* Search Input Box */}
            <motion.div variants={fadeUp} className="w-full max-w-3xl mb-6">
              <form onSubmit={handleSearch} className="relative flex items-center group">
                <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-(--color-text-muted) group-focus-within:text-(--color-primary) transition-colors">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search course code, course title, or academic session..."
                  className="block w-full pl-12 pr-28 sm:pr-32 py-4 rounded-xl border border-(--color-border) bg-(--color-surface) text-(--color-text-primary) text-sm sm:text-base placeholder-(--color-text-muted) focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary-muted) shadow-sm hover-shadow outline-none transition-all"
                />
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <button
                    type="submit"
                    className="bg-(--color-primary) text-white hover:bg-(--color-primary-hover) font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    Search
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Quick action buttons & links */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-14">
              <Link to="/browse">
                <button
                  type="button"
                  className="bg-(--color-surface-alt) hover:bg-(--color-surface) text-(--color-text-primary) border border-(--color-border) hover:border-(--color-primary) font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-sm hover-shadow"
                >
                  Browse Archive <ArrowRight size={15} className="text-(--color-primary)" />
                </button>
              </Link>
              <Link
                to="/about"
                className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors px-2 py-1"
              >
                How it works
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-3xl mx-auto pt-4 border-t border-(--color-border)"
            >
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-(--color-surface) border border-(--color-border) hover-shadow transition-all"
                >
                  <Icon size={18} className="text-(--color-primary) mb-1.5" />
                  <p className="text-xl sm:text-2xl font-black text-(--color-text-primary)">{value}</p>
                  <p className="text-[11px] text-(--color-text-muted) font-medium text-center">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── EXPLORE THE ARCHIVE (Browse Section) ─── */}
      <section className="w-full py-16 md:py-24 border-t border-(--color-border) bg-(--color-surface-alt)/40">
        <div className="container max-w-6xl">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-(--color-text-primary) tracking-tight">
              Explore the Archive
            </h2>
            <p className="text-sm sm:text-base text-(--color-text-secondary) mt-1.5">
              Navigate through our meticulously organized academic hierarchy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EXPLORE_CARDS.map(({ title, desc, icon: Icon, href, badge }) => (
              <Link
                key={title}
                to={href}
                className="group bg-(--color-surface) border border-(--color-border) rounded-xl p-6 transition-all hover-shadow flex flex-col items-start h-full hover:border-(--color-primary)"
              >
                <div className="w-12 h-12 rounded-xl bg-(--color-primary-muted) flex items-center justify-center mb-5 text-(--color-primary) group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
                <div className="w-full flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-(--color-text-primary) group-hover:text-(--color-primary) transition-colors">
                    {title}
                  </h3>
                  <span className="text-[10px] font-semibold text-(--color-text-muted) bg-(--color-surface-alt) px-2 py-0.5 rounded border border-(--color-border)">
                    {badge}
                  </span>
                </div>
                <p className="text-xs text-(--color-text-secondary) leading-relaxed mt-auto">
                  {desc}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-(--color-primary) mt-4 pt-3 border-t border-(--color-border) w-full group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BROWSE BY LEVEL SECTION ─── */}
      <section id="levels" className="w-full py-16 md:py-20 border-t border-(--color-border) bg-(--color-surface)/60">
        <div className="container max-w-5xl text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-(--color-text-primary) mb-2">
            Browse by Level
          </h2>
          <p className="text-sm text-(--color-text-secondary) mb-8 max-w-lg mx-auto">
            Directly access past questions tailored to your academic standing.
          </p>

          <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4">
            {LEVELS.map(({ label, level, desc }) => (
              <Link
                key={label}
                to={`/level/computer-science/${level}`}
                className="group bg-(--color-surface) border border-(--color-border) rounded-xl px-7 py-4 font-bold text-lg sm:text-xl text-(--color-text-primary) hover:border-(--color-primary) hover:text-(--color-primary) hover:bg-(--color-primary-muted) transition-all hover-shadow min-w-30 sm:min-w-35 text-center flex flex-col items-center"
              >
                <span>{label}</span>
                <span className="text-[11px] font-normal text-(--color-text-muted) group-hover:text-(--color-primary) mt-0.5">
                  {desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RECENTLY ADDED SECTION ─── */}
      <section className="w-full py-16 md:py-24 border-t border-(--color-border)">
        <div className="container max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-(--color-border) gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-(--color-text-primary)">
                Recently Added Questions
              </h2>
              <p className="text-xs sm:text-sm text-(--color-text-secondary) mt-1">
                Latest examination documents verified and uploaded to the archive.
              </p>
            </div>
            <Link
              to="/browse"
              className="text-xs sm:text-sm font-semibold text-(--color-primary) hover:underline flex items-center gap-1.5 self-start sm:self-auto"
            >
              View All Questions <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

      {/* ─── FINAL CTA SECTION ─── */}
      <section className="w-full py-16 md:py-24 bg-(--color-surface-alt) border-t border-(--color-border) text-center relative overflow-hidden">
        <div className="orb orb-primary absolute -bottom-20 -left-20 w-64 h-64 opacity-15" aria-hidden="true" />
        <div className="container max-w-3xl relative z-10">
          <div className="w-12 h-12 rounded-full bg-(--color-primary-muted) text-(--color-primary) flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={24} />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-(--color-text-primary) mb-4 tracking-tight">
            Your next exam preparation starts here.
          </h2>
          <p className="text-sm sm:text-base text-(--color-text-secondary) mb-8 max-w-lg mx-auto leading-relaxed">
            Join thousands of students utilizing ArchiveX for academic excellence and top grade performance.
          </p>
          <Link to="/browse">
            <button
              type="button"
              className="bg-(--color-primary) text-white hover:bg-(--color-primary-hover) font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer active:scale-95 inline-flex items-center gap-2"
            >
              Access the Archive Now <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
