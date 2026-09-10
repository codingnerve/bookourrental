import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Car, Layers, MapPin } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { destinations } from "@/data/locations";
import { driveCategories } from "@/data/categories";
import { vehicles } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "About",
  description:
    "What BookOurRental is, how we present rental vehicles, and the principles behind the way our search and comparison works.",
  alternates: { canonical: "/about" },
};

/** Figures are counted from the site's own catalogue rather than asserted. */
const coverage = [
  {
    icon: MapPin,
    value: `${destinations.length}`,
    label: "Pickup cities",
    detail: "Airport counters and downtown desks across the United States.",
  },
  {
    icon: Layers,
    value: `${driveCategories.length}`,
    label: "Vehicle collections",
    detail: "Grouped by what the trip needs, not by alphabetical model lists.",
  },
  {
    icon: Car,
    value: `${vehicles.length}`,
    label: "Classes on show",
    detail: "Economy through luxury, each with the same set of specifications.",
  },
];

const principles = [
  {
    step: "01",
    title: "Say what the car actually is",
    body: "Seats, luggage, transmission and fuel type belong on the card, in the same position, for every vehicle. If two cars differ, you should be able to see how without opening either of them.",
  },
  {
    step: "02",
    title: "Show the conditions before the commitment",
    body: "Fuel policy, deposit, age requirements and cancellation terms are the things that change a good price into a bad one. They belong next to the price, not three screens later.",
  },
  {
    step: "03",
    title: "Never dress a variable up as a promise",
    body: "Rates, inclusions and availability shift by supplier, city and date. Where something varies we say it varies, rather than printing a number we cannot stand behind.",
  },
  {
    step: "04",
    title: "Get out of the way",
    body: "Search, compare, reserve. No account to create, no countdown timers, no invented scarcity. The fastest useful path from a question to a car.",
  },
];

/** "Miami, Orlando, …, and Chicago" — grammatical for any catalogue length. */
const cityList = new Intl.ListFormat("en-US", {
  style: "long",
  type: "conjunction",
}).format(destinations.map((destination) => destination.city));

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main id="main" className="flex-1">
        <PageHeader
          eyebrow="About"
          title={
            <>
              Car rental, minus the{" "}
              <span className="mark-volt">guesswork.</span>
            </>
          }
          intro="BookOurRental is a search and comparison layer for rental cars in the United States. We take the details that usually sit buried in terms and conditions and put them where they change your decision — on the card, before you book."
        >
          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-white/15 bg-white/15 sm:grid-cols-3">
            {coverage.map((item) => (
              <div key={item.label} className="bg-ink px-6 py-6">
                <dt className="flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.14em] text-white/55 uppercase">
                  <item.icon className="h-4 w-4 text-volt" aria-hidden="true" />
                  {item.label}
                </dt>
                <dd>
                  <span className="mt-3 block text-[2.25rem] leading-none font-extrabold tracking-[-0.04em] text-white">
                    {item.value}
                  </span>
                  <span className="mt-3 block text-sm leading-relaxed text-white/60">
                    {item.detail}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </PageHeader>

        {/* What we do */}
        <section
          aria-labelledby="what-heading"
          className="shell py-24 lg:py-32"
        >
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div data-reveal>
              <p className="eyebrow text-muted">01 — What we do</p>
              <h2
                id="what-heading"
                className="display-lg mt-5 max-w-lg text-balance text-ink"
              >
                One search, one set of facts, every car.
              </h2>

              <div className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-muted">
                <p>
                  Renting a car is rarely difficult. It is just opaque. The same
                  vehicle appears under four different class names, the fuel
                  policy is a footnote, and the number you saw first is not the
                  number you pay.
                </p>
                <p>
                  We built BookOurRental to flatten that. Every vehicle is
                  described with an identical set of specifications, every
                  condition that affects the total sits with the vehicle it
                  applies to, and the search bar asks for the six things that
                  actually determine what is available — where, when, and where
                  you are leaving it.
                </p>
                <p>
                  What follows is deliberately short: compare, choose, reserve.
                  You keep the decision; we stop the details from hiding.
                </p>
              </div>

              <Link
                href="/#booking"
                className="group mt-9 inline-flex items-center gap-2.5 rounded-[16px] bg-ink px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-white transition-colors duration-200 hover:bg-graphite"
              >
                Start a search
                <ArrowRight
                  className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div
              data-reveal
              className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-tile)] bg-cloud lg:aspect-[4/5]"
            >
              <Image
                src="https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=1200&q=80"
                alt="A compact car parked in a tree-lined city lot on a clear day"
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Principles */}
        <section
          aria-labelledby="principles-heading"
          className="surface-dark bg-ink py-24 lg:py-32"
        >
          <div className="shell">
            <SectionHeading
              id="principles-heading"
              eyebrow="02 — How we work"
              title={
                <>
                  Four rules we hold the{" "}
                  <span className="mark-volt">product to.</span>
                </>
              }
              subtitle="These are design constraints rather than marketing lines. When something on the site gets harder to read or harder to trust, one of these is usually the reason we changed it."
              tone="dark"
            />

            <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-tile)] border border-white/12 bg-white/12 md:grid-cols-2">
              {principles.map((principle, index) => (
                <li
                  key={principle.step}
                  data-reveal
                  style={
                    {
                      "--reveal-delay": `${index * 80}ms`,
                    } as React.CSSProperties
                  }
                  className="bg-ink p-8 lg:p-10"
                >
                  <span className="text-[0.75rem] font-bold tracking-[0.2em] text-volt">
                    {principle.step}
                  </span>
                  <h3 className="mt-5 text-xl leading-tight font-extrabold tracking-[-0.025em] text-white lg:text-2xl">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/65">
                    {principle.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Where we operate */}
        <section
          aria-labelledby="coverage-heading"
          className="shell py-24 lg:py-32"
        >
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div
              data-reveal
              className="relative order-last aspect-[4/3] overflow-hidden rounded-[var(--radius-tile)] bg-cloud lg:order-first lg:aspect-[5/4]"
            >
              <Image
                src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1400&q=80"
                alt="An aircraft parked at an airport gate as the sun sets behind the terminal"
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-cover"
              />
            </div>

            <div data-reveal>
              <p className="eyebrow text-muted">03 — Where we operate</p>
              <h2
                id="coverage-heading"
                className="display-lg mt-5 max-w-lg text-balance text-ink"
              >
                Built for American road trips and airport arrivals.
              </h2>
              <p className="mt-7 max-w-lg text-[1.0625rem] leading-relaxed text-muted">
                Coverage starts with the cities people actually fly into and
                drive out of — {cityList}. Each one lists both airport counters
                and downtown desks, so a trip that starts at a terminal can end
                somewhere else entirely.
              </p>

              <ul className="mt-8 flex flex-wrap gap-2.5">
                {destinations.map((destination) => (
                  <li key={destination.id}>
                    <Link
                      href={`/cars?pickup=${encodeURIComponent(`${destination.city}, ${destination.state}`)}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white"
                    >
                      {destination.city}
                      <span className="text-[0.6875rem] font-bold tracking-[0.08em] text-muted uppercase transition-colors group-hover:text-white/60">
                        {destination.airportCode}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="/#destinations"
                className="group mt-9 inline-flex items-center gap-2 text-[0.9375rem] font-bold text-ink"
              >
                Explore all pickup cities
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="surface-dark bg-ink py-20 lg:py-24">
          <div className="shell">
            <div
              data-reveal
              className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"
            >
              <div>
                <h2 className="display-md max-w-xl text-balance text-white">
                  Questions before you book? We would rather answer them first.
                </h2>
                <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-white/65">
                  The FAQ covers most of what comes up at the counter. Anything
                  it misses, the support desk can take.
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Link
                  href="/faq"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-[16px] bg-volt px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-ink transition-colors duration-200 hover:bg-volt-deep"
                >
                  Read the FAQ
                  <ArrowRight
                    className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 rounded-[16px] border border-white/30 px-7 py-4 text-base font-bold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollReveal />
    </>
  );
}
