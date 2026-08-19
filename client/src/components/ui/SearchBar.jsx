import { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search courses, past questions…',
  autoFocus = false,
  className = '',
  id = 'search-bar',
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search icon */}
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-text-muted) pointer-events-none"
        aria-hidden="true"
      />

      <input
        ref={inputRef}
        id={id}
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className={[
          'w-full h-12 pl-11 pr-10',
          'bg-(--color-surface) border border-(--color-border)',
          'rounded-lg text-sm text-(--color-text-primary)',
          'placeholder:text-(--color-text-muted)',
          'outline-none transition-all duration-(--transition-fast)',
          'focus:border-(--color-primary) focus:shadow-[0_0_0_3px_var(--color-primary-muted)]',
          '[&::-webkit-search-cancel-button]:hidden',
        ].join(' ')}
      />

      {/* Clear button */}
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-sm text-(--color-text-muted) hover:text-(--color-text-primary) hover:bg-(--color-surface-alt) transition-colors"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
