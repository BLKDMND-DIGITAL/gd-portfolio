
import React from 'react';
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
  Network
} from 'lucide-react';

export const SITE_METADATA = {
  title: "BLKDMND | Visual Thesis",
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
    narrative: "Think of S3 as the secure root of this site's digital files. It holds the React build artifacts and assets in a strictly configured bucket with no public access allowed. Instead of acting as a public-facing server, it serves as a protected 'origin'—ensuring that only our global delivery network can access the site's internals."
  },
  {
    service: "Amazon CloudFront",
    icon: <Cloud className="w-6 h-6" />,
    metaphor: "The Global Gatekeeper",
    narrative: "CloudFront acts as the global courier for the app. It terminates HTTPS traffic at the edge, handles the TLS handshake, and caches content geographically close to the user. Critically for a React app, it uses custom error-based routing (mapping 403s and 404s back to index.html) to allow for smooth Single Page Application (SPA) navigation without server-side crashes."
  },
  {
    service: "AWS Certificate Manager",
    icon: <Lock className="w-6 h-6" />,
    metaphor: "The Digital Passport",
    narrative: "Security isn't an afterthought. Every byte of traffic is encrypted via SSL/TLS certificates issued through ACM. These certificates are validated at the infrastructure level and integrated directly with CloudFront, featuring automated renewal so the production environment remains secure and trusted without manual intervention."
  },
  {
    service: "Amazon Route 53",
    icon: <Network className="w-6 h-6" />,
    metaphor: "The Reliable Address Book",
    narrative: "Route 53 manages the high-availability DNS for the blkdmnd.digital domain and subdomains. I used Alias records to point traffic directly to the CloudFront distribution. This ensures that the transition from a human-readable URL to a technical IP address is nearly instantaneous and resilient to regional AWS outages."
  },
  {
    service: "IAM + Security",
    icon: <Shield className="w-6 h-6" />,
    metaphor: "The Key Card System",
    narrative: "Following the principle of 'least privilege,' I use highly scoped IAM roles and policies. For example, the S3 bucket is explicitly locked down so it only 'talks' to CloudFront via an Origin Access Identity (OAI), preventing direct web access to the storage layer and mitigating common security vulnerabilities."
  },
  {
    service: "Infrastructure Workflow",
    icon: <Terminal className="w-6 h-6" />,
    metaphor: "The Automated Blueprint",
    narrative: "Infrastructure is handled through an 'as-code' mindset. Updates to DNS records and distribution settings are applied programmatically using the AWS CLI and JSON batch files. This ensures that every configuration change is repeatable, auditable, and production-ready—moving away from 'click-ops' and toward scalable engineering."
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
