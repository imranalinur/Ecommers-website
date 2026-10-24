import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem, Language } from '../types';
import { formatBdt, calculateCartTotals } from '../utils/shop';
import { t } from '../data/translations';
import { STORE_IMAGES, resolveStoreImage } from '../assets/images';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  lang: Language;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  lang,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  if (!isOpen) return null;

  const currentT = t[lang];
  const { subtotal, remainingForFreeDelivery, isFreeDelivery } = calculateCartTotals(items);
  const freeThreshold = 3000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-950" />
              <h2 className="text-lg font-extrabold text-slate-900">
                {currentT.cartTitle}
              </h2>
              <span className="px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-900 rounded-full tabular-nums">
                {items.reduce((acc, it) => acc + it.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Incentive Progress Bar */}
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-950 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>
                {isFreeDelivery
                  ? currentT.freeDeliveryUnlocked
                  : currentT.freeDeliveryRemaining(formatBdt(remainingForFreeDelivery, lang))}
              </span>
            </div>
            <div className="w-full bg-blue-200/70 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-900 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List Area */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {currentT.emptyCartTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    {currentT.emptyCartDesc}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onContinueShopping();
                  }}
                  className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  {currentT.startShopping}
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemName = item.name[lang] || item.name.en;
                return (
                  <div key={item.id} className="py-4 flex gap-4 items-center">
                    <img
                      src={resolveStoreImage(item.image)}
                      alt={itemName}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = STORE_IMAGES.hero;
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {itemName}
                      </h4>

                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedSize && item.selectedColor && <span>·</span>}
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-slate-700 hover:bg-slate-200 cursor-pointer font-bold"
                            aria-label={`Decrease quantity of ${itemName}`}
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-bold text-slate-900 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-slate-700 hover:bg-slate-200 cursor-pointer font-bold"
                            aria-label={`Increase quantity of ${itemName}`}
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-blue-950 tabular-nums">
                            {formatBdt(item.price * item.quantity, lang)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-slate-300 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                      title={currentT.remove}
                      aria-label={`Remove ${itemName} from cart`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Subtotal & Proceed Button */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>{currentT.subtotal}</span>
                  <span className="font-bold text-slate-900 text-sm tabular-nums">
                    {formatBdt(subtotal, lang)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>{currentT.deliveryFee}</span>
                  <span>{lang === 'bn' ? 'চেকআউটে নির্ধারিত হবে (৳৭০ / ৳১৩০)' : 'Calculated at checkout (৳70 / ৳130)'}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">{currentT.total}</span>
                <span className="text-lg font-extrabold text-blue-950 tabular-nums">
                  {formatBdt(subtotal, lang)}
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold rounded-xl transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{currentT.proceedCheckout}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentT.checkoutNotice}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
