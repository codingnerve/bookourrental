import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { VehicleCard } from "@/components/vehicle-card";
import { getDictionary, type Locale } from "@/data/i18n";
import { vehicles } from "@/data/vehicles";

export function FeaturedVehicles({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale).fleet;

  return (
    <section
      id="fleet"
      aria-labelledby="fleet-heading"
      className="shell scroll-mt-28 py-24 lg:py-32"
    >
      <SectionHeading
        id="fleet-heading"
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titlePrefix}
            <span className="mark-volt">{t.titleMark}</span>
          </>
        }
        subtitle={t.subtitle}
        action={
          <Link
            href="/cars"
            className="group inline-flex items-center gap-2 rounded-[14px] border border-ink px-6 py-3.5 text-[0.9375rem] font-bold text-ink transition-colors duration-200 hover:bg-ink hover:text-white"
          >
            {t.browseAll}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        }
      />

      <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-7">
        {vehicles.map((vehicle, index) => (
          <li
            key={vehicle.id}
            data-reveal
            style={
              { "--reveal-delay": `${index * 90}ms` } as React.CSSProperties
            }
          >
            <VehicleCard
              vehicle={vehicle}
              priority={index === 0}
              locale={locale}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
