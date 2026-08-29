"use client";

import { useState } from "react";

/**
 * Contact form (P20 §6). Phase A: fully interactive, submits nothing.
 *
 * The subject select routes an enquiry to the right place — general,
 * moderation & safety, or data & privacy — without ever exposing an address,
 * consistent with §16's rule against publishing contact details.
 */

const SUBJECTS = [
  { value: "general", label: "General enquiry" },
  { value: "moderation", label: "Moderation & safety" },
  { value: "data", label: "Data & privacy" },
  { value: "other", label: "Something else" },
] as const;

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] p-6">
        <p className="t-label m-0 opacity-60">Thank you</p>
        <p className="t-body mt-3 mb-0 measure">
          In the live site your message would be routed to the right people for the subject you chose, and you
          would receive a reply without any address being exposed to you or by you. Nothing was sent from this
          preview.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="contact-email">Your email</label>
          <input id="contact-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="contact-subject">What is this about?</label>
        <select id="contact-subject" name="subject" defaultValue="general">
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" required />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-solid">
          <span>Send message</span>
        </button>
        <span className="t-label opacity-55">Preview only — nothing is sent</span>
      </div>
    </form>
  );
}
