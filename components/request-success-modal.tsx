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
        className="panel-in fixed inset-0 bg-ink/70 backdrop-blur-[2px]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${baseId}-title`}
        aria-describedby={`${baseId}-body`}
        className="panel-in relative my-auto w-full max-w-[30rem] rounded-[var(--radius-tile)] border border-line bg-white p-7 text-center shadow-[0_40px_90px_-30px_rgba(11,18,32,0.6)] sm:p-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={handleClose}
          aria-label="Close confirmation"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-ink hover:bg-cloud hover:text-ink"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Success mark */}
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-volt/20">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-volt">
            <Check
              className="h-5 w-5 text-ink"
              strokeWidth={3}
              aria-hidden="true"
            />
          </span>
        </span>

        <h2
          id={`${baseId}-title`}
          className="mt-6 text-[1.5rem] leading-tight font-extrabold tracking-[-0.03em] text-balance text-ink sm:text-[1.75rem]"
        >
          Request submitted successfully
        </h2>

        <p
          id={`${baseId}-body`}
          className="mx-auto mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-muted"
        >
          Thank you. Your car rental request has been received. Our support team
          will review your details and get back to you with the available rental
          options.
        </p>

        {summary ? (
          <p className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-cloud px-4 py-2 text-[0.8125rem] font-semibold text-ink">
            <span className="truncate">{summary}</span>
          </p>
        ) : null}

        {/* Call panel */}
        <div className="mt-7 rounded-[16px] bg-cloud p-5">
          <p className="flex items-center justify-center gap-2 text-[0.8125rem] font-bold text-ink">
            <Headset className="h-4 w-4 text-muted" aria-hidden="true" />
            Need urgent assistance?
          </p>
          <a
            href={companyContact.phone.href}
            className="mt-2.5 block text-[1.125rem] font-extrabold tracking-[-0.03em] whitespace-nowrap text-ink underline decoration-volt decoration-4 underline-offset-[6px] transition-colors hover:text-graphite sm:text-[1.5rem]"
          >
            Call now: {companyContact.phone.display}
          </a>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-[0.6875rem] font-bold tracking-[0.1em] text-muted uppercase">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Secure inquiry — no sensitive payment details
        </p>
      </div>
    </div>,
    document.body,
  );
}
