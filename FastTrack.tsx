
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  Terminal, 
  User, 
  Briefcase, 
  Cpu, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  RefreshCw,
  Layout,
  Linkedin,
  FileDown
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { FTProfile, FTAnalysis } from './types';
import { PROFILE } from './constants';

const GREG_FT_PROFILE: FTProfile = {
  name: PROFILE.name,
  email: PROFILE.contact.email,
  phone: PROFILE.contact.phone,
  location: PROFILE.location,
  summary: PROFILE.bio,
  experience: [
    {
      title: "GenAI Solutions Architect",
      company: "BLKDMND Digital",
      period: "2023 - Present",
      bullets: [
        "Architecting multi-agent orchestration systems using LangGraph and Python.",
        "Developing high-performance React frontends with real-time AI streaming integrations.",
        "Engineering zero-fabrication RAG pipelines for enterprise client knowledge bases."
      ]
    },
    {
      title: "Senior Full Stack Engineer",
      company: "Tech Systems Inc",
      period: "2020 - 2023",
      bullets: [
        "Led a team of 5 in migrating legacy infrastructure to a modern React/Node.js stack.",
        "Reduced cloud costs by 30% through microservices optimization and Dockerization.",
        "Implemented secure authentication protocols for financial enterprise applications."
      ]
    }
  ],
  skills: ["React", "TypeScript", "Python", "LangChain", "LLMs", "System Design", "Cloud Architecture"]
};

const FastTrack: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [profile, setProfile] = useState<FTProfile>(GREG_FT_PROFILE);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<FTAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeJob = async () => {
    if (!jobDescription.trim()) {
      setError("Please provide a job description for analysis.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this candidate profile against the provided job description.
        
        CANDIDATE PROFILE:
        ${JSON.stringify(profile)}
        
        JOB DESCRIPTION:
        ${jobDescription}
        
        Rules:
        1. Calculate a match score (0-100).
        2. Identify specific technical or experience gaps.
        3. Rewrite the profile summary to align with the JD while maintaining absolute truth.
        4. Optimize experience bullets for ATS based on JD keywords.
        5. Provide LinkedIn optimizations.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchScore: { type: Type.NUMBER },
              gapAnalysis: { type: Type.ARRAY, items: { type: Type.STRING } },
              optimizedSummary: { type: Type.STRING },
              optimizedExperience: { 
                type: Type.ARRAY, 
                items: { 
                  type: Type.OBJECT,
                  properties: {
                    company: { type: Type.STRING },
                    bullets: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["company", "bullets"]
                } 
              },
              linkedinSuggestions: {
                type: Type.OBJECT,
                properties: {
                  headline: { type: Type.STRING },
                  about: { type: Type.STRING }
                },
                required: ["headline", "about"]
              }
            },
            required: ["matchScore", "gapAnalysis", "optimizedSummary", "optimizedExperience", "linkedinSuggestions"]
          }
        }
      });

      const data = JSON.parse(response.text);
      setAnalysis(data);
      setStep(3);
    } catch (err) {
      console.error("Analysis Error:", err);
      setError("Failed to analyze. Please ensure JD is valid and API key is active.");
    } finally {
      setIsLoading(false);
    }
  };

  const exportPDF = () => {
    if (!analysis) return;
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text(profile.name, 20, 20);
    
    doc.setFontSize(10);
    doc.text(`${profile.email} | ${profile.phone} | ${profile.location}`, 20, 28);
    
    doc.setFontSize(14);
    doc.text("Professional Summary", 20, 40);
    doc.setFontSize(10);
    const splitSummary = doc.splitTextToSize(analysis.optimizedSummary, 170);
    doc.text(splitSummary, 20, 46);
    
    let yPos = 46 + (splitSummary.length * 5) + 10;
    
    doc.setFontSize(14);
    doc.text("Experience", 20, yPos);
    yPos += 8;
    
    analysis.optimizedExperience.forEach((exp) => {
      const original = profile.experience.find(e => e.company === exp.company);
      doc.setFontSize(12);
      doc.text(`${original?.title || ''} at ${exp.company}`, 20, yPos);
      yPos += 5;
      doc.setFontSize(10);
      exp.bullets.forEach(bullet => {
        const splitBullet = doc.splitTextToSize(`• ${bullet}`, 160);
        doc.text(splitBullet, 25, yPos);
        yPos += (splitBullet.length * 5);
      });
      yPos += 5;
    });

    doc.save(`${profile.name}_Optimized_Resume.pdf`);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#0d0d0d] text-white">
      {/* Tool Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#EC9D34]/20 rounded-lg">
            <RefreshCw className={`w-5 h-5 text-[#EC9D34] ${isLoading ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-none">FastTrack AI Engine</h3>
            <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Signal Alignment Tool v2.1</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`w-8 h-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#EC9D34]' : 'bg-white/10'}`} 
              />
            ))}
          </div>
          {step > 1 && (
            <button 
              onClick={() => setStep(step === 3 ? 2 : 1)}
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              Back
            </button>
          )}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
          
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-[#EC9D34]" />
                <h4 className="text-xl font-bold">1. Verify Candidate Profile</h4>
              </div>
              <p className="text-white/50 text-sm">We've pre-loaded the <span className="text-white">Greg Dukes</span> profile for this thesis demonstration.</p>
              
              <div className="glass p-6 rounded-2xl border-white/10 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Full Name</label>
                    <p className="font-semibold">{profile.name}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Target Role</label>
                    <p className="font-semibold">AI Architect / Engineer</p>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Core Competency</label>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map(s => <span key={s} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono">{s}</span>)}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all"
              >
                Confirm Profile <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-5 h-5 text-[#EC9D34]" />
                <h4 className="text-xl font-bold">2. Paste Job Description</h4>
              </div>
              <p className="text-white/50 text-sm">The engine will map candidate skills to these specific requirements.</p>
              
              <div className="relative">
                <textarea 
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste JD text here (e.g. 'Seeking a Senior AI Engineer with experience in LangChain and React...')"
                  className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#EC9D34]/40 transition-all"
                />
                <div className="absolute bottom-4 right-4 text-[10px] text-white/20 uppercase tracking-widest font-mono">
                  Grounding: ACTIVE
                </div>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <button 
                onClick={analyzeJob}
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-[#EC9D34] text-black font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Running Signal Alignment...
                  </>
                ) : (
                  <>
                    Map Alignment <Cpu className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}

          {step === 3 && analysis && (
            <div className="space-y-10 pb-10">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-8 bg-white/5 border border-white/10 rounded-3xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <h4 className="text-2xl font-bold">Analysis Complete</h4>
                  </div>
                  <p className="text-white/40 text-sm">Candidate alignment based on provided JD parameters.</p>
                </div>
                <div className="text-center md:text-right">
                   <div className="text-5xl font-black text-[#EC9D34] mb-1">{analysis.matchScore}%</div>
                   <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Alignment Score</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Optimized Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Layout className="w-4 h-4 text-[#EC9D34]" />
                    <h5 className="font-bold uppercase tracking-widest text-xs text-white/60">Optimized Summary</h5>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-sm italic leading-relaxed text-white/80">
                    "{analysis.optimizedSummary}"
                  </div>

                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <h5 className="font-bold uppercase tracking-widest text-xs text-white/60">Social Strategy</h5>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                       <label className="text-[10px] text-blue-400 font-bold uppercase mb-2 block">LinkedIn Headline</label>
                       <p className="text-sm font-medium">{analysis.linkedinSuggestions.headline}</p>
                    </div>
                  </div>
                </div>

                {/* Gaps & Export */}
                <div className="space-y-6">
                   <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <h5 className="font-bold uppercase tracking-widest text-xs text-white/60">Skills Gap</h5>
                  </div>
                  <div className="space-y-2">
                    {analysis.gapAnalysis.map((gap, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10 text-xs text-red-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        {gap}
                      </div>
                    ))}
                    {analysis.gapAnalysis.length === 0 && <p className="text-xs text-green-400 font-bold">ZERO GAPS IDENTIFIED.</p>}
                  </div>

                  <div className="pt-6 border-t border-white/10 space-y-4">
                    <button 
                      onClick={exportPDF}
                      className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-neutral-200 transition-all"
                    >
                      <FileDown className="w-5 h-5" />
                      Generate ATS Resume (PDF)
                    </button>
                    <button 
                      onClick={() => setStep(2)}
                      className="w-full py-4 rounded-xl bg-white/5 border border-white/10 font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
                    >
                      <RefreshCw className="w-5 h-5" />
                      New Analysis
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FastTrack;

const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);
