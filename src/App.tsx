import type { ReactNode } from "react";
import {
  AWS_NOTE,
  BOOKING,
  CASES,
  CREDENTIALS,
  GEAR,
  HERO_HEADLINE,
  LOCATION,
  OPEN_TO,
  POSITIONING,
  PROCESS,
  SPEAKING,
  TOOLS,
  type CaseStatus,
  type CaseStudy,
} from "./content";
import {
  BBC_REEL_URL,
  BOOK_URL,
  CONTACT_EMAIL,
  GITHUB_URL,
  IMDB_URL,
  LINKEDIN_URL,
  REEL_URL,
  RESUME_AVAILABLE,
  RESUME_PATH,
  SHOW_TEDX,
} from "./config";

const badgeClass: Record<CaseStatus, string> = {
  LIVE: "border-emerald-300/40 bg-emerald-400/10 text-emerald-200",
  PROTOTYPE: "border-accent/50 bg-accent/10 text-accent",
  "INTERNAL · NON-PRODUCTION": "border-white/30 bg-white/5 text-white/85",
};

const btn =
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold";

const btnPrimary = `${btn} bg-accent text-black hover:bg-[#f3b15a]`;

const btnGhost = `${btn} border border-white/20 text-white hover:border-accent hover:text-accent`;

function Badge({ status }: { status: CaseStatus }) {
  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full border px-3 text-xs font-semibold tracking-wide ${badgeClass[status]}`}
    >
      {status}
    </span>
  );
}

function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function DemoSlot({ shot }: { shot: NonNullable<CaseStudy["shot"]> }) {
  return (
    <figure className="mt-6 overflow-hidden rounded-2xl border border-dashed border-accent/50 bg-black/40">
      <figcaption className="border-b border-white/10 px-4 py-3 text-sm text-white/80">
        <span className="font-semibold text-accent">Demo slot.</span> Screenshot
        of the public landing page. A short demo video can replace this later.
        This is not model output.
      </figcaption>
      <img
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        loading="lazy"
        decoding="async"
        className="h-auto w-full"
      />
    </figure>
  );
}

function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <article
      id={item.id}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
        <Badge status={item.status} />
      </div>
      <dl className="mt-6 space-y-5 text-base leading-relaxed text-white/85">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Problem
          </dt>
          <dd className="mt-1">{item.problem}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            What I built
          </dt>
          <dd className="mt-1">{item.built}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Stack
          </dt>
          <dd className="mt-1">{item.stack}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            What I learned
          </dt>
          <dd className="mt-1">{item.learned}</dd>
        </div>
        {item.notYetBuilt ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Status
            </dt>
            <dd className="mt-1">{item.notYetBuilt}</dd>
          </div>
        ) : null}
      </dl>
      {item.href && item.linkLabel ? (
        <ExternalLink href={item.href} className={`${btnGhost} mt-6`}>
          {item.linkLabel}
        </ExternalLink>
      ) : (
        <p className="mt-6 text-sm text-white/70">No public link.</p>
      )}
      {item.shot ? <DemoSlot shot={item.shot} /> : null}
    </article>
  );
}

function NavLinks() {
  const items = [
    ["#work", "Work"],
    ["#media", "Media"],
    ...(SHOW_TEDX ? [["#speaking", "Speaking"]] : []),
    ["#process", "How I work"],
    ["#credentials", "Credentials"],
    ["#contact", "Contact"],
  ];

  return (
    <>
      {items.map(([href, label]) => (
        <a
          key={href}
          href={href}
          className="inline-flex min-h-11 items-center text-sm text-white/80 hover:text-white"
        >
          {label}
        </a>
      ))}
    </>
  );
}

export default function App() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-dark text-white">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-3 focus:text-black"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-dark/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
          <a href="#content" className="inline-flex min-h-11 items-center font-semibold">
            Greg Dukes
          </a>
          <nav className="hidden items-center gap-4 lg:flex" aria-label="Primary">
            <NavLinks />
          </nav>
          <details className="relative lg:hidden">
            <summary className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 px-4 text-sm">
              Menu
            </summary>
            <nav
              className="absolute right-0 mt-2 flex w-52 flex-col rounded-2xl border border-white/10 bg-dark p-3 shadow-xl"
              aria-label="Mobile"
            >
              <NavLinks />
            </nav>
          </details>
        </div>
      </header>

      <main id="content">
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] md:py-20">
          <div>
            <p className="text-sm font-medium text-accent">{LOCATION}</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">
              Greg Dukes
            </h1>
            <p className="mt-4 max-w-xl text-xl leading-snug text-white/90">
              {HERO_HEADLINE}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
              {POSITIONING}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {RESUME_AVAILABLE ? (
                <a className={btnPrimary} href={RESUME_PATH}>
                  Download resume (PDF)
                </a>
              ) : null}
              <a className={btnPrimary} href={`mailto:${CONTACT_EMAIL}`}>
                Email me
              </a>
              <ExternalLink href={LINKEDIN_URL} className={btnGhost}>
                LinkedIn
              </ExternalLink>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70">
              {OPEN_TO}
            </p>
          </div>
          <picture className="mx-auto w-full max-w-sm">
            <source srcSet="/images/hero.avif" type="image/avif" />
            <img
              src="/images/hero.webp"
              alt="Greg Dukes"
              width={800}
              height={1000}
              fetchPriority="high"
              decoding="async"
              className="h-auto w-full rounded-3xl border border-white/10"
            />
          </picture>
        </section>

        <section id="work" className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="work-title">
          <h2 id="work-title" className="text-3xl font-semibold tracking-tight">
            Case studies
          </h2>
          <p className="mt-3 max-w-2xl text-white/75">
            Four builds, each with a status. Alchemy and EmpathMath are live.
            Swords & Shields is a prototype. BLKDMND OS stays internal.
          </p>
          <div className="mt-8 grid gap-6">
            {CASES.map((item) => (
              <CaseCard key={item.id} item={item} />
            ))}
            <CaseCard item={BOOKING} />
          </div>
        </section>

        <section id="media" className="border-t border-white/10" aria-labelledby="media-title">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 id="media-title" className="text-3xl font-semibold tracking-tight">
              Media
            </h2>
            {REEL_URL ? (
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <video
                  controls
                  preload="none"
                  className="h-auto w-full"
                  src={REEL_URL}
                >
                  Reel
                </video>
              </div>
            ) : null}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="rounded-3xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold">Frisson, BBC Reel (2023)</h3>
                {BBC_REEL_URL ? (
                  <ExternalLink href={BBC_REEL_URL} className={`${btnGhost} mt-4`}>
                    BBC Reel
                  </ExternalLink>
                ) : (
                  <p className="mt-4 rounded-2xl border border-dashed border-white/20 px-4 py-3 text-sm text-white/70">
                    BBC Reel link slot. The page URL is not set yet.
                  </p>
                )}
              </article>
              <article className="rounded-3xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold">IMDb</h3>
                <ExternalLink href={IMDB_URL} className={`${btnGhost} mt-4`}>
                  imdb.com/name/nm15135596
                </ExternalLink>
              </article>
            </div>
            <p className="mt-6 text-white/80">
              <span className="font-semibold text-white">Gear. </span>
              {GEAR}
            </p>
            <article className="mt-6 rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold">Code-driven video</h3>
              <p className="mt-3 text-white/80">
                The BLKDMND Cinema ident is rendered in 16:9, 9:16, and 1:1 from
                one Node script using sharp and ffmpeg. The clip is not embedded
                on this page.
              </p>
            </article>
          </div>
        </section>

        {SHOW_TEDX ? (
          <section id="speaking" className="border-t border-white/10" aria-labelledby="speaking-title">
            <div className="mx-auto max-w-6xl px-4 py-12">
              <h2 id="speaking-title" className="text-3xl font-semibold tracking-tight">
                Speaking
              </h2>
              <p className="mt-4 text-xl font-medium">
                {SPEAKING.title}, {SPEAKING.when}
              </p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/80">
                {SPEAKING.body}
              </p>
              <p className="mt-6 rounded-2xl border border-dashed border-white/20 px-4 py-4 text-sm text-white/70">
                Talk video placeholder. Nothing is embedded until the talk exists.
              </p>
            </div>
          </section>
        ) : null}

        <section id="process" className="border-t border-white/10" aria-labelledby="process-title">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 id="process-title" className="text-3xl font-semibold tracking-tight">
              How I work
            </h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2">
              {PROCESS.map((step, index) => (
                <li key={step.title} className="rounded-3xl border border-white/10 p-6">
                  <p className="text-sm font-semibold text-accent">0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-white/80">{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-white/80">
              <span className="font-semibold text-white">Daily tools. </span>
              {TOOLS.join(", ")}.
            </p>
            <p className="mt-4 max-w-3xl text-white/80">{AWS_NOTE}</p>
          </div>
        </section>

        <section id="credentials" className="border-t border-white/10" aria-labelledby="credentials-title">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 id="credentials-title" className="text-3xl font-semibold tracking-tight">
              Credentials
            </h2>
            <p className="mt-3 max-w-2xl text-white/75">
              Coursera course certificates. Each name links to its verify page.
            </p>
            <ul className="mt-8 grid gap-4">
              {CREDENTIALS.map((item) => (
                <li key={item.code}>
                  <ExternalLink
                    href={item.href}
                    className="block rounded-3xl border border-white/10 p-5 hover:border-accent/60"
                  >
                    <span className="block text-lg font-semibold">{item.name}</span>
                    <span className="mt-1 block text-sm text-white/75">
                      {item.issuer} · {item.issued} · {item.note}
                    </span>
                    <span className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-accent">
                      coursera.org/verify/{item.code}
                    </span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="border-t border-white/10" aria-labelledby="contact-title">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 id="contact-title" className="text-3xl font-semibold tracking-tight">
              Contact
            </h2>
            <p className="mt-3 text-white/75">{LOCATION}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a className={btnPrimary} href={`mailto:${CONTACT_EMAIL}`}>
                Email me
              </a>
              <ExternalLink href={LINKEDIN_URL} className={btnGhost}>
                LinkedIn
              </ExternalLink>
              <ExternalLink href={GITHUB_URL} className={btnGhost}>
                GitHub
              </ExternalLink>
              <ExternalLink href={BOOK_URL} className={btnGhost}>
                Book a call
              </ExternalLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-8 text-sm text-white/70">
          © {year} Greg Dukes · Founder, BLKDMND
        </p>
      </footer>
    </div>
  );
}
