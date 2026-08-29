"use client";

import { useState, type FormEvent } from "react";
import { FieldShell, Select, TextArea, TextInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

/**
 * A single submission-engine form with typed variants (framework §13 — "one engine, typed
 * forms"). Client-side validation + success/error states are real; nothing is stored or sent.
 * The submit is clearly labelled as not-yet-active.
 */
export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "email" | "url" | "textarea" | "select" | "date";
  required?: boolean;
  hint?: string;
  options?: string[];
  placeholder?: string;
}

export function SubmitForm({ fields, typeLabel }: { fields: FieldDef[]; typeLabel: string }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [checks, setChecks] = useState({ accuracy: false, consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (name: string, v: string) => setValues((s) => ({ ...s, [name]: v }));

  function validate() {
    const e: Record<string, string> = {};
    for (const f of fields) {
      const val = (values[f.name] ?? "").trim();
      if (f.required && !val) e[f.name] = "This field is required.";
      else if (val && f.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val))
        e[f.name] = "Enter a valid email address.";
      else if (val && f.type === "url" && !/^https?:\/\/.+/.test(val))
        e[f.name] = "Enter a full URL (starting with http).";
    }
    if (!checks.accuracy) e.accuracy = "Please confirm the information is accurate.";
    if (!checks.consent) e.consent = "Please confirm you consent to publication.";
    return e;
  }

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status" className="border border-forest/40 bg-forest/[0.05] p-8">
        <p className="section-label text-forest">Validated — not sent</p>
        <h2 className="mt-3 font-display text-title">Your {typeLabel.toLowerCase()} passed validation.</h2>
        <p className="measure mt-3 text-body text-bark-soft">
          This is a preview of the submission experience. Nothing has been stored or sent —
          submission processing and moderation arrive with the member system. When it does, an
          entry like this would enter the review queue and you would be notified of each step.
        </p>
        <Button variant="ghost" className="mt-6" onClick={() => { setSubmitted(false); setValues({}); setChecks({ accuracy: false, consent: false }); }}>
          Edit and try again
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      {/* Common: your details */}
      <fieldset className="space-y-6">
        <legend className="font-display text-title">Your details</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <FieldShell id="submitter-name" label="Name" required error={errors["submitter-name"]}>
            <TextInput id="submitter-name" invalid={!!errors["submitter-name"]} value={values["submitter-name"] ?? ""} onChange={(e) => set("submitter-name", e.target.value)} />
          </FieldShell>
          <FieldShell id="submitter-email" label="Email" required error={errors["submitter-email"]} hint="Used only to reach you about this submission.">
            <TextInput id="submitter-email" type="email" invalid={!!errors["submitter-email"]} value={values["submitter-email"] ?? ""} onChange={(e) => set("submitter-email", e.target.value)} />
          </FieldShell>
        </div>
      </fieldset>

      {/* Type-specific */}
      <fieldset className="space-y-6">
        <legend className="font-display text-title">{typeLabel}</legend>
        <div className="grid gap-6">
          {fields.map((f) => (
            <FieldShell key={f.name} id={f.name} label={f.label} required={f.required} hint={f.hint} error={errors[f.name]}>
              {f.type === "textarea" ? (
                <TextArea id={f.name} invalid={!!errors[f.name]} placeholder={f.placeholder} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
              ) : f.type === "select" ? (
                <Select id={f.name} invalid={!!errors[f.name]} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)}>
                  <option value="">Choose…</option>
                  {f.options?.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </Select>
              ) : (
                <TextInput id={f.name} type={f.type === "date" ? "date" : f.type} invalid={!!errors[f.name]} placeholder={f.placeholder} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
              )}
            </FieldShell>
          ))}
        </div>
      </fieldset>

      {/* Declarations (framework §13 common fields) */}
      <fieldset className="space-y-3 border-t rule-gold pt-6">
        <legend className="font-display text-title">Before you submit</legend>
        <label className="flex items-start gap-3 text-small text-bark">
          <input type="checkbox" className="mt-1 h-4 w-4" checked={checks.accuracy} onChange={(e) => setChecks((c) => ({ ...c, accuracy: e.target.checked }))} />
          <span>I confirm this information is accurate and makes no misleading claims about qualifications, outcomes or therapeutic benefits.</span>
        </label>
        {errors.accuracy && <p role="alert" className="text-small text-terracotta">{errors.accuracy}</p>}
        <label className="flex items-start gap-3 text-small text-bark">
          <input type="checkbox" className="mt-1 h-4 w-4" checked={checks.consent} onChange={(e) => setChecks((c) => ({ ...c, consent: e.target.checked }))} />
          <span>I consent to this being reviewed by a moderator and, if approved, published on the portal.</span>
        </label>
        {errors.consent && <p role="alert" className="text-small text-terracotta">{errors.consent}</p>}
      </fieldset>

      <div className="border-t rule-gold pt-6">
        <Button type="submit" variant="solid">Review my submission</Button>
        <p className="mt-3 text-small text-bark-soft">
          This form validates but does not send. Submission processing, moderation and email
          notifications arrive with the member system.
        </p>
      </div>
    </form>
  );
}
