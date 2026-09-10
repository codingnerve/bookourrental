import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  /** Extra content rendered under the intro — stats, meta rows, actions. */
  children?: ReactNode;
  id?: string;
}

/**
 * The dark opening band shared by every inner page, so /about, /contact and
 * /faq read as one product rather than three separate templates.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
  id = "page-heading",
}: PageHeaderProps) {
  return (
    <section
      aria-labelledby={id}
      className="surface-dark bg-ink pt-32 pb-16 lg:pt-40 lg:pb-20"
    >
      <div className="shell">
        {/* Kept in its own block: `.eyebrow` is inline-flex and would otherwise
            share a line with this link. */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md text-[0.8125rem] font-bold text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>

        <p className="eyebrow mt-8 text-white/60">{eyebrow}</p>

        <h1
          id={id}
          className="display-lg mt-5 max-w-3xl text-balance text-white"
        >
          {title}
        </h1>

        {intro ? (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70">
            {intro}
          </p>
        ) : null}

        {children}
      </div>
    </section>
  );
}
