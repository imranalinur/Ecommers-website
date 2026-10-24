import { Product, StoreSettings } from '../types';
import { STORE_IMAGES } from '../assets/images';

export const initialStoreSettings: StoreSettings = {
  storeName: {
    en: 'Nokkhotro Lifestyle',
    bn: 'নক্ষত্র লাইফস্টাইল',
  },
  tagline: {
    en: 'Curated Bangladeshi Apparel, Smart Gadgets & Artisanal Leathercraft',
    bn: 'অভিজাত দেশীয় পোশাক, আধুনিক গ্যাজেট এবং নিখুঁত চামড়াশিল্প',
  },
  merchantBkash: '01712-345678',
  merchantNagad: '01812-345678',
  dhakaDeliveryFee: 70,
  outsideDhakaDeliveryFee: 130,
  freeDeliveryThreshold: 3000,
  hotlinePhone: '+880 1700-987654',
  whatsappNumber: '+880 1700-987654',
  supportEmail: 'support@nokkhotrolifestyle.com',
  address: {
    en: 'House 42, Road 11, Banani, Dhaka-1213, Bangladesh',
    bn: 'বাড়ি ৪২, রোড ১১, বনানী, ঢাকা-১২১৩, বাংলাদেশ',
  },
};

export const sampleProducts: Product[] = [
  {
    id: 'nok-101',
    sku: 'NK-PANJ-01',
    name: {
      en: 'Royal Midnight Embroidered Cotton Panjabi',
      bn: 'রয়্যাল মিডনাইট সুতি এমব্রয়ডারি করা পাঞ্জাবি',
    },
    category: 'apparel',
    price: 2450,
    originalPrice: 2950,
    images: [
      STORE_IMAGES.panjabi,
      STORE_IMAGES.hero,
    ],
    shortDescription: {
      en: 'Hand-detailed neckline and placket with breathable 100% combed cotton. Ideal for Eid, weddings, and formal evening gatherings.',
      bn: '১০০% কম্বড সুতির তৈরি সূক্ষ্ম এমব্রয়ডারি করা রাজকীয় পাঞ্জাবি। ঈদ, উৎসব এবং যেকোনো সামাজিক অনুষ্ঠানের জন্য মানানসই।',
    },
    description: {
      en: 'Crafted with passion in Narayanganj by master artisans, this premium cotton Panjabi features subtle metallic-thread collar embroidery, tailored slim-comfort fit, and natural horn-look buttons. It keeps you crisp, cool, and distinguished throughout the Bangladeshi climate.',
      bn: 'নারায়ণগঞ্জের অভিজ্ঞ কারিগরদের নিপুণ হাতের ছোঁয়ায় তৈরি এই প্রিমিয়াম সুতি পাঞ্জাবি। বিশেষ কলার নকশা, আরামদায়ক স্লিম-ফিট কাটিং এবং উন্নত বোতামের মেলবন্ধন আপনাকে এনে দেবে স্নিগ্ধ আভিজাত্য।',
    },
    features: {
      en: [
        '100% Combed Compact Cotton (Lightweight & Breathable)',
        'Intricate neck embroidery with high-density gold thread',
        'Traditional side slits with reinforced bartack stitching',
        'Machine wash gentle / dry clean recommended',
      ],
      bn: [
        '১০০% কম্বড পিওর কটন (গরমের দিনেও আরামদায়ক)',
        'কলার ও বোতামের অংশে নিখুঁত সুতার এমব্রয়ডারি',
        'সাইড স্লিট ও টেকসই স্টিচিং ফিনিশিং',
        'সহজে ধোয়া যায় ও টেকসই রঙ',
      ],
    },
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)'],
    colors: [
      { name: { en: 'Midnight Navy', bn: 'মিডনাইট নেভি' }, hex: '#0f2347' },
      { name: { en: 'Ivory White', bn: 'আইভরি সাদা' }, hex: '#f8fafc' },
      { name: { en: 'Emerald Green', bn: 'পান্না সবুজ' }, hex: '#064e3b' },
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.9,
    reviewsCount: 142,
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: 'nok-102',
    sku: 'NK-TECH-02',
    name: {
      en: 'Titanium AMOLED Calling Smartwatch (Bangla Font Support)',
      bn: 'টাইটানিয়াম অ্যামোলেড কলিং স্মার্টওয়াচ (বাংলা ফন্ট সাপোর্টেড)',
    },
    category: 'gadgets',
    price: 3650,
    originalPrice: 4500,
    images: [
      STORE_IMAGES.smartwatch,
      STORE_IMAGES.hero,
    ],
    shortDescription: {
      en: 'Ultra-bright 1.96" AMOLED display, Bluetooth calling with noise reduction mic, 7-day battery life, and complete Bengali notification support.',
      bn: '১.৯৬ ইঞ্চি সুপার অ্যামোলেড ডিসপ্লে, ক্লিয়ার ব্লুটুথ কলিং, ৭ দিনের ব্যাটারি লাইফ এবং সম্পূর্ণ বাংলা নোটিফিকেশন প্রদর্শন।',
    },
    description: {
      en: 'Designed for daily urban commuting and fitness tracking across Bangladesh. Built with aerospace-grade titanium bezel, IP68 water resistance against tropical monsoon rain, and built-in SpO2, heart rate, and sleep monitoring sensors.',
      bn: 'বাংলাদেশি জীবনযাত্রার সাথে মানানসই প্রিমিয়াম টাইটানিয়াম স্মার্টওয়াচ। বৃষ্টির দিনেও ব্যবহারের জন্য IP68 ওয়াটারপ্রুফ, হার্ট রেট ও প্রেশার সেন্সর, এবং যেকোনো বাংলা এসএমএস/নোটিফিকেশন সহজে পড়ার সুবিধা।',
    },
    features: {
      en: [
        '1.96" HD Curved AMOLED Screen (Always-On Display)',
        'Crystal HD Bluetooth Voice Calling with built-in speaker',
        'Official Bangla Language & Push Notification support',
        '120+ Sports modes and 7-day battery endurance',
        '1 Year Official Replacement Warranty',
      ],
      bn: [
        '১.৯৬ ইঞ্চি কার্ভড অ্যামোলেড ডিসপ্লে (অলওয়েজ-অন সুবিধা)',
        'লাউড ও ক্লিয়ার ব্লুটুথ কলিং ও মাইক',
        'বাংলা ভাষা ও সরাসরি বাংলা মেসেজ পড়ার সুবিধা',
        '১২০+ স্পোর্টস মোড ও ৭ দিনের দীর্ঘস্থায়ী ব্যাটারি',
        '১ বছরের অফিশিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
      ],
    },
    colors: [
      { name: { en: 'Space Titanium', bn: 'স্পেস টাইটানিয়াম' }, hex: '#334155' },
      { name: { en: 'Midnight Black', bn: 'মিডনাইট ব্ল্যাক' }, hex: '#09090b' },
      { name: { en: 'Ocean Orange', bn: 'ওশান অরেঞ্জ' }, hex: '#ea580c' },
    ],
    inStock: true,
    stockCount: 24,
    rating: 4.8,
    reviewsCount: 89,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
  },
  {
    id: 'nok-103',
    sku: 'NK-LEATH-03',
    name: {
      en: 'Artisan Full-Grain Vintage Leather Bifold Wallet',
      bn: 'আর্টিসান ফুল-গ্রেইন ভিন্টেজ চামড়ার দ্বি-ভাঁজ ওয়ালেট',
    },
    category: 'leather',
    price: 1350,
    originalPrice: 1750,
    images: [
      STORE_IMAGES.wallet,
      STORE_IMAGES.hero,
    ],
    shortDescription: {
      en: 'Hand-stitched Hazaribagh heritage full-grain cowhide leather with RFID blocking technology and brass button fastener.',
      bn: 'হাজারীবাগের ঐতিহ্যবাহী খাঁটি ফুল-গ্রেইন চামড়ায় হাতে তৈরি ওয়ালেট। আরএফআইডি সিকিউরিটি ও পিতলের মজবুত বোতাম।',
    },
    description: {
      en: 'Every piece is cut and saddle-stitched by veteran leather artisans. It comfortably holds Bangladeshi currency notes without folding them, alongside 8 credit/debit card slots, a transparent National ID window, and a coin pouch.',
      bn: 'বাংলাদেশের খাঁটি চামড়া দিয়ে হাতে সেলাই করা আভিজাত্যের ওয়ালেট। বাংলাদেশি টাকা সমানভাবে রাখা, ৮টি কার্ড স্লট, জাতীয় পরিচয়পত্র (NID) রাখার উইন্ডো এবং কয়েন পকেট রয়েছে। ব্যবহারে চামড়ার রঙ আরও উজ্জ্বল হয়।',
    },
    features: {
      en: [
        '100% Genuine Full-Grain Export Quality Cowhide Leather',
        'Integrated RFID Blocking lining to protect contactless cards',
        'Dedicated Bangladeshi bank note chamber & NID card slot',
        '5-Year Leather Longevity Guarantee',
      ],
      bn: [
        '১০০% খাঁটি এক্সপোর্ট কোয়ালিটি ফুল-গ্রেইন চামড়া',
        'কার্ডের নিরাপত্তা নিশ্চিত করতে আরএফআইডি ব্লকিং প্রযুক্তি',
        'বাংলাদেশি টাকার মাপের বড় চেম্বার ও এনআইডি কার্ড উইন্ডো',
        '৫ বছরের চামড়ার দীর্ঘস্থায়ী টেকসই নিশ্চয়তা',
      ],
    },
    colors: [
      { name: { en: 'Vintage Tan Brown', bn: 'ভিন্টেজ ট্যান বাদামী' }, hex: '#78350f' },
      { name: { en: 'Deep Charcoal Black', bn: 'কয়লা কালো' }, hex: '#18181b' },
    ],
    inStock: true,
    stockCount: 35,
    rating: 4.9,
    reviewsCount: 215,
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: 'nok-104',
    sku: 'NK-AUDIO-04',
    name: {
      en: 'Aura Sound ANC Wireless Earbuds (Environmental Noise Cancellation)',
      bn: 'অরা সাউন্ড এএনসি ওয়্যারলেস ইয়ারবাডস (নয়েজ ক্যান্সেলেশন)',
    },
    category: 'gadgets',
    price: 1850,
    originalPrice: 2400,
    images: [
      STORE_IMAGES.hero,
      STORE_IMAGES.smartwatch,
    ],
    shortDescription: {
      en: 'Deep bass dynamic drivers, 32dB active noise cancellation for Dhaka traffic, low latency gaming mode, and 36-hour total playback.',
      bn: 'শক্তিশালী বাস সাউন্ড, ঢাকার ট্রাফিকের শব্দ দূর করতে ৩২ ডেসিবেল নয়েজ ক্যান্সেলেশন, গেমিং মোড ও ৩৬ ঘণ্টা ব্যাকআপ।',
    },
    description: {
      en: 'Specifically tuned for music lovers who need undisturbed acoustic clarity whether riding in a bus or studying. Featuring quadruple quad-mic beamforming technology so your phone calls remain crystal clear.',
      bn: 'ক্লিয়ার মিউজিক ও নয়েজমুক্ত ফোন কলের জন্য বিশেষায়িত ৪-মাইক প্রযুক্তি। বাসের জ্যাম বা কোলাহলের মাঝেও প্রিয়জনের সাথে কথা বলুন নির্বিঘ্নে।',
    },
    features: {
      en: [
        '32dB Hybrid Active Noise Cancellation (ANC)',
        '10mm Titanium Composite Acoustic Drivers',
        '36-Hour playback with fast USB Type-C charging case',
        'Gaming mode with ultra-low 45ms latency',
        '6 Months Replacement Guarantee',
      ],
      bn: [
        '৩২ ডেসিবেল হাইব্রিড অ্যাক্টিভ নয়েজ ক্যান্সেলেশন',
        '১০ মিমি টাইটানিয়াম কম্পোজিট স্পিকার ড্রাইভার',
        'টাইপ-সি ফাস্ট চার্জিংসহ ৩৬ ঘণ্টা পর্যন্ত ব্যাটারি ব্যাকআপ',
        '৪৫ মিলি-সেকেন্ড আল্ট্রা-লো লেটেন্সি গেমিং মোড',
        '৬ মাসের রিপ্লেসমেন্ট গ্যারান্টি',
      ],
    },
    colors: [
      { name: { en: 'Matte Obsidian Black', bn: 'ম্যাট ব্ল্যাক' }, hex: '#111827' },
      { name: { en: 'Ceramic White', bn: 'সিরামিক সাদা' }, hex: '#f8fafc' },
    ],
    inStock: true,
    stockCount: 15,
    rating: 4.7,
    reviewsCount: 78,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
  },
  {
    id: 'nok-105',
    sku: 'NK-APPR-05',
    name: {
      en: 'Hand-Loom Jamdani Motif Pure Cotton Saree',
      bn: 'হ্যান্ডলুম জামদানি মোটিফ পিওর কтон শাড়ি',
    },
    category: 'apparel',
    price: 3200,
    originalPrice: 3800,
    images: [
      STORE_IMAGES.hero,
      STORE_IMAGES.panjabi,
    ],
    shortDescription: {
      en: 'Authentic Tangail weavers hand-loom pure cotton saree with traditional geometric Jamdani motifs and matching unstitched blouse piece.',
      bn: 'টাঙ্গাইলের ঐতিহ্যবাহী তাঁতিদের হাতে বোনা খাঁটি সুতি শাড়ি। ঐতিহ্যবাহী জ্যামিতিক নকশা ও ম্যাচিং ব্লাউজ পিসসহ।',
    },
    description: {
      en: 'Woven with high-count soft Bengali cotton yarn, this drape combines heritage Bengali craftsmanship with lightweight modern elegance. Comes with 80cm matching blouse piece.',
      bn: 'নরম সুতোয় বোনা এই শাড়ি যেকোনো বাঙালি উৎসব, পহেলা বৈশাখ, বা ঘরোয়া আয়োজনে আপনাকে দেবে স্নিগ্ধ আভিজাত্য। সাথে রয়েছে ম্যাচিং ব্লাউজ পিস।',
    },
    features: {
      en: [
        '100% Tangail Hand-Loom Cotton',
        '14-Haat standard length with matching 80cm blouse piece',
        'Soft skin-friendly drape, no harsh starch required',
        'Colorfast guaranteed dye',
      ],
      bn: [
        '১০০% টাঙ্গাইল তাঁতের খাঁটি সুতি শাড়ি',
        '১৪ হাত লম্বা (ম্যাচিং ৮০ সেমি ব্লাউজ পিস অন্তর্ভুক্ত)',
        'নরম ও আরামদায়ক অনুভূতি, অতিরিক্ত মাড় দেওয়ার প্রয়োজন নেই',
        'পাকা রঙের শতভাগ নিশ্চয়তা',
      ],
    },
    colors: [
      { name: { en: 'Crimson Red & Golden', bn: 'গাঢ় লাল ও সোনালী' }, hex: '#991b1b' },
      { name: { en: 'Royal Blue & Silver', bn: 'রয়্যাল ব্লু ও রূপালী' }, hex: '#1e3a8a' },
      { name: { en: 'Pastel Mint Green', bn: 'মিন্ট সবুজ' }, hex: '#059669' },
    ],
    inStock: true,
    stockCount: 12,
    rating: 4.9,
    reviewsCount: 164,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
  },
  {
    id: 'nok-106',
    sku: 'NK-LEATH-06',
    name: {
      en: 'Executive Handcrafted Leather Laptop Messenger Bag',
      bn: 'এক্সিকিউটিভ হ্যান্ডক্রাফটেড লেদার ল্যাপটপ মেসেঞ্জার ব্যাগ',
    },
    category: 'leather',
    price: 4850,
    originalPrice: 5800,
    images: [
      STORE_IMAGES.wallet,
      STORE_IMAGES.hero,
    ],
    shortDescription: {
      en: 'Fits up to 15.6" laptop with padded velvet compartment, antique brass hardware, and detachable ergonomic shoulder strap.',
      bn: '১৫.৬ ইঞ্চি ল্যাপটপ প্যাডেড চেম্বার, এন্টিক ব্রাস ফিটিংস এবং আরামদায়ক অ্যাডজাস্টেবল শোল্ডার স্ট্র্যাপ।',
    },
    description: {
      en: 'Engineered for executives, lawyers, and corporate professionals. Features a dedicated tech sleeve, document divider, waterproof inner nylon lining, and reinforced handle grips.',
      bn: 'অফিস, কর্পোরেট মিটিং এবং প্রফেশনাল ব্যবহারের জন্য রাজকীয় লুক। খাঁটি চামড়ার সুঘ্রাণ ও যুগের পর যুগ টিকিয়ে রাখার সক্ষমতা সম্পন্ন প্রিমিয়াম ব্যাগ।',
    },
    features: {
      en: [
        'Full grain oiled pull-up leather that develops unique patina',
        'Shock-absorbent laptop sleeve up to 15.6 inches',
        'Heavy-duty YKK brass zippers and metal hooks',
        'Trolley strap attachment for seamless airport travel',
      ],
      bn: [
        'প্রিমিয়াম পুল-আপ লেদার যা ব্যবহারে আরো সুন্দর হয়',
        '১৫.৬ ইঞ্চি ল্যাপটপের জন্য শক-প্রুফ চেম্বার',
        'মজবুত ব্রাস ওয়াইকেকে জিপার ও মেটাল হুক',
        'ট্রাভেলের সুবিধার জন্য ট্রলি স্ট্র্যাপ অ্যাটাচমেন্ট',
      ],
    },
    colors: [
      { name: { en: 'Cognac Saddle Brown', bn: 'স্যাডল বাদামী' }, hex: '#713f12' },
      { name: { en: 'Executive Pitch Black', bn: 'কালো' }, hex: '#18181b' },
    ],
    inStock: true,
    stockCount: 8,
    rating: 5.0,
    reviewsCount: 53,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
  },
  {
    id: 'nok-107',
    sku: 'NK-APPR-07',
    name: {
      en: 'Organic Pima Cotton Smart Polo Shirt',
      bn: 'অর্গানিক পিমা কটন স্মার্ট পোলো শার্ট',
    },
    category: 'apparel',
    price: 1150,
    originalPrice: 1450,
    images: [
      STORE_IMAGES.panjabi,
      STORE_IMAGES.hero,
    ],
    shortDescription: {
      en: '220 GSM heavyweight pique knit polo with anti-pilling wash, no-curl ribbed collar, and athletic regular cut.',
      bn: '২২০ জিএসএম উন্নত মানের পিকে কটন পোলো শার্ট। কলার কুঁচকে যায় না এবং সহজে রোঁয়া ওঠে না।',
    },
    description: {
      en: 'The essential weekend and smart-casual polo tailored for Bangladesh. Breathable fabric keeps perspiration at bay, with clean taped neck seam and mother-of-pearl buttons.',
      bn: 'ছুটির দিন বা ক্যাজুয়াল অফিসের জন্য পারফেক্ট পোলো শার্ট। দীর্ঘক্ষণ পরিধানেও ঘাম ও অস্বস্তি হয় না। একাধিক রঙের বৈচিত্র্য।',
    },
    features: {
      en: [
        '220 GSM 100% Pima Combed Pique Fabric',
        'Anti-shrinkage & Bio-wash softening treatment',
        'Laser-engraved buttons and ribbed cuff sleeves',
      ],
      bn: [
        '২২০ জিএসএম ১০০% পিমা সুতি ফ্যাব্রিক',
        'বায়ো-ওয়াশ করা বিশেষ সফট ফিনিশ',
        'মজবুত কাফ ও নান্দনিক লেজার প্রিন্টেড বোতাম',
      ],
    },
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: { en: 'Deep Navy', bn: 'গাঢ় নেভি' }, hex: '#0f172a' },
      { name: { en: 'Maroon Burgundy', bn: 'মেরুন' }, hex: '#831843' },
      { name: { en: 'Forest Green', bn: 'সবুজ' }, hex: '#14532d' },
    ],
    inStock: true,
    stockCount: 40,
    rating: 4.8,
    reviewsCount: 94,
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: 'nok-108',
    sku: 'NK-TECH-08',
    name: {
      en: 'MagPower 20,000mAh 65W Fast Charge Power Bank',
      bn: 'ম্যাগপাওয়ার ২০,০০০ মিলিঅ্যাম্পিয়ার ৬৫ ওয়াট ফাস্ট পাওয়ার ব্যাংক',
    },
    category: 'gadgets',
    price: 2750,
    originalPrice: 3300,
    images: [
      STORE_IMAGES.smartwatch,
      STORE_IMAGES.hero,
    ],
    shortDescription: {
      en: 'Charge laptops, iPhones, and Androids at 65W PD speed. LED percentage display, dual Type-C + USB output, flight approved.',
      bn: 'ল্যাপটপ, আইফোন ও যেকোনো অ্যান্ড্রয়েড ফাস্ট চার্জ করার জন্য ৬৫ ওয়াট পিডি চার্জার। ডিজিটাল এলইডি ডিসপ্লে।',
    },
    description: {
      en: 'Power through load-shedding and long journeys across Bangladesh. High density lithium-polymer cells with multi-layer safety surge protection.',
      bn: 'লোডশেডিং কিংবা যেকোনো ভ্রমণের সেরা সঙ্গী। একসাথে ৩টি ডিভাইস চার্জ করার সুবিধা এবং উন্নত অগ্নিনিরোধক সুরক্ষা সিস্টেম।',
    },
    features: {
      en: [
        '65W Power Delivery (Can charge MacBooks & laptops)',
        'Real-time Digital LED percentage display',
        'Triple device simultaneous charging',
        'Aviation safety flight travel approved',
      ],
      bn: [
        '৬৫ ওয়াট পাওয়ার ডেলিভারি (ল্যাপটপ চার্জ সম্ভব)',
        'রিয়েলটাইম ডিজিটাল ব্যাটারি শতাংশ ডিসপ্লে',
        'একসাথে তিনটি ডিভাইস চার্জ করার সুবিধা',
        'বিমানে বহনযোগ্য আন্তর্জাতিক সার্টিফিকেশন',
      ],
    },
    colors: [
      { name: { en: 'Slate Gray', bn: 'স্লেট গ্রে' }, hex: '#475569' },
      { name: { en: 'Matte White', bn: 'ম্যাট সাদা' }, hex: '#f1f5f9' },
    ],
    inStock: true,
    stockCount: 19,
    rating: 4.9,
    reviewsCount: 112,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
  },
];

export const sampleInitialOrders = [
  {
    id: 'BD-74912',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    customer: {
      fullName: 'Tanvir Hossain',
      phone: '01711223344',
      district: 'Dhaka',
      fullAddress: 'House 14, Road 4, Sector 7, Uttara, Dhaka',
      orderNote: 'Please deliver after 2 PM if possible',
    },
    items: [
      {
        id: 'nok-101-42-navy',
        productId: 'nok-101',
        name: {
          en: 'Royal Midnight Embroidered Cotton Panjabi',
          bn: 'রয়্যাল মিডনাইট সুতি এমব্রয়ডারি করা পাঞ্জাবি',
        },
        price: 2450,
        image: STORE_IMAGES.panjabi,
        quantity: 1,
        selectedSize: '42 (L)',
        selectedColor: 'Midnight Navy',
      },
    ],
    subtotal: 2450,
    deliveryFee: 70,
    totalAmount: 2520,
    paymentMethod: 'cod' as const,
    status: 'processing' as const,
  },
  {
    id: 'BD-81204',
    createdAt: new Date(Date.now() - 3600000 * 22).toISOString(),
    customer: {
      fullName: 'Nusrat Jahan',
      phone: '01899887766',
      district: 'Chattogram',
      fullAddress: 'Flat 5B, Nasirabad Housing Society, Chattogram',
    },
    items: [
      {
        id: 'nok-103-tan',
        productId: 'nok-103',
        name: {
          en: 'Artisan Full-Grain Vintage Leather Bifold Wallet',
          bn: 'আর্টিসান ফুল-গ্রেইন ভিন্টেজ চামড়ার দ্বি-ভাঁজ ওয়ালেট',
        },
        price: 1350,
        image: STORE_IMAGES.wallet,
        quantity: 1,
        selectedColor: 'Vintage Tan Brown',
      },
      {
        id: 'nok-104-black',
        productId: 'nok-104',
        name: {
          en: 'Aura Sound ANC Wireless Earbuds',
          bn: 'অরা সাউন্ড এএনসি ওয়্যারলেস ইয়ারবাডস',
        },
        price: 1850,
        image: STORE_IMAGES.hero,
        quantity: 1,
        selectedColor: 'Matte Obsidian Black',
      },
    ],
    subtotal: 3200,
    deliveryFee: 0, // free delivery threshold passed
    totalAmount: 3200,
    paymentMethod: 'bkash_nagad' as const,
    paymentDetails: {
      provider: 'bKash' as const,
      senderNumber: '01899887766',
      trxId: '9J28DA1002',
    },
    status: 'confirmed' as const,
  },
];
