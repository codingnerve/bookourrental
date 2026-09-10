import Link from "next/link";

import { Wordmark } from "@/components/brand-mark";
import { MapPin, Phone } from "lucide-react";

import { companyContact, footerColumns, siteConfig } from "@/data/site";

const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramGlyph },
  { label: "X", href: "https://x.com", icon: XGlyph },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInGlyph },
  { label: "YouTube", href: "https://youtube.com", icon: YouTubeGlyph },
];

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

            <ul className="mt-8 flex items-center gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={`${siteConfig.name} on ${social.label}`}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-volt hover:bg-volt hover:text-ink"
                  >
                    <social.icon />
                  </a>
                </li>
              ))}
            </ul>
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

/* -------------------------------------------------------------------------- */
/* Simple geometric social glyphs — drawn here to avoid an icon dependency     */
/* -------------------------------------------------------------------------- */

const glyphProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
} as const;

function InstagramGlyph() {
  return (
    <svg {...glyphProps} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg
      {...glyphProps}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path d="M5 5 19 19" />
      <path d="M19 5 5 19" />
    </svg>
  );
}

function LinkedInGlyph() {
  return (
    <svg {...glyphProps} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M7.6 10.4v6.2" strokeLinecap="round" />
      <circle cx="7.6" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
      <path
        d="M11.4 16.6v-6.2m0 2.1a2.4 2.4 0 0 1 4.8 0v4.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function YouTubeGlyph() {
  return (
    <svg {...glyphProps} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.4 9.6 4.8 2.9-4.8 2.9z" fill="currentColor" stroke="none" />
    </svg>
  );
}
