import Link from "next/link";

import { Wordmark } from "@/components/brand-mark";
import { MapPin, Phone } from "lucide-react";

import { companyContact, footerColumns, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="surface-dark bg-graphite">
      <div className="shell py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))] lg:gap-x-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" aria-label="BookOurRental — home">
              <Wordmark tone="dark" />
            </Link>

            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-white/60">
              Making car rental discovery simpler, clearer, and easier for every
              journey.
            </p>

            <address className="mt-7 space-y-3 not-italic">
              <a
                href={companyContact.phone.href}
                className="flex items-center gap-2.5 text-[1.0625rem] font-extrabold tracking-[-0.02em] text-white transition-colors hover:text-volt"
              >
                <Phone
                  className="h-4 w-4 shrink-0 text-volt"
                  aria-hidden="true"
                />
                {companyContact.phone.display}
              </a>
              <p className="flex max-w-xs gap-2.5 text-[0.9375rem] leading-relaxed text-white/60">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-white/40"
                  aria-hidden="true"
                />
                <span>
                  {companyContact.address.street}
                  <br />
                  {companyContact.address.city}, {companyContact.address.state}{" "}
                  {companyContact.address.postalCode}
                </span>
              </p>
            </address>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-[0.6875rem] font-bold tracking-[0.18em] text-white/45 uppercase">
                {column.heading}
              </h2>
              <ul className="mt-5 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.9375rem] font-medium text-white/75 transition-colors duration-200 hover:text-volt"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-4 py-7 sm:flex-row sm:items-center">
          <p className="text-[0.8125rem] text-white/50">
            © 2026 {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-[0.8125rem] text-white/40">
            Rates and availability shown are indicative until confirmed at
            reservation.
          </p>
        </div>
      </div>
    </footer>
  );
}

