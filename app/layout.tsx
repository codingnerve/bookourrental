import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";
import { MobileCallBar } from "@/components/mobile-call-bar";
import { companyContact, siteConfig } from "@/data/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/**
 * Preview builds (temporary share links) must not be indexed, or they compete
 * with the real domain in search results. Set NEXT_PUBLIC_PREVIEW=1 at build
 * time for those; production builds leave it unset and stay indexable.
 */
const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "1";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "car rental",
    "rent a car",
    "airport car rental",
    "SUV rental",
    "rental car booking",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: isPreview
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
  colorScheme: "light",
};

/**
 * Structured data. Deliberately limited to facts the site can stand behind —
 * no ratings, review counts or business claims.
 */
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: companyContact.phone.e164,
    email: companyContact.email.address,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyContact.address.street,
      addressLocality: companyContact.address.city,
      addressRegion: companyContact.address.state,
      postalCode: companyContact.address.postalCode,
      addressCountry: companyContact.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: companyContact.phone.e164,
      email: companyContact.email.address,
      areaServed: "US",
      availableLanguage: "English",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/cars?pickup={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Opt in to Next's smooth-scroll handling for route transitions.
      data-scroll-behavior="smooth"
      className={`${manrope.variable} h-full antialiased`}
    >
      {/* The bottom padding clears the fixed call bar so the end of the footer
          is never trapped underneath it. */}
      <body className="flex min-h-full flex-col pb-20 xl:pb-0">
        <a
          href="#main"
          className="sr-only rounded-[12px] focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <MobileCallBar />
        <script
          type="application/ld+json"
          // Static, author-controlled JSON — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
