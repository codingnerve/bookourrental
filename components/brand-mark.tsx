import Image from "next/image";

interface BrandMarkProps {
  inverted?: boolean;
  className?: string;
}

/**
 * BookOurRental mark — stylized icon logo.
 */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <Image
      src="/logo-icon.jpg"
      alt="BookOurRental Icon"
      width={120}
      height={120}
      className={`rounded-lg object-contain ${className ?? "h-9 w-9"}`}
    />
  );
}

interface WordmarkProps {
  tone?: "light" | "dark";
  className?: string;
}

export function Wordmark({ tone = "light", className }: WordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <Image
        src="/logo.png"
        alt="BookOurRental - Cabs For Every Journey"
        width={240}
        height={65}
        className={`h-10 w-auto object-contain rounded-lg p-1 ${
          tone === "dark" ? "bg-white/95 shadow-sm" : "bg-white/80"
        }`}
      />
    </span>
  );
}

