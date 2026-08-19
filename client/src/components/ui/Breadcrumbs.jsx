import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * @param {{ items: Array<{ label: string, href?: string }> }} props
 */
export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={idx} className="flex items-center gap-1">
            {idx > 0 && (
              <ChevronRight
                size={14}
                className="text-(--color-text-muted) shrink-0"
                aria-hidden="true"
              />
            )}
            {isLast || !item.href ? (
              <span
                className={[
                  'text-sm font-medium',
                  isLast
                    ? 'text-(--color-text-primary)'
                    : 'text-(--color-text-muted)',
                ].join(' ')}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="text-sm font-medium text-(--color-text-secondary) hover:text-(--color-primary) transition-colors duration-(--transition-fast)"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
