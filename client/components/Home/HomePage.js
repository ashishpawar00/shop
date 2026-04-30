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
  FiShield,
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

const HERO_COPY = {
  hi: {
    heroTitleTop: '??? ?? ????? ????? ???????',
    heroTitleAccent: '????? ?? ???? ?????',
    heroDescription: '??? ?? ????, ?????????? ????, ?? ???????? ???? ?????? � ?? ????',
    primaryCta: '??? ???? ???? ????',
    secondaryCta: '?????? ?????',
    supportDesk: 'AI-?????? ??? ????? ???????? ?????? ??????????? ?? ???? ?? ????? ?? ??? ?? ???????????'
  },
  en: {
    heroTitleTop: 'Catch crop stress early.',
    heroTitleAccent: 'Treat with confidence.',
    heroDescription: 'Crop diagnosis, practical guidance, and trusted agricultural products in one place.',
    primaryCta: 'Start crop diagnosis',
    secondaryCta: 'Browse products',
    supportDesk: 'AI-powered crop diagnosis. Trusted product guidance. One platform for every farm decision.'
  }
};

const TRUST_STATS = {
  hi: [
    { value: 10000, suffix: '+', label: '??????? ?? ??????' },
    { value: 25, suffix: '+', label: '????? ?? ?????' },
    { value: 500, suffix: '+', label: '?????? ??????' }
  ],
  en: [
    { value: 10000, suffix: '+', label: 'Farmers Served' },
    { value: 25, suffix: '+', label: 'Years of Expertise' },
    { value: 500, suffix: '+', label: 'Products Available' }
  ]
};

const SERVICE_OUTCOMES = {
  hi: [
    '?? ????? ??????? ???? ????? 3 ??? ???? ????? ???? ????',
    '??? ??? ?? ?????? ????? ?? ??????? ???? ?? ???? ???',
    '?????? ?? ????? ?? ??? ????? ????? ????? ???? ???? ???',
    'WhatsApp ?? ????? 2 ???? ?? ???? ???? ??? ???? ???',
    '?????, ???? ?? ???? ?? ??? ????? ?? ???? ???',
    '???? ???? ???? ?? ???? ??? ?? ???? ???? ???? ???'
  ],
  en: [
    'Farmers catch fungal issues around 3 days earlier on average.',
    'Cuts down wrong treatment or dosage choices before they reach the field.',
    'Reduces wrong product purchases by up to 60% on repeat buying cycles.',
    'Get a response within 2 hours on WhatsApp for follow-up questions.',
    'Keeps store visits, advice, and buying decisions aligned in one flow.',
    'Helps farmers act before weather shifts make damage harder to contain.'
  ]
};

const HOME_COPY = {
  hi: {
    metaTitle: '??????? ???? ?????? | ??? ?????? ?? ???????? ???? ??????',
    metaDescription: 'AI ??? ????, ??? ???? ?? ???????? ???? ???????? ?? ??? ??????? ???? ?????? ?? ????',
    badge: '25+ ?????? ?? ??????? ?? ???',
    heroTitleTop: '??? ?? ?????? ????? ????????',
    heroTitleAccent: '??? ?????? ????? ?????',
    heroDescription:
      '?? ?? ??? ?? ??? ????, ??? ???? ?? ???????? ???? ??????? ??????? ???? ?????? ??? ?? ??????? ?? ??? ?? ??? ????? ???',
    primaryCta: '??? ???? ???? ????',
    secondaryCta: '?????? ?????',
    metrics: [
      { value: '500+', label: '??????? ?? ?????' },
      { value: '24/7', label: '?????? ??????' },
      { value: '25+', label: '?????? ?? ?????' }
    ],
    lanyardEyebrow: '????? ?????? ?????',
    lanyardTitle: '??????? ???? ??????',
    lanyardRole: 'AI ??? ?????? ?? ???????? ?????? ??????????',
    lanyardNote: '????? 3D ???? ????? ?? ?? ?????? ??????????? ???????? ???',
    quickHighlights: [
      { title: '??? ?????', description: '??? ?? ???? ?? ??????? ????? ????? ??????', icon: <FiCpu /> },
      { title: '??????? ??????????', description: '???? ?? ???? ?? ????? ?? ?????? ?????', icon: <FiUsers /> },
      { title: '???????? ???????', description: '????? ?????? ???? ?? ?????? ?? ??? ????? ?? ????', icon: <FiTruck /> }
    ],
    servicesHeading: '?????? ?? ???? ?? ???????? ??? ????? ???',
    servicesDescription:
      '??????????, ???? ?? ?????? ??? ?? ?? ???? ??? ?????? ????? ?? ?? ??? ??? ????? ?????? ????? ????',
    services: [
      {
        label: '??????????',
        title: '???? ?? ??? ????',
        description: '?????, ??? ?? ??? ?? ????? ????? ????? ??????? ????????',
        footer: 'AI + ??????? ?????',
        icon: <FiCpu />,
        accent: '34, 197, 94',
        featured: true
      },
      {
        label: '????',
        title: '?????? ?? ????? ?? ???? ???',
        description: '????, ?????? ?? ????? ?????? ?? ??? ?????? ??? ??????',
        footer: '???, ??? ?? ????',
        icon: <FiShield />,
        accent: '34, 211, 238'
      },
      {
        label: '??????',
        title: '???????? ????? ???',
        description: '????? ?? ?????? ??? ??????, ??????? ?? ????? ???????',
        footer: '???????? ????? ??????',
        icon: <FiShoppingCart />,
        accent: '16, 185, 129'
      },
      {
        label: '??????',
        title: '????????? ?? ??? ??????',
        description: '????-?? ?? ??? ???? ?????? ?? ????? ?????',
        footer: '??????-?????? ?????',
        icon: <FiMessageCircle />,
        accent: '14, 165, 233'
      },
      {
        label: '??????',
        title: '?? ???, ????? ??????',
        description: '?????, ???? ?? ???????? ???? ?? ??? ?? ??????',
        footer: '????? ?? ????? ?? ??????',
        icon: <FiBarChart2 />,
        accent: '250, 204, 21'
      },
      {
        label: '?????????',
        title: '???? ????? ?? ???? ????????',
        description: '??? ?? ????? ?? ?????? ?? ?? ??? ?? ??????? ??????',
        footer: '??? ?? ??? ????? ??',
        icon: <FiZap />,
        accent: '249, 115, 22'
      }
    ],
    processEyebrow: '???? ??? ???? ??',
    processTitle: '???? ?? ?????? ?? ?? ???? ??????',
    processDescription: '????? ?? ??? ?? ?????, ??? ???? ?? ????? ???????? ????? ??????',
    processSteps: [
      { step: '01', title: '??? ?? ???? ????? ????', description: '?????, ??? ?? ???????? ?????? ?? ??? ?????? ????' },
      { step: '02', title: 'AI ?? ????? ??? ??? ???', description: '??????? ???, ????? ?? ???? ??? ????? ????? ??? ????' },
      { step: '03', title: '??? ?????? ?? ???? ???', description: '?????, ????? ?????? ?? ???? ?? ??? ??? ???? ?????' }
    ],
    featuredTitle: '????? ?? ??? ???? ??? ??????',
    featuredDescription: '??? ?????? ?????? ???? ?? ??, ?? ?? ?? ?????? ?????? ???? ???? ?? ??? ??? ???? ??????',
    productsCta: '??? ?????? ?????',
    addLabel: '??????',
    addedLabel: '???? ???',
    featuredFallback: [
      {
        id: 'bio-guard',
        name: 'Bio Guard Mix',
        nameHindi: '???? ????? ?????',
        price: 480,
        categoryLabel: '??? ???????',
        description: 'Leaf and stem protection blend for regular disease pressure.',
        descriptionHindi: '?????? ??? ???? ?? ??? ????? ?? ??? ??????? ???????'
      },
      {
        id: 'yield-plus',
        name: 'Yield Plus',
        nameHindi: '????? ????',
        price: 640,
        categoryLabel: '???????',
        description: 'Balanced nutrition support for stronger crop response.',
        descriptionHindi: '????? ??? ??????????? ?? ??? ??????? ???? ???????'
      },
      {
        id: 'root-active',
        name: 'Root Active',
        nameHindi: '??? ??????',
        price: 520,
        categoryLabel: '??? ?????',
        description: 'Improves root vigor during early and mid growth stages.',
        descriptionHindi: '??????? ?? ???? ?????? ??? ??? ????? ?? ????? ???? ???'
      },
      {
        id: 'pest-shield',
        name: 'Pest Shield',
        nameHindi: '????? ?????',
        price: 710,
        categoryLabel: '??? ????????',
        description: 'Rapid-action protection for visible pest pressure in the field.',
        descriptionHindi: '??? ??? ??? ??? ??? ???? ?? ??? ??? ??? ???? ????????'
      }
    ],
    ctaTitle: '???? ???? ??? ???? ?? ?? ???? ????',
    ctaDescription: '??? ?? ?? ????, ??? ???? ?? ???????? ?????? ??? ?? ?????? ???? ?? ???? ???',
    ctaPrimary: '????????? ?? ??? ????',
    ctaSecondary: '??? ????'
  },
  en: {
    metaTitle: 'Laxmi Krashi Kendra | Crop support and trusted farm inputs',
    metaDescription: 'Use AI crop checks, quick guidance, and dependable farm products from Laxmi Krashi Kendra.',
    badge: '25+ years helping farmers move faster',
    heroTitleTop: 'Catch crop stress early.',
    heroTitleAccent: 'Treat with confidence.',
    heroDescription:
      'Crop diagnosis, practical guidance, and trusted agricultural products in one place. Laxmi Krashi Kendra keeps the next step clear and fast.',
    primaryCta: 'Start crop diagnosis',
    secondaryCta: 'Browse products',
    metrics: [
      { value: '500+', label: 'Farmers supported' },
      { value: '24/7', label: 'Quick follow-up' },
      { value: '25+', label: 'Years of trust' }
    ],
    lanyardEyebrow: 'Farm support desk',
    lanyardTitle: 'Laxmi Krashi Kendra',
    lanyardRole: 'AI crop care and dependable product guidance',
    lanyardNote: 'Stable placeholder lanyard until the final 3D assets are available.',
    quickHighlights: [
      { title: 'Fast diagnosis', description: 'Spot likely crop issues from a simple field photo.', icon: <FiCpu /> },
      { title: 'Grounded guidance', description: 'Advice tuned to local growing conditions and timing.', icon: <FiUsers /> },
      { title: 'Reliable fulfillment', description: 'Get the right input choices without chasing multiple stores.', icon: <FiTruck /> }
    ],
    servicesHeading: 'Services that turn insight into action',
    servicesDescription:
      'Diagnosis, guidance, and product selection are connected into one clear flow for faster farm decisions.',
    services: [
      {
        label: 'Diagnosis',
        title: 'Photo-based crop checks',
        description: 'Review leaves, stems, and visible stress markers in seconds.',
        footer: 'AI + local farm context',
        icon: <FiCpu />,
        accent: '34, 197, 94',
        featured: true
      },
      {
        label: 'Guidance',
        title: 'Clear next actions',
        description: 'Understand treatment, prevention, and application choices quickly.',
        footer: 'Simple, practical advice',
        icon: <FiShield />,
        accent: '34, 211, 238'
      },
      {
        label: 'Products',
        title: 'Trusted input selection',
        description: 'Choose the right fertilizers, pesticides, and protective treatments.',
        footer: 'Backed by the store',
        icon: <FiShoppingCart />,
        accent: '16, 185, 129'
      },
      {
        label: 'Support',
        title: 'WhatsApp and call follow-up',
        description: 'Reach the team directly when you need confirmation or fast help.',
        footer: 'Built for mobile use',
        icon: <FiMessageCircle />,
        accent: '14, 165, 233'
      },
      {
        label: 'Impact',
        title: 'Less drift, better decisions',
        description: 'Reduce the back-and-forth between advice, diagnosis, and product search.',
        footer: 'Made for real farm workflows',
        icon: <FiBarChart2 />,
        accent: '250, 204, 21'
      },
      {
        label: 'Response',
        title: 'Act before conditions worsen',
        description: 'Move early while weather and crop stress are still manageable.',
        footer: 'Time protects yield',
        icon: <FiZap />,
        accent: '249, 115, 22'
      }
    ],
    processEyebrow: 'How it works',
    processTitle: 'A simple path from photo to action',
    processDescription: 'Fewer steps, clearer direction, and treatment guidance farmers can actually use.',
    processSteps: [
      { step: '01', title: 'Upload a crop photo', description: 'Take a clear picture of the affected leaf, stem, or visible issue.' },
      { step: '02', title: 'Let the system review it', description: 'Likely disease signals, urgency, and recommended next steps appear quickly.' },
      { step: '03', title: 'Choose the right treatment', description: 'Move straight into product guidance and follow-up support.' }
    ],
    featuredTitle: 'Featured products for the next field decision',
    featuredDescription: 'If the backend is unavailable, this section still stays useful by falling back to curated demo products.',
    productsCta: 'See all products',
    addLabel: 'Add',
    addedLabel: 'Added',
    featuredFallback: [
      {
        id: 'bio-guard',
        name: 'Bio Guard Mix',
        nameHindi: '???? ????? ?????',
        price: 480,
        categoryLabel: 'Crop care',
        description: 'Leaf and stem protection blend for regular disease pressure.',
        descriptionHindi: '?????? ??? ???? ?? ??? ????? ?? ??? ??????? ???????'
      },
      {
        id: 'yield-plus',
        name: 'Yield Plus',
        nameHindi: '????? ????',
        price: 640,
        categoryLabel: 'Yield support',
        description: 'Balanced nutrition support for stronger crop response.',
        descriptionHindi: '????? ??? ??????????? ?? ??? ??????? ???? ???????'
      },
      {
        id: 'root-active',
        name: 'Root Active',
        nameHindi: '??? ??????',
        price: 520,
        categoryLabel: 'Root health',
        description: 'Improves root vigor during early and mid growth stages.',
        descriptionHindi: '??????? ?? ???? ?????? ??? ??? ????? ?? ????? ???? ???'
      },
      {
        id: 'pest-shield',
        name: 'Pest Shield',
        nameHindi: '????? ?????',
        price: 710,
        categoryLabel: 'Pest control',
        description: 'Rapid-action protection for visible pest pressure in the field.',
        descriptionHindi: '??? ??? ??? ??? ??? ???? ?? ??? ??? ??? ???? ????????'
      }
    ],
    ctaTitle: 'Start the next crop check today',
    ctaDescription:
      'One photo, clearer advice, and a dependable product path can shorten the decision cycle on the farm.',
    ctaPrimary: 'Chat on WhatsApp',
    ctaSecondary: 'Call now'
  }
};

export default function HomePage() {
  const { language } = useLanguage();
  const { addToCart, cart } = useCart();
  const { isLight } = useTheme();
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '9977938192';
  const copySource = HOME_COPY_CLEAN || HOME_COPY;
  const heroCopySource = HERO_COPY_CLEAN || HERO_COPY;
  const trustStatsSource = TRUST_STATS_CLEAN || TRUST_STATS;
  const serviceOutcomesSource = SERVICE_OUTCOMES_CLEAN || SERVICE_OUTCOMES;
  const copy = copySource[language] || copySource.en;
  const isHindi = language === 'hi';
  const displayFontClass = isHindi ? 'font-hindi' : 'font-outfit';
  const heroCopy = heroCopySource[language] || heroCopySource.en;
  const trustStats = trustStatsSource[language] || trustStatsSource.en;
  const servicesWithOutcomes = useMemo(
    () =>
      copy.services.map((service, index) => ({
        ...service,
        outcome: (serviceOutcomesSource[language] || serviceOutcomesSource.en)[index]
      })),
    [copy.services, language, serviceOutcomesSource]
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
      </Head>

      <header className="relative overflow-hidden bg-slate-base pb-20 pt-28 md:pb-24 md:pt-36">
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

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div>
            <div className="mb-8 inline-flex items-center rounded-full border border-line-soft/10 bg-slate-card/80 px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-accent-emerald shadow-xl backdrop-blur">
              <BlurText text={copy.badge} animateBy="words" className="leading-none" />
            </div>

            <h1
              className={`mb-8 ${displayFontClass} text-4xl font-extrabold leading-[1.05] text-ink-primary md:text-6xl lg:text-7xl ${
                isHindi ? 'tracking-normal' : 'tracking-tight'
              }`}
            >
              <span className="block">{heroCopy.heroTitleTop}</span>
              <span className="block text-accent-emerald">{heroCopy.heroTitleAccent}</span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-ink-secondary md:text-xl">
              {heroCopy.heroDescription}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/crop-doctor"
                className="inline-flex h-14 items-center justify-center rounded-full bg-accent-emerald px-10 text-base font-black text-white shadow-[0_24px_60px_rgba(16,185,129,0.28)] transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-600 active:scale-95"
              >
                {heroCopy.primaryCta}
                <FiArrowRight className="ml-2" />
              </Link>
              <Link
                href="/products"
                className="inline-flex h-14 items-center justify-center rounded-full border border-accent-emerald/65 bg-transparent px-10 text-base font-bold text-accent-emerald transition-all duration-300 hover:bg-accent-emerald/10 hover:text-accent-emerald"
              >
                {heroCopy.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="relative">
            <BorderGlow
              className="rounded-[2rem]"
              borderRadius={32}
              glowColor="145 75 55"
              backgroundColor={supportCardBackground}
              fillOpacity={supportFillOpacity}
              colors={['#10b981', '#22d3ee', '#86efac']}
            >
              <div className="p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-accent-emerald">
                      {copy.lanyardEyebrow}
                    </p>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
                      {heroCopy.supportDesk}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-base p-3 text-accent-emerald shadow-lg">
                    <FiShield size={22} />
                  </div>
                </div>

                <Lanyard
                  badgeName={copy.lanyardTitle}
                  role={copy.lanyardRole}
                  phone={phoneNumber}
                  note={copy.lanyardNote}
                />
              </div>
            </BorderGlow>
          </div>
        </div>
      </header>

      <TrustStatsBar items={trustStats} />

      <section className="bg-slate-card py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {copy.quickHighlights.map(item => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-line-soft/10 bg-slate-base/80 p-6 shadow-xl shadow-black/10"
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

      <section className="bg-slate-base py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <ScrollFloat
              containerClassName="mx-auto mb-6"
              textClassName={`${displayFontClass} text-3xl font-bold text-ink-primary md:text-5xl`}
            >
              {copy.servicesHeading}
            </ScrollFloat>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-ink-muted">
              {copy.servicesDescription}
            </p>
          </div>

          <MagicBento items={servicesWithOutcomes} />
        </div>
      </section>

      <section className="bg-slate-card py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:px-8">
          <div className="lg:sticky lg:top-28">
            <div className="mb-4 inline-flex rounded-full bg-slate-base px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-accent-cyan">
              {copy.processEyebrow}
            </div>
            <h2 className={`${displayFontClass} text-3xl font-bold leading-tight text-ink-primary md:text-5xl`}>
              {copy.processTitle}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">{copy.processDescription}</p>
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
                <div className="grid items-start gap-5 p-6 md:grid-cols-[auto_1fr_auto] md:p-8">
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

      <section className="bg-slate-base py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-accent-emerald">
                Featured Inputs
              </p>
              <h2 className={`${displayFontClass} text-3xl font-bold leading-tight text-ink-primary md:text-5xl`}>
                {copy.featuredTitle}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">{copy.featuredDescription}</p>
            </div>

            <Link href="/products" className="btn-secondary h-12 px-8 text-sm">
              {copy.productsCta}
              <FiArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {loadingProducts
              ? [1, 2, 3, 4].map(item => (
                  <div key={item} className="h-[24rem] animate-pulse rounded-[2rem] bg-slate-card" />
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
                      className="group flex h-full flex-col rounded-[2rem] border border-line-soft/10 bg-slate-card p-6 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-card/90"
                    >
                      <div className="mb-6 flex aspect-square items-center justify-center overflow-hidden rounded-[1.5rem] bg-slate-base">
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

                      <div className="mb-4 flex items-start justify-between gap-4">
                        <span className="rounded-full bg-accent-emerald/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-accent-emerald">
                          {productCategory}
                        </span>
                        <span className="text-2xl font-bold text-ink-primary">?{product.price}</span>
                      </div>

                      <h3 className="text-xl font-bold text-ink-primary transition-colors group-hover:text-accent-emerald">
                        {productName}
                      </h3>
                      <p className="mt-3 flex-grow text-sm leading-relaxed text-ink-muted">{productDescription}</p>

                      <div className="mt-6 flex gap-3">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-accent-emerald font-bold text-white transition-colors hover:bg-emerald-600"
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
                          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-base text-accent-emerald transition-all hover:bg-accent-emerald/10 hover:text-accent-emerald"
                        >
                          <FiMessageCircle size={20} />
                        </a>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-card py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.14),_transparent_48%)]" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <BorderGlow
            borderRadius={36}
            glowColor="150 72 60"
            backgroundColor={isLight ? 'rgba(255, 255, 255, 0.94)' : '#020617'}
            fillOpacity={0.2}
            colors={['#10b981', '#22d3ee', '#34d399']}
          >
            <div className="rounded-[2.25rem] p-8 text-center md:p-14">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-card text-accent-emerald">
                <FiPhone size={26} />
              </div>
              <h2 className={`${displayFontClass} text-3xl font-bold text-ink-primary md:text-5xl`}>{copy.ctaTitle}</h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{copy.ctaDescription}</p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href={`https://wa.me/91${phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary h-14 px-10 text-base"
                >
                  <FiMessageCircle className="mr-2" />
                  {copy.ctaPrimary}
                </a>
                <a href={`tel:${phoneNumber}`} className="btn-secondary h-14 px-10 text-base">
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

