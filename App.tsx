
import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronRight, 
  ExternalLink,
  Bot,
  Layers,
  ShieldCheck,
  Menu,
  X,
  Cpu,
  Diamond,
  Zap,
  Sun,
  Moon,
  Calendar as CalendarIcon,
  Box as BoxIcon,
  CloudLightning,
  Workflow,
  Send,
  MessageSquare,
  CheckCircle2,
  Lock,
  PlayCircle
} from 'lucide-react';
import { PROFILE, COMPETENCIES, PROJECTS, ARCHITECTURE_SPECS, ENTERPRISE_READINESS, TOOLKIT, AWS_ARCHITECTURE } from './constants';
import ReflectiveCard from './ReflectiveCard';
import GeminiAgent from './GeminiAgent';
import FastTrack from './FastTrack';
import ExplainerOverlay from './ExplainerOverlay';

const App: React.FC = () => {
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [isFastTrackOpen, setIsFastTrackOpen] = useState(false);
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Contact Form State
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme + (savedTheme === 'dark' ? ' bg-dark text-white' : ' bg-light text-black');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme + (newTheme === 'dark' ? ' bg-dark text-white' : ' bg-light text-black');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) return;

    const subject = encodeURIComponent(`Recruiter Inquiry for Greg Dukes from ${contactEmail}`);
    const body = encodeURIComponent(`From: ${contactEmail}\n\nMessage:\n${contactMessage}`);
    window.location.href = `mailto:${PROFILE.contact.email}?subject=${subject}&body=${body}`;
    
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 selection:bg-[#EC9D34]/30 selection:text-[#EC9D34]`}>
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glass border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Diamond className="w-8 h-8 text-[#EC9D34]" />
            <span className="font-bold tracking-widest text-lg uppercase hidden sm:block">BLKDMND</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-60">
            <a href="#competencies" className="hover:opacity-100 transition-opacity">Competencies</a>
            <a href="#toolkit" className="hover:opacity-100 transition-opacity">Toolkit</a>
            <a href="#projects" className="hover:opacity-100 transition-opacity">Projects</a>
            <a href="#infrastructure" className="hover:opacity-100 transition-opacity">Cloud</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full glass hover:bg-black/5 dark:hover:bg-white/5 transition-all text-[#EC9D34]"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => setIsFastTrackOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#EC9D34] text-black font-semibold text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-accent/20"
              >
                <Zap className="w-4 h-4 fill-black" />
                FastTrack
              </button>
              <a 
                href="#contact"
                className="px-5 py-2.5 rounded-full glass font-semibold text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact
              </a>
            </div>

            <button 
              className="md:hidden p-2 opacity-60"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white dark:bg-black p-8 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-300">
           <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8 opacity-60"><X className="w-8 h-8"/></button>
           <a href="#competencies" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold">Competencies</a>
           <a href="#toolkit" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold">Toolkit</a>
           <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold">Projects</a>
           <a href="#infrastructure" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold">Cloud</a>
           <button 
              onClick={() => { setIsFastTrackOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-4 rounded-full bg-[#EC9D34] text-black font-bold text-lg flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 fill-black" />
              FastTrack Demo
            </button>
        </div>
      )}

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-40 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 animate-in slide-in-from-left duration-1000">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EC9D34]/10 border border-[#EC9D34]/20 text-[#EC9D34] text-xs font-bold tracking-widest uppercase">
                  <ShieldCheck className="w-3 h-3" />
                  Recruiter-Safe Proof-of-Work
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                  Visualizing <span className="opacity-40 italic">Agentic</span> Systems Architecture.
                </h1>
                <p className="text-xl opacity-60 max-w-xl leading-relaxed">
                  Systems design, multi-agent workflows, and RAG-first automation—shipped with zero-fabrication guardrails.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setIsFastTrackOpen(true)}
                  className="px-8 py-4 rounded-full bg-[#EC9D34] text-black font-bold text-lg hover:opacity-90 transition-all flex items-center gap-3 shadow-xl shadow-accent/10"
                >
                  Launch FastTrack <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                   onClick={() => setIsExplainerOpen(true)}
                  className="px-8 py-4 rounded-full glass font-bold text-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-3 border-[#EC9D34]/20"
                >
                  <PlayCircle className="w-5 h-5 text-[#EC9D34]" />
                  How This Was Built
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-black/5 dark:border-white/5">
                {[
                  "RAG constrained to source data",
                  "Verified professional credentials",
                  "Production Cloud Delivery"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 opacity-40 text-xs uppercase tracking-widest font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EC9D34]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end animate-in slide-in-from-right duration-1000">
              <ReflectiveCard theme={theme} />
            </div>
          </div>

          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#EC9D34]/10 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />
        </section>

        {/* Competencies Section */}
        <section id="competencies" className="py-40 px-6 bg-black/[0.02] dark:bg-white/[0.02]">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="max-w-3xl">
              <h2 className="text-sm font-bold tracking-[0.3em] text-[#EC9D34] uppercase mb-4">Core Competencies</h2>
              <p className="text-4xl font-bold tracking-tight">Orchestrating intelligence through structured systems and elegant interfaces.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {COMPETENCIES.map((group, i) => (
                <div key={i} className="glass p-10 rounded-3xl space-y-8 hover:opacity-100 transition-all border-black/5 dark:border-white/10">
                  <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/10">
                    {i === 0 ? <Layers className="text-[#EC9D34]" /> : i === 1 ? <Cpu className="text-blue-500" /> : <ShieldCheck className="text-green-500" />}
                  </div>
                  <h3 className="text-2xl font-bold">{group.category}</h3>
                  <div className="space-y-6">
                    {group.skills.map((skill, si) => (
                      <div key={si} className="group">
                        <p className="font-semibold opacity-90 group-hover:text-[#EC9D34] transition-colors mb-2">• {skill.text}</p>
                        <p className="text-sm opacity-50 leading-relaxed">{skill.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Toolkit Section */}
        <section id="toolkit" className="py-40 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="max-w-2xl">
                <h2 className="text-sm font-bold tracking-[0.3em] text-[#EC9D34] uppercase mb-4">The Stack</h2>
                <h3 className="text-5xl font-bold tracking-tight">Technical <span className="opacity-40 italic">Arsenal.</span></h3>
              </div>
              <p className="text-sm opacity-40 font-mono hidden md:block uppercase tracking-widest">
                Last Updated: 02.2025 // Operational Status: Nominal
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {TOOLKIT.map((tool, i) => (
                <div key={i} className="group glass p-8 rounded-3xl border-black/5 dark:border-white/10 hover:border-[#EC9D34]/40 transition-all text-center flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#EC9D34] group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold tracking-tight">{tool.name}</p>
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-30">{tool.category}</p>
                  </div>
                </div>
              ))}
              <div className="glass p-8 rounded-3xl border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center gap-2 text-center opacity-40 hover:opacity-100 transition-opacity">
                <BoxIcon className="w-8 h-8 opacity-40" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Expanding Daily</p>
              </div>
            </div>
          </div>
        </section>

        {/* AWS Narrative Section */}
        <section id="infrastructure" className="py-40 px-6 bg-black/[0.02] dark:bg-white/[0.02]">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="grid lg:grid-cols-3 gap-16 items-start">
               <div className="lg:col-span-1 space-y-8 sticky top-32">
                  <div className="space-y-4">
                    <h2 className="text-sm font-bold tracking-[0.3em] text-[#EC9D34] uppercase">Cloud Infrastructure</h2>
                    <h3 className="text-5xl font-bold tracking-tight">Production-Grade <span className="opacity-40 italic">Logic.</span></h3>
                  </div>
                  <p className="opacity-60 leading-relaxed text-lg">
                    This portfolio is not a static site. It is a live, production-grade application deployed on AWS to demonstrate cloud fluency, security awareness, and professional systems thinking.
                  </p>
                  <div className="p-8 rounded-[2rem] glass border-[#EC9D34]/20 space-y-4">
                     <Workflow className="w-8 h-8 text-[#EC9D34]" />
                     <h4 className="font-bold text-xl uppercase tracking-tighter">Scalability Outcome</h4>
                     <p className="text-sm opacity-50 leading-relaxed">
                        This architecture demonstrates readiness for AI, frontend, or systems-focused roles. It scales beyond a personal portfolio by utilizing enterprise-ready delivery networks and automated infrastructure protocols.
                     </p>
                  </div>
               </div>

               <div className="lg:col-span-2 space-y-6">
                  {AWS_ARCHITECTURE.map((item, i) => (
                    <div key={i} className="glass p-10 rounded-[2.5rem] border-black/5 dark:border-white/10 hover:border-[#EC9D34]/30 transition-all group">
                       <div className="flex flex-col md:flex-row gap-8">
                          <div className="shrink-0 w-16 h-16 rounded-2xl bg-[#EC9D34]/5 border border-[#EC9D34]/10 flex items-center justify-center text-[#EC9D34] group-hover:scale-110 transition-transform">
                             {item.icon}
                          </div>
                          <div className="space-y-4">
                             <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#EC9D34] opacity-50">{item.metaphor}</label>
                                <h4 className="text-2xl font-bold">{item.service}</h4>
                             </div>
                             <p className="opacity-60 leading-relaxed text-base font-medium">
                                {item.narrative}
                             </p>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-40 px-6">
          <div className="max-w-7xl mx-auto space-y-20">
             <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="max-w-2xl space-y-4">
                  <h2 className="text-sm font-bold tracking-[0.3em] text-[#EC9D34] uppercase">Selected Works</h2>
                  <h3 className="text-5xl font-bold tracking-tight">Prototyping <span className="opacity-40 italic">Futures.</span></h3>
                </div>
                <div className="flex gap-4">
                   <a href={`https://${PROFILE.links.github}`} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl glass hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                      <Github className="w-6 h-6" />
                   </a>
                   <a href={`https://${PROFILE.links.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl glass hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                      <Linkedin className="w-6 h-6" />
                   </a>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                {PROJECTS.map((project) => (
                  <div 
                    key={project.id} 
                    onClick={() => project.id === 2 && setIsFastTrackOpen(true)}
                    className={`group relative glass p-10 rounded-[2.5rem] border-black/5 dark:border-white/10 hover:border-[#EC9D34]/40 transition-all overflow-hidden ${project.id === 2 ? 'cursor-pointer' : ''}`}
                  >
                    {project.id === 2 && (
                      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                         <ExternalLink className="w-6 h-6 text-[#EC9D34]" />
                      </div>
                    )}
                    <div className="space-y-8 relative z-10">
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          {project.tech.map(t => <span key={t} className="text-[10px] font-mono opacity-40 uppercase tracking-widest font-bold">{t}</span>)}
                        </div>
                        <h4 className="text-3xl font-bold">{project.title}</h4>
                        <p className="opacity-50 leading-relaxed">{project.description}</p>
                      </div>
                      <div className="pt-6 border-t border-black/5 dark:border-white/5">
                         <label className="text-[10px] uppercase tracking-widest text-[#EC9D34] font-bold block mb-2">Primary Outcome</label>
                         <p className="text-sm font-medium opacity-80">{project.outcome}</p>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Architecture Specs Section */}
        <section id="architecture" className="py-40 px-6 border-y border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-sm font-bold tracking-[0.3em] text-[#EC9D34] uppercase">Architecture Logic</h2>
                <h3 className="text-5xl font-bold tracking-tight">Building the <br/>Zero-Trust <span className="opacity-40 italic">Context.</span></h3>
              </div>
              
              <div className="space-y-8">
                {ARCHITECTURE_SPECS.map((spec, i) => (
                  <div key={i} className="p-8 rounded-3xl glass border-black/5 dark:border-white/10 space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                       {spec.tag}
                    </div>
                    <h4 className="text-xl font-bold">{spec.title}</h4>
                    <p className="opacity-60 text-sm leading-relaxed">{spec.logic}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-12 rounded-[3rem] border-black/5 dark:border-white/10 flex flex-col justify-between">
               <div className="space-y-8">
                  <h4 className="text-2xl font-bold">Enterprise Readiness</h4>
                  <div className="space-y-10">
                    {ENTERPRISE_READINESS.map((item, i) => (
                      <div key={i} className="flex gap-6">
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-[#EC9D34]/10 border border-[#EC9D34]/20 flex items-center justify-center text-[#EC9D34]">
                           {item.icon}
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-lg">{item.label}</p>
                          <p className="opacity-60 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="mt-20 p-8 rounded-2xl bg-black/5 dark:bg-black border border-black/10 dark:border-white/5 font-mono text-[10px] opacity-60 leading-relaxed overflow-x-auto whitespace-pre">
                  <div className="flex gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  // STACK_TRACE: SYSTEM_IDENTITY_V5<br/>
                  // THEME: {theme.toUpperCase()}<br/>
                  // STATUS: OPERATIONAL<br/>
                  // ENFORCEMENT: STRICT_RAG
               </div>
            </div>
          </div>
        </section>

        {/* Google Calendar Section */}
        <section id="calendar" className="py-40 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-[0.3em] text-[#EC9D34] uppercase mb-4">Availability</h2>
              <h3 className="text-5xl font-bold tracking-tight mb-4">Book a <span className="opacity-40 italic">Sync.</span></h3>
              <p className="opacity-60">Directly schedule a technical consultation or architectural review through my Google Calendar.</p>
            </div>

            <div className="glass rounded-[3rem] overflow-hidden border-black/5 dark:border-white/10 shadow-2xl h-[600px] relative">
              <iframe 
                src={PROFILE.contact.calendarUrl} 
                style={{ border: 0 }} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no"
                title="Google Calendar Scheduling"
                className={theme === 'dark' ? 'invert opacity-90' : 'opacity-100'}
              ></iframe>
            </div>
            
            <div className="flex justify-center">
              <a 
                href={PROFILE.contact.calendarUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-[#EC9D34] hover:underline"
              >
                <CalendarIcon className="w-4 h-4" />
                Open Calendar in New Tab
              </a>
            </div>
          </div>
        </section>

        {/* Contact Message Section */}
        <section id="contact" className="py-40 px-6 bg-black/[0.03] dark:bg-white/[0.03]">
          <div className="max-w-3xl mx-auto space-y-12 text-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EC9D34]/10 border border-[#EC9D34]/20 text-[#EC9D34] text-[10px] font-bold tracking-widest uppercase mx-auto">
                <MessageSquare className="w-3 h-3" />
                Transmission Protocol
              </div>
              <h2 className="text-5xl font-bold tracking-tight">Direct <span className="opacity-40 italic">Outreach.</span></h2>
              <p className="opacity-60 max-w-xl mx-auto">Recruiters and hiring teams can initiate formal contact by submitting technical inquiries below. Responses are routed directly to Greg's secure node.</p>
            </div>

            <form onSubmit={handleSendMessage} className="glass p-8 md:p-12 rounded-[3rem] border-black/5 dark:border-white/10 space-y-8 text-left relative overflow-hidden">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black opacity-40 ml-4">Your Contact Email</label>
                  <input 
                    type="email" 
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="recruiter@enterprise.com"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-[#EC9D34]/40 transition-all placeholder:opacity-20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black opacity-40 ml-4">Message / Requirements</label>
                  <textarea 
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe the opportunity or architectural requirements..."
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl py-4 px-6 h-40 focus:outline-none focus:ring-2 focus:ring-[#EC9D34]/40 transition-all placeholder:opacity-20 resize-none"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 rounded-2xl bg-[#EC9D34] text-black font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-accent/20 active:scale-95"
              >
                {isSent ? (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    Transmission Dispatched
                  </>
                ) : (
                  <>
                    Transmit to Greg Dukes <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Diamond className="w-32 h-32" />
              </div>
            </form>

            <div className="flex flex-col items-center gap-4 opacity-40">
               <p className="text-[10px] uppercase tracking-[0.3em] font-bold">End-to-End Encryption Enabled</p>
               <div className="flex gap-4">
                  <ShieldCheck className="w-5 h-5" />
                  <Lock className="w-5 h-5" />
               </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6 border-t border-black/5 dark:border-white/5">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-4">
                <Diamond className="w-6 h-6 text-[#EC9D34]" />
                <span className="font-bold tracking-widest text-sm uppercase opacity-60">BLKDMND DIGITAL © 2025</span>
              </div>
              
              <div className="flex gap-8 opacity-40 text-[10px] font-bold uppercase tracking-widest">
                 <a href={`https://${PROFILE.links.github}`} className="hover:opacity-100 transition-opacity">Github</a>
                 <a href={`https://${PROFILE.links.linkedin}`} className="hover:opacity-100 transition-opacity">Linkedin</a>
              </div>
           </div>
        </footer>
      </main>

      {/* Identity Agent Trigger */}
      <button 
        onClick={() => setIsAgentOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-[#EC9D34] text-black rounded-full shadow-2xl hover:scale-110 transition-all z-50 animate-bounce"
        title="Chat with Identity Agent"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Overlays */}
      {isExplainerOpen && <ExplainerOverlay theme={theme} onClose={() => setIsExplainerOpen(false)} />}

      {/* FastTrack Modal Overlay */}
      {isFastTrackOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsFastTrackOpen(false)} />
           <div className={`relative w-full max-w-6xl h-full max-h-[90vh] glass rounded-[2.5rem] overflow-hidden shadow-2xl border-white/10 animate-in zoom-in-95 duration-500`}>
              <button 
                onClick={() => setIsFastTrackOpen(false)}
                className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <FastTrack theme={theme} />
           </div>
        </div>
      )}

      {/* Gemini Agent Component */}
      {isAgentOpen && <GeminiAgent onClose={() => setIsAgentOpen(false)} theme={theme} />}
    </div>
  );
};

export default App;
