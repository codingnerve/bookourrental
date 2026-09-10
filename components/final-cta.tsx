import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="surface-dark relative bg-ink pt-24 pb-24 lg:pt-32 lg:pb-32"
    >
      <div className="shell">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div data-reveal>
            <h2
              id="final-cta-heading"
              className="display-xl max-w-xl text-balance text-white"
            >
              Ready to hit the <span className="mark-volt">road?</span>
            </h2>

            <p className="mt-7 max-w-md text-lg leading-relaxed text-white/70">
              Choose your location, find your car, and get your trip moving.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#booking"
                className="group inline-flex items-center justify-center gap-2.5 rounded-[16px] bg-volt px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-ink transition-colors duration-200 hover:bg-volt-deep"
              >
                Find Your Car
                <ArrowRight
                  className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="#destinations"
                className="inline-flex items-center justify-center gap-2.5 rounded-[16px] border border-white/30 px-7 py-4 text-base font-bold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10"
              >
                <MapPin className="h-4.5 w-4.5" aria-hidden="true" />
                Explore Locations
              </Link>
            </div>
          </div>

          {/* Visual lifts out of the section and into the one above it */}
          <div
            data-reveal
            className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-tile)] bg-graphite sm:aspect-[16/10] lg:-mt-44 lg:mb-0 lg:aspect-[4/3]"
          >
            <Image
              src="https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=1600&q=80"
              alt="Dark premium sedan photographed from the front under a dramatic clouded sky"
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
