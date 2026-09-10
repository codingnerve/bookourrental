import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { featuredDeal } from "@/data/site";

export function Deals() {
  return (
    <section
      id="deals"
      aria-labelledby="deals-heading"
      className="shell scroll-mt-28 py-24 lg:py-32"
    >
      <div
        data-reveal
        className="surface-dark relative isolate overflow-hidden rounded-[var(--radius-tile)] bg-ink"
      >
        <Image
          src={featuredDeal.image}
          alt={featuredDeal.imageAlt}
          fill
          sizes="(min-width: 1280px) 78rem, 96vw"
          className="-z-20 object-cover object-[70%_center]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/92 via-ink/75 to-ink/55 lg:bg-gradient-to-r lg:from-ink lg:via-ink/85 lg:to-transparent"
        />

        <div className="relative grid grid-cols-1 gap-10 p-7 sm:p-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:p-16">
          <div>
            <span className="inline-flex items-center rounded-full bg-volt px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.16em] text-ink uppercase">
              {featuredDeal.eyebrow}
            </span>

            <h2
              id="deals-heading"
              className="display-lg mt-7 max-w-xl text-balance text-white"
            >
              {featuredDeal.title}
            </h2>

            <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-white/70">
              {featuredDeal.body}
            </p>

            <Link
              href={featuredDeal.ctaHref}
              className="group mt-9 inline-flex items-center gap-2.5 rounded-[16px] bg-volt px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-ink transition-colors duration-200 hover:bg-volt-deep"
            >
              {featuredDeal.ctaLabel}
              <ArrowRight
                className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Conditions, stated plainly rather than as a headline promise */}
          <div className="lg:justify-self-end lg:self-end">
            <div className="rounded-[18px] border border-white/15 bg-ink/70 p-6 backdrop-blur-md sm:p-7 lg:max-w-sm">
              <h3 className="text-[0.6875rem] font-bold tracking-[0.18em] text-white/55 uppercase">
                How the offer works
              </h3>
              <ul className="mt-5 space-y-4">
                {featuredDeal.terms.map((term) => (
                  <li key={term} className="flex gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-volt"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-white/75">
                      {term}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
