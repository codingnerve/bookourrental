import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { driveCategories, type DriveCategory } from "@/data/categories";

/** Footprints inside the 12-column editorial grid. */
const spanClasses: Record<DriveCategory["span"], string> = {
  feature: "lg:col-span-7 lg:row-span-2 min-h-[26rem] lg:min-h-[38rem]",
  standard: "lg:col-span-5 min-h-[20rem] lg:min-h-[18.25rem]",
  tall: "lg:col-span-5 lg:row-span-2 min-h-[20rem]",
  wide: "lg:col-span-12 min-h-[20rem] lg:min-h-[22rem]",
};

export function DriveCategories() {
  return (
    <section
      id="collections"
      aria-labelledby="collections-heading"
      className="surface-dark scroll-mt-28 bg-ink py-24 lg:py-32"
    >
      <div className="shell">
        <SectionHeading
          id="collections-heading"
          eyebrow="02 — Collections"
          title={
            <>
              Choose your <span className="mark-volt">drive.</span>
            </>
          }
          subtitle="Four ways to travel, each grouped around what the trip actually asks of a car."
          tone="dark"
        />

        <ul className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          {driveCategories.map((category, index) => (
            <li
              key={category.id}
              data-reveal
              style={
                { "--reveal-delay": `${index * 80}ms` } as React.CSSProperties
              }
              className={`relative ${spanClasses[category.span]}`}
            >
              <CategoryTile category={category} feature={category.span === "feature"} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CategoryTile({
  category,
  feature,
}: {
  category: DriveCategory;
  feature: boolean;
}) {
  return (
    <Link
      href={`/cars?collection=${category.id}`}
      className="group relative flex h-full flex-col justify-end overflow-hidden rounded-[var(--radius-tile)] bg-graphite p-6 sm:p-8"
    >
      <Image
        src={category.image}
        alt={category.imageAlt}
        fill
        sizes={feature ? "(min-width: 1024px) 58vw, 92vw" : "(min-width: 1024px) 42vw, 92vw"}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
      />

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink from-20% via-ink/85 to-ink/35 transition-colors duration-500 group-hover:via-ink/75"
      />

      <div className="relative flex items-end justify-between gap-6">
        <div className="min-w-0">
          <p className="text-[0.6875rem] font-bold tracking-[0.16em] text-volt uppercase">
            From ${category.fromPrice}/day
          </p>
          <h3
            className={`mt-3 font-extrabold tracking-[-0.035em] text-white ${
              feature ? "text-[2rem] lg:text-[2.75rem]" : "text-2xl lg:text-[1.75rem]"
            } leading-[1.05]`}
          >
            {category.title}
          </h3>
          <p
            className={`mt-3 text-sm leading-relaxed text-white/70 ${
              feature ? "max-w-md lg:text-base" : "max-w-sm"
            }`}
          >
            {category.blurb}
          </p>
          <p className="mt-4 text-[0.75rem] font-semibold tracking-[0.06em] text-white/45">
            {category.classes.join(" · ")}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 group-hover:border-volt group-hover:bg-volt group-hover:text-ink sm:flex"
        >
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
