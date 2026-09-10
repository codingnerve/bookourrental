export type VehicleCategory =
  | "Economy"
  | "Compact"
  | "SUV"
  | "Luxury";

export type Transmission = "Automatic" | "Manual";

export type FuelType = "Gasoline" | "Hybrid" | "Electric" | "Diesel";

export interface Vehicle {
  /** Stable slug — the route segment used by /cars/[id]. */
  id: string;
  name: string;
  /** Human-readable body style shown under the model name. */
  bodyStyle: string;
  category: VehicleCategory;
  passengers: number;
  luggage: number;
  /** Doors on the representative model, hatchback tailgates included. */
  doors: number;
  transmission: Transmission;
  fuel: FuelType;
  /** Indicative daily rate in USD. Replace with live pricing from the API. */
  pricePerDay: number;
  image: string;
  /** Descriptive alt text — never decorative, these images carry meaning. */
  imageAlt: string;
  /** One line for search results and social cards. Kept under 160 characters. */
  metaDescription: string;
  /**
   * Editorial copy for the detail page. Describes what the class is like to
   * live with — no invented statistics, no ratings, no scarcity claims.
   */
  summary: string;
  /** Trips this class genuinely fits. */
  suitedTo: string[];
  /** The honest limits. Every class has them; hiding them costs us later. */
  considerations: string[];
}

/**
 * Demo fleet. Shapes match what a `/api/vehicles` response should return so the
 * UI can be pointed at a real backend without touching components.
 */
export const vehicles: Vehicle[] = [
  {
    id: "fiat-500",
    name: "Fiat 500",
    bodyStyle: "Economy Hatchback",
    category: "Economy",
    passengers: 4,
    luggage: 1,
    doors: 3,
    transmission: "Automatic",
    fuel: "Gasoline",
    pricePerDay: 34,
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Light blue Fiat 500 economy hatchback parked on a quiet city street",
    metaDescription:
      "The Fiat 500 or similar — a four-seat economy hatchback built for city driving, tight parking and low running costs. Specs, conditions and indicative rate.",
    summary:
      "The Fiat 500 is a city car in the most literal sense. It is short enough to take the parking space everyone else drove past, light on fuel in stop-start traffic, and easy to place on streets that were laid out long before cars were. Four seats and one large case is the honest limit — but for two people working through a compact city centre, very little else is this uncomplicated to drive.",
    suitedTo: [
      "Two people on a city break, with a large case and a cabin bag between them",
      "Multi-storey car parks, narrow lanes and kerbside spaces that defeat larger cars",
      "Short urban journeys where fuel cost matters more than motorway comfort",
      "Solo trips where the smallest sensible car is also the cheapest to run",
    ],
    considerations: [
      "One large case fits the boot — a second one travels on the back seat",
      "The rear seats work for short hops rather than a full day of driving",
      "Long motorway stretches are noisier than in a compact or mid-size car",
    ],
  },
  {
    id: "volkswagen-golf",
    name: "Volkswagen Golf",
    bodyStyle: "Compact Hatchback",
    category: "Compact",
    passengers: 5,
    luggage: 2,
    doors: 5,
    transmission: "Automatic",
    fuel: "Gasoline",
    pricePerDay: 42,
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Teal Volkswagen Golf compact hatchback photographed from the front on a sunlit road",
    metaDescription:
      "The Volkswagen Golf or similar — a five-seat compact hatchback that balances city parking with motorway comfort. Specs, conditions and indicative rate.",
    summary:
      "The Golf is the default answer for a reason. It sits between the city car and the SUV: still easy to park and still cheap to run, but with five real seats, a boot that takes two large cases and a motorway manner that does not wear you down three hours in. If you are unsure which class to book, this is usually the one you do not end up regretting.",
    suitedTo: [
      "Couples or a small family covering a mix of city streets and motorway miles",
      "Two large cases in the boot, plus cabin bags on the back seat",
      "Trips that want compact-car running costs without compact-car compromises",
      "Driving somewhere unfamiliar — a predictable size and a predictable layout",
    ],
    considerations: [
      "Five belted seats suit adults on shorter journeys; four is more comfortable all day",
      "Two large cases with the rear seats up — a fourth means folding one down",
      "Not the class for rough tracks, deep snow or unsurfaced access roads",
    ],
  },
  {
    id: "toyota-rav4",
    name: "Toyota RAV4",
    bodyStyle: "Standard SUV",
    category: "SUV",
    passengers: 5,
    luggage: 3,
    doors: 5,
    transmission: "Automatic",
    fuel: "Hybrid",
    pricePerDay: 58,
    image:
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Grey Toyota RAV4 sport utility vehicle viewed from the front three-quarter angle",
    metaDescription:
      "The Toyota RAV4 or similar — a five-seat hybrid SUV with room for three large cases. Specs, rental conditions and indicative daily rate.",
    summary:
      "The RAV4 is a family SUV that behaves like a sensible one. The hybrid drivetrain makes fuel stops rarer than the size of the car suggests, the raised seating position makes unfamiliar roads easier to read, and the boot takes three large cases without anyone folding a seat down. It is the class most people mean when they say they want an SUV, but not a huge one.",
    suitedTo: [
      "Four or five travellers with full luggage rather than weekend bags",
      "Mixed routes — motorway miles, mountain roads and gravel access tracks",
      "Longer itineraries where a week of fuel economy is worth paying for up front",
      "Ski, beach and hiking trips where the gear takes more room than the people",
    ],
    considerations: [
      "A bigger footprint than a compact — city-centre parking takes more thought",
      "All-wheel drive is not standard across this class; confirm it at the reservation step if your route needs it",
      "Hybrid here means better economy in traffic, not a plug-in charging routine",
    ],
  },
  {
    id: "bmw-5-series",
    name: "BMW 5 Series",
    bodyStyle: "Luxury Sedan",
    category: "Luxury",
    passengers: 5,
    luggage: 3,
    doors: 4,
    transmission: "Automatic",
    fuel: "Gasoline",
    pricePerDay: 96,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Black BMW 5 Series luxury sedan parked beside a modern building at dusk",
    metaDescription:
      "The BMW 5 Series or similar — a five-seat luxury sedan for long motorway routes and business travel. Specs, conditions and indicative daily rate.",
    summary:
      "The 5 Series is built for the long drive rather than the short one. A quiet cabin, seats that are still comfortable at hour four and a boot that takes three large cases make it the sensible pick for airport-to-meeting runs and cross-country stretches. It is the most expensive class on this page, and what you are paying for is the time you spend inside it.",
    suitedTo: [
      "Business travel where you step out of the car and straight into a meeting",
      "Long motorway routes with two or three passengers on board",
      "Trips where cabin quiet and ride comfort matter more than the daily rate",
      "Airport transfers carrying full-size luggage rather than cabin bags",
    ],
    considerations: [
      "A higher daily rate, and usually a higher security deposit than smaller classes",
      "A long saloon body needs more room in tight urban parking",
      "Fuel cost per mile is higher than the compact and hybrid classes",
    ],
  },
];

/** Look a vehicle up by its route segment. Returns undefined for unknown ids. */
export function getVehicle(id: string): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.id === id);
}

/* -------------------------------------------------------------------------- */
/* Booking conditions                                                          */
/* -------------------------------------------------------------------------- */

export type ConditionIcon =
  | "wallet"
  | "carFront"
  | "fuel"
  | "shieldCheck"
  | "idCard"
  | "calendar"
  | "route"
  | "baby";

export interface BookingCondition {
  icon: ConditionIcon;
  title: string;
  body: string;
}

/**
 * Shown on every vehicle page, above the CTA. These describe how rentals work
 * rather than promising terms we cannot control — anything that varies by
 * supplier, city or date is described as varying, matching the answers in
 * `data/faq.ts`. Keep the two in step if either changes.
 */
export const bookingConditions: BookingCondition[] = [
  {
    icon: "wallet",
    title: "What the rate covers",
    body: "The daily figure on this page is a starting point for the class, not a quote. Your price depends on the city, the dates, how long you keep the car and the rate type you pick. The full amount, with taxes and fees itemised, is shown before you confirm anything.",
  },
  {
    icon: "carFront",
    title: "Model and class",
    body: "You reserve a vehicle class, not a specific car — this is standard across the industry. What you collect will match this listing on seats, luggage and transmission, or be an upgrade at no extra cost.",
  },
  {
    icon: "fuel",
    title: "Fuel policy",
    body: "Policies differ by supplier and location. Full-to-full is the most common arrangement but it is not universal, so the policy that applies to your booking is stated before you reserve and repeated on your confirmation.",
  },
  {
    icon: "shieldCheck",
    title: "Security deposit",
    body: "Suppliers place a hold on your card at pickup rather than taking a charge. The amount varies by class and location, and it is released once the car has been returned and checked.",
  },
  {
    icon: "idCard",
    title: "Driver requirements",
    body: "Minimum age is set by the supplier and the state, and is typically 21. Drivers under 25 are often subject to a young-driver surcharge. Bring a valid licence in the driver’s name and a payment card in that same name.",
  },
  {
    icon: "calendar",
    title: "Changes and cancellation",
    body: "Terms vary by rate and by supplier, so there is no single site-wide policy to quote. The terms that apply to your booking are listed before you confirm and repeated on your confirmation email.",
  },
  {
    icon: "baby",
    title: "Add-ons and extras",
    body: "Child seats, additional drivers and similar extras are chosen at the reservation step, where availability and pricing for your location are shown. Child seats in particular are limited in number, so add them when you book rather than on arrival.",
  },
  {
    icon: "route",
    title: "Tolls and penalties",
    body: "Tolls, congestion charges, parking fines and traffic penalties picked up during the rental stay with you. Suppliers normally add an administration fee when they process one on your behalf.",
  },
];
