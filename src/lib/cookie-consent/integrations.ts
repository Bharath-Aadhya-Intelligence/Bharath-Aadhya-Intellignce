// Connects the saved choice to the non-essential integrations registered in config.ts.

import { OPTIONAL_CATEGORIES, type Integration, type OptionalCategory } from "./config";
import type { ConsentRecord } from "./storage";

/** Optional categories that have at least one integration. Only these are shown to the visitor. */
export function shownCategories(integrations: Integration[]): OptionalCategory[] {
  return OPTIONAL_CATEGORIES.filter((category) =>
    integrations.some((integration) => integration.category === category)
  );
}

export function isAllowed(record: ConsentRecord | null, category: OptionalCategory): boolean {
  return record?.categories[category] === true;
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

/**
 * Starts allowed integrations once, and removes cookies of the others.
 *
 * A script that is already running cannot be stopped without reloading the page. If the
 * visitor withdraws consent for such an integration, `reloadRequired` is true so the caller
 * can reload the page. The reload guarantees that no withdrawn script keeps running.
 *
 * `started` holds the ids of integrations already loaded in this page view. It is updated in place.
 */
export function applyConsent(
  record: ConsentRecord | null,
  integrations: Integration[],
  started: Set<string>,
  removeCookie: (name: string) => void = deleteCookie
): { reloadRequired: boolean } {
  let reloadRequired = false;

  for (const integration of integrations) {
    if (isAllowed(record, integration.category)) {
      if (!started.has(integration.id)) {
        integration.load();
        started.add(integration.id);
      }
      continue;
    }

    if (started.has(integration.id)) {
      reloadRequired = true;
    }
    for (const name of integration.cookieNames) {
      removeCookie(name);
    }
  }

  return { reloadRequired };
}
