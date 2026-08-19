import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { getCourseCountByDept } from '../../data/mockData';

export default function DepartmentCard({ department }) {
  const courseCount = getCourseCountByDept(department.slug);

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Link
        to={`/department/${department.slug}`}
        className={[
          'flex items-start gap-4 p-5 rounded-lg',
          'bg-(--color-surface) border border-(--color-border)',
          'hover:border-(--color-primary) hover:shadow-(--shadow-glow-primary)',
          'transition-all duration-(--transition-base) group',
        ].join(' ')}
        aria-label={`View ${department.name} department`}
      >
        <div className="w-10 h-10 rounded-md bg-(--color-primary-muted) flex items-center justify-center shrink-0">
          <GraduationCap size={18} className="text-(--color-primary)" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-(--color-text-primary) text-sm leading-snug group-hover:text-(--color-primary) transition-colors">
                {department.name}
              </h3>
              <p className="text-xs text-(--color-text-muted) mt-0.5">{department.code}</p>
            </div>
            <ArrowRight size={15} className="text-(--color-text-muted) group-hover:text-(--color-primary) group-hover:translate-x-1 transition-all duration-(--transition-fast) shrink-0 mt-0.5" />
          </div>
          <p className="text-xs text-(--color-text-secondary) mt-2 line-clamp-2">{department.description}</p>
          <p className="text-xs font-medium text-(--color-text-muted) mt-2">{courseCount} courses</p>
        </div>
      </Link>
    </motion.div>
  );
}
