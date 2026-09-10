import { ListChecks, Lock, MapPin, Search } from "lucide-react";

import { trustItems, type TrustIcon } from "@/data/site";

const icons: Record<TrustIcon, typeof Search> = {
  search: Search,
  listChecks: ListChecks,
  mapPin: MapPin,
  lock: Lock,
};

export function TrustStrip() {
  return (
    <section aria-label="Why travellers book here" className="shell mt-14 lg:mt-20">
      <ul
        data-reveal
        className="grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-6 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line"
      >
        {trustItems.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li
              key={item.label}
              className="flex items-center gap-3 lg:justify-center lg:px-6"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink">
                <Icon className="h-4 w-4 text-volt" aria-hidden="true" />
              </span>
              <span className="text-[0.9375rem] leading-snug font-semibold tracking-[-0.01em] text-ink">
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
