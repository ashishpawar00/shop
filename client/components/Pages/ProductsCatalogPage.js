/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiFilter, FiMessageCircle, FiPackage, FiPlus, FiSearch, FiShoppingCart } from 'react-icons/fi';
import { GiPlantWatering } from 'react-icons/gi';
import { TbSeeding, TbTractor } from 'react-icons/tb';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { API_URL } from '@/lib/api';

const COPY = {
  en: {
    title: 'Products | Laxmi Krashi Kendra',
    description: 'Browse trusted agricultural inputs, crop care products, and store-backed recommendations.',
    eyebrow: 'Store catalog',
    headline: 'Trusted farm inputs, clearly organized for faster buying decisions.',
    intro: 'Search by crop need, compare categories quickly, and move into cart or WhatsApp without jumping across multiple pages.',
    all: 'All',
    seeds: 'Seeds',
    fertilizers: 'Fertilizers',
    pesticides: 'Pesticides',
    hardware: 'Hardware',
    searchPlaceholder: 'Search products, brands, or crop needs',
    itemsAvailable: 'items available',
    newest: 'Newest',
    lowToHigh: 'Price low to high',
    highToLow: 'Price high to low',
    popular: 'Popular',
    details: 'View details',
    add: 'Add',
    added: 'Added',
    askOnWhatsApp: 'Ask on WhatsApp',
    noResultsTitle: 'No matching products found',
    noResultsBody: 'Try changing the category or search term and the catalog will refresh immediately.',
    reset: 'Reset filters',
    footerTitle: 'Need help choosing the right input?',
    footerBody: 'If you are unsure which product fits your crop condition, start with diagnosis or ask the team directly.',
    footerPrimary: 'Start crop diagnosis',
    footerSecondary: 'Contact support'
  },
  hi: {
    title: 'उत्पाद | लक्ष्मी कृषि केंद्र',
    description: 'भरोसेमंद कृषि उत्पाद, फसल सुरक्षा और स्टोर द्वारा समर्थित इनपुट देखें।',
    eyebrow: 'स्टोर कैटलॉग',
    headline: 'भरोसेमंद कृषि उत्पाद, ताकि खरीद का फैसला जल्दी और साफ हो।',
    intro: 'फसल की जरूरत के हिसाब से खोजें, श्रेणियां जल्दी तुलना करें और सीधे कार्ट या WhatsApp पर जाएं।',
    all: 'सभी',
    seeds: 'बीज',
    fertilizers: 'उर्वरक',
    pesticides: 'कीटनाशक',
    hardware: 'हार्डवेयर',
    searchPlaceholder: 'उत्पाद, ब्रांड या जरूरत खोजें',
    itemsAvailable: 'उत्पाद उपलब्ध',
    newest: 'नया',
    lowToHigh: 'कम से अधिक कीमत',
    highToLow: 'अधिक से कम कीमत',
    popular: 'लोकप्रिय',
    add: 'जोड़ें',
    added: 'जुड़ गया',
    askOnWhatsApp: 'WhatsApp पर पूछें',
    noResultsTitle: 'मेल खाते उत्पाद नहीं मिले',
    noResultsBody: 'श्रेणी या खोज शब्द बदलें, कैटलॉग तुरंत अपडेट हो जाएगा।',
    reset: 'फिल्टर रीसेट करें',
    footerTitle: 'सही उत्पाद चुनने में मदद चाहिए?',
    footerBody: 'अगर सही इनपुट को लेकर संदेह है, तो पहले फसल जांच करें या सीधे टीम से बात करें।',
    footerPrimary: 'फसल जांच शुरू करें',
    footerSecondary: 'संपर्क करें'
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
  }
];

const categoryIconMap = {
  seeds: TbSeeding,
  fertilizers: GiPlantWatering,
  pesticides: FiPackage,
  hardware: TbTractor
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function ProductsCatalogPage() {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const router = useRouter();
  const copy = COPY[language] || COPY.en;
  const detailsLabel = copy.details || (language === 'hi' ? '\u0935\u093f\u0935\u0930\u0923 \u0926\u0947\u0916\u0947\u0902' : COPY.en.details);
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
      params.set('limit', '12');

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

  const handleAddToCart = product => {
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
    setTimeout(() => setAddedId(null), 1200);
  };

  const resetFilters = () => {
    setCategory('all');
    setSearch('');
    setSortBy('newest');
    setPage(1);
  };

  return (
    <>
      <Head>
        <title>{copy.title}</title>
        <meta name="description" content={copy.description} />
      </Head>

      <div className="bg-slate-base text-ink-primary">
        <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
          <motion.section initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45 }} className="rounded-[2rem] border border-line-soft/10 bg-slate-card/78 px-5 py-8 shadow-xl shadow-black/10 backdrop-blur-xl sm:px-10 sm:py-14">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-accent-emerald">{copy.eyebrow}</p>
                <h1 className={`mt-4 max-w-4xl font-outfit text-3xl font-semibold tracking-tight text-ink-primary sm:mt-5 sm:text-5xl lg:text-6xl ${isHindi ? 'font-hindi' : ''}`}>{copy.headline}</h1>
                <p className={`mt-4 max-w-3xl text-sm leading-7 text-ink-muted sm:mt-5 sm:text-lg sm:leading-8 ${isHindi ? 'font-hindi' : ''}`}>{copy.intro}</p>
              </div>

              <div className="rounded-[1.75rem] border border-line-soft/10 bg-slate-base/72 p-3.5 shadow-lg shadow-black/5 sm:p-4">
                <label className="flex items-center gap-3 rounded-[1.25rem] bg-slate-card/80 px-4 py-4">
                  <FiSearch className="text-accent-emerald" />
                  <input
                    value={search}
                    onChange={event => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    placeholder={copy.searchPlaceholder}
                    className="w-full bg-transparent text-sm text-ink-primary outline-none placeholder:text-ink-muted"
                  />
                </label>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-ink-muted">
                    {totalCount} {copy.itemsAvailable}
                  </p>
                  <div className="flex w-full items-center gap-2 rounded-full border border-line-soft/10 bg-slate-card/80 px-3 py-2 text-sm text-ink-secondary sm:w-auto">
                    <FiFilter className="text-accent-emerald" />
                    <select
                      value={sortBy}
                      onChange={event => {
                        setSortBy(event.target.value);
                        setPage(1);
                      }}
                      className="bg-transparent outline-none"
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
          </motion.section>

          <section className="-mx-1 mt-8 flex gap-3 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {categories.map(item => {
              const Icon = item.icon;
              const active = category === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setCategory(item.value);
                    setPage(1);
                  }}
                  className={`inline-flex shrink-0 items-center rounded-full border px-4 py-3 text-sm font-bold transition ${
                    active
                      ? 'border-accent-emerald bg-accent-emerald text-white'
                      : 'border-line-soft/10 bg-slate-card/76 text-ink-secondary hover:border-accent-emerald/30 hover:text-ink-primary'
                  }`}
                >
                  <Icon className={`mr-2 ${active ? 'text-white' : 'text-accent-emerald'}`} />
                  {item.label}
                </button>
              );
            })}
          </section>

          {loading ? (
            <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-80 animate-pulse rounded-[1.75rem] border border-line-soft/10 bg-slate-card/70" />
              ))}
            </section>
          ) : products.length === 0 ? (
            <section className="mt-8 rounded-[2rem] border border-line-soft/10 bg-slate-card/76 p-10 text-center shadow-xl shadow-black/8 backdrop-blur-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-emerald/10 text-accent-emerald">
                <FiPackage size={26} />
              </div>
              <h2 className={`mt-6 text-2xl font-semibold text-ink-primary ${isHindi ? 'font-hindi' : ''}`}>{copy.noResultsTitle}</h2>
              <p className={`mx-auto mt-3 max-w-xl text-sm leading-7 text-ink-muted ${isHindi ? 'font-hindi' : ''}`}>{copy.noResultsBody}</p>
              <button type="button" onClick={resetFilters} className="mt-6 inline-flex rounded-full border border-accent-emerald/30 px-5 py-3 text-sm font-bold text-accent-emerald transition hover:bg-accent-emerald/10">
                {copy.reset}
              </button>
            </section>
          ) : (
            <section className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
              {products.map((product, index) => {
                const justAdded = addedId === product._id;
                const categoryIcon = categoryIconMap[product.category] || FiPackage;
                const CategoryIcon = categoryIcon;
                const localizedName = language === 'hi' ? product.nameHindi || product.name : product.name || product.nameHindi;
                const localizedDescription =
                  language === 'hi'
                    ? product.descriptionHindi || product.description || ''
                    : product.description || product.descriptionHindi || '';
                const detailsHref = `/products/${product._id}`;

                return (
                  <motion.article
                    key={product._id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={fadeUp}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    className="group rounded-[1.75rem] border border-line-soft/10 bg-slate-card/76 p-4 shadow-xl shadow-black/8 backdrop-blur-xl sm:p-5"
                  >
                    <Link
                      href={detailsHref}
                      className="block overflow-hidden rounded-[1.25rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald"
                    >
                      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.25rem] bg-slate-base/78">
                      {product.image ? (
                        <img src={product.image} alt={localizedName} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="flex flex-col items-center gap-3 text-ink-muted">
                          <CategoryIcon size={36} className="text-accent-emerald" />
                          <span className="text-xs font-black uppercase tracking-[0.18em]">{product.category || copy.all}</span>
                        </div>
                      )}
                      </div>
                    </Link>

                    <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
                      <span className="inline-flex items-center rounded-full border border-accent-emerald/15 bg-accent-emerald/8 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-accent-emerald">
                        {product.category || copy.all}
                      </span>
                      <span className="font-outfit text-xl font-bold text-ink-primary sm:text-2xl">Rs {product.price}</span>
                    </div>

                    <h2 className={`mt-4 text-lg font-semibold text-ink-primary sm:text-xl ${isHindi ? 'font-hindi' : ''}`}>
                      <Link href={detailsHref} className="transition hover:text-accent-emerald">
                        {localizedName}
                      </Link>
                    </h2>
                    <p className={`mt-3 min-h-[72px] text-sm leading-6 text-ink-muted sm:min-h-[84px] sm:leading-7 ${isHindi ? 'font-hindi' : ''}`}>
                      {localizedDescription}
                    </p>

                    <div className="mt-6 space-y-3">
                      <Link
                        href={detailsHref}
                        className="inline-flex w-full items-center justify-center rounded-full border border-accent-emerald/30 px-4 py-3 text-sm font-bold text-accent-emerald transition hover:bg-accent-emerald/10"
                      >
                        {detailsLabel}
                      </Link>
                      <div className="grid grid-cols-[1fr_auto] gap-3">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className={`inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-bold transition ${
                          justAdded ? 'bg-white text-slate-900' : 'bg-accent-emerald text-white hover:bg-emerald-600'
                        }`}
                      >
                        {justAdded ? <FiCheck className="mr-2" /> : <FiPlus className="mr-2" />}
                        {justAdded ? copy.added : copy.add}
                      </button>
                      <a
                        href={`https://wa.me/919977938192?text=${encodeURIComponent(`I want to know more about ${product.name}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line-soft/10 bg-slate-base/78 text-accent-emerald transition hover:border-accent-emerald/30 hover:bg-accent-emerald/10"
                        aria-label={copy.askOnWhatsApp}
                        title={copy.askOnWhatsApp}
                      >
                        <FiMessageCircle />
                      </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </section>
          )}

          {totalPages > 1 ? (
            <section className="mt-10 flex flex-wrap justify-center gap-3">
              {Array.from({ length: totalPages }).map((_, index) => {
                const current = index + 1;
                return (
                  <button
                    key={current}
                    type="button"
                    onClick={() => setPage(current)}
                    className={`h-11 min-w-[44px] rounded-full px-4 text-sm font-bold transition ${
                      page === current
                        ? 'bg-accent-emerald text-white'
                        : 'border border-line-soft/10 bg-slate-card/76 text-ink-secondary hover:text-ink-primary'
                    }`}
                  >
                    {current}
                  </button>
                );
              })}
            </section>
          ) : null}

          <section className="mt-16 overflow-hidden rounded-[2rem] border border-accent-emerald/20 bg-gradient-to-br from-accent-emerald to-emerald-600 px-6 py-10 text-white shadow-2xl shadow-emerald-900/20 sm:px-10 sm:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-100/90">Support</p>
                <h2 className={`mt-4 font-outfit text-3xl font-semibold tracking-tight sm:text-4xl ${isHindi ? 'font-hindi' : ''}`}>{copy.footerTitle}</h2>
                <p className={`mt-4 text-base leading-8 text-emerald-50/85 ${isHindi ? 'font-hindi' : ''}`}>{copy.footerBody}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/crop-doctor" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-700 transition hover:scale-[1.02]">
                  {copy.footerPrimary}
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                  <FiShoppingCart className="mr-2" />
                  {copy.footerSecondary}
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
