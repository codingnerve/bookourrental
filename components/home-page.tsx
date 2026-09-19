import { Benefits } from "@/components/benefits";
import { BookingSearch } from "@/components/booking-search";
import { CookieConsent } from "@/components/cookie-consent";
import { Deals } from "@/components/deals";
import { Destinations } from "@/components/destinations";
import { DriveCategories } from "@/components/drive-categories";
import { FeaturedVehicles } from "@/components/featured-vehicles";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { HtmlLang } from "@/components/html-lang";
import { MobileBooking } from "@/components/mobile-booking";
import { Navbar } from "@/components/navbar";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TrustStrip } from "@/components/trust-strip";
import type { Locale } from "@/data/i18n";

/**
 * The homepage, shared by every language. `/` renders it in English and
 * `/alquiler-de-coches` in Spanish — same sections, same order, same layout.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <HtmlLang locale={locale} />
      <Navbar locale={locale} />

      <main id="main" className="flex-1">
        <Hero locale={locale} />

        {/* Booking command centre — floats over the base of the hero on
            desktop and settles just below it on phones. */}
        <div
          id="booking"
          className="relative z-30 -mt-16 scroll-mt-24 lg:-mt-28 lg:scroll-mt-28"
        >
          <div className="shell">
            <BookingSearch locale={locale} />
          </div>
        </div>

        <TrustStrip locale={locale} />
        <FeaturedVehicles locale={locale} />
        <DriveCategories locale={locale} />
        <Destinations locale={locale} />
        <HowItWorks locale={locale} />
        <Benefits locale={locale} />
        <Deals locale={locale} />
        <MobileBooking locale={locale} />
        <FinalCta locale={locale} />
      </main>

      <Footer locale={locale} />
      <CookieConsent locale={locale} />
      <ScrollReveal />
    </>
  );
}
