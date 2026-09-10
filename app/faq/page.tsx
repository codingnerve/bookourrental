import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { faqGroups } from "@/data/faq";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers on booking, vehicle classes, pickup and return, deposits and cancellation terms for rentals booked through BookOurRental.",
  alternates: { canonical: "/faq" },
};

/** Real question-and-answer content, so FAQPage markup is legitimate here. */
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.url}/faq#faqpage`,
  mainEntity: faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  ),
};

export default function FaqPage() {
  const questionCount = faqGroups.reduce(
    (total, group) => total + group.items.length,
    0,
  );

  return (
    <>
      <Navbar />

      <main id="main" className="flex-1">
        <PageHeader
          eyebrow="Help centre"
          title={
            <>
              The things people ask{" "}
              <span className="mark-volt">at the counter.</span>
            </>
          }
          intro={`${questionCount} answers on how booking works here, what a vehicle class actually guarantees, and which parts of a rental vary by supplier rather than by us.`}
        >
          {/* Jump links — a plain anchor list, no JavaScript required */}
          <nav aria-label="FAQ sections" className="mt-10">
            <ul className="flex flex-wrap gap-2.5">
              {faqGroups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="inline-flex items-center rounded-full border border-white/20 px-4 py-2.5 text-sm font-bold text-white/80 transition-colors duration-200 hover:border-volt hover:bg-volt hover:text-ink"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </PageHeader>

        <div className="shell py-20 lg:py-28">
          <div className="space-y-20 lg:space-y-24">
            {faqGroups.map((group, groupIndex) => (
              <section
                key={group.id}
                id={group.id}
                aria-labelledby={`${group.id}-heading`}
                className="scroll-mt-28 lg:grid lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16"
              >
                <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
                  <p className="eyebrow text-muted">
                    {String(groupIndex + 1).padStart(2, "0")} —{" "}
                    {group.items.length} questions
                  </p>
                  <h2
                    id={`${group.id}-heading`}
                    className="display-md mt-5 text-balance text-ink"
                  >
                    {group.title}
                  </h2>
                  <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-muted">
                    {group.blurb}
                  </p>
                </div>

                <ul
                  data-reveal
                  className="mt-8 divide-y divide-line border-t border-line lg:mt-0"
                >
                  {group.items.map((item) => (
                    <li key={item.question}>
                      {/* Native disclosure: keyboard accessible, no JS bundle */}
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                          <h3 className="text-[1.0625rem] leading-snug font-bold tracking-[-0.015em] text-ink lg:text-lg">
                            {item.question}
                          </h3>
                          <span
                            aria-hidden="true"
                            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-[transform,background-color,border-color] duration-300 group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-white"
                          >
                            <Plus className="h-4 w-4" />
                          </span>
                        </summary>
                        <p className="max-w-2xl pb-7 text-[1.0625rem] leading-relaxed text-muted sm:pr-14">
                          {item.answer}
                        </p>
                      </details>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        {/* Still stuck */}
        <section className="surface-dark bg-ink py-20 lg:py-24">
          <div className="shell">
            <div
              data-reveal
              className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"
            >
              <div>
                <h2 className="display-md max-w-xl text-balance text-white">
                  Still not answered?
                </h2>
                <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-white/65">
                  Send us the details — a booking reference if you have one —
                  and we will come back to you.
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[16px] bg-volt px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-ink transition-colors duration-200 hover:bg-volt-deep"
              >
                Contact support
                <ArrowRight
                  className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollReveal />

      <script
        type="application/ld+json"
        // Author-controlled content from data/faq.ts — no user input involved.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </>
  );
}
