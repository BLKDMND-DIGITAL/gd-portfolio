
import React, { useState } from 'react';
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
  FileDown,
  ChevronRight
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
  const [profile] = useState<FTProfile>(GREG_FT_PROFILE);
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
    <div className="flex flex-col h-full bg-[#0d0d0d] text-white overflow-hidden">
      {/* Tool Header */}
      <div className="flex items-center justify-between px-8 py-6 bg-white/5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#EC9D34]/20 rounded-xl">
            <RefreshCw className={`w-6 h-6 text-[#EC9D34] ${isLoading ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h3 className="font-bold text-xl leading-none">FastTrack AI Engine</h3>
            <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Signal Alignment Tool v2.1</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`w-12 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#EC9D34]' : 'bg-white/10'}`} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 overflow-y-auto p-8 md:p-12 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
          
          {step === 1 && (
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-2">
                <User className="w-6 h-6 text-[#EC9D34]" />
                <h4 className="text-2xl font-bold">1. Verify Candidate Profile</h4>
              </div>
              <p className="text-white/50 text-lg leading-relaxed">The engine uses the <span className="text-white font-bold">Greg Dukes</span> professional profile as the anchor for all subsequent mappings.</p>
              
              <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#EC9D34] font-bold block">Full Identity</label>
                    <p className="text-xl font-bold">{profile.name}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#EC9D34] font-bold block">Target Architecture</label>
                    <p className="text-xl font-bold">AI Solutions Architect</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-[#EC9D34] font-bold block">Verified Stack</label>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map(s => (
                      <span key={s} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono font-bold text-white/70">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full py-5 rounded-2xl bg-[#EC9D34] text-black font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-2xl shadow-accent/10"
              >
                Confirm Identity <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-2">
                <Briefcase className="w-6 h-6 text-[#EC9D34]" />
                <h4 className="text-2xl font-bold">2. Inject Job Requirements</h4>
              </div>
              <p className="text-white/50 text-lg">Input the target JD. The engine will perform high-precision mapping against the verified anchor.</p>
              
              <div className="relative">
                <textarea 
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste Job Description (JD) text here..."
                  className="w-full h-80 bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#EC9D34]/40 transition-all placeholder:text-white/10 resize-none"
                />
                <div className="absolute bottom-6 right-8 text-[10px] text-[#EC9D34] uppercase tracking-widest font-black flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  RAG GROUNDING: ACTIVE
                </div>
              </div>

              {error && (
                <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3 animate-in slide-in-from-top duration-300">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <button 
                onClick={analyzeJob}
                disabled={isLoading}
                className="w-full py-5 rounded-2xl bg-[#EC9D34] text-black font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Executing Signal Alignment...
                  </>
                ) : (
                  <>
                    Run Mapping Protocol <Cpu className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
          )}

          {step === 3 && analysis && (
            <div className="space-y-12 pb-20">
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between p-10 bg-white/5 border border-white/10 rounded-[2.5rem]">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <h4 className="text-3xl font-bold">Signal Map Complete</h4>
                  </div>
                  <p className="text-white/40 text-sm font-medium">Alignment established with 0.1 degree of precision.</p>
                </div>
                <div className="text-center md:text-right bg-black/40 p-6 rounded-[2rem] border border-white/5 min-w-[200px]">
                   <div className="text-6xl font-black text-[#EC9D34] mb-1">{analysis.matchScore}%</div>
                   <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-black">MATCH SCORE</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                {/* Optimized Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Layout className="w-5 h-5 text-[#EC9D34]" />
                      <h5 className="font-bold uppercase tracking-widest text-[10px] text-white/50">Optimized Narrative</h5>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 text-base italic leading-relaxed text-white/90">
                      "{analysis.optimizedSummary}"
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-blue-400" />
                      <h5 className="font-bold uppercase tracking-widest text-[10px] text-white/50">LinkedIn Optimization</h5>
                    </div>
                    <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-4">
                       <div>
                         <label className="text-[9px] text-blue-400 font-black uppercase mb-2 block">Dynamic Headline</label>
                         <p className="text-sm font-bold">{analysis.linkedinSuggestions.headline}</p>
                       </div>
                       <div>
                         <label className="text-[9px] text-blue-400 font-black uppercase mb-2 block">Refined 'About' Segment</label>
                         <p className="text-xs text-white/60 leading-relaxed line-clamp-4">{analysis.linkedinSuggestions.about}</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Gaps & Export */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <h5 className="font-bold uppercase tracking-widest text-[10px] text-white/50">Entropy / Knowledge Gaps</h5>
                    </div>
                    <div className="space-y-3">
                      {analysis.gapAnalysis.map((gap, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-xs font-bold text-red-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                          {gap}
                        </div>
                      ))}
                      {analysis.gapAnalysis.length === 0 && (
                        <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/10 text-sm font-bold text-green-400 text-center">
                          NO ARCHITECTURAL GAPS IDENTIFIED.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-10 border-t border-white/5 grid grid-cols-1 gap-4">
                    <button 
                      onClick={exportPDF}
                      className="w-full py-5 rounded-2xl bg-white text-black font-black text-lg flex items-center justify-center gap-3 hover:bg-neutral-200 transition-all shadow-xl"
                    >
                      <FileDown className="w-6 h-6" />
                      Export ATS PDF
                    </button>
                    <button 
                      onClick={() => setStep(2)}
                      className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Re-run Alignment
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
