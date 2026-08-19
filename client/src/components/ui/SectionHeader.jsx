import { Link } from 'react-router-dom';

export default function SectionHeader({ title, subtitle, href, hrefLabel = 'View all', className = '' }) {
  return (
    <div className={`flex items-end justify-between gap-4 mb-6 ${className}`}>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-(--color-text-primary) leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-(--color-text-secondary)">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          to={href}
          className="shrink-0 text-sm font-medium text-(--color-primary) hover:text-(--color-primary-hover) transition-colors duration-(--transition-fast) underline-offset-4 hover:underline"
        >
          {hrefLabel} →
        </Link>
      )}
    </div>
  );
}
