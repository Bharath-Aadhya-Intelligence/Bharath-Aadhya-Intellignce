// Cookie consent configuration. Change consent behaviour here, not in the components.

/** Bump this when the categories or their meaning change. Visitors are asked again. */
export const COOKIE_CONSENT_VERSION = 1;

/** localStorage key that holds the visitor's saved choice. */
export const COOKIE_CONSENT_STORAGE_KEY = "bai-cookie-consent";

/** The saved choice expires after this many days, and the banner is shown again. [TO CONFIRM: renewal period] */
export const COOKIE_CONSENT_MAX_AGE_DAYS = 365;

export const OPTIONAL_CATEGORIES = ["analytics", "marketing"] as const;

export type OptionalCategory = (typeof OPTIONAL_CATEGORIES)[number];

export const CATEGORY_INFO: Record<OptionalCategory, { label: string; description: string }> = {
  analytics: {
    label: "Analytics",
    description:
      "Helps us understand how visitors use the website, such as which pages are viewed, so we can improve it. Off unless you allow it.",
  },
  marketing: {
    label: "Marketing",
    description:
      "Used to measure the performance of advertising and to show relevant promotions. Off unless you allow it.",
  },
};

export type Integration = {
  id: string;
  name: string;
  category: OptionalCategory;
  /** Cookies this integration sets. They are deleted when its category is not allowed. */
  cookieNames: string[];
  /** Starts the integration, for example by adding its script. Called only after consent. */
  load: () => void;
};

/**
 * Every non-essential script, pixel, or embed must be registered here so that it
 * only starts after the visitor allows its category.
 *
 * Currently empty: the website has no analytics, advertising, or embedded tracking.
 * Because no optional category has an integration, the preferences panel shows no
 * optional categories.
 */
export const INTEGRATIONS: Integration[] = [];
