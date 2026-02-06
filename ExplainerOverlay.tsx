
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, PlayCircle, Info } from 'lucide-react';
import { EXPLAINER_STEPS } from './constants';

interface ExplainerOverlayProps {
  onClose: () => void;
  theme?: 'light' | 'dark';
}

const ExplainerOverlay: React.FC<ExplainerOverlayProps> = ({ onClose, theme = 'dark' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<number>(0);
  const isDark = theme === 'dark';

  const totalSteps = EXPLAINER_STEPS.length;
  const currentStepData = EXPLAINER_STEPS[currentStep];

  useEffect(() => {
    startStep();
    return () => stopStep();
  }, [currentStep]);

  const startStep = () => {
    stopStep();
    setProgress(0);
    progressRef.current = 0;
    
    const duration = EXPLAINER_STEPS[currentStep].duration;
    const interval = 50; // Update every 50ms
    const stepIncrement = (interval / duration) * 100;

    timerRef.current = setInterval(() => {
      progressRef.current += stepIncrement;
      if (progressRef.current >= 100) {
        if (currentStep < totalSteps - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          onClose();
        }
      } else {
        setProgress(progressRef.current);
      }
    }, interval);
  };

  const stopStep = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className={`fixed inset-0 z-[120] flex items-center justify-center p-6 backdrop-blur-3xl animate-in fade-in duration-500 overflow-hidden ${
      isDark ? 'bg-black/95 text-white' : 'bg-white/95 text-black'
    }`}>
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[radial-gradient(circle_at_center,_#EC9D34_0%,_transparent_60%)] blur-[120px] animate-pulse ${
          isDark ? 'opacity-30' : 'opacity-10'
        }`} />
        <div className={`absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] ${
          isDark ? 'opacity-10' : 'opacity-5 invert'
        }`} />
      </div>

      {/* Progress Headers */}
      <div className="absolute top-12 left-0 right-0 px-12 flex gap-2">
        {EXPLAINER_STEPS.map((_, i) => (
          <div key={i} className={`flex-1 h-1 rounded-full overflow-hidden ${
            isDark ? 'bg-white/10' : 'bg-black/10'
          }`}>
            <div 
              className="h-full bg-[#EC9D34] transition-all duration-100 ease-linear"
              style={{ 
                width: i < currentStep ? '100%' : i === currentStep ? `${progress}%` : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      <button 
        onClick={onClose}
        className="absolute top-24 right-12 z-10 p-4 rounded-full glass hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
      >
        <X className="w-8 h-8 group-hover:rotate-90 transition-transform" />
      </button>

      {/* Main Content Area */}
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Visual Anchor */}
        <div className="hidden lg:flex justify-center items-center relative group">
          <div className={`absolute inset-0 bg-[#EC9D34]/20 rounded-full blur-[100px] group-hover:blur-[140px] transition-all duration-700 ${
            isDark ? 'opacity-100' : 'opacity-40'
          }`} />
          <div className="relative w-80 h-80 flex items-center justify-center">
             <img 
               src="https://imgur.com/CsdCOSI.png" 
               alt="BLKDMND LOGO" 
               className={`w-full h-full object-contain animate-in zoom-in-50 duration-1000 spin-slow ${
                 isDark ? '' : 'brightness-0'
               }`}
             />
             <div className="absolute inset-0 border-4 border-dashed border-[#EC9D34]/30 rounded-full animate-spin-slow" />
          </div>
        </div>

        {/* Narrative Section */}
        <div className="space-y-12 animate-in slide-in-from-right-20 duration-700">
           <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#EC9D34]/10 border border-[#EC9D34]/20 text-[#EC9D34] text-xs font-black tracking-[0.2em] uppercase">
                Step {currentStep + 1} // Phase: {currentStepData.title.toUpperCase()}
              </div>
              <h2 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none">
                {currentStepData.title.split(' ')[0]}<br/>
                <span className={`${isDark ? 'opacity-30' : 'opacity-40'} italic`}>{currentStepData.title.split(' ').slice(1).join(' ')}</span>
              </h2>
              <p className={`text-2xl leading-relaxed font-medium ${isDark ? 'opacity-60' : 'opacity-70'}`}>
                {currentStepData.description}
              </p>
           </div>

           <div className="flex flex-wrap gap-4">
              {currentStepData.tags.map(tag => (
                <span key={tag} className={`px-5 py-2 rounded-xl glass font-mono text-sm tracking-widest font-bold ${
                  isDark ? 'opacity-80' : 'opacity-90'
                }`}>
                   {tag}
                </span>
              ))}
           </div>

           <div className={`flex items-center gap-8 pt-12 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <div className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-2xl bg-[#EC9D34]/10 flex items-center justify-center text-[#EC9D34] border border-[#EC9D34]/20">
                    {currentStepData.icon}
                 </div>
                 <div>
                    <p className={`text-[10px] uppercase font-bold tracking-widest ${isDark ? 'opacity-40' : 'opacity-50'}`}>Operational Status</p>
                    <p className="font-bold text-lg tracking-tight">PROTOTYPE_STABLE</p>
                 </div>
              </div>
              <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
              <button 
                onClick={() => {
                  if (currentStep < totalSteps - 1) setCurrentStep(s => s + 1);
                  else onClose();
                }}
                className="flex items-center gap-2 text-[#EC9D34] font-black uppercase text-sm hover:translate-x-2 transition-transform active:scale-95"
              >
                Skip Phase <ChevronRight className="w-5 h-5" />
              </button>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ExplainerOverlay;
