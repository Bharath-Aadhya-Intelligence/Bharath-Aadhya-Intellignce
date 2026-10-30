# Project Inquiry Form: Setup Guide (GitHub Pages + Vercel + Resend)

The website stays on **GitHub Pages**. The Project Inquiry form sends its data to a small
**backend API** deployed on **Vercel** from the same GitHub repository. The API calls
[Resend](https://resend.com/docs) to email `bharathaadhyaintelligence@gmail.com`.

```
Visitor's browser (GitHub Pages: https://bharath-aadhya-intelligence.github.io/Bharath-Aadhya-Intellignce/)
   │  POST  JSON, cross-origin       (CORS allows only the website origin)
   ▼
Vercel Edge Function (api/contact.ts → src/lib/contact/handler.ts)
   │  validate · sanitize · rate limit · honeypot · escape HTML
   ▼
Resend API (RESEND_API_KEY, server-side only) ──► bharathaadhyaintelligence@gmail.com
```

| Part | Where it runs | Config |
| --- | --- | --- |
| Website (static) | GitHub Pages, built by `.github/workflows/nextjs.yml` | GitHub repo **Variable** `NEXT_PUBLIC_CONTACT_API_URL` |
| Inquiry API | Vercel Edge Function, deployed from the same repo (`vercel.json`, `api/contact.ts`) | Vercel **Environment Variables** |
| Email | Resend | API key + verified sender domain |

Nothing secret is in the website build. `RESEND_API_KEY` is read only by the Vercel function.

---

## Step 1: Confirm your GitHub Pages origin

1. On GitHub, open the repository → **Settings → Pages**.
2. Note the site URL. For this project it is
   `https://bharath-aadhya-intelligence.github.io/Bharath-Aadhya-Intellignce/`.
3. The **origin** (scheme + host, no path) is `https://bharath-aadhya-intelligence.github.io`.
   This is the value for `ALLOWED_ORIGINS`.
   - If you add a custom domain to Pages (for example `www.bharathaadhya.com`), the origin becomes
     `https://www.bharathaadhya.com`. Add it to `ALLOWED_ORIGINS` too.

## Step 2: Create the Resend API key and verify the sender domain

1. Sign up or sign in at <https://resend.com>.
2. **API Keys** → **Create API Key** → permission **Sending access** → copy the key (`re_…`).
   You will paste it only into Vercel (Step 4). Never into GitHub, the code, or chat.
3. **Domains** → **Add Domain** → enter a domain you own (for example `bharathaadhya.com`).
4. Add the DNS records Resend shows (SPF `TXT`, DKIM, and optionally the bounce `MX`) at your DNS provider.
5. Click **Verify DNS Records** until the domain shows **Verified**. This can take minutes to hours.
6. Choose a sender address on that domain, such as `notifications@bharathaadhya.com`. This is `CONTACT_FROM_EMAIL`.

Until the domain is verified, Resend rejects sends, and the server log shows `reason=sender`.

## Step 3: Deploy the API on Vercel

1. Sign in at <https://vercel.com> with your GitHub account.
2. **Add New… → Project → Import** the repository `Bharath-Aadhya-Intelligence/Bharath-Aadhya-Intellignce`.
   - If the repository is not listed, install the **Vercel GitHub App** for the
     `Bharath-Aadhya-Intelligence` organization, and grant it access to this repository.
3. Settings on the import screen:
   - **Project Name:** for example `bai-contact-api`.
   - **Framework Preset:** Other. (`vercel.json` already sets this.)
   - **Root Directory:** `./` (the repository root).
   - Leave build and output settings at their defaults.
4. Before you click **Deploy**, expand **Environment Variables** and add the variables in Step 4. Adding them after the first deploy is also fine. Redeploy after adding them.

## Step 4: Configure the Vercel environment variables

In Vercel: project → **Settings → Environment Variables**. Add each variable for **Production**.

| Name | Value | Sensitive? |
| --- | --- | --- |
| `RESEND_API_KEY` | your `re_…` key from Step 2 | **Yes**. Choose "Sensitive". |
| `CONTACT_TO_EMAIL` | `bharathaadhyaintelligence@gmail.com` | No |
| `CONTACT_FROM_EMAIL` | `notifications@your-verified-domain.com` | No |
| `ALLOWED_ORIGINS` | `https://bharath-aadhya-intelligence.github.io` | No |

Rules:
- Do **not** prefix these with `NEXT_PUBLIC_`. That prefix would expose them to the browser.
- `ALLOWED_ORIGINS` takes exact origins only: no path and no trailing slash. Separate several with commas.
- Use `http://localhost:3000` only in the **Preview** environment, and only while testing locally (see Step 9).

After adding or changing variables, go to **Deployments → ⋯ → Redeploy** so they take effect.

## Step 5: Find your API URL and check it

1. Open the deployment's page in Vercel. Note the URL, for example `https://bai-contact-api.vercel.app`.
2. The inquiry endpoint is that URL plus `/api/contact`:
   `https://bai-contact-api.vercel.app/api/contact`. This is the value for `NEXT_PUBLIC_CONTACT_API_URL`.
3. Check it from a terminal. Replace the URL with yours.

   ```bash
   # 1) Browser preflight from the allowed website origin: expect 204 and an Access-Control-Allow-Origin header
   curl -i -X OPTIONS https://bai-contact-api.vercel.app/api/contact \
     -H "Origin: https://bharath-aadhya-intelligence.github.io" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: content-type"

   # 2) Same origin with an empty body: expect 400 with fieldErrors (no email is sent)
   curl -i -X POST https://bai-contact-api.vercel.app/api/contact \
     -H "Origin: https://bharath-aadhya-intelligence.github.io" \
     -H "Content-Type: application/json" -d '{}'

   # 3) Another origin: expect 403 and NO Access-Control-Allow-Origin header
   curl -i -X POST https://bai-contact-api.vercel.app/api/contact \
     -H "Origin: https://evil.example" -H "Content-Type: application/json" -d '{}'
   ```

   If check 3 returns 200 or 400, `ALLOWED_ORIGINS` is wrong or the deployment has not picked up the variables.

## Step 6: Point the website build at the API (GitHub)

1. On GitHub: repository → **Settings → Secrets and variables → Actions → Variables** tab.
2. **New repository variable**:
   - Name: `NEXT_PUBLIC_CONTACT_API_URL`
   - Value: the URL from Step 5, for example `https://bai-contact-api.vercel.app/api/contact`
3. This value is public. It is baked into the website's JavaScript, so do not store anything secret here.

The workflow file `.github/workflows/nextjs.yml` already passes this variable to the `next build` step.

## Step 7: Deploy the website

1. Commit and push the changes to `main`, which triggers the existing GitHub Pages workflow.
   Only do this after you have reviewed the changes and approved the commit.
2. Watch **Actions → Deploy Next.js site to Pages** until it is green.
3. Open the Pages URL and check that the form shows the visible inquiry fields and submits.

If the form says *"temporarily unavailable"*, the variable in Step 6 was missing when the site was built.
Set it, then re-run the workflow (**Actions → the run → Re-run all jobs**).

## Step 8: Test real email delivery

Do this only after Steps 2–7 are complete. A successful API response means **Resend accepted the message**. It does not prove inbox delivery, so check each item.

1. Open the live site, fill in the form with a real address you control as the visitor email, and click **Send Inquiry**.
2. The visitor should see *"Thank you for contacting Bharath Aadhya Intelligence. Your inquiry has been submitted successfully."* and a `BAI-…` reference ID.
3. **Resend dashboard → Emails** (<https://resend.com/emails>). Find the message and check its status: `Sent` → `Delivered`. `Bounced` or `Complained` means the recipient rejected it.
4. **Vercel → Logs** (project → Logs). Filter for `[contact]`. A success line reads `email accepted by provider ref=BAI-…`.
5. Check `bharathaadhyaintelligence@gmail.com`, including **Spam**. Subject: `New Project Inquiry | Bharath Aadhya Intelligence`.
6. In Gmail, click **Reply**. The reply must go to the visitor's address (Reply-To), not to the sender address.

Record the result in the checklist in section 11. Do not treat email as working until steps 3, 5, and 6 pass.

## Step 9 (optional): Local development

The site runs locally, but its form posts to the **deployed** API, so CORS applies to localhost too.

1. In the Vercel **Preview** environment only, add `ALLOWED_ORIGINS` = `http://localhost:3000` (or a comma-separated list that includes it) and redeploy the preview.
2. Locally, create `.env.local`:

   ```bash
   NEXT_PUBLIC_CONTACT_API_URL=https://<your-preview-deployment>.vercel.app/api/contact
   ```

3. Run the site: `npm install` then `npm run dev`, and open `http://localhost:3000/Bharath-Aadhya-Intellignce/#contact`.
4. Remove `localhost` from the Preview `ALLOWED_ORIGINS` when you are done.

Alternatively, run the API locally with the Vercel CLI: `npx vercel dev` (requires `vercel login`).

## 10. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| "We could not reach the server" | Browser blocked by CORS, or API down | `ALLOWED_ORIGINS` must exactly equal the site origin. Check Step 5, check 3. |
| "temporarily unavailable. Please email us" | `NEXT_PUBLIC_CONTACT_API_URL` was empty at build | Step 6, then re-run the workflow |
| "We could not send your inquiry right now" (HTTP 500) | Resend auth or sender problem | Vercel logs: `reason=auth` → check `RESEND_API_KEY`. `reason=sender` → domain not verified or `CONTACT_FROM_EMAIL` wrong. |
| "We are receiving a high volume…" (HTTP 503) | Resend rate or quota limit | Wait; check the Resend plan |
| HTTP 403 from the API | Origin not in `ALLOWED_ORIGINS` | Add the exact origin, then redeploy |
| HTTP 429 | More than 6 submissions from one IP in 10 minutes | Wait ~10 minutes |

## 11. Testing checklist

**Automated (run locally, all passing as of this change):**

- [x] `npm test`: 74 tests, including CORS allow/refuse, preflight, origin-matching edge cases, validation, escaping, honeypot, rate limit, and provider-error mapping
- [x] `npm run build` (static export) succeeds, and `out/` contains no `RESEND`, `ALLOWED_ORIGINS`, or `re_` key strings
- [x] Cross-origin browser test against a local API that allowed only the site origin: the preflight returned 204, the POST reached the API, and the failure message was shown
- [x] Cross-origin browser test against a local API that did not allow the site origin: the browser blocked the request and the form showed the network error

**Requires a live deployment (not yet verified):**

- [ ] Vercel deployment builds and serves `/api/contact` (Step 3)
- [ ] Step 5 curl checks return the expected status codes
- [ ] Real inquiry sends from the live GitHub Pages site (Step 8, item 1–2)
- [ ] Resend shows the message as `Delivered` (Step 8, item 3)
- [ ] Message arrives at `bharathaadhyaintelligence@gmail.com` (Step 8, item 5)
- [ ] Reply in Gmail goes to the visitor's address (Step 8, item 6)
- [ ] Double-click on **Send Inquiry** sends one email
- [ ] Form layout checked on phone (375px), tablet (768px), and desktop

## 12. Limitations

- **Email is the only record.** There is no inquiry dashboard and no retry queue. If Resend is down, the visitor must resend.
- **Rate limiting is per server instance.** Edge instances keep separate counters, so the real limit can be higher under load. For a strict limit, use a shared store such as Upstash Redis.
- **Spam protection is a honeypot plus rate limiting.** If spam grows, add Cloudflare Turnstile and verify its token in `handler.ts`.
- **CORS is not authentication.** Anyone can send a request with a forged `Origin` header. CORS protects visitors' browsers from other websites, and validation and rate limiting limit abuse.
- **Accepted by provider is not inbox delivery.** Confirm delivery using Step 8.
- **Duplicate prevention is client-side.** The button is disabled while a request is pending. A visitor who retries after a timeout may send a second email.

## 13. Rollback

- To take the form offline without redeploying the site, delete the `NEXT_PUBLIC_CONTACT_API_URL` variable and re-run the workflow. The form then shows the "temporarily unavailable" message.
- To stop email at the source, remove `RESEND_API_KEY` in Vercel and redeploy. The API then refuses sends with a generic error.
