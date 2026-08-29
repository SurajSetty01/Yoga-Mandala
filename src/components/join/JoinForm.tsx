"use client";

import { useId, useState } from "react";
import Link from "next/link";

/**
 * Membership form (P18 §3). Phase A: fully interactive, submits nothing.
 *
 * §16 built in: every field carries a one-line reason inline, and only fields
 * with a clear purpose at signup are collected. Phone, qualifications, bio and
 * photo are deliberately NOT asked here — those belong to the separate,
 * reviewed directory-profile application.
 */

const ROLES = [
  { value: "teacher", label: "A teacher" },
  { value: "practitioner", label: "A serious practitioner" },
  { value: "therapist", label: "A yoga therapist" },
  { value: "researcher", label: "A researcher" },
  { value: "other", label: "Something else" },
];

const FORMATS = [
  { value: "online", label: "Online" },
  { value: "offline", label: "In person" },
  { value: "both", label: "Both" },
  { value: "na", label: "Not applicable" },
];

export function JoinForm() {
  const [sent, setSent] = useState(false);
  const uid = useId();
  const f = (name: string) => `${uid}-${name}`;

  if (sent) {
    return (
      <div className="border border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] p-6 md:p-8">
        <p className="t-label m-0 opacity-60">Received for review</p>
        <p className="t-body mt-4 mb-0 measure">
          In the live site this would begin your membership. You would receive a confirmation by email, and you
          could then apply for a Teacher Directory profile as a separate, reviewed step. Nothing was sent from
          this preview.
        </p>
        <p className="t-small mt-5 mb-0 opacity-70">
          Joining makes you a Member. A verified directory profile is reviewed against{" "}
          <Link href="/connect/directory" className="link-rule">
            published criteria
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="field">
          <label htmlFor={f("name")}>Name *</label>
          <input id={f("name")} name="name" type="text" required autoComplete="name" />
          <span className="t-small opacity-60">Your public name in the community.</span>
        </div>
        <div className="field">
          <label htmlFor={f("email")}>Email *</label>
          <input id={f("email")} name="email" type="email" required autoComplete="email" />
          <span className="t-small opacity-60">How we contact you. Never shown publicly.</span>
        </div>
      </div>

      <div className="field">
        <label htmlFor={f("location")}>Location — city or region *</label>
        <input id={f("location")} name="location" type="text" required autoComplete="address-level2" />
        <span className="t-small opacity-60">Helps members find people nearby.</span>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="field">
          <label htmlFor={f("role")}>I am… *</label>
          <select id={f("role")} name="role" required defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <span className="t-small opacity-60">Helps us understand the community.</span>
        </div>
        <div className="field">
          <label htmlFor={f("format")}>How you teach or practise</label>
          <select id={f("format")} name="format" defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {FORMATS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <span className="t-small opacity-60">Optional. Helps us shape events and formats.</span>
        </div>
      </div>

      <div className="field">
        <label htmlFor={f("tradition")}>Your tradition or lineage</label>
        <input id={f("tradition")} name="tradition" type="text" />
        <span className="t-small opacity-60">Optional. Where your practice comes from.</span>
      </div>

      <div className="field">
        <label htmlFor={f("bio")}>A short note about you</label>
        <textarea id={f("bio")} name="bio" />
        <span className="t-small opacity-60">
          Optional. A sentence or two. A full profile and photo are part of the separate directory application.
        </span>
      </div>

      <div className="field">
        <label htmlFor={f("heard")}>How you heard about Yoga Mandala</label>
        <input id={f("heard")} name="heard" type="text" />
        <span className="t-small opacity-60">Optional.</span>
      </div>

      <fieldset className="m-0 grid gap-5 border-0 p-0">
        <legend className="t-label mb-1 p-0 opacity-55">Before you join</legend>
        <label className="flex items-baseline gap-3 t-small opacity-85">
          <input type="checkbox" name="guidelines" required className="mt-1 shrink-0" />
          <span>
            I have read and agree to the{" "}
            <Link href="/guidelines" className="link-rule">
              Community Guidelines
            </Link>
            . <span aria-hidden>*</span>
          </span>
        </label>
        <label className="flex items-baseline gap-3 t-small opacity-85">
          <input type="checkbox" name="accuracy" required className="mt-1 shrink-0" />
          <span>
            I confirm the information above is accurate. <span aria-hidden>*</span>
          </span>
        </label>
        <label className="flex items-baseline gap-3 t-small opacity-85">
          <input type="checkbox" name="consent" required className="mt-1 shrink-0" />
          <span>
            I understand that my name, location and role become part of my member profile, and that my email is
            never shown publicly. I can edit or remove these at any time. <span aria-hidden>*</span>
          </span>
        </label>
      </fieldset>

      <div className="flex flex-wrap items-center gap-4 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] pt-8">
        <button type="submit" className="btn btn-solid">
          <span>Join the Sangha</span>
        </button>
        <span className="t-label opacity-55">Preview only — nothing is sent</span>
      </div>
    </form>
  );
}
