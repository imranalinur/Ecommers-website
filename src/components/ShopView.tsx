import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Product, Language, CategoryKey } from '../types';
import { ProductCard } from './ProductCard';
import { t } from '../data/translations';

interface ShopViewProps {
  products: Product[];
  lang: Language;
  wishlistIds: string[];
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  initialCategory?: CategoryKey;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectProduct: (p: Product) => void;
  onQuickAdd: (p: Product, e: React.MouseEvent) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  lang,
  wishlistIds,
  onToggleWishlist,
  initialCategory = 'all',
  searchQuery,
  onSearchChange,
  onSelectProduct,
  onQuickAdd,
}) => {
  const currentT = t[lang];
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Sync if initialCategory prop changes
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories: { key: CategoryKey; label: string }[] = [
    { key: 'all', label: currentT.allCategories },
    { key: 'apparel', label: currentT.apparel },
    { key: 'gadgets', label: currentT.gadgets },
    { key: 'leather', label: currentT.leather },
  ];

  // Filtering and sorting pipeline
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // In-stock filter
        if (inStockOnly && !p.inStock) {
          return false;
        }

        // Search text filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchEn = p.name.en.toLowerCase().includes(query);
          const matchBn = p.name.bn.toLowerCase().includes(query);
          const matchCat = p.category.toLowerCase().includes(query);
          const matchDesc = p.shortDescription.en.toLowerCase().includes(query) || p.shortDescription.bn.includes(query);
          if (!matchEn && !matchBn && !matchCat && !matchDesc) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: featured first, then best-seller
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [products, selectedCategory, inStockOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setInStockOnly(false);
    onSearchChange('');
    setSortBy('featured');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {currentT.shopTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            {currentT.shopSubtitle}
          </p>
        </div>

        {/* Toolbar: Category tabs, Search input, Sort select */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Segmented Tabs (Buttons per frontend design guidelines) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.key
                      ? 'bg-blue-950 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort & In-Stock controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* In-Stock Filter Checkbox */}
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-slate-300 text-blue-900 focus:ring-blue-900 cursor-pointer"
                />
                <span>{currentT.inStockOnly}</span>
              </label>

              {/* Sort By Select */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  {currentT.sortBy}:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 cursor-pointer"
                >
                  <option value="featured">{currentT.sortDefault}</option>
                  <option value="price-asc">{currentT.sortPriceAsc}</option>
                  <option value="price-desc">{currentT.sortPriceDesc}</option>
                  <option value="rating">{currentT.sortRating}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Showing Count Indicator */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              {currentT.showingCount(filteredProducts.length, products.length)}
            </span>

            {(selectedCategory !== 'all' || inStockOnly || searchQuery) && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-blue-900 hover:text-blue-950 font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{currentT.resetFilters}</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid: 1-col on xs mobile, 2-col on sm/md, 3-col on lg, 4-col on xl */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              {currentT.noProductsFound}
            </h3>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-blue-950 text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition-colors cursor-pointer"
            >
              {currentT.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
        )}
      </div>
    </div>
  );
};
