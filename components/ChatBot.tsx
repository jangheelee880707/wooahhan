
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, User, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: '안녕하십니까. 牛아韓의 마스터 부처, 이 상 준입니다. 오늘 어떤 한우를 찾으십니까? 최고의 한우로 귀하의 품격을 증명해 드리겠습니다.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })).concat([{ role: 'user', parts: [{ text: userMessage }] }]),
        config: {
          systemInstruction: `당신은 대한민국 최고급 한우 전문점 '牛아韓(우아한)'의 마스터 부처 '이 상 준'입니다. 
          고객의 질문에 매우 정중하고 신뢰감 있는 어조로 답변하십시오. 
          우리는 오직 1++ No.9 등급(BMS 9)의 눈꽃 마블링이 피어난 최상급 한우만을 취급하며, 장인의 칼끝에서 완성되는 신선함을 가장 중요하게 여깁니다.`,
        },
      });

      const aiResponse = response.text || "죄송합니다. 통신이 지연되었습니다. 잠시 후 다시 말씀해 주시겠습니까?";
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "상담량이 많아 답변이 늦어지고 있습니다. 잠시만 기다려 주십시오." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-36 right-12 z-[70] w-[420px] h-[650px] bg-[#0a0a0a] border-2 border-[#d4af37]/40 rounded-lg flex flex-col shadow-[0_40px_120px_rgba(0,0,0,1)] overflow-hidden animate-fade-in">
      <div className="bg-[#050403] p-6 border-b-2 border-[#d4af37]/20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#d4af37] rounded-md flex items-center justify-center font-serif font-black text-[#050403] text-2xl">牛</div>
          <div>
            <span className="text-white font-black text-lg block serif-font">장인 실시간 상담</span>
            <span className="text-[11px] text-[#d4af37] font-bold uppercase tracking-widest">Master Butcher Online</span>
          </div>
        </div>
        <button onClick={onClose} className="text-neutral-500 hover:text-white transition-all"><X className="w-8 h-8" /></button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/40">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[88%] p-5 rounded-lg text-base leading-relaxed shadow-lg ${msg.role === 'user' ? 'bg-[#d4af37] text-black font-bold' : 'bg-white/10 text-neutral-100 border-l-4 border-[#d4af37] font-serif'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-5 border-l-4 border-[#d4af37] flex items-center gap-4 rounded-r-lg">
              <Loader2 className="w-5 h-5 text-[#d4af37] animate-spin" />
              <span className="text-[13px] text-neutral-400 font-serif">장인이 답변을 작성 중입니다...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t-2 border-white/5 bg-[#080808]">
        <div className="relative flex items-center">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="장인에게 궁금한 점을 물어보세요..."
            className="w-full bg-white/5 border-2 border-white/10 p-5 pr-16 rounded-md outline-none focus:border-[#d4af37] text-base text-white font-serif placeholder:text-neutral-700 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-5 text-[#d4af37] disabled:opacity-20 transition-opacity"
            aria-label="Send message"
          >
            <Send className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
