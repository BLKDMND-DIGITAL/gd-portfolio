
import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, MapPin, Mail, Phone, Diamond, User } from 'lucide-react';

interface ReflectiveCardProps {
  overlayColor?: string;
  blurStrength?: number;
  color?: string;
}

const ReflectiveCard: React.FC<ReflectiveCardProps> = ({
  blurStrength = 8,
  color = "#ec9d34"
}) => {
  const [hasConsent, setHasConsent] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 853 }, // 3:4 aspect ratio
          frameRate: { ideal: 30 } 
        }, 
        audio: false 
      });
      setStream(mediaStream);
      setHasConsent(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.warn("Camera auto-start failed or denied. Surface remaining in standby.", err);
      setHasConsent(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setHasConsent(false);
  };

  // Auto-activate the surface on mount
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  useEffect(() => {
    let animationFrame: number;
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (hasConsent && canvas && video) {
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const render = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          // Base reflection processing
          ctx.filter = `blur(${blurStrength}px) grayscale(0.4) brightness(0.8) contrast(1.4)`;
          
          // Draw video flipped for mirror effect
          ctx.save();
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          ctx.restore();

          // Add liquid glass grain/noise
          ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
          for (let i = 0; i < 1000; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            ctx.fillRect(x, y, 1, 1);
          }

          // Subtle scanline overlay
          ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
          for (let i = 0; i < canvas.height; i += 4) {
            ctx.fillRect(0, i, canvas.width, 1);
          }
        }
        animationFrame = requestAnimationFrame(render);
      };
      render();
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [hasConsent, blurStrength]);

  return (
    <div className="relative w-full max-w-md aspect-[3/4] group perspective-1000">
      {/* Outer Adaptive Glow */}
      <div 
        className={`absolute -inset-4 rounded-[2.5rem] opacity-20 group-hover:opacity-40 transition-all duration-700 blur-3xl ${hasConsent ? 'animate-pulse' : ''}`}
        style={{ backgroundColor: color }}
      ></div>

      {/* Main Card Frame */}
      <div className="relative h-full w-full glass rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border border-white/10 transition-transform duration-500 group-hover:scale-[1.01] group-hover:-rotate-1">
        
        {/* Mirror/Reflective Layer */}
        <div className="absolute inset-0 z-0">
          {hasConsent ? (
            <>
              <video ref={videoRef} autoPlay playsInline muted className="hidden" />
              <canvas ref={canvasRef} className="w-full h-full object-cover" width={480} height={640} />
              {/* Dynamic Glass Lighting Overlays */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10" />
              <div className="absolute inset-0 bg-[#EC9D34]/5 mix-blend-color" />
            </>
          ) : (
            <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent animate-pulse" />
              <div className="text-center p-8 relative z-10">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                  <CameraOff className="w-8 h-8 text-white/20" />
                </div>
                <h3 className="text-white font-bold mb-2 tracking-tight">Surface Standby</h3>
                <p className="text-white/40 text-xs mb-8 max-w-[200px] mx-auto leading-relaxed">
                  Reflective mode requires camera access to visualize real-time presence.
                </p>
                <button 
                  onClick={startCamera}
                  className="px-6 py-2.5 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#EC9D34] hover:text-black transition-all shadow-xl"
                >
                  Force Activate
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Branding Overlays (Top) */}
        <div className="relative z-20 p-8 flex justify-between items-start">
          <div className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
            <Diamond className="w-6 h-6 text-[#EC9D34]" />
          </div>
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-[10px] font-mono font-bold text-white/40 tracking-widest uppercase">
              {hasConsent ? 'Live_Feed' : 'Static_Sync'}
            </span>
          </div>
        </div>

        {/* Identity Content (Bottom) */}
        <div className="relative z-20 p-10 mt-auto bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <div className="mb-6 relative">
            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl flex items-center justify-center overflow-hidden group/avatar">
               <User className="w-10 h-10 text-white/40 group-hover/avatar:scale-110 transition-transform" />
            </div>
            {hasConsent && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-black animate-pulse" />
            )}
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
               {['RAG', 'PYTHON', 'AI'].map(tag => (
                 <span key={tag} className="text-[9px] px-2 py-1 rounded bg-white/10 border border-white/10 text-white/60 font-mono font-bold">
                   {tag}
                 </span>
               ))}
            </div>
            {hasConsent && (
              <button 
                onClick={stopCamera}
                className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all border border-red-500/20"
                title="Deactivate Surface"
              >
                <CameraOff className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Surface Shine Effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full" />
      </div>
    </div>
  );
};

export default ReflectiveCard;
