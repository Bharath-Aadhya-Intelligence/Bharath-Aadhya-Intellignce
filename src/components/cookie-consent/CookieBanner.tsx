"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type CookieBannerProps = {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onOpenSettings: () => void;
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo";

export default function CookieBanner({ onAcceptAll, onRejectAll, onOpenSettings }: CookieBannerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby="cookie-banner-title"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:max-w-lg sm:p-6"
    >
      <div className="rounded-2xl border border-border-subtle bg-white p-4 shadow-2xl sm:p-6">
        <h2
          id="cookie-banner-title"
          className="mb-2 font-display text-base font-black uppercase tracking-tight text-foreground sm:text-lg"
        >
          We value your privacy
        </h2>
        <p className="mb-2 text-xs font-medium leading-relaxed text-muted sm:mb-3 sm:text-sm">
          We use essential technologies to make our website work properly. With your permission, we may also use
          optional cookies to understand website usage and improve our services.
        </p>
        <p className="mb-4 text-sm font-bold">
          <Link
            href="/privacy-policy/"
            className={`rounded text-accent-indigo underline underline-offset-2 hover:text-foreground ${focusRing}`}
          >
            Privacy Policy
          </Link>
        </p>

        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={onAcceptAll}
            className={`whitespace-nowrap rounded-xl bg-accent-indigo px-4 py-3 text-sm font-bold text-white transition-all hover:bg-accent-indigo/90 active:scale-95 sm:flex-1 ${focusRing}`}
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={onRejectAll}
            className={`whitespace-nowrap rounded-xl border-2 border-muted bg-white px-4 py-3 text-sm font-bold text-foreground transition-all hover:bg-black/5 active:scale-95 sm:flex-1 ${focusRing}`}
          >
            Reject All
          </button>
          <button
            type="button"
            onClick={onOpenSettings}
            className={`col-span-2 rounded py-2 text-sm font-bold text-accent-indigo underline underline-offset-2 hover:text-foreground sm:col-auto sm:px-2 ${focusRing}`}
          >
            Cookie Settings
          </button>
        </div>
      </div>
    </motion.section>
  );
}
