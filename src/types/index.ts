export type Language = 'en' | 'bn';

export type CategoryKey = 'all' | 'apparel' | 'gadgets' | 'leather' | 'accessories';

export interface Product {
  id: string;
  name: {
    en: string;
    bn: string;
  };
  category: 'apparel' | 'gadgets' | 'leather' | 'accessories';
  price: number;
  originalPrice?: number;
  images: string[];
  shortDescription: {
    en: string;
    bn: string;
  };
  description: {
    en: string;
    bn: string;
  };
  features: {
    en: string[];
    bn: string[];
  };
  sizes?: string[];
  colors?: {
    name: {
      en: string;
      bn: string;
    };
    hex: string;
  }[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  sku: string;
}

export interface CartItem {
  id: string; // unique item instance id (productId + size + color)
  productId: string;
  name: {
    en: string;
    bn: string;
  };
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type PaymentMethod = 'cod' | 'bkash_nagad' | 'gateway_sslcommerz';

export interface CustomerDetails {
  fullName: string;
  phone: string;
  district: string;
  fullAddress: string;
  orderNote?: string;
}

export interface PaymentDetails {
  provider: 'bKash' | 'Nagad';
  senderNumber: string;
  trxId: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string; // e.g. "BD-74912"
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentDetails?: PaymentDetails;
  status: OrderStatus;
}

export interface StoreSettings {
  storeName: {
    en: string;
    bn: string;
  };
  tagline: {
    en: string;
    bn: string;
  };
  merchantBkash: string;
  merchantNagad: string;
  dhakaDeliveryFee: number;
  outsideDhakaDeliveryFee: number;
  freeDeliveryThreshold: number;
  hotlinePhone: string;
  whatsappNumber: string;
  supportEmail: string;
  address: {
    en: string;
    bn: string;
  };
}
