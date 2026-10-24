import React, { useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Language,
  Order,
  StoreSettings,
  CategoryKey,
  OrderStatus,
} from './types';
import {
  sampleProducts,
  initialStoreSettings,
  sampleInitialOrders,
} from './data/products';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { OrderSuccessView } from './components/OrderSuccessView';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { Heart, X, Trash2, ShoppingBag } from 'lucide-react';
import { formatBdt } from './utils/shop';
import { t } from './data/translations';

export default function App() {
  // 1. Language state
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('nokkhotro_lang');
    return (saved as Language) || 'bn';
  });

  useEffect(() => {
    localStorage.setItem('nokkhotro_lang', lang);
  }, [lang]);

  // 2. Navigation state: 'home' | 'shop' | 'checkout' | 'success' | 'admin'
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Products state (persisted so admin updates stick)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nokkhotro_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return sampleProducts;
  });

  useEffect(() => {
    localStorage.setItem('nokkhotro_products', JSON.stringify(products));
  }, [products]);

  // 4. Store settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('nokkhotro_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return initialStoreSettings;
  });

  useEffect(() => {
    localStorage.setItem('nokkhotro_settings', JSON.stringify(settings));
  }, [settings]);

  // 5. Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nokkhotro_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return sampleInitialOrders as Order[];
  });

  useEffect(() => {
    localStorage.setItem('nokkhotro_orders', JSON.stringify(orders));
  }, [orders]);

  // 6. Shopping Bag / Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nokkhotro_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('nokkhotro_cart', JSON.stringify(cart));
  }, [cart]);

  // 7. Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('nokkhotro_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return ['nok-101', 'nok-103']; // pre-seeded with 2 items for delightful exploration
  });

  useEffect(() => {
    localStorage.setItem('nokkhotro_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);

  // 8. Modals, drawers & Toast
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [selectedProductForDetails, setSelectedProductForDetails] = useState<Product | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleWishlist = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const exists = wishlistIds.includes(productId);
    if (exists) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      showToast(lang === 'bn' ? 'পছন্দের তালিকা থেকে সরানো হয়েছে' : 'Removed from wishlist');
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      showToast(lang === 'bn' ? 'পছন্দের তালিকায় সংরক্ষণ করা হয়েছে' : 'Saved to wishlist');
    }
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    size?: string,
    color?: string,
    openDrawer = false
  ) => {
    const instanceId = `${product.id}-${size || 'nosize'}-${color || 'nocolor'}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === instanceId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: instanceId,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity,
          selectedSize: size,
          selectedColor: color,
        };
        return [...prevCart, newItem];
      }
    });

    showToast(
      lang === 'bn'
        ? `"${product.name.bn}" ব্যাগে যোগ করা হয়েছে`
        : `Added "${product.name.en}" to your bag`
    );

    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes ? product.sizes[0] : undefined;
    const defaultColor = product.colors
      ? product.colors[0].name[lang] || product.colors[0].name.en
      : undefined;
    handleAddToCart(product, 1, defaultSize, defaultColor, false);
  };

  const handleBuyNow = (
    product: Product,
    quantity = 1,
    size?: string,
    color?: string
  ) => {
    handleAddToCart(product, quantity, size, color, false);
    setSelectedProductForDetails(null);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCartQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setLastPlacedOrder(newOrder);
    setCurrentView('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: string, category?: string) => {
    setCurrentView(view);
    if (category) {
      setSelectedCategoryFilter(category as CategoryKey);
    } else if (view === 'shop') {
      setSelectedCategoryFilter('all');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  // Wishlist products
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-900 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#070f1e] text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header (hidden when inside admin) */}
      {currentView !== 'admin' && (
        <Header
          lang={lang}
          onToggleLang={toggleLanguage}
          cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
          onOpenCart={() => setIsCartDrawerOpen(true)}
          wishlistCount={wishlistIds.length}
          onOpenWishlist={() => setIsWishlistDrawerOpen(true)}
          currentView={currentView}
          onNavigate={handleNavigate}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {/* View Routing */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            products={products}
            lang={lang}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={(p) => setSelectedProductForDetails(p)}
            onQuickAdd={handleQuickAdd}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'shop' && (
          <ShopView
            products={products}
            lang={lang}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            initialCategory={selectedCategoryFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectProduct={(p) => setSelectedProductForDetails(p)}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            items={cart}
            lang={lang}
            settings={settings}
            onBackToShop={() => setCurrentView('shop')}
            onOrderPlaced={handleOrderPlaced}
          />
        )}

        {currentView === 'success' && lastPlacedOrder && (
          <OrderSuccessView
            order={lastPlacedOrder}
            lang={lang}
            onContinueShopping={() => handleNavigate('shop')}
          />
        )}

        {currentView === 'admin' && (
          <AdminPortal
            lang={lang}
            orders={orders}
            products={products}
            settings={settings}
            onUpdateOrderStatus={(orderId, newStatus) => {
              setOrders((prev) =>
                prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
              );
              showToast(`Order #${orderId} status updated to "${newStatus}"`);
            }}
            onUpdateProduct={(updated) => {
              setProducts((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
              );
              showToast(`Product "${updated.name.en}" updated`);
            }}
            onAddProduct={(newProd) => {
              setProducts((prev) => [newProd, ...prev]);
              showToast(`New product "${newProd.name.en}" created`);
            }}
            onUpdateSettings={(newSettings) => {
              setSettings(newSettings);
              showToast('Store settings saved');
            }}
            onBackToStore={() => setCurrentView('home')}
          />
        )}
      </main>

      {/* Global Product Details Modal */}
      <ProductDetailsModal
        product={selectedProductForDetails}
        allProducts={products}
        lang={lang}
        isWishlisted={
          selectedProductForDetails
            ? wishlistIds.includes(selectedProductForDetails.id)
            : false
        }
        onToggleWishlist={(id) => handleToggleWishlist(id)}
        onClose={() => setSelectedProductForDetails(null)}
        onAddToCart={(prod, qty, size, color) => {
          handleAddToCart(prod, qty, size, color, true);
          setSelectedProductForDetails(null);
        }}
        onBuyNow={handleBuyNow}
        onSelectProduct={(p) => setSelectedProductForDetails(p)}
      />

      {/* Global Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        items={cart}
        lang={lang}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartDrawerOpen(false);
          setCurrentView('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onContinueShopping={() => {
          setIsCartDrawerOpen(false);
          setCurrentView('shop');
        }}
      />

      {/* Wishlist Slide-over Drawer */}
      {isWishlistDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-[#070f1e]/70 backdrop-blur-sm"
            onClick={() => setIsWishlistDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                  <h2 className="text-lg font-black text-slate-900">
                    {t[lang].wishlist} ({wishlistIds.length})
                  </h2>
                </div>
                <button
                  onClick={() => setIsWishlistDrawerOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
                {wishlistedProducts.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <Heart className="w-12 h-12 text-slate-300" />
                    <p className="font-bold text-slate-700 text-sm">
                      {lang === 'bn' ? 'আপনার পছন্দের তালিকা খালি' : 'Your wishlist is empty'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {lang === 'bn'
                        ? 'পণ্য পছন্দের তালিকায় যোগ করতে হার্ট আইকনে ক্লিক করুন'
                        : 'Click the heart icon on any product to save it here'}
                    </p>
                  </div>
                ) : (
                  wishlistedProducts.map((prod) => (
                    <div key={prod.id} className="py-4 flex gap-4 items-center">
                      <img
                        src={prod.images[0]}
                        alt={prod.name[lang] || prod.name.en}
                        className="w-16 h-16 rounded-2xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {prod.name[lang] || prod.name.en}
                        </h4>
                        <p className="text-xs font-extrabold text-[#070f1e] mt-1 tabular-nums">
                          {formatBdt(prod.price, lang)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => {
                              handleAddToCart(prod, 1, prod.sizes?.[0], undefined, true);
                              setIsWishlistDrawerOpen(false);
                            }}
                            className="px-2.5 py-1 text-[11px] font-bold bg-[#070f1e] text-white rounded-lg hover:bg-blue-950 cursor-pointer flex items-center gap-1"
                          >
                            <ShoppingBag className="w-3 h-3 text-amber-400" />
                            <span>{t[lang].addToCart}</span>
                          </button>
                          <button
                            onClick={() => handleToggleWishlist(prod.id)}
                            className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {wishlistedProducts.length > 0 && (
                <div className="p-4 border-t border-slate-200 bg-slate-50">
                  <button
                    onClick={() => {
                      setIsWishlistDrawerOpen(false);
                      handleNavigate('shop');
                    }}
                    className="w-full py-3 bg-[#070f1e] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-blue-950"
                  >
                    {t[lang].viewAll}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Footer (hidden inside admin) */}
      {currentView !== 'admin' && (
        <Footer
          lang={lang}
          settings={settings}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
