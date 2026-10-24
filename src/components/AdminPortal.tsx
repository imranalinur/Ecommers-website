import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Package,
  ShoppingBag,
  Sliders,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  Plus,
  ArrowLeft,
  Search,
} from 'lucide-react';
import { Order, Product, StoreSettings, Language, OrderStatus } from '../types';
import { formatBdt } from '../utils/shop';
import { t } from '../data/translations';

interface AdminPortalProps {
  lang: Language;
  orders: Order[];
  products: Product[];
  settings: StoreSettings;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (newProduct: Product) => void;
  onUpdateSettings: (newSettings: StoreSettings) => void;
  onBackToStore: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  lang,
  orders,
  products,
  settings,
  onUpdateOrderStatus,
  onUpdateProduct,
  onAddProduct,
  onUpdateSettings,
  onBackToStore,
}) => {
  const currentT = t[lang];

  // Environment password (uses VITE_ADMIN_PASSWORD with fallback)
  const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'settings'>('orders');

  // Search/Filters in Admin
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  // Editing Product state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // New product form
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleBn, setNewTitleBn] = useState('');
  const [newCategory, setNewCategory] = useState<'apparel' | 'gadgets' | 'leather' | 'accessories'>('apparel');
  const [newPrice, setNewPrice] = useState(1500);
  const [newStock, setNewStock] = useState(20);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === expectedPassword) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    const matchesSearch =
      !orderSearchQuery ||
      o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customer.phone.includes(orderSearchQuery) ||
      (o.paymentDetails?.trxId &&
        o.paymentDetails.trxId.toLowerCase().includes(orderSearchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    onUpdateProduct(editingProduct);
    setEditingProduct(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleEn.trim()) return;

    const newProd: Product = {
      id: `nok-${Date.now().toString().slice(-4)}`,
      sku: `NK-NEW-${Math.floor(Math.random() * 900 + 100)}`,
      name: {
        en: newTitleEn.trim(),
        bn: newTitleBn.trim() || newTitleEn.trim(),
      },
      category: newCategory,
      price: Number(newPrice) || 1200,
      images: ['/src/assets/images/hero_bangladesh_store_1792822458300.jpg'],
      shortDescription: {
        en: 'High quality handcrafted Bangladeshi essentials.',
        bn: 'উন্নত মানের দেশীয় পণ্য।',
      },
      description: {
        en: 'Crafted with premium materials for maximum durability and comfort.',
        bn: 'খাঁটি মানের কাঁচামাল দ্বারা তৈরি টেকসই ও রুচিশীল পণ্য।',
      },
      features: {
        en: ['Premium Quality Guarantee', 'Fast Nationwide Courier Delivery'],
        bn: ['১০০% সেরা কোয়ালিটি নিশ্চয়তা', 'সারা দেশে দ্রুত কুরিয়ার ডেলিভারি'],
      },
      inStock: true,
      stockCount: Number(newStock) || 10,
      rating: 5.0,
      reviewsCount: 1,
    };

    onAddProduct(newProd);
    setShowAddProductModal(false);
    setNewTitleEn('');
    setNewTitleBn('');
  };

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center mx-auto shadow-md">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              {currentT.adminTitle}
            </h1>
            <p className="text-xs text-slate-500">
              {currentT.passwordPrompt}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError(false);
                  }}
                  placeholder={currentT.passwordPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all font-mono"
                  autoFocus
                />
              </div>
              {authError && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{currentT.invalidPassword}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
            >
              {currentT.loginBtn}
            </button>
          </form>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-[11px] text-slate-500 text-center">
            <span className="font-semibold text-slate-700 block mb-0.5">Note:</span>
            <span>{currentT.envPasswordHint}</span>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onBackToStore}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{currentT.exitAdmin}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center font-bold text-white text-sm">
                N
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-extrabold tracking-tight">
                  {settings.storeName[lang] || settings.storeName.en} · Store Admin
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onBackToStore}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentT.exitAdmin}</span>
              </button>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-blue-950 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{currentT.tabOrders}</span>
            <span className="px-2 py-0.2 bg-blue-800 text-[10px] rounded-full text-white tabular-nums">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-blue-950 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{currentT.tabProducts}</span>
            <span className="px-2 py-0.2 bg-slate-200 text-slate-800 text-[10px] rounded-full tabular-nums">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-blue-950 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>{currentT.tabSettings}</span>
          </button>
        </div>

        {/* TAB 1: Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  placeholder="Search by Order ID, Phone, TrxID..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-slate-500">Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none"
                >
                  <option value="all">{currentT.allStatuses}</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">{currentT.orderNumberCol}</th>
                      <th className="py-3 px-4">{currentT.customerCol}</th>
                      <th className="py-3 px-4">{currentT.totalCol}</th>
                      <th className="py-3 px-4">{currentT.paymentCol}</th>
                      <th className="py-3 px-4">{currentT.statusCol}</th>
                      <th className="py-3 px-4 text-right">{currentT.actionsCol}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          {currentT.noOrders}
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-blue-950">
                            #{ord.id}
                            <span className="block text-[10px] text-slate-400 font-sans font-normal">
                              {new Date(ord.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block">
                              {ord.customer.fullName}
                            </span>
                            <span className="font-mono text-slate-500 text-[11px] block">
                              {ord.customer.phone}
                            </span>
                            <span className="text-slate-400 text-[11px]">
                              {ord.customer.district} · {ord.items.length} items
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900 tabular-nums">
                            {formatBdt(ord.totalAmount, lang)}
                            <span className="block text-[10px] text-slate-400 font-normal">
                              Sub: {formatBdt(ord.subtotal, lang)} + Del:{' '}
                              {ord.deliveryFee === 0 ? 'Free' : formatBdt(ord.deliveryFee, lang)}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {ord.paymentMethod === 'cod' ? (
                              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                                Cash on Delivery
                              </span>
                            ) : ord.paymentMethod === 'bkash_nagad' ? (
                              <div className="space-y-0.5">
                                <span className="px-2 py-0.5 rounded-md bg-pink-50 text-pink-700 font-bold text-[11px]">
                                  {ord.paymentDetails?.provider || 'bKash'} MFS
                                </span>
                                <span className="block font-mono text-[10px] text-slate-600">
                                  TrxID: {ord.paymentDetails?.trxId}
                                </span>
                                <span className="block text-[10px] text-slate-400">
                                  Sender: {ord.paymentDetails?.senderNumber}
                                </span>
                              </div>
                            ) : (
                              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[11px]">
                                Gateway
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={ord.status}
                              onChange={(e) =>
                                onUpdateOrderStatus(ord.id, e.target.value as OrderStatus)
                              }
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                ord.status === 'confirmed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : ord.status === 'processing'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : ord.status === 'shipped'
                                  ? 'bg-purple-50 text-purple-800 border-purple-300'
                                  : ord.status === 'delivered'
                                  ? 'bg-slate-100 text-slate-800 border-slate-300'
                                  : ord.status === 'cancelled'
                                  ? 'bg-red-50 text-red-800 border-red-300'
                                  : 'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                alert(
                                  `Order #${ord.id}\nCustomer: ${ord.customer.fullName}\nPhone: ${ord.customer.phone}\nAddress: ${ord.customer.fullAddress}, ${ord.customer.district}\nItems:\n${ord.items.map((it) => `- ${it.name.en} x${it.quantity} (৳${it.price * it.quantity})`).join('\n')}\nTotal: ৳${ord.totalAmount}`
                                );
                              }}
                              className="p-1.5 text-slate-500 hover:text-blue-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title="View Order Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Products Catalog */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-700">
                Total Products: {products.length}
              </span>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{currentT.addNewProduct}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={prod.images[0]}
                      alt={prod.name.en}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-blue-900 tracking-wider">
                        {prod.category} · {prod.sku}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {prod.name.en}
                      </h4>
                      <p className="text-xs font-extrabold text-blue-950 mt-1 tabular-nums">
                        ৳{prod.price}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span
                      className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                        prod.inStock
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {prod.inStock ? `In Stock (${prod.stockCount})` : 'Out of Stock'}
                    </span>

                    <button
                      onClick={() => setEditingProduct(prod)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      {currentT.editProduct}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Store Settings */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Payment & Delivery Configuration
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  bKash Merchant / Personal Number
                </label>
                <input
                  type="text"
                  value={settings.merchantBkash}
                  onChange={(e) =>
                    onUpdateSettings({ ...settings, merchantBkash: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nagad Merchant / Personal Number
                </label>
                <input
                  type="text"
                  value={settings.merchantNagad}
                  onChange={(e) =>
                    onUpdateSettings({ ...settings, merchantNagad: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Delivery Inside Dhaka (৳)
                  </label>
                  <input
                    type="number"
                    value={settings.dhakaDeliveryFee}
                    onChange={(e) =>
                      onUpdateSettings({
                        ...settings,
                        dhakaDeliveryFee: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Delivery Outside Dhaka (৳)
                  </label>
                  <input
                    type="number"
                    value={settings.outsideDhakaDeliveryFee}
                    onChange={(e) =>
                      onUpdateSettings({
                        ...settings,
                        outsideDhakaDeliveryFee: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Free Delivery Threshold (৳)
                </label>
                <input
                  type="number"
                  value={settings.freeDeliveryThreshold}
                  onChange={(e) =>
                    onUpdateSettings({
                      ...settings,
                      freeDeliveryThreshold: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Edit Product</h3>
            <form onSubmit={handleSaveProductEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title (EN)</label>
                <input
                  type="text"
                  value={editingProduct.name.en}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: { ...editingProduct.name, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Price (৳ BDT)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  value={editingProduct.stockCount}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      stockCount: Number(e.target.value),
                      inStock: Number(e.target.value) > 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  {currentT.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold cursor-pointer"
                >
                  {currentT.saveChanges}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">{currentT.addNewProduct}</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Name (EN)</label>
                <input
                  type="text"
                  required
                  value={newTitleEn}
                  onChange={(e) => setNewTitleEn(e.target.value)}
                  placeholder="e.g. Premium Cotton Shirt"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Name (BN)</label>
                <input
                  type="text"
                  value={newTitleBn}
                  onChange={(e) => setNewTitleBn(e.target.value)}
                  placeholder="যেমন: প্রিমিয়াম সুতি শার্ট"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                >
                  <option value="apparel">Apparel</option>
                  <option value="gadgets">Gadgets</option>
                  <option value="leather">Leather Goods</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (৳)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  {currentT.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold cursor-pointer"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
