import React, { useState } from 'react';
import { ShoppingBag, Globe, Menu, X, Shield, Search, Heart, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { t } from '../data/translations';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  currentView: string;
  onNavigate: (view: string, categoryFilter?: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  currentView,
  onNavigate,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const currentT = t[lang];

  const handleNavClick = (view: string, category?: string) => {
    onNavigate(view, category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-[#070f1e] text-slate-300 text-[11px] sm:text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2 border-b border-slate-800">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span>
          {lang === 'bn'
            ? '🚚 ৩,০০০ টাকার অর্ডারে সারা দেশে ফ্রি ডেলিভারি · ক্যাশ অন ডেলিভারি ও বিকাশ/নগদে সুবিধা'
            : '🚚 Free Delivery Nationwide on orders over ৳3,000 · Cash on Delivery & bKash/Nagad accepted'}
        </span>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand) — Zone 2 (Links) — Zone 3 (Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-6 h-16 sm:h-20">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus:outline-none flex items-center gap-2 sm:gap-2.5"
              aria-label="Nokkhotro Lifestyle Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#0b1a30] to-[#162f58] text-amber-400 flex items-center justify-center shadow-md border border-slate-700/40 shrink-0">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
              </div>
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="text-base sm:text-2xl font-black tracking-tight text-[#070f1e] group-hover:text-blue-900 transition-colors">
                  {currentT.storeName}
                </span>
                <span className="hidden sm:inline text-xs sm:text-sm font-bold tracking-wider text-amber-600 uppercase">
                  {currentT.storeSuffix}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (single-line, whitespace-nowrap) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-950 cursor-pointer ${
                currentView === 'home'
                  ? 'text-blue-950 font-bold underline underline-offset-8 decoration-2 decoration-amber-500'
                  : ''
              }`}
            >
              {currentT.home}
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-950 cursor-pointer ${
                currentView === 'shop'
                  ? 'text-blue-950 font-bold underline underline-offset-8 decoration-2 decoration-amber-500'
                  : ''
              }`}
            >
              {currentT.shop}
            </button>
            <button
              onClick={() => handleNavClick('shop', 'apparel')}
              className="hover:text-blue-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {currentT.apparel}
            </button>
            <button
              onClick={() => handleNavClick('shop', 'gadgets')}
              className="hover:text-blue-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {currentT.gadgets}
            </button>
            <button
              onClick={() => handleNavClick('shop', 'leather')}
              className="hover:text-blue-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {currentT.leather}
            </button>
          </nav>

          {/* Zone 3: Actions (Search, Wishlist, Language toggle, Admin, Bag) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search expander toggle */}
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (currentView !== 'shop') onNavigate('shop');
              }}
              className="p-2.5 text-slate-600 hover:text-blue-950 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle search"
              title="Search collection"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              aria-label={`Wishlist with ${wishlistCount} items`}
              title={currentT.wishlist}
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-[10px] font-bold bg-rose-500 text-white rounded-full tabular-nums shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold text-slate-700 hover:text-blue-950 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all cursor-pointer border border-slate-200 shrink-0"
              title="Change Language / ভাষা পরিবর্তন করুন"
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-blue-900" />
              <span className="tracking-wide">
                {lang === 'en' ? 'বাংলা' : 'EN'}
              </span>
            </button>

            {/* Admin shortcut (desktop only, accessible in mobile menu) */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`hidden sm:flex p-2.5 text-slate-600 hover:text-blue-950 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer ${
                currentView === 'admin' ? 'bg-slate-100 text-blue-950' : ''
              }`}
              title={currentT.admin}
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-[#070f1e] hover:bg-[#0b1a30] rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
              aria-label={`Open Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="hidden sm:inline">{currentT.cart}</span>
              <span className="inline-flex items-center justify-center min-w-[1.125rem] sm:min-w-[1.25rem] h-4.5 sm:h-5 px-1 text-[11px] sm:text-xs font-black bg-amber-400 text-slate-950 rounded-full tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Open mobile navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search bar dropdown/in-line */}
        {searchOpen && (
          <div className="py-3 pb-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentView !== 'shop') onNavigate('shop');
                }}
                placeholder={currentT.searchPlaceholder}
                className="w-full pl-10 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all placeholder:text-slate-400"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-5 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1 text-sm font-bold text-slate-800">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              {currentT.home}
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              {currentT.shop}
            </button>
            <button
              onClick={() => handleNavClick('shop', 'apparel')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 text-slate-600 cursor-pointer pl-6"
            >
              ↳ {currentT.apparel}
            </button>
            <button
              onClick={() => handleNavClick('shop', 'gadgets')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 text-slate-600 cursor-pointer pl-6"
            >
              ↳ {currentT.gadgets}
            </button>
            <button
              onClick={() => handleNavClick('shop', 'leather')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 text-slate-600 cursor-pointer pl-6"
            >
              ↳ {currentT.leather}
            </button>
            <button
              onClick={() => {
                onOpenWishlist();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 text-slate-700 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>{currentT.wishlist}</span>
              </div>
              {wishlistCount > 0 && (
                <span className="px-2 py-0.5 text-xs bg-rose-100 text-rose-600 rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 text-blue-900 cursor-pointer flex items-center gap-2 border-t border-slate-100 mt-2 pt-3"
            >
              <Shield className="w-4 h-4" />
              <span>{currentT.admin}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
