import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Zap,
  ZoomIn,
  Clock,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { Product, Language } from '../types';
import { formatBdt } from '../utils/shop';
import { t } from '../data/translations';
import { resolveStoreImage, STORE_IMAGES } from '../assets/images';

interface ProductDetailsModalProps {
  product: Product | null;
  allProducts: Product[];
  lang: Language;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  onBuyNow: (product: Product, quantity: number, size?: string, color?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  allProducts,
  lang,
  isWishlisted = false,
  onToggleWishlist,
  onClose,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
}) => {
  if (!product) return null;

  const currentT = t[lang];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors ? product.colors[0].name[lang] || product.colors[0].name.en : undefined
  );
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'delivery'>('desc');

  const title = product.name[lang] || product.name.en;
  const description = product.description[lang] || product.description.en;
  const features = product.features[lang] || product.features.en;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  // Related products from same category
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleIncrement = () => {
    if (quantity < (product.stockCount || 10)) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#070f1e]/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-8 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {onToggleWishlist && (
            <button
              onClick={() => onToggleWishlist(product.id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md ${
                isWishlisted
                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                  : 'bg-white/90 text-slate-600 hover:text-rose-600 border border-slate-200'
              }`}
              title={currentT.wishlist}
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/90 text-slate-600 hover:text-slate-950 hover:bg-white shadow-md border border-slate-200 transition-all cursor-pointer"
            aria-label="Close product modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100 pb-20 md:pb-0">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left Column: Image Gallery with Interactive Zoom */}
            <div className="md:col-span-6 p-6 sm:p-8 bg-slate-50/80 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200/80">
              <div className="space-y-4">
                {/* Main Stage Image with Zoom On Hover */}
                <div
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                  className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm cursor-crosshair group"
                >
                  <img
                    src={resolveStoreImage(product.images[selectedImageIndex] || product.images[0])}
                    alt={title}
                    className="w-full h-full object-cover object-center transition-transform duration-200 ease-out"
                    style={
                      isZoomed
                        ? {
                            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                            transform: 'scale(1.9)',
                          }
                        : undefined
                    }
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = STORE_IMAGES.hero;
                    }}
                  />

                  {/* Zoom hint badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold rounded-lg flex items-center gap-1 opacity-80 group-hover:opacity-0 transition-opacity pointer-events-none">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'জুম করতে মাউস রাখুন' : 'Hover to Zoom'}</span>
                  </div>

                  {product.isBestSeller && (
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#070f1e]/90 text-amber-300 text-xs font-black rounded-lg shadow-sm">
                      {lang === 'bn' ? 'বেস্ট সেলার' : 'Best Seller'}
                    </div>
                  )}
                </div>

                {/* Gallery Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-1">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative w-18 h-18 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                          selectedImageIndex === idx
                            ? 'border-blue-950 ring-2 ring-blue-950/20'
                            : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={resolveStoreImage(img)}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = STORE_IMAGES.hero;
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Delivery and Guarantee strip */}
              <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-3 gap-2 text-center text-xs text-slate-700 font-semibold">
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white border border-slate-100 shadow-xs">
                  <Truck className="w-4 h-4 text-blue-900" />
                  <span className="text-[11px]">
                    {lang === 'bn' ? '২৪-৪৮ ঘণ্টার ডেলিভারি' : 'Express Delivery'}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white border border-slate-100 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px]">
                    {lang === 'bn' ? '১০০% আসল পণ্য' : '100% Authentic'}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white border border-slate-100 shadow-xs">
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  <span className="text-[11px]">
                    {lang === 'bn' ? '৭ দিনের রিটার্ন' : '7 Days Return'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                {/* Category & SKU */}
                <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                  <span className="uppercase tracking-wider font-extrabold text-blue-950">
                    {product.category}
                  </span>
                  <span className="font-mono text-slate-400">SKU: {product.sku}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                  {title}
                </h2>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200 fill-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    {product.rating}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({product.reviewsCount} {currentT.reviews})
                  </span>
                </div>

                {/* Price Block */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#070f1e] tabular-nums">
                    {formatBdt(product.price, lang)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-base text-slate-400 line-through tabular-nums">
                        {formatBdt(product.originalPrice!, lang)}
                      </span>
                      <span className="px-2.5 py-0.5 text-xs font-extrabold text-emerald-800 bg-emerald-100 rounded-lg">
                        {lang === 'bn' ? 'বিশেষ ছাড়' : 'Save Special'}
                      </span>
                    </>
                  )}
                </div>

                {/* Stock status */}
                <div className="mt-2 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-emerald-700">
                    {currentT.inStock} - {currentT.leftInStock(product.stockCount)}
                  </span>
                </div>

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>{currentT.selectSize}:</span>
                      <span className="text-blue-900 font-extrabold">{selectedSize}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 text-xs font-extrabold rounded-xl border transition-all cursor-pointer ${
                            selectedSize === size
                              ? 'bg-[#070f1e] text-white border-[#070f1e] shadow-md'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>{currentT.selectColor}:</span>
                      <span className="text-blue-900 font-extrabold">{selectedColor}</span>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {product.colors.map((color) => {
                        const colorName = color.name[lang] || color.name.en;
                        const isSelected = selectedColor === colorName;
                        return (
                          <button
                            key={colorName}
                            onClick={() => setSelectedColor(colorName)}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'border-blue-950 bg-blue-50 ring-2 ring-blue-950 text-blue-950'
                                : 'border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span>{colorName}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-blue-950" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity Stepper */}
                <div className="mt-5 flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-700">
                    {currentT.quantity}:
                  </span>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden shadow-xs">
                    <button
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      className="px-4 py-2 text-slate-700 hover:bg-slate-200 disabled:opacity-30 cursor-pointer font-black transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-bold text-slate-900 tabular-nums min-w-[2.5rem] text-center bg-white">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      disabled={quantity >= product.stockCount}
                      className="px-4 py-2 text-slate-700 hover:bg-slate-200 disabled:opacity-30 cursor-pointer font-black transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons: Desktop */}
                <div className="mt-7 hidden sm:grid grid-cols-2 gap-3.5">
                  <button
                    onClick={() => onAddToCart(product, quantity, selectedSize, selectedColor)}
                    className="py-3.5 px-5 rounded-2xl font-bold text-sm text-[#070f1e] bg-slate-100 hover:bg-slate-200 border border-slate-300/80 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#070f1e]" />
                    <span>{currentT.addToCart}</span>
                  </button>

                  <button
                    onClick={() => onBuyNow(product, quantity, selectedSize, selectedColor)}
                    className="py-3.5 px-5 rounded-2xl font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md shadow-amber-400/20"
                  >
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>{currentT.buyNow}</span>
                  </button>
                </div>

                {/* Informative Tabs: Description, Specs, Delivery */}
                <div className="mt-8 pt-5 border-t border-slate-200">
                  <div className="flex items-center gap-6 text-xs font-bold border-b border-slate-200 pb-2.5">
                    <button
                      onClick={() => setActiveTab('desc')}
                      className={`pb-1.5 transition-colors cursor-pointer ${
                        activeTab === 'desc'
                          ? 'text-blue-950 font-extrabold border-b-2 border-blue-950'
                          : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {currentT.productDescription}
                    </button>
                    <button
                      onClick={() => setActiveTab('specs')}
                      className={`pb-1.5 transition-colors cursor-pointer ${
                        activeTab === 'specs'
                          ? 'text-blue-950 font-extrabold border-b-2 border-blue-950'
                          : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {currentT.specifications}
                    </button>
                    <button
                      onClick={() => setActiveTab('delivery')}
                      className={`pb-1.5 transition-colors cursor-pointer ${
                        activeTab === 'delivery'
                          ? 'text-blue-950 font-extrabold border-b-2 border-blue-950'
                          : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {currentT.deliveryInfo}
                    </button>
                  </div>

                  <div className="pt-3 text-xs text-slate-600 leading-relaxed">
                    {activeTab === 'desc' && <p>{description}</p>}
                    {activeTab === 'specs' && (
                      <ul className="space-y-1.5 list-disc list-inside text-slate-700">
                        {features.map((feat, idx) => (
                          <li key={idx}>{feat}</li>
                        ))}
                      </ul>
                    )}
                    {activeTab === 'delivery' && (
                      <div className="space-y-2 text-slate-700">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-blue-900" />
                          <p className="font-bold text-slate-900">{currentT.deliveryDhakaText}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="w-3.5 h-3.5 text-amber-600" />
                          <p className="font-bold text-slate-900">{currentT.deliveryOutsideText}</p>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-1">{currentT.codNotice}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-extrabold text-slate-900">
                  {currentT.relatedProducts}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectProduct(rel);
                      setSelectedImageIndex(0);
                      setQuantity(1);
                    }}
                    className="p-3 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={resolveStoreImage(rel.images[0])}
                      alt={rel.name[lang] || rel.name.en}
                      className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0 group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = STORE_IMAGES.hero;
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-900">
                        {rel.name[lang] || rel.name.en}
                      </p>
                      <p className="text-xs font-extrabold text-[#070f1e] mt-0.5 tabular-nums">
                        {formatBdt(rel.price, lang)}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Mobile Add to Cart & Buy Now Bar (Mobile Only) */}
        <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center gap-2 z-30 shadow-2xl">
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-xs font-bold text-slate-900 truncate">{title}</p>
            <p className="text-sm font-black text-[#070f1e] tabular-nums">
              {formatBdt(product.price * quantity, lang)}
            </p>
          </div>
          <button
            onClick={() => onAddToCart(product, quantity, selectedSize, selectedColor)}
            className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-900 border border-slate-300 cursor-pointer active:scale-95"
          >
            {currentT.stickyAddToCart}
          </button>
          <button
            onClick={() => onBuyNow(product, quantity, selectedSize, selectedColor)}
            className="px-4 py-2.5 rounded-xl text-xs font-black bg-amber-400 text-slate-950 shadow-md cursor-pointer active:scale-95"
          >
            {currentT.stickyBuyNow}
          </button>
        </div>
      </div>
    </div>
  );
};
