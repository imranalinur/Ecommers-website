import React from 'react';
import {
  CheckCircle2,
  Package,
  Calendar,
  MapPin,
  Phone,
  CreditCard,
  Printer,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { Order, Language } from '../types';
import { formatBdt } from '../utils/shop';
import { t } from '../data/translations';
import { STORE_IMAGES, resolveStoreImage } from '../assets/images';

interface OrderSuccessViewProps {
  order: Order;
  lang: Language;
  onContinueShopping: () => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({
  order,
  lang,
  onContinueShopping,
}) => {
  const currentT = t[lang];

  const handlePrint = () => {
    window.print();
  };

  const paymentLabels: Record<string, string> = {
    cod: lang === 'bn' ? 'ক্যাশ অন ডেলিভারি (Cash on Delivery)' : 'Cash on Delivery (COD)',
    bkash_nagad:
      lang === 'bn'
        ? `ম্যানুয়াল মোবাইল পেমেন্ট (${order.paymentDetails?.provider || 'bKash'})`
        : `Manual MFS (${order.paymentDetails?.provider || 'bKash'})`,
    gateway_sslcommerz: 'SSLCommerz Gateway',
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {currentT.orderSuccessTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              {currentT.orderSuccessSubtitle}
            </p>
          </div>

          {/* Order ID Pill */}
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 font-mono text-sm sm:text-base font-bold">
            <span>{currentT.orderIdLabel}:</span>
            <span className="text-blue-900 font-extrabold">#{order.id}</span>
          </div>

          {/* Quick info row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-left text-xs">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block">{currentT.orderDateLabel}</span>
              <span className="font-semibold text-slate-800">
                {new Date(order.createdAt).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block">{currentT.deliveryEstimate}</span>
              <span className="font-semibold text-slate-800">
                {currentT.deliveryEstimateText}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block">{currentT.orderStatusLabel}</span>
              <span className="font-bold text-blue-900 uppercase tracking-wider text-[11px]">
                {order.status === 'confirmed' ? currentT.statusConfirmed : currentT.statusPending}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Receipt Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mt-6 space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-900" />
            <span>{lang === 'bn' ? 'অর্ডারকৃত পণ্য তালিকা' : 'Purchased Items'}</span>
          </h2>

          {/* Item Rows */}
          <div className="divide-y divide-slate-100">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={resolveStoreImage(item.image)}
                    alt={item.name[lang] || item.name.en}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = STORE_IMAGES.hero;
                    }}
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.name[lang] || item.name.en}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Qty: {item.quantity}{' '}
                      {item.selectedSize ? `· Size: ${item.selectedSize}` : ''}{' '}
                      {item.selectedColor ? `· Color: ${item.selectedColor}` : ''}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-900 tabular-nums shrink-0">
                  {formatBdt(item.price * item.quantity, lang)}
                </span>
              </div>
            ))}
          </div>

          {/* Subtotal & Delivery Breakdown */}
          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>{currentT.subtotal}</span>
              <span className="font-semibold text-slate-800 tabular-nums">
                {formatBdt(order.subtotal, lang)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{currentT.deliveryFee} ({order.customer.district})</span>
              <span className="font-semibold text-slate-800 tabular-nums">
                {order.deliveryFee === 0 ? (
                  <span className="text-emerald-600 font-bold">
                    {lang === 'bn' ? 'ফ্রি' : 'FREE'}
                  </span>
                ) : (
                  formatBdt(order.deliveryFee, lang)
                )}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-blue-950">
              <span>{currentT.total}</span>
              <span className="tabular-nums">{formatBdt(order.totalAmount, lang)}</span>
            </div>
          </div>

          {/* Shipping and Payment Info Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div className="space-y-1 p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <MapPin className="w-3.5 h-3.5 text-blue-900" />
                <span>{currentT.shippingTo}</span>
              </div>
              <p className="font-semibold text-slate-900">{order.customer.fullName}</p>
              <p className="text-slate-600">{order.customer.fullAddress}</p>
              <p className="text-slate-600 font-medium">District: {order.customer.district}</p>
              <p className="text-slate-600 flex items-center gap-1 font-mono">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>{order.customer.phone}</span>
              </p>
            </div>

            <div className="space-y-1 p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <CreditCard className="w-3.5 h-3.5 text-blue-900" />
                <span>{currentT.paymentMethodUsed}</span>
              </div>
              <p className="font-semibold text-slate-900">
                {paymentLabels[order.paymentMethod]}
              </p>
              {order.paymentDetails && (
                <div className="pt-1 text-slate-600 space-y-0.5">
                  <p>Sender No: {order.paymentDetails.senderNumber}</p>
                  <p className="font-mono text-blue-950 font-bold">
                    TrxID: {order.paymentDetails.trxId}
                  </p>
                </div>
              )}
              {order.customer.orderNote && (
                <p className="text-slate-500 italic pt-1">
                  Note: "{order.customer.orderNote}"
                </p>
              )}
            </div>
          </div>

          {/* Actions: Print and Continue */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>{currentT.printInvoice}</span>
            </button>

            <button
              onClick={onContinueShopping}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>{currentT.continueShopping}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
