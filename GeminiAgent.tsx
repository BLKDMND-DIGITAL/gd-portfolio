
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, User, Bot, Loader2, X } from 'lucide-react';
import { PROFILE, COMPETENCIES, ARCHITECTURE_SPECS } from './constants';

const GeminiAgent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      // Direct API key initialization following strictly defined guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = `
        You are the BLKDMND Identity Agent, representing Greg Dukes.
        Greg is a GenAI Software Engineer and AI Solutions Architect.
        
        SOURCE OF TRUTH (STRICT COMPLIANCE):
        - Profile: ${JSON.stringify(PROFILE)}
        - Competencies: ${JSON.stringify(COMPETENCIES)}
        - Architecture Specs: ${JSON.stringify(ARCHITECTURE_SPECS)}

        IDENTITY RULES:
        1. TRUTH ONLY: Never fabricate or embellish skills, projects, or metrics.
        2. KNOWLEDGE ISOLATION: If a user asks about something not in the Source of Truth, state politely that the specific detail is outside the verified "Visual Thesis" scope.
        3. NO PLACEHOLDERS: Do not use [name], [phone], or similar.
        4. TONE: Professional, architect-level, concise, and technically precise.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.1, // High precision
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't generate a response at this time.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "An error occurred while connecting to the agent. Please ensure your environment is configured correctly." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] glass rounded-2xl flex flex-col shadow-2xl z-[60] border border-white/20">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-semibold text-sm">BLKDMND Identity Agent</span>
        </div>
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center mt-10">
            <Bot className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/40 text-sm px-6 italic">
              "Ask me anything about Greg's technical competencies, architecture philosophy, or agent systems."
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-white text-black rounded-tr-none' 
                : 'bg-white/5 border border-white/10 text-white/80 rounded-tl-none'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
              <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Query Greg's competencies..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={isTyping}
            className="absolute right-2 top-1.5 p-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiAgent;
