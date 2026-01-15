
import React, { useState } from 'react';
import { ProductItem, GenerationConfig, MarblingLevel, ProductCategory } from '../types';
import { generateHanwooImage } from '../services/gemini';
import { Sparkles, Camera, Plus, ShoppingCart } from 'lucide-react';

interface StoreItemProps {
  item: ProductItem;
  onAddToCart?: () => void;
}

const StoreItem: React.FC<StoreItemProps> = ({ item, onAddToCart }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(item.imageUrl);
  const [loading, setLoading] = useState(false);

  const handleGeneratePhoto = async () => {
    setLoading(true);
    try {
      const config: GenerationConfig = {
        cut: item.type,
        marbling: MarblingLevel.ULTRA,
        garnish: true,
        cookingState: 'raw',
        isCeremonial: item.category === ProductCategory.CEREMONIAL
      };
      const url = await generateHanwooImage(config);
      setImageUrl(url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group flex flex-col bg-transparent text-left animate-fade-in h-full">
      {/* Product Image Area: 4:5 Aspect Ratio for Premium Look */}
      <div className="aspect-[4/5] relative bg-[#0a0a0a] border border-white/10 mb-6 md:mb-10 overflow-hidden shadow-2xl transition-all group-hover:border-[#d4af37]/50">
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
            <div className="w-12 h-12 border-4 border-t-[#d4af37] border-white/10 rounded-full animate-spin mb-6"></div>
            <span className="text-[11px] text-[#d4af37] font-black tracking-[0.4em] uppercase animate-pulse">AI Photo Studio</span>
          </div>
        )}
        
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
            <Camera className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 font-light" />
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] font-bold">Image Generating...</span>
          </div>
        )}

        {/* Status Badges */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10 flex flex-col gap-2 md:gap-3">
          <div className="bg-black/80 backdrop-blur-xl border-2 border-[#d4af37]/60 text-[#d4af37] text-[10px] md:text-[12px] font-black px-3 py-1.5 md:px-5 md:py-2 uppercase tracking-widest shadow-2xl">
            1++ NO.9
          </div>
          {item.category === ProductCategory.RAW && (
            <div className="bg-[#a41b1b]/90 backdrop-blur-xl text-white text-[10px] md:text-[11px] font-black px-3 py-1.5 md:px-5 md:py-2 uppercase tracking-widest shadow-2xl">
              당일도축 한정
            </div>
          )}
        </div>

        {/* Artistic AI Trigger Overlay */}
        <button 
          onClick={handleGeneratePhoto}
          className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 backdrop-blur-[3px] transition-all duration-700 active:opacity-100" // active:opacity-100 for mobile touch
        >
          <div className="flex flex-col items-center gap-4 md:gap-6 transform translate-y-6 group-hover:translate-y-0 transition-transform">
            <div className="bg-[#d4af37] p-5 md:p-7 rounded-full shadow-[0_0_50px_rgba(212,175,55,0.6)] md:scale-110">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-black" />
            </div>
            <span className="text-white text-[12px] md:text-[14px] font-black tracking-[0.4em] uppercase shadow-text">AI 장인 촬영 시작</span>
          </div>
        </button>
      </div>

      {/* Product Content */}
      <div className="flex flex-col flex-1 px-2 md:px-4">
        <div className="flex items-center gap-3 mb-2 md:mb-4">
          <div className="w-6 h-[2px] bg-[#d4af37]"></div>
          <span className="text-[11px] md:text-[13px] text-[#d4af37] font-bold tracking-[0.2em] uppercase">{item.category}</span>
        </div>
        
        <h4 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-4 md:mb-6 font-serif group-hover:text-[#d4af37] transition-colors leading-tight break-keep">
          {item.name}
        </h4>
        
        <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed mb-8 md:mb-12 flex-1 italic font-serif break-keep">
          "{item.description}"
        </p>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-t border-white/10 pt-6 md:pt-10 group-hover:border-[#d4af37]/30 transition-all gap-4">
          <div className="flex flex-col">
            <span className="text-neutral-500 text-[10px] md:text-[12px] font-bold uppercase tracking-widest mb-1 md:mb-2">Price</span>
            <span className="text-white font-serif text-2xl md:text-3xl font-black">{item.price}</span>
          </div>
          
          <button 
            onClick={onAddToCart}
            className="group/btn w-full lg:w-auto flex items-center justify-center gap-5 bg-[#d4af37] hover:bg-[#c49f32] text-black px-8 py-4 md:px-10 md:py-5 text-[12px] md:text-[14px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 rounded-sm"
          >
            <span>주문하기</span>
            <Plus className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:rotate-90 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
