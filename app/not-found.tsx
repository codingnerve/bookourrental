import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { primaryNav } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * Site-wide 404. Also catches any URL that matches no route at all, so a stale
 * link or a mistyped path lands somewhere branded with a way back, rather than
 * on the framework's default page.
 */
export default function NotFound() {
  return (
    <>
      <Navbar />

      <main id="main" className="flex-1">
        <section className="surface-dark bg-ink pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="shell">
            <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-white/10">
              <Compass className="h-6 w-6 text-volt" aria-hidden="true" />
            </span>

            <p className="eyebrow mt-8 text-white/60">Error 404</p>

            <h1 className="display-lg mt-5 max-w-2xl text-balance text-white">
              That page is not <span className="mark-volt">here.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
              The address may have changed, or the link that brought you here
              may be out of date. The main sections of the site are listed
              below.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2.5 rounded-[16px] bg-volt px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-ink transition-colors duration-200 hover:bg-volt-deep"
              >
                Back to home
                <ArrowRight
                  className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-[16px] border border-white/30 px-7 py-4 text-base font-bold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10"
              >
                Contact support
              </Link>
            </div>
          </div>
        </section>

        <nav aria-label="Site sections" className="shell py-16 lg:py-20">
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-tile)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between gap-4 bg-white px-6 py-6 transition-colors duration-200 hover:bg-cloud"
                >
                  <span className="text-[1.0625rem] font-extrabold tracking-[-0.02em] text-ink">
                    {link.label}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 flex-none text-muted"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <Footer />
    </>
  );
}
