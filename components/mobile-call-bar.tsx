import Link from "next/link";
import { Phone } from "lucide-react";

import { companyContact } from "@/data/site";

/**
 * Fixed call/book bar for small and mid screens.
 *
 * Hidden from `xl` up, which is exactly where the header starts showing the
 * phone number — so the number is on screen at every width, in one place or
 * the other, never both.
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md xl:hidden">
      <div className="shell flex items-center gap-2.5 py-3">
        <a
          href={companyContact.phone.href}
          className="flex flex-1 items-center justify-center gap-2 rounded-[14px] bg-volt px-4 py-3.5 text-[0.9375rem] font-extrabold tracking-[-0.01em] text-ink transition-colors duration-200 hover:bg-volt-deep"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="whitespace-nowrap">
            {companyContact.phone.display}
          </span>
        </a>

        <Link
          href="/#booking"
          className="shrink-0 rounded-[14px] bg-ink px-5 py-3.5 text-[0.9375rem] font-bold text-white transition-colors duration-200 hover:bg-graphite"
        >
          Book
        </Link>
      </div>
    </div>
  );
}
