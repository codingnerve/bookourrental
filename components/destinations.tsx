"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, Plane, Building2, Car } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { destinations } from "@/data/locations";

export function Destinations() {
  const [activeId, setActiveId] = useState(destinations[0].id);
  const tabRefs = useRef(new Map<string, HTMLButtonElement | null>());

  const active =
    destinations.find((destination) => destination.id === activeId) ??
    destinations[0];

  const focusTab = (id: string) => {
    setActiveId(id);
    tabRefs.current.get(id)?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = destinations.length - 1;
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        nextIndex = index === last ? 0 : index + 1;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        nextIndex = index === 0 ? last : index - 1;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    focusTab(destinations[nextIndex].id);
  };

  return (
    <section
      id="destinations"
      aria-labelledby="destinations-heading"
      className="shell scroll-mt-28 py-24 lg:py-32"
    >
      <SectionHeading
        id="destinations-heading"
        eyebrow="03 — Pickup cities"
        title={
          <>
            Where are you <span className="mark-volt">heading?</span>
          </>
        }
        subtitle="Six markets, airport counters and downtown desks. Pick a city to see what is on the ground there."
      />

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
        {/* City selector */}
        <div
          role="tablist"
          aria-label="Pickup cities"
          aria-orientation="vertical"
          data-reveal
          className="hide-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
        >
          {destinations.map((destination, index) => {
            const selected = destination.id === activeId;
            return (
              <button
                key={destination.id}
                ref={(node) => {
                  tabRefs.current.set(destination.id, node);
                }}
                type="button"
                role="tab"
                id={`city-tab-${destination.id}`}
                aria-selected={selected}
                aria-controls="city-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(destination.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={[
                  "group relative shrink-0 rounded-[16px] border px-5 py-4 text-left transition-colors duration-300 lg:shrink lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-6",
                  selected
                    ? "border-ink bg-ink text-white lg:bg-transparent lg:text-ink"
                    : "border-line bg-white text-ink hover:border-ink/25 lg:bg-transparent lg:text-ink/55 lg:hover:text-ink",
                ].join(" ")}
              >
                <span className="flex items-center gap-4">
                  {/* Volt rail marks the active city on desktop */}
                  <span
                    aria-hidden="true"
                    className={[
                      "hidden h-10 w-1 shrink-0 rounded-full transition-colors duration-300 lg:block",
                      selected ? "bg-volt" : "bg-transparent",
                    ].join(" ")}
                  />
                  <span className="min-w-0">
                    <span className="block text-lg leading-tight font-extrabold tracking-[-0.03em] whitespace-nowrap lg:text-2xl">
                      {destination.city}
                      <span
                        className={
                          selected
                            ? "text-white/50 lg:text-muted"
                            : "text-muted"
                        }
                      >
                        , {destination.state}
                      </span>
                    </span>
                    <span
                      className={[
                        "mt-1 hidden text-[0.8125rem] font-semibold lg:block",
                        selected ? "text-muted" : "text-muted/70",
                      ].join(" ")}
                    >
                      {destination.airportCode} · From ${destination.fromPrice}
                      /day
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Destination panel */}
        <div
          id="city-panel"
          role="tabpanel"
          aria-labelledby={`city-tab-${active.id}`}
          tabIndex={0}
          data-reveal
          className="surface-dark relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[var(--radius-tile)] bg-ink p-6 sm:min-h-[30rem] sm:p-9 lg:min-h-[34rem]"
        >
          <Image
            key={active.id}
            src={active.image}
            alt={active.imageAlt}
            fill
            sizes="(min-width: 1024px) 58vw, 92vw"
            className="fade-swap -z-20 object-cover object-[center_62%]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/20"
          />

          <div>
            <p className="eyebrow text-white/60">
              {active.state} · {active.airportCode}
            </p>

            <h3 className="mt-5 text-[2.25rem] leading-[1.02] font-extrabold tracking-[-0.04em] text-white sm:text-[3rem]">
              {active.city}
            </h3>

            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-white/70">
              {active.note}
            </p>

            <dl className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-white/15 bg-white/15 sm:grid-cols-3">
              <PanelStat
                icon={<Plane className="h-4 w-4" aria-hidden="true" />}
                term="Airport"
                value={`${active.airportCode} · ${active.airportName}`}
              />
              <PanelStat
                icon={<Building2 className="h-4 w-4" aria-hidden="true" />}
                term="City pickups"
                value={`${active.cityPickups} locations`}
              />
              <PanelStat
                icon={<Car className="h-4 w-4" aria-hidden="true" />}
                term="Vehicle classes"
                value={`${active.vehicleClasses} available`}
              />
            </dl>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
              <p className="leading-none">
                <span className="block text-[0.6875rem] font-bold tracking-[0.14em] text-white/55 uppercase">
                  Starting from
                </span>
                <span className="mt-2 inline-flex items-baseline gap-1">
                  <span className="text-[2rem] font-extrabold tracking-[-0.04em] text-volt">
                    ${active.fromPrice}
                  </span>
                  <span className="text-sm font-semibold text-white/60">
                    /day
                  </span>
                </span>
              </p>

              <Link
                href={`/cars?pickup=${encodeURIComponent(`${active.city}, ${active.state}`)}`}
                className="group inline-flex items-center gap-2 rounded-[14px] bg-white px-6 py-3.5 text-[0.9375rem] font-bold text-ink transition-colors duration-200 hover:bg-volt"
              >
                Explore {active.city} rentals
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelStat({
  icon,
  term,
  value,
}: {
  icon: React.ReactNode;
  term: string;
  value: string;
}) {
  return (
    <div className="bg-ink/85 px-4 py-4 backdrop-blur-sm">
      <dt className="flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.14em] text-white/55 uppercase">
        <span className="text-volt">{icon}</span>
        {term}
      </dt>
      <dd className="mt-2 text-sm leading-snug font-semibold text-white">
        {value}
      </dd>
    </div>
  );
}
