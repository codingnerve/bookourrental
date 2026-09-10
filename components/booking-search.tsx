"use client";

import { useId, useMemo, useRef, useState } from "react";
import {
  ArrowLeftRight,
  CalendarDays,
  Clock3,
  MapPin,
  Search,
} from "lucide-react";

import { RequestSuccessModal } from "@/components/request-success-modal";
import { destinations } from "@/data/locations";

type FieldKey =
  | "pickupLocation"
  | "returnLocation"
  | "pickupDate"
  | "pickupTime"
  | "returnDate"
  | "returnTime";

type FormValues = Record<FieldKey, string>;
type FormErrors = Partial<Record<FieldKey, string>>;

const SEARCH_STORAGE_KEY = "bor:last-search";

const initialValues: FormValues = {
  pickupLocation: "",
  returnLocation: "",
  pickupDate: "",
  pickupTime: "10:00",
  returnDate: "",
  returnTime: "10:00",
};

/** Local calendar day as `YYYY-MM-DD`, avoiding the UTC shift of toISOString(). */
function todayISO(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

/** "Miami, FL → Orlando, FL · Sep 15 – Sep 18" for the confirmation recap. */
function buildSummary(values: FormValues, returnTo: string): string {
  const day = (iso: string) => {
    const date = new Date(`${iso}T00:00:00`);
    return Number.isNaN(date.getTime())
      ? iso
      : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const route =
    returnTo && returnTo !== values.pickupLocation.trim()
      ? `${values.pickupLocation.trim()} → ${returnTo}`
      : values.pickupLocation.trim();

  return `${route} · ${day(values.pickupDate)} – ${day(values.returnDate)}`;
}

export function BookingSearch() {
  const baseId = useId();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [differentReturn, setDifferentReturn] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const fieldRefs = useRef(new Map<FieldKey, HTMLInputElement | null>());

  const minDate = useMemo(() => todayISO(), []);

  const setField = (key: FieldKey, value: string) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    const {
      pickupLocation,
      returnLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
    } = values;

    if (!pickupLocation.trim()) {
      next.pickupLocation = "Enter where you want to pick the car up.";
    }
    if (differentReturn && !returnLocation.trim()) {
      next.returnLocation = "Enter where you will return the car.";
    }
    if (!pickupDate) next.pickupDate = "Choose a pickup date.";
    if (!pickupTime) next.pickupTime = "Choose a pickup time.";
    if (!returnDate) next.returnDate = "Choose a return date.";
    if (!returnTime) next.returnTime = "Choose a return time.";

    // ISO date and 24h time strings both sort lexicographically.
    if (pickupDate && returnDate) {
      if (returnDate < pickupDate) {
        next.returnDate = "Return date cannot be before the pickup date.";
      } else if (
        returnDate === pickupDate &&
        pickupTime &&
        returnTime &&
        returnTime <= pickupTime
      ) {
        next.returnTime =
          "For a same-day rental the return time must be later than pickup.";
      }
    }

    return next;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    const order: FieldKey[] = [
      "pickupLocation",
      "returnLocation",
      "pickupDate",
      "pickupTime",
      "returnDate",
      "returnTime",
    ];
    const firstInvalid = order.find((key) => nextErrors[key]);

    if (firstInvalid) {
      fieldRefs.current.get(firstInvalid)?.focus();
      return;
    }

    const returnTo = differentReturn
      ? values.returnLocation.trim()
      : values.pickupLocation.trim();

    // Persist the request so the API layer can pick it up once it exists.
    // Shape is unchanged from the URL contract: pickup, return, dates, times.
    try {
      window.sessionStorage.setItem(
        SEARCH_STORAGE_KEY,
        JSON.stringify({
          ...values,
          returnLocation: returnTo,
          differentReturn,
          submittedAt: new Date().toISOString(),
        }),
      );
    } catch {
      // Private-mode or blocked storage is not a reason to block the request.
    }

    setConfirmation(buildSummary(values, returnTo));
  };

  const columns = differentReturn
    ? "xl:grid-cols-[1fr_1fr_1.15fr_1.15fr_auto]"
    : "xl:grid-cols-[1.35fr_1.2fr_1.2fr_auto]";

  /*
   * At the two-column breakpoint the cell count has to stay even, otherwise the
   * divider track shows through as an empty grey square. Three segments plus
   * the button already make four cells; four segments need the button to span.
   */
  const submitSpan = differentReturn ? "sm:col-span-2" : "";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby={`${baseId}-heading`}
      className="relative"
    >
      <h2 id={`${baseId}-heading`} className="sr-only">
        Search for a rental car
      </h2>

      <div className="overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_28px_70px_-32px_rgba(11,18,32,0.45)]">
        {/* Command bar header */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line px-5 py-3.5 sm:px-6">
          <p className="eyebrow text-muted">Reserve a vehicle</p>

          <label className="flex cursor-pointer items-center gap-2.5 text-[0.8125rem] font-semibold text-ink">
            <input
              type="checkbox"
              checked={differentReturn}
              onChange={(event) => {
                setDifferentReturn(event.target.checked);
                if (!event.target.checked) {
                  setField("returnLocation", "");
                }
              }}
              className="h-4 w-4 shrink-0 cursor-pointer accent-ink"
            />
            <ArrowLeftRight
              className="h-3.5 w-3.5 text-muted"
              aria-hidden="true"
            />
            Return car to a different location
          </label>
        </div>

        {/* Segments. `gap-px` over a line-coloured track draws the dividers, so
            they stay correct at every column count. */}
        <div
          className={`grid grid-cols-1 gap-px bg-line sm:grid-cols-2 ${columns}`}
        >
          <Segment
            icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
            label="Pickup location"
            htmlFor={`${baseId}-pickupLocation`}
            error={errors.pickupLocation}
            errorId={`${baseId}-pickupLocation-error`}
          >
            <input
              ref={(node) => {
                fieldRefs.current.set("pickupLocation", node);
              }}
              id={`${baseId}-pickupLocation`}
              name="pickupLocation"
              type="text"
              list={`${baseId}-cities`}
              autoComplete="off"
              placeholder="City or airport"
              value={values.pickupLocation}
              onChange={(event) =>
                setField("pickupLocation", event.target.value)
              }
              aria-invalid={Boolean(errors.pickupLocation)}
              aria-describedby={
                errors.pickupLocation
                  ? `${baseId}-pickupLocation-error`
                  : undefined
              }
              className={inputClass}
            />
          </Segment>

          {differentReturn ? (
            <Segment
              icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
              label="Return location"
              htmlFor={`${baseId}-returnLocation`}
              error={errors.returnLocation}
              errorId={`${baseId}-returnLocation-error`}
            >
              <input
                ref={(node) => {
                  fieldRefs.current.set("returnLocation", node);
                }}
                id={`${baseId}-returnLocation`}
                name="returnLocation"
                type="text"
                list={`${baseId}-cities`}
                autoComplete="off"
                placeholder="City or airport"
                value={values.returnLocation}
                onChange={(event) =>
                  setField("returnLocation", event.target.value)
                }
                aria-invalid={Boolean(errors.returnLocation)}
                aria-describedby={
                  errors.returnLocation
                    ? `${baseId}-returnLocation-error`
                    : undefined
                }
                className={inputClass}
              />
            </Segment>
          ) : null}

          <DateTimeSegment
            legend="Pickup"
            dateId={`${baseId}-pickupDate`}
            timeId={`${baseId}-pickupTime`}
            dateValue={values.pickupDate}
            timeValue={values.pickupTime}
            minDate={minDate}
            dateError={errors.pickupDate}
            timeError={errors.pickupTime}
            errorId={`${baseId}-pickup-error`}
            onDateChange={(value) => setField("pickupDate", value)}
            onTimeChange={(value) => setField("pickupTime", value)}
            registerDate={(node) => {
              fieldRefs.current.set("pickupDate", node);
            }}
            registerTime={(node) => {
              fieldRefs.current.set("pickupTime", node);
            }}
          />

          <DateTimeSegment
            legend="Return"
            dateId={`${baseId}-returnDate`}
            timeId={`${baseId}-returnTime`}
            dateValue={values.returnDate}
            timeValue={values.returnTime}
            minDate={values.pickupDate || minDate}
            dateError={errors.returnDate}
            timeError={errors.returnTime}
            errorId={`${baseId}-return-error`}
            onDateChange={(value) => setField("returnDate", value)}
            onTimeChange={(value) => setField("returnTime", value)}
            registerDate={(node) => {
              fieldRefs.current.set("returnDate", node);
            }}
            registerTime={(node) => {
              fieldRefs.current.set("returnTime", node);
            }}
          />

          {/* Submit */}
          <div className={`bg-white p-3 xl:col-span-1 xl:p-3.5 ${submitSpan}`}>
            <button
              type="submit"
              className="group flex h-full w-full items-center justify-center gap-2.5 rounded-[16px] bg-volt px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-ink transition-colors duration-200 hover:bg-volt-deep xl:min-h-[4.75rem] xl:px-8"
            >
              <Search
                className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              <span>Search Cars</span>
            </button>
          </div>
        </div>
      </div>

      {/* Shared suggestions for both location fields */}
      <datalist id={`${baseId}-cities`}>
        {destinations.map((destination) => (
          <option
            key={destination.id}
            value={`${destination.city}, ${destination.state}`}
          >
            {destination.airportCode} · {destination.airportName}
          </option>
        ))}
      </datalist>

      <p className="mt-4 text-center text-[0.8125rem] leading-relaxed text-muted xl:text-left">
        Cancellation terms are listed on every vehicle before you confirm.
      </p>

      <RequestSuccessModal
        open={confirmation !== null}
        summary={confirmation ?? undefined}
        onClose={() => setConfirmation(null)}
      />
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* Segment primitives                                                          */
/* -------------------------------------------------------------------------- */

const inputClass =
  "w-full bg-transparent text-[0.9375rem] font-semibold text-ink placeholder:font-medium placeholder:text-muted/70 focus:outline-none";

interface SegmentProps {
  icon: React.ReactNode;
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  children: React.ReactNode;
}

function Segment({
  icon,
  label,
  htmlFor,
  error,
  errorId,
  children,
}: SegmentProps) {
  return (
    <div
      className={[
        "group relative px-5 py-4 transition-colors focus-within:bg-cloud sm:px-6",
        error ? "bg-danger/5" : "bg-white",
      ].join(" ")}
    >
      {/* Focus rail — the segment lights up rather than the input boxing in. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-volt transition-transform duration-300 group-focus-within:scale-x-100"
      />
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase"
      >
        <span className="text-ink/45">{icon}</span>
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs font-semibold text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface DateTimeSegmentProps {
  legend: string;
  dateId: string;
  timeId: string;
  dateValue: string;
  timeValue: string;
  minDate: string;
  dateError?: string;
  timeError?: string;
  errorId: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  registerDate: (node: HTMLInputElement | null) => void;
  registerTime: (node: HTMLInputElement | null) => void;
}

function DateTimeSegment({
  legend,
  dateId,
  timeId,
  dateValue,
  timeValue,
  minDate,
  dateError,
  timeError,
  errorId,
  onDateChange,
  onTimeChange,
  registerDate,
  registerTime,
}: DateTimeSegmentProps) {
  const message = dateError ?? timeError;

  return (
    <fieldset
      className={[
        "group relative min-w-0 px-5 py-4 transition-colors focus-within:bg-cloud sm:px-6",
        message ? "bg-danger/5" : "bg-white",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-volt transition-transform duration-300 group-focus-within:scale-x-100"
      />
      <legend className="sr-only">{legend} date and time</legend>
      <span
        aria-hidden="true"
        className="mb-2 flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase"
      >
        <CalendarDays className="h-4 w-4 text-ink/45" />
        {legend}
      </span>

      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <label htmlFor={dateId} className="sr-only">
            {legend} date
          </label>
          <input
            ref={registerDate}
            id={dateId}
            name={dateId}
            type="date"
            min={minDate}
            value={dateValue}
            onChange={(event) => onDateChange(event.target.value)}
            aria-invalid={Boolean(dateError)}
            aria-describedby={dateError ? errorId : undefined}
            className={`${inputClass} [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
          />
        </div>

        <span aria-hidden="true" className="h-6 w-px shrink-0 bg-line" />

        <div className="flex shrink-0 items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5 text-ink/40" aria-hidden="true" />
          <label htmlFor={timeId} className="sr-only">
            {legend} time
          </label>
          <input
            ref={registerTime}
            id={timeId}
            name={timeId}
            type="time"
            value={timeValue}
            onChange={(event) => onTimeChange(event.target.value)}
            aria-invalid={Boolean(timeError)}
            aria-describedby={timeError ? errorId : undefined}
            className={`${inputClass} w-[5.5rem] [&::-webkit-calendar-picker-indicator]:hidden`}
          />
        </div>
      </div>

      {message ? (
        <p id={errorId} className="mt-1.5 text-xs font-semibold text-danger">
          {message}
        </p>
      ) : null}
    </fieldset>
  );
}
