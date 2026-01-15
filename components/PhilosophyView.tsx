
import React from 'react';
import { ArrowDown } from 'lucide-react';

const PhilosophyView: React.FC = () => {
  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center py-20 md:py-32 animate-fade-in overflow-hidden">
      {/* Background with slow ripple effect */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)] opacity-90"></div>
        {/* Animated Ink Blobs - Hidden/Simplified on Mobile to reduce clutter and GPU usage */}
        <div className="hidden md:block absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#1a1a1a] rounded-full blur-[150px] opacity-60 mix-blend-screen animate-blob"></div>
        <div className="hidden md:block absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-[#111] rounded-full blur-[120px] opacity-50 mix-blend-overlay animate-blob animation-delay-4000"></div>
        <div className="bg-hanji opacity-15 absolute inset-0 mix-blend-soft-light"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-10 text-center flex flex-col items-center max-w-5xl">
        
        {/* Main Hero Text - Responsive Typography */}
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black serif-font leading-[1.4] md:leading-[1.3] mb-12 md:mb-20 tracking-tighter word-keep break-keep">
          <span className="text-white block mb-2 opacity-90">당신의 혀끝에 닿는 찰나,</span>
          <span className="text-shimmer block py-1">우리가 고집한 원육의 진가</span>
          <span className="text-white block mt-2 opacity-90">가 증명됩니다.</span>
        </h2>

        {/* Essay Content - Increased Padding and Leading for Mobile */}
        <div className="max-w-3xl mx-auto text-neutral-400 font-serif leading-[2.2] md:leading-loose text-base md:text-xl space-y-8 md:space-y-12 px-2 md:px-0 opacity-0 animate-[fadeInUp_1.5s_cubic-bezier(0.2,1,0.3,1)_1.0s_forwards]">
          <p>
            소를 키우는 농부의 땀방울부터,<br/>
            가장 알맞은 숙성을 기다리는 고요한 시간,<br className="hidden md:block"/>
            그리고 불필요한 지방을 걷어내는 칼끝의 정교함까지.
          </p>
          
          <p>
            우리는 '효율'이라는 타협을 모릅니다.<br/>
            1++ 등급 중에서도 최상위, <strong className="text-[#d4af37] font-medium">BMS No.9</strong>이라는<br/>
            숫자 너머에 있는 <span className="text-neutral-200 border-b border-[#d4af37]/30 pb-1">생명의 존엄과 미식의 본질</span>을 탐구합니다.
          </p>

          <p>
             牛아韓이 선보이는 고기는 단순한 식재료가 아닙니다.<br/>
             자연이 내어준 시간에 인간의 정성을 더한<br/>
             하나의 <span className="text-[#d4af37] italic">작품(Masterpiece)</span>입니다.
          </p>
        </div>

        {/* Signature - Seal Style */}
        <div className="mt-20 md:mt-28 opacity-0 animate-[fadeInUp_1.5s_cubic-bezier(0.2,1,0.3,1)_2.0s_forwards]">
            <div className="flex flex-col items-center gap-6">
                {/* Red Seal (Nak-gwan) */}
                <div className="w-14 h-14 md:w-16 md:h-16 border-[3px] border-[#a41b1b]/80 rounded-sm flex items-center justify-center bg-[#a41b1b]/10 shadow-[0_0_20px_rgba(164,27,27,0.3)] rotate-3">
                     <span className="text-[#a41b1b] text-2xl md:text-3xl font-serif font-black writing-vertical text-orientation-upright leading-none pt-1">匠人</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="h-[1px] w-12 bg-[#d4af37] mb-3"></div>
                    <p className="text-[11px] md:text-[13px] tracking-[0.5em] uppercase text-[#d4af37] font-bold">Master Butcher</p>
                    <p className="text-lg md:text-xl serif-font text-white mt-2 font-light tracking-widest">Lee Sang-Jun</p>
                </div>
            </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-6 md:bottom-10 animate-bounce opacity-20 hover:opacity-50 transition-opacity cursor-pointer" 
        onClick={() => document.getElementById('footer')?.scrollIntoView({behavior: 'smooth'})}
      >
        <ArrowDown className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite alternate;
        }
        .animation-delay-4000 {
          animation-delay: 4000ms;
        }
        .word-keep {
          word-break: keep-all;
        }
        .writing-vertical {
            writing-mode: vertical-rl;
            text-orientation: upright;
        }
      `}</style>
    </div>
  );
};

export default PhilosophyView;
