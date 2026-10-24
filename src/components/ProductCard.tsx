import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Heart, Sparkles } from 'lucide-react';
import { Product, Language } from '../types';
import { formatBdt } from '../utils/shop';
import { t } from '../data/translations';
import { STORE_IMAGES, resolveStoreImage } from '../assets/images';

interface ProductCardProps {
  product: Product;
  lang: Language;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string, e: React.MouseEvent) => void;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  isWishlisted = false,
  onToggleWishlist,
  onSelect,
  onQuickAdd,
}) => {
  const currentT = t[lang];
  const [isHovered, setIsHovered] = useState(false);

  const title = product.name[lang] || product.name.en;
  const shortDesc = product.shortDescription[lang] || product.shortDescription.en;

  const categoryNames: Record<string, string> = {
    apparel: lang === 'bn' ? 'পোশাক' : 'Apparel',
    gadgets: lang === 'bn' ? 'গ্যাজেট' : 'Gadgets',
    leather: lang === 'bn' ? 'চামড়াশিল্প' : 'Leathercraft',
    accessories: lang === 'bn' ? 'অ্যাক্সেসরিজ' : 'Accessories',
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountSavings = hasDiscount ? product.originalPrice! - product.price : 0;
  const primaryImage = resolveStoreImage(product.images[0]);
  const secondaryImage = resolveStoreImage(product.images[1] || product.images[0]);

  return (
    <article
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white rounded-3xl border border-slate-200/80 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer shadow-luxury"
    >
      {/* Product Image Area with Image Hover Swap */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={title}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ease-out ${
            isHovered && product.images.length > 1 ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = STORE_IMAGES.hero;
          }}
        />

        {/* Secondary Image for Hover Swap */}
        {product.images.length > 1 && (
          <img
            src={secondaryImage}
            alt={`${title} alternate view`}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = STORE_IMAGES.hero;
            }}
          />
        )}

        {/* Badges on Top Left */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 pointer-events-none z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-[#070f1e]/90 text-amber-300 rounded-lg shadow-sm backdrop-blur-sm">
              {lang === 'bn' ? 'বেস্ট সেলার' : 'Best Seller'}
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-950/90 text-emerald-300 rounded-lg shadow-sm backdrop-blur-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{lang === 'bn' ? 'নতুন সম্ভার' : 'New Arrival'}</span>
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-950 rounded-lg shadow-xs">
              {lang === 'bn' ? `ছাড় ${formatBdt(discountSavings, lang)}` : `Save ${formatBdt(discountSavings, lang)}`}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button on Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleWishlist) onToggleWishlist(product.id, e);
          }}
          className={`absolute top-3.5 right-3.5 z-10 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-600 border border-white/60'
          }`}
          aria-label={`Save ${title} to wishlist`}
        >
          <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick Actions Overlay Bar on hover (Quick View & Quick Add) */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex-1 py-2.5 px-3 bg-white/95 hover:bg-white text-slate-900 text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border border-slate-200/80"
            aria-label={`Quick view ${title}`}
          >
            <Eye className="w-3.5 h-3.5 text-blue-900" />
            <span>{currentT.quickView}</span>
          </button>

          <button
            onClick={(e) => onQuickAdd(product, e)}
            className="flex-1 py-2.5 px-3 bg-[#070f1e] hover:bg-[#0b1a30] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            aria-label={`Quick add ${title} to bag`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentT.quickAdd}</span>
          </button>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1.5">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="uppercase tracking-wider text-blue-950 text-[11px] font-extrabold">
              {categoryNames[product.category] || product.category}
            </span>
            <div className="flex items-center gap-1 text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold tabular-nums text-xs">{product.rating}</span>
              <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-blue-950 transition-colors">
            {title}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {shortDesc}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-extrabold text-[#070f1e] tabular-nums">
              {formatBdt(product.price, lang)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                {formatBdt(product.originalPrice!, lang)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Low stock pill */}
            {product.stockCount <= 15 && (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                {currentT.leftInStock(product.stockCount)}
              </span>
            )}
            <button
              onClick={(e) => onQuickAdd(product, e)}
              className="sm:hidden p-2 bg-[#070f1e] text-white rounded-xl shadow-xs"
              aria-label="Add to bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
