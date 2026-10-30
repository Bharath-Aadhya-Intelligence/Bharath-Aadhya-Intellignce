"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CATEGORY_INFO, type OptionalCategory } from "@/lib/cookie-consent/config";

type CookiePreferencesDialogProps = {
  /** Optional categories that have at least one integration. Empty means none are shown. */
  categories: OptionalCategory[];
  /** Current choice, pre-filled so the visitor edits what is already saved. */
  initialChoices: Record<OptionalCategory, boolean>;
  onSave: (choices: Record<OptionalCategory, boolean>) => void;
  /** Called on Cancel and when Escape closes the dialog. */
  onClose: () => void;
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo";

export default function CookiePreferencesDialog({
  categories,
  initialChoices,
  onSave,
  onClose,
}: CookiePreferencesDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(initialChoices);

  // The dialog is mounted only while open, so it opens once. showModal() gives focus trapping,
  // inert background content, and Escape handling.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(draft);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cookie-settings-title"
      aria-describedby="cookie-settings-intro"
      onClose={onClose}
      className="m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl bg-white p-0 text-foreground shadow-2xl backdrop:bg-black/40"
    >
      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        <h2 id="cookie-settings-title" className="mb-3 font-display text-xl font-black uppercase tracking-tight">
          Cookie Settings
        </h2>
        <p id="cookie-settings-intro" className="mb-6 text-sm font-medium leading-relaxed text-muted">
          Choose which cookies and similar technologies we may use. Strictly necessary items are always on because the
          website needs them to work.{categories.length > 0 && " Optional items are off until you turn them on."}
        </p>

        <ul className="mb-8 divide-y divide-border-subtle border-y border-border-subtle">
          <li className="flex items-start justify-between gap-4 py-4">
            <div>
              <h3 id="cookie-cat-necessary-title" className="text-sm font-black text-foreground">
                Strictly Necessary
              </h3>
              <p id="cookie-cat-necessary-desc" className="mt-1 text-sm font-medium leading-relaxed text-muted">
                Needed for the website to function. Your cookie choice is kept in your browser&apos;s local storage
                (not a cookie) so we can remember it. These cannot be switched off.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 pt-0.5">
              <span className="text-xs font-bold text-muted">Always on</span>
              <label className="relative inline-flex cursor-not-allowed items-center">
                <input
                  type="checkbox"
                  role="switch"
                  defaultChecked
                  disabled
                  aria-labelledby="cookie-cat-necessary-title"
                  aria-describedby="cookie-cat-necessary-desc"
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="relative h-6 w-11 rounded-full bg-accent-indigo/50 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:translate-x-5 after:rounded-full after:bg-white"
                />
              </label>
            </div>
          </li>

          {categories.map((category) => {
            const info = CATEGORY_INFO[category];
            return (
              <li key={category} className="flex items-start justify-between gap-4 py-4">
                <div>
                  <h3 id={`cookie-cat-${category}-title`} className="text-sm font-black text-foreground">
                    {info.label}
                  </h3>
                  <p id={`cookie-cat-${category}-desc`} className="mt-1 text-sm font-medium leading-relaxed text-muted">
                    {info.description}
                  </p>
                </div>
                <div className="flex shrink-0 items-center pt-0.5">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      role="switch"
                      checked={draft[category]}
                      onChange={(event) => setDraft((prev) => ({ ...prev, [category]: event.target.checked }))}
                      aria-labelledby={`cookie-cat-${category}-title`}
                      aria-describedby={`cookie-cat-${category}-desc`}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className="relative h-6 w-11 rounded-full bg-muted-foreground transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-accent-indigo peer-checked:after:translate-x-5 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-indigo"
                    />
                  </label>
                </div>
              </li>
            );
          })}
        </ul>

        {categories.length === 0 && (
          <p className="mb-8 text-sm font-medium leading-relaxed text-muted">
            This website does not currently use analytics or marketing cookies, so there are no optional categories to
            manage.
          </p>
        )}

        <p className="mb-6 text-sm font-bold">
          <Link href="/privacy-policy/" className={`rounded text-accent-indigo underline underline-offset-2 ${focusRing}`}>
            Read our Privacy Policy
          </Link>
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`rounded-xl border-2 border-muted bg-white px-6 py-3 text-sm font-bold text-foreground transition-all hover:bg-black/5 active:scale-95 ${focusRing}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`rounded-xl bg-accent-indigo px-6 py-3 text-sm font-bold text-white transition-all hover:bg-accent-indigo/90 active:scale-95 ${focusRing}`}
          >
            Save Preferences
          </button>
        </div>
      </form>
    </dialog>
  );
}
