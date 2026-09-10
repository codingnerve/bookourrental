import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  /** Optional trailing control, e.g. a "view all" link. */
  action?: ReactNode;
  tone?: "light" | "dark";
  id?: string;
}

/**
 * The shared opening move for every major section: a volt hairline eyebrow,
 * an editorial headline, and an optional trailing action on wide screens.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  tone = "light",
  id,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div
      data-reveal
      className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
    >
      <div className="max-w-2xl">
        <p className={`eyebrow ${dark ? "text-white/60" : "text-muted"}`}>
          {eyebrow}
        </p>
        <h2
          id={id}
          className={`display-lg mt-5 text-balance ${dark ? "text-white" : "text-ink"}`}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={`mt-5 max-w-xl text-[1.0625rem] leading-relaxed ${
              dark ? "text-white/65" : "text-muted"
            }`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
