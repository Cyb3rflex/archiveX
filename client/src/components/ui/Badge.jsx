const variantStyles = {
  default:  'bg-(--color-surface-alt) text-(--color-text-secondary) border-(--color-border)',
  primary:  'bg-(--color-primary-muted) text-(--color-primary) border-transparent',
  accent:   'bg-(--color-accent-muted) text-(--color-accent) border-transparent',
  success:  'bg-[rgba(16,185,129,0.12)] text-(--color-success) border-transparent',
  warning:  'bg-[rgba(245,158,11,0.12)] text-(--color-warning) border-transparent',
  error:    'bg-[rgba(239,68,68,0.12)] text-(--color-error) border-transparent',
};

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-(--radius-full)',
        'text-xs font-semibold tracking-wide border',
        variantStyles[variant] ?? variantStyles.default,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
