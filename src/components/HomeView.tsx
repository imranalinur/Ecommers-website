import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Star,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Headphones,
  Mail,
  Copy,
  Check,
} from 'lucide-react';
import { Product, Language, CategoryKey } from '../types';
import { Hero } from './Hero';
import { TrustBadges } from './TrustBadges';
import { ProductCard } from './ProductCard';
import { t } from '../data/translations';

interface HomeViewProps {
  products: Product[];
  lang: Language;
  wishlistIds: string[];
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  onSelectProduct: (p: Product) => void;
  onQuickAdd: (p: Product, e: React.MouseEvent) => void;
  onNavigate: (view: string, category?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  lang,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
  onNavigate,
}) => {
  const currentT = t[lang];

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Featured and New Arrivals
  const featuredProducts = products.filter((p) => p.isFeatured || p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival || !p.isBestSeller).slice(0, 4);

  const categories = [
    {
      key: 'apparel' as CategoryKey,
      title: lang === 'bn' ? 'ঐতিহ্যবাহী ও আধুনিক পোশাক' : 'Heritage & Modern Apparel',
      desc: lang === 'bn' ? 'খাঁটি সুতি পাঞ্জাবি, শাড়ি ও ক্যাজুয়াল পোলো' : 'Combed cotton Panjabis, Jamdani sarees & polos',
      image: '/src/assets/images/product_panjabi_premium_1792822457840.jpg',
      itemCount: products.filter((p) => p.category === 'apparel').length,
    },
    {
      key: 'gadgets' as CategoryKey,
      title: lang === 'bn' ? 'স্মার্ট গ্যাজেট ও ইলেকট্রনিক্স' : 'Smart Gadgets & Audio',
      desc: lang === 'bn' ? 'অ্যামোলেড কলিং স্মার্টওয়াচ ও এএনসি ইয়ারবাডস' : 'Bangla-ready smartwatches, ANC earbuds & PD power banks',
      image: '/src/assets/images/product_smartwatch_gadget_1792822458246.jpg',
      itemCount: products.filter((p) => p.category === 'gadgets').length,
    },
    {
      key: 'leather' as CategoryKey,
      title: lang === 'bn' ? 'খাঁটি চামড়ার পণ্য' : 'Handcrafted Leather Goods',
      desc: lang === 'bn' ? 'ফুল-গ্রেইন ওয়ালেট, বেল্ট ও ল্যাপটপ মেসেঞ্জার ব্যাগ' : 'Full-grain cowhide wallets, cardholders & messenger bags',
      image: '/src/assets/images/product_leather_wallet_1792822458880.jpg',
      itemCount: products.filter((p) => p.category === 'leather').length,
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
    }
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('NOKKHOTRO10');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Campaign Banner */}
      <Hero
        lang={lang}
        onExplore={() => onNavigate('shop')}
        onViewBestSellers={() => {
          const el = document.getElementById('featured-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Trust Badges (Cash on Delivery, Fast Delivery, Return, Authentic) */}
      <TrustBadges lang={lang} />

      {/* 3. Shop by Category / Department with Hover Zoom */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'ডিপার্টমেন্ট সম্ভার' : 'Browse Departments'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {currentT.categoriesHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'bn'
                ? 'আপনার পছন্দের ডিপার্টমেন্ট নির্বাচন করে শপিং শুরু করুন'
                : 'Select your preferred department to browse curated collections'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-950 hover:text-blue-900 transition-colors cursor-pointer group"
          >
            <span>{currentT.viewAll}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.key}
              onClick={() => onNavigate('shop', cat.key)}
              className="group relative rounded-3xl overflow-hidden bg-[#070f1e] border border-slate-200/90 shadow-luxury hover:shadow-luxury-hover transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-[16/11] w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-95"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#070f1e] via-[#070f1e]/40 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                  {cat.itemCount} {lang === 'bn' ? 'টি পণ্য' : 'Products'}
                </span>
                <h3 className="text-xl font-black mt-1 leading-snug group-hover:text-amber-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 line-clamp-1">{cat.desc}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                  <span>{lang === 'bn' ? 'কালেকশন দেখুন' : 'Explore Category'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Products Collection */}
      <section id="featured-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{lang === 'bn' ? 'সেরা চয়েস' : 'Top Selected'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {currentT.featuredHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {currentT.featuredSubheading}
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-950 hover:text-blue-900 transition-colors cursor-pointer group"
          >
            <span>{currentT.viewAll}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </section>

      {/* 5. Fresh New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'এই সপ্তাহের ড্রপ' : 'This Week'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {currentT.newArrivalsHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {currentT.newArrivalsSubheading}
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-950 hover:text-blue-900 transition-colors cursor-pointer group"
          >
            <span>{currentT.viewAll}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={`new-${product.id}`}
              product={product}
              lang={lang}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </section>

      {/* 6. Why Choose Us (The Nokkhotro Standard) */}
      <section className="bg-white border-y border-slate-200/80 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">
              {lang === 'bn' ? 'আস্থা ও নির্ভরতা' : 'Trust & Authenticity'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {currentT.whyChooseUsHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {currentT.whyChooseUsSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-900/10 text-blue-950 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {lang === 'bn' ? 'সরাসরি দেশীয় কারিগর' : 'Direct Artisan Roots'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'নারায়ণগঞ্জ ও টাঙ্গাইলের বিশ্বস্ত তাঁতি এবং হাজারীবাগের দক্ষ চামড়াশিল্পীদের সাথে সরাসরি পার্টনারশিপ।'
                  : 'Sourced directly from weavers in Narayanganj and leather crafters in Hazaribagh without intermediary markups.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {lang === 'bn' ? 'প্রি-শিপিং কোয়ালিটি চেক' : 'Double Quality Check'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'প্রতিটি পোশাক ও গ্যাজেট পার্সেল করার আগে বিশেষ কিউসি টিম দ্বারা চেক করে সিলগালা করা হয়।'
                  : 'Every electronic device and garment is thoroughly verified and certified before dispatching from our Dhaka hub.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {lang === 'bn' ? '৬৪ জেলায় দ্রুত সার্ভিস' : '64 Districts Express'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'ঢাকায় ২৪ ঘণ্টার মধ্যে এবং বাকি ৬৩ জেলায় ৪৮-৭২ ঘণ্টার হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি।'
                  : '24-hour next day service across Dhaka and 48-72h door-to-door courier reach throughout Bangladesh.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/10 text-purple-700 flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {lang === 'bn' ? 'ডেডিকেটেড সাপোর্ট' : 'Concierge Support'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'অর্ডার ট্র্যাকিং, সাইজ পরামর্শ বা যেকোনো অনুসন্ধানে সরাসরি ফোন কল ও হোয়াটসঅ্যাপ সুবিধা।'
                  : 'Direct WhatsApp and phone assistance for sizing guidance, delivery updates, and hassle-free returns.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Craftsmanship & Bengali Heritage Story (Dark Banner) */}
      <section className="bg-[#070f1e] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                {lang === 'bn' ? 'আমাদের গল্প ও প্রতিশ্রুতি' : 'Our Heritage & Promise'}
              </span>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-white"
                style={{ textWrap: 'balance' }}
              >
                {lang === 'bn'
                  ? 'দেশীয় ঐতিহ্যবাহী তাঁত ও আধুনিক প্রযুক্তির বিশ্বস্ত প্ল্যাটফর্ম'
                  : 'Bridging South Asian Textile Craft with Contemporary Electronics'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {lang === 'bn'
                  ? 'আমরা নারায়ণগঞ্জের তাঁতি, হাজারীবাগের চামড়া কারিগর এবং আন্তর্জাতিক মানের গ্যাজেট নির্মাতাদের সমন্বয়ে এমন একটি শপিং অভিজ্ঞতা তৈরি করেছি যাতে প্রতিটি পণ্যে আপনি পান সর্বোচ্চ সন্তুষ্টি ও নির্ভরতা।'
                  : 'We partner directly with weavers in Narayanganj and Tangail, leather craftsmen from Hazaribagh, and trusted consumer hardware providers to deliver authentic Bangladeshi lifestyle products without intermediate markup.'}
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {lang === 'bn'
                      ? 'প্রতিটি পণ্যে শতভাগ অথেন্টিসিটি ও প্রি-ডেলিভারি কোয়ালিটি চেক'
                      : '100% Quality Inspected before dispatching from our Dhaka hub'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {lang === 'bn'
                      ? 'ক্যাশ অন ডেলিভারি এবং বিকাশ/নগদে সুরক্ষিত ইনস্ট্যান্ট রিফান্ড নিশ্চয়তা'
                      : 'Hassle-free Cash on Delivery & fast verified bKash/Nagad transactions'}
                  </span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {currentT.shopNowBtn}
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl">
                <img
                  src="/src/assets/images/hero_bangladesh_store_1792822458300.jpg"
                  alt="Bangladeshi Artisanal Quality"
                  className="w-full h-84 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">
            {lang === 'bn' ? 'সরাসরি রিভিউ' : 'Customer Stories'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {lang === 'bn' ? 'গ্রাহকদের আস্থা ও মতামত' : 'Loved by Customers Across Bangladesh'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {lang === 'bn'
              ? 'সারাদেশে আমাদের হাজারো সন্তুষ্ট গ্রাহকের কিছু বাস্তব অভিজ্ঞতা'
              : 'Real reviews from verified shoppers in Dhaka, Chattogram, and beyond.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 bg-white rounded-3xl border border-slate-200/80 shadow-luxury space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              "{lang === 'bn'
                ? 'ঈদের জন্য পাঞ্জাবিটা অর্ডার করেছিলাম। কাপড় আর কলারের এমব্রয়ডারি সত্যিই দেখার মতো। ঢাকার মধ্যে ২৪ ঘণ্টায় ক্যাশ অন ডেলিভারিতে পেয়েছি।'
                : 'Ordered the embroidered cotton Panjabi. The fabric texture and finishing exceeded my expectations. Delivered in 24 hours in Dhanmondi.'}"
            </p>
            <div className="pt-3 border-t border-slate-100 text-xs">
              <p className="font-bold text-slate-900">Dr. Ashrafuzzaman</p>
              <p className="text-slate-400">Dhanmondi, Dhaka</p>
            </div>
          </div>

          <div className="p-7 bg-white rounded-3xl border border-slate-200/80 shadow-luxury space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              "{lang === 'bn'
                ? 'টাইটানিয়াম স্মার্টওয়াচে সুন্দর বাংলা নোটিফিকেশন আসে। বিকাশে পে করার পর ১০ মিনিটের মধ্যে কনফার্মেশন কল করেছিল।'
                : 'The Bangla font rendering on the AMOLED smartwatch is crisp and clear. bKash payment verification was lightning fast.'}"
            </p>
            <div className="pt-3 border-t border-slate-100 text-xs">
              <p className="font-bold text-slate-900">Mahmudul Hasan</p>
              <p className="text-slate-400">GEC Circle, Chattogram</p>
            </div>
          </div>

          <div className="p-7 bg-white rounded-3xl border border-slate-200/80 shadow-luxury space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              "{lang === 'bn'
                ? 'হ্যান্ডক্রাফটেড চামড়ার ওয়ালেটটি অসাধারণ। বাংলাদেশি টাকার সাইজ একদম পারফেক্ট বসে এবং চামড়ার ফিনিশিং চমৎকার।'
                : 'Genuine full-grain leather wallet with authentic texture. Fits Bangladeshi Taka currency notes perfectly without folding.'}"
            </p>
            <div className="pt-3 border-t border-slate-100 text-xs">
              <p className="font-bold text-slate-900">Nabila Tabassum</p>
              <p className="text-slate-400">Zindabazar, Sylhet</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Clean Newsletter Subscription Block */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#070f1e] via-[#0b1a30] to-[#102444] text-white p-8 sm:p-12 shadow-2xl border border-slate-700/80 overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {currentT.newsletterTitle}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentT.newsletterSubtitle}
            </p>

            {newsletterSubscribed ? (
              <div className="mt-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs sm:text-sm space-y-2 animate-in fade-in">
                <p className="font-bold">{currentT.newsletterSuccess}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-900/60 rounded-xl border border-emerald-400/30">
                  <span className="font-mono font-black text-amber-300">NOKKHOTRO10</span>
                  <button
                    onClick={handleCopyCoupon}
                    className="p-1 text-emerald-300 hover:text-white cursor-pointer"
                    title="Copy coupon"
                  >
                    {copiedCoupon ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={currentT.newsletterPlaceholder}
                  className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap active:scale-95"
                >
                  {currentT.newsletterBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
