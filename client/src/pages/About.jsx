import { motion } from 'framer-motion';
import { Archive, Search, Download, BookOpen, Zap, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OpenBook, LibraryShelf, BookStack, GraduationCap as GraduationCapSVG } from '../components/illustrations/BookIllustration';

const STEPS = [
  {
    icon: Search,
    step: '01',
    title: 'Browse',
    desc: 'Navigate seamlessly through faculties, departments, levels, and semesters.',
  },
  {
    icon: BookOpen,
    step: '02',
    title: 'Find',
    desc: 'Locate the exact course code or title you need with verified past exam questions.',
  },
  {
    icon: Download,
    step: '03',
    title: 'Download',
    desc: 'Download the PDF documents directly to your device — free, fast, and instant.',
  },
];

const TECH = [
  'React 19',
  'Vite',
  'Tailwind CSS v4',
  'Framer Motion',
  'React Router',
  'Lucide Icons',
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <main>
      <div className="container py-16 md:py-24 max-w-4xl">
        {/* Hero */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate="show"
          className="text-center mb-16 relative"
        >
          {/* Floating illustrations */}
          <div className="hidden md:block absolute top-0 left-0 animate-float" aria-hidden="true">
            <OpenBook size={80} style={{ opacity: 0.4 }} />
          </div>
          <div className="hidden md:block absolute top-4 right-0 animate-float-2" aria-hidden="true">
            <BookStack size={90} style={{ opacity: 0.4 }} />
          </div>

          <motion.div variants={fadeUp}>
            <div className="inline-flex w-20 h-20 rounded-2xl bg-linear-to-br from-(--color-accent) to-(--color-primary) items-center justify-center mb-6 shadow-(--shadow-glow-primary)">
              <Archive size={36} className="text-white" />
            </div>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-extrabold text-(--color-text-primary) mb-5 tracking-tight"
          >
            About <span className="gradient-text">ArchiveX</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-(--color-text-secondary) text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            ArchiveX is an open, student-focused platform built to make university examination past questions
            and course materials readily accessible to everyone with academic precision.
          </motion.p>
        </motion.div>

        {/* How it works */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-(--color-text-primary) mb-2">
              How It Works
            </h2>
            <p className="text-sm text-(--color-text-secondary)">
              Three straightforward steps to exam preparation success.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {STEPS.map(({ icon: Icon, step, title, desc }) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="glass3d bg-(--color-surface)/70 flex flex-col items-center text-center p-8 rounded-2xl"
              >
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-full bg-(--color-primary-muted) flex items-center justify-center">
                    <Icon size={26} className="text-(--color-primary)" />
                  </div>
                  <span className="absolute -top-1 -right-1 text-xs font-black text-(--color-primary) bg-(--color-surface) border border-(--color-primary) rounded-full w-6 h-6 flex items-center justify-center">
                    {step}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-(--color-text-primary) mb-2">{title}</h3>
                <p className="text-xs sm:text-sm text-(--color-text-secondary) leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="mb-20 glass3d bg-(--color-surface)/70 p-8 sm:p-10 rounded-2xl">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-(--color-accent-muted) flex items-center justify-center shrink-0">
              <GraduationCapSVG size={64} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-(--color-text-primary) mb-3">
                Our Academic Mission
              </h2>
              <p className="text-sm sm:text-base text-(--color-text-secondary) leading-relaxed mb-6">
                Past question papers should not be scattered across disconnected group chats or locked behind
                unnecessary paywalls. ArchiveX maintains a centralized, indexed database so students can study
                effectively and prepare for exams with confidence.
              </p>
              <Link to="/browse">
                <button
                  type="button"
                  className="bg-(--color-primary) text-(--color-on-primary) hover:bg-(--color-primary-hover) font-semibold text-sm px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-(--shadow-sm)"
                >
                  Start Exploring Archive <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats illustration */}
        <section className="mb-20 text-center">
          <div className="glass3d bg-(--color-surface)/60 rounded-2xl p-8 sm:p-12">
            <LibraryShelf size={140} className="mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-(--color-text-primary) mb-2">
              A Growing Library
            </h2>
            <p className="text-sm text-(--color-text-secondary) max-w-lg mx-auto">
              Every semester, new past questions are verified and added to the archive — building the largest open collection for students.
            </p>
          </div>
        </section>

        {/* Built with */}
        <section className="text-center pt-4 border-t border-(--color-border)">
          <h3 className="text-sm font-semibold text-(--color-text-muted) uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
            <Zap size={15} className="text-(--color-primary)" /> Built Modern & Fast With
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {TECH.map((t) => (
              <span
                key={t}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-(--color-surface) border border-(--color-border) text-(--color-text-secondary)"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
