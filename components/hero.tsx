import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section
      className="surface-dark relative isolate flex min-h-[38rem] flex-col justify-end overflow-hidden bg-ink pt-28 pb-24 sm:min-h-[42rem] lg:min-h-[92svh] lg:pt-40 lg:pb-40"
      aria-labelledby="hero-heading"
    >
      {/* Cinematic backdrop */}
      <div className="veil absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=2400&q=80"
          alt="A white sedan parked on a coastal highway above the Pacific, with headlands rolling into the distance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] lg:object-center"
        />
      </div>

      {/* Readability scrim: strong on the copy side, clearing toward the car */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/45 to-ink/85 lg:bg-gradient-to-r lg:from-ink/92 lg:via-ink/55 lg:to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent"
      />
      {/* Keeps the transparent navigation legible over bright sky */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-ink/75 to-transparent"
      />

      <div className="shell relative">
        <div className="max-w-3xl">
          <p
            className="rise eyebrow text-white/70"
            style={{ "--rise-delay": "80ms" } as React.CSSProperties}
          >
            Move freely
          </p>

          <h1
            id="hero-heading"
            className="rise display-xl mt-6 text-balance text-white"
            style={{ "--rise-delay": "160ms" } as React.CSSProperties}
          >
            Your next drive
            <br />
            starts <span className="mark-volt">here.</span>
          </h1>

          <p
            className="rise mt-7 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl"
            style={{ "--rise-delay": "260ms" } as React.CSSProperties}
          >
            Compare vehicles, choose your pickup point, and reserve a car that
            fits the way you travel.
          </p>

          <div
            className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ "--rise-delay": "360ms" } as React.CSSProperties}
          >
            <Link
              href="#booking"
              className="group inline-flex items-center justify-center gap-2.5 rounded-[16px] bg-volt px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-ink transition-colors duration-200 hover:bg-volt-deep"
            >
              Find a Car
              <ArrowRight
                className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="#fleet"
              className="inline-flex items-center justify-center gap-2.5 rounded-[16px] border border-white/30 px-7 py-4 text-base font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/60 hover:bg-white/10"
            >
              Explore Fleet
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue — decorative, hidden from assistive tech */}
      <div
        aria-hidden="true"
        className="absolute right-8 bottom-40 hidden items-center gap-3 xl:flex"
      >
        <span className="text-[0.625rem] font-bold tracking-[0.28em] text-white/45 uppercase [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25">
          <ArrowDown className="h-4 w-4 animate-bounce text-volt" />
        </span>
      </div>
    </section>
  );
}
