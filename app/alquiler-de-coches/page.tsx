import type { Metadata } from "next";

import { HomePage } from "@/components/home-page";
import { homeHref } from "@/data/i18n";
import { siteConfig } from "@/data/site";

const title = `Alquiler de coches | Encuentra y reserva tu coche | ${siteConfig.name}`;
const description =
  "Compara coches de alquiler, explora puntos de recogida y encuentra el vehículo ideal para tu próximo viaje con BookOurRental.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "alquiler de coches",
    "alquilar coche",
    "alquiler de coches en aeropuerto",
    "alquiler de SUV",
    "reserva de coche de alquiler",
  ],
  alternates: {
    canonical: homeHref.es,
    languages: { "en-US": homeHref.en, "es-ES": homeHref.es },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: homeHref.es,
    siteName: siteConfig.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function AlquilerDeCoches() {
  return <HomePage locale="es" />;
}
