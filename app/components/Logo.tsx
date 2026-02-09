export function ShieldIcon({ size = 36 }: { size?: number }) {
  const scale = size / 56;
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform={`scale(${1})`}>
        <path d="M28 4 L48 12 L48 28 C48 40 38 48 28 52 C18 48 8 40 8 28 L8 12 Z" fill="#1a56db"/>
        <rect x="17" y="16" width="12" height="16" rx="2" fill="#fff" opacity="0.5"/>
        <rect x="22" y="20" width="12" height="16" rx="2" fill="#fff" opacity="0.85"/>
        <path d="M30 30 L36 26 L36 34 Z" fill="#1a56db"/>
      </g>
    </svg>
  );
}

export function LogoFull({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const textColor = variant === 'dark' ? '#fff' : '#111';
  return (
    <svg width="200" height="56" viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 4 L48 12 L48 28 C48 40 38 48 28 52 C18 48 8 40 8 28 L8 12 Z" fill="#1a56db"/>
      <rect x="17" y="16" width="12" height="16" rx="2" fill="#fff" opacity="0.5"/>
      <rect x="22" y="20" width="12" height="16" rx="2" fill="#fff" opacity="0.85"/>
      <path d="M30 30 L36 26 L36 34 Z" fill="#1a56db"/>
      <text x="60" y="29" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="22" fill={textColor} letterSpacing="-0.5">PDF</text>
      <text x="104" y="29" fontFamily="Outfit, sans-serif" fontWeight="600" fontSize="22" fill="#1a56db" letterSpacing="-0.5">Merger</text>
      <text x="60" y="44" fontFamily="DM Sans, sans-serif" fontWeight="400" fontSize="9" fill="#888" letterSpacing="1.5">SECURE · PRIVATE · FREE</text>
    </svg>
  );
}

export function Favicon() {
  return (
    <svg width="40" height="40" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="56" height="56" rx="14" fill="#1a56db"/>
      <path d="M28 8 L44 14 L44 28 C44 38 36 44 28 48 C20 44 12 38 12 28 L12 14 Z" fill="rgba(255,255,255,0.15)"/>
      <rect x="18" y="17" width="11" height="15" rx="2" fill="#fff" opacity="0.5"/>
      <rect x="23" y="21" width="11" height="15" rx="2" fill="#fff" opacity="0.9"/>
      <path d="M30 30 L35 27 L35 33 Z" fill="#1a56db"/>
    </svg>
  );
}
