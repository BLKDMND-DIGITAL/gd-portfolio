# Verification — recruiter landing page

Checked on this branch, 3 Oct 2026, against a local production build (`npm run build`, then `vite preview` on port 4173 and Python's static server on port 4174 for missing-file status). Nothing was deployed. `vercel --prod` was not run.

## Build

`npm run build` passed (`tsc --noEmit`, Vite build, then `scripts/prerender.mjs`).

- Initial JS: `dist/assets/index-Plv3ShWp.js`, 241,608 bytes raw, **74,939 bytes gzip** (limit 200 KB gzip).
- CSS: 12.16 KB raw / 3.26 KB gzip.
- Hero: `public/images/hero.avif` 35,778 bytes, `public/images/hero.webp` 77,150 bytes. Both are under 200 KB. Intrinsic size 800×1000, and the `<img>` sets `width` and `height`. Source is the previous i.imgur.com portrait, cropped to the upper body and re-encoded.
- Tailwind is compiled with Tailwind 3 and PostCSS. `index.html` has no `cdn.tailwindcss.com` script and no esm.sh import map.
- `@google/genai`, `jspdf`, and `html2canvas` are not dependencies. `vite.config.ts` has no `define` block.

## Claims audit (acceptance 1)

Searched `dist/**/*.html` and `dist/**/*.js` for:

`LangChain|LangGraph|Tech Systems Inc|team of 5|30%|Charlotte|production-grade|Cloud Practitioner|AWS Cloud Certification|Specialization|E2B|RAG pipelines|zero-fabrication|Stealth AI Startup|Fortune 500`

**Match count: 0.** Re-run after the Frisson link and the TEDx wording: still 0. That re-run also found 0 matches for `AIza[0-9A-Za-z_-]{35}`, phone numbers, `calendar.google.com`, `@gmail.com`, and `generativelanguage.googleapis.com`. A headless Chrome load of that build had 0 console errors and 0 failed requests. The Frisson control is a link reading "Frisson, BBC Reel (2023)" to the BBC Reel URL. There is no iframe and no video element.

`RAG` appears once, in Swords & Shields: "Not yet built: retrieval (RAG), hashing, and encryption."

The only `production` substring in the HTML is the required badge `INTERNAL · NON-PRODUCTION`. The only `deployed` substring is the headline word `forward-deployed`.

## Secrets, email, and PII

| Check | Count in `dist/` |
|---|---|
| `AIza[0-9A-Za-z_-]{35}` | 0 |
| phone-number pattern `(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s])\d{3}[-.\s]\d{4}` | 0 |
| `calendar.google.com` | 0 |
| `@gmail.com` | 0 |
| `generativelanguage.googleapis.com` | 0 |
| `cdn.tailwindcss.com` or `esm.sh` | 0 |
| `blkdmnd.digital` or `blkdmnd.vercel` | 0 |

The only email address in `dist/` HTML, JS, and CSS is `info@gregdukesai.com`. A search of the source tree (excluding `node_modules`, `dist`, and `package-lock.json`) for `@gmail.com` returned 0. No `.env` or `.env.*` file is in the tree. `.gitignore` lists `.env` and `.env.*`.

## Page load

Headless Chrome, 390×844, `http://127.0.0.1:4173/`, `networkidle0`:

- Console errors: **0**
- Page errors: **0**
- Failed requests and HTTP 4xx/5xx responses: **0**
- `documentElement.scrollWidth` 390, `clientWidth` 390, no horizontal overflow
- Visible links and the menu summary are at least 44px tall. The only smaller node is the visually hidden "Skip to content" link (1×1 until focused).

`curl` of the raw HTML (no JS) contains the title, meta description (126 characters), `og:title`, `og:description`, `og:image`, `og:url`, `og:type=website`, `twitter:card=summary_large_image`, and Person JSON-LD with LinkedIn, IMDb, and GitHub in `sameAs`.

Static server (`python3 -m http.server` in `dist/`, which does not SPA-fallback):

| Path | Status |
|---|---|
| `/` | 200 |
| `/favicon.ico` | 200 (`image/vnd.microsoft.icon`) |
| `/favicon.svg` | 200 |
| `/apple-touch-icon.png` | 200 |
| `/robots.txt` | 200 |
| `/sitemap.xml` | 200 |
| `/og.png` | 200, 1200×630 PNG |
| `/images/hero.avif` | 200 |
| `/images/hero.webp` | 200 |
| `/index.css` | 404 (not linked, and not requested on load) |
| `/Greg_Dukes_Resume.pdf` | 404 |

The resume button is omitted because `RESUME_AVAILABLE` is false. No PDF was generated.

## Lighthouse mobile

Lighthouse  (mobile, simulated, headless Chrome) against `http://127.0.0.1:4173/`:

| Category | Score | Target |
|---|---|---|
| Performance | 97 | ≥ 90 |
| Accessibility | 100 | ≥ 95 |
| Best Practices | 100 | ≥ 95 |
| SEO | 100 | ≥ 95 |

- LCP 2.2 s (numeric 2180.7 ms). Target < 2.5 s.
- CLS 0 (numeric 0.000253). Target < 0.1.
- Total blocking time 0 ms.

Local preview does not apply `vercel.json` headers. Those headers are in the repo for Vercel: Content-Security-Policy (no third-party script hosts), Referrer-Policy `strict-origin-when-cross-origin`, and `X-Content-Type-Options: nosniff`.

## External links

| URL | Result from this environment |
|---|---|
| https://tryalchemyapp.com | 200 |
| https://empathmath.org | 200 |
| https://gregdukesai.com/book/ | 200 |
| https://github.com/BLKDMND-DIGITAL | 200 |
| https://coursera.org/verify/XZNUFDZF8WXA | 200 (redirects to the www accomplishments page) |
| https://coursera.org/verify/QE5FYC6MCFVP | 200 |
| https://coursera.org/verify/AKRTPKDZGX9M | 200 |
| https://coursera.org/verify/6N24UPMPFPRH | 200 |
| https://coursera.org/verify/V852H3T23GHY | 200. The HTML body did not include a completion sentence or the name Gregory Dukes. Same gap as the 2 Oct certificate note. |
| https://www.imdb.com/name/nm15135596/ | Chrome document status **202**. The loaded title was "Greg Dukes - IMDb". |
| https://www.linkedin.com/in/greg-dukes-genai/ | Chrome status **999**, then an authwall. The redirect target is that profile URL. |

No link points at `blkdmnd.digital` or `blkdmnd.vercel.app`. Frisson links to https://www.bbc.com/reel/video/p0dgrs1l/watch, which returned 200 on Oct 4, 2026. The page does not embed that video and does not use a BBC still.

## Acceptance criteria

1. **Pass.** Claims regex match count is 0. The single `RAG` is the Swords & Shields "not yet built" line.
2. **Pass.** Swords & Shields badge is PROTOTYPE. BLKDMND OS badge is INTERNAL · NON-PRODUCTION. Neither card says the work is in production or deployed. The badge itself contains the word PRODUCTION as part of NON-PRODUCTION.
3. **Pass.** No API-key pattern, no phone number, no Google Calendar embed, no `.env` file. Resume PDF is absent on purpose.
4. **Pending Greg's resume file.** Load has 0 console errors and 0 failed requests. Favicon, robots, sitemap, and og.png return 200. `/index.css` is not requested. `/Greg_Dukes_Resume.pdf` returns 404 until Greg supplies the file. The download button stays hidden.
5. **Pass (Option A).** The client bundle has no `generativelanguage.googleapis.com` call. The Alchemy and EmpathMath images were Cloudflare "Performing security verification" pages, so the files and the captions that called them landing-page screenshots were removed. `ALCHEMY_DEMO_IMG` and `EMPATHMATH_DEMO_IMG` are empty, and those cards render no demo image. Both stay LIVE and keep their links.
6. **Pass, with the Georgia Tech caveat still open.** Footer renders `© 2026 Greg Dukes · Founder, BLKDMND` (year from `new Date().getFullYear()`). Location is Miami, FL. LinkedIn href is `https://www.linkedin.com/in/greg-dukes-genai/`. The AWS sentence matches Greg's wording. Credentials match profile overhaul §8, including Georgia Tech because its verify code is in the 2 Oct certificate file. Georgia Tech's verify page did not show completion text in the HTML. `SHOW_TEDX` stays true. Greg confirmed the TEDxNaples announcement. The talk is framed as a filmmaker and storyteller's talk on frisson, in the musician and filmmaker lane. No Frisson role credit is stated.
7. **Pass for the raw HTML.** Title, description, Open Graph, Twitter card, and Person JSON-LD are in the response with JS disabled. LinkedIn Post Inspector was not run: this branch was not deployed.
8. **Pass.** Lighthouse mobile scores and LCP/CLS meet the targets. Tailwind CDN and the import map are gone. Hero images are under 200 KB.
9. **Fail on a strict "every link returned 200" reading.** On the Oct 4 recheck, the BBC Reel URL, Alchemy, EmpathMath, the booking page, GitHub, and all five Coursera verify URLs returned 200. IMDb returned 202. LinkedIn returned 999. Nothing points at blkdmnd.digital or blkdmnd.vercel.app.
10. **Pass.** 390px width, no horizontal scroll. Visible controls are at least 44px. Lighthouse accessibility was 100.
11. **Pass.** Static Vite build for Vercel Hobby. No new paid service, no analytics product, no checkout on this site.
12. **Fail for the pull request; preview exists but is locked.** `COPY_CHANGES.md` is on the branch. Production was not deployed. Opening the draft pull request failed: GitHub returned `must be a collaborator`. Vercel did build a preview. See below.

## Preview

Vercel reported a successful preview. The branch alias named in the Vercel Preview Comments check is:

https://gd-portfolio-wy18-git-cursor-4342b3-blkdmnds-projects-c3c9a4c0.vercel.app

Each push also gets its own deployment URL. For commit `4beaf08` that URL was https://gd-portfolio-wy18-6kuy313q1-blkdmnds-projects-c3c9a4c0.vercel.app. The dashboard link on the commit status is https://vercel.com/blkdmnds-projects-c3c9a4c0/gd-portfolio-wy18/9tkpKvAPVZFZSYX4c5PqckytyhhU.

An unauthenticated request to these app URLs returns **302** to Vercel SSO (`vercel.com/sso-api`), then a Vercel login page. Deployment Protection is on, so this environment could not read the portfolio HTML from the preview. The GitHub status text is "Deployment has completed" / success. Local `vite preview` is what was actually loaded and checked.

## Still needed from Greg

- The resume PDF, saved as `Greg_Dukes_Resume.pdf`, with no Cloud Practitioner or LangChain claims. Then set `RESUME_AVAILABLE` to true.
- His role credit on Frisson. The BBC Reel link is in place. No credit is stated yet.
- A reel or demo clips he owns (Alchemy, EmpathMath). Set `REEL_URL` when that file or unlisted video exists. A YouTube or Vimeo embed also needs a `frame-src` addition in `vercel.json`. Real card images go in `ALCHEMY_DEMO_IMG` and `EMPATHMATH_DEMO_IMG`. Both are empty, so the slots stay hidden.
- Whether to keep Introduction to User Experience Design. The verify code `V852H3T23GHY` is in the certificate file, and the URL returns 200, but the page HTML still has no completion sentence.
- Which Vercel project deploys `gd-portfolio-wy18` (not changed here).
