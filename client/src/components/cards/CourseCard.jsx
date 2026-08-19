import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';
import { getPQCountByCourse } from '../../data/mockData';

export default function CourseCard({ course }) {
  const pqCount = getPQCountByCourse(course.id);

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Link
        to={`/course/${course.slug}`}
        className={[
          'flex items-start gap-4 p-5 rounded-lg',
          'bg-(--color-surface) border border-(--color-border)',
          'hover:border-(--color-primary) hover:shadow-(--shadow-glow-primary)',
          'transition-all duration-(--transition-base) group',
        ].join(' ')}
        aria-label={`${course.code} — ${course.title}`}
      >
        <div className="w-10 h-10 rounded-md bg-(--color-surface-alt) flex items-center justify-center shrink-0">
          <FileText size={18} className="text-(--color-primary)" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <Badge variant="primary">{course.code}</Badge>
                <Badge variant="default">{course.units} units</Badge>
              </div>
              <h3 className="font-semibold text-sm text-(--color-text-primary) group-hover:text-(--color-primary) transition-colors line-clamp-2 leading-snug">
                {course.title}
              </h3>
            </div>
            <ArrowRight size={15} className="text-(--color-text-muted) group-hover:text-(--color-primary) group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
          </div>
          <p className="text-xs text-(--color-text-muted) mt-2">
            {pqCount} past question{pqCount !== 1 ? 's' : ''} available
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
