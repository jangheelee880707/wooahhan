
import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  totalPrice: number;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  totalPrice 
}) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 z-[90] h-full w-full md:w-[480px] bg-[#0a0a0a] border-l border-[#d4af37]/30 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] transform transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#050403]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[#d4af37]" />
            <span className="text-xl font-black serif-font text-white tracking-widest">장바구니</span>
            <span className="text-[#d4af37] font-bold">({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <ShoppingBag className="w-20 h-20 mb-6 text-neutral-600" />
              <p className="text-xl font-serif text-neutral-300 mb-2">장바구니가 비어있습니다.</p>
              <p className="text-sm text-neutral-500">최상급 한우의 품격을 담아보세요.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-lg border border-white/5 hover:border-[#d4af37]/30 transition-colors">
                {/* Thumbnail (using generic placeholder if no AI image generated yet) */}
                <div className="w-24 h-24 bg-black rounded-md border border-white/10 overflow-hidden flex-shrink-0">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                      <span className="text-[#d4af37] text-xs font-bold">No Image</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-white font-bold serif-font leading-tight mb-1">{item.name}</h4>
                    <p className="text-neutral-400 text-xs">{item.category}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[#d4af37] font-bold">{item.price}</span>
                    
                    <div className="flex items-center gap-3 bg-black border border-white/10 rounded-full px-2 py-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="text-neutral-600 hover:text-[#a41b1b] transition-colors self-start p-1"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-[#050403] border-t border-white/10 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-neutral-400 text-sm">
                <span>상품 금액</span>
                <span>₩{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400 text-sm">
                <span>배송비 (신선 냉장)</span>
                <span>₩3,500</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <span className="text-white font-bold text-lg">결제 예정 금액</span>
                <span className="text-[#d4af37] font-black text-2xl serif-font">₩{(totalPrice + 3500).toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={onCheckout}
              className="w-full py-5 bg-[#d4af37] hover:bg-[#c49f32] text-black font-black text-lg uppercase tracking-widest transition-all flex items-center justify-center gap-3 group"
            >
              <span>주문하기</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
