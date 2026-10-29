// The AmOS mark: three joined bubbles, drawn in code so it stays sharp at every size.
export function AmosMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 38" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="13" cy="26" r="9" />
      <circle cx="30" cy="12" r="10" />
      <circle cx="46" cy="27" r="9" />
      <circle cx="53.5" cy="7.5" r="4.5" />
    </svg>
  );
}

export function AmosLogo({ href, className = "" }: { href: string; className?: string }) {
  return (
    <a href={href} className={`am-logo ${className}`} aria-label="AmOS home">
      <AmosMark />
      <span>AmOS</span>
    </a>
  );
}
