
import React from 'react';
import { Coupon } from '../types';

interface CouponCardProps {
  coupon: Coupon;
  onClaim: (coupon: Coupon) => void;
  isClaimed: boolean;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon, onClaim, isClaimed }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-lg border-2 transition-all duration-300 ${isClaimed ? 'bg-gray-100 border-gray-200 grayscale' : `bg-white border-${coupon.color}-400 hover:scale-105`}`}>
      <div className={`p-6 border-b-2 border-dashed ${isClaimed ? 'border-gray-300' : `border-${coupon.color}-200`}`}>
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isClaimed ? 'bg-gray-300 text-gray-500' : `bg-${coupon.color}-100 text-${coupon.color}-600`}`}>
            Limited Edition
          </span>
          <i className={`fas fa-ticket-alt text-2xl ${isClaimed ? 'text-gray-400' : `text-${coupon.color}-500`}`}></i>
        </div>
        <h3 className="text-3xl font-extrabold text-gray-800 mb-1">{coupon.discount}</h3>
        <p className="text-sm font-semibold text-gray-600">{coupon.title}</p>
      </div>
      
      <div className="p-6">
        <p className="text-xs text-gray-500 mb-4">{coupon.description}</p>
        <button
          onClick={() => !isClaimed && onClaim(coupon)}
          disabled={isClaimed}
          className={`w-full py-3 rounded-xl font-bold transition-all duration-200 ${
            isClaimed 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : `bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:shadow-xl active:scale-95`
          }`}
        >
          {isClaimed ? '받기 완료' : '쿠폰 받기'}
        </button>
      </div>

      {/* Notch elements for coupon look */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-gray-50 rounded-r-full border-r border-t border-b border-gray-200"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-gray-50 rounded-l-full border-l border-t border-b border-gray-200"></div>
    </div>
  );
};

export default CouponCard;
