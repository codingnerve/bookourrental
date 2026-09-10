interface BrandMarkProps {
  /** On dark surfaces the tile flips to volt so the mark keeps its punch. */
  inverted?: boolean;
  className?: string;
}

/**
 * BookOurRental mark — a tachometer sweep with the needle rising through it.
 * Drawn as inline SVG so it inherits crisp rendering at every size.
 */
export function BrandMark({ inverted = false, className }: BrandMarkProps) {
  const tile = inverted ? "var(--color-volt)" : "var(--color-ink)";
  const arc = inverted ? "var(--color-ink)" : "var(--color-volt)";
  const needle = inverted ? "var(--color-ink)" : "#ffffff";

  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="9.5" fill={tile} />
      <path
        d="M7.75 21.25a8.25 8.25 0 0 1 16.5 0"
        fill="none"
        stroke={arc}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M16 21.25 21.4 12.9"
        fill="none"
        stroke={needle}
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity={inverted ? 0.55 : 0.9}
      />
      <circle cx="16" cy="21.25" r="1.9" fill={arc} />
    </svg>
  );
}

interface WordmarkProps {
  /** `light` renders navy type for use on pale surfaces. */
  tone?: "light" | "dark";
  className?: string;
}

export function Wordmark({ tone = "light", className }: WordmarkProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2.5 text-[1.0625rem] leading-none font-extrabold tracking-[-0.03em]",
        tone === "dark" ? "text-white" : "text-ink",
        className ?? "",
      ].join(" ")}
    >
      <BrandMark inverted={tone === "dark"} className="h-8 w-8 shrink-0" />
      <span>
        BookOur
        <span className={tone === "dark" ? "text-white/55" : "text-muted"}>
          Rental
        </span>
      </span>
    </span>
  );
}
