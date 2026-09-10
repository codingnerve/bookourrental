import Link from "next/link";
import { ArrowRight, Check, MapPin, Search, Smartphone } from "lucide-react";

const points = [
  "The same search, fields and filters as the desktop site",
  "Vehicle details sized for a phone screen, not squeezed into it",
  "Your reservation summary travels with you in your inbox",
];

export function MobileBooking() {
  return (
    <section
      aria-labelledby="mobile-heading"
      className="border-y border-line bg-white py-24 lg:py-32"
    >
      <div className="shell grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
        {/* Copy */}
        <div data-reveal>
          <p className="eyebrow text-muted">06 — On the move</p>

          <h2
            id="mobile-heading"
            className="display-lg mt-5 max-w-xl text-balance text-ink"
          >
            Your rental plans, wherever the{" "}
            <span className="mark-volt">trip takes you.</span>
          </h2>

          <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-muted">
            There is no separate app to download. BookOurRental is built to work
            the same way in your phone&rsquo;s browser as it does on a laptop —
            search, compare and reserve from the gate, the cab or the kerb.
          </p>

          <ul className="mt-9 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex gap-3.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink">
                  <Check className="h-3 w-3 text-volt" aria-hidden="true" />
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-ink/75">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#booking"
              className="group inline-flex items-center gap-2.5 rounded-[16px] bg-ink px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-white transition-colors duration-200 hover:bg-graphite"
            >
              Book From Your Phone
              <ArrowRight
                className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <p className="flex items-center gap-2 text-[0.8125rem] font-semibold text-muted">
              <Smartphone className="h-4 w-4" aria-hidden="true" />
              No app install required
            </p>
          </div>
        </div>

        {/* Device preview — a representation of the interface described above */}
        <div
          data-reveal
          className="surface-dark relative flex justify-center overflow-hidden rounded-[var(--radius-tile)] bg-ink px-6 py-14 sm:py-16"
        >
          <span
            aria-hidden="true"
            className="absolute top-[-30%] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-volt/12 blur-3xl"
          />

          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

/**
 * Static, non-interactive rendering of the booking UI at phone width. Hidden
 * from assistive tech — everything it depicts is stated in the copy beside it.
 */
function PhoneMockup() {
  return (
    <div
      aria-hidden="true"
      className="relative w-[16.5rem] rounded-[2.25rem] border-[7px] border-graphite bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] sm:w-[17.5rem]"
    >
      {/* Notch */}
      <span className="absolute top-2.5 left-1/2 h-4 w-20 -translate-x-1/2 rounded-full bg-graphite" />

      <div className="rounded-[1.75rem] bg-cloud px-4 pt-9 pb-5">
        {/* App bar */}
        <div className="flex items-center justify-between">
          <span className="text-[0.6875rem] font-extrabold tracking-[-0.02em] text-ink">
            BookOur<span className="text-muted">Rental</span>
          </span>
          <span className="h-5 w-5 rounded-full bg-ink" />
        </div>

        {/* Booking card */}
        <div className="mt-4 rounded-2xl border border-line bg-white p-3.5">
          <p className="text-[0.5rem] font-bold tracking-[0.16em] text-muted uppercase">
            Pickup location
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[0.8125rem] font-bold text-ink">
            <MapPin className="h-3 w-3 text-muted" />
            Miami, FL
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
            <div>
              <p className="text-[0.5rem] font-bold tracking-[0.16em] text-muted uppercase">
                Pickup
              </p>
              <p className="mt-1 text-[0.75rem] font-bold text-ink">
                Sep 15 · 10:00
              </p>
            </div>
            <div>
              <p className="text-[0.5rem] font-bold tracking-[0.16em] text-muted uppercase">
                Return
              </p>
              <p className="mt-1 text-[0.75rem] font-bold text-ink">
                Sep 18 · 10:00
              </p>
            </div>
          </div>

          <div className="mt-3.5 flex items-center justify-center gap-1.5 rounded-xl bg-volt py-2.5 text-[0.75rem] font-extrabold text-ink">
            <Search className="h-3 w-3" />
            Search Cars
          </div>
        </div>

        {/* Result preview */}
        <p className="mt-4 text-[0.5625rem] font-bold tracking-[0.16em] text-muted uppercase">
          12 vehicles
        </p>

        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-2.5">
            <span className="h-9 w-12 shrink-0 rounded-lg bg-gradient-to-br from-graphite to-ink" />
            <div className="min-w-0 flex-1">
              <p className="text-[0.75rem] font-bold text-ink">Toyota RAV4</p>
              <p className="text-[0.625rem] text-muted">5 seats · Automatic</p>
            </div>
            <p className="text-[0.75rem] font-extrabold text-ink">$58</p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-2.5 opacity-60">
            <span className="h-9 w-12 shrink-0 rounded-lg bg-gradient-to-br from-muted to-graphite" />
            <div className="min-w-0 flex-1">
              <p className="text-[0.75rem] font-bold text-ink">
                Volkswagen Golf
              </p>
              <p className="text-[0.625rem] text-muted">5 seats · 2 bags</p>
            </div>
            <p className="text-[0.75rem] font-extrabold text-ink">$42</p>
          </div>
        </div>
      </div>
    </div>
  );
}
