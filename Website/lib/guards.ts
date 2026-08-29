import { isValidOrigin } from "./badges";
import type {
  Bulletin,
  EventItem,
  Initiative,
  Listing,
  Person,
  Resource,
} from "./types";

/**
 * Schema guards that enforce the framework's hard rules STRUCTURALLY rather than by policy:
 *  - a resource cannot exist without rights + source (§6.3)
 *  - a publishable entity cannot exist without a valid origin that maps to a badge (§10/§23)
 *  - a listing/bulletin cannot exist without an expiry (§6.4)
 *
 * Loaders run these at build time; a violation throws and fails the build.
 */

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[content] ${message}`);
  }
}

function nonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateResource(r: Resource): Resource {
  assert(nonEmpty(r.slug), `resource "${r.title ?? "?"}" is missing a slug`);
  assert(nonEmpty(r.title), `resource "${r.slug}" is missing a title`);
  // §6.3 — rights and source are REQUIRED; the Library never hosts files.
  assert(nonEmpty(r.rights), `resource "${r.slug}" is missing required rights information (§6.3)`);
  assert(
    r.source && nonEmpty(r.source.name) && nonEmpty(r.source.url),
    `resource "${r.slug}" is missing a required source/access link (§6.3)`,
  );
  return r;
}

export function validateInitiative(i: Initiative): Initiative {
  assert(nonEmpty(i.slug), `initiative "${i.title ?? "?"}" is missing a slug`);
  assert(
    i.origin === "yoga_mandala_initiative",
    `initiative "${i.slug}" must have origin yoga_mandala_initiative`,
  );
  return i;
}

export function validateBulletin(b: Bulletin): Bulletin {
  assert(nonEmpty(b.slug), `bulletin "${b.title ?? "?"}" is missing a slug`);
  assert(isValidOrigin(b.origin), `bulletin "${b.slug}" has no valid origin/badge (§10)`);
  assert(
    b.origin === "curated_external" || b.origin === "partner_guest",
    `bulletin "${b.slug}" must be curated_external or partner_guest — never auto-labelled as a YM programme (§6.2)`,
  );
  assert(nonEmpty(b.expiry), `bulletin "${b.slug}" is missing an expiry date (§6.4)`);
  return b;
}

export function validateEvent(e: EventItem): EventItem {
  assert(nonEmpty(e.slug), `event "${e.title ?? "?"}" is missing a slug`);
  assert(isValidOrigin(e.origin), `event "${e.slug}" has no valid origin/badge (§10)`);
  assert(nonEmpty(e.date), `event "${e.slug}" is missing a date`);
  return e;
}

export function validateListing(l: Listing): Listing {
  assert(nonEmpty(l.slug), `listing "${l.title ?? "?"}" is missing a slug`);
  assert(
    l.origin === "community_submission",
    `listing "${l.slug}" must have origin community_submission`,
  );
  assert(nonEmpty(l.expiry), `listing "${l.slug}" is missing an expiry date (§6.4)`);
  return l;
}

export function validatePerson(p: Person): Person {
  assert(nonEmpty(p.slug), `person "${p.name ?? "?"}" is missing a slug`);
  assert(nonEmpty(p.name), `person "${p.slug}" is missing a name`);
  // Integrity: any person in Phase A must be a marked sample (no fabricated real people).
  assert(
    p.sample === true,
    `person "${p.slug}" must be marked sample:true in Phase A (no fabricated real people)`,
  );
  return p;
}
