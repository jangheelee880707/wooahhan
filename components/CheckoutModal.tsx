
import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, Landmark, Truck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPrice: number;
  onSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, totalPrice, onSuccess }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');

  if (!isOpen) return null;

  const handlePayment = () => {
    // Simulate processing
    setTimeout(() => {
      setStep(3);
    }, 1500);
  };

  const handleClose = () => {
    if (step === 3) onSuccess(); // Clear cart on success close
    onClose();
    setTimeout(() => setStep(1), 500); // Reset step after closing
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-lg shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#050403]">
          <h2 className="text-2xl font-black serif-font text-white">
            {step === 1 && '주문서 작성'}
            {step === 2 && '결제 하기'}
            {step === 3 && '주문 완료'}
          </h2>
          {step !== 3 && (
            <button onClick={handleClose} className="text-neutral-500 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {step === 1 && (
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="space-y-4">
                <h3 className="text-[#d4af37] text-xs font-bold uppercase tracking-widest">배송 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="수령인 성함" required className="w-full bg-black border border-white/20 p-4 text-white focus:border-[#d4af37] outline-none rounded-md" />
                  <input type="tel" placeholder="연락처" required className="w-full bg-black border border-white/20 p-4 text-white focus:border-[#d4af37] outline-none rounded-md" />
                </div>
                <input type="text" placeholder="주소" required className="w-full bg-black border border-white/20 p-4 text-white focus:border-[#d4af37] outline-none rounded-md" />
                <input type="text" placeholder="상세 주소" required className="w-full bg-black border border-white/20 p-4 text-white focus:border-[#d4af37] outline-none rounded-md" />
              </div>

              <div className="space-y-4">
                <h3 className="text-[#d4af37] text-xs font-bold uppercase tracking-widest">배송 요청사항</h3>
                <textarea rows={2} placeholder="부재시 문 앞에 놓아주세요." className="w-full bg-black border border-white/20 p-4 text-white focus:border-[#d4af37] outline-none rounded-md resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-[#d4af37] text-black font-black py-5 text-lg rounded-md hover:bg-[#c49f32] transition-colors">
                결제 단계로 이동
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-8">
               <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                 <div className="flex justify-between text-neutral-300 mb-2">
                   <span>총 상품 금액</span>
                   <span>₩{totalPrice.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-neutral-300 mb-4">
                   <span>배송비</span>
                   <span>₩3,500</span>
                 </div>
                 <div className="flex justify-between text-white font-bold text-xl border-t border-white/10 pt-4">
                   <span>최종 결제 금액</span>
                   <span className="text-[#d4af37]">₩{(totalPrice + 3500).toLocaleString()}</span>
                 </div>
               </div>

               <div className="space-y-4">
                 <h3 className="text-[#d4af37] text-xs font-bold uppercase tracking-widest">결제 수단 선택</h3>
                 <div className="grid grid-cols-2 gap-4">
                   <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-6 border rounded-lg flex flex-col items-center gap-3 transition-all ${paymentMethod === 'card' ? 'border-[#d4af37] bg-[#d4af37]/10 text-white' : 'border-white/10 bg-black text-neutral-500 hover:border-white/30'}`}
                   >
                     <CreditCard className="w-8 h-8" />
                     <span className="font-bold">신용카드</span>
                   </button>
                   <button 
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-6 border rounded-lg flex flex-col items-center gap-3 transition-all ${paymentMethod === 'bank' ? 'border-[#d4af37] bg-[#d4af37]/10 text-white' : 'border-white/10 bg-black text-neutral-500 hover:border-white/30'}`}
                   >
                     <Landmark className="w-8 h-8" />
                     <span className="font-bold">무통장 입금</span>
                   </button>
                 </div>
               </div>

               <button onClick={handlePayment} className="w-full bg-[#d4af37] text-black font-black py-5 text-lg rounded-md hover:bg-[#c49f32] transition-colors shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                 ₩{(totalPrice + 3500).toLocaleString()} 결제하기
               </button>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center text-center py-10">
              <div className="w-24 h-24 bg-[#d4af37] rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(212,175,55,0.6)] animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-black" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 serif-font">주문이 완료되었습니다!</h3>
              <p className="text-neutral-400 mb-12 max-w-sm">
                장인의 손길로 정성스럽게 손질하여<br/>신선하고 안전하게 배송해 드리겠습니다.
              </p>
              
              <div className="bg-white/5 p-6 rounded-lg w-full mb-8">
                <div className="flex items-center gap-4 text-left">
                  <Truck className="w-8 h-8 text-[#d4af37]" />
                  <div>
                    <p className="text-white font-bold">내일 새벽 도착 예정</p>
                    <p className="text-neutral-500 text-sm">신선 택배 (오전 7시 전 도착)</p>
                  </div>
                </div>
              </div>

              <button onClick={handleClose} className="px-12 py-4 border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors uppercase tracking-widest font-bold text-sm">
                쇼핑 계속하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
