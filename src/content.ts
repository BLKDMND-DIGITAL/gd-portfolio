export type CaseStatus = "LIVE" | "PROTOTYPE" | "INTERNAL · NON-PRODUCTION";

export interface DemoShot {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  status: CaseStatus;
  problem: string;
  built: string;
  stack: string;
  learned: string;
  href?: string;
  linkLabel?: string;
  notYetBuilt?: string;
  shot?: DemoShot;
  compact?: boolean;
}

export const HERO_HEADLINE =
  "AI engineer and forward-deployed builder. Documentary filmmaker since 2015.";

export const POSITIONING =
  "I'm a documentary filmmaker and the founder of BLKDMND, and I build and ship AI products under my own name.";

export const OPEN_TO =
  "Open to remote/hybrid: AI Eng · FDE · Solutions · AI Workflow · Media Tech";

export const LOCATION = "Miami, FL (open to remote/hybrid)";

export const CASES: CaseStudy[] = [
  {
    id: "alchemy",
    title: "Alchemy",
    status: "LIVE",
    problem:
      "Planning a livestream takes real work: a title, description, tags, a checklist, and a run of show with timed segments and talking points. The product also had to keep working if one model provider had a bad afternoon.",
    built:
      "Alchemy is a live, paid web app. You describe your stream and your products, and it returns a full livestream blueprint. I also built a native SwiftUI client against the same backend. It is not in the App Store yet.",
    stack:
      "Gemini 2.5 Flash sits behind a Cloudflare Worker, with an OpenAI gpt-4o-mini fallback. Both fill one JSON schema, and the output is normalized. API keys stay in server environment variables. Access is a Stripe subscription plus a signed cookie.",
    learned:
      "The schema is the contract. Once both providers have to fill the same shape, swapping a model becomes a config change instead of a rewrite.",
    href: "https://tryalchemyapp.com",
    linkLabel: "tryalchemyapp.com",
  },
  {
    id: "empathmath",
    title: "EmpathMath",
    status: "LIVE",
    problem:
      "When a message makes your stomach drop, it is hard to read it clearly. You react to the tone and miss what is actually being said.",
    built:
      "EmpathMath is live. It helps people decode high-conflict messages and draft calm, boundaried replies. You can paste text or upload a screenshot.",
    stack:
      "A Cloudflare Worker sends the text to Gemini on the server. The model has to answer in a strict schema: a summary, each detected tactic with a confidence score and the exact quote, tone, a line-by-line breakdown, risk scores, a recommended action, reply options, and citations. Screenshots go through an OCR route.",
    learned:
      "Making the model quote its evidence changes the output. A label, plus the line it came from, plus a confidence score, is something a person can check.",
    href: "https://empathmath.org",
    linkLabel: "empathmath.org",
  },
  {
    id: "swords",
    title: "Swords & Shields",
    status: "PROTOTYPE",
    problem:
      "Turning a pile of evidence, such as photos, messages, and documents, into an organized court-ready package is slow, careful work. I wanted to see how much of that a model could take on.",
    built:
      "A working prototype with four stages: Forge (ingest), Vault (multimodal analysis), Shield (a statutory check grounded with search), and Sword (Bates numbering and exhibit export). This is not legal advice.",
    stack:
      "React and TypeScript on the front end. Five Gemini calls, each locked to a response schema. The compliance step uses search grounding so it points at sources.",
    learned:
      "In high-stakes work, the model call is the easy part. The hard part is provenance: where each claim came from, and proof that nothing changed.",
    notYetBuilt: "Not yet built: retrieval (RAG), hashing, and encryption.",
  },
  {
    id: "os",
    title: "BLKDMND OS",
    status: "INTERNAL · NON-PRODUCTION",
    problem:
      "I needed a control plane for my own AI agents, so an external action could not run until I approved that exact action.",
    built:
      "An internal governance control plane. Owner approval gates are bound to the exact action before anything external happens. An append-only audit log records events. It runs locally.",
    stack:
      "PostgreSQL, Fastify, TypeScript, and Zod. 81 automated test cases. No LLM calls. Scoring is rule-based.",
    learned:
      "The useful part is the gate: the approval matches one exact action, and the audit log only appends.",
  },
];

export const BOOKING: CaseStudy = {
  id: "booking",
  title: "gregdukesai.com",
  status: "LIVE",
  compact: true,
  problem:
    "A generic calendar link books the meeting and tells me nothing about the problem. The first call becomes discovery about the discovery.",
  built:
    "My tech and media consulting site, with a free 30-minute workflow call. The form asks for a name, a business, and which workflow you want help with. You request a time, and it stays pending until I confirm it.",
  stack:
    "A custom booking flow on Cloudflare Pages Functions and D1. Open times come from the database, in Eastern time. Stripe payments and email notifications. No calendar embed.",
  learned:
    "One extra question, which workflow, changes the first meeting. Request-then-confirm keeps a solo calendar sane.",
  href: "https://gregdukesai.com/book/",
  linkLabel: "gregdukesai.com/book/",
};

export const PROCESS = [
  {
    title: "Discovery",
    body: "Sit with the person who has the problem. The story on day one is rarely the real one.",
  },
  {
    title: "Prototype",
    body: "Build a small version that works.",
  },
  {
    title: "Edit",
    body: "Cut everything that does not serve the goal.",
  },
  {
    title: "Ship",
    body: "Ship it, then keep improving it.",
  },
] as const;

export const TOOLS = [
  "Claude Code",
  "Cursor",
  "ChatGPT",
  "GitHub Copilot",
  "Copilot Studio",
  "M365 Copilot",
] as const;

export const AWS_NOTE =
  "I first set up this portfolio on AWS (S3, CloudFront, Route 53), then moved it to Vercel to host it for free.";

export interface Credential {
  name: string;
  issuer: string;
  issued: string;
  code: string;
  href: string;
  note: string;
}

export const CREDENTIALS: Credential[] = [
  {
    name: "Introduction to Large Language Models",
    issuer: "Google Cloud (via Coursera)",
    issued: "Jun 2024",
    code: "XZNUFDZF8WXA",
    href: "https://coursera.org/verify/XZNUFDZF8WXA",
    note: "Coursera course certificate",
  },
  {
    name: "Introduction to Generative AI",
    issuer: "Google Cloud (via Coursera)",
    issued: "Jun 2024",
    code: "QE5FYC6MCFVP",
    href: "https://coursera.org/verify/QE5FYC6MCFVP",
    note: "Coursera course certificate",
  },
  {
    name: "AWS Cloud Technical Essentials",
    issuer: "Amazon Web Services (via Coursera)",
    issued: "Jul 2025",
    code: "AKRTPKDZGX9M",
    href: "https://coursera.org/verify/AKRTPKDZGX9M",
    note: "Coursera course certificate. Not an AWS certification.",
  },
  {
    name: "Introduction to iOS Mobile Application Development",
    issuer: "Meta (via Coursera)",
    issued: "Sep 2022",
    code: "6N24UPMPFPRH",
    href: "https://coursera.org/verify/6N24UPMPFPRH",
    note: "Coursera course certificate",
  },
  {
    name: "Introduction to User Experience Design",
    issuer: "Georgia Institute of Technology (via Coursera)",
    issued: "Aug 2020",
    code: "V852H3T23GHY",
    href: "https://coursera.org/verify/V852H3T23GHY",
    note: "Coursera course certificate",
  },
];

export const GEAR =
  "Blackmagic, Sony FS700, Atomos, Premiere Pro, After Effects.";

export const SPEAKING = {
  title: "TEDxNaples",
  when: "March 16, 2027",
  body: "Frisson, BBC Reel (2023), came from a pitch I made after about two years and dozens of rejected BBC pitches. On March 16, 2027, I'm speaking at TEDxNaples. The talk is in the musician and filmmaker lane: a filmmaker and storyteller's talk on frisson.",
};
