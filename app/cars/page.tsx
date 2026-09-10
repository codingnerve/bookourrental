import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ScrollReveal } from "@/components/scroll-reveal";
import { VehicleCard } from "@/components/vehicle-card";
import { vehicles } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Browse Cars",
  description:
    "Compare rental vehicles by seats, luggage, transmission, fuel type and daily rate.",
  robots: { index: false, follow: true },
};

interface CarsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/** First value only — repeated params are not part of the search contract. */
function one(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function formatDay(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const params = await searchParams;

  const pickup = one(params.pickup);
  const returnTo = one(params.return);
  const pickupDate = formatDay(one(params.pickupDate));
  const returnDate = formatDay(one(params.returnDate));
  const pickupTime = one(params.pickupTime);
  const returnTime = one(params.returnTime);

  const hasSearch = Boolean(pickup && pickupDate && returnDate);

  return (
    <>
      <Navbar />

      <main id="main" className="flex-1">
        {/* Search summary */}
        <section className="surface-dark bg-ink pt-32 pb-14 lg:pt-40 lg:pb-16">
          <div className="shell">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[0.8125rem] font-bold text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>

            <h1 className="display-lg mt-6 text-balance text-white">
              {hasSearch ? (
                <>
                  Vehicles in <span className="mark-volt">{pickup}</span>
                </>
              ) : (
                <>
                  Browse the <span className="mark-volt">fleet.</span>
                </>
              )}
            </h1>

            {hasSearch ? (
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
                <SummaryItem
                  icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
                  term="Pickup / Return"
                  value={
                    returnTo && returnTo !== pickup
                      ? `${pickup} → ${returnTo}`
                      : pickup
                  }
                />
                <SummaryItem
                  icon={<CalendarDays className="h-4 w-4" aria-hidden="true" />}
                  term="Dates"
                  value={`${pickupDate}${pickupTime ? `, ${pickupTime}` : ""} → ${returnDate}${
                    returnTime ? `, ${returnTime}` : ""
                  }`}
                />
              </dl>
            ) : (
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/65">
                Start a search from the home page to filter this list by city
                and travel dates.
              </p>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="shell py-16 lg:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
            <h2 className="text-xl font-extrabold tracking-[-0.025em] text-ink">
              {vehicles.length} vehicles
            </h2>
            <p className="rounded-full border border-line bg-white px-4 py-2 text-[0.8125rem] font-semibold text-muted">
              Sample fleet data — live availability and pricing connect here
              once the API is wired up.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-7">
            {vehicles.map((vehicle, index) => (
              <li key={vehicle.id}>
                <VehicleCard vehicle={vehicle} priority={index < 2} />
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
      <ScrollReveal />
    </>
  );
}

function SummaryItem({
  icon,
  term,
  value,
}: {
  icon: React.ReactNode;
  term: string;
  value: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.14em] text-white/50 uppercase">
        <span className="text-volt">{icon}</span>
        {term}
      </dt>
      <dd className="mt-2 text-[1.0625rem] font-bold tracking-[-0.02em] text-white">
        {value}
      </dd>
    </div>
  );
}
