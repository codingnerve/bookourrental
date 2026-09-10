import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Cog, Fuel, Users } from "lucide-react";

import type { Vehicle } from "@/data/vehicles";

interface VehicleCardProps {
  vehicle: Vehicle;
  /** First card in the grid loads eagerly; the rest stay lazy. */
  priority?: boolean;
}

export function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  const specs = [
    { icon: Users, label: `${vehicle.passengers} seats` },
    {
      icon: Briefcase,
      label: `${vehicle.luggage} ${vehicle.luggage === 1 ? "bag" : "bags"}`,
    },
    { icon: Cog, label: vehicle.transmission },
    { icon: Fuel, label: vehicle.fuel },
  ];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_30px_60px_-38px_rgba(11,18,32,0.55)]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cloud">
        <Image
          src={vehicle.image}
          alt={vehicle.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <span className="absolute top-3.5 left-3.5 rounded-full bg-ink/85 px-3 py-1.5 text-[0.6875rem] font-bold tracking-[0.12em] text-white uppercase backdrop-blur-sm">
          {vehicle.category}
        </span>
        {/* Volt rule sweeps in on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-volt transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl leading-tight font-extrabold tracking-[-0.025em] text-ink">
          {vehicle.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-muted">
          {vehicle.bodyStyle}
        </p>

        {/* Specs on one clean horizontal line, not a pile of pills */}
        <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-[0.8125rem] font-semibold text-ink/70">
          {specs.map((spec) => (
            <li key={spec.label} className="flex items-center gap-1.5">
              <spec.icon className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
              {spec.label}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <p className="leading-none">
            <span className="block text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase">
              From
            </span>
            <span className="mt-1.5 inline-flex items-baseline gap-1">
              <span className="text-[1.75rem] font-extrabold tracking-[-0.04em] text-ink">
                ${vehicle.pricePerDay}
              </span>
              <span className="text-sm font-semibold text-muted">/day</span>
            </span>
          </p>

          <Link
            href={`/cars/${vehicle.id}`}
            aria-label={`View details for the ${vehicle.name}`}
            className="inline-flex items-center gap-1.5 rounded-[12px] border border-line px-4 py-2.5 text-sm font-bold text-ink transition-colors duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-white"
          >
            View Car
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
