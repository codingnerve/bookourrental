"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { companyContact, primaryNav } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, closeMenu]);

  // Solid chrome whenever the page has scrolled or the mobile sheet is open.
  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
          solid
            ? "border-b border-line bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(11,18,32,0.04)]"
            : "border-b border-white/10 bg-transparent",
        ].join(" ")}
      >
        <div className="shell">
          <div className="flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
            {/* Brand */}
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-md"
              aria-label="BookOurRental — home"
            >
              <BrandMark inverted={!solid} className="h-9 w-9 shrink-0" />
              <span
                className={[
                  "hidden text-[1.0625rem] leading-none font-extrabold tracking-[-0.03em] sm:inline",
                  solid ? "text-ink" : "text-white",
                ].join(" ")}
              >
                BookOur
                <span className={solid ? "text-muted" : "text-white/55"}>
                  Rental
                </span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 lg:flex"
            >
              {primaryNav.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={[
                    "relative rounded-md px-3.5 py-2 text-[0.9375rem] font-semibold transition-colors",
                    "after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-volt after:transition-transform after:duration-300 hover:after:scale-x-100",
                    solid
                      ? "text-ink/75 hover:text-ink"
                      : "text-white/80 hover:text-white",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-1.5 lg:flex">
              <a
                href={companyContact.phone.href}
                className={[
                  "hidden items-center gap-2 rounded-md px-3 py-2 text-[0.9375rem] font-bold transition-colors xl:inline-flex",
                  solid
                    ? "text-ink hover:text-muted"
                    : "text-white hover:text-white/70",
                ].join(" ")}
              >
                <Phone className="h-4 w-4 text-volt" aria-hidden="true" />
                {companyContact.phone.display}
              </a>
              <Link
                href="/contact"
                className={[
                  "rounded-md px-3 py-2 text-[0.9375rem] font-semibold transition-colors",
                  solid
                    ? "text-muted hover:text-ink"
                    : "text-white/70 hover:text-white",
                ].join(" ")}
              >
                Contact
              </Link>
              <Link
                href="#booking"
                className="group ml-2 inline-flex items-center gap-2 rounded-[14px] bg-volt px-5 py-3 text-[0.9375rem] font-bold text-ink transition-colors duration-200 hover:bg-volt-deep"
              >
                Book a Car
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Mobile actions — the number rides in the sticky bar itself, so
                it stays on screen the whole way down the page. */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={companyContact.phone.href}
                className={[
                  "flex items-center gap-2 rounded-[12px] px-3.5 py-2.5 text-sm font-extrabold transition-colors",
                  solid
                    ? "bg-ink text-white"
                    : "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm",
                ].join(" ")}
              >
                <Phone
                  className="h-4 w-4 shrink-0 text-volt"
                  aria-hidden="true"
                />
                <span className="hidden whitespace-nowrap xs:inline">
                  {companyContact.phone.display}
                </span>
                <span className="whitespace-nowrap xs:hidden">Call</span>
              </a>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className={[
                  "inline-flex h-11 w-11 items-center justify-center rounded-[12px] border transition-colors",
                  solid
                    ? "border-line text-ink hover:bg-cloud"
                    : "border-white/25 text-white hover:bg-white/10",
                ].join(" ")}
              >
                {menuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sheet. It sits outside <header> on purpose: the bar's
          `backdrop-blur` would otherwise become the containing block for this
          fixed panel and collapse it to the bar's height. */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="shell py-5">
          <ul className="divide-y divide-line">
            {primaryNav.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-4 text-lg font-bold tracking-[-0.02em] text-ink"
                >
                  {link.label}
                  <ArrowRight
                    className="h-4 w-4 text-muted"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3">
            <a
              href={companyContact.phone.href}
              className="flex items-center justify-center gap-2.5 rounded-[14px] bg-ink px-4 py-3.5 text-center text-[0.9375rem] font-bold text-white"
            >
              <Phone className="h-4 w-4 text-volt" aria-hidden="true" />
              {companyContact.phone.display}
            </a>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block rounded-[14px] border border-line px-4 py-3.5 text-center text-[0.9375rem] font-bold text-ink"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
