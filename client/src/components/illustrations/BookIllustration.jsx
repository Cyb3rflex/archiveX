/**
 * Inline SVG illustrations for ArchiveX.
 * No external assets — scalable, themeable via currentColor + CSS vars.
 */

export function BookCover({ size = 80, className = '', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="book-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-accent)" />
        </linearGradient>
      </defs>
      {/* Book shadow */}
      <ellipse cx="40" cy="72" rx="28" ry="3" fill="rgba(0,0,0,0.1)" />
      {/* Book back cover */}
      <rect x="10" y="14" width="60" height="56" rx="3" fill="url(#book-grad)" />
      {/* Pages */}
      <rect x="13" y="16" width="54" height="52" rx="1" fill="#fff" />
      <rect x="13" y="16" width="54" height="52" rx="1" fill="url(#book-grad)" opacity="0.1" />
      {/* Spine */}
      <rect x="10" y="14" width="6" height="56" fill="rgba(0,0,0,0.2)" />
      {/* Lines on page */}
      <rect x="22" y="26" width="36" height="2" rx="1" fill="var(--color-primary)" opacity="0.4" />
      <rect x="22" y="32" width="28" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3" />
      <rect x="22" y="38" width="32" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3" />
      <rect x="22" y="44" width="22" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3" />
      {/* Bookmark */}
      <path d="M52 14 L52 28 L56 24 L60 28 L60 14 Z" fill="var(--color-error)" />
    </svg>
  );
}

export function BookStack({ size = 120, className = '', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="book1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-accent)" />
        </linearGradient>
        <linearGradient id="book2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-secondary)" />
        </linearGradient>
        <linearGradient id="book3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-secondary)" />
          <stop offset="100%" stopColor="var(--color-primary)" />
        </linearGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="60" cy="108" rx="45" ry="4" fill="rgba(0,0,0,0.12)" />

      {/* Bottom book */}
      <rect x="15" y="78" width="90" height="22" rx="3" fill="url(#book3)" />
      <rect x="18" y="80" width="84" height="18" rx="1" fill="#fff" opacity="0.3" />
      <rect x="22" y="86" width="40" height="1.5" rx="1" fill="rgba(255,255,255,0.5)" />
      <rect x="22" y="90" width="28" height="1.5" rx="1" fill="rgba(255,255,255,0.5)" />

      {/* Middle book */}
      <rect x="20" y="58" width="80" height="20" rx="3" fill="url(#book2)" />
      <rect x="23" y="60" width="74" height="16" rx="1" fill="#fff" opacity="0.3" />

      {/* Top book */}
      <rect x="25" y="38" width="70" height="20" rx="3" fill="url(#book1)" />
      <rect x="28" y="40" width="64" height="16" rx="1" fill="#fff" opacity="0.4" />
      <rect x="32" y="46" width="30" height="1.5" rx="1" fill="rgba(255,255,255,0.7)" />

      {/* Standalone book on side */}
      <g transform="rotate(15 50 22)">
        <rect x="38" y="10" width="24" height="14" rx="2" fill="var(--color-error)" />
        <rect x="40" y="12" width="20" height="10" rx="1" fill="#fff" opacity="0.4" />
      </g>
    </svg>
  );
}

export function PDFDocument({ size = 64, className = '', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pdf-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#f5f5f5" />
        </linearGradient>
      </defs>
      {/* Document body with folded corner */}
      <path
        d="M8 4 L44 4 L56 16 L56 76 L8 76 Z"
        fill="url(#pdf-grad)"
        stroke="var(--color-border)"
        strokeWidth="1.2"
      />
      {/* Folded corner */}
      <path
        d="M44 4 L44 16 L56 16"
        fill="#e5e5e5"
        stroke="var(--color-border)"
        strokeWidth="1.2"
      />
      {/* PDF label */}
      <rect x="14" y="24" width="24" height="8" rx="1" fill="var(--color-error)" />
      <text
        x="26"
        y="30"
        textAnchor="middle"
        fontSize="6"
        fontWeight="900"
        fill="#fff"
        fontFamily="Inter, sans-serif"
      >
        PDF
      </text>
      {/* Content lines */}
      <rect x="14" y="38" width="34" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.4" />
      <rect x="14" y="44" width="28" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.4" />
      <rect x="14" y="50" width="32" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.4" />
      <rect x="14" y="56" width="22" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.4" />
      <rect x="14" y="62" width="30" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.4" />
    </svg>
  );
}

export function GraduationCap({ size = 100, className = '', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cap-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-accent)" />
        </linearGradient>
      </defs>
      {/* Cap top (mortarboard) */}
      <path
        d="M50 20 L90 35 L50 50 L10 35 Z"
        fill="url(#cap-grad)"
      />
      {/* Cap base */}
      <path
        d="M30 42 L30 60 Q30 65 50 65 Q70 65 70 60 L70 42"
        fill="var(--color-primary)"
        opacity="0.9"
      />
      {/* Tassel */}
      <path
        d="M88 35 L88 55"
        stroke="var(--color-accent)"
        strokeWidth="2"
      />
      <circle cx="88" cy="58" r="3" fill="var(--color-accent)" />
      {/* Diploma scroll */}
      <rect x="35" y="75" width="30" height="15" rx="2" fill="var(--color-accent)" />
      <rect x="40" y="78" width="20" height="1.5" fill="#fff" opacity="0.6" />
      <rect x="40" y="82" width="16" height="1.5" fill="#fff" opacity="0.6" />
    </svg>
  );
}

export function LibraryShelf({ size = 160, className = '', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="shelf-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-surface-alt)" />
          <stop offset="100%" stopColor="var(--color-surface-dim)" />
        </linearGradient>
      </defs>
      {/* Shelf wood */}
      <rect x="6" y="140" width="148" height="6" rx="2" fill="var(--color-primary)" opacity="0.5" />
      <rect x="6" y="80" width="148" height="6" rx="2" fill="var(--color-primary)" opacity="0.5" />
      <rect x="6" y="20" width="148" height="6" rx="2" fill="var(--color-primary)" opacity="0.5" />

      {/* Top shelf books */}
      <rect x="14" y="36" width="10" height="42" rx="1.5" fill="var(--color-primary)" />
      <rect x="26" y="30" width="8" height="48" rx="1.5" fill="var(--color-accent)" />
      <rect x="36" y="40" width="12" height="38" rx="1.5" fill="var(--color-secondary)" />
      <rect x="50" y="34" width="9" height="44" rx="1.5" fill="var(--color-error)" />
      <rect x="61" y="38" width="11" height="40" rx="1.5" fill="var(--color-primary)" />
      <rect x="74" y="32" width="9" height="46" rx="1.5" fill="var(--color-accent)" />
      <rect x="85" y="36" width="10" height="42" rx="1.5" fill="var(--color-secondary)" />
      <rect x="97" y="40" width="8" height="38" rx="1.5" fill="var(--color-primary)" />
      <rect x="107" y="34" width="12" height="44" rx="1.5" fill="var(--color-error)" />
      <rect x="121" y="38" width="9" height="40" rx="1.5" fill="var(--color-accent)" />
      <rect x="132" y="42" width="10" height="36" rx="1.5" fill="var(--color-secondary)" />

      {/* Middle shelf books */}
      <rect x="14" y="96" width="11" height="42" rx="1.5" fill="var(--color-accent)" />
      <rect x="27" y="92" width="9" height="46" rx="1.5" fill="var(--color-primary)" />
      <rect x="38" y="100" width="10" height="38" rx="1.5" fill="var(--color-error)" />
      <rect x="50" y="94" width="12" height="44" rx="1.5" fill="var(--color-secondary)" />
      <rect x="64" y="98" width="8" height="40" rx="1.5" fill="var(--color-accent)" />
      <rect x="74" y="92" width="10" height="46" rx="1.5" fill="var(--color-primary)" />
      <rect x="86" y="100" width="11" height="38" rx="1.5" fill="var(--color-secondary)" />
      <rect x="99" y="96" width="9" height="42" rx="1.5" fill="var(--color-error)" />
      <rect x="110" y="92" width="10" height="46" rx="1.5" fill="var(--color-accent)" />
      <rect x="122" y="100" width="9" height="38" rx="1.5" fill="var(--color-primary)" />
      <rect x="133" y="96" width="11" height="42" rx="1.5" fill="var(--color-secondary)" />

      {/* Book details (lines on spines) */}
      <line x1="18" y1="50" x2="20" y2="50" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
      <line x1="28" y1="44" x2="32" y2="44" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
      <line x1="40" y1="54" x2="44" y2="54" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

export function OpenBook({ size = 120, className = '', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="page-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#f5f5f5" />
        </linearGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="60" cy="105" rx="48" ry="3" fill="rgba(0,0,0,0.12)" />
      {/* Left page */}
      <path
        d="M10 30 Q10 25 15 25 L58 22 L58 95 L15 92 Q10 92 10 87 Z"
        fill="url(#page-grad)"
        stroke="var(--color-border)"
        strokeWidth="1"
      />
      {/* Right page */}
      <path
        d="M110 30 Q110 25 105 25 L62 22 L62 95 L105 92 Q110 92 110 87 Z"
        fill="url(#page-grad)"
        stroke="var(--color-border)"
        strokeWidth="1"
      />
      {/* Spine */}
      <line x1="60" y1="22" x2="60" y2="95" stroke="var(--color-border)" strokeWidth="0.5" />
      {/* Left page lines */}
      <line x1="20" y1="40" x2="50" y2="39" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="50" x2="48" y2="49" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="60" x2="50" y2="59" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="70" x2="44" y2="69" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="80" x2="48" y2="79" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.4" />
      {/* Right page lines */}
      <line x1="70" y1="40" x2="100" y2="39" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.4" />
      <line x1="70" y1="50" x2="98" y2="49" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.4" />
      <line x1="70" y1="60" x2="100" y2="59" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.4" />
      <line x1="70" y1="70" x2="94" y2="69" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.4" />
      <line x1="70" y1="80" x2="98" y2="79" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export function QuestionMarkBadge({ size = 60, className = '', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="30" cy="30" r="26" fill="var(--color-primary-muted)" />
      <circle cx="30" cy="30" r="22" fill="var(--color-primary)" />
      <text
        x="30"
        y="40"
        textAnchor="middle"
        fontSize="28"
        fontWeight="900"
        fill="#fff"
        fontFamily="Inter, sans-serif"
      >
        ?
      </text>
    </svg>
  );
}
