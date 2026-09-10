import { SectionHeading } from "@/components/section-heading";
import { processSteps } from "@/data/site";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-28 border-y border-line bg-white py-24 lg:py-32"
    >
      <div className="shell">
        <SectionHeading
          id="how-it-works-heading"
          eyebrow="04 — How it works"
          title={
            <>
              From search to <span className="mark-volt">steering wheel.</span>
            </>
          }
          subtitle="Three steps, no detours. There is no account to create — you go straight from the search bar to a confirmed booking."
        />

        <ol className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {processSteps.map((step, index) => (
            <li
              key={step.step}
              data-reveal
              style={
                { "--reveal-delay": `${index * 140}ms` } as React.CSSProperties
              }
              className="group"
            >
              {/* Timeline rail: marker plus the line running to the next step */}
              <div className="flex items-center gap-4" aria-hidden="true">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-ink">
                  <span className="h-2.5 w-2.5 rounded-full bg-volt transition-transform duration-300 group-hover:scale-125" />
                </span>
                <span
                  className={`h-px flex-1 ${
                    index === processSteps.length - 1
                      ? "bg-gradient-to-r from-line to-transparent"
                      : "bg-line"
                  }`}
                />
              </div>

              <p className="mt-7 text-[0.8125rem] font-bold tracking-[0.24em] text-muted">
                {step.step}
              </p>

              <h3 className="display-md mt-3 text-ink">{step.title}</h3>

              <p className="mt-4 max-w-sm text-[1.0625rem] leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
