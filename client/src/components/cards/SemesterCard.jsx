import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, BookOpen, ArrowRight } from 'lucide-react';

const SEMESTER_COLORS = {
  1: { bg: 'bg-(--color-primary-muted)', text: 'text-(--color-primary)', label: 'First Semester' },
  2: { bg: 'bg-(--color-accent-muted)',  text: 'text-(--color-accent)',  label: 'Second Semester' },
};

export default function SemesterCard({ semester, departmentSlug, level, courseCount }) {
  const colors = SEMESTER_COLORS[semester] ?? SEMESTER_COLORS[1];

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Link
        to={`/semester/${departmentSlug}/${level}/${semester}`}
        className={[
          'flex items-center gap-5 p-6 rounded-lg',
          'bg-(--color-surface) border border-(--color-border)',
          'hover:border-(--color-primary) hover:shadow-(--shadow-glow-primary)',
          'transition-all duration-(--transition-base) group',
        ].join(' ')}
        aria-label={`${colors.label} — ${courseCount} courses`}
      >
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${colors.bg}`}>
          <CalendarDays size={22} className={colors.text} />
        </div>
        <div className="flex-1">
          <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${colors.text}`}>Semester {semester}</p>
          <h3 className="font-bold text-(--color-text-primary) group-hover:text-(--color-primary) transition-colors">
            {colors.label}
          </h3>
          <p className="text-xs text-(--color-text-muted) mt-0.5 flex items-center gap-1">
            <BookOpen size={12} />
            {courseCount} courses
          </p>
        </div>
        <ArrowRight size={18} className="text-(--color-text-muted) group-hover:text-(--color-primary) group-hover:translate-x-1 transition-all" />
      </Link>
    </motion.div>
  );
}
