/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiBookOpen,
  FiCloudRain,
  FiMessageCircle,
  FiPackage,
  FiShield,
  FiTool,
} from 'react-icons/fi';
import { API_URL } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const CATEGORY_LABELS = {
  'crop-advisory': { en: 'Crop Advisory', hi: '\u092b\u0938\u0932 \u0938\u0932\u093e\u0939' },
  'fertilizer-tips': { en: 'Fertilizer Tips', hi: '\u0909\u0930\u094d\u0935\u0930\u0915 \u0938\u0932\u093e\u0939' },
  'pest-control': { en: 'Pest Control', hi: '\u0915\u0940\u091f \u0928\u093f\u092f\u0902\u0924\u094d\u0930\u0923' },
  seasonal: { en: 'Seasonal', hi: '\u092e\u094c\u0938\u092e\u0940' },
  general: { en: 'General', hi: '\u0938\u093e\u092e\u093e\u0928\u094d\u092f' },
};

const COPY = {
  en: {
    title: 'Advisory | Laxmi Krashi Kendra',
    description: 'Practical crop guidance and store-backed farm updates.',
    eyebrow: 'Farm advisory',
    headline: 'Fresh, practical guidance from the field and the store desk.',
    intro:
      'Published advisory posts now flow directly from the admin panel, so farmers can see timely crop notes, seasonal guidance, and product-linked recommendations in one place.',
    pillars: [
      { title: 'Field-first checks', body: 'Start with the visible crop pattern before jumping to a product decision.', icon: FiShield },
      { title: 'Weather-aware timing', body: 'Rain, humidity, and heat all affect whether a treatment helps or wastes effort.', icon: FiCloudRain },
      { title: 'Store-backed follow-up', body: 'Advice stays grounded in products and support the team can actually provide.', icon: FiTool },
    ],
    sectionTitle: 'Published advisory updates',
    emptyTitle: 'No live advisory posts yet',
    emptyBody: 'As soon as the team publishes guidance from the admin panel, it will appear here automatically.',
    readLabel: 'Read advisory',
    views: 'views',
    posts: 'posts',
    fallbackTitle: 'Local guidance, ready as soon as new posts are published',
    fallbackBody: 'The admin publishing flow is now connected. This public feed will update automatically as new posts are published.',
    ctaTitle: 'Need help for your own field right now?',
    ctaBody: 'Start with Crop Doctor for a quick first assessment, then reach out on WhatsApp if you want store-backed support.',
    ctaPrimary: 'Start crop diagnosis',
    ctaSecondary: 'Talk on WhatsApp',
  },
  hi: {
    title: '\u0938\u0932\u093e\u0939 | \u0932\u0915\u094d\u0937\u094d\u092e\u0940 \u0915\u0943\u0937\u093f \u0915\u0947\u0902\u0926\u094d\u0930',
    description: '\u0935\u094d\u092f\u093e\u0935\u0939\u093e\u0930\u093f\u0915 \u092b\u0938\u0932 \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u0928 \u0914\u0930 \u0938\u094d\u091f\u094b\u0930 \u0938\u0947 \u091c\u0941\u0921\u093c\u0940 \u0916\u0947\u0924\u0940 \u0905\u092a\u0921\u0947\u091f\u0964',
    eyebrow: '\u0916\u0947\u0924\u0940 \u0938\u0932\u093e\u0939',
    headline: '\u0916\u0947\u0924 \u0914\u0930 \u0938\u094d\u091f\u094b\u0930 \u0926\u094b\u0928\u094b\u0902 \u0938\u0947 \u091c\u0941\u0921\u093c\u0940 \u0924\u093e\u091c\u093c\u093e \u0914\u0930 \u0915\u093e\u092e \u0915\u0940 \u0938\u0932\u093e\u0939\u0964',
    intro:
      '\u0905\u092c \u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924 \u0938\u0932\u093e\u0939 \u092a\u094b\u0938\u094d\u091f \u0938\u0940\u0927\u0947 \u090f\u0921\u092e\u093f\u0928 \u092a\u0948\u0928\u0932 \u0938\u0947 \u092f\u0939\u093e\u0902 \u0906\u0924\u0940 \u0939\u0948\u0902, \u0924\u093e\u0915\u093f \u0915\u093f\u0938\u093e\u0928 \u0938\u092e\u092f \u092a\u0930 \u092b\u0938\u0932 \u0928\u094b\u091f\u094d\u0938, \u092e\u094c\u0938\u092e\u0940 \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u0928 \u0914\u0930 \u0909\u0924\u094d\u092a\u093e\u0926 \u0938\u0947 \u091c\u0941\u0921\u093c\u0940 \u0938\u093f\u092b\u093e\u0930\u093f\u0936\u0947\u0902 \u090f\u0915 \u0939\u0940 \u091c\u0917\u0939 \u0926\u0947\u0916 \u0938\u0915\u0947\u0902\u0964',
    pillars: [
      { title: '\u0916\u0947\u0924 \u0915\u0940 \u092a\u0939\u0932\u0940 \u091c\u093e\u0902\u091a', body: '\u0915\u093f\u0938\u0940 \u0909\u0924\u094d\u092a\u093e\u0926 \u092a\u0930 \u091c\u093e\u0928\u0947 \u0938\u0947 \u092a\u0939\u0932\u0947 \u092b\u0938\u0932 \u0915\u093e \u0926\u093f\u0916\u093e\u0908 \u0926\u0947\u0928\u0947 \u0935\u093e\u0932\u093e \u092a\u0948\u091f\u0930\u094d\u0928 \u0938\u092e\u091d\u0947\u0902\u0964', icon: FiShield },
      { title: '\u092e\u094c\u0938\u092e \u0915\u0947 \u0939\u093f\u0938\u093e\u092c \u0938\u0947 \u0938\u092e\u092f', body: '\u092c\u093e\u0930\u093f\u0936, \u0928\u092e\u0940 \u0914\u0930 \u0917\u0930\u094d\u092e\u0940 \u092f\u0939 \u0924\u092f \u0915\u0930\u0924\u0940 \u0939\u0948 \u0915\u093f \u0909\u092a\u091a\u093e\u0930 \u092b\u093e\u092f\u0926\u093e \u0926\u0947\u0917\u093e \u092f\u093e \u092e\u0947\u0939\u0928\u0924 \u0916\u0930\u093e\u092c \u0915\u0930\u0947\u0917\u093e\u0964', icon: FiCloudRain },
      { title: '\u0938\u094d\u091f\u094b\u0930 \u0938\u0947 \u091c\u0941\u0921\u093c\u0940 \u0938\u0939\u093e\u092f\u0924\u093e', body: '\u0938\u0932\u093e\u0939 \u0935\u0939\u0940 \u0930\u0916\u0940 \u091c\u093e\u0924\u0940 \u0939\u0948 \u091c\u093f\u0938\u0915\u0947 \u0932\u093f\u090f \u091f\u0940\u092e \u0935\u093e\u0938\u094d\u0924\u0935 \u092e\u0947\u0902 \u0909\u0924\u094d\u092a\u093e\u0926 \u0914\u0930 \u092e\u0926\u0926 \u0926\u0947 \u0938\u0915\u0947\u0964', icon: FiTool },
    ],
    sectionTitle: '\u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924 \u0938\u0932\u093e\u0939 \u0905\u092a\u0921\u0947\u091f',
    emptyTitle: '\u0905\u092d\u0940 \u0915\u094b\u0908 \u0932\u093e\u0907\u0935 \u0938\u0932\u093e\u0939 \u092a\u094b\u0938\u094d\u091f \u0928\u0939\u0940\u0902 \u0939\u0948',
    emptyBody: '\u091c\u0948\u0938\u0947 \u0939\u0940 \u091f\u0940\u092e \u090f\u0921\u092e\u093f\u0928 \u092a\u0948\u0928\u0932 \u0938\u0947 \u0928\u0908 \u0938\u0932\u093e\u0939 \u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924 \u0915\u0930\u0947\u0917\u0940, \u0935\u0939 \u092f\u0939\u093e\u0902 \u0905\u092a\u0928\u0947 \u0906\u092a \u0926\u093f\u0916\u0947\u0917\u0940\u0964',
    readLabel: '\u0938\u0932\u093e\u0939 \u092a\u0922\u093c\u0947\u0902',
    views: '\u0926\u0943\u0936\u094d\u092f',
    posts: '\u092a\u094b\u0938\u094d\u091f',
    fallbackTitle: '\u0928\u0908 \u092a\u094b\u0938\u094d\u091f \u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924 \u0939\u094b\u0924\u0947 \u0939\u0940 \u092f\u0939\u093e\u0902 \u0938\u094d\u0925\u093e\u0928\u0940\u092f \u0938\u0932\u093e\u0939 \u0926\u093f\u0916\u0947\u0917\u0940',
    fallbackBody: '\u090f\u0921\u092e\u093f\u0928 \u092a\u092c\u094d\u0932\u093f\u0936\u093f\u0902\u0917 \u092b\u094d\u0932\u094b \u0905\u092c \u091c\u0941\u0921\u093c \u091a\u0941\u0915\u093e \u0939\u0948\u0964 \u091c\u0948\u0938\u0947 \u0939\u0940 \u0928\u0908 \u092a\u094b\u0938\u094d\u091f \u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924 \u0939\u094b\u0902\u0917\u0940, \u092f\u0939 \u0938\u093e\u0930\u094d\u0935\u091c\u0928\u093f\u0915 \u092b\u0940\u0921 \u0905\u092a\u0928\u0947 \u0906\u092a \u0905\u092a\u0921\u0947\u091f \u0939\u094b\u0917\u0940\u0964',
    ctaTitle: '\u0915\u094d\u092f\u093e \u0905\u092d\u0940 \u0905\u092a\u0928\u0940 \u092b\u0938\u0932 \u0915\u0947 \u0932\u093f\u090f \u092e\u0926\u0926 \u091a\u093e\u0939\u093f\u090f?',
    ctaBody: '\u092a\u0939\u0932\u0947 Crop Doctor \u0938\u0947 \u091c\u0932\u094d\u0926\u0940 \u091c\u093e\u0902\u091a \u0915\u0930\u0947\u0902, \u092b\u093f\u0930 \u0938\u094d\u091f\u094b\u0930 \u0938\u0947 \u091c\u0941\u0921\u093c\u0940 \u092e\u0926\u0926 \u0915\u0947 \u0932\u093f\u090f WhatsApp \u092a\u0930 \u092c\u093e\u0924 \u0915\u0930\u0947\u0902\u0964',
    ctaPrimary: '\u092b\u0938\u0932 \u091c\u093e\u0902\u091a \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902',
    ctaSecondary: 'WhatsApp \u092a\u0930 \u092c\u093e\u0924 \u0915\u0930\u0947\u0902',
  },
};

const FALLBACK_POSTS = [
  {
    _id: 'fallback-1',
    category: 'crop-advisory',
    title: 'Check pattern before treatment',
    titleHindi: '\u0909\u092a\u091a\u093e\u0930 \u0938\u0947 \u092a\u0939\u0932\u0947 \u092b\u0948\u0932\u093e\u0935 \u0915\u093e \u092a\u0948\u091f\u0930\u094d\u0928 \u0926\u0947\u0916\u0947\u0902',
    content:
      'Look at which part of the field is affected first, compare with irrigation and weather changes, and only then narrow the likely next action.',
    contentHindi:
      '\u092a\u0939\u0932\u0947 \u0926\u0947\u0916\u0947\u0902 \u0915\u093f \u0916\u0947\u0924 \u0915\u0947 \u0915\u093f\u0938 \u0939\u093f\u0938\u094d\u0938\u0947 \u092e\u0947\u0902 \u0905\u0938\u0930 \u0939\u0948, \u092b\u093f\u0930 \u0938\u093f\u0902\u091a\u093e\u0908 \u0914\u0930 \u092e\u094c\u0938\u092e \u0915\u0947 \u092c\u0926\u0932\u093e\u0935 \u092e\u093f\u0932\u093e\u0915\u0930 \u0905\u0917\u0932\u093e \u0915\u0926\u092e \u0924\u092f \u0915\u0930\u0947\u0902\u0964',
    views: 0,
    createdAt: new Date().toISOString(),
    image: '',
  },
  {
    _id: 'fallback-2',
    category: 'fertilizer-tips',
    title: 'Nutrition advice works best with timing',
    titleHindi: '\u092a\u094b\u0937\u0923 \u0938\u0932\u093e\u0939 \u0938\u0939\u0940 \u0938\u092e\u092f \u092a\u0930 \u0939\u0940 \u092c\u0947\u0939\u0924\u0930 \u0915\u093e\u092e \u0915\u0930\u0924\u0940 \u0939\u0948',
    content:
      'Dose, moisture, and crop stage matter together. Applying the right input at the wrong time often creates more confusion than benefit.',
    contentHindi:
      '\u092e\u093e\u0924\u094d\u0930\u093e, \u0928\u092e\u0940 \u0914\u0930 \u092b\u0938\u0932 \u0915\u0940 \u0905\u0935\u0938\u094d\u0925\u093e \u0915\u094b \u0938\u093e\u0925 \u092e\u0947\u0902 \u0938\u092e\u091d\u0928\u093e \u091c\u0930\u0942\u0930\u0940 \u0939\u0948\u0964 \u0938\u0939\u0940 \u0907\u0928\u092a\u0941\u091f \u092d\u0940 \u0917\u0932\u0924 \u0938\u092e\u092f \u092a\u0930 \u092c\u0947\u0905\u0938\u0930 \u0939\u094b \u0938\u0915\u0924\u093e \u0939\u0948\u0964',
    views: 0,
    createdAt: new Date().toISOString(),
    image: '',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function getLabel(language, group, fallback = '') {
  return group?.[language] || group?.en || fallback;
}

function getExcerpt(post, language) {
  const source = language === 'hi' && post.contentHindi ? post.contentHindi : post.content;
  if (!source) {
    return '';
  }

  return source.length > 180 ? `${source.slice(0, 180)}...` : source;
}

function cardClasses(isLight) {
  return isLight
    ? 'border-slate-200 bg-white shadow-slate-200/60'
    : 'border-white/10 bg-slate-900/80 shadow-black/20';
}

function surfaceClasses(isLight) {
  return isLight ? 'bg-slate-50 text-slate-700' : 'bg-slate-950/50 text-slate-300';
}

export default function AdvisoryLivePage() {
  const { language } = useLanguage();
  const { isLight } = useTheme();
  const copy = COPY[language] || COPY.en;
  const isHindi = language === 'hi';
  const [posts, setPosts] = useState(FALLBACK_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadPosts() {
      try {
        const response = await fetch(`${API_URL}/posts?limit=6`);
        const data = await response.json().catch(() => ({}));

        if (!response.ok || !Array.isArray(data.posts) || data.posts.length === 0) {
          return;
        }

        if (!ignore) {
          setPosts(data.posts);
        }
      } catch (error) {
        // Keep fallback posts for resilience when the backend is unavailable.
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      ignore = true;
    };
  }, []);

  const livePosts = useMemo(() => posts || [], [posts]);

  return (
    <>
      <Head>
        <title>{copy.title}</title>
        <meta name="description" content={copy.description} />
      </Head>

      <div className={isLight ? 'bg-[#f4f7f4] text-slate-950' : 'bg-slate-950 text-white'}>
        <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className={`rounded-[2rem] border px-6 py-10 shadow-xl sm:px-10 sm:py-14 ${cardClasses(isLight)}`}
          >
            <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-500">{copy.eyebrow}</p>
            <h1 className={`mt-5 max-w-4xl font-outfit text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl ${isHindi ? 'font-hindi' : ''}`}>
              {copy.headline}
            </h1>
            <p className={`mt-5 max-w-3xl text-base leading-8 ${isLight ? 'text-slate-600' : 'text-slate-300'} sm:text-lg ${isHindi ? 'font-hindi' : ''}`}>
              {copy.intro}
            </p>
          </motion.section>

          <section className="mt-12 grid gap-5 lg:grid-cols-3">
            {copy.pillars.map((pillar, index) => {
              const Icon = pillar.icon;

              return (
                <motion.article
                  key={pillar.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`rounded-[1.75rem] border p-6 shadow-xl ${cardClasses(isLight)}`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isLight ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-500/10 text-emerald-300'}`}>
                    <Icon size={22} />
                  </div>
                  <h2 className={`mt-5 text-2xl font-semibold ${isHindi ? 'font-hindi' : ''}`}>{pillar.title}</h2>
                  <p className={`mt-3 text-sm leading-7 ${isLight ? 'text-slate-600' : 'text-slate-300'} ${isHindi ? 'font-hindi' : ''}`}>{pillar.body}</p>
                </motion.article>
              );
            })}
          </section>

          <section className={`mt-16 rounded-[2rem] border p-6 shadow-xl sm:p-8 ${cardClasses(isLight)}`}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-500">{copy.sectionTitle}</p>
                <h2 className={`mt-3 text-3xl font-semibold ${isHindi ? 'font-hindi' : ''}`}>{loading ? `${copy.sectionTitle}...` : copy.sectionTitle}</h2>
              </div>
              <div className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] ${isLight ? 'border-slate-200 bg-slate-50 text-slate-500' : 'border-white/10 bg-slate-950/50 text-slate-400'}`}>
                {livePosts.length} {copy.posts}
              </div>
            </div>

            {livePosts.length === 0 ? (
              <div className={`mt-8 rounded-[1.6rem] border border-dashed px-6 py-10 text-center ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-slate-950/50'}`}>
                <h3 className={`text-2xl font-semibold ${isHindi ? 'font-hindi' : ''}`}>{copy.emptyTitle}</h3>
                <p className={`mx-auto mt-3 max-w-2xl text-sm leading-7 ${isLight ? 'text-slate-600' : 'text-slate-400'} ${isHindi ? 'font-hindi' : ''}`}>{copy.emptyBody}</p>
              </div>
            ) : (
              <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {livePosts.map((post, index) => (
                  <motion.article
                    key={post._id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.12 }}
                    variants={fadeUp}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className={`overflow-hidden rounded-[1.75rem] border shadow-lg ${cardClasses(isLight)}`}
                  >
                    <Link href={`/advisory/${post._id}`} className="block h-full">
                      <div className={`aspect-[16/10] overflow-hidden ${isLight ? 'bg-slate-100' : 'bg-slate-950/60'}`}>
                        {post.image ? (
                          <img src={post.image} alt={isHindi && post.titleHindi ? post.titleHindi : post.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-slate-400">
                            <FiPackage size={34} />
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${isLight ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-500/10 text-emerald-300'}`}>
                            {getLabel(language, CATEGORY_LABELS[post.category], post.category)}
                          </span>
                          <span className={`inline-flex items-center gap-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                            <FiBookOpen size={12} />
                            {post.views || 0} {copy.views}
                          </span>
                        </div>

                        <h3 className={`mt-5 text-xl font-semibold ${isHindi ? 'font-hindi' : ''}`}>
                          {isHindi && post.titleHindi ? post.titleHindi : post.title}
                        </h3>

                        <p className={`mt-3 text-sm leading-7 ${isLight ? 'text-slate-600' : 'text-slate-300'} ${isHindi ? 'font-hindi' : ''}`}>
                          {getExcerpt(post, language)}
                        </p>

                        <div className="mt-5 flex items-center justify-between gap-4">
                          <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                            {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-500">
                            {copy.readLabel}
                            <FiArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}

            <div className={`mt-8 rounded-[1.5rem] border p-5 ${surfaceClasses(isLight)}`}>
              <h3 className={`text-lg font-semibold ${isHindi ? 'font-hindi' : ''}`}>{copy.fallbackTitle}</h3>
              <p className={`mt-3 text-sm leading-7 ${isLight ? 'text-slate-600' : 'text-slate-300'} ${isHindi ? 'font-hindi' : ''}`}>{copy.fallbackBody}</p>
            </div>
          </section>

          <section className="mt-16 overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 py-10 text-white shadow-2xl shadow-emerald-900/20 sm:px-10 sm:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-100/90">Next step</p>
                <h2 className={`mt-4 font-outfit text-3xl font-semibold tracking-tight sm:text-4xl ${isHindi ? 'font-hindi' : ''}`}>{copy.ctaTitle}</h2>
                <p className={`mt-4 text-base leading-8 text-emerald-50/85 ${isHindi ? 'font-hindi' : ''}`}>{copy.ctaBody}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/crop-doctor" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-700 transition hover:scale-[1.02]">
                  {copy.ctaPrimary}
                  <FiArrowRight className="ml-2" />
                </Link>
                <a href="https://wa.me/919977938192" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                  <FiMessageCircle className="mr-2" />
                  {copy.ctaSecondary}
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
