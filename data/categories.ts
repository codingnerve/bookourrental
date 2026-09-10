export interface DriveCategory {
  id: string;
  title: string;
  /** One line of positioning copy for the tile. */
  blurb: string;
  /** Vehicle classes rolled into this collection. */
  classes: string[];
  fromPrice: number;
  image: string;
  imageAlt: string;
  /** Controls the tile's footprint inside the asymmetric editorial grid. */
  span: "feature" | "tall" | "standard" | "wide";
}

export const driveCategories: DriveCategory[] = [
  {
    id: "city-essentials",
    title: "City Essentials",
    blurb:
      "Small footprint, easy parking, low running costs — built for downtown blocks and short hops.",
    classes: ["Economy", "Compact"],
    fromPrice: 34,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Traffic moving down a wide avenue between tall city buildings",
    span: "feature",
  },
  {
    id: "family-suvs",
    title: "Family SUVs",
    blurb: "Room for everyone, plus the bags, the cooler and the beach chairs.",
    classes: ["SUV", "Minivan"],
    fromPrice: 58,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "White family SUV parked on a gravel shore in front of a mountain lake",
    span: "standard",
  },
  {
    id: "premium-comfort",
    title: "Premium Comfort",
    blurb: "Quieter cabins and better seats for the long client drive.",
    classes: ["Luxury", "Premium Sedan"],
    fromPrice: 96,
    image:
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "White premium sedan lit by cool neon light inside a modern parking structure",
    span: "standard",
  },
  {
    id: "weekend-escapes",
    title: "Weekend Escapes",
    blurb:
      "Longer legs, bigger tanks and the kind of car that makes the drive part of the trip.",
    classes: ["Convertible", "Sport", "Full-size"],
    fromPrice: 74,
    image:
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1600&q=80",
    imageAlt:
      "Dark coupe parked on an open road as the sun sets behind the treeline",
    span: "wide",
  },
];
