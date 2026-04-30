/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiAlertCircle, FiArrowLeft, FiArrowRight, FiBookOpen, FiMessageCircle, FiPackage, FiRefreshCw } from 'react-icons/fi';
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
    loading: 'Loading advisory...',
    back: 'Back to advisory',
    notFoundTitle: 'Advisory post not found',
    notFoundBody: 'The post may have been removed, unpublished, or the link may be incorrect.',
    browse: 'Browse advisory',
    views: 'views',
    related: 'Related advisory updates',
    relatedBody: 'More posts from the same guidance category.',
    supportTitle: 'Need help applying this advice in your own field?',
    supportBody: 'Start with Crop Doctor or message the store team directly for practical follow-up.',
    supportPrimary: 'Start crop diagnosis',
    supportSecondary: 'Talk on WhatsApp',
  },
  hi: {
    loading: '\u0938\u0932\u093e\u0939 \u0932\u094b\u0921 \u0939\u094b \u0930\u0939\u0940 \u0939\u0948...',
    back: '\u0938\u0932\u093e\u0939 \u0938\u0942\u091a\u0940 \u092a\u0930 \u0935\u093e\u092a\u0938 \u091c\u093e\u090f\u0901',
    notFoundTitle: '\u0938\u0932\u093e\u0939 \u092a\u094b\u0938\u094d\u091f \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u093e',
    notFoundBody: '\u092f\u0939 \u092a\u094b\u0938\u094d\u091f \u0939\u091f\u093e\u092f\u093e \u091c\u093e \u091a\u0941\u0915\u093e \u0939\u0948, \u0905\u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924 \u0939\u0948, \u092f\u093e \u0932\u093f\u0902\u0915 \u0938\u0939\u0940 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964',
    browse: '\u0938\u0932\u093e\u0939 \u0926\u0947\u0916\u0947\u0902',
    views: '\u0926\u0943\u0936\u094d\u092f',
    related: '\u092e\u093f\u0932\u0924\u0940-\u091c\u0941\u0932\u0924\u0940 \u0938\u0932\u093e\u0939',
    relatedBody: '\u0907\u0938\u0940 \u0936\u094d\u0930\u0947\u0923\u0940 \u0915\u0947 \u0914\u0930 \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u0928 \u092a\u094b\u0938\u094d\u091f \u0926\u0947\u0916\u0947\u0902\u0964',
    supportTitle: '\u0915\u094d\u092f\u093e \u0907\u0938 \u0938\u0932\u093e\u0939 \u0915\u094b \u0905\u092a\u0928\u0947 \u0916\u0947\u0924 \u092e\u0947\u0902 \u0932\u093e\u0917\u0942 \u0915\u0930\u0928\u0947 \u092e\u0947\u0902 \u092e\u0926\u0926 \u091a\u093e\u0939\u093f\u090f?',
    supportBody: '\u092a\u0939\u0932\u0947 Crop Doctor \u0938\u0947 \u091c\u093e\u0902\u091a \u0915\u0930\u0947\u0902 \u092f\u093e \u0935\u094d\u092f\u093e\u0935\u0939\u093e\u0930\u093f\u0915 \u092e\u0926\u0926 \u0915\u0947 \u0932\u093f\u090f \u0938\u0940\u0927\u0947 \u0938\u094d\u091f\u094b\u0930 \u091f\u0940\u092e \u0938\u0947 \u092c\u093e\u0924 \u0915\u0930\u0947\u0902\u0964',
    supportPrimary: '\u092b\u0938\u0932 \u091c\u093e\u0902\u091a \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902',
    supportSecondary: 'WhatsApp \u092a\u0930 \u092c\u093e\u0924 \u0915\u0930\u0947\u0902',
  },
};

function getLocalized(post, field, language) {
  const hindiValue = post?.[`${field}Hindi`];
  const englishValue = post?.[field];
  return language === 'hi' ? hindiValue || englishValue || '' : englishValue || hindiValue || '';
}

function cardClasses(isLight) {
  return isLight ? 'border-slate-200 bg-white shadow-slate-200/60' : 'border-white/10 bg-slate-900 shadow-black/20';
}

function getCategoryLabel(language, category) {
  return CATEGORY_LABELS[category]?.[language] || CATEGORY_LABELS[category]?.en || category;
}

export default function AdvisoryPostDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { language } = useLanguage();
  const { isLight } = useTheme();
  const copy = COPY[language] || COPY.en;
  const isHindi = language === 'hi';

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPost = useCallback(async () => {
    if (!id || typeof id !== 'string') {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/posts/${id}`);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || copy.notFoundTitle);
      }

      setPost(data);

      const relatedResponse = await fetch(
        `${API_URL}/posts?category=${encodeURIComponent(data.category || 'general')}&limit=4`
      );
      const relatedData = await relatedResponse.json().catch(() => ({}));

      if (relatedResponse.ok && Array.isArray(relatedData.posts)) {
        setRelatedPosts(relatedData.posts.filter((item) => item._id !== data._id).slice(0, 3));
      } else {
        setRelatedPosts([]);
      }
    } catch (loadError) {
      setPost(null);
      setRelatedPosts([]);
      setError(loadError.message || copy.notFoundBody);
    } finally {
      setLoading(false);
    }
  }, [copy.notFoundBody, copy.notFoundTitle, id]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  const localizedTitle = useMemo(() => (post ? getLocalized(post, 'title', language) : ''), [language, post]);
  const localizedContent = useMemo(() => (post ? getLocalized(post, 'content', language) : ''), [language, post]);
  const supportHref = useMemo(() => {
    const message =
      language === 'hi'
        ? `\u0928\u092e\u0938\u094d\u0924\u0947, \u092e\u0941\u091d\u0947 "${localizedTitle}" \u0915\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902 \u0914\u0930 \u092e\u0926\u0926 \u091a\u093e\u0939\u093f\u090f\u0964`
        : `Hello, I need follow-up help for "${localizedTitle}".`;

    return `https://wa.me/919977938192?text=${encodeURIComponent(message)}`;
  }, [language, localizedTitle]);

  if (loading) {
    return (
      <div className={isLight ? 'bg-[#f4f7f4] text-slate-950' : 'bg-slate-950 text-white'}>
        <div className="flex min-h-[60vh] items-center justify-center px-4 pt-28 pb-20">
          <div className={`flex items-center gap-3 rounded-2xl border px-6 py-4 text-sm font-semibold ${isLight ? 'border-slate-200 bg-white text-slate-700' : 'border-white/10 bg-slate-900 text-slate-200'}`}>
            <FiRefreshCw className="animate-spin" />
            {copy.loading}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
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
              <p className={`mx-auto mt-3 max-w-xl text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{error || copy.notFoundBody}</p>
              <Link href="/advisory" className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600">
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
        <title>{localizedTitle} | Laxmi Krashi Kendra</title>
        <meta name="description" content={localizedContent.slice(0, 160)} />
      </Head>

      <div className={isLight ? 'bg-[#f4f7f4] text-slate-950' : 'bg-slate-950 text-white'}>
        <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <Link
            href="/advisory"
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${isLight ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50' : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'}`}
          >
            <FiArrowLeft size={15} />
            {copy.back}
          </Link>

          <article className={`mt-6 overflow-hidden rounded-[2rem] border shadow-2xl ${cardClasses(isLight)}`}>
            <div className={`aspect-[16/7] overflow-hidden ${isLight ? 'bg-slate-100' : 'bg-slate-950/60'}`}>
              {post.image ? (
                <img src={post.image} alt={localizedTitle} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">
                  <FiPackage size={44} />
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${isLight ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-500/15 text-emerald-300'}`}>
                  {getCategoryLabel(language, post.category)}
                </span>
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-slate-300'}`}>
                  <FiBookOpen size={12} />
                  {post.views || 0} {copy.views}
                </span>
                <span className={`text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>

              <h1 className={`mt-5 text-4xl font-black tracking-tight sm:text-5xl ${isHindi ? 'font-hindi' : ''}`}>{localizedTitle}</h1>

              {post.tags?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={`${post._id}-${tag}`} className={`rounded-full px-3 py-1 text-xs font-semibold ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-slate-300'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className={`mt-8 text-base leading-8 ${isLight ? 'text-slate-700' : 'text-slate-300'} ${isHindi ? 'font-hindi' : ''}`}>
                {localizedContent.split(/\n+/).filter(Boolean).map((paragraph, index) => (
                  <p key={`${post._id}-paragraph-${index}`} className={index === 0 ? '' : 'mt-5'}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>

          {relatedPosts.length ? (
            <section className={`mt-10 rounded-[2rem] border p-6 shadow-xl ${cardClasses(isLight)}`}>
              <div>
                <p className={`text-xs font-black uppercase tracking-[0.18em] ${isLight ? 'text-emerald-600' : 'text-emerald-300'}`}>{copy.related}</p>
                <h2 className="mt-2 text-3xl font-black">{copy.related}</h2>
                <p className={`mt-2 text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{copy.relatedBody}</p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {relatedPosts.map((item) => (
                  <Link
                    key={item._id}
                    href={`/advisory/${item._id}`}
                    className={`group overflow-hidden rounded-[1.5rem] border transition hover:-translate-y-1 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-slate-950/40'}`}
                  >
                    <div className={`aspect-[16/10] overflow-hidden ${isLight ? 'bg-slate-100' : 'bg-slate-950/60'}`}>
                      {item.image ? (
                        <img src={item.image} alt={getLocalized(item, 'title', language)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-400">
                          <FiPackage size={30} />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-lg font-semibold">{getLocalized(item, 'title', language)}</p>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-500">
                        {copy.browse}
                        <FiArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-10 overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 py-10 text-white shadow-2xl shadow-emerald-900/20 sm:px-10 sm:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-100/90">Support</p>
                <h2 className={`mt-4 font-outfit text-3xl font-semibold tracking-tight sm:text-4xl ${isHindi ? 'font-hindi' : ''}`}>{copy.supportTitle}</h2>
                <p className={`mt-4 text-base leading-8 text-emerald-50/85 ${isHindi ? 'font-hindi' : ''}`}>{copy.supportBody}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/crop-doctor" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-700 transition hover:scale-[1.02]">
                  {copy.supportPrimary}
                  <FiArrowRight className="ml-2" />
                </Link>
                <a href={supportHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                  <FiMessageCircle className="mr-2" />
                  {copy.supportSecondary}
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
