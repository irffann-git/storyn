function StorynLogo({ height = 36 }) {
  return (
    <svg
      height={height}
      viewBox="0 0 260 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Storyn"
    >
      {/* Book 3 (back) */}
      <rect x="0" y="28" width="58" height="10" rx="2" fill="#fed7aa" />
      {/* Book 2 (mid) */}
      <rect x="0" y="18" width="52" height="10" rx="2" fill="#fb923c" />
      {/* Book 1 (front) */}
      <rect x="0" y="8" width="62" height="12" rx="2" fill="#f97316" />
      {/* Spine */}
      <rect x="0" y="8" width="5" height="30" rx="1" fill="#ea580c" />
      {/* Page curl */}
      <path
        d="M62,8 C68,8 70,13 68,17 C66,13 64,10 62,8 Z"
        fill="#fff7ed"
        opacity="0.9"
      />

      {/* Wordmark */}
      <text
        x="70"
        y="33"
        fontFamily="Georgia, serif"
        fontSize="28"
        fontWeight="700"
        fill="#1a1a2e"
        letterSpacing="-0.5"
      >
        Storyn
      </text>

      {/* Dot + tagline */}
      <circle cx="72" cy="42" r="2" fill="#f97316" />
      <text
        x="78"
        y="45"
        fontFamily="sans-serif"
        fontSize="8"
        fontWeight="600"
        fill="#f97316"
        letterSpacing="2.5"
      >
        BOOKS
      </text>
    </svg>
  );
}

export default StorynLogo;