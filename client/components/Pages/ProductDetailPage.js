/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FiAlertCircle,
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiDroplet,
  FiMessageCircle,
  FiPackage,
  FiRefreshCw,
  FiShield,
  FiShoppingCart,
} from 'react-icons/fi';
import { API_URL } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const SUPPORT_WHATSAPP = '919977938192';
const CURRENCY = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const COPY = {
  en: {
    loading: 'Loading product...',
    back: 'Back to products',
    notFoundTitle: 'Product not found',
    notFoundBody: 'The product may have been removed or the link may be incorrect.',
    browse: 'Browse products',
    ask: 'Ask on WhatsApp',
    add: 'Add to cart',
    added: 'Added to cart',
    inStock: 'In stock',
    outOfStock: 'Out of stock',
    featured: 'Store pick',
    usage: 'How to use',
    dosage: 'Recommended dosage',
    safety: 'Safety guidance',
    crops: 'Suitable crops',
    brand: 'Brand',
    unit: 'Unit',
    stock: 'Available stock',
    related: 'Related products',
    relatedBody: 'Explore more products in the same category.',
    fallbackDescription: 'Store-backed agricultural input for practical crop support.',
  },
  hi: {
    loading: '\u0909\u0924\u094d\u092a\u093e\u0926 \u0932\u094b\u0921 \u0939\u094b \u0930\u0939\u093e \u0939\u0948...',
    back: '\u0909\u0924\u094d\u092a\u093e\u0926 \u0938\u0942\u091a\u0940 \u092a\u0930 \u0935\u093e\u092a\u0938 \u091c\u093e\u090f\u0901',
    notFoundTitle: '\u0909\u0924\u094d\u092a\u093e\u0926 \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u093e',
    notFoundBody: '\u092f\u0939 \u0909\u0924\u094d\u092a\u093e\u0926 \u0939\u091f\u093e\u092f\u093e \u091c\u093e \u091a\u0941\u0915\u093e \u0939\u0948 \u092f\u093e \u0932\u093f\u0902\u0915 \u0938\u0939\u0940 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964',
    browse: '\u0909\u0924\u094d\u092a\u093e\u0926 \u0926\u0947\u0916\u0947\u0902',
    ask: 'WhatsApp \u092a\u0930 \u092a\u0942\u091b\u0947\u0902',
    add: '\u0915\u093e\u0930\u094d\u091f \u092e\u0947\u0902 \u091c\u094b\u0921\u093c\u0947\u0902',
    added: '\u0915\u093e\u0930\u094d\u091f \u092e\u0947\u0902 \u091c\u0941\u0921\u093c \u0917\u092f\u093e',
    inStock: '\u0938\u094d\u091f\u0949\u0915 \u092e\u0947\u0902 \u0909\u092a\u0932\u092c\u094d\u0927',
    outOfStock: '\u0938\u094d\u091f\u0949\u0915 \u0916\u0924\u094d\u092e',
    featured: '\u0938\u094d\u091f\u094b\u0930 \u091a\u092f\u0928',
    usage: '\u0915\u0948\u0938\u0947 \u0909\u092a\u092f\u094b\u0917 \u0915\u0930\u0947\u0902',
    dosage: '\u0905\u0928\u0941\u0936\u0902\u0938\u093f\u0924 \u092e\u093e\u0924\u094d\u0930\u093e',
    safety: '\u0938\u0941\u0930\u0915\u094d\u0937\u093e \u0928\u093f\u0930\u094d\u0926\u0947\u0936',
    crops: '\u0909\u092a\u092f\u0941\u0915\u094d\u0924 \u092b\u0938\u0932\u0947\u0902',
    brand: '\u092c\u094d\u0930\u093e\u0902\u0921',
    unit: '\u092f\u0942\u0928\u093f\u091f',
    stock: '\u0909\u092a\u0932\u092c\u094d\u0927 \u0938\u094d\u091f\u0949\u0915',
    related: '\u092e\u093f\u0932\u0924\u0947-\u091c\u0941\u0932\u0924\u0947 \u0909\u0924\u094d\u092a\u093e\u0926',
    relatedBody: '\u0907\u0938\u0940 \u0936\u094d\u0930\u0947\u0923\u0940 \u0915\u0947 \u0914\u0930 \u0909\u0924\u094d\u092a\u093e\u0926 \u0926\u0947\u0916\u0947\u0902\u0964',
    fallbackDescription: '\u0935\u094d\u092f\u093e\u0935\u0939\u093e\u0930\u093f\u0915 \u092b\u0938\u0932 \u0938\u0939\u093e\u092f\u0924\u093e \u0915\u0947 \u0932\u093f\u090f \u0938\u094d\u091f\u094b\u0930 \u0926\u094d\u0935\u093e\u0930\u093e \u0938\u092e\u0930\u094d\u0925\u093f\u0924 \u0915\u0943\u0937\u093f \u0909\u0924\u094d\u092a\u093e\u0926\u0964',
  },
};

function cardClasses(isLight) {
  return isLight
    ? 'border-slate-200 bg-white shadow-slate-200/60'
    : 'border-white/10 bg-slate-900 shadow-black/20';
}

function infoClasses(isLight) {
  return isLight
    ? 'border-slate-200 bg-slate-50 text-slate-700'
    : 'border-white/10 bg-slate-950/40 text-slate-300';
}

function getLocalized(product, field, language) {
  const hindiValue = product?.[`${field}Hindi`];
  const englishValue = product?.[field];
  return language === 'hi' ? hindiValue || englishValue || '' : englishValue || hindiValue || '';
}

function productSupportLink(product, language) {
  const productName = getLocalized(product, 'name', language) || product?.name || 'this product';
  const message =
    language === 'hi'
      ? `\u0928\u092e\u0938\u094d\u0924\u0947, \u092e\u0941\u091d\u0947 ${productName} \u0915\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902 \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u091a\u093e\u0939\u093f\u090f\u0964`
      : `Hello, I want more information about ${productName}.`;

  return `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const { language } = useLanguage();
  const { isLight } = useTheme();
  const copy = COPY[language] || COPY.en;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  const loadProduct = useCallback(async () => {
    if (!id || typeof id !== 'string') {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const productResponse = await fetch(`${API_URL}/products/${id}`);
      if (!productResponse.ok) {
        throw new Error(copy.notFoundTitle);
      }

      const productData = await productResponse.json();
      setProduct(productData);

      const relatedResponse = await fetch(
        `${API_URL}/products?category=${encodeURIComponent(productData.category || 'all')}&limit=8`
      );

      if (relatedResponse.ok) {
        const relatedData = await relatedResponse.json();
        const nextRelated = (relatedData.products || [])
          .filter((item) => item._id !== productData._id)
          .slice(0, 4);
        setRelatedProducts(nextRelated);
      } else {
        setRelatedProducts([]);
      }
    } catch (loadError) {
      setProduct(null);
      setRelatedProducts([]);
      setError(loadError.message || copy.notFoundBody);
    } finally {
      setLoading(false);
    }
  }, [copy.notFoundBody, copy.notFoundTitle, id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const supportLink = useMemo(() => (product ? productSupportLink(product, language) : '#'), [language, product]);
  const localizedName = product ? getLocalized(product, 'name', language) || product.name : '';
  const localizedDescription = product
    ? getLocalized(product, 'description', language) || copy.fallbackDescription
    : '';
  const localizedUsage = product ? getLocalized(product, 'usage', language) : '';
  const localizedDosage = product ? getLocalized(product, 'dosage', language) : '';
  const localizedSafety = product ? getLocalized(product, 'safetyInstructions', language) : '';

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    addToCart(
      {
        id: product._id,
        _id: product._id,
        name: product.name,
        nameHindi: product.nameHindi,
        image: product.image,
        category: product.category,
        price: product.price || 0,
      },
      1
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (loading) {
    return (
      <div className={isLight ? 'bg-[#f4f7f4] text-slate-950' : 'bg-slate-950 text-white'}>
        <div className="flex min-h-[60vh] items-center justify-center px-4 pt-28 pb-20">
          <div
            className={`flex items-center gap-3 rounded-2xl border px-6 py-4 text-sm font-semibold ${
              isLight ? 'border-slate-200 bg-white text-slate-700' : 'border-white/10 bg-slate-900 text-slate-200'
            }`}
          >
            <FiRefreshCw className="animate-spin" />
            {copy.loading}
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <Head>
          <title>{copy.notFoundTitle} | Laxmi Krashi Kendra</title>
        </Head>

        <div className={isLight ? 'bg-[#f4f7f4] text-slate-950' : 'bg-slate-950 text-white'}>
          <main className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
            <section className={`rounded-[2rem] border px-6 py-12 text-center shadow-xl ${cardClasses(isLight)}`}>
              <FiAlertCircle className={`mx-auto h-12 w-12 ${isLight ? 'text-rose-500' : 'text-rose-300'}`} />
              <h1 className="mt-5 text-3xl font-black">{copy.notFoundTitle}</h1>
              <p className={`mx-auto mt-3 max-w-xl text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {error || copy.notFoundBody}
              </p>
              <Link
                href="/products"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
              >
                <FiArrowLeft size={15} />
                {copy.browse}
              </Link>
            </section>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{localizedName} | Laxmi Krashi Kendra</title>
        <meta name="description" content={localizedDescription || copy.fallbackDescription} />
      </Head>

      <div className={isLight ? 'bg-[#f4f7f4] text-slate-950' : 'bg-slate-950 text-white'}>
        <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <Link
            href="/products"
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${
              isLight
                ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
          >
            <FiArrowLeft size={15} />
            {copy.back}
          </Link>

          <section className="mt-6 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className={`overflow-hidden rounded-[2rem] border shadow-2xl ${cardClasses(isLight)}`}>
              <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-950/40">
                {product.image ? (
                  <img src={product.image} alt={localizedName} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    <FiPackage size={48} />
                  </div>
                )}
              </div>
            </div>

            <div className={`rounded-[2rem] border p-6 shadow-2xl ${cardClasses(isLight)}`}>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                    isLight ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-500/15 text-emerald-300'
                  }`}
                >
                  {product.category}
                </span>
                {product.featured ? (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                      isLight ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {copy.featured}
                  </span>
                ) : null}
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                    product.inStock
                      ? isLight
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-emerald-500/15 text-emerald-300'
                      : isLight
                        ? 'bg-rose-50 text-rose-700'
                        : 'bg-rose-500/15 text-rose-300'
                  }`}
                >
                  {product.inStock ? copy.inStock : copy.outOfStock}
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight">{localizedName}</h1>
              <p className={`mt-4 text-base leading-8 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {localizedDescription || copy.fallbackDescription}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className={`rounded-[1.2rem] border px-4 py-3 ${infoClasses(isLight)}`}>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">{copy.brand}</p>
                  <p className="mt-2 text-sm font-semibold text-current">{product.brand || 'Laxmi Krashi Kendra'}</p>
                </div>
                <div className={`rounded-[1.2rem] border px-4 py-3 ${infoClasses(isLight)}`}>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">{copy.unit}</p>
                  <p className="mt-2 text-sm font-semibold text-current">{product.unit || 'piece'}</p>
                </div>
                <div className={`rounded-[1.2rem] border px-4 py-3 ${infoClasses(isLight)}`}>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">{copy.stock}</p>
                  <p className="mt-2 text-sm font-semibold text-current">{product.stockQuantity ?? 0}</p>
                </div>
                <div className={`rounded-[1.2rem] border px-4 py-3 ${infoClasses(isLight)}`}>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">{copy.crops}</p>
                  <p className="mt-2 text-sm font-semibold text-current">
                    {product.cropType?.length ? product.cropType.join(', ') : language === 'hi' ? '\u0938\u092d\u0940' : 'all'}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className={`text-xs font-black uppercase tracking-[0.14em] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {copy.unit}
                  </p>
                  <p className="mt-2 text-4xl font-black text-emerald-500">{CURRENCY.format(product.price || 0)}</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                  >
                    {added ? <FiCheck size={15} /> : <FiShoppingCart size={15} />}
                    {added ? copy.added : copy.add}
                  </button>
                  <a
                    href={supportLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition ${
                      isLight
                        ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                        : 'border-emerald-500/35 text-emerald-300 hover:bg-emerald-500/10'
                    }`}
                  >
                    <FiMessageCircle size={15} />
                    {copy.ask}
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-5 lg:grid-cols-3">
            {[
              {
                key: 'usage',
                label: copy.usage,
                value: localizedUsage,
                icon: FiPackage,
              },
              {
                key: 'dosage',
                label: copy.dosage,
                value: localizedDosage,
                icon: FiDroplet,
              },
              {
                key: 'safety',
                label: copy.safety,
                value: localizedSafety,
                icon: FiShield,
              },
            ].map((section) => {
              const Icon = section.icon;
              return (
                <article key={section.key} className={`rounded-[1.75rem] border p-5 shadow-xl ${cardClasses(isLight)}`}>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      isLight ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-500/15 text-emerald-300'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold">{section.label}</h2>
                  <p className={`mt-3 text-sm leading-7 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {section.value || copy.fallbackDescription}
                  </p>
                </article>
              );
            })}
          </section>

          {relatedProducts.length ? (
            <section className={`mt-10 rounded-[2rem] border p-6 shadow-xl ${cardClasses(isLight)}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className={`text-xs font-black uppercase tracking-[0.18em] ${isLight ? 'text-emerald-600' : 'text-emerald-300'}`}>
                    {copy.related}
                  </p>
                  <h2 className="mt-2 text-3xl font-black">{copy.related}</h2>
                  <p className={`mt-2 text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{copy.relatedBody}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {relatedProducts.map((item) => (
                  <Link
                    key={item._id}
                    href={`/products/${item._id}`}
                    className={`group overflow-hidden rounded-[1.5rem] border p-4 transition hover:-translate-y-1 ${infoClasses(isLight)}`}
                  >
                    <div className="aspect-square overflow-hidden rounded-[1rem] bg-slate-100 dark:bg-slate-950/40">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={getLocalized(item, 'name', language) || item.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-400">
                          <FiPackage size={32} />
                        </div>
                      )}
                    </div>
                    <p className="mt-4 text-lg font-semibold text-current">{getLocalized(item, 'name', language) || item.name}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="font-bold text-emerald-500">{CURRENCY.format(item.price || 0)}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-current">
                        <FiArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </>
  );
}
