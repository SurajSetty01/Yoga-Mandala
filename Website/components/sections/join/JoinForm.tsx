"use client";

import { useState, type FormEvent } from "react";
import { FieldShell, Select, TextArea, TextInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { PERSON_ROLES } from "@/lib/taxonomy";

/**
 * Join the Sangha — a UI-only membership form. Validates client-side; nothing is stored or sent.
 * The submit state is clearly labelled as not-yet-active (member accounts are a later phase).
 */
export function JoinForm() {
  const [v, setV] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const set = (k: string, val: string) => setV((s) => ({ ...s, [k]: val }));

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!(v.name ?? "").trim()) err.name = "Please tell us your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email ?? "")) err.email = "Enter a valid email address.";
    setErrors(err);
    if (Object.keys(err).length === 0) setDone(true);
  }

  if (done) {
    return (
      <div role="status" className="border border-forest/40 bg-forest/[0.05] p-8">
        <p className="section-label text-forest">Validated — not sent</p>
        <h2 className="mt-3 font-display text-title">Thank you — this is a preview.</h2>
        <p className="measure mt-3 text-body text-bark-soft">
          Your details passed validation but nothing has been stored or sent. Accounts, sign-in
          and profiles arrive with the member system. When it does, joining would create your
          member profile and, if you wish, let you apply for a directory listing.
        </p>
        <Button variant="ghost" className="mt-6" onClick={() => { setDone(false); setV({}); }}>
          Edit
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FieldShell id="name" label="Your name" required error={errors.name}>
          <TextInput id="name" invalid={!!errors.name} value={v.name ?? ""} onChange={(e) => set("name", e.target.value)} />
        </FieldShell>
        <FieldShell id="email" label="Email" required error={errors.email} hint="We'll only use this to reach you about your membership.">
          <TextInput id="email" type="email" invalid={!!errors.email} value={v.email ?? ""} onChange={(e) => set("email", e.target.value)} />
        </FieldShell>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <FieldShell id="location" label="Where are you based?" hint="City and country.">
          <TextInput id="location" value={v.location ?? ""} onChange={(e) => set("location", e.target.value)} />
        </FieldShell>
        <FieldShell id="role" label="You are a…">
          <Select id="role" value={v.role ?? ""} onChange={(e) => set("role", e.target.value)}>
            <option value="">Choose…</option>
            {PERSON_ROLES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </Select>
        </FieldShell>
      </div>
      <FieldShell id="about" label="A little about your practice" hint="Optional — a sentence or two.">
        <TextArea id="about" value={v.about ?? ""} onChange={(e) => set("about", e.target.value)} />
      </FieldShell>

      <div className="border-t rule-gold pt-6">
        <Button type="submit" variant="solid">Join the Sangha</Button>
        <p className="mt-3 text-small text-bark-soft">
          This form validates but does not create an account yet — member accounts and sign-in are
          a later phase. Your details are not stored or sent.
        </p>
      </div>
    </form>
  );
}
