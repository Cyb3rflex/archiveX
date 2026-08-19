import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Briefcase, BookOpen, FlaskConical, ArrowRight } from 'lucide-react';

const ICONS = {
  cpu: Cpu,
  briefcase: Briefcase,
  book: BookOpen,
  flask: FlaskConical,
};

const COLOR_MAP = {
  primary: {
    icon: 'bg-(--color-primary-muted) text-(--color-primary)',
    badge: 'bg-(--color-primary-muted) text-(--color-primary)',
    border: 'hover:border-(--color-primary)',
    glow: 'hover:shadow-(--shadow-glow-primary)',
  },
  accent: {
    icon: 'bg-(--color-accent-muted) text-(--color-accent)',
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
          'flex flex-col gap-4 p-6 rounded-lg',
          'bg-(--color-surface) border border-(--color-border)',
          'transition-all duration-(--transition-base) group',
          colors.border, colors.glow,
        ].join(' ')}
        aria-label={`Browse ${faculty.name}`}
      >
        {/* Icon */}
        <div className={`w-12 h-12 rounded-md flex items-center justify-center shrink-0 ${colors.icon}`}>
          <Icon size={22} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-bold text-(--color-text-primary) text-base mb-1 leading-snug group-hover:text-(--color-primary) transition-colors">
            {faculty.name}
          </h3>
          <p className="text-xs text-(--color-text-secondary) leading-relaxed line-clamp-2">
            {faculty.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-(--radius-full) ${colors.badge}`}>
            {faculty.departmentCount} Departments
          </span>
          <ArrowRight size={16} className="text-(--color-text-muted) group-hover:text-(--color-primary) group-hover:translate-x-1 transition-all duration-(--transition-fast)" />
        </div>
      </Link>
    </motion.div>
  );
}
