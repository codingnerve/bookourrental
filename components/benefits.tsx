import Image from "next/image";
import { Clock, Gauge, Headset, MapPin } from "lucide-react";

import { benefits, type BenefitIcon } from "@/data/site";

const icons: Record<BenefitIcon, typeof Gauge> = {
  gauge: Gauge,
  mapPin: MapPin,
  clock: Clock,
  headset: Headset,
};

export function Benefits() {
  return (
    <section
      aria-labelledby="benefits-heading"
      className="surface-dark bg-ink py-24 lg:py-32"
    >
      <div className="shell">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          {/* Visual */}
          {/* `sticky` lives on the outer wrapper so the fill image keeps a
              `relative` parent. */}
          <div data-reveal className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-tile)] bg-graphite lg:aspect-auto lg:h-[40rem]">
              <Image
                src="https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&w=1200&q=80"
                alt="Interior of a modern car showing the dashboard and navigation display"
                fill
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-lg leading-snug font-bold tracking-[-0.02em] text-white">
                  Every listing shows the same details, in the same place, for
                  every car.
                </p>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <div data-reveal>
              <p className="eyebrow text-white/60">05 — Why BookOurRental</p>
              <h2
                id="benefits-heading"
                className="display-lg mt-5 text-balance text-white"
              >
                Built around better rental{" "}
                <span className="mark-volt">decisions.</span>
              </h2>
            </div>

            <ul className="mt-12 divide-y divide-white/10 border-t border-white/10">
              {benefits.map((benefit, index) => {
                const Icon = icons[benefit.icon];
                return (
                  <li
                    key={benefit.step}
                    data-reveal
                    style={
                      {
                        "--reveal-delay": `${index * 90}ms`,
                      } as React.CSSProperties
                    }
                    className="group flex gap-6 py-7"
                  >
                    <div className="flex w-14 shrink-0 flex-col items-start gap-4">
                      <span className="text-[0.75rem] font-bold tracking-[0.2em] text-white/40">
                        {benefit.step}
                      </span>
                      <Icon
                        className="h-5 w-5 text-volt transition-transform duration-300 group-hover:scale-110"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xl leading-tight font-extrabold tracking-[-0.025em] text-white">
                        {benefit.title}
                      </h3>
                      <p className="mt-2.5 max-w-md text-[1.0625rem] leading-relaxed text-white/65">
                        {benefit.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
