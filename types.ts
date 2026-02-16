
export interface Competency {
  category: string;
  skills: {
    text: string;
    detail: string;
  }[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  outcome: string;
  featured: boolean;
  actions?: { label: string; action: string; target: string }[];
}

export interface ArchitectureSpec {
  tag: string;
  title: string;
  logic: string;
}

export interface EnterpriseReadiness {
  label: string;
  desc: string;
}

// FastTrack Types
export interface FTProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: { 
    title: string; 
    company: string; 
    period: string; 
    bullets: string[] 
  }[];
  skills: string[];
}

export interface FTAnalysis {
  matchScore: number;
  gapAnalysis: string[];
  optimizedSummary: string;
  optimizedExperience: { 
    company: string; 
    bullets: string[] 
  }[];
  linkedinSuggestions: { 
    headline: string; 
    about: string 
  };
}
