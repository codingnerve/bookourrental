import {
  benefits,
  featuredDeal,
  footerColumns,
  primaryNav,
  processSteps,
  trustItems,
  type Benefit,
  type FeaturedDeal,
  type FooterColumn,
  type NavLink,
  type ProcessStep,
  type TrustItem,
} from "@/data/site";
import type { DriveCategory } from "@/data/categories";
import type { Destination } from "@/data/locations";
import type {
  FuelType,
  Transmission,
  Vehicle,
  VehicleCategory,
} from "@/data/vehicles";

export type Locale = "en" | "es";

/** Where each language's homepage lives. */
export const homeHref: Record<Locale, string> = {
  en: "/",
  es: "/alquiler-de-coches",
};

export function localeFromPathname(pathname: string | null): Locale {
  return pathname?.startsWith(homeHref.es) ? "es" : "en";
}

type CategoryCopy = Pick<DriveCategory, "title" | "blurb" | "classes">;
type DestinationCopy = Partial<Pick<Destination, "city" | "note" | "airportName">>;

/* -------------------------------------------------------------------------- */
/* English — reuses the existing site data so there is one source of truth     */
/* -------------------------------------------------------------------------- */

const en = {
  htmlLang: "en",
  dateLocale: "en-US",

  nav: {
    links: primaryNav as NavLink[],
    /** The tab that switches to the other language's homepage. */
    languageSwitch: { label: "Alquiler de coches", href: homeHref.es, lang: "es" },
    primaryAria: "Primary",
    mobileAria: "Mobile",
    homeAria: "BookOurRental — home",
    contact: "Contact",
    book: "Book a Car",
    call: "Call",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    imageAlt:
      "A white sedan parked on a coastal highway above the Pacific, with headlands rolling into the distance",
    eyebrow: "Move freely",
    titleLine1: "Your next drive",
    titleLine2: "starts ",
    titleMark: "here.",
    body: "Compare vehicles, choose your pickup point, and reserve a car that fits the way you travel.",
    primaryCta: "Find a Car",
    secondaryCta: "Explore Fleet",
    scroll: "Scroll",
  },

  booking: {
    heading: "Search for a rental car",
    eyebrow: "Reserve a vehicle",
    differentReturn: "Return car to a different location",
    pickupLocation: "Pickup location",
    returnLocation: "Return location",
    locationPlaceholder: "City or airport",
    pickup: "Pickup",
    return: "Return",
    dateTimeLegend: (legend: string) => `${legend} date and time`,
    dateLabel: (legend: string) => `${legend} date`,
    timeLabel: (legend: string) => `${legend} time`,
    submit: "Search Cars",
    note: "Cancellation terms are listed on every vehicle before you confirm.",
    errors: {
      pickupLocation: "Enter where you want to pick the car up.",
      returnLocation: "Enter where you will return the car.",
      pickupDate: "Choose a pickup date.",
      pickupTime: "Choose a pickup time.",
      returnDate: "Choose a return date.",
      returnTime: "Choose a return time.",
      returnBeforePickup: "Return date cannot be before the pickup date.",
      sameDayTime:
        "For a same-day rental the return time must be later than pickup.",
    },
  },

  successModal: {
    close: "Close modal",
    title: "Request Submitted Successfully",
    body: "Thank you. Your car rental request has been received successfully. Our support team will review your details and contact you shortly with available rental options.",
    urgent: "Need urgent assistance?",
    callNow: "Call Now:",
    secure: "SECURE INQUIRY - NO SENSITIVE PAYMENT DETAILS",
  },

  trust: {
    ariaLabel: "Why travellers book here",
    items: trustItems as TrustItem[],
  },

  fleet: {
    eyebrow: "01 — The fleet",
    titlePrefix: "Find a car that ",
    titleMark: "fits the trip.",
    subtitle:
      "From efficient city cars to spacious SUVs, choose the vehicle that matches your plans.",
    browseAll: "Browse all vehicles",
  },

  vehicleCard: {
    seats: (count: number) => `${count} seats`,
    bags: (count: number) => `${count} ${count === 1 ? "bag" : "bags"}`,
    from: "From",
    perDay: "/day",
    viewCar: "View Car",
    viewDetailsAria: (name: string) => `View details for the ${name}`,
    /** Per-locale overrides; English shows the data values as they are. */
    categories: {} as Partial<Record<VehicleCategory, string>>,
    transmissions: {} as Partial<Record<Transmission, string>>,
    fuels: {} as Partial<Record<FuelType, string>>,
    bodyStyles: {} as Partial<Record<string, string>>,
  },

  collections: {
    eyebrow: "02 — Collections",
    titlePrefix: "Choose your ",
    titleMark: "drive.",
    subtitle:
      "Four ways to travel, each grouped around what the trip actually asks of a car.",
    fromPerDay: (price: number) => `From $${price}/day`,
    items: {} as Partial<Record<string, CategoryCopy>>,
  },

  destinations: {
    eyebrow: "03 — Pickup cities",
    titlePrefix: "Where are you ",
    titleMark: "heading?",
    subtitle:
      "Six markets, airport counters and downtown desks. Pick a city to see what is on the ground there.",
    tablistLabel: "Pickup cities",
    fromPerDay: (price: number) => `From $${price}/day`,
    airport: "Airport",
    cityPickups: "City pickups",
    locationsCount: (count: number) => `${count} locations`,
    vehicleClasses: "Vehicle classes",
    availableCount: (count: number) => `${count} available`,
    startingFrom: "Starting from",
    perDay: "/day",
    explore: (city: string) => `Explore ${city} rentals`,
    items: {} as Partial<Record<string, DestinationCopy>>,
  },

  howItWorks: {
    eyebrow: "04 — How it works",
    titlePrefix: "From search to ",
    titleMark: "steering wheel.",
    subtitle:
      "Three steps, no detours. There is no account to create — you go straight from the search bar to a confirmed booking.",
    steps: processSteps as ProcessStep[],
  },

  benefits: {
    imageAlt:
      "Interior of a modern car showing the dashboard and navigation display",
    imageCaption:
      "Every listing shows the same details, in the same place, for every car.",
    eyebrow: "05 — Why BookOurRental",
    titlePrefix: "Built around better rental ",
    titleMark: "decisions.",
    items: benefits as Benefit[],
  },

  deals: {
    deal: featuredDeal as FeaturedDeal,
    termsHeading: "How the offer works",
  },

  mobileBooking: {
    eyebrow: "06 — On the move",
    titlePrefix: "Your rental plans, wherever the ",
    titleMark: "trip takes you.",
    body: "There is no separate app to download. BookOurRental is built to work the same way in your phone’s browser as it does on a laptop — search, compare and reserve from the gate, the cab or the kerb.",
    points: [
      "The same search, fields and filters as the desktop site",
      "Vehicle details sized for a phone screen, not squeezed into it",
      "Your reservation summary travels with you in your inbox",
    ],
    cta: "Book From Your Phone",
    noApp: "No app install required",
    mockup: {
      pickupLocation: "Pickup location",
      pickup: "Pickup",
      return: "Return",
      pickupWhen: "Sep 15 · 10:00",
      returnWhen: "Sep 18 · 10:00",
      search: "Search Cars",
      results: "12 vehicles",
      seatsAutomatic: "5 seats · Automatic",
      seatsBags: "5 seats · 2 bags",
    },
  },

  finalCta: {
    titlePrefix: "Ready to hit the ",
    titleMark: "road?",
    body: "Choose your location, find your car, and get your trip moving.",
    primaryCta: "Find Your Car",
    secondaryCta: "Explore Locations",
    imageAlt:
      "Dark premium sedan photographed from the front under a dramatic clouded sky",
  },

  footer: {
    homeAria: "BookOurRental — home",
    tagline:
      "Making car rental discovery simpler, clearer, and easier for every journey.",
    columns: footerColumns as FooterColumn[],
    rights: (name: string) => `© 2026 ${name}. All rights reserved.`,
    disclaimer:
      "Rates and availability shown are indicative until confirmed at reservation.",
  },

  cookies: {
    title: "Cookies on BookOurRental",
    body: "We use essential cookies to run the site. Optional cookies help us understand how the search is used.",
    preferencesLegend: "Cookie preferences",
    necessary: {
      label: "Strictly necessary",
      description: "Required for search, security and your session.",
    },
    analytics: {
      label: "Analytics",
      description: "Anonymous usage data to improve the booking flow.",
    },
    marketing: {
      label: "Marketing",
      description: "Used to measure campaigns. Off unless you enable it.",
    },
    acceptAll: "Accept all",
    save: "Save preferences",
    manage: "Manage preferences",
    reject: "Reject optional",
  },

  callBar: {
    book: "Book",
  },
};

export type Dictionary = typeof en;

/* -------------------------------------------------------------------------- */
/* Spanish                                                                     */
/* -------------------------------------------------------------------------- */

const esHome = homeHref.es;

const es: Dictionary = {
  htmlLang: "es",
  dateLocale: "es-ES",

  nav: {
    links: [
      { label: "Ver coches", href: "/cars" },
      { label: "Ubicaciones", href: `${esHome}#destinations` },
      { label: "Cómo funciona", href: `${esHome}#how-it-works` },
      { label: "Ofertas", href: `${esHome}#deals` },
      { label: "Nosotros", href: "/about" },
      { label: "FAQ", href: "/faq" },
    ],
    languageSwitch: { label: "English", href: homeHref.en, lang: "en" },
    primaryAria: "Principal",
    mobileAria: "Móvil",
    homeAria: "BookOurRental — inicio",
    contact: "Contacto",
    book: "Reservar",
    call: "Llamar",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },

  hero: {
    imageAlt:
      "Una berlina blanca aparcada en una carretera costera sobre el Pacífico, con acantilados que se pierden en la distancia",
    eyebrow: "Muévete con libertad",
    titleLine1: "Tu próximo viaje",
    titleLine2: "empieza ",
    titleMark: "aquí.",
    body: "Compara vehículos, elige tu punto de recogida y reserva el coche que mejor se adapta a tu forma de viajar.",
    primaryCta: "Buscar coche",
    secondaryCta: "Ver la flota",
    scroll: "Desliza",
  },

  booking: {
    heading: "Buscar un coche de alquiler",
    eyebrow: "Reserva un vehículo",
    differentReturn: "Devolver el coche en otra ubicación",
    pickupLocation: "Lugar de recogida",
    returnLocation: "Lugar de devolución",
    locationPlaceholder: "Ciudad o aeropuerto",
    pickup: "Recogida",
    return: "Devolución",
    dateTimeLegend: (legend) => `Fecha y hora de ${legend.toLowerCase()}`,
    dateLabel: (legend) => `Fecha de ${legend.toLowerCase()}`,
    timeLabel: (legend) => `Hora de ${legend.toLowerCase()}`,
    submit: "Buscar coches",
    note: "Las condiciones de cancelación se indican en cada vehículo antes de confirmar.",
    errors: {
      pickupLocation: "Indica dónde quieres recoger el coche.",
      returnLocation: "Indica dónde vas a devolver el coche.",
      pickupDate: "Elige una fecha de recogida.",
      pickupTime: "Elige una hora de recogida.",
      returnDate: "Elige una fecha de devolución.",
      returnTime: "Elige una hora de devolución.",
      returnBeforePickup:
        "La fecha de devolución no puede ser anterior a la de recogida.",
      sameDayTime:
        "En un alquiler del mismo día, la hora de devolución debe ser posterior a la de recogida.",
    },
  },

  successModal: {
    close: "Cerrar ventana",
    title: "Solicitud enviada correctamente",
    body: "Gracias. Hemos recibido correctamente tu solicitud de alquiler de coche. Nuestro equipo de asistencia revisará tus datos y se pondrá en contacto contigo en breve con las opciones de alquiler disponibles.",
    urgent: "¿Necesitas ayuda urgente?",
    callNow: "Llama ahora:",
    secure: "CONSULTA SEGURA - SIN DATOS DE PAGO SENSIBLES",
  },

  trust: {
    ariaLabel: "Por qué los viajeros reservan aquí",
    items: [
      { icon: "search", label: "Reserva online sencilla" },
      { icon: "listChecks", label: "Detalles del vehículo transparentes" },
      { icon: "mapPin", label: "Opciones de recogida flexibles" },
      { icon: "lock", label: "Proceso de reserva seguro" },
    ],
  },

  fleet: {
    eyebrow: "01 — La flota",
    titlePrefix: "Encuentra el coche que ",
    titleMark: "encaja con tu viaje.",
    subtitle:
      "Desde utilitarios eficientes para la ciudad hasta SUV espaciosos: elige el vehículo que se adapta a tus planes.",
    browseAll: "Ver todos los vehículos",
  },

  vehicleCard: {
    seats: (count) => `${count} plazas`,
    bags: (count) => `${count} ${count === 1 ? "maleta" : "maletas"}`,
    from: "Desde",
    perDay: "/día",
    viewCar: "Ver coche",
    viewDetailsAria: (name) => `Ver detalles del ${name}`,
    categories: {
      Economy: "Económico",
      Compact: "Compacto",
      SUV: "SUV",
      Luxury: "Lujo",
    },
    transmissions: { Automatic: "Automático", Manual: "Manual" },
    fuels: {
      Gasoline: "Gasolina",
      Hybrid: "Híbrido",
      Electric: "Eléctrico",
      Diesel: "Diésel",
    },
    bodyStyles: {
      "fiat-500": "Utilitario económico",
      "volkswagen-golf": "Compacto de 5 puertas",
      "toyota-rav4": "SUV estándar",
      "bmw-5-series": "Berlina de lujo",
    },
  },

  collections: {
    eyebrow: "02 — Colecciones",
    titlePrefix: "Elige cómo ",
    titleMark: "quieres conducir.",
    subtitle:
      "Cuatro formas de viajar, cada una agrupada según lo que el viaje realmente le pide a un coche.",
    fromPerDay: (price) => `Desde $${price}/día`,
    items: {
      "city-essentials": {
        title: "Imprescindibles urbanos",
        blurb:
          "Tamaño reducido, fácil de aparcar y bajo coste de uso: pensados para el centro y los trayectos cortos.",
        classes: ["Económico", "Compacto"],
      },
      "family-suvs": {
        title: "SUV familiares",
        blurb:
          "Espacio para todos, además de las maletas, la nevera y las sillas de playa.",
        classes: ["SUV", "Monovolumen"],
      },
      "premium-comfort": {
        title: "Confort premium",
        blurb:
          "Habitáculos más silenciosos y mejores asientos para los trayectos largos de trabajo.",
        classes: ["Lujo", "Berlina premium"],
      },
      "weekend-escapes": {
        title: "Escapadas de fin de semana",
        blurb:
          "Más autonomía, depósitos más grandes y el tipo de coche que convierte la conducción en parte del viaje.",
        classes: ["Descapotable", "Deportivo", "Grande"],
      },
    },
  },

  destinations: {
    eyebrow: "03 — Ciudades de recogida",
    titlePrefix: "¿Hacia dónde ",
    titleMark: "te diriges?",
    subtitle:
      "Seis mercados, mostradores en aeropuertos y oficinas en el centro. Elige una ciudad para ver qué hay disponible allí.",
    tablistLabel: "Ciudades de recogida",
    fromPerDay: (price) => `Desde $${price}/día`,
    airport: "Aeropuerto",
    cityPickups: "Recogida en ciudad",
    locationsCount: (count) => `${count} ubicaciones`,
    vehicleClasses: "Categorías",
    availableCount: (count) => `${count} disponibles`,
    startingFrom: "Desde",
    perDay: "/día",
    explore: (city) => `Ver alquileres en ${city}`,
    items: {
      miami: {
        airportName: "Aeropuerto Internacional de Miami",
        note: "Los descapotables y los compactos son los que más se alquilan aquí entre diciembre y marzo.",
      },
      orlando: {
        airportName: "Aeropuerto Internacional de Orlando",
        note: "Los de siete plazas y los SUV medianos son las categorías más solicitadas.",
      },
      "los-angeles": {
        city: "Los Ángeles",
        airportName: "Aeropuerto Internacional de Los Ángeles",
        note: "Los híbridos y los eléctricos son la opción más lógica para una semana de kilómetros por autopista.",
      },
      "new-york": {
        city: "Nueva York",
        airportName: "Aeropuerto Internacional John F. Kennedy",
        note: "La mayoría de los viajeros recogen en el aeropuerto y devuelven en el norte del estado o en Nueva Jersey.",
      },
      "las-vegas": {
        airportName: "Aeropuerto Internacional Harry Reid",
        note: "Un punto de partida habitual para rutas a Zion, el Gran Cañón y el Valle de la Muerte.",
      },
      chicago: {
        airportName: "Aeropuerto Internacional O'Hare",
        note: "Entre noviembre y marzo merece la pena filtrar por tracción integral.",
      },
    },
  },

  howItWorks: {
    eyebrow: "04 — Cómo funciona",
    titlePrefix: "De la búsqueda ",
    titleMark: "al volante.",
    subtitle:
      "Tres pasos, sin desvíos. No hay que crear ninguna cuenta: pasas directamente de la barra de búsqueda a una reserva confirmada.",
    steps: [
      {
        step: "01",
        title: "Busca",
        body: "Dinos dónde y cuándo necesitas un coche. Añade un punto de devolución distinto si el viaje es solo de ida.",
      },
      {
        step: "02",
        title: "Compara",
        body: "Explora los vehículos uno al lado del otro: plazas, maletas, transmisión, combustible y tarifa diaria, todo en una sola línea.",
      },
      {
        step: "03",
        title: "Reserva",
        body: "Elige tu vehículo y completa la reserva. La confirmación y los datos de recogida te llegan por correo electrónico.",
      },
    ],
  },

  benefits: {
    imageAlt:
      "Interior de un coche moderno con el salpicadero y la pantalla de navegación",
    imageCaption:
      "Cada anuncio muestra los mismos detalles, en el mismo lugar, para todos los coches.",
    eyebrow: "05 — Por qué BookOurRental",
    titlePrefix: "Pensado para que alquiles ",
    titleMark: "con mejor criterio.",
    items: [
      {
        step: "01",
        icon: "gauge",
        title: "Información clara del vehículo",
        body: "Plazas, equipaje, transmisión y tipo de combustible aparecen en la tarjeta, no a tres clics dentro de una ventana emergente.",
      },
      {
        step: "02",
        icon: "mapPin",
        title: "Opciones de recogida flexibles",
        body: "Mostradores en aeropuertos y oficinas en la ciudad, con la opción de devolver el coche en un lugar completamente distinto.",
      },
      {
        step: "03",
        icon: "clock",
        title: "Reservas online sencillas",
        body: "Una búsqueda, una comparación, una confirmación. Sin cuenta que crear ni contraseña que recordar.",
      },
      {
        step: "04",
        icon: "headset",
        title: "Asistencia cuando la necesitas",
        body: "Ayuda con tu reserva antes de viajar y una línea directa con el mostrador una vez en la carretera.",
      },
    ],
  },

  deals: {
    deal: {
      ...featuredDeal,
      eyebrow: "Oferta destacada",
      title: "Tu próxima escapada merece una tarifa mejor.",
      body: "Escapada de fin de semana adelanta nuestros precios de larga duración a los alquileres de tres días o más. Las tarifas varían según la ciudad, la categoría y las fechas; la cifra exacta aparece en cuanto buscas.",
      terms: [
        "Válido para vehículos seleccionados en alquileres de 3 días o más",
        "La disponibilidad y las tarifas varían según la ubicación y las fechas del viaje",
        "El precio final se confirma en el paso de reserva",
      ],
      ctaLabel: "Ver ofertas",
      imageAlt:
        "Coche con los faros encendidos circulando por una carretera arbolada cubierta de hojas de otoño",
    },
    termsHeading: "Cómo funciona la oferta",
  },

  mobileBooking: {
    eyebrow: "06 — En movimiento",
    titlePrefix: "Tus planes de alquiler, allá donde ",
    titleMark: "te lleve el viaje.",
    body: "No hay ninguna app que descargar. BookOurRental funciona igual en el navegador de tu móvil que en un portátil: busca, compara y reserva desde la puerta de embarque, el taxi o la acera.",
    points: [
      "La misma búsqueda, campos y filtros que en la versión de escritorio",
      "Detalles del vehículo pensados para la pantalla del móvil, no encogidos en ella",
      "El resumen de tu reserva te acompaña en tu bandeja de entrada",
    ],
    cta: "Reserva desde tu móvil",
    noApp: "Sin instalar ninguna app",
    mockup: {
      pickupLocation: "Lugar de recogida",
      pickup: "Recogida",
      return: "Devolución",
      pickupWhen: "15 sept · 10:00",
      returnWhen: "18 sept · 10:00",
      search: "Buscar coches",
      results: "12 vehículos",
      seatsAutomatic: "5 plazas · Automático",
      seatsBags: "5 plazas · 2 maletas",
    },
  },

  finalCta: {
    titlePrefix: "¿Listo para salir a la ",
    titleMark: "carretera?",
    body: "Elige tu ubicación, encuentra tu coche y pon tu viaje en marcha.",
    primaryCta: "Encuentra tu coche",
    secondaryCta: "Ver ubicaciones",
    imageAlt:
      "Berlina premium oscura fotografiada de frente bajo un cielo nublado y dramático",
  },

  footer: {
    homeAria: "BookOurRental — inicio",
    tagline:
      "Hacemos que encontrar un coche de alquiler sea más sencillo, claro y fácil en cada viaje.",
    columns: [
      {
        heading: "Explorar",
        links: [
          { label: "Coches", href: "/cars" },
          { label: "Ubicaciones", href: `${esHome}#destinations` },
          { label: "Ofertas", href: `${esHome}#deals` },
          { label: "Cómo funciona", href: `${esHome}#how-it-works` },
        ],
      },
      {
        heading: "Empresa",
        links: [
          { label: "Nosotros", href: "/about" },
          { label: "Contacto", href: "/contact" },
          { label: "Preguntas frecuentes", href: "/faq" },
        ],
      },
      {
        heading: "Soporte",
        links: [
          { label: "Centro de ayuda", href: "/faq" },
          { label: "Ayuda con reservas", href: "/contact" },
          { label: "Cancelaciones", href: "/faq#payments" },
        ],
      },
      {
        heading: "Legal",
        links: [
          { label: "Política de privacidad", href: "/privacy" },
          { label: "Términos y condiciones", href: "/terms" },
          { label: "Política de cookies", href: "/cookies" },
        ],
      },
    ],
    rights: (name) => `© 2026 ${name}. Todos los derechos reservados.`,
    disclaimer:
      "Las tarifas y la disponibilidad mostradas son orientativas hasta que se confirman en la reserva.",
  },

  cookies: {
    title: "Cookies en BookOurRental",
    body: "Usamos cookies esenciales para que el sitio funcione. Las cookies opcionales nos ayudan a entender cómo se utiliza el buscador.",
    preferencesLegend: "Preferencias de cookies",
    necessary: {
      label: "Estrictamente necesarias",
      description: "Imprescindibles para la búsqueda, la seguridad y tu sesión.",
    },
    analytics: {
      label: "Analíticas",
      description: "Datos de uso anónimos para mejorar el proceso de reserva.",
    },
    marketing: {
      label: "Marketing",
      description: "Sirven para medir campañas. Desactivadas salvo que las actives.",
    },
    acceptAll: "Aceptar todas",
    save: "Guardar preferencias",
    manage: "Gestionar preferencias",
    reject: "Rechazar opcionales",
  },

  callBar: {
    book: "Reservar",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/* -------------------------------------------------------------------------- */
/* Data localisers — overlay translated copy onto the shared catalogue         */
/* -------------------------------------------------------------------------- */

export function localizeCategory(
  category: DriveCategory,
  locale: Locale,
): DriveCategory {
  const copy = dictionaries[locale].collections.items[category.id];
  return copy ? { ...category, ...copy } : category;
}

export function localizeDestination(
  destination: Destination,
  locale: Locale,
): Destination {
  const copy = dictionaries[locale].destinations.items[destination.id];
  return copy ? { ...destination, ...copy } : destination;
}

/** Display labels for a vehicle's enum-like fields. */
export function vehicleLabels(vehicle: Vehicle, locale: Locale) {
  const t = dictionaries[locale].vehicleCard;
  return {
    category: t.categories[vehicle.category] ?? vehicle.category,
    bodyStyle: t.bodyStyles[vehicle.id] ?? vehicle.bodyStyle,
    transmission: t.transmissions[vehicle.transmission] ?? vehicle.transmission,
    fuel: t.fuels[vehicle.fuel] ?? vehicle.fuel,
  };
}
