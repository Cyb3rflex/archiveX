import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookMarked } from 'lucide-react';

const LEVEL_COLORS = {
  100: 'bg-[rgba(16,185,129,0.12)] text-(--color-success)',
  200: 'bg-(--color-primary-muted) text-(--color-primary)',
  300: 'bg-[rgba(245,158,11,0.12)] text-(--color-warning)',
  400: 'bg-(--color-accent-muted) text-(--color-accent)',
};

export default function LevelCard({ level, departmentSlug, departmentName }) {
  const color = LEVEL_COLORS[level] ?? LEVEL_COLORS[200];

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Link
        to={`/level/${departmentSlug}/${level}`}
        className={[
          'flex flex-col items-center justify-center gap-3 p-6 rounded-lg',
          'bg-(--color-surface) border border-(--color-border) text-center',
          'hover:border-(--color-primary) hover:shadow-(--shadow-glow-primary)',
          'transition-all duration-(--transition-base) group',
        ].join(' ')}
        aria-label={`${level} Level — ${departmentName}`}
      >
        <div className={`w-12 h-12 rounded-(--radius-full) flex items-center justify-center ${color}`}>
          <BookMarked size={20} />
        </div>
        <div>
          <p className="text-2xl font-extrabold text-(--color-text-primary) group-hover:text-(--color-primary) transition-colors">
            {level}L
          </p>
          <p className="text-xs text-(--color-text-muted) mt-0.5">Level {level}</p>
        </div>
      </Link>
    </motion.div>
  );
}
