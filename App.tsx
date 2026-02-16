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
  PlayCircle,
  User,
  ArrowRight,
  ArrowUp,
  Award,
  Maximize2
} from 'lucide-react';
import { 
  PROFILE, 
  COMPETENCIES, 
  PROJECTS, 
  ARCHITECTURE_SPECS, 
  ENTERPRISE_READINESS, 
  TOOLKIT, 
  AWS_ARCHITECTURE,
  HIRING_STEPS,
  SITE_METADATA,
  CERTIFICATIONS
} from './constants';
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
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATIONS[0] | null>(null);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 selection:bg-[#EC9D34]/30 selection:text-[#EC9D34]`}>
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glass border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Diamond className="w-8 h-8 text-[#EC9D34]" />
            <div className="flex flex-col">
              <span className="font-bold tracking-widest text-lg uppercase leading-none">BLKDMND π</span>
              <span className="text-[9px] font-bold opacity-40 tracking-tighter uppercase">{SITE_METADATA.tagline}</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-60">
            <a href="#hiring" className="hover:opacity-100 transition-opacity">Hiring Flow</a>
            <a href="#competencies" className="hover:opacity-100 transition-opacity">Competencies</a>
            <a href="#credentials" className="hover:opacity-100 transition-opacity">Credentials</a>
            <a href="#projects" className="hover:opacity-100 transition-opacity">Projects</a>
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
           <a href="#hiring" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold">Hiring Flow</a>
           <a href="#competencies" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold">Competencies</a>
           <a href="#credentials" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold">Credentials</a>
           <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold">Projects</a>
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
                  Production-Ready Architecture
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                  AI Systems Architect building production-grade <span className="opacity-40 italic">agentic</span> platforms.
                </h1>
                <p className="text-xl opacity-60 max-w-xl leading-relaxed">
                  This site is the case study.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => {
                    const el = document.getElementById('hiring');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 rounded-full bg-[#EC9D34] text-black font-bold text-lg hover:opacity-90 transition-all flex items-center gap-3 shadow-xl shadow-accent/10"
                >
                  Explore Hiring Flow <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                   onClick={() => setIsExplainerOpen(true)}
                  className="px-8 py-4 rounded-full glass font-bold text-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-3 border-[#EC9D34]/20"
                >
                  <PlayCircle className="w-5 h-5 text-[#EC9D34]" />
                  Internal Logic
                </button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end animate-in slide-in-from-right duration-1000">
              <ReflectiveCard theme={theme} />
            </div>
          </div>
        </section>

        {/* Hiring Flow Stepper */}
        <section id="hiring" className="py-40 px-6 border-y border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-sm font-bold tracking-[0.3em] text-[#EC9D34] uppercase">Guided Alignment</h2>
              <h3 className="text-5xl font-bold tracking-tight">Hiring <span className="opacity-40 italic">Flow.</span></h3>
            </div>

            <div className="grid md:grid-cols-4 gap-4 relative">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-black/5 dark:bg-white/5 hidden md:block -translate-y-8" />
              {HIRING_STEPS.map((step, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative p-8 rounded-[2rem] transition-all cursor-pointer ${
                    activeStep === idx 
                    ? 'glass border-[#EC9D34]/40 bg-[#EC9D34]/5 shadow-xl scale-105 z-10' 
                    : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-40'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center transition-colors ${
                    activeStep === idx ? 'bg-[#EC9D34] text-black' : 'bg-black/10 dark:bg-white/10'
                  }`}>
                    <span className="font-black">{step.step}</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                  <p className="text-sm opacity-60 leading-relaxed">{step.content}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-8">
               <button 
                onClick={() => setIsFastTrackOpen(true)}
                className="group px-10 py-5 rounded-full bg-black dark:bg-white text-white dark:text-black font-black text-xl flex items-center gap-4 hover:scale-[1.02] transition-all shadow-2xl"
               >
                 Generate Role-Specific Resume
                 <Zap className="w-6 h-6 text-[#EC9D34] fill-[#EC9D34] group-hover:animate-pulse" />
               </button>
            </div>
          </div>
        </section>

        {/* Competencies Section */}
        <section id="competencies" className="py-40 px-6">
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

        {/* Infrastructure Narrative Section (AWS PROOF) */}
        <section id="infrastructure" className="py-40 px-6 bg-black/[0.03] dark:bg-white/[0.03] relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-20 relative z-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-sm font-bold tracking-[0.3em] text-[#EC9D34] uppercase">Live Proof</h2>
              <h3 className="text-5xl font-bold tracking-tight">Cloud <span className="opacity-40 italic">Infrastructure.</span></h3>
              <p className="opacity-60 text-lg">This portfolio runs on the same stack I design for clients and employers.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {AWS_ARCHITECTURE.map((item, idx) => (
                 <div key={idx} className="glass p-10 rounded-[2.5rem] border-black/5 dark:border-white/10 group hover:border-[#EC9D34]/30 transition-all">
                   <div className="flex gap-6 items-start">
                     <div className="w-14 h-14 rounded-2xl bg-[#EC9D34]/10 flex items-center justify-center text-[#EC9D34] shrink-0">
                       {item.icon}
                     </div>
                     <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-[#EC9D34] opacity-50 tracking-widest">{item.metaphor}</label>
                          <h4 className="text-2xl font-bold">{item.service}</h4>
                        </div>
                        <p className="text-sm opacity-60 leading-relaxed">{item.narrative}</p>
                     </div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#EC9D34]/5 blur-[120px] -z-0" />
        </section>

        {/* Credentials Section */}
        <section id="credentials" className="py-40 px-6 border-t border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="max-w-2xl space-y-4">
                <h2 className="text-sm font-bold tracking-[0.3em] text-[#EC9D34] uppercase">Credentials & Validation</h2>
                <h3 className="text-5xl font-bold tracking-tight">Professional <span className="opacity-40 italic">Certifications.</span></h3>
                <p className="opacity-60 text-lg">Rigorous training across cloud infrastructure, AI architecture, and user-centric design.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CERTIFICATIONS.map((cert, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedCert(cert)}
                  className="group relative h-[300px] rounded-[2.5rem] overflow-hidden glass border-black/5 dark:border-white/10 cursor-pointer hover:border-[#EC9D34]/40 transition-all"
                >
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                    <div className="space-y-2">
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#EC9D34]">{cert.category}</span>
                       <h4 className="text-xl font-bold text-white leading-tight">{cert.title}</h4>
                       <p className="text-xs text-white/50 font-medium">Issued by {cert.issuer}</p>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-white" />
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
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-40 px-6 border-t border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto space-y-20">
             <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="max-w-2xl space-y-4">
                  <h2 className="text-sm font-bold tracking-[0.3em] text-[#EC9D34] uppercase">Selected Works</h2>
                  <h3 className="text-5xl font-bold tracking-tight">Prototyping <span className="opacity-40 italic">Futures.</span></h3>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                {PROJECTS.map((project) => (
                  <div 
                    key={project.id} 
                    onClick={() => project.id === 2 && setIsFastTrackOpen(true)}
                    className={`group relative glass p-10 rounded-[2.5rem] border-black/5 dark:border-white/10 hover:border-[#EC9D34]/40 transition-all overflow-hidden ${project.id === 2 ? 'cursor-pointer' : ''}`}
                  >
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

        {/* Contact Section */}
        <section id="contact" className="py-40 px-6">
          <div className="max-w-3xl mx-auto space-y-12 text-center">
            <h2 className="text-5xl font-bold tracking-tight">Direct <span className="opacity-40 italic">Outreach.</span></h2>
            <form onSubmit={handleSendMessage} className="glass p-8 md:p-12 rounded-[3rem] border-black/5 dark:border-white/10 space-y-8 text-left">
              <div className="space-y-6">
                <input 
                  type="email" 
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Your Contact Email"
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-[#EC9D34]/40"
                />
                <textarea 
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Describe the opportunity..."
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl py-4 px-6 h-40 focus:outline-none focus:ring-2 focus:ring-[#EC9D34]/40"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-5 rounded-2xl bg-[#EC9D34] text-black font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
              >
                {isSent ? <CheckCircle2 className="w-6 h-6" /> : <Send className="w-5 h-5" />}
                {isSent ? "Transmission Dispatched" : "Transmit to Greg Dukes"}
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6 border-t border-black/5 dark:border-white/5 relative">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-4">
                <Diamond className="w-6 h-6 text-[#EC9D34]" />
                <span className="font-bold tracking-widest text-sm uppercase opacity-60">BLKDMND π DIGITAL © 2025</span>
              </div>
              
              <div className="flex gap-8 opacity-40 text-[10px] font-bold uppercase tracking-widest md:mr-32">
                 <a href={`https://${PROFILE.links.github}`} className="hover:opacity-100 transition-opacity">Github</a>
                 <a href={`https://${PROFILE.links.linkedin}`} className="hover:opacity-100 transition-opacity">Linkedin</a>
              </div>
           </div>

           {/* Back to Top Arrow */}
           <div className="flex justify-center mt-12 md:mt-0 md:absolute md:top-1/2 md:right-12 md:-translate-y-1/2">
             <button 
               onClick={scrollToTop}
               className="p-3 rounded-xl glass hover:bg-[#EC9D34]/10 hover:border-[#EC9D34]/30 transition-all group flex flex-col items-center justify-center"
               aria-label="Back to Top"
             >
               <ArrowUp className="w-5 h-5 text-[#EC9D34] group-hover:-translate-y-1 transition-transform" />
             </button>
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

      {selectedCert && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 sm:p-20 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedCert(null)} />
           <div className="relative max-w-5xl w-full h-full flex flex-col gap-6 animate-in zoom-in-95 duration-500">
              <button 
                onClick={() => setSelectedCert(null)}
                className="self-end p-4 rounded-full glass hover:bg-white/10 transition-all"
              >
                <X className="w-8 h-8 text-white" />
              </button>
              <div className="flex-1 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 glass">
                 <img 
                   src={selectedCert.image} 
                   alt={selectedCert.title} 
                   className="w-full h-full object-contain"
                 />
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between p-10 glass rounded-[2.5rem] gap-6">
                <div className="space-y-2">
                   <h4 className="text-3xl font-bold text-white tracking-tight">{selectedCert.title}</h4>
                   <p className="text-xl text-white/50">{selectedCert.issuer}</p>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-[#EC9D34] text-black font-black uppercase text-sm tracking-widest">
                  Verified Credential
                </div>
              </div>
           </div>
        </div>
      )}

      {isAgentOpen && <GeminiAgent onClose={() => setIsAgentOpen(false)} theme={theme} />}
    </div>
  );
};

export default App;