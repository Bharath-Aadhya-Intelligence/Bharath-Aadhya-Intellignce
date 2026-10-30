"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { INTEGRATIONS, type OptionalCategory } from "@/lib/cookie-consent/config";
import { applyConsent, shownCategories } from "@/lib/cookie-consent/integrations";
import {
  createConsentRecord,
  getBrowserStorage,
  hasCompleteChoice,
  readConsent,
  writeConsent,
  type ConsentChoices,
  type ConsentRecord,
} from "@/lib/cookie-consent/storage";
import CookieBanner from "./CookieBanner";
import CookiePreferencesDialog from "./CookiePreferencesDialog";

// Optional categories that have integrations. The others are not shown to the visitor.
const SHOWN_CATEGORIES = shownCategories(INTEGRATIONS);

type CookieConsentContextValue = {
  /** Opens the Cookie Settings dialog. Used by the footer link. */
  openPreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used inside CookieConsentProvider");
  }
  return context;
}

function choicesFrom(record: ConsentRecord | null): Record<OptionalCategory, boolean> {
  return {
    analytics: record?.categories.analytics === true,
    marketing: record?.categories.marketing === true,
  };
}

export default function CookieConsentProvider({ children }: { children: ReactNode }) {
  // The saved choice is read after mount, so the server-rendered HTML matches the first client render.
  const [ready, setReady] = useState(false);
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  // Integrations started in this page view. Used to decide whether a reload is needed.
  const startedRef = useRef<Set<string>>(new Set());
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // localStorage exists only in the browser, so the saved choice can be read only after mount.
    // This runs once, which is the hydration-safe way to load it.
    const storage = getBrowserStorage();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecord(storage ? readConsent(storage) : null);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const { reloadRequired } = applyConsent(record, INTEGRATIONS, startedRef.current);
    // A withdrawn script that is still running can only be stopped by reloading the page.
    if (reloadRequired) window.location.reload();
  }, [record, ready]);

  const restoreFocus = useCallback(() => {
    returnFocusRef.current?.focus();
    returnFocusRef.current = null;
  }, []);

  const openPreferences = useCallback(() => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
    restoreFocus();
  }, [restoreFocus]);

  // Saves a choice for every category shown. Storage failures are tolerated: the choice still
  // applies to this page view, and the banner may appear again on a later visit.
  const saveChoices = useCallback(
    (choose: (category: OptionalCategory) => boolean) => {
      const categories: ConsentChoices = {};
      for (const category of SHOWN_CATEGORIES) {
        categories[category] = choose(category);
      }
      const next = createConsentRecord(categories);

      const storage = getBrowserStorage();
      if (storage) writeConsent(storage, next);

      setRecord(next);
      closePreferences();
    },
    [closePreferences]
  );

  const acceptAll = useCallback(() => saveChoices(() => true), [saveChoices]);
  const rejectAll = useCallback(() => saveChoices(() => false), [saveChoices]);

  const showBanner = ready && !hasCompleteChoice(record, SHOWN_CATEGORIES);

  return (
    <CookieConsentContext.Provider value={{ openPreferences }}>
      {children}

      {showBanner && (
        <CookieBanner onAcceptAll={acceptAll} onRejectAll={rejectAll} onOpenSettings={openPreferences} />
      )}

      {preferencesOpen && (
        <CookiePreferencesDialog
          categories={SHOWN_CATEGORIES}
          initialChoices={choicesFrom(record)}
          onSave={(draft) => saveChoices((category) => draft[category])}
          onClose={closePreferences}
        />
      )}
    </CookieConsentContext.Provider>
  );
}
