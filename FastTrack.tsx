
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
  ChevronRight,
  Star,
  Target
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { FTProfile, FTAnalysis } from './types';
import { PROFILE, TARGET_GIGS } from './constants';

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

interface FastTrackProps {
  theme?: 'light' | 'dark';
}

const FastTrack: React.FC<FastTrackProps> = ({ theme = 'dark' }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [profile] = useState<FTProfile>(GREG_FT_PROFILE);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<FTAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isDark = theme === 'dark';

  const selectGig = (desc: string) => {
    setJobDescription(desc);
  };

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
    const brandColor = [236, 157, 52]; // #EC9D34
    
    // Header
    doc.setFillColor(brandColor[0], brandColor[1], brandColor[2]);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text(profile.name.toUpperCase(), 20, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${profile.email} | ${profile.phone} | ${profile.location}`, 20, 32);
    
    // Body
    doc.setTextColor(40, 40, 40);
    
    // Summary
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("PROFESSIONAL SUMMARY", 20, 55);
    doc.setDrawColor(brandColor[0], brandColor[1], brandColor[2]);
    doc.setLineWidth(0.5);
    doc.line(20, 58, 190, 58);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const splitSummary = doc.splitTextToSize(analysis.optimizedSummary, 170);
    doc.text(splitSummary, 20, 65);
    
    let yPos = 65 + (splitSummary.length * 5) + 10;
    
    // Experience
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("RELEVANT EXPERIENCE", 20, yPos);
    doc.line(20, yPos + 3, 190, yPos + 3);
    yPos += 12;
    
    analysis.optimizedExperience.forEach((exp) => {
      const original = profile.experience.find(e => e.company === exp.company);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(original?.title || '', 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(exp.company, 190, yPos, { align: 'right' });
      yPos += 5;
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(original?.period || '', 20, yPos);
      doc.setTextColor(40, 40, 40);
      yPos += 6;
      
      exp.bullets.forEach(bullet => {
        const splitBullet = doc.splitTextToSize(`• ${bullet}`, 160);
        doc.text(splitBullet, 25, yPos);
        yPos += (splitBullet.length * 5);
      });
      yPos += 5;
    });

    // Skills
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("CORE COMPETENCIES", 20, yPos);
    doc.line(20, yPos + 3, 190, yPos + 3);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(profile.skills.join("  •  "), 20, yPos);

    doc.save(`${profile.name}_Tailored_Resume.pdf`);
  };

  return (
    <div className={`flex flex-col h-full overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-dark text-white' : 'bg-light text-black'
    }`}>
      {/* Tool Header */}
      <div className={`flex items-center justify-between px-8 py-6 border-b shrink-0 ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
      }`}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#EC9D34]/20 rounded-xl">
            <RefreshCw className={`w-6 h-6 text-[#EC9D34] ${isLoading ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h3 className="font-bold text-xl leading-none">FastTrack AI Engine</h3>
            <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${
              isDark ? 'text-white/30' : 'text-black/30'
            }`}>Signal Alignment Tool v2.2</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`w-12 h-1.5 rounded-full transition-all duration-500 ${
                  step >= s ? 'bg-[#EC9D34]' : isDark ? 'bg-white/10' : 'bg-black/10'
                }`} 
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
              <p className={`text-lg leading-relaxed ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                The engine uses the <span className={isDark ? 'text-white font-bold' : 'text-black font-bold'}>Greg Dukes</span> professional profile as the anchor for all subsequent mappings.
              </p>
              
              <div className={`p-8 rounded-[2rem] border space-y-6 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}>
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
                      <span key={s} className={`px-3 py-1.5 border rounded-full text-xs font-mono font-bold ${
                        isDark ? 'bg-white/5 border-white/10 text-white/70' : 'bg-black/5 border-black/10 text-black/70'
                      }`}>
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
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <Briefcase className="w-6 h-6 text-[#EC9D34]" />
                  <h4 className="text-2xl font-bold">2. Inject Job Requirements</h4>
                </div>
                <p className={`text-lg ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                  Select a target gig or paste a custom JD to align the resume signal.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {TARGET_GIGS.map((gig) => (
                   <button 
                    key={gig.id}
                    onClick={() => selectGig(gig.description)}
                    className={`text-left p-6 rounded-2xl border transition-all group ${
                      jobDescription === gig.description 
                        ? 'border-[#EC9D34] bg-[#EC9D34]/10 ring-1 ring-[#EC9D34]' 
                        : isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-black/5 border-black/10 hover:border-black/20'
                    }`}
                   >
                     <div className="flex justify-between items-start mb-3">
                        <Target className={`w-5 h-5 ${jobDescription === gig.description ? 'text-[#EC9D34]' : 'opacity-20'}`} />
                        {jobDescription === gig.description && <Star className="w-4 h-4 text-[#EC9D34] fill-[#EC9D34]" />}
                     </div>
                     <h5 className="font-bold text-sm mb-1">{gig.title}</h5>
                     <p className="text-[10px] opacity-40 uppercase font-black">{gig.company}</p>
                   </button>
                 ))}
              </div>

              <div className="relative">
                <textarea 
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Or paste custom Job Description text here..."
                  className={`w-full h-64 border rounded-[2rem] p-8 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#EC9D34]/40 transition-all resize-none ${
                    isDark ? 'bg-white/[0.03] border-white/10 text-white placeholder:text-white/10' : 'bg-black/[0.03] border-black/10 text-black placeholder:text-black/10'
                  }`}
                />
                <div className="absolute bottom-6 right-8 text-[10px] text-[#EC9D34] uppercase tracking-widest font-black flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  STRICT_GROUNDING: ON
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
                    Synthesizing Resume Logic...
                  </>
                ) : (
                  <>
                    Align Signal & Generate Resume <Cpu className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
          )}

          {step === 3 && analysis && (
            <div className="space-y-12 pb-20">
              <div className={`flex flex-col md:flex-row gap-8 items-start md:items-center justify-between p-10 border rounded-[2.5rem] ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <h4 className="text-3xl font-bold">Resume Tailored</h4>
                  </div>
                  <p className={`text-sm font-medium ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                    Signal established. Keywords optimized for hiring managers.
                  </p>
                </div>
                <div className={`text-center md:text-right p-6 rounded-[2rem] border min-w-[200px] ${
                  isDark ? 'bg-black/40 border-white/5' : 'bg-white border-black/5'
                }`}>
                   <div className="text-6xl font-black text-[#EC9D34] mb-1">{analysis.matchScore}%</div>
                   <div className={`text-[10px] uppercase tracking-[0.3em] font-black ${
                     isDark ? 'text-white/30' : 'text-black/30'
                   }`}>JD ALIGNMENT</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                {/* Optimized Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Layout className="w-5 h-5 text-[#EC9D34]" />
                      <h5 className={`font-bold uppercase tracking-widest text-[10px] ${
                        isDark ? 'text-white/50' : 'text-black/50'
                      }`}>Optimized Summary Preview</h5>
                    </div>
                    <div className={`p-8 rounded-[2rem] border text-base italic leading-relaxed ${
                      isDark ? 'bg-white/[0.03] border-white/10 text-white/90' : 'bg-black/[0.03] border-black/10 text-black/90'
                    }`}>
                      "{analysis.optimizedSummary}"
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-[#EC9D34]" />
                      <h5 className={`font-bold uppercase tracking-widest text-[10px] ${
                        isDark ? 'text-white/50' : 'text-black/50'
                      }`}>Recruiter Key-Signals</h5>
                    </div>
                    <div className="space-y-3">
                      {analysis.optimizedExperience[0].bullets.slice(0, 3).map((bullet, i) => (
                        <div key={i} className={`p-4 rounded-xl border text-xs leading-relaxed ${
                          isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                        }`}>
                          {bullet}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Gaps & Export */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-[#EC9D34]/60" />
                      <h5 className={`font-bold uppercase tracking-widest text-[10px] ${
                        isDark ? 'text-white/50' : 'text-black/50'
                      }`}>Alignment Recommendations</h5>
                    </div>
                    <div className="space-y-3">
                      {analysis.gapAnalysis.map((gap, i) => (
                        <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border text-xs font-bold ${
                          isDark ? 'bg-[#EC9D34]/5 border-[#EC9D34]/10 text-[#EC9D34]' : 'bg-[#EC9D34]/10 border-[#EC9D34]/20 text-orange-800'
                        }`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#EC9D34] shrink-0" />
                          {gap}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`pt-10 border-t grid grid-cols-1 gap-4 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                    <button 
                      onClick={exportPDF}
                      className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl hover:scale-[1.02] active:scale-95 ${
                        isDark ? 'bg-white text-black hover:bg-neutral-200 shadow-white/5' : 'bg-black text-white hover:bg-neutral-800 shadow-black/5'
                      }`}
                    >
                      <FileDown className="w-6 h-6" />
                      Download Tailored Resume
                    </button>
                    <button 
                      onClick={() => setStep(2)}
                      className={`w-full py-5 rounded-2xl border font-bold flex items-center justify-center gap-3 transition-all ${
                        isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'
                      }`}
                    >
                      <RefreshCw className="w-5 h-5" />
                      New Alignment
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
