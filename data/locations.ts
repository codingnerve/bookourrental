export interface Destination {
  id: string;
  city: string;
  state: string;
  /** Primary airport code served, plus whether city desks exist. */
  airportCode: string;
  airportName: string;
  cityPickups: number;
  vehicleClasses: number;
  fromPrice: number;
  /** Short editorial line about driving in this market. */
  note: string;
  image: string;
  imageAlt: string;
}

export const destinations: Destination[] = [
  {
    id: "miami",
    city: "Miami",
    state: "FL",
    airportCode: "MIA",
    airportName: "Miami International",
    cityPickups: 6,
    vehicleClasses: 9,
    fromPrice: 42,
    note: "Convertibles and compacts move fastest here between December and March.",
    image:
      "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=1600&q=80",
    imageAlt:
      "Neon-lit Art Deco storefronts along a Miami Beach street after sunset",
  },
  {
    id: "orlando",
    city: "Orlando",
    state: "FL",
    airportCode: "MCO",
    airportName: "Orlando International",
    cityPickups: 4,
    vehicleClasses: 8,
    fromPrice: 38,
    note: "Seven-seaters and mid-size SUVs are the most requested classes.",
    image:
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=1600&q=80",
    imageAlt:
      "Palm trees around a resort pool in central Florida during golden hour",
  },
  {
    id: "los-angeles",
    city: "Los Angeles",
    state: "CA",
    airportCode: "LAX",
    airportName: "Los Angeles International",
    cityPickups: 8,
    vehicleClasses: 11,
    fromPrice: 46,
    note: "Hybrids and EVs make the most sense across a week of freeway miles.",
    image:
      "https://images.unsplash.com/photo-1515896769750-31548aa180ed?auto=format&fit=crop&w=1600&q=80",
    imageAlt:
      "Row of palm trees silhouetted against a Los Angeles sunset sky",
  },
  {
    id: "new-york",
    city: "New York",
    state: "NY",
    airportCode: "JFK",
    airportName: "John F. Kennedy International",
    cityPickups: 7,
    vehicleClasses: 10,
    fromPrice: 52,
    note: "Most travellers pick up at the airport and drop off upstate or in New Jersey.",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1600&q=80",
    imageAlt:
      "Manhattan skyline glowing under a warm sunset seen across the rooftops",
  },
  {
    id: "las-vegas",
    city: "Las Vegas",
    state: "NV",
    airportCode: "LAS",
    airportName: "Harry Reid International",
    cityPickups: 3,
    vehicleClasses: 9,
    fromPrice: 39,
    note: "A popular start point for Zion, the Grand Canyon and Death Valley runs.",
    image:
      "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=1600&q=80",
    imageAlt:
      "Aerial view of the Las Vegas Strip lit up across the desert at night",
  },
  {
    id: "chicago",
    city: "Chicago",
    state: "IL",
    airportCode: "ORD",
    airportName: "O'Hare International",
    cityPickups: 5,
    vehicleClasses: 8,
    fromPrice: 41,
    note: "All-wheel drive is worth filtering for between November and March.",
    image:
      "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1600&q=80",
    imageAlt:
      "Chicago river running between downtown high-rises at blue hour",
  },
];
