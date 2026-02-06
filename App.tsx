
import React, { useState } from 'react';
import CouponCard from './components/CouponCard';
import CountdownTimer from './components/CountdownTimer';
import { generateLuckyMessage } from './services/geminiService';
import { Coupon, LuckyMessageResponse } from './types';

const INITIAL_COUPONS: Coupon[] = [
  { id: '1', title: '첫 구매 감사 쿠폰', discount: '20%', description: '모든 상품 대상, 5만원 이상 구매 시', expiryDate: '2025-12-31', color: 'orange' },
  { id: '2', title: '주말 깜짝 할인', discount: '10,000원', description: '앱 전용, 3만원 이상 구매 시', expiryDate: '2025-06-30', color: 'pink' },
  { id: '3', title: '무료 배송권', discount: 'FREE', description: '지역 제한 없음, 전 품목 가능', expiryDate: '2025-12-31', color: 'indigo' },
];

const App: React.FC = () => {
  const [claimedIds, setClaimedIds] = useState<string[]>([]);
  const [luckyData, setLuckyData] = useState<LuckyMessageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClaim = async (coupon: Coupon) => {
    setIsLoading(true);
    try {
      // Simulate network & Gemini call
      const res = await generateLuckyMessage("고객님", coupon.title);
      setLuckyData(res);
      setClaimedIds(prev => [...prev, coupon.id]);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">L</div>
          <span className="text-xl font-extrabold tracking-tighter text-gray-900 uppercase">LuckyFest</span>
        </div>
        <button className="text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors">이벤트 안내</button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 bg-gradient-to-b from-orange-50 to-white text-center overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 bg-orange-100 text-orange-600 text-sm font-bold rounded-full animate-bounce">
            🎉 2025년 새해 맞이 특별 이벤트
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            당신의 행운을<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">지금 바로 받으세요!</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            최대 50% 할인 혜택부터 무료 배송권까지,<br />
            Gemini AI가 전하는 행운의 메시지와 함께 특별한 쿠폰을 챙겨보세요.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">이벤트 종료까지 남은 시간</p>
            <CountdownTimer />
          </div>
        </div>

        {/* Floating Icons Background */}
        <i className="fas fa-gift absolute top-40 left-10 text-orange-200 text-6xl float-animation opacity-30 pointer-events-none"></i>
        <i className="fas fa-star absolute bottom-20 right-20 text-yellow-200 text-5xl float-animation opacity-40 pointer-events-none" style={{ animationDelay: '1s' }}></i>
        <i className="fas fa-heart absolute top-60 right-10 text-pink-200 text-4xl float-animation opacity-20 pointer-events-none" style={{ animationDelay: '2s' }}></i>
      </section>

      {/* Coupon Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <i className="fas fa-tags text-orange-500"></i>
          준비된 특별 쿠폰
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_COUPONS.map(coupon => (
            <CouponCard 
              key={coupon.id} 
              coupon={coupon} 
              onClaim={handleClaim} 
              isClaimed={claimedIds.includes(coupon.id)} 
            />
          ))}
        </div>
      </section>

      {/* Event Details Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6">꼭 확인하세요!</h3>
            <ul className="space-y-4 text-gray-400 text-sm md:text-base">
              <li className="flex gap-3">
                <i className="fas fa-check-circle text-orange-400 mt-1"></i>
                <span>본 이벤트는 계정당 각 쿠폰별 1회만 참여 가능합니다.</span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-check-circle text-orange-400 mt-1"></i>
                <span>다운로드한 쿠폰은 '마이페이지 &gt; 쿠폰함'에서 확인 가능합니다.</span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-check-circle text-orange-400 mt-1"></i>
                <span>쿠폰 사용 기간은 발급일로부터 7일 이내입니다.</span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-check-circle text-orange-400 mt-1"></i>
                <span>행운의 메시지는 Gemini AI에 의해 실시간으로 생성됩니다.</span>
              </li>
            </ul>
          </div>
          <i className="fas fa-info-circle absolute -bottom-10 -right-10 text-gray-800 text-[180px] opacity-20 pointer-events-none"></i>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 border-t border-gray-100">
        <p className="text-gray-400 text-sm">© 2025 LuckyFest Inc. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="text-gray-400 hover:text-orange-500"><i className="fab fa-instagram text-xl"></i></a>
          <a href="#" className="text-gray-400 hover:text-orange-500"><i className="fab fa-twitter text-xl"></i></a>
          <a href="#" className="text-gray-400 hover:text-orange-500"><i className="fab fa-facebook text-xl"></i></a>
        </div>
      </footer>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-orange-600 font-bold animate-pulse">Gemini가 당신의 행운을 불러오는 중...</p>
        </div>
      )}

      {/* Success Modal */}
      {showModal && luckyData && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-8 text-center text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
                <i className="fas fa-check text-3xl"></i>
              </div>
              <h4 className="text-2xl font-bold mb-1">쿠폰 발급 완료!</h4>
              <p className="text-orange-100 text-sm">행운이 함께하는 특별한 하루 되세요</p>
            </div>
            
            <div className="p-8">
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded uppercase">AI 행운 메시지</span>
                </div>
                <p className="text-gray-800 font-medium leading-relaxed italic mb-4">
                  "{luckyData.message}"
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-orange-200/50">
                  <div className="text-center">
                    <span className="block text-[10px] text-gray-500 uppercase font-bold">Lucky Number</span>
                    <span className="text-xl font-black text-orange-600">{luckyData.luckyNumber}</span>
                  </div>
                  <div className="text-right flex-1 ml-4">
                    <span className="block text-[10px] text-gray-500 uppercase font-bold">Shopping Tip</span>
                    <span className="text-xs text-gray-600 font-semibold">{luckyData.recommendation}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setShowModal(false)}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;
