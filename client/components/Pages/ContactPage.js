import { useState } from 'react';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiCheckCircle, FiClock, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { API_URL } from '@/lib/api';

const PHONE_NUMBER = '9977938192';
const WHATSAPP_NUMBER = '919977938192';

const COPY = {
  en: {
    title: 'Contact Laxmi Krashi Kendra',
    eyebrow: 'Contact and support',
    headline: 'Reach the team without waiting at the store.',
    intro: 'Send your crop question, buying requirement, or follow-up request and the team will respond as quickly as possible.',
    cards: {
      call: { title: 'Call directly', body: '+91 9977938192', note: 'For urgent crop or product questions' },
      whatsapp: { title: 'WhatsApp support', body: 'Chat with the team', note: 'Useful for crop photos and quick follow-up' },
      location: { title: 'Visit the store', body: 'Bus Stand Chowk, Siratha, Madhya Pradesh - 480334', note: 'Walk in for product pickup and advice' },
      hours: { title: 'Store hours', body: '9:00 AM to 8:00 PM', note: 'Monday to Saturday' }
    },
    formTitle: 'Send a message',
    formBody: 'Share the crop, issue, and your village so the team can reply with more context.',
    name: 'Your name',
    phone: 'Phone number',
    village: 'Village / location',
    message: 'Your message',
    placeholders: {
      name: 'Farmer name',
      phone: '9977938192',
      village: 'Siratha',
      message: 'Tell us what crop issue or product requirement you have.'
    },
    submit: 'Send message',
    sending: 'Sending...',
    successTitle: 'Message sent',
    successBody: 'The team will get back to you shortly.',
    error: 'We could not send the message right now. Please try WhatsApp or call directly.'
  },
  hi: {
    title: 'लक्ष्मी कृषि केंद्र से संपर्क करें',
    eyebrow: 'संपर्क और सहायता',
    headline: 'स्टोर आए बिना भी टीम से सीधे जुड़ें।',
    intro: 'फसल की समस्या, खरीद की जरूरत या फॉलो-अप संदेश भेजें। टीम जल्द से जल्द जवाब देगी।',
    cards: {
      call: { title: 'सीधे कॉल करें', body: '+91 9977938192', note: 'तुरंत फसल या उत्पाद सहायता के लिए' },
      whatsapp: { title: 'WhatsApp सहायता', body: 'टीम से चैट करें', note: 'फसल की फोटो और तेज फॉलो-अप के लिए उपयोगी' },
      location: { title: 'स्टोर विजिट', body: 'बस स्टैंड चौक, सिराथा, मध्य प्रदेश - 480334', note: 'उत्पाद लेने और सलाह के लिए आएं' },
      hours: { title: 'स्टोर समय', body: 'सुबह 9:00 बजे से रात 8:00 बजे तक', note: 'सोमवार से शनिवार' }
    },
    formTitle: 'संदेश भेजें',
    formBody: 'फसल, समस्या और गांव की जानकारी लिखें ताकि टीम अधिक उपयोगी जवाब दे सके।',
    name: 'आपका नाम',
    phone: 'फोन नंबर',
    village: 'गांव / स्थान',
    message: 'आपका संदेश',
    placeholders: {
      name: 'किसान का नाम',
      phone: '9977938192',
      village: 'सिराथा',
      message: 'फसल की समस्या या जिस उत्पाद की जरूरत है, वह लिखें।'
    },
    submit: 'संदेश भेजें',
    sending: 'भेजा जा रहा है...',
    successTitle: 'संदेश भेज दिया गया',
    successBody: 'हमारी टीम जल्द ही आपसे संपर्क करेगी।',
    error: 'अभी संदेश नहीं भेजा जा सका। कृपया WhatsApp या सीधे कॉल करें।'
  }
};

const initialForm = {
  name: '',
  phone: '',
  village: '',
  message: ''
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

function InfoCard({ icon, title, body, note, href, accent }) {
  const content = (
    <div className="rounded-[1.75rem] border border-line-soft/10 bg-slate-card/76 p-5 shadow-xl shadow-black/8 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-accent-emerald/25">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${accent}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-accent-emerald">{title}</p>
          <p className="mt-3 text-base font-semibold leading-7 text-ink-primary">{body}</p>
          <p className="mt-2 text-sm leading-6 text-ink-muted">{note}</p>
        </div>
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
      {content}
    </a>
  );
}

export default function ContactPage() {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.en;
  const isHindi = language === 'hi';
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(current => ({ ...current, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Unable to send enquiry');
      }

      setSuccess(true);
      setFormData(initialForm);
      setTimeout(() => setSuccess(false), 4000);
    } catch (submitError) {
      setError(copy.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>{copy.title}</title>
        <meta name="description" content={copy.intro} />
      </Head>

      <div className="bg-slate-base text-ink-primary">
        <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45 }}>
              <div className="rounded-[2rem] border border-line-soft/10 bg-slate-card/78 p-6 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-accent-emerald">{copy.eyebrow}</p>
                <h1 className={`mt-5 font-outfit text-4xl font-semibold tracking-tight text-ink-primary sm:text-5xl ${isHindi ? 'font-hindi' : ''}`}>{copy.headline}</h1>
                <p className={`mt-5 text-base leading-8 text-ink-muted sm:text-lg ${isHindi ? 'font-hindi' : ''}`}>{copy.intro}</p>

                <div className="mt-8 grid gap-4">
                  <InfoCard
                    icon={<FiPhone size={22} className="text-accent-emerald" />}
                    title={copy.cards.call.title}
                    body={copy.cards.call.body}
                    note={copy.cards.call.note}
                    href={`tel:${PHONE_NUMBER}`}
                    accent="bg-accent-emerald/10"
                  />
                  <InfoCard
                    icon={<FaWhatsapp size={22} className="text-[#25D366]" />}
                    title={copy.cards.whatsapp.title}
                    body={copy.cards.whatsapp.body}
                    note={copy.cards.whatsapp.note}
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    accent="bg-[#25D366]/10"
                  />
                  <InfoCard
                    icon={<FiMapPin size={22} className="text-accent-emerald" />}
                    title={copy.cards.location.title}
                    body={copy.cards.location.body}
                    note={copy.cards.location.note}
                    accent="bg-accent-emerald/10"
                  />
                  <InfoCard
                    icon={<FiClock size={22} className="text-accent-emerald" />}
                    title={copy.cards.hours.title}
                    body={copy.cards.hours.body}
                    note={copy.cards.hours.note}
                    accent="bg-accent-emerald/10"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45, delay: 0.08 }}>
              <div className="relative overflow-hidden rounded-[2rem] border border-line-soft/10 bg-slate-card/78 p-6 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-8">
                <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-accent-emerald/10 blur-3xl" />
                <div className="relative">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-accent-emerald">{copy.formTitle}</p>
                  <p className={`mt-4 max-w-2xl text-base leading-8 text-ink-muted ${isHindi ? 'font-hindi' : ''}`}>{copy.formBody}</p>

                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        className="mt-8 rounded-[1.5rem] border border-accent-emerald/20 bg-accent-emerald/10 p-6"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-emerald text-white">
                            <FiCheckCircle size={22} />
                          </div>
                          <div>
                            <h2 className={`text-xl font-semibold text-ink-primary ${isHindi ? 'font-hindi' : ''}`}>{copy.successTitle}</h2>
                            <p className={`mt-2 text-sm leading-7 text-ink-secondary ${isHindi ? 'font-hindi' : ''}`}>{copy.successBody}</p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                      >
                        <div className="grid gap-5 sm:grid-cols-2">
                          <label className="block">
                            <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-ink-muted">{copy.name}</span>
                            <input
                              required
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder={copy.placeholders.name}
                              className="w-full rounded-[1.25rem] border border-line-soft/10 bg-slate-base/70 px-4 py-4 text-sm text-ink-primary outline-none transition focus:border-accent-emerald/40"
                            />
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-ink-muted">{copy.phone}</span>
                            <input
                              required
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder={copy.placeholders.phone}
                              className="w-full rounded-[1.25rem] border border-line-soft/10 bg-slate-base/70 px-4 py-4 text-sm text-ink-primary outline-none transition focus:border-accent-emerald/40"
                            />
                          </label>
                        </div>

                        <label className="block">
                          <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-ink-muted">{copy.village}</span>
                          <input
                            name="village"
                            value={formData.village}
                            onChange={handleChange}
                            placeholder={copy.placeholders.village}
                            className="w-full rounded-[1.25rem] border border-line-soft/10 bg-slate-base/70 px-4 py-4 text-sm text-ink-primary outline-none transition focus:border-accent-emerald/40"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-ink-muted">{copy.message}</span>
                          <textarea
                            required
                            name="message"
                            rows="6"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder={copy.placeholders.message}
                            className="w-full resize-none rounded-[1.25rem] border border-line-soft/10 bg-slate-base/70 px-4 py-4 text-sm text-ink-primary outline-none transition focus:border-accent-emerald/40"
                          />
                        </label>

                        {error ? <p className={`rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 ${isHindi ? 'font-hindi' : ''}`}>{error}</p> : null}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex w-full items-center justify-center rounded-full bg-accent-emerald px-6 py-4 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <FiSend className="mr-2" />
                          {isSubmitting ? copy.sending : copy.submit}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </section>
        </main>
      </div>
    </>
  );
}
