import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Database, Mail, ArrowLeft } from 'lucide-react';

const SECTIONS = [
  {
    icon: Database,
    title: '1. Information We Collect',
    body: (
      <>
        <p>
          ArchiveX is designed to minimize the personal information we collect. When you use our platform,
          we may collect the following limited categories of data:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>
            <strong className="text-(--color-text-primary)">Account Information:</strong> If you create an
            account, we collect your name, email address, and a securely hashed password.
          </li>
          <li>
            <strong className="text-(--color-text-primary)">Usage Data:</strong> Anonymous analytics such as
            pages visited, browser type, device type, and referring pages — used solely to improve service quality.
          </li>
          <li>
            <strong className="text-(--color-text-primary)">Uploaded Content:</strong> Past questions or study
            materials you voluntarily submit, along with metadata you provide (course code, faculty, year).
          </li>
          <li>
            <strong className="text-(--color-text-primary)">Cookies:</strong> Essential cookies for session
            management, theme preferences, and authentication.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Eye,
    title: '2. How We Use Your Information',
    body: (
      <>
        <p>We use the information we collect strictly to:</p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Operate, maintain, and improve the ArchiveX platform.</li>
          <li>Authenticate users and prevent abuse of uploaded content.</li>
          <li>Respond to support requests and direct user inquiries.</li>
          <li>Detect and prevent fraud, spam, or other prohibited activities.</li>
          <li>Comply with applicable legal obligations.</li>
        </ul>
        <p className="mt-3">
          We <strong className="text-(--color-text-primary)">never sell</strong> your personal information to
          third parties, advertisers, or data brokers.
        </p>
      </>
    ),
  },
  {
    icon: Lock,
    title: '3. Data Storage & Security',
    body: (
      <p>
        We employ industry-standard security measures — including HTTPS encryption, hashed passwords, and
        access-controlled databases — to protect your data. While no system is 100% secure, we continuously
        review and strengthen our safeguards. Data is stored with reputable cloud providers (such as Vercel,
        Supabase, or equivalent) that maintain strict physical and logical security controls.
      </p>
    ),
  },
  {
    icon: Shield,
    title: '4. Your Rights & Choices',
    body: (
      <>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your account and associated data.</li>
          <li>Opt out of non-essential cookies via your browser settings.</li>
          <li>Withdraw consent at any time where processing is based on consent.</li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, contact us at{' '}
          <a href="mailto:privacy@archivex.app" className="text-(--color-primary) hover:underline">
            privacy@archivex.app
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: '5. Children\'s Privacy',
    body: (
      <p>
        ArchiveX is intended for use by university students and is not directed at children under the age of
        13. We do not knowingly collect personal information from children. If you believe a child has
        provided us data, please contact us so we can delete it.
      </p>
    ),
  },
  {
    title: '6. Changes to This Policy',
    body: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices or for legal
        and regulatory reasons. The "Last updated" date at the top of this page will indicate when revisions
        were made. Continued use of ArchiveX after changes constitutes acceptance of the updated policy.
      </p>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PrivacyPolicy() {
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
            <Shield size={28} className="text-white" />
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-extrabold text-(--color-text-primary) mb-3 tracking-tight"
          >
            Privacy <span className="gradient-text">Policy</span>
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
            At ArchiveX, we respect your privacy and are committed to protecting your personal data. This
            Privacy Policy explains what information we collect, how we use it, and the rights you have over
            your data. By using ArchiveX, you agree to the practices described below.
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
          <h3 className="text-lg font-bold text-(--color-text-primary) mb-2">Questions about privacy?</h3>
          <p className="text-sm text-(--color-text-secondary) mb-4">
            Reach our data protection team and we'll get back to you promptly.
          </p>
          <a
            href="mailto:privacy@archivex.app"
            className="inline-flex items-center gap-2 bg-(--color-primary) text-(--color-on-primary) hover:bg-(--color-primary-hover) font-semibold text-sm px-5 py-2.5 rounded-lg transition-all shadow-(--shadow-sm)"
          >
            <Mail size={14} /> privacy@archivex.app
          </a>
        </motion.section>
      </div>
    </main>
  );
}
