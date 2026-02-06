
export interface Coupon {
  id: string;
  title: string;
  discount: string;
  description: string;
  expiryDate: string;
  color: string;
}

export interface LuckyMessageResponse {
  message: string;
  luckyNumber: number;
  recommendation: string;
}
