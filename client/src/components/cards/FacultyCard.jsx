import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Briefcase, BookOpen, FlaskConical, ArrowRight } from 'lucide-react';
import { BookCover } from '../illustrations/BookIllustration';

const ICONS = {
  cpu: Cpu,
  briefcase: Briefcase,
  book: BookOpen,
  flask: FlaskConical,
};

const COLOR_MAP = {
  primary: {
    badge: 'bg-(--color-primary-muted) text-(--color-primary)',
    border: 'hover:border-(--color-primary)',
    glow: 'hover:shadow-(--shadow-glow-primary)',
  },
  accent: {
    badge: 'bg-(--color-accent-muted) text-(--color-accent)',
    border: 'hover:border-(--color-accent)',
    glow: 'hover:shadow-(--shadow-glow-accent)',
  },
};

export default function FacultyCard({ faculty }) {
  const Icon = ICONS[faculty.icon] ?? BookOpen;
  const colors = COLOR_MAP[faculty.color] ?? COLOR_MAP.primary;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/faculty/${faculty.slug}`}
        className={[
          'flex items-start gap-5 p-6 rounded-xl',
          'bg-(--color-surface) border border-(--color-border)',
          'transition-all duration-(--transition-base) group',
          colors.border, colors.glow,
        ].join(' ')}
        aria-label={`Browse ${faculty.name}`}
      >
        {/* Book cover illustration */}
        <div className="shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <BookCover size={72} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
              style={{
                background: faculty.color === 'accent'
                  ? 'var(--color-accent-muted)'
                  : 'var(--color-primary-muted)',
                color: faculty.color === 'accent'
                  ? 'var(--color-accent)'
                  : 'var(--color-primary)',
              }}
            >
              <Icon size={14} />
            </div>
            <h3 className="font-bold text-(--color-text-primary) text-base leading-snug group-hover:text-(--color-primary) transition-colors">
              {faculty.name}
            </h3>
          </div>
          <p className="text-xs text-(--color-text-secondary) leading-relaxed line-clamp-2 mb-3">
            {faculty.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}
            >
              {faculty.departmentCount} Departments
            </span>
            <ArrowRight
              size={16}
              className="text-(--color-text-muted) group-hover:text-(--color-primary) group-hover:translate-x-1 transition-all"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
