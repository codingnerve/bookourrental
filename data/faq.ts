export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  id: string;
  title: string;
  blurb: string;
  items: FaqItem[];
}

/**
 * Answers describe how the product behaves and deliberately avoid promising
 * rates, inclusions or cancellation terms that depend on the supplier and the
 * booking. Anything variable is described as variable.
 */
export const faqGroups: FaqGroup[] = [
  {
    id: "booking",
    title: "Booking",
    blurb: "Searching, comparing and confirming a reservation.",
    items: [
      {
        question: "Do I need an account to book?",
        answer:
          "No. There are no accounts on BookOurRental — nothing to register, no password to remember. You search, compare and reserve in one pass, and your confirmation arrives by email. To change or cancel later, quote the reference number from that email to the support desk.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "Availability tightens around holidays, school breaks and large events, and specific classes — seven-seaters, convertibles, all-wheel drive — tend to go first. If your dates are fixed, booking earlier gives you more choice of class rather than a guaranteed lower rate.",
      },
      {
        question: "Can I pick the car up and drop it off in different cities?",
        answer:
          "Yes. Tick “Return car to a different location” in the search bar and enter the return city. One-way rentals are priced differently from round trips, and the difference is reflected in the results before you reserve.",
      },
      {
        question: "What happens after I complete a reservation?",
        answer:
          "You receive a confirmation by email with your reference number, the pickup address and the counter’s opening hours. Bring that reference, your driving licence and the payment card in the driver’s name to the counter.",
      },
    ],
  },
  {
    id: "vehicles",
    title: "Vehicles",
    blurb: "What the classes mean and what you actually get.",
    items: [
      {
        question: "Am I guaranteed the exact model shown?",
        answer:
          "No — and this is standard across the industry. You reserve a vehicle class, not a specific car. The model on each card is representative of that class, and what you collect will match it on seats, luggage capacity and transmission, or be an upgrade at no extra cost.",
      },
      {
        question: "What do the seat and luggage figures mean?",
        answer:
          "Seats is the manufacturer’s belted capacity. Luggage is the number of large checked bags that fit in the boot with all seats upright — cabin bags usually fit on top of that. We show both on every card so you can rule a class out before you get to the counter.",
      },
      {
        question: "Can I request a child seat, extra driver or other add-ons?",
        answer:
          "Add-ons are selected during the reservation step. Availability and pricing vary by location, and some items — child seats in particular — are limited in number, so it is worth adding them at the time of booking rather than on arrival.",
      },
      {
        question: "Do you list hybrid and electric vehicles?",
        answer:
          "Yes. Fuel type is shown on every vehicle card and is filterable, so you can search specifically for hybrid or electric if that suits your route. For electric vehicles, check the charging arrangements shown at the reservation step for that location.",
      },
    ],
  },
  {
    id: "pickup",
    title: "Pickup & return",
    blurb: "Counters, timings and what to bring.",
    items: [
      {
        question: "What do I need to bring to the counter?",
        answer:
          "A valid driving licence held in the driver’s name, a payment card in that same name for the security deposit, and your reservation reference. If your licence is not in the Latin alphabet, an International Driving Permit is usually required alongside it.",
      },
      {
        question: "What is the minimum age to rent?",
        answer:
          "Minimum age is set by the supplier and the state, and is typically 21. Drivers under 25 are often subject to a young-driver surcharge. Both the age requirement and any surcharge are shown on the vehicle before you confirm.",
      },
      {
        question: "What if my flight is delayed?",
        answer:
          "Add your flight number when you reserve. Airport counters track arrivals against it and will normally hold the vehicle through a delay. If your arrival slips beyond the counter’s closing time, contact the desk using the number on your confirmation.",
      },
      {
        question: "Is the fuel policy the same everywhere?",
        answer:
          "No. Policies differ by supplier and location — full-to-full is the most common, but not universal. The policy that applies to your booking is stated on the vehicle before you reserve and again on your confirmation.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & cancellation",
    blurb: "Deposits, charges and changing your plans.",
    items: [
      {
        question: "When am I charged?",
        answer:
          "That depends on the rate you choose. Some rates are paid at the time of booking, others are paid at the counter on collection. Which one applies is stated clearly on the vehicle and again on the reservation summary before you confirm.",
      },
      {
        question: "What is the security deposit for?",
        answer:
          "Suppliers hold an amount on your card at pickup to cover the excess and any fuel or toll charges. It is a hold rather than a charge, and it is released after the vehicle is returned and checked. The amount varies by class and location.",
      },
      {
        question: "Can I cancel or change my booking?",
        answer:
          "Cancellation and amendment terms vary by rate and supplier, so they are listed on every vehicle before you confirm and repeated on your confirmation email. Check those terms for your specific booking rather than assuming a single site-wide policy.",
      },
      {
        question: "Are tolls and fines included?",
        answer:
          "No. Tolls, congestion charges, parking fines and traffic penalties incurred during the rental remain your responsibility, and suppliers usually add an administration fee when they process one on your behalf.",
      },
    ],
  },
];
