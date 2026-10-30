// Vercel Edge Function: POST /api/contact on the backend deployment.
// The GitHub Pages site is static and cannot run this code. The browser calls this
// endpoint cross-origin, and src/lib/contact/cors.ts limits which websites may do so.
// Deploy from this repository to Vercel as a separate project. See docs/CONTACT_FORM.md.

import { handleContactRequest } from "../src/lib/contact/handler";

export const config = { runtime: "edge" };

export default function handler(request: Request): Promise<Response> {
  return handleContactRequest(request);
}
