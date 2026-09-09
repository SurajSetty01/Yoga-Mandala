'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

/**
 * The page's only client island, and deliberately a small one.
 *
 * The rest of the contact page — every word, the number, both links, the photograph — is
 * server-rendered and complete before any JavaScript runs. This adds one convenience on top
 * of it: take the number with you. It renders nothing until the page has hydrated AND a
 * clipboard has been confirmed, so a reader without JavaScript is never shown a button that
 * does nothing. The number itself is plain, selectable text either way.
 *
 * `useSyncExternalStore` with a server snapshot of `false` is how a component asks "am I on
 * the client yet?" without writing state from inside an effect: the server and the first
 * client pass both render nothing, so hydration matches exactly, and the button appears on
 * the pass straight after.
 */
const subscribe = () => () => {};
const onClient = () =>
  typeof navigator !== 'undefined' && typeof navigator.clipboard?.writeText === 'function';
const onServer = () => false;

export function CopyNumber({ value }: { value: string }) {
  const ready = useSyncExternalStore(subscribe, onClient, onServer);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 2400);
    return () => clearTimeout(t);
  }, [done]);

  if (!ready) return null;

  const copy = () => {
    navigator.clipboard.writeText(value).then(
      () => setDone(true),
      () => {
        // A refused clipboard is not worth an error message on a contact page: the number
        // is sitting right there in selectable text.
      }
    );
  };

  return (
    <span className="cx-copy">
      <button className="cx-copy__b" type="button" onClick={copy}>
        Copy number
      </button>
      {/* Visible confirmation and the announcement are the same element, so it is said once. */}
      <span className="cx-copy__ok" role="status">
        {done ? 'Copied' : ''}
      </span>
    </span>
  );
}
