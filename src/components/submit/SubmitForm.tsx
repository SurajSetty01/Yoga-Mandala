"use client";

import { useId, useState } from "react";
import Link from "next/link";

/**
 * The one submission engine (P19 §1). A single client form driven by a
 * per-variant field schema — adding a submission type is a schema entry, not a
 * new form. Phase A: fully interactive, submits nothing. On submit it shows a
 * confirmation that restates the review lifecycle and never promises
 * publication (P19 §5).
 *
 * Moderator notes (§13's last common field) are deliberately absent from the
 * rendered schema — that field is internal and never shown to the submitter.
 */

export type FieldSpec =
  | {
      kind: "text" | "email" | "url" | "date" | "time" | "textarea";
      name: string;
      label: string;
      hint?: string;
      required?: boolean;
      placeholder?: string;
      autoComplete?: string;
      span?: "full" | "half";
    }
  | {
      kind: "select";
      name: string;
      label: string;
      hint?: string;
      required?: boolean;
      options: { value: string; label: string }[];
      span?: "full" | "half";
    };

export type FieldGroup = {
  legend: string;
  note?: string;
  fields: FieldSpec[];
};

export function SubmitForm({
  kind,
  groups,
}: {
  kind: string;
  groups: FieldGroup[];
}) {
  const [sent, setSent] = useState(false);
  const uid = useId();

  if (sent) {
    return (
      <div className="border border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] p-6 md:p-8">
        <p className="t-label m-0 opacity-60">Submitted for review</p>
        <p className="t-body mt-4 mb-0 measure">
          A submission like this would now enter the review queue: Draft &rarr; Submitted &rarr; Under Review
          &rarr; Approved, Changes Requested or Rejected. Every submission is read by a person before it is
          published. Nothing was sent from this preview.
        </p>
        <p className="t-small mt-5 mb-0 opacity-70">
          Read the standards a submission is measured against in the{" "}
          <Link href="/guidelines" className="link-rule">
            Community Guidelines
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-12"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {groups.map((group) => (
        <fieldset key={group.legend} className="m-0 grid gap-6 border-0 p-0">
          <legend className="t-label mb-1 p-0 opacity-55">{group.legend}</legend>
          {group.note && <p className="t-small -mt-3 mb-1 measure opacity-70">{group.note}</p>}
          <div className="grid gap-6 sm:grid-cols-2">
            {group.fields.map((f) => {
              const id = `${uid}-${kind}-${f.name}`;
              const wrap = f.span === "half" ? "" : "sm:col-span-2";
              return (
                <div key={f.name} className={`field ${wrap}`}>
                  <label htmlFor={id}>
                    {f.label}
                    {f.required && <span aria-hidden> *</span>}
                  </label>
                  {f.kind === "textarea" ? (
                    <textarea
                      id={id}
                      name={f.name}
                      required={f.required}
                      placeholder={"placeholder" in f ? f.placeholder : undefined}
                    />
                  ) : f.kind === "select" ? (
                    <select id={id} name={f.name} required={f.required} defaultValue="">
                      <option value="" disabled>
                        Select…
                      </option>
                      {f.options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={id}
                      name={f.name}
                      type={f.kind}
                      required={f.required}
                      placeholder={f.placeholder}
                      autoComplete={f.autoComplete}
                    />
                  )}
                  {f.hint && (
                    <span className="t-small opacity-60" style={{ marginTop: "0.15rem" }}>
                      {f.hint}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </fieldset>
      ))}

      {/* Shared closing fields — §13 common fields on every variant */}
      <fieldset className="m-0 grid gap-6 border-0 p-0">
        <legend className="t-label mb-1 p-0 opacity-55">Declarations</legend>
        <label className="flex items-baseline gap-3 t-small opacity-85">
          <input type="checkbox" name="accuracy" required className="mt-1 shrink-0" />
          <span>
            I declare that the information above is accurate to the best of my knowledge, and that I have the
            right to submit it. <span aria-hidden>*</span>
          </span>
        </label>
        <label className="flex items-baseline gap-3 t-small opacity-85">
          <input type="checkbox" name="consent" required className="mt-1 shrink-0" />
          <span>
            I consent to Yoga Mandala publishing this submission, in edited form if needed, once it has been
            reviewed. I understand review may result in changes being requested, or the submission not being
            published. <span aria-hidden>*</span>
          </span>
        </label>
      </fieldset>

      <div className="flex flex-wrap items-center gap-4 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] pt-8">
        <button type="submit" className="btn btn-solid">
          <span>Submit for review</span>
        </button>
        <span className="t-label opacity-55">Preview only — nothing is sent</span>
      </div>
    </form>
  );
}
