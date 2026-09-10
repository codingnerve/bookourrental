"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Check, Headset, ShieldCheck, X } from "lucide-react";

import { companyContact } from "@/data/site";

interface RequestSuccessModalProps {
  open: boolean;
  onClose: () => void;
  /** Short recap of what was submitted, e.g. "Miami, FL · Sep 15 – Sep 18". */
  summary?: string;
}

/**
 * Confirmation shown after a search is submitted.
 *
 * Implements the modal dialog pattern by hand rather than pulling in a library:
 * focus moves in on open, is trapped while open, and returns to the trigger on
 * close; Escape and backdrop clicks dismiss; background scroll is locked.
 */
export function RequestSuccessModal({
  open,
  onClose,
  summary,
}: RequestSuccessModalProps) {
  const baseId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<Element | null>(null);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement;
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab") return;

      // Keep Tab cycling inside the panel while the dialog is open.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      const restore = restoreFocusRef.current;
      if (restore instanceof HTMLElement) restore.focus();
    };
  }, [open, handleClose]);

  if (!open) return null;

  /*
   * Rendered into <body> rather than in place: the booking bar sits inside a
   * `relative z-30` wrapper, which would otherwise scope this dialog's z-index
   * and let the header and cookie banner paint over the scrim.
   */
  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      {/* Scrim */}
      <div
        aria-hidden="true"
        className="panel-in fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${baseId}-title`}
        aria-describedby={`${baseId}-body`}
        className="panel-in relative my-auto w-full max-w-[28.5rem] rounded-[24px] border border-line bg-white p-7 text-center shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] sm:p-9"
      >
        {/* Close Button */}
        <button
          ref={closeRef}
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Gold Checkmark Badge */}
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF6EC]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D49E28] text-[#D49E28]">
            <Check
              className="h-5 w-5 stroke-[2.5]"
              aria-hidden="true"
            />
          </span>
        </span>

        {/* Title */}
        <h2
          id={`${baseId}-title`}
          className="mt-6 text-[1.45rem] leading-tight font-extrabold text-gray-900 sm:text-[1.65rem]"
        >
          Request Submitted Successfully
        </h2>

        {/* Body Text */}
        <p
          id={`${baseId}-body`}
          className="mx-auto mt-3 max-w-sm text-[0.875rem] sm:text-[0.9375rem] leading-relaxed text-gray-600"
        >
          Thank you. Your car rental request has been received successfully. Our support team will review your details and contact you shortly with available rental options.
        </p>

        {summary ? (
          <p className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-[0.8125rem] font-semibold text-gray-800">
            <span className="truncate">{summary}</span>
          </p>
        ) : null}

        {/* Call Panel */}
        <div className="mt-6 rounded-2xl bg-[#F8F6F1] border border-[#EFECE4] p-5 text-center">
          <p className="flex items-center justify-center gap-2 text-sm font-bold text-gray-800">
            <Headset className="h-4 w-4 text-gray-700" aria-hidden="true" />
            Need urgent assistance?
          </p>
          <a
            href={companyContact.phone.href}
            className="mt-2 block text-xl font-extrabold tracking-tight text-gray-900 hover:text-black sm:text-2xl"
          >
            Call Now: {companyContact.phone.display}
          </a>
        </div>

        {/* Security Footer */}
        <p className="mt-6 flex items-center justify-center gap-2 text-[0.6875rem] font-bold tracking-wider text-gray-500 uppercase">
          <ShieldCheck className="h-4 w-4 text-gray-500" aria-hidden="true" />
          SECURE INQUIRY - NO SENSITIVE PAYMENT DETAILS
        </p>
      </div>
    </div>,
    document.body,
  );
}
