/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import {
  FiArrowRight,
  FiBarChart2,
  FiCheck,
  FiCpu,
  FiMessageCircle,
  FiPhone,
  FiPlus,
  FiSearch,
  FiShield,
  FiShoppingBag,
  FiShoppingCart,
  FiTruck,
  FiUsers,
  FiZap
} from 'react-icons/fi';
import BorderGlow from '@/components/Shared/BorderGlow/BorderGlow';
import BlurText from '@/components/Shared/BlurText/BlurText';
import ScrollFloat from '@/components/Shared/ScrollFloat/ScrollFloat';
import TrustStatsBar from '@/components/Home/TrustStatsBar';
import {
  HERO_COPY_CLEAN,
  HOME_COPY_CLEAN,
  SERVICE_OUTCOMES_CLEAN,
  TRUST_STATS_CLEAN
} from '@/components/Home/homeCopyData';
import { LocalBusinessJsonLd } from '@/components/Common/JsonLd';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { API_URL } from '@/lib/api';

const SoftAurora = dynamic(() => import('@/components/Shared/SoftAurora/SoftAurora'), {
  ssr: false
});
const Lanyard = dynamic(() => import('@/components/Shared/Lanyard/Lanyard'), {
  ssr: false,
  loading: () => <div className="h-[29rem] w-full animate-pulse rounded-[1.75rem] bg-slate-card/70" />
});
const MagicBento = dynamic(() => import('@/components/Shared/MagicBento/MagicBento'), {
  ssr: false,
  loading: () => (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map(index => (
        <div key={index} className="h-64 animate-pulse rounded-[1.75rem] bg-slate-card/70" />
      ))}
    </div>
  )
});

export default function HomePage() {
  const { language } = useLanguage();
  const { addToCart, cart } = useCart();
  const { isLight } = useTheme();
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '9977938192';
  const copy = HOME_COPY_CLEAN[language] || HOME_COPY_CLEAN.en;
  const isHindi = language === 'hi';
  const displayFontClass = isHindi ? 'font-hindi' : 'font-outfit';
  const heroCopy = HERO_COPY_CLEAN[language] || HERO_COPY_CLEAN.en;
  const trustStats = TRUST_STATS_CLEAN[language] || TRUST_STATS_CLEAN.en;
  const servicesWithOutcomes = useMemo(
    () =>
      copy.services.map((service, index) => ({
        ...service,
        outcome: (SERVICE_OUTCOMES_CLEAN[language] || SERVICE_OUTCOMES_CLEAN.en)[index]
      })),
    [copy.services, language]
  );
  const supportCardBackground = isLight ? 'rgba(255, 255, 255, 0.92)' : 'rgba(10, 15, 29, 0.82)';
  const supportFillOpacity = isLight ? 0.18 : 0.28;

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [addedId, setAddedId] = useState(null);
  const [enableHeroEffects, setEnableHeroEffects] = useState(false);
  const [enableAuroraMouse, setEnableAuroraMouse] = useState(false);

  const fallbackProducts = useMemo(() => copy.featuredFallback, [copy]);
  const featuredProducts = loadingProducts ? [] : products.length > 0 ? products : fallbackProducts;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const scheduleIdle = window.requestIdleCallback
      ? window.requestIdleCallback(
          () => {
            setEnableHeroEffects(true);
            setEnableAuroraMouse(window.innerWidth >= 1024);
          },
          { timeout: 1200 }
        )
      : window.setTimeout(() => {
          setEnableHeroEffects(true);
          setEnableAuroraMouse(window.innerWidth >= 1024);
        }, 450);

    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(scheduleIdle);
      } else {
        window.clearTimeout(scheduleIdle);
      }
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    let scheduleHandle;

    async function loadProducts() {
      setLoadingProducts(true);
      try {
        const response = await fetch(`${API_URL}/products?limit=4&featured=true`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Failed to fetch featured products');
        }

        const data = await response.json();
        if (!ignore) {
          setProducts(Array.isArray(data.products) ? data.products : []);
        }
      } catch (error) {
        if (!ignore && error.name !== 'AbortError') {
          setProducts([]);
        }
      } finally {
        if (!ignore) {
          setLoadingProducts(false);
        }
      }
    }

    if (typeof window !== 'undefined' && window.requestIdleCallback) {
      scheduleHandle = window.requestIdleCallback(() => {
        loadProducts();
      }, { timeout: 1800 });
    } else {
      scheduleHandle = window.setTimeout(() => {
        loadProducts();
      }, 350);
    }

    return () => {
      ignore = true;
      controller.abort();
      if (typeof window !== 'undefined') {
        if (window.cancelIdleCallback) {
          window.cancelIdleCallback(scheduleHandle);
        } else {
          window.clearTimeout(scheduleHandle);
        }
      }
    };
  }, []);

  const handleAddToCart = product => {
    const productId = product.id || product._id || product.name;

    addToCart({
      id: productId,
      _id: product._id || productId,
      name: product.nameHindi || product.name,
      nameHindi: product.nameHindi,
      price: product.price || 0,
      image: product.image || '',
      category: product.category || product.categoryLabel || ''
    });

    setAddedId(productId);
    window.setTimeout(() => setAddedId(null), 1400);
  };

  const isInCart = productId => cart.some(item => item.id === productId);

  return (
    <div className="min-h-screen bg-slate-base font-sans text-ink-primary selection:bg-accent-emerald selection:text-white">
      <Head>
        <title>{copy.metaTitle}</title>
        <meta name="description" content={copy.metaDescription} />
        <meta property="og:title" content={copy.metaTitle} />
        <meta property="og:description" content={copy.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://laxmikrashikendra.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={copy.metaTitle} />
        <meta name="twitter:description" content={copy.metaDescription} />
      </Head>
      <LocalBusinessJsonLd />

      <header className="relative overflow-hidden bg-slate-base pb-8 pt-20 md:pb-24 md:pt-36">
        <div className="absolute inset-0">
          {enableHeroEffects ? (
            <SoftAurora
              color1={isLight ? '#ffffff' : '#f8fafc'}
              color2="#10b981"
              speed={0.35}
              scale={1.15}
              brightness={isLight ? 1.05 : 0.9}
              enableMouseInteraction={enableAuroraMouse}
            />
          ) : null}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),_transparent_42%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(34,211,238,0.12),_transparent_30%)]" />
          <div
            className={`absolute inset-0 ${
              isLight
                ? 'bg-gradient-to-b from-white/55 via-slate-base/28 to-slate-base'
                : 'bg-gradient-to-b from-slate-base/20 via-slate-base/55 to-slate-base'
            }`}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-line-soft/10 bg-slate-card/80 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-accent-emerald shadow-xl backdrop-blur sm:mb-8 sm:px-5 sm:text-xs sm:tracking-[0.22em]">
              <BlurText text={copy.badge} animateBy="words" className="leading-none" />
            </div>

            <h1
              className={`mb-6 ${displayFontClass} text-3xl font-extrabold leading-[1.05] text-ink-primary sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl ${
                isHindi ? 'tracking-normal' : 'tracking-tight'
              }`}
            >
              <span className="block">{heroCopy.heroTitleTop}</span>
              <span className="block text-accent-emerald">{heroCopy.heroTitleAccent}</span>
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg md:text-xl">
              {heroCopy.heroDescription}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:flex sm:justify-center sm:gap-4">
              <Link
                href="/crop-doctor"
                className="group flex flex-col items-center gap-2.5 rounded-2xl border border-accent-emerald/30 bg-accent-emerald/10 px-4 py-5 text-center shadow-lg shadow-emerald-500/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-emerald/50 hover:bg-accent-emerald/15 hover:shadow-xl sm:rounded-3xl sm:px-8 sm:py-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-emerald text-white shadow-md sm:h-12 sm:w-12">
                  <FiSearch size={20} />
                </div>
                <span className="text-sm font-black text-accent-emerald sm:text-base">{heroCopy.primaryCta}</span>
                <FiArrowRight className="text-accent-emerald opacity-60 transition-transform group-hover:translate-x-1" size={16} />
              </Link>
              <Link
                href="/products"
                className="group flex flex-col items-center gap-2.5 rounded-2xl border border-line-soft/15 bg-slate-card/60 px-4 py-5 text-center shadow-lg shadow-black/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-emerald/30 hover:bg-slate-card/80 hover:shadow-xl sm:rounded-3xl sm:px-8 sm:py-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald sm:h-12 sm:w-12">
                  <FiShoppingBag size={20} />
                </div>
                <span className="text-sm font-black text-ink-primary sm:text-base">{heroCopy.secondaryCta}</span>
                <FiArrowRight className="text-ink-muted opacity-60 transition-transform group-hover:translate-x-1" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <TrustStatsBar items={trustStats} />

      <section className="bg-slate-base py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-accent-emerald">
                Featured Inputs
              </p>
              <h2 className={`${displayFontClass} text-2xl font-bold leading-tight text-ink-primary sm:text-3xl md:text-4xl`}>
                {copy.featuredTitle}
              </h2>
            </div>

            <Link href="/products" className="btn-secondary h-12 w-full px-8 text-sm sm:w-auto">
              {copy.productsCta}
              <FiArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {loadingProducts
              ? [1, 2, 3, 4].map(item => (
                  <div key={item} className="h-[15rem] animate-pulse rounded-[1.5rem] bg-slate-card sm:h-[20rem] sm:rounded-[2rem]" />
                ))
              : featuredProducts.map(product => {
                  const productId = product.id || product._id || product.name;
                  const productName = language === 'hi' ? product.nameHindi || product.name : product.name;
                  const productDescription =
                    language === 'hi'
                      ? product.descriptionHindi || product.description || copy.heroDescription
                      : product.description || product.descriptionHindi || copy.heroDescription;
                  const productCategory = product.categoryLabel || product.category || copy.services[2].label;
                  const inCart = isInCart(productId);

                  return (
                    <div
                      key={productId}
                      className="group flex h-full flex-col rounded-[1.5rem] border border-line-soft/10 bg-slate-card p-3 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-card/90 sm:rounded-[2rem] sm:p-5 lg:p-6"
                    >
                      <div className="mb-3 flex aspect-[1/1] items-center justify-center overflow-hidden rounded-[1.2rem] bg-slate-base sm:mb-5 sm:aspect-square sm:rounded-[1.5rem]">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={productName}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-card text-4xl text-accent-emerald/70">
                            <FiShield />
                          </div>
                        )}
                      </div>

                      <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4 sm:gap-4">
                        <span className="rounded-full bg-accent-emerald/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-accent-emerald sm:px-3 sm:text-[11px] sm:tracking-[0.12em]">
                          {productCategory}
                        </span>
                        <span className="text-lg font-bold text-ink-primary sm:text-xl lg:text-2xl">Rs {product.price}</span>
                      </div>

                      <h3 className="line-clamp-2 text-base font-bold text-ink-primary transition-colors group-hover:text-accent-emerald sm:text-lg lg:text-xl">
                        {productName}
                      </h3>
                      <p className="mt-2 line-clamp-2 flex-grow text-xs leading-relaxed text-ink-muted sm:mt-3 sm:text-sm">
                        {productDescription}
                      </p>

                      <div className="mt-3 flex gap-2 sm:mt-5 sm:gap-3">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="flex h-10 flex-1 items-center justify-center rounded-xl bg-accent-emerald px-2 text-xs font-bold text-white transition-colors hover:bg-emerald-600 sm:h-11 sm:rounded-2xl sm:text-sm"
                        >
                          {addedId === productId || inCart ? (
                            <>
                              <FiCheck className="mr-2" />
                              {copy.addedLabel}
                            </>
                          ) : (
                            <>
                              <FiPlus className="mr-2" />
                              {copy.addLabel}
                            </>
                          )}
                        </button>

                        <a
                          href={`https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
                            `${language === 'hi' ? '???? ?? ?????? ??? ???? ??:' : 'I am interested in:'} ${productName}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-base text-accent-emerald transition-all hover:bg-accent-emerald/10 hover:text-accent-emerald sm:h-11 sm:w-11 sm:rounded-2xl"
                        >
                          <FiMessageCircle size={18} />
                        </a>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>

      <section className="bg-slate-card py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {copy.quickHighlights.map(item => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-line-soft/10 bg-slate-base/80 p-5 shadow-xl shadow-black/10 sm:p-6"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-card text-xl text-accent-emerald">
                {item.icon}
              </div>
              <h2 className="text-xl font-bold text-ink-primary">{item.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-base py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-14">
            <ScrollFloat
              containerClassName="mx-auto mb-6"
              textClassName={`${displayFontClass} text-2xl font-bold text-ink-primary sm:text-3xl md:text-5xl`}
            >
              {copy.servicesHeading}
            </ScrollFloat>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {copy.servicesDescription}
            </p>
          </div>

          <MagicBento items={servicesWithOutcomes} />
        </div>
      </section>

      <section className="bg-slate-card py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:px-8">
          <div className="lg:sticky lg:top-28">
            <div className="mb-4 inline-flex rounded-full bg-slate-base px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-accent-cyan">
              {copy.processEyebrow}
            </div>
            <h2 className={`${displayFontClass} text-2xl font-bold leading-tight text-ink-primary sm:text-3xl md:text-5xl`}>
              {copy.processTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:mt-6 sm:text-lg">{copy.processDescription}</p>
          </div>

          <div className="space-y-6">
            {copy.processSteps.map(step => (
              <BorderGlow
                key={step.step}
                borderRadius={30}
                glowColor="160 70 58"
                backgroundColor={isLight ? 'rgba(255, 255, 255, 0.92)' : 'rgba(2, 6, 23, 0.98)'}
                fillOpacity={0.18}
                colors={['#10b981', '#34d399', '#22d3ee']}
              >
                <div className="grid items-start gap-4 p-5 sm:gap-5 sm:p-6 md:grid-cols-[auto_1fr_auto] md:p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-card text-lg font-black text-accent-emerald">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-ink-primary">{step.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-muted">{step.description}</p>
                  </div>
                  <div className="hidden rounded-2xl bg-slate-card p-3 text-accent-cyan md:block">
                    <FiArrowRight size={20} />
                  </div>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-card py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.14),_transparent_48%)]" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <BorderGlow
            borderRadius={36}
            glowColor="150 72 60"
            backgroundColor={isLight ? 'rgba(255, 255, 255, 0.94)' : '#020617'}
            fillOpacity={0.2}
            colors={['#10b981', '#22d3ee', '#34d399']}
          >
            <div className="rounded-[2.25rem] p-6 text-center sm:p-8 md:p-14">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-card text-accent-emerald sm:h-16 sm:w-16">
                <FiPhone size={26} />
              </div>
              <h2 className={`${displayFontClass} text-2xl font-bold text-ink-primary sm:text-3xl md:text-5xl`}>{copy.ctaTitle}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:mt-6 sm:text-lg">{copy.ctaDescription}</p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                <a
                  href={`https://wa.me/91${phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary h-13 w-full px-6 text-sm sm:h-14 sm:w-auto sm:px-10 sm:text-base"
                >
                  <FiMessageCircle className="mr-2" />
                  {copy.ctaPrimary}
                </a>
                <a href={`tel:${phoneNumber}`} className="btn-secondary h-13 w-full px-6 text-sm sm:h-14 sm:w-auto sm:px-10 sm:text-base">
                  <FiPhone className="mr-2" />
                  {copy.ctaSecondary}
                </a>
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>
    </div>
  );
}

