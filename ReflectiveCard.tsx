
import React from 'react';
import { MapPin, Mail, Diamond } from 'lucide-react';

interface ReflectiveCardProps {
  color?: string;
}

const ReflectiveCard: React.FC<ReflectiveCardProps> = ({
  color = "#ec9d34"
}) => {
  const profileImageUrl = "https://i.imgur.com/8YvHyNr.png";

  return (
    <div className="relative w-full max-w-md aspect-[3/4] group perspective-1000">
      {/* Outer Adaptive Glow */}
      <div 
        className="absolute -inset-4 rounded-[2.5rem] opacity-20 group-hover:opacity-40 transition-all duration-700 blur-3xl"
        style={{ backgroundColor: color }}
      ></div>

      {/* Main Card Frame */}
      <div className="relative h-full w-full glass rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border border-white/10 transition-transform duration-500 group-hover:scale-[1.01] group-hover:-rotate-1">
        
        {/* Static Refined Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#EC9D34]/10 via-transparent to-blue-500/10 opacity-50" />
          
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
          
          {/* Dynamic Glass Lighting Overlays */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/5" />
        </div>

        {/* Branding Overlays (Top) */}
        <div className="relative z-20 p-8 flex justify-between items-start">
          <div className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
            <Diamond className="w-6 h-6 text-[#EC9D34]" />
          </div>
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-[10px] font-mono font-bold text-white/40 tracking-widest uppercase">
              Identity_V3.0
            </span>
          </div>
        </div>

        {/* Identity Content (Bottom) */}
        <div className="relative z-20 p-10 mt-auto bg-gradient-to-t from-black/95 via-black/40 to-transparent">
          <div className="mb-6 relative">
            <div className="w-24 h-24 pt-2 rounded-2xl shadow-2xl overflow-hidden group/avatar bg-white/5">
               <img 
                 src={profileImageUrl} 
                 alt="Greg Dukes" 
                 className="w-full h-full object-cover scale-[1.40] transition-transform duration-700 group-hover/avatar:scale-[1.53]"
               />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-4 border-black animate-pulse" />
          </div>
          
          <div className="space-y-1 mb-6">
            <h1 className="text-4xl font-bold tracking-tighter text-white">GREG DUKES</h1>
            <p className="text-[#EC9D34] font-bold text-[10px] tracking-[0.3em] uppercase">
              Agentic Systems Architect
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 mb-8 opacity-60">
            <div className="flex items-center gap-3 text-white text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#EC9D34]" />
              <span>Charlotte, NC (Remote_Global)</span>
            </div>
            <div className="flex items-center gap-3 text-white text-xs font-medium">
              <Mail className="w-3.5 h-3.5 text-[#EC9D34]" />
              <span>g.dukes1@gmail.com</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
               {['RAG', 'PYTHON', 'REACT'].map(tag => (
                 <span key={tag} className="text-[9px] px-2 py-1 rounded bg-white/10 border border-white/10 text-white/60 font-mono font-bold">
                   {tag}
                 </span>
               ))}
            </div>
          </div>
        </div>

        {/* Surface Shine Effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full" />
      </div>
    </div>
  );
};

export default ReflectiveCard;
