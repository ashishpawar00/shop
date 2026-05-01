/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiCheck, FiChevronDown, FiFilter, FiPackage, FiPlus, FiSearch, FiShoppingCart, FiStar, FiX } from 'react-icons/fi';
import { GiPlantWatering } from 'react-icons/gi';
import { TbSeeding, TbTractor } from 'react-icons/tb';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { API_URL } from '@/lib/api';
import { useToast } from '@/components/Common/ToastProvider';

const COPY = {
  en: {
    title: 'Products | Laxmi Krashi Kendra',
    description: 'Browse trusted agricultural inputs, crop care products, and store-backed recommendations.',
    heading: 'All Products',
    all: 'All',
    seeds: 'Seeds',
    fertilizers: 'Fertilizers',
    pesticides: 'Pesticides',
    hardware: 'Hardware',
    searchPlaceholder: 'Search products...',
    results: 'results',
    newest: 'Newest',
    lowToHigh: 'Price: Low to High',
    highToLow: 'Price: High to Low',
    popular: 'Popular',
    add: 'Add to Cart',
    added: 'Added ✓',
    noResultsTitle: 'No products found',
    noResultsBody: 'Try a different search or category.',
    reset: 'Clear filters',
    off: 'OFF',
    freeDelivery: 'Free Delivery',
    assured: 'Assured Quality',
    outOfStock: 'Out of Stock',
    lowStock: 'Only {n} left',
    addedToast: 'Added to cart'
  },
  hi: {
    title: 'उत्पाद | लक्ष्मी कृषि केंद्र',
    description: 'भरोसेमंद कृषि उत्पाद, फसल सुरक्षा और स्टोर द्वारा समर्थित इनपुट देखें।',
    heading: 'सभी उत्पाद',
    all: 'सभी',
    seeds: 'बीज',
    fertilizers: 'उर्वरक',
    pesticides: 'कीटनाशक',
    hardware: 'हार्डवेयर',
    searchPlaceholder: 'उत्पाद खोजें...',
    results: 'परिणाम',
    newest: 'नया',
    lowToHigh: 'कम से अधिक कीमत',
    highToLow: 'अधिक से कम कीमत',
    popular: 'लोकप्रिय',
    add: 'कार्ट में डालें',
    added: 'जुड़ गया ✓',
    noResultsTitle: 'कोई उत्पाद नहीं मिला',
    noResultsBody: 'कोई अन्य खोज या श्रेणी आज़माएं।',
    reset: 'फ़िल्टर हटाएं',
    off: 'छूट',
    freeDelivery: 'मुफ़्त डिलीवरी',
    assured: 'गुणवत्ता आश्वासन',
    outOfStock: 'स्टॉक में नहीं',
    lowStock: 'सिर्फ {n} बचे',
    addedToast: 'कार्ट में जोड़ा गया'
  }
};

const FALLBACK_PRODUCTS = [
  {
    _id: 'demo-1',
    name: 'Bio Guard Mix',
    nameHindi: 'बायो गार्ड मिक्स',
    category: 'pesticides',
    price: 480,
    description: 'Leaf and stem protection blend for common disease pressure.',
    descriptionHindi: 'सामान्य रोग दबाव के लिए पत्ती और तना सुरक्षा मिश्रण।'
  },
  {
    _id: 'demo-2',
    name: 'Yield Plus',
    nameHindi: 'यील्ड प्लस',
    category: 'fertilizers',
    price: 640,
    description: 'Balanced nutrient support for stronger crop response.',
    descriptionHindi: 'बेहतर फसल प्रतिक्रिया के लिए संतुलित पोषण समर्थन।'
  },
  {
    _id: 'demo-3',
    name: 'Root Active',
    nameHindi: 'रूट एक्टिव',
    category: 'seeds',
    price: 520,
    description: 'Supports stronger early-stage crop establishment.',
    descriptionHindi: 'शुरुआती अवस्था में फसल की मजबूत स्थापना में मदद करता है।'
  },
  {
    _id: 'demo-4',
    name: 'Field Flow Kit',
    nameHindi: 'फील्ड फ्लो किट',
    category: 'hardware',
    price: 710,
    description: 'Reliable support kit for routine spray and flow handling.',
    descriptionHindi: 'रूटीन स्प्रे और फ्लो हैंडलिंग के लिए भरोसेमंद किट।'
  },
  {
    _id: 'demo-5',
    name: 'Green Shield Pro',
    nameHindi: 'ग्रीन शील्ड प्रो',
    category: 'pesticides',
    price: 390,
    description: 'Advanced crop protection for heavy pest infestation.',
    descriptionHindi: 'भारी कीट संक्रमण के लिए उन्नत फसल सुरक्षा।'
  },
  {
    _id: 'demo-6',
    name: 'Soil Boost NPK',
    nameHindi: 'सॉइल बूस्ट NPK',
    category: 'fertilizers',
    price: 560,
    description: 'Complete NPK blend for balanced soil nutrition.',
    descriptionHindi: 'संतुलित मिट्टी पोषण के लिए पूर्ण NPK मिश्रण।'
  }
];

const categoryIconMap = {
  seeds: TbSeeding,
  fertilizers: GiPlantWatering,
  pesticides: FiPackage,
  hardware: TbTractor
};

function StarRating({ rating = 4.2, count = 128 }) {
  const fullStars = Math.floor(rating);
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <FiStar
            key={star}
            size={12}
            className={star <= fullStars ? 'fill-yellow-400 text-yellow-400' : 'text-ink-muted/30'}
          />
        ))}
      </div>
      <span className="text-xs text-ink-muted">({count})</span>
    </div>
  );
}

function getMrp(price) {
  const markup = 1 + (0.15 + Math.random() * 0.25);
  return Math.round(price * markup / 10) * 10;
}

function getDiscount(price, mrp) {
  return Math.round(((mrp - price) / mrp) * 100);
}

export default function ProductsCatalogPage() {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const router = useRouter();
  const copy = COPY[language] || COPY.en;
  const isHindi = language === 'hi';
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(
    () => [
      { value: 'all', label: copy.all, icon: FiPackage },
      { value: 'seeds', label: copy.seeds, icon: TbSeeding },
      { value: 'fertilizers', label: copy.fertilizers, icon: GiPlantWatering },
      { value: 'pesticides', label: copy.pesticides, icon: FiPackage },
      { value: 'hardware', label: copy.hardware, icon: TbTractor }
    ],
    [copy]
  );

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (category !== 'all') {
        params.set('category', category);
      }
      if (search) {
        params.set('search', search);
      }
      params.set('sortBy', sortBy);
      params.set('page', String(page));
      params.set('limit', '20');

      const response = await fetch(`${API_URL}/products?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to load products');
      }

      const data = await response.json();
      setProducts((data.products || []).length ? data.products : FALLBACK_PRODUCTS);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.totalCount || (data.products || []).length || FALLBACK_PRODUCTS.length);
    } catch (error) {
      setProducts(FALLBACK_PRODUCTS);
      setTotalPages(1);
      setTotalCount(FALLBACK_PRODUCTS.length);
    } finally {
      setLoading(false);
    }
  }, [category, page, search, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (router.query.category && typeof router.query.category === 'string') {
      setCategory(router.query.category);
    }
    if (router.query.search && typeof router.query.search === 'string') {
      setSearch(router.query.search);
    }
  }, [router.query.category, router.query.search]);

  const { success: toastSuccess } = useToast();

  const handleAddToCart = product => {
    if (product.inStock === false) return;
    addToCart({
      id: product._id,
      _id: product._id,
      name: product.nameHindi || product.name,
      nameHindi: product.nameHindi,
      category: product.category || '',
      image: product.image || '',
      price: product.price || 0
    });

    setAddedId(product._id);
    const displayName = language === 'hi' ? (product.nameHindi || product.name) : (product.name || product.nameHindi);
    toastSuccess(`${displayName} — ${copy.addedToast}`);
    setTimeout(() => setAddedId(null), 1200);
  };

  const resetFilters = () => {
    setCategory('all');
    setSearch('');
    setSortBy('newest');
    setPage(1);
  };

  // Generate stable MRP values per product
  const productMrps = useMemo(() => {
    const map = {};
    products.forEach(p => {
      map[p._id] = getMrp(p.price);
    });
    return map;
  }, [products]);

  return (
    <>
      <Head>
        <title>{copy.title}</title>
        <meta name="description" content={copy.description} />
      </Head>

      <div className="min-h-screen bg-slate-base text-ink-primary">
        {/* Sticky Search + Filter Bar */}
        <div className="sticky top-16 z-30 border-b border-line-soft/10 bg-slate-base/95 backdrop-blur-lg md:top-20">
          <div className="mx-auto max-w-7xl px-3 py-2 sm:px-4">
            {/* Search */}
            <div className="flex gap-2">
              <label className="flex flex-1 items-center gap-2 rounded-lg border border-line-soft/10 bg-slate-card px-3 py-2">
                <FiSearch size={16} className="shrink-0 text-ink-muted" />
                <input
                  value={search}
                  onChange={event => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder={copy.searchPlaceholder}
                  className="w-full bg-transparent text-sm text-ink-primary outline-none placeholder:text-ink-muted"
                />
                {search ? (
                  <button type="button" onClick={() => { setSearch(''); setPage(1); }} className="text-ink-muted hover:text-ink-primary">
                    <FiX size={14} />
                  </button>
                ) : null}
              </label>

              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1 rounded-lg border border-line-soft/10 bg-slate-card px-3 py-2 text-sm font-semibold text-ink-secondary sm:hidden"
              >
                <FiFilter size={14} />
              </button>

              <div className="hidden items-center gap-1.5 rounded-lg border border-line-soft/10 bg-slate-card px-3 py-2 text-sm text-ink-secondary sm:flex">
                <FiChevronDown size={14} className="text-ink-muted" />
                <select
                  value={sortBy}
                  onChange={event => {
                    setSortBy(event.target.value);
                    setPage(1);
                  }}
                  className="bg-transparent text-sm outline-none"
                >
                  <option value="newest">{copy.newest}</option>
                  <option value="price_low">{copy.lowToHigh}</option>
                  <option value="price_high">{copy.highToLow}</option>
                  <option value="popular">{copy.popular}</option>
                </select>
              </div>
            </div>

            {/* Category pills */}
            <div className={`mt-2 flex gap-2 overflow-x-auto pb-1 ${showFilters ? '' : 'hidden sm:flex'}`}>
              {categories.map(item => {
                const active = category === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      setCategory(item.value);
                      setPage(1);
                      setShowFilters(false);
                    }}
                    className={`inline-flex shrink-0 items-center rounded-full px-3 py-1.5 text-xs font-bold transition ${
                      active
                        ? 'bg-accent-emerald text-white'
                        : 'border border-line-soft/10 bg-slate-card text-ink-secondary hover:border-accent-emerald/30'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Mobile sort */}
              <div className="flex items-center sm:hidden">
                <select
                  value={sortBy}
                  onChange={event => {
                    setSortBy(event.target.value);
                    setPage(1);
                  }}
                  className="rounded-full border border-line-soft/10 bg-slate-card px-3 py-1.5 text-xs font-bold text-ink-secondary outline-none"
                >
                  <option value="newest">{copy.newest}</option>
                  <option value="price_low">{copy.lowToHigh}</option>
                  <option value="price_high">{copy.highToLow}</option>
                  <option value="popular">{copy.popular}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-4">
          <p className="text-xs text-ink-muted">
            <span className="font-bold text-ink-primary">{totalCount}</span> {copy.results}
            {category !== 'all' ? (
              <span> · <button type="button" onClick={resetFilters} className="text-accent-emerald hover:underline">{copy.reset}</button></span>
            ) : null}
          </p>
        </div>

        {/* Product Grid */}
        <main className="mx-auto max-w-7xl px-2 pb-16 pt-3 sm:px-4">
          {loading ? (
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-xl border border-line-soft/10 bg-slate-card">
                  <div className="aspect-square rounded-t-xl bg-slate-base/60" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 w-3/4 rounded bg-slate-base/60" />
                    <div className="h-3 w-1/2 rounded bg-slate-base/60" />
                    <div className="h-8 w-full rounded-lg bg-slate-base/60" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-emerald/10 text-accent-emerald">
                <FiPackage size={28} />
              </div>
              <h2 className={`text-xl font-bold text-ink-primary ${isHindi ? 'font-hindi' : ''}`}>{copy.noResultsTitle}</h2>
              <p className={`mt-2 text-sm text-ink-muted ${isHindi ? 'font-hindi' : ''}`}>{copy.noResultsBody}</p>
              <button type="button" onClick={resetFilters} className="mt-4 rounded-full bg-accent-emerald px-5 py-2 text-sm font-bold text-white">
                {copy.reset}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product, index) => {
                const justAdded = addedId === product._id;
                const CategoryIcon = categoryIconMap[product.category] || FiPackage;
                const localizedName = language === 'hi' ? product.nameHindi || product.name : product.name || product.nameHindi;
                const mrp = productMrps[product._id] || getMrp(product.price);
                const discount = getDiscount(product.price, mrp);
                const detailsHref = `/products/${product._id}`;
                const isOutOfStock = product.inStock === false;
                const isLowStock = !isOutOfStock && product.stockQuantity > 0 && product.stockQuantity < 5;

                return (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="group flex flex-col overflow-hidden rounded-xl border border-line-soft/10 bg-slate-card transition-shadow hover:shadow-lg hover:shadow-black/10"
                  >
                    {/* Product Image */}
                    <Link href={detailsHref} className="relative block">
                      <div className="flex aspect-square items-center justify-center overflow-hidden bg-slate-base/50">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={localizedName}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-3 p-4 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-emerald/15">
                              <CategoryIcon size={32} className="text-accent-emerald" />
                            </div>
                            <p className="line-clamp-2 text-xs font-semibold text-ink-muted">{localizedName}</p>
                          </div>
                        )}
                      </div>

                      {/* Discount Badge */}
                      {discount > 0 ? (
                        <span className="absolute left-0 top-2 rounded-r-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          {discount}% {copy.off}
                        </span>
                      ) : null}

                      {/* Assured badge */}
                      <span className="absolute bottom-2 right-2 rounded-md bg-accent-emerald/90 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
                        ✓ {copy.assured}
                      </span>

                      {/* Out of stock overlay */}
                      {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <span className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white">{copy.outOfStock}</span>
                        </div>
                      )}
                    </Link>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col p-2.5 sm:p-3">
                      {/* Category tag */}
                      <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-accent-emerald">
                        {product.category || copy.all}
                      </span>

                      {/* Name */}
                      <Link href={detailsHref}>
                        <h3 className={`line-clamp-2 text-sm font-semibold leading-tight text-ink-primary transition-colors group-hover:text-accent-emerald ${isHindi ? 'font-hindi' : ''}`}>
                          {localizedName}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className="mt-1.5">
                        <StarRating rating={3.8 + (index % 5) * 0.2} count={50 + index * 23} />
                      </div>

                      {/* Price Section */}
                      <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
                        <span className="text-lg font-bold text-ink-primary sm:text-xl">₹{product.price}</span>
                        {mrp > product.price ? (
                          <>
                            <span className="text-xs text-ink-muted line-through">₹{mrp}</span>
                            <span className="text-xs font-bold text-green-500">{discount}% off</span>
                          </>
                        ) : null}
                      </div>

                      {/* Free delivery */}
                      <p className="mt-1 text-[10px] text-ink-muted">{copy.freeDelivery}</p>

                      {/* Low stock warning */}
                      {isLowStock && (
                        <p className="mt-1 text-[10px] font-bold text-orange-500">
                          {copy.lowStock.replace('{n}', product.stockQuantity)}
                        </p>
                      )}

                      {/* Add to Cart */}
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        disabled={isOutOfStock}
                        className={`mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all sm:text-sm ${
                          isOutOfStock
                            ? 'cursor-not-allowed bg-slate-base/60 text-ink-muted'
                            : justAdded
                              ? 'bg-green-500/15 text-green-600'
                              : 'bg-accent-emerald text-white hover:bg-emerald-600 active:scale-[0.97]'
                        }`}
                      >
                        {justAdded ? <FiCheck size={14} /> : <FiShoppingCart size={14} />}
                        {justAdded ? copy.added : copy.add}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 ? (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const current = index + 1;
                return (
                  <button
                    key={current}
                    type="button"
                    onClick={() => setPage(current)}
                    className={`h-9 min-w-[36px] rounded-lg px-3 text-sm font-bold transition ${
                      page === current
                        ? 'bg-accent-emerald text-white'
                        : 'border border-line-soft/10 bg-slate-card text-ink-secondary hover:text-ink-primary'
                    }`}
                  >
                    {current}
                  </button>
                );
              })}
            </div>
          ) : null}
        </main>
      </div>
    </>
  );
}

