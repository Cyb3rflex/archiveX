import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Scale, AlertTriangle, CheckCircle, UserCheck, Mail, ArrowLeft } from 'lucide-react';

const SECTIONS = [
  {
    icon: CheckCircle,
    title: '1. Acceptance of Terms',
    body: (
      <p>
        By accessing or using ArchiveX, you confirm that you have read, understood, and agree to be bound by
        these Terms of Service. If you do not agree, you must discontinue use of the platform immediately.
        These terms apply to all visitors, users, and others who access the service.
      </p>
    ),
  },
  {
    icon: UserCheck,
    title: '2. User Accounts',
    body: (
      <>
        <p>When creating an account on ArchiveX, you agree to:</p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Provide accurate, current, and complete information during registration.</li>
          <li>Maintain the security of your password and identification.</li>
          <li>Promptly notify us of any unauthorized use of your account.</li>
          <li>Accept responsibility for all activities that occur under your account.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Scale,
    title: '3. Acceptable Use',
    body: (
      <>
        <p>You agree <strong className="text-(--color-text-primary)">not</strong> to:</p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Upload content you do not have the right to share or that infringes on third-party intellectual property.</li>
          <li>Use ArchiveX for any unlawful purpose or in violation of any applicable laws or regulations.</li>
          <li>Attempt to gain unauthorized access to any portion of the platform, other accounts, or computer systems.</li>
          <li>Use bots, scrapers, or automated tools to mass-download content or disrupt service.</li>
          <li>Republish, redistribute, or commercially exploit archive content without explicit written permission.</li>
          <li>Upload malicious code, viruses, or any content designed to interfere with the platform.</li>
        </ul>
      </>
    ),
  },
  {
    icon: FileText,
    title: '4. Content Ownership & Licensing',
    body: (
      <p>
        Past questions and study materials uploaded to ArchiveX remain the property of their original
        copyright holders. By uploading content, you grant ArchiveX a non-exclusive, worldwide, royalty-free
        license to store, display, and distribute the content for the purpose of operating the platform. You
        confirm that you have the legal right to share any content you upload, or that the content is in the
        public domain.
      </p>
    ),
  },
  {
    icon: AlertTriangle,
    title: '5. Disclaimer of Warranties',
    body: (
      <p>
        ArchiveX is provided on an "as is" and "as available" basis. We make no warranties, expressed or
        implied, regarding the accuracy, completeness, or reliability of any content on the platform. Past
        questions are provided for educational purposes only, and we do not guarantee exam outcomes or
        academic results. Use of the platform is at your sole risk.
      </p>
    ),
  },
  {
    title: '6. Limitation of Liability',
    body: (
      <p>
        To the maximum extent permitted by law, ArchiveX and its operators shall not be liable for any
        indirect, incidental, special, consequential, or punitive damages — including but not limited to
        loss of data, academic outcomes, or goodwill — arising from your use of the platform.
      </p>
    ),
  },
  {
    title: '7. Termination',
    body: (
      <p>
        We reserve the right to suspend or terminate your account at any time, with or without notice, for
        conduct that violates these Terms or is otherwise harmful to other users or the platform. You may
        also delete your account at any time by contacting our support team.
      </p>
    ),
  },
  {
    title: '8. Governing Law',
    body: (
      <p>
        These Terms shall be governed and construed in accordance with applicable laws, without regard to
        conflict of law provisions. Any disputes arising from these Terms will be resolved through good-faith
        negotiation, and failing that, through binding arbitration or the courts of competent jurisdiction.
      </p>
    ),
  },
  {
    title: '9. Changes to These Terms',
    body: (
      <p>
        We may revise these Terms of Service from time to time. Material changes will be communicated via
        the platform or by email where appropriate. The "Last updated" date will reflect the most recent
        revision. Continued use of ArchiveX after such changes indicates your acceptance of the new terms.
      </p>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TermsOfService() {
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
            Terms of <span className="gradient-text">Service</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-sm text-(--color-text-muted)"
          >
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.p>
        </motion.div>

        {/* Intro card */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass3d bg-(--color-surface)/70 p-6 sm:p-8 rounded-2xl mb-10"
        >
          <p className="text-sm sm:text-base text-(--color-text-secondary) leading-relaxed">
            Welcome to ArchiveX. These Terms of Service govern your access to and use of our platform,
            including any content, functionality, and features offered through archive-x-eight.vercel.app or
            related domains. Please read them carefully before using the service.
          </p>
        </motion.section>

        {/* Sections */}
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
          <h3 className="text-lg font-bold text-(--color-text-primary) mb-2">Need clarification?</h3>
          <p className="text-sm text-(--color-text-secondary) mb-4">
            If any part of these terms is unclear, our team is happy to help.
          </p>
          <a
            href="mailto:legal@archivex.app"
            className="inline-flex items-center gap-2 bg-(--color-primary) text-(--color-on-primary) hover:bg-(--color-primary-hover) font-semibold text-sm px-5 py-2.5 rounded-lg transition-all shadow-(--shadow-sm)"
          >
            <Mail size={14} /> legal@archivex.app
          </a>
        </motion.section>
      </div>
    </main>
  );
}
