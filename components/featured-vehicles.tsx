import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { VehicleCard } from "@/components/vehicle-card";
import { vehicles } from "@/data/vehicles";

export function FeaturedVehicles() {
  return (
    <section
      id="fleet"
      aria-labelledby="fleet-heading"
      className="shell scroll-mt-28 py-24 lg:py-32"
    >
      <SectionHeading
        id="fleet-heading"
        eyebrow="01 — The fleet"
        title={
          <>
            Find a car that <span className="mark-volt">fits the trip.</span>
          </>
        }
        subtitle="From efficient city cars to spacious SUVs, choose the vehicle that matches your plans."
        action={
          <Link
            href="/cars"
            className="group inline-flex items-center gap-2 rounded-[14px] border border-ink px-6 py-3.5 text-[0.9375rem] font-bold text-ink transition-colors duration-200 hover:bg-ink hover:text-white"
          >
            Browse all vehicles
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
            <VehicleCard vehicle={vehicle} priority={index === 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}
