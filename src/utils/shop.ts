import { CartItem, Language } from '../types';

/**
 * Validates a Bangladeshi mobile phone number.
 * Accepts formats:
 * - 01712345678 (11 digits, starts with 01[3-9])
 * - +8801712345678 (starts with +8801[3-9])
 * - 8801712345678 (starts with 8801[3-9])
 * Strips whitespace, hyphens, and parentheses first.
 */
export function validateBdPhone(rawPhone: string): boolean {
  if (!rawPhone) return false;
  const cleaned = rawPhone.replace(/[\s\-()]/g, '');
  // Standard Bangladeshi mobile prefixes: 013, 014, 015, 016, 017, 018, 019
  const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
  return bdPhoneRegex.test(cleaned);
}

/**
 * Validates bKash / Nagad Transaction ID (TrxID)
 * Typically 8 to 14 alphanumeric characters.
 */
export function validateTrxId(rawTrxId: string): boolean {
  if (!rawTrxId) return false;
  const trimmed = rawTrxId.trim();
  const trxRegex = /^[A-Za-z0-9]{8,14}$/;
  return trxRegex.test(trimmed);
}

/**
 * Converts English numeral digits (0-9) to Bengali numeral digits (০-৯).
 */
export function toBengaliDigits(input: number | string): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(input).replace(/[0-9]/g, (match) => bnDigits[Number(match)]);
}

/**
 * Formats a monetary BDT amount according to language.
 * e.g. ৳1,450 in English or ৳ ১,৪৫০ in Bangla.
 */
export function formatBdt(amount: number, lang: Language = 'en'): string {
  const rounded = Math.round(amount);
  const formattedWithCommas = rounded.toLocaleString('en-IN');
  if (lang === 'bn') {
    return `৳ ${toBengaliDigits(formattedWithCommas)}`;
  }
  return `৳${formattedWithCommas}`;
}

/**
 * Calculates delivery fee based on district and free delivery threshold.
 */
export function calculateDeliveryFee(
  district: string,
  subtotal: number,
  freeThreshold = 3000,
  dhakaFee = 70,
  outsideDhakaFee = 130
): number {
  if (subtotal >= freeThreshold && subtotal > 0) {
    return 0;
  }
  const normalized = district.trim().toLowerCase();
  if (normalized === 'dhaka' || normalized === 'ঢাকা') {
    return dhakaFee;
  }
  return outsideDhakaFee;
}

/**
 * Calculates cart subtotal, delivery fee, and grand total.
 */
export function calculateCartTotals(
  items: CartItem[],
  district = 'Dhaka',
  freeThreshold = 3000
) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryFee = items.length === 0 ? 0 : calculateDeliveryFee(district, subtotal, freeThreshold);
  const grandTotal = subtotal + deliveryFee;
  const remainingForFreeDelivery = Math.max(0, freeThreshold - subtotal);

  return {
    subtotal,
    deliveryFee,
    grandTotal,
    totalItemsCount,
    remainingForFreeDelivery,
    isFreeDelivery: subtotal >= freeThreshold && subtotal > 0,
  };
}

/**
 * Generates an order ID like "BD-84920"
 */
export function generateOrderId(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `BD-${randomNum}`;
}

/**
 * 64 Districts of Bangladesh with English and Bangla names
 */
export interface DistrictOption {
  value: string;
  en: string;
  bn: string;
  isDhaka: boolean;
}

export const BANGLADESH_DISTRICTS: DistrictOption[] = [
  { value: 'Dhaka', en: 'Dhaka', bn: 'ঢাকা', isDhaka: true },
  { value: 'Gazipur', en: 'Gazipur', bn: 'গাজীপুর', isDhaka: false },
  { value: 'Narayanganj', en: 'Narayanganj', bn: 'নারায়ণগঞ্জ', isDhaka: false },
  { value: 'Chattogram', en: 'Chattogram', bn: 'চট্টগ্রাম', isDhaka: false },
  { value: 'Sylhet', en: 'Sylhet', bn: 'সিলেট', isDhaka: false },
  { value: 'Rajshahi', en: 'Rajshahi', bn: 'রাজশাহী', isDhaka: false },
  { value: 'Khulna', en: 'Khulna', bn: 'খুলনা', isDhaka: false },
  { value: 'Barishal', en: 'Barishal', bn: 'বরিশাল', isDhaka: false },
  { value: 'Rangpur', en: 'Rangpur', bn: 'রংপুর', isDhaka: false },
  { value: 'Mymensingh', en: 'Mymensingh', bn: 'ময়মনসিংহ', isDhaka: false },
  { value: 'Bogura', en: 'Bogura', bn: 'বগুড়া', isDhaka: false },
  { value: 'Cumilla', en: 'Cumilla', bn: 'কুমিল্লা', isDhaka: false },
  { value: "Cox's Bazar", en: "Cox's Bazar", bn: 'কক্সবাজার', isDhaka: false },
  { value: 'Brahmanbaria', en: 'Brahmanbaria', bn: 'ব্রাহ্মণবাড়িয়া', isDhaka: false },
  { value: 'Tangail', en: 'Tangail', bn: 'টাঙ্গাইল', isDhaka: false },
  { value: 'Jessore', en: 'Jessore', bn: 'যশোর', isDhaka: false },
  { value: 'Pabna', en: 'Pabna', bn: 'পাবনা', isDhaka: false },
  { value: 'Dinajpur', en: 'Dinajpur', bn: 'দিনাজপুর', isDhaka: false },
  { value: 'Kushtia', en: 'Kushtia', bn: 'কুষ্টিয়া', isDhaka: false },
  { value: 'Faridpur', en: 'Faridpur', bn: 'ফরিদপুর', isDhaka: false },
  { value: 'Noakhali', en: 'Noakhali', bn: 'নোয়াখালী', isDhaka: false },
  { value: 'Feni', en: 'Feni', bn: 'ফেনী', isDhaka: false },
];
