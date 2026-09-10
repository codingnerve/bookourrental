export const siteConfig = {
  name: "BookOurRental",
  tagline: "Find & Book Your Rental Car",
  description:
    "Compare rental cars, explore pickup locations, and find the right vehicle for your next trip with BookOurRental.",
  url: "https://www.bookourental.com",
  locale: "en_US",
} as const;

export interface NavLink {
  label: string;
  href: string;
}

/**
 * Hash targets are written as `/#id` rather than `#id` so they resolve from
 * any route, not just the home page.
 */
export const primaryNav: NavLink[] = [
  { label: "Browse Cars", href: "/cars" },
  { label: "Locations", href: "/#destinations" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Deals", href: "/#deals" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

/* -------------------------------------------------------------------------- */
/* Trust strip                                                                 */
/* -------------------------------------------------------------------------- */

export type TrustIcon = "search" | "listChecks" | "mapPin" | "lock";

export interface TrustItem {
  icon: TrustIcon;
  label: string;
}

export const trustItems: TrustItem[] = [
  { icon: "search", label: "Easy online booking" },
  { icon: "listChecks", label: "Transparent vehicle details" },
  { icon: "mapPin", label: "Flexible pickup options" },
  { icon: "lock", label: "Secure reservation process" },
];

/* -------------------------------------------------------------------------- */
/* How it works                                                                */
/* -------------------------------------------------------------------------- */

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Search",
    body: "Tell us where and when you need a car. Add a different return point if the trip runs one way.",
  },
  {
    step: "02",
    title: "Compare",
    body: "Explore vehicles side by side — seats, bags, transmission, fuel and the daily rate, all on one line.",
  },
  {
    step: "03",
    title: "Reserve",
    body: "Choose your vehicle and complete the booking. Your confirmation and pickup details arrive by email.",
  },
];

/* -------------------------------------------------------------------------- */
/* Why BookOurRental                                                           */
/* -------------------------------------------------------------------------- */

export type BenefitIcon = "gauge" | "mapPin" | "clock" | "headset";

export interface Benefit {
  step: string;
  icon: BenefitIcon;
  title: string;
  body: string;
}

export const benefits: Benefit[] = [
  {
    step: "01",
    icon: "gauge",
    title: "Clear vehicle information",
    body: "Seats, luggage, transmission and fuel type sit on the card — not three clicks into a modal.",
  },
  {
    step: "02",
    icon: "mapPin",
    title: "Flexible pickup choices",
    body: "Airport counters and city desks, with the option to return the car somewhere else entirely.",
  },
  {
    step: "03",
    icon: "clock",
    title: "Simple online reservations",
    body: "One search, one comparison, one confirmation. No account to create and no password to remember.",
  },
  {
    step: "04",
    icon: "headset",
    title: "Support when you need it",
    body: "Reservation help before you travel and a direct line to the desk once you are on the road.",
  },
];

/* -------------------------------------------------------------------------- */
/* Featured deal — placeholder content, ready to be driven by the backend      */
/* -------------------------------------------------------------------------- */

export interface FeaturedDeal {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Conditions shown verbatim. Keep these factual once pricing is live. */
  terms: string[];
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
}

export const featuredDeal: FeaturedDeal = {
  id: "weekend-escape",
  eyebrow: "Featured offer",
  title: "Your next getaway deserves a better rate.",
  body: "Weekend Escape brings our long-stay pricing forward to rentals of three days or more. Rates vary by city, class and dates — the exact figure shows up the moment you search.",
  terms: [
    "Applies to selected vehicles on rentals of 3 days or longer",
    "Availability and rates differ by location and travel dates",
    "Final price is confirmed at the reservation step",
  ],
  ctaLabel: "Explore deals",
  ctaHref: "/cars?collection=weekend-escapes",
  image:
    "https://images.unsplash.com/photo-1541348263662-e068662d82af?auto=format&fit=crop&w=1800&q=80",
  imageAlt:
    "Car with headlights on driving down a tree-lined road covered in autumn leaves",
};

/* -------------------------------------------------------------------------- */
/* Contact channels                                                            */
/* -------------------------------------------------------------------------- */

export type ContactIcon = "mail" | "phone" | "clock" | "mapPin";

export interface ContactChannel {
  icon: ContactIcon;
  label: string;
  value: string;
  /** Rendered as a link when set. */
  href?: string;
  note: string;
}

/**
 * Company contact details used site-wide. Single source of truth — the header,
 * footer, contact page, success modal and Organization schema all read these,
 * so a change here propagates everywhere.
 */
export const companyContact = {
  phone: {
    /** E.164, for tel: links and structured data. */
    e164: "+18553504872",
    /** Human-readable, for display. */
    display: "+1 (855) 350-4872",
    href: "tel:+18553504872",
  },
  email: {
    address: "support@bookourental.com",
    href: "mailto:support@bookourental.com",
  },
  address: {
    street: "30 N Gould St Ste R",
    city: "Sheridan",
    state: "WY",
    postalCode: "82801",
    country: "US",
    /** Single-line form for compact placements. */
    inline: "30 N Gould St Ste R, Sheridan, WY 82801",
  },
  hours: "Mon–Fri, 8am–8pm ET",
} as const;

/**
 * The email address and published support hours still need confirming; the
 * phone number and mailing address are live.
 */
export const supportHoursAreProvisional = true;

export const contactChannels: ContactChannel[] = [
  {
    icon: "phone",
    label: "Call us",
    value: companyContact.phone.display,
    href: companyContact.phone.href,
    note: "Fastest route to a booking — our team can check availability on the call.",
  },
  {
    icon: "mail",
    label: "Email us",
    value: companyContact.email.address,
    href: companyContact.email.href,
    note: "Best for reservation changes and anything with a booking reference.",
  },
  {
    icon: "mapPin",
    label: "Mailing address",
    value: companyContact.address.inline,
    note: "Correspondence only — this is not a vehicle pickup location.",
  },
  {
    icon: "clock",
    label: "Support hours",
    value: companyContact.hours,
    note: "Weekend cover runs 9am–5pm ET for active reservations.",
  },
];

export const contactTopics = [
  "A new reservation",
  "An existing booking",
  "Pickup or return locations",
  "Billing and payments",
  "Something else",
] as const;

/* -------------------------------------------------------------------------- */
/* Footer                                                                      */
/* -------------------------------------------------------------------------- */

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    heading: "Explore",
    links: [
      { label: "Cars", href: "/cars" },
      { label: "Locations", href: "/#destinations" },
      { label: "Deals", href: "/#deals" },
      { label: "How It Works", href: "/#how-it-works" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "/faq" },
      { label: "Reservation Support", href: "/contact" },
      { label: "Cancellation", href: "/faq#payments" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];
