import React, { useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronRight, 
  FileText, 
  ExternalLink,
  Bot,
  Layers,
  ShieldCheck,
  Terminal,
  Menu,
  X,
  Cpu,
  Diamond,
  // Added Zap to imports to fix "Cannot find name 'Zap'" error
  Zap
} from 'lucide-react';
import { SITE_METADATA, PROFILE, COMPETENCIES, PROJECTS, ARCHITECTURE_SPECS, ENTERPRISE_READINESS } from './constants';
import ReflectiveCard from './ReflectiveCard';
import GeminiAgent from './GeminiAgent';

const App: React.FC = () => {
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // External link for the FastTrack demo/source
  const demoUrl = "https://github.com/BLKDMND-DIGITAL/fasttrack";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#EC9D34]/30 selection:text-[#EC9D34]">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Diamond className="w-8 h-8 text-[#EC9D34]" />
            <span className="font-bold tracking-widest text-lg uppercase hidden sm:block">BLKDMND</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#competencies" className="hover:text-white transition-colors">Competencies</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all flex items-center gap-2 shadow-lg shadow-white/10"
            >
              <Zap className="w-4 h-4 fill-black" />
              FastTrack Demo
            </a>
            <a 
              href={`mailto:${PROFILE.contact.email}`}
              className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 font-semibold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact
            </a>
          </div>

          <button 
            className="md:hidden p-2 text-white/60"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black p-8 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-300">
           <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8 text-white/60"><X className="w-8 h-8"/></button>
           <a href="#competencies" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold">Competencies</a>
           <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold">Projects</a>
           <a href="#architecture" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold">Architecture</a>
           <a 
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 rounded-full bg-white text-black font-bold text-lg flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 fill-black" />
              FastTrack Demo
            </a>
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
                  Visualizing <span className="text-white/40 italic">Agentic</span> Systems Architecture.
                </h1>
                <p className="text-xl text-white/50 max-w-xl leading-relaxed">
                  Systems design, multi-agent workflows, and RAG-first automation—shipped with zero-fabrication guardrails.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-neutral-200 transition-all flex items-center gap-3"
                >
                  Launch FastTrack Demo <ChevronRight className="w-5 h-5" />
                </a>
                <button 
                   onClick={() => setIsAgentOpen(true)}
                  className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-3"
                >
                  Query the Agent <ExternalLink className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/5">
                {[
                  "RAG constrained to source data",
                  "Verified professional credentials",
                  "Vercel-hosted infrastructure"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest">
                    <div className="w-1 h-1 rounded-full bg-[#EC9D34]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end animate-in slide-in-from-right duration-1000">
              <ReflectiveCard />
            </div>
          </div>

          {/* Background Decoration */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#EC9D34]/10 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />
        </section>

        {/* Competencies Section */}
        <section id="competencies" className="py-40 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="max-w-3xl">
              <h2 className="text-sm font-bold tracking-[0.3em] text-[#EC9D34] uppercase mb-4">Core Competencies</h2>
              <p className="text-4xl font-bold tracking-tight">Orchestrating intelligence through structured systems and elegant interfaces.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {COMPETENCIES.map((group, i) => (
                <div key={i} className="glass p-10 rounded-3xl space-y-8 hover:bg-white/[0.05] transition-colors border-white/10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    {i === 0 ? <Layers className="text-[#EC9D34]" /> : i === 1 ? <Cpu className="text-blue-400" /> : <ShieldCheck className="text-green-400" />}
                  </div>
                  <h3 className="text-2xl font-bold">{group.category}</h3>
                  <div className="space-y-6">
                    {group.skills.map((skill, si) => (
                      <div key={si} className="group">
                        <p className="font-semibold text-white/90 group-hover:text-[#EC9D34] transition-colors mb-2">• {skill.text}</p>
                        <p className="text-sm text-white/40 leading-relaxed">{skill.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-40 px-6">
          <div className="max-w-7xl mx-auto space-y-20">
             <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="max-w-2xl space-y-4">
                  <h2 className="text-sm font-bold tracking-[0.3em] text-[#EC9D34] uppercase">Selected Works</h2>
                  <h3 className="text-5xl font-bold tracking-tight">Prototyping <span className="text-white/40 italic">Futures.</span></h3>
                </div>
                <div className="flex gap-4">
                   <a href={`https://${PROFILE.links.github}`} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <Github className="w-6 h-6" />
                   </a>
                   <a href={`https://${PROFILE.links.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <Linkedin className="w-6 h-6" />
                   </a>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                {PROJECTS.map((project) => (
                  <div key={project.id} className="group relative glass p-10 rounded-[2.5rem] border-white/10 hover:border-[#EC9D34]/40 transition-all overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                       <ExternalLink className="w-6 h-6 text-[#EC9D34]" />
                    </div>
                    <div className="space-y-8 relative z-10">
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          {project.tech.map(t => <span key={t} className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{t}</span>)}
                        </div>
                        <h4 className="text-3xl font-bold">{project.title}</h4>
                        <p className="text-white/50 leading-relaxed">{project.description}</p>
                      </div>
                      <div className="pt-6 border-t border-white/5">
                         <label className="text-[10px] uppercase tracking-widest text-[#EC9D34] font-bold block mb-2">Primary Outcome</label>
                         <p className="text-sm font-medium text-white/80">{project.outcome}</p>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Architecture Specs Section */}
        <section id="architecture" className="py-40 px-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-sm font-bold tracking-[0.3em] text-[#EC9D34] uppercase">Architecture Logic</h2>
                <h3 className="text-5xl font-bold tracking-tight">Building the <br/>Zero-Trust <span className="text-white/40 italic">Context.</span></h3>
              </div>
              
              <div className="space-y-8">
                {ARCHITECTURE_SPECS.map((spec, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                       {spec.tag}
                    </div>
                    <h4 className="text-xl font-bold">{spec.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{spec.logic}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-12 rounded-[3rem] border-white/10 flex flex-col justify-between">
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
                          <p className="text-white/40 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="mt-20 p-8 rounded-2xl bg-black border border-white/5 font-mono text-xs text-white/40 leading-relaxed">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  // STACK_TRACE: SYSTEM_IDENTITY_V3<br/>
                  // STATUS: OPERATIONAL<br/>
                  // ENFORCEMENT: STRICT_RAG<br/>
                  // SOURCE: BLKDMND_CORE_V1.json
               </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-4">
                <Diamond className="w-6 h-6 text-[#EC9D34]" />
                <span className="font-bold tracking-widest text-sm uppercase">BLKDMND DIGITAL © 2025</span>
              </div>
              
              <div className="flex gap-8 text-white/40 text-xs font-bold uppercase tracking-widest">
                 <a href={`https://${PROFILE.links.github}`} className="hover:text-white transition-colors">Github</a>
                 <a href={`https://${PROFILE.links.linkedin}`} className="hover:text-white transition-colors">Linkedin</a>
                 <a href={`https://${PROFILE.links.portfolio}`} className="hover:text-white transition-colors">Portfolio</a>
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

      {/* Gemini Agent Component */}
      {isAgentOpen && <GeminiAgent onClose={() => setIsAgentOpen(false)} />}
    </div>
  );
};

// Fixed: Added default export to resolve "Module has no default export" error in index.tsx
export default App;