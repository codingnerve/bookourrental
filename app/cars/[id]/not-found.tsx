import Link from "next/link";
import { ArrowRight, CarFront } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { VehicleCard } from "@/components/vehicle-card";
import { vehicles } from "@/data/vehicles";

/**
 * Shown when the URL carries a vehicle id that is not in the catalogue —
 * a mistyped slug, or a class that has since been retired. Rather than a bare
 * 404, it puts the current fleet in front of the visitor.
 */
export default function VehicleNotFound() {
  return (
    <>
      <Navbar />

      <main id="main" className="flex-1">
        <section className="surface-dark bg-ink pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="shell">
            <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-white/10">
              <CarFront className="h-6 w-6 text-volt" aria-hidden="true" />
            </span>

            <h1 className="display-lg mt-8 max-w-2xl text-balance text-white">
              We could not find that{" "}
              <span className="mark-volt">vehicle.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
              The link may be out of date, or the class may no longer be listed.
              Everything currently in the fleet is below — pick a class from
              there, or start a fresh search with your city and dates.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/cars"
                className="group inline-flex items-center justify-center gap-2.5 rounded-[16px] bg-volt px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-ink transition-colors duration-200 hover:bg-volt-deep"
              >
                Browse all vehicles
                <ArrowRight
                  className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/#booking"
                className="inline-flex items-center justify-center gap-2.5 rounded-[16px] border border-white/30 px-7 py-4 text-base font-bold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10"
              >
                Start a new search
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="fleet-heading" className="shell py-16 lg:py-24">
          <h2
            id="fleet-heading"
            className="text-xl font-extrabold tracking-[-0.025em] text-ink"
          >
            Currently in the fleet
          </h2>

          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-7">
            {vehicles.map((vehicle) => (
              <li key={vehicle.id}>
                <VehicleCard vehicle={vehicle} />
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
