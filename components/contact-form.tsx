"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, Mail } from "lucide-react";

import { contactTopics } from "@/data/site";

type FieldKey = "name" | "email" | "reference" | "topic" | "message";

type FormValues = Record<FieldKey, string>;
type FormErrors = Partial<Record<FieldKey, string>>;

const SUPPORT_ADDRESS = "support@bookourental.com";
const STORAGE_KEY = "bor:last-enquiry";
const MIN_MESSAGE_LENGTH = 20;

const initialValues: FormValues = {
  name: "",
  email: "",
  reference: "",
  topic: "",
  message: "",
};

export function ContactForm() {
  const baseId = useId();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const fieldRefs = useRef(
    new Map<
      FieldKey,
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
    >(),
  );

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

    if (!values.name.trim()) {
      next.name = "Tell us who we are replying to.";
    }
    if (!values.email.trim()) {
      next.email = "We need an email address to reply to.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = "That does not look like a valid email address.";
    }
    if (!values.topic) {
      next.topic = "Choose what this is about.";
    }
    if (!values.message.trim()) {
      next.message = "Add a few details so we can help.";
    } else if (values.message.trim().length < MIN_MESSAGE_LENGTH) {
      next.message = `A little more detail helps — at least ${MIN_MESSAGE_LENGTH} characters.`;
    }

    return next;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    const order: FieldKey[] = ["name", "email", "topic", "message"];
    const firstInvalid = order.find((key) => nextErrors[key]);

    if (firstInvalid) {
      fieldRefs.current.get(firstInvalid)?.focus();
      return;
    }

    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      // Blocked storage should not stop the enquiry.
    }

    setSubmitted(values);
  };

  if (submitted) {
    return (
      <SubmittedPanel
        values={submitted}
        onReset={() => {
          setSubmitted(null);
          setValues(initialValues);
        }}
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby={`${baseId}-heading`}
      className="rounded-[var(--radius-tile)] border border-line bg-white p-6 sm:p-9"
    >
      <h2
        id={`${baseId}-heading`}
        className="text-xl font-extrabold tracking-[-0.025em] text-ink"
      >
        Send us a message
      </h2>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
        Fields marked with an asterisk are required.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          required
          htmlFor={`${baseId}-name`}
          error={errors.name}
          errorId={`${baseId}-name-error`}
        >
          <input
            ref={(node) => {
              fieldRefs.current.set("name", node);
            }}
            id={`${baseId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Alex Morgan"
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
            className={controlClass(Boolean(errors.name))}
          />
        </Field>

        <Field
          label="Email address"
          required
          htmlFor={`${baseId}-email`}
          error={errors.email}
          errorId={`${baseId}-email-error`}
        >
          <input
            ref={(node) => {
              fieldRefs.current.set("email", node);
            }}
            id={`${baseId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(event) => setField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? `${baseId}-email-error` : undefined
            }
            className={controlClass(Boolean(errors.email))}
          />
        </Field>

        <Field
          label="What is this about"
          required
          htmlFor={`${baseId}-topic`}
          error={errors.topic}
          errorId={`${baseId}-topic-error`}
        >
          <div className="relative">
            <select
              ref={(node) => {
                fieldRefs.current.set("topic", node);
              }}
              id={`${baseId}-topic`}
              name="topic"
              required
              value={values.topic}
              onChange={(event) => setField("topic", event.target.value)}
              aria-invalid={Boolean(errors.topic)}
              aria-describedby={
                errors.topic ? `${baseId}-topic-error` : undefined
              }
              className={`${controlClass(Boolean(errors.topic))} cursor-pointer appearance-none pr-11`}
            >
              <option value="">Select a topic</option>
              {contactTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted"
            />
          </div>
        </Field>

        <Field
          label="Booking reference"
          htmlFor={`${baseId}-reference`}
          hint="Optional"
        >
          <input
            ref={(node) => {
              fieldRefs.current.set("reference", node);
            }}
            id={`${baseId}-reference`}
            name="reference"
            type="text"
            placeholder="BOR-000000"
            value={values.reference}
            onChange={(event) => setField("reference", event.target.value)}
            className={controlClass(false)}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="Message"
            required
            htmlFor={`${baseId}-message`}
            error={errors.message}
            errorId={`${baseId}-message-error`}
          >
            <textarea
              ref={(node) => {
                fieldRefs.current.set("message", node);
              }}
              id={`${baseId}-message`}
              name="message"
              required
              rows={6}
              placeholder="Tell us what you need — dates, city and vehicle class are all useful."
              value={values.message}
              onChange={(event) => setField("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? `${baseId}-message-error` : undefined
              }
              className={`${controlClass(Boolean(errors.message))} resize-y`}
            />
          </Field>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className="group inline-flex items-center gap-2.5 rounded-[16px] bg-volt px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-ink transition-colors duration-200 hover:bg-volt-deep"
        >
          Send message
          <ArrowRight
            className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>

        <p className="text-[0.8125rem] leading-relaxed text-muted">
          We use these details to answer your enquiry and nothing else.
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* Confirmation                                                                */
/* -------------------------------------------------------------------------- */

function SubmittedPanel({
  values,
  onReset,
}: {
  values: FormValues;
  onReset: () => void;
}) {
  const firstName = values.name.trim().split(/\s+/)[0];

  const subject = `[${values.topic}]${values.reference ? ` ${values.reference.trim()} —` : ""} enquiry from ${values.name.trim()}`;
  const body = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    values.reference.trim()
      ? `Booking reference: ${values.reference.trim()}`
      : null,
    `Topic: ${values.topic}`,
    "",
    values.message.trim(),
  ]
    .filter(Boolean)
    .join("\n");

  const mailto = `mailto:${SUPPORT_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div
      role="status"
      className="rounded-[var(--radius-tile)] border border-line bg-white p-6 sm:p-9"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-volt">
        <Check className="h-5 w-5 text-ink" aria-hidden="true" />
      </span>

      <h2 className="mt-6 text-2xl font-extrabold tracking-[-0.03em] text-ink">
        Thanks, {firstName} — your message is ready.
      </h2>

      <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
        This form is not connected to a mailbox yet. Rather than let your
        message disappear, we have packaged it up — open it in your email client
        and it will arrive with the support desk exactly as written.
      </p>

      <dl className="mt-8 divide-y divide-line border-y border-line">
        <SummaryRow term="Topic" value={values.topic} />
        <SummaryRow term="Reply to" value={values.email.trim()} />
        {values.reference.trim() ? (
          <SummaryRow
            term="Booking reference"
            value={values.reference.trim()}
          />
        ) : null}
        <SummaryRow term="Message" value={values.message.trim()} />
      </dl>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={mailto}
          className="group inline-flex items-center gap-2.5 rounded-[16px] bg-ink px-7 py-4 text-base font-extrabold tracking-[-0.01em] text-white transition-colors duration-200 hover:bg-graphite"
        >
          <Mail className="h-4.5 w-4.5" aria-hidden="true" />
          Open in email
        </a>
        <button
          type="button"
          onClick={onReset}
          className="rounded-[16px] border border-line px-7 py-4 text-base font-bold text-ink transition-colors duration-200 hover:bg-cloud"
        >
          Write another
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ term, value }: { term: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
      <dt className="text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase sm:pt-1">
        {term}
      </dt>
      <dd className="text-[0.9375rem] leading-relaxed whitespace-pre-line text-ink">
        {value}
      </dd>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Field primitives                                                            */
/* -------------------------------------------------------------------------- */

function controlClass(hasError: boolean): string {
  return [
    "w-full rounded-[14px] border bg-white px-4 py-3.5 text-[0.9375rem] font-medium text-ink",
    "placeholder:text-muted/70 focus:outline-none focus-visible:border-ink",
    hasError ? "border-danger bg-danger/5" : "border-line",
  ].join(" ");
}

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
}

function Field({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  errorId,
  children,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-baseline gap-2 text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="text-danger">
            *
          </span>
        ) : null}
        {hint ? (
          <span className="text-muted/70 normal-case">{hint}</span>
        ) : null}
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
