
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, Loader2, X } from 'lucide-react';
import { PROFILE, COMPETENCIES, ARCHITECTURE_SPECS } from './constants';

const GeminiAgent: React.FC<{ onClose: () => void, theme?: 'light' | 'dark' }> = ({ onClose, theme = 'dark' }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

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
          temperature: 0.1,
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't generate a response at this time.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "An error occurred. Please ensure your environment is configured correctly." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 w-96 h-[500px] rounded-2xl flex flex-col shadow-2xl z-[60] border transition-colors ${
      isDark ? 'bg-black/90 glass border-white/20' : 'bg-white border-black/10'
    }`}>
      <div className="p-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-bold text-sm tracking-tight">Identity Agent</span>
        </div>
        <button onClick={onClose} className="opacity-40 hover:opacity-100 transition-opacity">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center mt-10 space-y-4 px-6">
            <Bot className="w-12 h-12 opacity-10 mx-auto" />
            <p className="opacity-40 text-xs italic leading-relaxed">
              "Ask me about Greg's technical competencies, architecture philosophy, or multi-agent systems."
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-[#EC9D34] text-black font-semibold rounded-tr-none shadow-md' 
                : `${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'} border opacity-90 rounded-tl-none`
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'} border p-3 rounded-2xl rounded-tl-none`}>
              <Loader2 className="w-4 h-4 opacity-40 animate-spin" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-black/5 dark:border-white/10">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Query competencies..."
            className={`w-full border rounded-full py-3 px-5 pr-12 text-sm focus:outline-none transition-all ${
              isDark ? 'bg-white/5 border-white/10 focus:ring-white/20' : 'bg-black/5 border-black/10 focus:ring-black/5'
            }`}
          />
          <button 
            onClick={handleSend}
            disabled={isTyping}
            className="absolute right-2 top-1.5 p-2 bg-[#EC9D34] text-black rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiAgent;
