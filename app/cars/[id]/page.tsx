import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Baby,
  Briefcase,
  CalendarCheck,
  CarFront,
  Check,
  ChevronRight,
  Cog,
  DoorOpen,
  Fuel,
  IdCard,
  Info,
  Phone,
  Route,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { VehicleCard } from "@/components/vehicle-card";
import { companyContact, siteConfig } from "@/data/site";
import {
  bookingConditions,
  getVehicle,
  vehicles,
  type ConditionIcon,
  type Vehicle,
} from "@/data/vehicles";

/** Every vehicle in the catalogue is prerendered at build time. */
export async function generateStaticParams() {
  return vehicles.map((vehicle) => ({ id: vehicle.id }));
}

/**
 * Ids outside the catalogue are still rendered on demand so `notFound()` below
 * can hand them to `not-found.tsx`, which offers the current fleet. Setting
 * `dynamicParams = false` would 404 at the routing layer and skip that.
 */
export const dynamicParams = true;

export async function generateMetadata(
  props: PageProps<"/cars/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const vehicle = getVehicle(id);

  if (!vehicle) {
    return { title: "Vehicle not found", robots: { index: false } };
  }

  return {
    title: `${vehicle.name} — ${vehicle.bodyStyle} Rental`,
    description: vehicle.metaDescription,
    alternates: { canonical: `/cars/${vehicle.id}` },
    openGraph: {
      type: "website",
      url: `${siteConfig.url}/cars/${vehicle.id}`,
      title: `${vehicle.name} — ${vehicle.bodyStyle} Rental`,
      description: vehicle.metaDescription,
      images: [{ url: vehicle.image, alt: vehicle.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${vehicle.name} — ${vehicle.bodyStyle} Rental`,
      description: vehicle.metaDescription,
      images: [vehicle.image],
    },
    // Held back from the index for the same reason as /cars: until live
    // inventory and pricing are connected, these listings describe the class
    // accurately but cannot be booked. Flip to index once the API is wired up.
    robots: { index: false, follow: true },
  };
}

const conditionIcons: Record<ConditionIcon, typeof Wallet> = {
  wallet: Wallet,
  carFront: CarFront,
  fuel: Fuel,
  shieldCheck: ShieldCheck,
  idCard: IdCard,
  calendar: CalendarCheck,
  route: Route,
  baby: Baby,
};

export default async function VehiclePage(props: PageProps<"/cars/[id]">) {
  const { id } = await props.params;
  const vehicle = getVehicle(id);

  if (!vehicle) notFound();

  const related = vehicles.filter((item) => item.id !== vehicle.id);

  const headlineSpecs = [
    { icon: Users, label: `${vehicle.passengers} seats` },
    {
      icon: Briefcase,
      label: `${vehicle.luggage} large ${vehicle.luggage === 1 ? "case" : "cases"}`,
    },
    { icon: DoorOpen, label: `${vehicle.doors} doors` },
    { icon: Cog, label: vehicle.transmission },
    { icon: Fuel, label: vehicle.fuel },
  ];

  const specifications = [
    { term: "Vehicle class", value: vehicle.category },
    { term: "Body style", value: vehicle.bodyStyle },
    { term: "Seats", value: `${vehicle.passengers}` },
    { term: "Large cases", value: `${vehicle.luggage}` },
    { term: "Doors", value: `${vehicle.doors}` },
    { term: "Transmission", value: vehicle.transmission },
    { term: "Fuel", value: vehicle.fuel },
    { term: "Reserved as", value: `${vehicle.name} or similar` },
  ];

  /* Breadcrumbs only. Deliberately no Product or Offer markup: the rate on this
     page is indicative, and marking it up as a firm price would misrepresent
     it in search results. */
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Browse Cars",
        item: `${siteConfig.url}/cars`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: vehicle.name,
        item: `${siteConfig.url}/cars/${vehicle.id}`,
      },
    ],
  };

  return (
    <>
      <Navbar />

      <main id="main" className="flex-1">
        {/* ------------------------------------------------------------------
            Hero
        ------------------------------------------------------------------ */}
        <section
          aria-labelledby="vehicle-heading"
          className="surface-dark bg-ink pt-28 pb-16 lg:pt-36 lg:pb-20"
        >
          <div className="shell">
            <Breadcrumbs name={vehicle.name} />

            <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
              {/* Identity + rate */}
              <div>
                <p className="eyebrow text-white/60">
                  {vehicle.category} class
                </p>

                <h1
                  id="vehicle-heading"
                  className="display-lg mt-5 text-balance text-white"
                >
                  {vehicle.name}
                </h1>

                <p className="mt-4 text-lg font-semibold text-white/70">
                  {vehicle.bodyStyle}
                </p>

                <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-white/65">
                  {vehicle.summary}
                </p>

                <ul className="mt-9 flex flex-wrap gap-2.5">
                  {headlineSpecs.map((spec) => (
                    <li
                      key={spec.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[0.8125rem] font-bold text-white/85"
                    >
                      <spec.icon
                        className="h-4 w-4 text-volt"
                        aria-hidden="true"
                      />
                      {spec.label}
                    </li>
                  ))}
                </ul>

                {/* Rate + actions */}
                <div className="mt-10 rounded-[var(--radius-tile)] border border-white/15 bg-white/[0.04] p-6 sm:p-7">
                  <p className="leading-none">
                    <span className="block text-[0.6875rem] font-bold tracking-[0.14em] text-white/50 uppercase">
                      From
                    </span>
                    <span className="mt-3 inline-flex items-baseline gap-1.5">
                      <span className="text-[2.75rem] leading-none font-extrabold tracking-[-0.045em] text-white">
                        ${vehicle.pricePerDay}
                      </span>
                      <span className="text-base font-bold text-white/60">
                        /day
                      </span>
                    </span>
                  </p>

                  <p className="mt-4 max-w-md text-[0.875rem] leading-relaxed text-white/55">
                    An indicative starting rate for this class, not a quote.
                    Your price moves with the city, the dates and the rate type
                    you choose, and the full amount is itemised before you
                    confirm.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href="/#booking"
                      className="group inline-flex items-center justify-center gap-2.5 rounded-[16px] bg-volt px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-ink transition-colors duration-200 hover:bg-volt-deep"
                    >
                      Check availability
                      <ArrowRight
                        className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>

                    <a
                      href={companyContact.phone.href}
                      className="inline-flex items-center justify-center gap-2.5 rounded-[16px] border border-white/30 px-7 py-4 text-base font-bold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10"
                    >
                      <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                      {companyContact.phone.display}
                    </a>
                  </div>
                </div>
              </div>

              {/* Photography */}
              <figure className="lg:sticky lg:top-28">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-tile)] bg-graphite">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 52vw, 92vw"
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-ink/85 px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.12em] text-white uppercase backdrop-blur-sm">
                    {vehicle.category}
                  </span>
                </div>
                <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-white/45">
                  Photography shows the {vehicle.name}. You reserve the class
                  rather than this exact car, so trim, colour and model year
                  vary by location.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            Suited to / worth knowing
        ------------------------------------------------------------------ */}
        <section
          aria-labelledby="fit-heading"
          className="shell py-20 lg:py-28"
        >
          <SectionHeading
            id="fit-heading"
            eyebrow="Is this the right class"
            title={
              <>
                What the {vehicle.name} is{" "}
                <span className="mark-volt">good at.</span>
              </>
            }
            subtitle="Both sides of it. A class that suits every trip equally would not be worth choosing between."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-7">
            <div
              data-reveal
              className="rounded-[var(--radius-tile)] border border-line bg-white p-7 sm:p-9"
            >
              <h3 className="text-xl font-extrabold tracking-[-0.025em] text-ink">
                Suited to
              </h3>
              <ul className="mt-7 space-y-4">
                {vehicle.suitedTo.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-volt">
                      <Check className="h-3.5 w-3.5 text-ink" aria-hidden="true" />
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-reveal
              className="rounded-[var(--radius-tile)] border border-line bg-cloud p-7 sm:p-9"
            >
              <h3 className="text-xl font-extrabold tracking-[-0.025em] text-ink">
                Worth knowing
              </h3>
              <ul className="mt-7 space-y-4">
                {vehicle.considerations.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-line bg-white">
                      <Info className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            Specification
        ------------------------------------------------------------------ */}
        <section
          aria-labelledby="spec-heading"
          className="border-y border-line bg-white py-20 lg:py-28"
        >
          <div className="shell">
            <SectionHeading
              id="spec-heading"
              eyebrow="Specification"
              title={
                <>
                  The numbers, <span className="mark-volt">plainly.</span>
                </>
              }
            />

            <dl
              data-reveal
              className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-tile)] border border-line bg-line sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
            >
              {specifications.map((spec) => (
                <div key={spec.term} className="bg-white px-6 py-7">
                  <dt className="text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase">
                    {spec.term}
                  </dt>
                  <dd className="mt-3 text-[1.0625rem] font-extrabold tracking-[-0.02em] text-ink">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 max-w-2xl text-[0.875rem] leading-relaxed text-muted">
              Seats is the manufacturer&rsquo;s belted capacity. Large cases is
              what fits in the boot with every seat upright — cabin bags
              normally travel on top of that. Figures describe the class, and
              the car you collect matches them or betters them.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            Booking conditions
        ------------------------------------------------------------------ */}
        <section
          aria-labelledby="conditions-heading"
          className="shell py-20 lg:py-28"
        >
          <SectionHeading
            id="conditions-heading"
            eyebrow="Before you book"
            title={
              <>
                The conditions that actually{" "}
                <span className="mark-volt">change the price.</span>
              </>
            }
            subtitle="Fuel policy, deposits, driver age and cancellation terms are what turn a good rate into a bad one. They vary by supplier and city, so here is how each one works rather than a number we cannot stand behind."
            action={
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 rounded-[14px] border border-line bg-white px-5 py-3 text-sm font-bold text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white"
              >
                Read the full FAQ
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            }
          />

          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-7">
            {bookingConditions.map((condition) => {
              const Icon = conditionIcons[condition.icon];

              return (
                <li
                  key={condition.title}
                  data-reveal
                  className="rounded-[var(--radius-card)] border border-line bg-white p-6 sm:p-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-cloud">
                    <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold tracking-[-0.025em] text-ink">
                    {condition.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {condition.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ------------------------------------------------------------------
            Other classes
        ------------------------------------------------------------------ */}
        <section
          aria-labelledby="related-heading"
          className="border-t border-line bg-white py-20 lg:py-28"
        >
          <div className="shell">
            <SectionHeading
              id="related-heading"
              eyebrow="Compare"
              title={
                <>
                  Other classes on the{" "}
                  <span className="mark-volt">same trip.</span>
                </>
              }
              subtitle="Same specification layout on every card, so the differences are the only thing you have to read."
              action={
                <Link
                  href="/cars"
                  className="inline-flex items-center gap-2 rounded-[14px] border border-line px-5 py-3 text-sm font-bold text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white"
                >
                  Browse all vehicles
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              }
            />

            <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7">
              {related.map((item) => (
                <li key={item.id}>
                  <VehicleCard vehicle={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            Closing CTA
        ------------------------------------------------------------------ */}
        <VehicleCta vehicle={vehicle} />
      </main>

      <Footer />
      <ScrollReveal />

      <script
        type="application/ld+json"
        // Static, author-controlled JSON built from the catalogue.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Pieces                                                                      */
/* -------------------------------------------------------------------------- */

function Breadcrumbs({ name }: { name: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] font-bold text-white/50">
        <li>
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
        </li>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <li>
          <Link href="/cars" className="transition-colors hover:text-white">
            Browse Cars
          </Link>
        </li>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <li aria-current="page" className="text-white">
          {name}
        </li>
      </ol>
    </nav>
  );
}

function VehicleCta({ vehicle }: { vehicle: Vehicle }) {
  return (
    <section
      aria-labelledby="vehicle-cta-heading"
      className="surface-dark bg-ink py-20 lg:py-28"
    >
      <div className="shell">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div data-reveal>
            <h2
              id="vehicle-cta-heading"
              className="display-lg max-w-xl text-balance text-white"
            >
              Ready to take the{" "}
              <span className="mark-volt">{vehicle.name}?</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              Tell us the city and the dates and we will come back with what is
              available in this class, at the price that applies to your
              booking. No account, no countdown, no invented scarcity.
            </p>
          </div>

          <div
            data-reveal
            className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch"
          >
            <Link
              href="/#booking"
              className="group inline-flex items-center justify-center gap-2.5 rounded-[16px] bg-volt px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-ink transition-colors duration-200 hover:bg-volt-deep"
            >
              Start a search
              <ArrowRight
                className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 rounded-[16px] border border-white/30 px-7 py-4 text-base font-bold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10"
            >
              Ask a question
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
