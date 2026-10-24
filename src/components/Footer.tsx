import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
} from 'lucide-react';
import { Language, StoreSettings } from '../types';
import { t } from '../data/translations';

interface FooterProps {
  lang: Language;
  settings: StoreSettings;
  onNavigate: (view: string, category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, settings, onNavigate }) => {
  const currentT = t[lang];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                {currentT.storeName}
              </span>
              <span className="text-base font-semibold text-amber-400">
                {currentT.storeSuffix}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {currentT.footerAbout}
            </p>

            {/* Nationwide Delivery Notice */}
            <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <Truck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {lang === 'bn'
                  ? 'বাংলাদেশের ৬৪ জেলায় দ্রুত ও নিরাপদ হোম ডেলিভারি'
                  : 'Fast & Secure Home Delivery to all 64 Districts across Bangladesh'}
              </span>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {currentT.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {currentT.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {currentT.shop}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'apparel')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {currentT.apparel}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'gadgets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {currentT.gadgets}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'leather')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {currentT.leather}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care & Policy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {currentT.customerCare}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-400">{currentT.codTitle}</span>
              </li>
              <li>
                <span className="text-slate-400">{currentT.returnPolicy}</span>
              </li>
              <li>
                <span className="text-slate-400">
                  {lang === 'bn' ? 'ঢাকার ভিতরে ২৪ ঘণ্টার ডেলিভারি' : 'Next-Day Delivery inside Dhaka'}
                </span>
              </li>
              <li>
                <span className="text-slate-400">{currentT.privacyPolicy}</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {currentT.contact}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.address[lang] || settings.address.en}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`tel:${settings.hotlinePhone}`}
                  className="font-mono hover:text-white transition-colors"
                >
                  {settings.hotlinePhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${settings.supportEmail}`}
                  className="hover:text-white transition-colors truncate"
                >
                  {settings.supportEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/50 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Partners & Supported Methods */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs font-semibold text-slate-400">
              {currentT.paymentPartners}:
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              {/* COD */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300">
                <Banknote className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cash on Delivery</span>
              </div>
              {/* bKash */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#E2136E]/20 border border-[#E2136E]/40 text-[11px] font-bold text-[#E2136E]">
                <Smartphone className="w-3.5 h-3.5" />
                <span>bKash</span>
              </div>
              {/* Nagad */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#F7941D]/20 border border-[#F7941D]/40 text-[11px] font-bold text-[#F7941D]">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Nagad</span>
              </div>
              {/* SSLCommerz Gateway Ready */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-400">
                <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                <span>SSLCommerz (Cards & Net Banking)</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right text-xs text-slate-500">
            <p>{currentT.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
