
import React from 'react';
import { MapPin, Mail, Diamond, ShieldCheck, Cpu } from 'lucide-react';

interface ReflectiveCardProps {
  color?: string;
  theme?: 'light' | 'dark';
}

const ReflectiveCard: React.FC<ReflectiveCardProps> = ({
  color = "#ec9d34",
  theme = 'dark'
}) => {
  const profileImageUrl = "https://i.imgur.com/8YvHyNr.png";
  const isDark = theme === 'dark';

  return (
    <div className="relative w-full max-w-md aspect-[3/4] group perspective-1000">
      {/* Outer Adaptive Glow */}
      <div 
        className="absolute -inset-4 rounded-[2.5rem] opacity-20 group-hover:opacity-40 transition-all duration-700 blur-3xl"
        style={{ backgroundColor: color }}
      ></div>

      {/* Main Card Frame */}
      <div className={`relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border transition-all duration-700 group-hover:scale-[1.02] ${
        isDark ? 'bg-black border-white/10' : 'bg-white border-black/5'
      }`}>
        
        {/* Cinematic Background Image - Optimized Visibility */}
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 ${isDark ? 'bg-[#050505]' : 'bg-[#fcfcfc]'}`} />
          
          {/* The Image Layer with dynamic filters for visibility */}
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={profileImageUrl} 
              alt="Greg Dukes" 
              className={`w-full h-full object-cover object-center scale-110 group-hover:scale-105 transition-all duration-1000 ${
                isDark 
                  ? 'opacity-60 grayscale-[0.2] brightness-125 contrast-125 saturate-[0.8]' 
                  : 'opacity-45 grayscale-[0.1] brightness-100 contrast-110 saturate-[0.9]'
              }`}
            />
          </div>

          {/* Cinematic Overlay Layer - Gradient to merge image with UI for text readability */}
          <div className={`absolute inset-0 bg-gradient-to-t ${
            isDark 
              ? 'from-black via-black/40 to-transparent' 
              : 'from-white via-white/40 to-transparent'
          }`} />
          
          {/* Brand Tint Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br from-[#EC9D34]/15 via-transparent to-blue-500/10 opacity-40 mix-blend-overlay`} />
          
          {/* Technical Mesh Pattern */}
          <div className={`absolute inset-0 opacity-[0.07]`} 
               style={{ 
                 backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`, 
                 backgroundSize: '24px 24px' 
               }} 
          />
        </div>

        {/* Technical Branding Elements (Top) */}
        <div className="relative z-20 p-8 flex justify-between items-start">
          <div className="flex flex-col gap-1">
             <div className="w-12 h-12 rounded-xl glass border border-black/10 dark:border-white/10 flex items-center justify-center shadow-lg">
                <Diamond className="w-6 h-6 text-[#EC9D34]" />
             </div>
             <div className="mt-2 px-3 py-1 rounded-full glass border border-black/10 dark:border-white/10 w-fit backdrop-blur-md">
                <span className="text-[9px] font-black font-mono opacity-60 tracking-[0.2em] uppercase">
                   BLKDMND_SYS_V5
                </span>
             </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
             <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-green-500">Node_Active</span>
             </div>
             <div className="px-3 py-1 rounded-full glass border border-black/10 dark:border-white/10 flex items-center gap-2 opacity-60 backdrop-blur-md">
                <ShieldCheck className="w-3 h-3" />
                <span className="text-[9px] font-black uppercase tracking-widest">Encrypted</span>
             </div>
          </div>
        </div>

        {/* Identity Content (Bottom) */}
        <div className="relative z-20 p-10 mt-auto">
          <div className="space-y-2 mb-8 animate-in slide-in-from-bottom duration-1000">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#EC9D34]" />
              <p className="text-[#EC9D34] font-black text-[10px] tracking-[0.4em] uppercase drop-shadow-sm">
                Systems Architect
              </p>
            </div>
            <h1 className="text-5xl font-black tracking-tighter leading-none drop-shadow-md">
              GREG<br/>DUKES
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-10">
            <div className="flex items-center gap-3 text-xs font-bold tracking-tight opacity-80">
              <MapPin className="w-4 h-4 text-[#EC9D34]" />
              <span className={isDark ? 'text-white' : 'text-black'}>CHARLOTTE, NC // OPERATING_REMOTE</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold tracking-tight opacity-80">
              <Mail className="w-4 h-4 text-[#EC9D34]" />
              <span className={isDark ? 'text-white' : 'text-black'}>G.DUKES1@GMAIL.COM</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-black/10 dark:border-white/10">
            <div className="flex gap-2">
               {['AGENTIC', 'PROD_CLOUD', 'RAG_ENGINE'].map(tag => (
                 <span key={tag} className="text-[9px] px-2.5 py-1.5 rounded-lg glass font-mono font-black opacity-70 tracking-widest border-black/10 dark:border-white/10 uppercase shadow-sm">
                   {tag}
                 </span>
               ))}
            </div>
            <Cpu className="w-5 h-5 opacity-40 text-[#EC9D34]" />
          </div>
        </div>

        {/* Surface Shine/Refraction Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
           <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(236,157,52,0.1)]" />
        </div>
      </div>
    </div>
  );
};

export default ReflectiveCard;
