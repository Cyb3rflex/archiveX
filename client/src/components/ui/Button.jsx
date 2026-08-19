import React from 'react';
import { motion } from 'framer-motion';

const variantStyles = {
  primary: {
    base: 'text-white border-transparent',
    bg: 'bg-(--color-primary) hover:bg-(--color-primary-hover)',
    shadow: 'shadow-[0_0_16px_rgba(99,102,241,0.35)]',
  },
  secondary: {
    base: 'text-(--color-text-primary) border-(--color-border)',
    bg: 'bg-(--color-surface-alt) hover:bg-(--color-border)',
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
    bg: 'bg-(--color-error) hover:opacity-90',
    shadow: '',
  },
  accent: {
    base: 'text-white border-transparent',
    bg: 'bg-(--color-accent) hover:bg-(--color-accent-hover)',
    shadow: 'shadow-[0_0_16px_rgba(6,182,212,0.3)]',
  },
};

const sizeStyles = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
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
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      className={[
        'inline-flex items-center justify-center font-medium rounded-md border',
        'transition-all duration-(--transition-fast) cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        v.base, v.bg, v.shadow, s, className,
      ].join(' ')}
      {...rest}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && <span className="shrink-0">{iconRight}</span>}
    </motion.button>
  );
}
