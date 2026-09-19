import type { Metadata } from "next";

import { HomePage } from "@/components/home-page";
import { homeHref } from "@/data/i18n";

export const metadata: Metadata = {
  alternates: {
    canonical: homeHref.en,
    languages: { "en-US": homeHref.en, "es-ES": homeHref.es },
  },
};

export default function Home() {
  return <HomePage locale="en" />;
}
