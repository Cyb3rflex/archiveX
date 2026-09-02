import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scale, BookOpen, Copyright, Ban, CheckCircle, AlertCircle, Mail, ArrowLeft } from 'lucide-react';

const GUIDELINES = [
  {
    type: 'allowed',
    icon: CheckCircle,
    title: 'Personal Study',
    desc: 'Downloading and reviewing past questions for your own exam preparation.',
  },
  {
    type: 'allowed',
    icon: CheckCircle,
    title: 'Group Study',
    desc: 'Sharing downloaded materials with classmates in an educational, non-commercial context.',
  },
  {
    type: 'allowed',
    icon: CheckCircle,
    title: 'Citation in Academic Work',
    desc: 'Quoting or referencing past questions in research, lessons, or study groups with proper attribution.',
  },
  {
    type: 'allowed',
    icon: CheckCircle,
    title: 'Educational Discussion',
    desc: 'Discussing question content with peers, tutors, or educators in a learning environment.',
  },
  {
    type: 'prohibited',
    icon: Ban,
    title: 'Commercial Resale',
    desc: 'Selling, repackaging, or redistributing ArchiveX content for monetary gain is strictly prohibited.',
  },
  {
    type: 'prohibited',
    icon: Ban,
    title: 'Mass Scraping',
    desc: 'Using bots, scripts, or automated tools to systematically download large portions of the archive.',
  },
  {
    type: 'prohibited',
    icon: Ban,
    title: 'Misrepresentation',
    desc: 'Claiming authorship or ownership of any content sourced from ArchiveX.',
  },
  {
    type: 'prohibited',
    icon: Ban,
    title: 'Re-uploading to Competing Platforms',
    desc: 'Mirroring ArchiveX content to other commercial exam-prep services without permission.',
  },
];

const SECTIONS = [
  {
    icon: BookOpen,
    title: '1. Purpose of This Policy',
    body: (
      <p>
        ArchiveX exists to support students preparing for university examinations. Our Fair Use Policy
        defines the boundaries between legitimate educational use and exploitation that harms the platform,
        its contributors, and the broader academic community.
      </p>
    ),
  },
  {
    icon: Copyright,
    title: '2. Copyright & Attribution',
    body: (
      <>
        <p>
          All past questions and study materials hosted on ArchiveX are the intellectual property of their
          respective owners — typically the universities, departments, or lecturers who authored them. Where
          known, original sources are credited on the resource page.
        </p>
        <p className="mt-3">
          Under principles of fair use, ArchiveX provides access to materials for educational study. If you
          are a copyright holder and wish to have specific content removed or properly attributed, please
          contact our DMCA team and we will respond promptly.
        </p>
      </>
    ),
  },
  {
    icon: Scale,
    title: '3. Reporting Violations',
    body: (
      <>
        <p>
          If you encounter content that violates this Fair Use Policy — including unauthorized commercial
          use, plagiarism, or copyright infringement — please report it to us. We investigate every
          credible report and take appropriate action, which may include:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Removing infringing content from the platform.</li>
          <li>Suspending or terminating offending user accounts.</li>
          <li>Notifying the relevant authorities in cases of serious or repeated violations.</li>
        </ul>
      </>
    ),
  },
  {
    icon: AlertCircle,
    title: '4. Consequences of Abuse',
    body: (
      <p>
        Users who violate the Fair Use Policy may have their accounts suspended or permanently terminated
        without prior notice. ArchiveX reserves the right to take legal action where appropriate, including
        seeking damages for misuse of platform content. We also cooperate fully with universities and
        copyright holders who identify violations.
      </p>
    ),
  },
  {
    title: '5. Disclaimer',
    body: (
      <p>
        ArchiveX does not guarantee the accuracy, completeness, or currency of any past question or study
        material in the archive. Materials are provided for educational and reference purposes only and
        should not be relied upon as the sole source of exam preparation. Always cross-reference with your
        course syllabus and official university resources where available.
      </p>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FairUsePolicy() {
  return (
    <main>
      <div className="container py-16 md:py-20 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-(--color-text-secondary) hover:text-(--color-primary) transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>

        {/* Hero */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="show"
          className="text-center mb-12"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex w-16 h-16 rounded-2xl bg-linear-to-br from-(--color-accent) to-(--color-primary) items-center justify-center mb-5 shadow-(--shadow-glow-primary)"
          >
            <Scale size={28} className="text-white" />
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-extrabold text-(--color-text-primary) mb-3 tracking-tight"
          >
            Fair Use <span className="gradient-text">Policy</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-sm text-(--color-text-muted)"
          >
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.p>
        </motion.div>

        {/* Intro */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass3d bg-(--color-surface)/70 p-6 sm:p-8 rounded-2xl mb-10"
        >
          <p className="text-sm sm:text-base text-(--color-text-secondary) leading-relaxed">
            This Fair Use Policy outlines what you can and cannot do with the materials on ArchiveX. By
            using the platform, you agree to follow these guidelines, which help us keep the archive free,
            open, and sustainable for the entire student community.
          </p>
        </motion.section>

        {/* Quick reference: what's allowed / not allowed */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-(--color-text-primary) mb-5 text-center">
            Quick Reference
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {GUIDELINES.map(({ type, icon: Icon, title, desc }, idx) => {
              const isAllowed = type === 'allowed';
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className={`glass3d rounded-2xl p-5 flex items-start gap-3 ${
                    isAllowed
                      ? 'bg-(--color-success-muted, rgba(34,197,94,0.08)) border border-(--color-success, rgb(34 197 94))'
                      : 'bg-(--color-danger-muted, rgba(239,68,68,0.08)) border border-(--color-danger, rgb(239 68 68))'
                  }`}
                  style={{
                    backgroundColor: isAllowed
                      ? 'rgba(34,197,94,0.08)'
                      : 'rgba(239,68,68,0.08)',
                  }}
                >
                  <Icon
                    size={20}
                    className={`shrink-0 mt-0.5 ${isAllowed ? 'text-green-500' : 'text-red-500'}`}
                  />
                  <div>
                    <h3 className={`font-bold text-sm ${isAllowed ? 'text-green-500' : 'text-red-500'}`}>
                      {isAllowed ? 'Allowed' : 'Prohibited'}: {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-(--color-text-secondary) leading-relaxed mt-1">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Detailed sections */}
        <div className="space-y-6">
          {SECTIONS.map(({ icon: Icon, title, body }, idx) => (
            <motion.section
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass3d bg-(--color-surface)/60 p-6 sm:p-8 rounded-2xl"
            >
              <div className="flex items-start gap-4 mb-3">
                {Icon && (
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-(--color-primary-muted) flex items-center justify-center">
                    <Icon size={18} className="text-(--color-primary)" />
                  </div>
                )}
                <h2 className="text-lg sm:text-xl font-bold text-(--color-text-primary) leading-snug pt-1">
                  {title}
                </h2>
              </div>
              <div className="text-sm sm:text-base text-(--color-text-secondary) leading-relaxed pl-0 sm:pl-14">
                {body}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-10 glass3d bg-(--color-surface)/70 p-6 sm:p-8 rounded-2xl text-center"
        >
          <Mail size={28} className="text-(--color-primary) mx-auto mb-3" />
          <h3 className="text-lg font-bold text-(--color-text-primary) mb-2">Report a violation</h3>
          <p className="text-sm text-(--color-text-secondary) mb-4">
            Spotted content being misused? Our moderation team reviews every report within 48 hours.
          </p>
          <a
            href="mailto:dmca@archivex.app"
            className="inline-flex items-center gap-2 bg-(--color-primary) text-(--color-on-primary) hover:bg-(--color-primary-hover) font-semibold text-sm px-5 py-2.5 rounded-lg transition-all shadow-(--shadow-sm)"
          >
            <Mail size={14} /> dmca@archivex.app
          </a>
        </motion.section>
      </div>
    </main>
  );
}
