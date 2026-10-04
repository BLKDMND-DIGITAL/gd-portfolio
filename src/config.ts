/**
 * Site configuration. CONTACT_EMAIL is the only email address in this project.
 * Greg confirmed on Oct 4, 2026 that TEDx allows the announcement. SHOW_TEDX stays on.
 */

export const CONTACT_EMAIL = "info@gregdukesai.com";

/** Set true only after public/Greg_Dukes_Resume.pdf is the approved file. */
export const RESUME_AVAILABLE = false;

export const RESUME_PATH = "/Greg_Dukes_Resume.pdf";

/** TEDxNaples, March 16, 2027. Greg confirmed the announcement is allowed. */
export const SHOW_TEDX = true;

/**
 * Unlisted YouTube, Vimeo, or a self-hosted MP4.
 * Empty hides the reel. A YouTube or Vimeo embed also needs a CSP frame-src update.
 */
export const REEL_URL = "";

/** Frisson on BBC Reel. Link only. Do not embed the video or use a BBC still. */
export const BBC_REEL_URL = "https://www.bbc.com/reel/video/p0dgrs1l/watch";

/** 1280×720 stills and videos in public/media. Empty video and image paths hide a card's media. */
export const DEMO_WIDTH = 1280;
export const DEMO_HEIGHT = 720;

export const ALCHEMY_DEMO_VIDEO = "/media/alchemy_public_tour.mp4";
export const ALCHEMY_DEMO_POSTER = "/media/alchemy_public_tour_poster.webp";
/** First Alchemy still. Empty, together with an empty video path, hides the slot. */
export const ALCHEMY_DEMO_IMG = "/media/alchemy_01_hero.webp";

export const EMPATHMATH_DEMO_VIDEO = "/media/empathmath_demo.mp4";
export const EMPATHMATH_DEMO_POSTER = "/media/empathmath_demo_poster.webp";
/** First EmpathMath still. Empty, together with an empty video path, hides the slot. */
export const EMPATHMATH_DEMO_IMG = "/media/empathmath_01_input.webp";

export type DemoStill = {
  src: string;
  alt: string;
  caption: string;
};

export type DemoMedia = {
  video: string;
  poster: string;
  /** Short visible label in front of the caption. */
  kicker: string;
  caption: string;
  /** Accessible name for the video element. */
  videoLabel: string;
  stills: DemoStill[];
};

export const ALCHEMY_MEDIA: DemoMedia = {
  video: ALCHEMY_DEMO_VIDEO,
  poster: ALCHEMY_DEMO_POSTER,
  kicker: "Site tour · public pages only.",
  caption:
    "A quick tour of tryalchemyapp.com: hero, flow, and the in-page app-screen showcase.",
  videoLabel:
    'Scrolling tour of the Alchemy landing page: the "Never wonder what to say" hero, $20/month Founder Access pricing, the "Work once, go live prepared" section, and the site\'s built-in showcase of app screens.',
  stills: [
    {
      src: ALCHEMY_DEMO_IMG,
      alt: 'Alchemy landing hero "Never wonder what to say." next to app mockups on a laptop, phone and tablet.',
      caption: "Alchemy's hero: one promise, shown across three screens.",
    },
    {
      src: "/media/alchemy_02_flow.webp",
      alt: 'Alchemy "Work once, go live prepared." section with a card comparing a raw task, "Teaching a live sourdough crust workshop", against the Alchemy Blueprint tab.',
      caption: "From raw task to live-ready plan.",
    },
    {
      src: "/media/alchemy_03_pricing.webp",
      alt: 'Alchemy Founder Access CTA, "Get Founder Access — $20/mo", with the line "Founder monthly price is $20 during early access", above cards for Mobile, Tablet and Desktop.',
      caption:
        "Simple founder pricing, and one flow across mobile, tablet and desktop.",
    },
  ],
};

export const EMPATHMATH_MEDIA: DemoMedia = {
  video: EMPATHMATH_DEMO_VIDEO,
  poster: EMPATHMATH_DEMO_POSTER,
  kicker: "",
  caption:
    "EmpathMath turns one tense message into a pattern breakdown with evidence quotes, signal bands and calm replies. (Sample message; analysis sped up 4×.)",
  videoLabel:
    "Screen recording of EmpathMath. A sample message is pasted into the New Analysis form, the analysis runs (sped up 4×), and the Pattern Decode results scroll by: detected patterns with evidence quotes, a signal map, an emotional transcript and suggested calm replies.",
  stills: [
    {
      src: EMPATHMATH_DEMO_IMG,
      alt: 'EmpathMath New Analysis form with the sample message "I can\'t believe you forgot again. You never think about anyone but yourself…" in the Message to Decode box.',
      caption: "Step 1: paste the message. Context and tone settings are optional.",
    },
    {
      src: "/media/empathmath_02_signal_map.webp",
      alt: "EmpathMath signal map radar chart with four signal bands: Manipulation Elevated, Confusion Possible, Escalation High, Boundary Possible.",
      caption: "Signals, not diagnoses: four communication signal bands at a glance.",
    },
    {
      src: "/media/empathmath_03_evidence.webp",
      alt: "EmpathMath pattern cards for Global Labeling and Punitive Withdrawal. Each Evidence Lens quotes a line from the message and explains why it matters.",
      caption: "Every pattern comes with the exact line that triggered it.",
    },
  ],
};

export const SITE_URL = "https://gd-portfolio-wy18.vercel.app";

export const LINKEDIN_URL = "https://www.linkedin.com/in/greg-dukes-genai/";

export const GITHUB_URL = "https://github.com/BLKDMND-DIGITAL";

export const IMDB_URL = "https://www.imdb.com/name/nm15135596/";

export const BOOK_URL = "https://gregdukesai.com/book/";
