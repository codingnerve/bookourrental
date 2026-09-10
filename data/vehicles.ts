export type VehicleCategory =
  | "Economy"
  | "Compact"
  | "SUV"
  | "Luxury";

export type Transmission = "Automatic" | "Manual";

export type FuelType = "Gasoline" | "Hybrid" | "Electric" | "Diesel";

export interface Vehicle {
  /** Stable slug — becomes the route segment once /cars/[id] exists. */
  id: string;
  name: string;
  /** Human-readable body style shown under the model name. */
  bodyStyle: string;
  category: VehicleCategory;
  passengers: number;
  luggage: number;
  transmission: Transmission;
  fuel: FuelType;
  /** Indicative daily rate in USD. Replace with live pricing from the API. */
  pricePerDay: number;
  image: string;
  /** Descriptive alt text — never decorative, these images carry meaning. */
  imageAlt: string;
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
    transmission: "Automatic",
    fuel: "Gasoline",
    pricePerDay: 34,
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Light blue Fiat 500 economy hatchback parked on a quiet city street",
  },
  {
    id: "volkswagen-golf",
    name: "Volkswagen Golf",
    bodyStyle: "Compact Hatchback",
    category: "Compact",
    passengers: 5,
    luggage: 2,
    transmission: "Automatic",
    fuel: "Gasoline",
    pricePerDay: 42,
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Teal Volkswagen Golf compact hatchback photographed from the front on a sunlit road",
  },
  {
    id: "toyota-rav4",
    name: "Toyota RAV4",
    bodyStyle: "Standard SUV",
    category: "SUV",
    passengers: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Hybrid",
    pricePerDay: 58,
    image:
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Grey Toyota RAV4 sport utility vehicle viewed from the front three-quarter angle",
  },
  {
    id: "bmw-5-series",
    name: "BMW 5 Series",
    bodyStyle: "Luxury Sedan",
    category: "Luxury",
    passengers: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Gasoline",
    pricePerDay: 96,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Black BMW 5 Series luxury sedan parked beside a modern building at dusk",
  },
];
