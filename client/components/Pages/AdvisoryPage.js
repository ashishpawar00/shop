import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBookOpen, FiCloudRain, FiMessageCircle, FiShield, FiSunrise, FiTool } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

const COPY = {
  en: {
    title: 'Advisory | Laxmi Krashi Kendra',
    description: 'Practical crop, weather, and input guidance based on local farming needs.',
    eyebrow: 'Farm advisory',
    headline: 'Advice that helps farmers move from uncertainty to the next clear field step.',
    intro:
      'This section focuses on actionable guidance: what to check, what to avoid, and when to act before a field issue becomes harder to control.',
    pillars: [
      { title: 'Crop condition checks', body: 'Spot likely stress signals early and review what changed in the field first.', icon: FiShield },
      { title: 'Weather-aware timing', body: 'Treatment timing is stronger when it respects rain, heat, and field moisture patterns.', icon: FiCloudRain },
      { title: 'Input choice guidance', body: 'Advice stays practical by connecting recommendations to products farmers can actually access.', icon: FiTool }
    ],
    articlesTitle: 'Current advisory topics',
    articles: [
      {
        title: 'Early leaf stress: what to confirm before spraying',
        summary: 'Start with leaf pattern, spread, and recent weather before jumping to the first treatment.',
        takeaway: 'Helps avoid premature or mismatched sprays.'
      },
      {
        title: 'Seed and nutrition choices for uneven crop response',
        summary: 'When growth looks inconsistent, review seed quality, moisture, and nutrition timing together.',
        takeaway: 'Reduces guesswork when multiple causes are possible.'
      },
      {
        title: 'How to respond when disease pressure rises after weather shifts',
        summary: 'Fast review of humidity, standing water, and canopy condition can narrow the likely next step.',
        takeaway: 'Supports earlier action before visible spread expands.'
      }
    ],
    checklistTitle: 'A simple advisory workflow',
    checklist: [
      'Look at the crop pattern, not just one affected leaf.',
      'Check what changed in irrigation, rain, or temperature in the last few days.',
      'Confirm whether the issue is spreading, stable, or improving.',
      'Match the response to both urgency and product availability.'
    ],
    ctaTitle: 'Need advice for your own crop right now?',
    ctaBody: 'Use Crop Doctor for a faster first read, then follow up with the team if you need store-backed guidance.',
    ctaPrimary: 'Start crop diagnosis',
    ctaSecondary: 'Talk on WhatsApp'
  },
  hi: {
    title: 'सलाह | लक्ष्मी कृषि केंद्र',
    description: 'स्थानीय खेती की जरूरतों के हिसाब से व्यावहारिक फसल, मौसम और इनपुट मार्गदर्शन।',
    eyebrow: 'खेती सलाह',
    headline: 'ऐसी सलाह जो अनिश्चितता से निकालकर किसान को अगला साफ कदम लेने में मदद करे।',
    intro:
      'यह सेक्शन काम की सलाह पर केंद्रित है: क्या देखना है, क्या नहीं करना है, और कब जल्दी कदम उठाना जरूरी है ताकि खेत की समस्या बढ़ने से पहले संभाली जा सके।',
    pillars: [
      { title: 'फसल की शुरुआती जांच', body: 'शुरुआती तनाव संकेत जल्दी पहचानें और पहले खेत में बदली हुई स्थितियों को समझें।', icon: FiShield },
      { title: 'मौसम के हिसाब से समय', body: 'उपचार का समय बारिश, गर्मी और खेत की नमी को ध्यान में रखकर ज्यादा सही बनता है।', icon: FiCloudRain },
      { title: 'इनपुट चयन मार्गदर्शन', body: 'सलाह तभी व्यावहारिक बनती है जब वह उपलब्ध और भरोसेमंद उत्पादों से जुड़ी हो।', icon: FiTool }
    ],
    articlesTitle: 'अभी के प्रमुख सलाह विषय',
    articles: [
      {
        title: 'पत्तियों पर शुरुआती तनाव दिखे तो स्प्रे से पहले क्या जांचें',
        summary: 'पहले पत्ती का पैटर्न, फैलाव और हाल का मौसम देखें, फिर उपचार तय करें।',
        takeaway: 'गलत या जल्दबाजी वाले स्प्रे से बचने में मदद मिलती है।'
      },
      {
        title: 'असमान बढ़त दिखे तो बीज और पोषण को साथ में देखें',
        summary: 'जब फसल की बढ़त समान न हो, तब बीज, नमी और पोषण समय को एक साथ समझना जरूरी है।',
        takeaway: 'एक से ज्यादा कारण होने पर अनुमान कम लगता है।'
      },
      {
        title: 'मौसम बदलने के बाद रोग दबाव बढ़े तो कैसे प्रतिक्रिया दें',
        summary: 'नमी, पानी रुकना और पत्तियों की स्थिति देखकर अगला कदम जल्दी तय किया जा सकता है।',
        takeaway: 'दिखने वाला फैलाव बढ़ने से पहले कार्रवाई आसान होती है।'
      }
    ],
    checklistTitle: 'सलाह का आसान कार्य-क्रम',
    checklist: [
      'सिर्फ एक पत्ती नहीं, पूरी फसल का पैटर्न देखें।',
      'पिछले कुछ दिनों की सिंचाई, बारिश या तापमान में बदलाव पर ध्यान दें।',
      'समस्या फैल रही है, स्थिर है या कम हो रही है, यह समझें।',
      'कार्रवाई को जरूरत और उपलब्ध उत्पाद दोनों से मिलाकर तय करें।'
    ],
    ctaTitle: 'क्या अभी अपनी फसल के लिए सलाह चाहिए?',
    ctaBody: 'तेज पहली समझ के लिए Crop Doctor से शुरुआत करें, फिर जरूरत हो तो टीम से सीधे बात करें।',
    ctaPrimary: 'फसल जांच शुरू करें',
    ctaSecondary: 'WhatsApp पर बात करें'
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function AdvisoryPage() {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.en;
  const isHindi = language === 'hi';

  return (
    <>
      <Head>
        <title>{copy.title}</title>
        <meta name="description" content={copy.description} />
      </Head>

      <div className="bg-slate-base text-ink-primary">
        <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <motion.section initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45 }} className="rounded-[2rem] border border-line-soft/10 bg-slate-card/78 px-6 py-10 shadow-xl shadow-black/10 backdrop-blur-xl sm:px-10 sm:py-14">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-accent-emerald">{copy.eyebrow}</p>
            <h1 className={`mt-5 max-w-4xl font-outfit text-4xl font-semibold tracking-tight text-ink-primary sm:text-5xl lg:text-6xl ${isHindi ? 'font-hindi' : ''}`}>{copy.headline}</h1>
            <p className={`mt-5 max-w-3xl text-base leading-8 text-ink-muted sm:text-lg ${isHindi ? 'font-hindi' : ''}`}>{copy.intro}</p>
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
                  className="rounded-[1.75rem] border border-line-soft/10 bg-slate-card/76 p-6 shadow-xl shadow-black/8 backdrop-blur-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-emerald/10 text-accent-emerald">
                    <Icon size={22} />
                  </div>
                  <h2 className={`mt-5 text-2xl font-semibold text-ink-primary ${isHindi ? 'font-hindi' : ''}`}>{pillar.title}</h2>
                  <p className={`mt-3 text-sm leading-7 text-ink-muted ${isHindi ? 'font-hindi' : ''}`}>{pillar.body}</p>
                </motion.article>
              );
            })}
          </section>

          <section className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.45 }} className="rounded-[2rem] border border-line-soft/10 bg-slate-card/78 p-6 shadow-xl shadow-black/8 backdrop-blur-xl sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-accent-emerald">{copy.articlesTitle}</p>
              <div className="mt-6 space-y-5">
                {copy.articles.map((article, index) => (
                  <div key={article.title} className="rounded-[1.5rem] border border-line-soft/10 bg-slate-base/72 p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-emerald/10 text-accent-emerald">
                        {index === 0 ? <FiSunrise size={20} /> : index === 1 ? <FiBookOpen size={20} /> : <FiCloudRain size={20} />}
                      </div>
                      <div>
                        <h3 className={`text-lg font-semibold text-ink-primary ${isHindi ? 'font-hindi' : ''}`}>{article.title}</h3>
                        <p className={`mt-2 text-sm leading-7 text-ink-secondary ${isHindi ? 'font-hindi' : ''}`}>{article.summary}</p>
                        <p className={`mt-3 text-sm leading-7 text-ink-muted ${isHindi ? 'font-hindi' : ''}`}>{article.takeaway}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.45, delay: 0.06 }} className="rounded-[2rem] border border-line-soft/10 bg-slate-card/78 p-6 shadow-xl shadow-black/8 backdrop-blur-xl sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-accent-emerald">{copy.checklistTitle}</p>
              <div className="mt-6 space-y-4">
                {copy.checklist.map(item => (
                  <div key={item} className="flex items-start gap-4 rounded-[1.35rem] border border-line-soft/10 bg-slate-base/72 p-4">
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-emerald text-xs font-bold text-white">
                      1
                    </div>
                    <p className={`text-sm leading-7 text-ink-muted ${isHindi ? 'font-hindi' : ''}`}>{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="mt-16 overflow-hidden rounded-[2rem] border border-accent-emerald/20 bg-gradient-to-br from-accent-emerald to-emerald-600 px-6 py-10 text-white shadow-2xl shadow-emerald-900/20 sm:px-10 sm:py-14">
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
