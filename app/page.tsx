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
import { MobileBooking } from "@/components/mobile-booking";
import { Navbar } from "@/components/navbar";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TrustStrip } from "@/components/trust-strip";

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main" className="flex-1">
        <Hero />

        {/* Booking command centre — floats over the base of the hero on
            desktop and settles just below it on phones. */}
        <div
          id="booking"
          className="relative z-30 -mt-16 scroll-mt-24 lg:-mt-28 lg:scroll-mt-28"
        >
          <div className="shell">
            <BookingSearch />
          </div>
        </div>

        <TrustStrip />
        <FeaturedVehicles />
        <DriveCategories />
        <Destinations />
        <HowItWorks />
        <Benefits />
        <Deals />
        <MobileBooking />
        <FinalCta />
      </main>

      <Footer />
      <CookieConsent />
      <ScrollReveal />
    </>
  );
}
