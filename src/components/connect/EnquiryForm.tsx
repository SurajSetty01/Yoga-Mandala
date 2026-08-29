"use client";

import { useState } from "react";

/**
 * Enquiry form (P11 §4). Phase A: fully interactive, submits nothing.
 * Never renders or transmits the teacher's own contact details — the whole
 * point of §16 is that contact happens without exposing an address.
 */
export function EnquiryForm({ teacherName }: { teacherName: string }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] p-6">
        <p className="t-label m-0 opacity-60">Thank you</p>
        <p className="t-body mt-3 mb-0">
          In the live site your enquiry would be relayed to {teacherName} without revealing their address, and
          without revealing yours until they reply. Nothing was sent from this preview.
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
          <label htmlFor="enq-name">Your name</label>
          <input id="enq-name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="enq-email">Your email</label>
          <input id="enq-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="enq-purpose">Purpose</label>
        <select id="enq-purpose" name="purpose" defaultValue="classes">
          <option value="classes">Enquiring about classes</option>
          <option value="collaboration">Collaboration</option>
          <option value="mentoring">Mentoring</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="enq-message">Message</label>
        <textarea id="enq-message" name="message" required />
      </div>
      <div className="flex items-center gap-4">
        <button type="submit" className="btn btn-solid">
          <span>Send enquiry</span>
        </button>
        <span className="t-label opacity-55">Preview only — nothing is sent</span>
      </div>
    </form>
  );
}
