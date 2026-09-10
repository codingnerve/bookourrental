import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  contactChannels,
  supportHoursAreProvisional,
  type ContactIcon,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the BookOurRental support desk about a new reservation, an existing booking, pickup locations or billing.",
  alternates: { canonical: "/contact" },
};

const icons: Record<ContactIcon, typeof Mail> = {
  mail: Mail,
  phone: Phone,
  clock: Clock,
  mapPin: MapPin,
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main id="main" className="flex-1">
        <PageHeader
          eyebrow="Contact"
          title={
            <>
              Talk to someone who can{" "}
              <span className="mark-volt">actually help.</span>
            </>
          }
          intro="Reservation questions, changes to a trip already booked, or something that went sideways at the counter — send it here and it reaches the support desk."
        />

        <section
          aria-labelledby="contact-form-heading"
          className="shell py-20 lg:py-28"
        >
          <h2 id="contact-form-heading" className="sr-only">
            Ways to get in touch
          </h2>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14">
            {/* Form */}
            <div data-reveal>
              <ContactForm />
            </div>

            {/* Channels */}
            <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
              <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-tile)] border border-line bg-white">
                {contactChannels.map((channel) => {
                  const Icon = icons[channel.icon];
                  return (
                    <li key={channel.label} className="p-6">
                      <p className="flex items-center gap-2.5 text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink">
                          <Icon
                            className="h-3.5 w-3.5 text-volt"
                            aria-hidden="true"
                          />
                        </span>
                        {channel.label}
                      </p>

                      {channel.href ? (
                        <a
                          href={channel.href}
                          className="mt-3 block text-lg font-extrabold tracking-[-0.02em] text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-volt"
                        >
                          {channel.value}
                        </a>
                      ) : (
                        <p className="mt-3 text-lg font-extrabold tracking-[-0.02em] text-ink">
                          {channel.value}
                        </p>
                      )}

                      <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                        {channel.note}
                      </p>
                    </li>
                  );
                })}
              </ul>

              {supportHoursAreProvisional ? (
                <p className="mt-4 flex gap-2.5 rounded-[14px] border border-line bg-cloud px-4 py-3 text-[0.8125rem] leading-relaxed text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted"
                  />
                  The support email and published hours are still being
                  confirmed. The phone number and mailing address are live.
                </p>
              ) : null}

              {/* Self-serve nudge */}
              <div className="surface-dark mt-6 overflow-hidden rounded-[var(--radius-tile)] bg-ink">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=900&q=80"
                    alt="A person checking their phone while holding a coffee cup"
                    fill
                    sizes="(min-width: 1024px) 28vw, 92vw"
                    className="object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg leading-snug font-extrabold tracking-[-0.02em] text-white">
                    Faster than waiting on a reply
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/65">
                    Deposits, fuel policies, minimum age and cancellation terms
                    are already written up in the FAQ.
                  </p>
                  <Link
                    href="/faq"
                    className="group mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-bold text-volt"
                  >
                    Read the FAQ
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

        {/* Booking CTA */}
        <section className="surface-dark bg-ink py-20 lg:py-24">
          <div className="shell">
            <div
              data-reveal
              className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"
            >
              <div>
                <h2 className="display-md max-w-xl text-balance text-white">
                  Not a support question — just need a car?
                </h2>
                <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-white/65">
                  Search takes under a minute and there is no account to create.
                </p>
              </div>

              <Link
                href="/#booking"
                className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[16px] bg-volt px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-ink transition-colors duration-200 hover:bg-volt-deep"
              >
                Find a car
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
    </>
  );
}
