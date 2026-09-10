"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "bor:cookie-consent";

/** Sentinel snapshots: nothing stored yet, and "not yet known" during SSR. */
const UNDECIDED = "undecided";
const PENDING = "pending";

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
}

/*
 * localStorage is an external store, so it is read through
 * `useSyncExternalStore` rather than an effect. The server snapshot hides the
 * panel, which means the markup React hydrates always matches, and the real
 * value arrives on the first client render after that.
 */
let listeners: Array<() => void> = [];

/** Mirrors the choice when storage is unavailable, so the panel still closes. */
let inMemoryChoice: string | null = null;

function emitConsentChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  window.addEventListener("storage", listener);
  return () => {
    listeners = listeners.filter((entry) => entry !== listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): string {
  if (inMemoryChoice) return inMemoryChoice;
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? UNDECIDED;
  } catch {
    return UNDECIDED;
  }
}

function getServerSnapshot(): string {
  return PENDING;
}

export function CookieConsent() {
  const baseId = useId();
  const [managing, setManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const persist = (state: Omit<ConsentState, "decidedAt">) => {
    const payload = JSON.stringify({
      ...state,
      decidedAt: new Date().toISOString(),
    });

    inMemoryChoice = payload;

    try {
      window.localStorage.setItem(STORAGE_KEY, payload);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies). The
      // in-memory mirror keeps the panel closed for the rest of the session.
    }

    emitConsentChange();
  };

  if (consent !== UNDECIDED) return null;

  return (
    <div
      role="dialog"
      aria-labelledby={`${baseId}-title`}
      aria-describedby={`${baseId}-body`}
      // Anchored bottom-left: the booking bar's Search button is right-aligned,
      // and a bottom-right panel sits directly on top of it on first load.
      className="panel-in fixed inset-x-4 bottom-24 z-[60] sm:inset-x-auto sm:left-6 sm:max-w-sm xl:bottom-6"
    >
      <div className="rounded-[18px] border border-line bg-white p-5 shadow-[0_24px_60px_-24px_rgba(11,18,32,0.4)]">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cloud">
            <Cookie className="h-4 w-4 text-ink" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2
              id={`${baseId}-title`}
              className="text-[0.9375rem] font-extrabold tracking-[-0.01em] text-ink"
            >
              Cookies on BookOurRental
            </h2>
            <p
              id={`${baseId}-body`}
              className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted"
            >
              We use essential cookies to run the site. Optional cookies help us
              understand how the search is used.
            </p>
          </div>
        </div>

        {managing ? (
          <fieldset className="mt-4 space-y-1 border-t border-line pt-4">
            <legend className="sr-only">Cookie preferences</legend>

            <PreferenceRow
              label="Strictly necessary"
              description="Required for search, security and your session."
              checked
              disabled
            />
            <PreferenceRow
              label="Analytics"
              description="Anonymous usage data to improve the booking flow."
              checked={analytics}
              onChange={setAnalytics}
            />
            <PreferenceRow
              label="Marketing"
              description="Used to measure campaigns. Off unless you enable it."
              checked={marketing}
              onChange={setMarketing}
            />
          </fieldset>
        ) : null}

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => persist({ analytics: true, marketing: true })}
            className="rounded-[12px] bg-ink px-4 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-graphite"
          >
            Accept all
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                managing
                  ? persist({ analytics, marketing })
                  : setManaging(true)
              }
              aria-expanded={managing}
              className="flex-1 rounded-[12px] border border-line px-4 py-2.5 text-[0.8125rem] font-bold text-ink transition-colors duration-200 hover:bg-cloud"
            >
              {managing ? "Save preferences" : "Manage preferences"}
            </button>
            <button
              type="button"
              onClick={() => persist({ analytics: false, marketing: false })}
              className="flex-1 rounded-[12px] border border-line px-4 py-2.5 text-[0.8125rem] font-bold text-muted transition-colors duration-200 hover:bg-cloud hover:text-ink"
            >
              Reject optional
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PreferenceRowProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

function PreferenceRow({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: PreferenceRowProps) {
  return (
    <label
      className={`flex gap-3 rounded-[10px] p-2 ${
        disabled ? "opacity-60" : "cursor-pointer hover:bg-cloud"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
      />
      <span className="min-w-0">
        <span className="block text-[0.8125rem] font-bold text-ink">
          {label}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted">
          {description}
        </span>
      </span>
    </label>
  );
}
