"use client";

import type { ReactNode } from "react";

/**
 * Accessible form field primitives for the (UI-only) Join and Submit forms. Labels are tied to
 * inputs; errors are associated via aria-describedby; targets are ≥44px. Nothing is sent.
 */
export function FieldShell({
  id,
  label,
  required,
  error,
  children,
  hint,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(" ");
  return (
    <div>
      <label htmlFor={id} className="section-label block text-bark-soft">
        {label}
        {required && <span className="ml-1 text-terracotta" aria-hidden>*</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-small text-bark-soft">
          {hint}
        </p>
      )}
      <div className="mt-2" aria-describedby={describedBy || undefined}>
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-small text-terracotta">
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "w-full min-h-[44px] rounded-[3px] border bg-sand px-3.5 py-2.5 text-body text-bark placeholder:text-bark-soft/60 transition-colors duration-fast focus:border-forest";

export function TextInput({
  id,
  invalid,
  ...props
}: { id: string; invalid?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      id={id}
      aria-invalid={invalid || undefined}
      className={`${inputBase} ${invalid ? "border-terracotta" : "border-bark/25"}`}
      {...props}
    />
  );
}

export function TextArea({
  id,
  invalid,
  ...props
}: { id: string; invalid?: boolean } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      id={id}
      aria-invalid={invalid || undefined}
      rows={4}
      className={`${inputBase} ${invalid ? "border-terracotta" : "border-bark/25"}`}
      {...props}
    />
  );
}

export function Select({
  id,
  invalid,
  children,
  ...props
}: { id: string; invalid?: boolean; children: ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      id={id}
      aria-invalid={invalid || undefined}
      className={`${inputBase} ${invalid ? "border-terracotta" : "border-bark/25"}`}
      {...props}
    >
      {children}
    </select>
  );
}
