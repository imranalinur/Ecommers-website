import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  Copy,
  Check,
  AlertCircle,
  ArrowLeft,
  Lock,
  CreditCard,
  Banknote,
  Smartphone,
  ChevronRight,
} from 'lucide-react';
import {
  CartItem,
  Language,
  PaymentMethod,
  Order,
  StoreSettings,
} from '../types';
import {
  formatBdt,
  calculateCartTotals,
  validateBdPhone,
  validateTrxId,
  generateOrderId,
  BANGLADESH_DISTRICTS,
} from '../utils/shop';
import { t } from '../data/translations';

interface CheckoutViewProps {
  items: CartItem[];
  lang: Language;
  settings: StoreSettings;
  onBackToShop: () => void;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  items,
  lang,
  settings,
  onBackToShop,
  onOrderPlaced,
}) => {
  const currentT = t[lang];

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [fullAddress, setFullAddress] = useState('');
  const [orderNote, setOrderNote] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [mfsProvider, setMfsProvider] = useState<'bKash' | 'Nagad'>('bKash');
  const [senderPhone, setSenderPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);

  // Validation Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculations
  const { subtotal, deliveryFee, grandTotal, isFreeDelivery } = calculateCartTotals(
    items,
    district,
    settings.freeDeliveryThreshold
  );

  const activeMerchantNumber =
    mfsProvider === 'bKash' ? settings.merchantBkash : settings.merchantNagad;

  const handleCopyMerchantNumber = () => {
    navigator.clipboard.writeText(activeMerchantNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) {
      errs.fullName = currentT.errNameRequired;
    }

    if (!validateBdPhone(phone)) {
      errs.phone = currentT.errPhoneInvalid;
    }

    if (!district) {
      errs.district = currentT.errDistrictRequired;
    }

    if (!fullAddress.trim() || fullAddress.trim().length < 8) {
      errs.fullAddress = currentT.errAddressRequired;
    }

    if (paymentMethod === 'bkash_nagad') {
      if (!validateBdPhone(senderPhone)) {
        errs.senderPhone = currentT.errSenderPhoneInvalid;
      }
      if (!validateTrxId(trxId)) {
        errs.trxId = currentT.errTrxIdInvalid;
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // scroll to first error
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const newOrder: Order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        district,
        fullAddress: fullAddress.trim(),
        orderNote: orderNote.trim() || undefined,
      },
      items,
      subtotal,
      deliveryFee,
      totalAmount: grandTotal,
      paymentMethod,
      paymentDetails:
        paymentMethod === 'bkash_nagad'
          ? {
              provider: mfsProvider,
              senderNumber: senderPhone.trim(),
              trxId: trxId.trim().toUpperCase(),
            }
          : undefined,
      status: paymentMethod === 'bkash_nagad' ? 'confirmed' : 'pending',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">{currentT.emptyCartTitle}</h2>
        <p className="text-slate-500 text-sm">{currentT.emptyCartDesc}</p>
        <button
          onClick={onBackToShop}
          className="px-6 py-2.5 bg-blue-950 text-white font-bold rounded-xl hover:bg-blue-900 transition-colors cursor-pointer"
        >
          {currentT.startShopping}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back button */}
        <button
          onClick={onBackToShop}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-950 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'bn' ? 'কেনাকাটায় ফিরে যান' : 'Back to Shopping'}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Checkout Form */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              {/* Multi-step progress indicator */}
              <div className="flex items-center gap-3 mb-4 text-xs font-extrabold uppercase tracking-wider">
                <div className="flex items-center gap-2 text-blue-950">
                  <span className="w-6 h-6 rounded-full bg-blue-950 text-white flex items-center justify-center text-[11px]">
                    1
                  </span>
                  <span>{lang === 'bn' ? 'ঠিকানা ও তথ্য' : 'Delivery Info'}</span>
                </div>
                <div className="w-8 h-0.5 bg-slate-200" />
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[11px]">
                    2
                  </span>
                  <span>{lang === 'bn' ? 'পেমেন্ট ও অর্ডার' : 'Payment & Review'}</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {currentT.checkoutTitle}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {currentT.checkoutSubtitle}
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-8" noValidate>
              {/* Section 1: Customer & Address Information */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-luxury space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-blue-950 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    1
                  </div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    {currentT.shippingInfoTitle}
                  </h2>
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {currentT.fullNameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder={currentT.fullNamePlaceholder}
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName
                        ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
                        : 'border-slate-200 focus:ring-blue-900/20 focus:border-blue-900'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Bangladeshi Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {currentT.phoneLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder={currentT.phonePlaceholder}
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all tabular-nums ${
                      errors.phone
                        ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
                        : 'border-slate-200 focus:ring-blue-900/20 focus:border-blue-900'
                    }`}
                  />
                  <p className="text-[11px] text-slate-400">{currentT.phoneHelper}</p>
                  {errors.phone && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* District Select */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {currentT.districtLabel} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all font-medium"
                  >
                    {BANGLADESH_DISTRICTS.map((d) => (
                      <option key={d.value} value={d.value}>
                        {lang === 'bn' ? d.bn : d.en} {d.isDhaka ? (lang === 'bn' ? '(ডেলিভারি ৳৭০)' : '(Delivery ৳70)') : (lang === 'bn' ? '(ডেলিভারি ৳১৩০)' : '(Delivery ৳130)')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Full Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {currentT.fullAddressLabel} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={fullAddress}
                    onChange={(e) => {
                      setFullAddress(e.target.value);
                      if (errors.fullAddress) setErrors({ ...errors, fullAddress: '' });
                    }}
                    placeholder={currentT.fullAddressPlaceholder}
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.fullAddress
                        ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
                        : 'border-slate-200 focus:ring-blue-900/20 focus:border-blue-900'
                    }`}
                  />
                  {errors.fullAddress && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.fullAddress}</span>
                    </p>
                  )}
                </div>

                {/* Order Note (Optional) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {currentT.orderNoteLabel}
                  </label>
                  <input
                    type="text"
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder={currentT.orderNotePlaceholder}
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Section 2: Payment Method Options (Radio Buttons) */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-luxury space-y-6">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-blue-950 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    2
                  </div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    {currentT.paymentSectionTitle}
                  </h2>
                </div>

                <div className="space-y-3.5">
                  {/* Option 1: Cash on Delivery */}
                  <label
                    className={`flex items-start gap-3.5 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-blue-900 bg-blue-50/40 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentOption"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 w-4 h-4 text-blue-950 focus:ring-blue-900 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-bold text-slate-900">
                          {currentT.codLabel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {currentT.codDescription}
                      </p>
                    </div>
                  </label>

                  {/* Option 2: bKash / Nagad Manual Payment */}
                  <div
                    className={`rounded-xl border-2 transition-all ${
                      paymentMethod === 'bkash_nagad'
                        ? 'border-blue-900 bg-blue-50/40 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <label className="flex items-start gap-3.5 p-4 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentOption"
                        value="bkash_nagad"
                        checked={paymentMethod === 'bkash_nagad'}
                        onChange={() => setPaymentMethod('bkash_nagad')}
                        className="mt-1 w-4 h-4 text-blue-950 focus:ring-blue-900 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-pink-600" />
                          <span className="text-sm font-bold text-slate-900">
                            {currentT.bkashNagadLabel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {currentT.bkashNagadDescription}
                        </p>
                      </div>
                    </label>

                    {/* bKash / Nagad Expanded Instructions & Form */}
                    {paymentMethod === 'bkash_nagad' && (
                      <div className="p-4 sm:p-5 pt-0 border-t border-blue-100 space-y-4">
                        {/* Selector between bKash and Nagad */}
                        <div className="flex items-center gap-2 pt-3">
                          <button
                            type="button"
                            onClick={() => setMfsProvider('bKash')}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                              mfsProvider === 'bKash'
                                ? 'bg-[#E2136E] text-white border-[#E2136E]'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            bKash (বিকাশ)
                          </button>
                          <button
                            type="button"
                            onClick={() => setMfsProvider('Nagad')}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                              mfsProvider === 'Nagad'
                                ? 'bg-[#F7941D] text-white border-[#F7941D]'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            Nagad (নগদ)
                          </button>
                        </div>

                        {/* Merchant Number Box with Copy Action */}
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                          <div>
                            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                              {mfsProvider} Merchant Number:
                            </span>
                            <p className="text-base font-extrabold text-slate-900 tracking-wider tabular-nums font-mono">
                              {activeMerchantNumber}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyMerchantNumber}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                          >
                            {copiedNumber ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700">{currentT.copied}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>{currentT.copyNumber}</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Step-by-Step Instructions */}
                        <div className="text-xs text-slate-600 space-y-1 bg-amber-50/70 p-3 rounded-xl border border-amber-100/80">
                          <p className="font-semibold text-slate-800">
                            {currentT.bkashInstructionsTitle}
                          </p>
                          <p>{currentT.bkashStep1(activeMerchantNumber)}</p>
                          <p>{currentT.bkashStep2(formatBdt(grandTotal, lang))}</p>
                          <p>{currentT.bkashStep3}</p>
                          <p>{currentT.bkashStep4}</p>
                        </div>

                        {/* Customer Sender Number & TrxID Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1">
                            <label className="block text-xs font-bold text-slate-700">
                              {currentT.senderPhoneLabel} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              value={senderPhone}
                              onChange={(e) => {
                                setSenderPhone(e.target.value);
                                if (errors.senderPhone) setErrors({ ...errors, senderPhone: '' });
                              }}
                              placeholder={currentT.senderPhonePlaceholder}
                              className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 tabular-nums ${
                                errors.senderPhone
                                  ? 'border-red-400 focus:ring-red-200'
                                  : 'border-slate-200 focus:ring-blue-900/20 focus:border-blue-900'
                              }`}
                            />
                            {errors.senderPhone && (
                              <p className="text-[11px] text-red-500">{errors.senderPhone}</p>
                            )}
                          </div>

                          <div className="space-y-1">
                            <label className="block text-xs font-bold text-slate-700">
                              {currentT.trxIdLabel} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={trxId}
                              onChange={(e) => {
                                setTrxId(e.target.value.toUpperCase());
                                if (errors.trxId) setErrors({ ...errors, trxId: '' });
                              }}
                              placeholder={currentT.trxIdPlaceholder}
                              className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-white uppercase font-mono tracking-wider focus:outline-none focus:ring-2 ${
                                errors.trxId
                                  ? 'border-red-400 focus:ring-red-200'
                                  : 'border-slate-200 focus:ring-blue-900/20 focus:border-blue-900'
                              }`}
                            />
                            {errors.trxId && (
                              <p className="text-[11px] text-red-500">{errors.trxId}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Option 3: Clearly Marked Placeholder for SSLCommerz Gateway */}
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-4 opacity-80">
                    <div className="flex items-start gap-3.5">
                      <input
                        type="radio"
                        disabled
                        className="mt-1 w-4 h-4 text-slate-300 cursor-not-allowed"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <CreditCard className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-bold text-slate-700">
                            {currentT.sslcommerzLabel}
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 rounded-md">
                            {currentT.sslcommerzBadge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {currentT.sslcommerzDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl font-extrabold text-base text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] transition-all shadow-lg shadow-amber-400/20 cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{currentT.processingOrder}</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 fill-slate-950" />
                    <span>{currentT.confirmOrderBtn}</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary Sticky Sidebar */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                {currentT.orderSummaryTitle} ({items.reduce((a, b) => a + b.quantity, 0)})
              </h3>

              {/* Mini Item List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-slate-100">
                {items.map((it) => (
                  <div key={it.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <img
                      src={it.image}
                      alt={it.name[lang] || it.name.en}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-slate-900 truncate">
                        {it.name[lang] || it.name.en}
                      </p>
                      <p className="text-slate-400">
                        Qty: {it.quantity} {it.selectedSize ? `· ${it.selectedSize}` : ''}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-900 tabular-nums">
                      {formatBdt(it.price * it.quantity, lang)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>{currentT.subtotal}</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {formatBdt(subtotal, lang)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-blue-900" />
                    <span>{currentT.deliveryFee} ({district})</span>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {isFreeDelivery ? (
                      <span className="text-emerald-600 font-bold">
                        {lang === 'bn' ? 'ফ্রি' : 'FREE'}
                      </span>
                    ) : (
                      formatBdt(deliveryFee, lang)
                    )}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
                <span className="text-sm font-bold text-slate-900">{currentT.total}</span>
                <span className="text-xl font-extrabold text-blue-950 tabular-nums">
                  {formatBdt(grandTotal, lang)}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentT.authenticTitle}</span>
                </div>
                <p>{currentT.authenticDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
