# Verification — recruiter landing page

Checked on this branch, 4 Oct 2026, against a local production build (`npm run build`, then `vite preview` on port 4173). Nothing was deployed. `vercel --prod` was not run.

## Build

`npm run build` passed (`tsc --noEmit`, Vite build, then `scripts/prerender.mjs`).

- Initial JS: `dist/assets/index-CXM83ho1.js`, 244,529 bytes raw, **76,148 bytes gzip** (limit 200 KB gzip).
- CSS: 12,490 bytes raw / 3,318 bytes gzip.
- Hero: `public/images/hero.avif` 35,778 bytes, `public/images/hero.webp` 77,150 bytes. Both are under 200 KB. Intrinsic size 800×1000, and the `<img>` sets `width` and `height`. Source is the previous i.imgur.com portrait, cropped to the upper body and re-encoded.
- Tailwind is compiled with Tailwind 3 and PostCSS. `index.html` has no `cdn.tailwindcss.com` script and no esm.sh import map.
- `@google/genai`, `jspdf`, and `html2canvas` are not dependencies. `vite.config.ts` has no `define` block.

## Claims audit (acceptance 1)

Searched `dist/**/*.html` and `dist/**/*.js` for:

`LangChain|LangGraph|Tech Systems Inc|team of 5|30%|Charlotte|production-grade|Cloud Practitioner|AWS Cloud Certification|Specialization|E2B|RAG pipelines|zero-fabrication|Stealth AI Startup|Fortune 500`

**Match count: 0.** Re-run after swapping in the annotated stills: still 0. That re-run also found 0 matches for `AIza[0-9A-Za-z_-]{35}`, phone numbers, `calendar.google.com`, `@gmail.com`, and `generativelanguage.googleapis.com`. The built HTML and JS contain no Georgia Tech credential and no "Architect". A headless Chrome load had 0 console errors and 0 failed requests. The document title is "Greg Dukes — Founder & AI Engineer, BLKDMND". The footer is "© 2026 Greg Dukes · Founder, BLKDMND".

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

## Demo media

`public/media/` holds the two studio MP4s, copied as-is:

| File | Duration | Size |
|---|---|---|
| `empathmath_demo.mp4` | 28.8 s | 3.18 MB |
| `alchemy_public_tour.mp4` | 22.7 s | 2.24 MB |

Both are H.264, 1280×720, no audio track. The eight posters and screenshots are STUDIO's annotated WebPs, with the gold callout labels. They replaced the frames extracted from the MP4s. Filenames match the README (`empathmath_demo_poster.webp`, `empathmath_01_input.webp`, `empathmath_02_signal_map.webp`, `empathmath_03_evidence.webp`, `alchemy_public_tour_poster.webp`, `alchemy_01_hero.webp`, `alchemy_02_flow.webp`, `alchemy_03_pricing.webp`). Each is 1280×720. Alt text and captions use the README wording. The Alchemy figure is labeled "Site tour · public pages only."

Each `<video>` has `controls`, `muted`, `playsinline` (React `playsInline`; the DOM property `playsInline` is true), `preload="none"`, a poster, and `width="1280"` `height="720"`. The six screenshots use `loading="lazy"` `decoding="async"` with the same width and height.

On a 390×844 headless load, the only `/media/` responses before interaction were the two posters (200). Neither MP4 was requested. After scrolling, the six stills returned 200. Playing the Alchemy video then requested `alchemy_public_tour.mp4` (206). `vercel.json` already sets `media-src 'self'`, so same-origin playback needs no CSP change.

## Lighthouse mobile

Lighthouse (mobile, simulated, headless Chrome) against `http://127.0.0.1:4173/`, three runs:

Re-run after swapping in STUDIO's annotated WebPs:

| Category | Run 1 | Run 2 | Run 3 | Target |
|---|---|---|---|---|
| Performance | 92 | 92 | 92 | ≥ 90 |
| Accessibility | 100 | 100 | 100 | ≥ 95 |
| Best Practices | 100 | 100 | 100 | ≥ 95 |
| SEO | 100 | 100 | 100 | ≥ 95 |

- LCP simulated: 3.1 s on all three runs (3082 ms, 3080 ms, 3081 ms). CLS 0.000253. Total blocking time 0 ms.
- Performance stayed at 92. The LCP element was the hero portrait, not a video or poster.

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
| https://coursera.org/verify/6N24UPMPFPRH | 200 | |
| https://www.imdb.com/name/nm15135596/ | Chrome document status **202**. The loaded title was "Greg Dukes - IMDb". |
| https://www.linkedin.com/in/greg-dukes-genai/ | Chrome status **999**, then an authwall. The redirect target is that profile URL. |

No link points at `blkdmnd.digital` or `blkdmnd.vercel.app`. Frisson links to https://www.bbc.com/reel/video/p0dgrs1l/watch, which returned 200 on Oct 4, 2026. The page does not embed that video and does not use a BBC still.

## Acceptance criteria

1. **Pass.** Claims regex match count is 0. The single `RAG` is the Swords & Shields "not yet built" line.
2. **Pass.** Swords & Shields badge is PROTOTYPE. BLKDMND OS badge is INTERNAL · NON-PRODUCTION. Neither card says the work is in production or deployed. The badge itself contains the word PRODUCTION as part of NON-PRODUCTION.
3. **Pass.** No API-key pattern, no phone number, no Google Calendar embed, no `.env` file. Resume PDF is absent on purpose.
4. **Pending Greg's resume file.** Load has 0 console errors and 0 failed requests. Favicon, robots, sitemap, and og.png return 200. `/index.css` is not requested. `/Greg_Dukes_Resume.pdf` returns 404 until Greg supplies the file. The download button stays hidden.
5. **Pass.** The client bundle has no `generativelanguage.googleapis.com` call. Alchemy and EmpathMath use the studio MP4s and stills described above. Alchemy is labeled a site tour of public pages only. Both cards stay LIVE and keep their links. Videos use `preload="none"` and were not requested until playback.
6. **Pass.** Footer renders `© 2026 Greg Dukes · Founder, BLKDMND` (year from `new Date().getFullYear()`). The role title elsewhere is `Founder & AI Engineer, BLKDMND`. Location is Miami, FL. LinkedIn href is `https://www.linkedin.com/in/greg-dukes-genai/`. The AWS sentence matches Greg's wording. Credentials are the four Coursera course certificates Greg kept. Introduction to User Experience Design is not on the page. `SHOW_TEDX` stays true. Greg confirmed the TEDxNaples announcement. The talk is framed as a filmmaker and storyteller's talk on frisson, in the musician and filmmaker lane. The Frisson item states his confirmed credit: producer and presenter; also researched, booked the interviews, and edited.
7. **Pass for the raw HTML.** Title, description, Open Graph, Twitter card, and Person JSON-LD are in the response with JS disabled. LinkedIn Post Inspector was not run: this branch was not deployed.
8. **Pass on the score targets.** After the annotated stills, three mobile runs each scored Performance 92, Accessibility 100, Best Practices 100, and SEO 100. CLS was 0.000253. Simulated LCP was 3.1 s on each run, above 2.5 s. Tailwind CDN and the import map are gone. Hero images are under 200 KB.
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
- A personal reel. Set `REEL_URL` when that file or unlisted video exists. A YouTube or Vimeo embed also needs a `frame-src` addition in `vercel.json`. The Alchemy and EmpathMath clips are already wired.
- Which Vercel project deploys `gd-portfolio-wy18` (not changed here).
