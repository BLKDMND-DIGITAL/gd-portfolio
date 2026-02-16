import React from 'react';
/* Added missing User and ShieldCheck imports to fix reference errors */
import { 
  Shield, 
  Zap, 
  Cpu, 
  Code, 
  Database, 
  Search, 
  Terminal, 
  Globe, 
  Cpu as AI, 
  Layout, 
  Box, 
  Lock, 
  Cloud, 
  FileCode, 
  RefreshCcw,
  Network,
  Binary,
  Layers,
  Container,
  Activity,
  Eye,
  CheckCircle,
  FileSearch,
  CloudLightning,
  User,
  ShieldCheck,
  Award
} from 'lucide-react';

export const SITE_METADATA = {
  title: "BLKDMND | Visual Thesis",
  tagline: "Get Your Slice of the Future",
  owner: "Greg Dukes",
  brandAccent: "#EC9D34",
};

export const PROFILE = {
  name: "Greg Dukes",
  brandName: "BLKDMND",
  title: "GenAI Software Engineer & AI Solutions Architect",
  location: "Charlotte, NC",
  contact: {
    email: "g.dukes1@gmail.com",
    phone: "864.382.6711",
    calendarUrl: "https://calendar.google.com/calendar/embed?src=b54eb00375e7dab0c1eef362eae292c66a29088e19b56049184eb98c963b6b58%40group.calendar.google.com&ctz=America%2FNew_York"
  },
  links: {
    github: "github.com/BLKDMND-DIGITAL",
    linkedin: "linkedin.com/in/greg-dukes-genai",
    portfolio: "blkdmnd.digital"
  },
  roles: [
    "GENAI ENGINEER",
    "AGENT ARCHITECT",
    "SYSTEMS DESIGNER",
    "PYTHON / LANGGRAPH",
    "LANGCHAIN EXPERT"
  ],
  bio: "As an AI Architect and Senior React Engineer, my focus is on the synthesis of function and form. I build intelligent, scalable, and visually compelling digital experiences that solve real-world problems. My approach is rooted in a deep understanding of user-centric design principles, seamlessly integrated with cutting-edge AI technologies to create products that are not just smart, but also intuitive and delightful to use."
};

export const HIRING_STEPS = [
  {
    step: 1,
    title: "Who This Is For",
    content: "This portfolio is built for teams hiring AI engineers, systems designers, creative technologists, and senior ICs who ship real systems.",
    icon: <User className="w-6 h-6" />
  },
  {
    step: 2,
    title: "What I Actually Build",
    content: "Production-grade AI systems, agentic workflows, RAG pipelines, cloud infrastructure, and human-centered interfaces—this site included.",
    icon: <Cpu className="w-6 h-6" />
  },
  {
    step: 3,
    title: "Proof Over Claims",
    content: "Every section of this site is backed by deployed infrastructure, live code, and documented outcomes—not hypotheticals.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    step: 4,
    title: "Your Role, Tailored",
    content: "Generate a resume dynamically tailored to your open role using a live AI resume engine.",
    icon: <Zap className="w-6 h-6" />
  }
];

export const CERTIFICATIONS = [
  {
    title: "AWS Cloud Certification",
    issuer: "Amazon Web Services",
    image: "https://i.imgur.com/2MGgKDz.png",
    category: "Infrastructure"
  },
  {
    title: "Meta iOS Developer",
    issuer: "Meta",
    image: "https://i.imgur.com/m87QXZt.png",
    category: "Mobile Engineering"
  },
  {
    title: "UX Design Specialization",
    issuer: "Georgia Tech",
    image: "https://i.imgur.com/UBGWkIT.png",
    category: "User Experience"
  },
  {
    title: "Intro to Generative AI",
    issuer: "Google Cloud",
    image: "https://i.imgur.com/bIno54Y.png",
    category: "AI/ML"
  },
  {
    title: "Intro to Large Language Models",
    issuer: "Google Cloud",
    image: "https://i.imgur.com/QG284v3.png",
    category: "AI/ML"
  }
];

export const TARGET_GIGS = [
  {
    id: "genai_arch",
    title: "Senior GenAI Solutions Architect",
    company: "Stealth AI Startup",
    description: "Seeking a lead architect to design multi-agent workflows using LangGraph and Gemini for enterprise automation. Must have deep experience in Python, RAG optimization, and production-grade React frontends."
  },
  {
    id: "frontend_eng",
    title: "Senior AI-Native Frontend Engineer",
    company: "Fortune 500 Fintech",
    description: "Expert React developer needed to build intelligent UI components. Focus on streaming LLM responses, agentic UI patterns, and high-performance TypeScript applications with complex state management."
  },
  {
    id: "ai_systems",
    title: "AI Systems Design Lead",
    company: "Global Consulting Firm",
    description: "Looking for an expert to bridge the gap between LLM research and product reality. Strong systems thinking, AWS infrastructure experience, and ability to engineer zero-fabrication AI agents is required."
  }
];

export const EXPLAINER_STEPS = [
  {
    id: 1,
    title: "Genesis & Logic",
    description: "Idea → Architecture. Translating high-level requirements into a zero-trust system design with strict data isolation.",
    icon: <Binary className="w-8 h-8" />,
    duration: 6000,
    tags: ["Systems Thinking", "Logic Flows"]
  },
  {
    id: 2,
    title: "High-Performance UI",
    description: "React + Vite + Tailwind. A production-grade frontend optimized for interaction speed and agentic responsiveness.",
    icon: <Layout className="w-8 h-8" />,
    duration: 6000,
    tags: ["React 19", "Vite", "Tailwind"]
  },
  {
    id: 3,
    title: "Continuous Delivery",
    description: "Vercel integration for rapid iteration coupled with Amazon S3 as a hardened, private origin for static assets.",
    icon: <Activity className="w-8 h-8" />,
    duration: 6000,
    tags: ["Vercel", "S3", "CI/CD"]
  },
  {
    id: 4,
    title: "Cloud Infrastructure",
    description: "CloudFront global delivery, ACM HTTPS encryption, and Route 53 DNS—orchestrated via AWS CLI for repeatable scaling.",
    icon: <Cloud className="w-8 h-8" />,
    duration: 6000,
    tags: ["CloudFront", "Route 53", "IAM"]
  },
  {
    id: 5,
    title: "AI-Native Future",
    description: "Integrating Gemini 3 & LangGraph multi-agent workflows. A scalable foundation built for the agentic era.",
    icon: <Zap className="w-8 h-8" />,
    duration: 6000,
    tags: ["Gemini 3", "LangGraph", "Agents"]
  }
];

export const TOOLKIT = [
  { name: "React", category: "Frontend", icon: <Layout className="w-5 h-5" /> },
  { name: "TypeScript", category: "Language", icon: <Code className="w-5 h-5" /> },
  { name: "Python", category: "AI/Backend", icon: <Terminal className="w-5 h-5" /> },
  { name: "LangGraph", category: "Orchestration", icon: <AI className="w-5 h-5" /> },
  { name: "LangChain", category: "Framework", icon: <Box className="w-5 h-5" /> },
  { name: "PostgreSQL", category: "Database", icon: <Database className="w-5 h-5" /> },
  { name: "Docker", category: "Infrastructure", icon: <Box className="w-5 h-5" /> },
  { name: "Tailwind", category: "Design", icon: <Globe className="w-5 h-5" /> },
  { name: "Vercel", category: "Deployment", icon: <Zap className="w-5 h-5" /> },
  { name: "FastAPI", category: "API", icon: <Cpu className="w-5 h-5" /> },
];

export const AWS_ARCHITECTURE = [
  {
    service: "Amazon S3",
    icon: <Database className="w-6 h-6" />,
    metaphor: "The Secure Vault",
    narrative: "Static asset hosting for the Visual Thesis, optimized for durability and cost efficiency. It holds the React build artifacts and assets in a strictly configured bucket with no public access allowed."
  },
  {
    service: "Amazon CloudFront",
    icon: <Cloud className="w-6 h-6" />,
    metaphor: "The Global Courier",
    narrative: "Global CDN delivering low-latency access and HTTPS enforcement across all regions. It caches content geographically close to the user and manages Single Page Application routing."
  },
  {
    service: "Amazon Route 53",
    icon: <Network className="w-6 h-6" />,
    metaphor: "The Global Switchboard",
    narrative: "DNS management and domain routing for production-grade reliability. Alias records point traffic directly to the CloudFront distribution for near-instant resolution."
  },
  {
    service: "AWS Certificate Manager",
    icon: <Lock className="w-6 h-6" />,
    metaphor: "The Security Seal",
    narrative: "Managed SSL/TLS certificates enabling secure HTTPS delivery. Every byte of traffic is encrypted, with certificates validated at the infrastructure level."
  },
  {
    service: "AWS CloudTrail",
    icon: <FileSearch className="w-6 h-6" />,
    metaphor: "The Audit Log",
    narrative: "Infrastructure-level visibility and security tracking. Ensures that every management action is logged, providing a secure, auditable trail of configuration changes."
  }
];

export const COMPETENCIES = [
  {
    category: "GenAI Agent Systems",
    skills: [
      {
        text: "Design and orchestration of multi-agent workflows",
        detail: "Implementing Directed Acyclic Graphs (DAGs) or state machines to coordinate tasks across specialized LLM instances."
      },
      {
        text: "Agent-to-agent communication patterns",
        detail: "Utilizing message passing, shared state, or blackboard architectures for collaborative problem solving between agents."
      },
      {
        text: "Tool-augmented LLM reasoning",
        detail: "Integrating external APIs and custom functions via structured Function Calling to extend model capabilities to real-world actions."
      }
    ]
  },
  {
    category: "LangChain & LangGraph",
    skills: [
      {
        text: "LangGraph for controllable agent flows",
        detail: "Cyclic graph modeling for complex reasoning loops with fine-grained control over system checkpoints and conversation rewinds."
      },
      {
        text: "Explicit state management and routing",
        detail: "Using typed Pydantic or JSON schemas to maintain context and logic-based routing."
      }
    ]
  },
  {
    category: "Enterprise AI Safety",
    skills: [
      {
        text: "Sandboxed development environments",
        detail: "Using isolated runtimes (like E2B) to execute agent-generated code safely."
      },
      {
        text: "Prompt injection mitigation",
        detail: "Implementing defensive prompting, input sanitization, and dual-LLM verification layers."
      }
    ]
  }
];

export const PROJECTS = [
  {
    id: 1,
    title: "GenAI Agent Sandbox Platform",
    description: "A sandboxed environment for building, testing, and evaluating GenAI agents before production deployment.",
    tech: ["Python", "LangChain", "LangGraph", "LLMs"],
    outcome: "Reduced risk while accelerating iteration speed",
    featured: true
  },
  {
    id: 2,
    title: "FastTrack System",
    description: "A proprietary job-search automation and signal-alignment system utilizing strict grounding protocols.",
    tech: ["Gemini 3 Pro", "JSON Schema Enforcement", "React", "TypeScript"],
    outcome: "Automated signal alignment with zero fabrication",
    featured: true,
    actions: [{ label: "Open Demo", action: "lightbox.open", target: "fasttrack_demo" }]
  }
];

export const ARCHITECTURE_SPECS = [
  {
    tag: "Knowledge Isolation",
    title: "The Knowledge Sandbox",
    logic: "By injecting the profile as a structured JSON 'Source of Truth' directly into the context window, the model is physically prevented from accessing speculative training data."
  },
  {
    tag: "Safety",
    title: "Zero-Trust Context Protocol",
    logic: "Every generation turn forces a re-validation against the JSON anchor. If a skill doesn't exist in the source, the agent returns a Null Signal."
  }
];

export const ENTERPRISE_READINESS = [
  { label: "Sandboxing", desc: "Validation in isolated environments before production integration.", icon: <Shield className="w-5 h-5" /> },
  { label: "Governance", desc: "Explicit guardrails and audit-friendly workflows for LLM tool usage.", icon: <Zap className="w-5 h-5" /> },
  { label: "Evaluation", desc: "Performance measured via task success and controlled failure modes.", icon: <Search className="w-5 h-5" /> }
];