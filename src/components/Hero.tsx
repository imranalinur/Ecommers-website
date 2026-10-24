import React from 'react';
import { ArrowRight, Sparkles, Star, Zap, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { t } from '../data/translations';
import { STORE_IMAGES } from '../assets/images';

interface HeroProps {
  lang: Language;
  onExplore: () => void;
  onViewBestSellers: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onExplore, onViewBestSellers }) => {
  const currentT = t[lang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#070f1e] via-[#0b1a30] to-[#070f1e] text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Subtle editorial kicker badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentT.heroTag}</span>
            </div>

            {/* Headline with deliberate scale and line-height */}
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              {currentT.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              {currentT.heroSubtitle}
            </p>

            {/* Primary & Secondary Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExplore}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-2xl transition-all shadow-lg hover:shadow-amber-400/30 active:scale-95 cursor-pointer"
              >
                <span>{currentT.shopNowBtn}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewBestSellers}
                className="inline-flex items-center justify-center px-7 py-4 text-base font-bold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 rounded-2xl transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
              >
                {currentT.viewFeaturedBtn}
              </button>
            </div>

            {/* Trust highlights with micro icons */}
            <div className="pt-6 flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-slate-300 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-medium">
                  {lang === 'bn' ? 'ক্যাশ অন ডেলিভারি সুবিধা' : 'Cash on Delivery Guaranteed'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="font-medium">
                  {lang === 'bn' ? '৬৪ জেলায় দ্রুত ডেলিভারি' : 'Fast Delivery to 64 Districts'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="font-bold text-white tabular-nums">4.9/5</span>
                <span className="text-slate-400">
                  {lang === 'bn' ? '(২,০০০+ সন্তুষ্ট গ্রাহক)' : '(2k+ Shoppers)'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Image Showcase Column with Floating Highlights */}
          <div className="lg:col-span-5 relative">
            {/* Ambient halo behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-amber-500/20 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-950 group">
              <img
                src={STORE_IMAGES.hero}
                alt="Nokkhotro Lifestyle Handcrafted Collection"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070f1e]/90 via-transparent to-transparent pointer-events-none" />

              {/* Bottom bar inside hero image */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/70 flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-amber-400 font-extrabold">
                    {lang === 'bn' ? 'নবান্ন ও ঈদ স্পেশাল ২০২৬' : 'Signature Collection 2026'}
                  </p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {lang === 'bn' ? 'খাঁটি দেশীয় ঐতিহ্য ও গ্যাজেটস' : 'Authentic Bengal Craft & Tech'}
                  </p>
                </div>
                <button
                  onClick={onExplore}
                  className="px-4 py-2 text-xs font-bold bg-amber-400 text-slate-950 rounded-xl hover:bg-amber-300 transition-colors cursor-pointer shadow-sm"
                >
                  {lang === 'bn' ? 'কালেকশন' : 'Explore'}
                </button>
              </div>
            </div>

            {/* Floating Highlight Card 1: Top Right */}
            <div className="hidden sm:flex absolute -top-5 -right-4 p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700/90 shadow-xl items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div className="text-left text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-white">4.9</span>
                  <div className="flex text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                  </div>
                </div>
                <p className="text-slate-400 text-[11px]">
                  {lang === 'bn' ? 'সারা দেশে বিশ্বস্ত প্ল্যাটফর্ম' : 'Top Rated Store in BD'}
                </p>
              </div>
            </div>

            {/* Floating Highlight Card 2: Bottom Left */}
            <div className="hidden sm:flex absolute -bottom-5 -left-4 p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700/90 shadow-xl items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-left text-xs">
                <p className="font-extrabold text-white">
                  {lang === 'bn' ? '২৪ ঘণ্টায় এক্সপ্রেস ডেলিভারি' : 'Next-Day Delivery'}
                </p>
                <p className="text-slate-400 text-[11px]">
                  {lang === 'bn' ? 'ঢাকার মধ্যে পরের দিন পার্সেল' : 'Inside Dhaka Hub'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
