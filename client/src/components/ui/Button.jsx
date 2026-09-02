import { motion } from 'framer-motion';

const variantStyles = {
  primary: {
    base: 'text-(--color-on-primary) border-transparent',
    bg: 'bg-(--color-primary) hover:bg-(--color-primary-hover)',
    shadow: '',
  },
  secondary: {
    base: 'text-(--color-text-primary) border-(--color-border)',
    bg: 'bg-(--color-surface-alt) hover:bg-(--color-surface-dim)',
    shadow: '',
  },
  outline: {
    base: 'text-(--color-primary) border-(--color-primary)',
    bg: 'bg-transparent hover:bg-(--color-primary-muted)',
    shadow: '',
  },
  ghost: {
    base: 'text-(--color-text-secondary) border-transparent',
    bg: 'bg-transparent hover:bg-(--color-surface-alt) hover:text-(--color-text-primary)',
    shadow: '',
  },
  danger: {
    base: 'text-white border-transparent',
    bg: 'bg-(--color-error) hover:bg-(--color-error-hover)',
    shadow: '',
  },
  accent: {
    base: 'text-(--color-on-accent) border-transparent',
    bg: 'bg-(--color-accent) hover:bg-(--color-accent-hover)',
    shadow: 'shadow-[0_0_16px_rgba(129,140,248,0.3)]',
  },
  success: {
    base: 'text-white border-transparent',
    bg: 'bg-(--color-success) hover:bg-(--color-success-hover)',
    shadow: '',
  },
};

const sizeStyles = {
  xs: 'h-7 px-2.5 text-[11px] gap-1',
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
  xl: 'h-14 px-8 text-base gap-3',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  onClick,
  ...rest
}) {
  const v = variantStyles[variant] ?? variantStyles.primary;
  const s = sizeStyles[size] ?? sizeStyles.md;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      className={[
        'inline-flex items-center justify-center font-medium rounded-lg border',
        'transition-colors duration-200 cursor-pointer select-none',
        'disabled:opacity-45 disabled:cursor-not-allowed disabled:transform-none',
        v.base, v.bg, v.shadow, s, className,
      ].join(' ')}
      {...rest}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        <span className="shrink-0" aria-hidden="true">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && <span className="shrink-0" aria-hidden="true">{iconRight}</span>}
    </motion.button>
  );
}
