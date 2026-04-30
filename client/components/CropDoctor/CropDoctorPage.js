/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  FiAlertTriangle,
  FiCamera,
  FiCheckCircle,
  FiClock,
  FiDroplet,
  FiFileText,
  FiInfo,
  FiMessageCircle,
  FiRefreshCcw,
  FiSearch,
  FiShield,
  FiUpload,
  FiX,
} from 'react-icons/fi';
import { API_URL } from '@/lib/api';
import { useTheme } from '@/contexts/ThemeContext';

const CROP_OPTIONS = [
  { value: 'wheat', label: 'Wheat' },
  { value: 'rice', label: 'Rice' },
  { value: 'cotton', label: 'Cotton' },
  { value: 'sugarcane', label: 'Sugarcane' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'pulses', label: 'Pulses' },
  { value: 'oilseeds', label: 'Oilseeds' },
];

const ISSUE_AREA_OPTIONS = [
  { value: 'leaf', label: 'Leaf' },
  { value: 'stem', label: 'Stem' },
  { value: 'root', label: 'Root' },
  { value: 'fruit', label: 'Fruit or pod' },
  { value: 'whole_plant', label: 'Whole plant' },
];

const SYMPTOM_OPTIONS = [
  { value: 'yellowing', label: 'Leaf yellowing' },
  { value: 'brown_spots', label: 'Brown or black spots' },
  { value: 'holes_or_bites', label: 'Holes or bite marks' },
  { value: 'curling', label: 'Leaf curling' },
  { value: 'white_powder', label: 'White powder layer' },
  { value: 'wilting', label: 'Wilting or drooping' },
  { value: 'stunted_growth', label: 'Slow growth' },
  { value: 'stem_damage', label: 'Stem damage' },
  { value: 'insect_presence', label: 'Visible insects' },
  { value: 'root_rot', label: 'Root rot or foul smell' },
];

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '9977938192';
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919977938192';

function severityTone(severity) {
  switch (severity) {
    case 'high':
      return 'border-rose-500/20 bg-rose-500/10 text-rose-200';
    case 'medium':
      return 'border-amber-500/20 bg-amber-500/10 text-amber-200';
    default:
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-200';
  }
}

export default function CropDoctorPage() {
  const { isLight } = useTheme();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [imageData, setImageData] = useState('');
  const [cropType, setCropType] = useState('rice');
  const [issueArea, setIssueArea] = useState('leaf');
  const [symptoms, setSymptoms] = useState([]);
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  }, [stream]);

  const toggleSymptom = (value) => {
    setSymptoms((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    setCameraActive(false);
  };

  const startCamera = async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      setStream(mediaStream);
      setCameraActive(true);
    } catch (cameraError) {
      setError('Camera access was blocked. You can still upload an image from the gallery.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0);

    setImageData(canvas.toDataURL('image/jpeg', 0.9));
    stopCamera();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageData(typeof reader.result === 'string' ? reader.result : '');
    };
    reader.readAsDataURL(file);
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/crop-doctor/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropType,
          issueArea,
          symptoms,
          notes,
          imageData,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to analyze the sample.');
      }

      setResult(data);
    } catch (analysisError) {
      if (analysisError instanceof TypeError && /fetch/i.test(analysisError.message)) {
        setError('Cannot reach the diagnosis API. Make sure the backend server is running on http://localhost:5000.');
      } else {
        setError(analysisError.message || 'Unable to analyze the sample.');
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setImageData('');
    setSymptoms([]);
    setNotes('');
    setResult(null);
    setError('');
    stopCamera();
  };

  const shellCardClass = isLight
    ? 'border border-line-soft/10 bg-slate-card/96 shadow-xl shadow-slate-900/6'
    : 'border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur';
  const darkFeatureCardClass = isLight
    ? 'border border-line-soft/10 bg-slate-card/96 shadow-xl shadow-slate-900/8'
    : 'border border-white/10 bg-slate-950/70 shadow-2xl shadow-black/20';
  const innerCardClass = isLight
    ? 'border border-line-soft/10 bg-slate-base/80'
    : 'border border-white/10 bg-white/5';
  const inputClass = isLight
    ? 'w-full rounded-2xl border border-line-soft/10 bg-slate-base/90 px-4 py-4 text-ink-primary outline-none focus:border-emerald-400/50'
    : 'w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none focus:border-emerald-400/50';
  const textareaClass = isLight
    ? 'w-full rounded-[1.75rem] border border-line-soft/10 bg-slate-base/90 px-4 py-4 text-ink-primary outline-none transition placeholder:text-ink-muted focus:border-emerald-400/50'
    : 'w-full rounded-[1.75rem] border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50';
  const labelClass = isLight ? 'text-ink-secondary' : 'text-slate-300';
  const mutedClass = isLight ? 'text-ink-muted' : 'text-slate-400';
  const strongTextClass = isLight ? 'text-ink-primary' : 'text-white';
  const secondaryTextClass = isLight ? 'text-ink-secondary' : 'text-slate-300';
  const ghostButtonClass = isLight
    ? 'border border-line-soft/10 bg-slate-base/75 text-ink-secondary hover:bg-slate-base hover:text-ink-primary'
    : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white';
  const tileClass = isLight
    ? 'border border-line-soft/10 bg-slate-base/72 hover:bg-slate-base/92'
    : 'border border-white/10 bg-white/5 hover:bg-white/10';
  const resultPanelClass = isLight
    ? 'border border-line-soft/10 bg-slate-card/96 shadow-xl shadow-slate-900/8'
    : 'border border-white/10 bg-slate-950/80 shadow-2xl shadow-black/20';

  return (
    <>
      <Head>
        <title>Crop Doctor | Laxmi Krashi Kendra</title>
      </Head>

      <div className="min-h-screen bg-slate-base px-4 pb-20 pt-32 text-ink-primary sm:px-6">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-10%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[24rem] w-[24rem] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
              <FiShield size={14} />
              Crop diagnostic assistant
            </div>
            <h1 className={`mt-6 text-4xl font-black tracking-tight sm:text-6xl ${strongTextClass}`}>
              Diagnose crop issues with a real backend workflow.
            </h1>
            <p className={`mx-auto mt-5 max-w-3xl text-lg leading-relaxed ${mutedClass}`}>
              Upload or capture a crop photo, choose the crop and visible symptoms, and the diagnosis engine returns a consistent recommendation instead of a random result.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <section className={`rounded-[2.5rem] p-6 sm:p-8 ${shellCardClass}`}>
              <h2 className={`text-2xl font-black ${strongTextClass}`}>1. Add field details</h2>
              <p className={`mt-2 text-sm ${mutedClass}`}>
                Select the crop and the symptoms you can clearly see. This gives the engine enough signal to produce a useful result.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={`mb-2 block text-sm font-semibold ${labelClass}`}>Crop type</label>
                  <select
                    value={cropType}
                    onChange={(event) => setCropType(event.target.value)}
                    className={inputClass}
                  >
                    {CROP_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`mb-2 block text-sm font-semibold ${labelClass}`}>Most affected area</label>
                  <select
                    value={issueArea}
                    onChange={(event) => setIssueArea(event.target.value)}
                    className={inputClass}
                  >
                    {ISSUE_AREA_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8">
                <label className={`mb-3 block text-sm font-semibold ${labelClass}`}>Visible symptoms</label>
                <div className="flex flex-wrap gap-3">
                  {SYMPTOM_OPTIONS.map((option) => {
                    const active = symptoms.includes(option.value);

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => toggleSymptom(option.value)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          active
                            ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-100'
                            : isLight
                              ? 'border border-line-soft/10 bg-slate-base/85 text-ink-secondary hover:bg-slate-base hover:text-ink-primary'
                              : 'border-white/10 bg-slate-950/60 text-slate-300 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <label className={`mb-2 block text-sm font-semibold ${labelClass}`}>Field notes</label>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={4}
                  placeholder="Example: spread quickly after rain, insects under the leaf, roots smell bad..."
                  className={textareaClass}
                />
              </div>
            </section>

            <section className={`rounded-[2.5rem] p-6 sm:p-8 ${darkFeatureCardClass}`}>
              <h2 className={`text-2xl font-black ${strongTextClass}`}>2. Add a crop photo</h2>
              <p className={`mt-2 text-sm ${mutedClass}`}>
                A photo is optional for this flow but helps you document what you saw in the field.
              </p>

              {!cameraActive ? (
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={startCamera}
                    className={`flex min-h-[13rem] flex-col items-center justify-center rounded-[2rem] p-6 text-center transition ${tileClass}`}
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-300">
                      <FiCamera size={28} />
                    </div>
                    <p className={`text-lg font-bold ${strongTextClass}`}>Use camera</p>
                    <p className={`mt-2 text-sm ${mutedClass}`}>Capture the affected leaf or plant.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex min-h-[13rem] flex-col items-center justify-center rounded-[2rem] p-6 text-center transition ${tileClass}`}
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/15 text-cyan-300">
                      <FiUpload size={28} />
                    </div>
                    <p className={`text-lg font-bold ${strongTextClass}`}>Upload image</p>
                    <p className={`mt-2 text-sm ${mutedClass}`}>Choose a photo from the gallery.</p>
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </div>
              ) : (
                <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-black">
                  <video ref={videoRef} className="aspect-video w-full object-cover" />
                  <div className="flex flex-wrap gap-3 p-5">
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-emerald-600"
                    >
                      Capture
                    </button>
                    <button
                      type="button"
                      onClick={stopCamera}
                      className={`rounded-2xl px-5 py-3 text-sm font-black uppercase tracking-[0.18em] transition ${ghostButtonClass}`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {imageData ? (
                <div className={`mt-8 overflow-hidden rounded-[2rem] ${innerCardClass}`}>
                  <img src={imageData} alt="Crop sample preview" className="aspect-video w-full object-cover" />
                  <div className="flex items-center justify-between gap-4 p-4">
                    <div>
                      <p className={`text-sm font-semibold ${strongTextClass}`}>Sample captured</p>
                      <p className={`text-xs ${mutedClass}`}>You can replace the photo anytime before running the diagnosis.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setImageData('')}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] transition ${ghostButtonClass}`}
                    >
                      <FiX size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              ) : null}

              <div className={`mt-8 rounded-[1.75rem] p-5 ${innerCardClass}`}>
                <div className="flex items-start gap-3">
                  <FiInfo className="mt-0.5 text-emerald-300" size={18} />
                  <p className={`text-sm leading-relaxed ${secondaryTextClass}`}>
                    Best results come from a close crop photo plus a few selected symptoms. This avoids the random output that the old page was returning.
                  </p>
                </div>
              </div>

              {error ? (
                <div className="mt-6 rounded-[1.5rem] border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-200">
                  {error}
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={runAnalysis}
                  disabled={analyzing}
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {analyzing ? <FiClock size={16} className="animate-spin" /> : <FiSearch size={16} />}
                  {analyzing ? 'Analyzing...' : 'Run diagnosis'}
                </button>

                <button
                  type="button"
                  onClick={resetAnalysis}
                  className={`inline-flex items-center gap-2 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-[0.18em] transition ${ghostButtonClass}`}
                >
                  <FiRefreshCcw size={16} />
                  Reset
                </button>
              </div>
            </section>
          </div>

          {result ? (
            <section className={`mt-8 rounded-[2.5rem] p-6 sm:p-8 ${resultPanelClass}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] ${severityTone(result.diagnosis.severity)}`}>
                    <FiAlertTriangle size={14} />
                    {result.diagnosis.severity} priority
                  </div>
                  <h2 className={`mt-5 text-3xl font-black sm:text-4xl ${strongTextClass}`}>{result.diagnosis.title}</h2>
                  <p className="mt-2 text-lg text-emerald-300">{result.diagnosis.crop}</p>
                </div>

                <div className={`rounded-[1.75rem] px-5 py-4 text-right ${innerCardClass}`}>
                  <p className={`text-xs font-black uppercase tracking-[0.18em] ${mutedClass}`}>Confidence</p>
                  <p className={`mt-2 text-3xl font-black ${strongTextClass}`}>{Math.round(result.diagnosis.confidence * 100)}%</p>
                </div>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                <div className={`rounded-[1.75rem] p-5 ${innerCardClass}`}>
                  <p className={`text-xs font-black uppercase tracking-[0.18em] ${mutedClass}`}>Assessment</p>
                  <p className={`mt-3 text-base leading-relaxed ${secondaryTextClass}`}>{result.diagnosis.summary}</p>
                  <p className={`mt-4 text-sm leading-relaxed ${mutedClass}`}>{result.diagnosis.cause}</p>
                </div>

                <div className={`rounded-[1.75rem] p-5 ${innerCardClass}`}>
                  <p className={`text-xs font-black uppercase tracking-[0.18em] ${mutedClass}`}>Matched signals</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.issueArea ? (
                      <span className="rounded-full bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-200">
                        {result.issueArea}
                      </span>
                    ) : null}
                    {result.matchedSymptoms?.map((item) => (
                      <span key={item} className="rounded-full bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-200">
                        {item}
                      </span>
                    ))}
                    {!result.issueArea && !result.matchedSymptoms?.length ? (
                      <span className={`text-sm ${mutedClass}`}>No strong symptom matches yet.</span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                <div className={`rounded-[1.75rem] p-5 ${innerCardClass}`}>
                  <p className={`text-xs font-black uppercase tracking-[0.18em] ${mutedClass}`}>Immediate actions</p>
                  <div className="mt-4 space-y-3">
                    {result.diagnosis.immediateActions.map((item) => (
                      <div key={item} className="flex gap-3">
                        <FiCheckCircle className="mt-0.5 text-emerald-300" size={16} />
                        <p className={`text-sm leading-relaxed ${secondaryTextClass}`}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`rounded-[1.75rem] p-5 ${innerCardClass}`}>
                  <p className={`text-xs font-black uppercase tracking-[0.18em] ${mutedClass}`}>Treatment direction</p>
                  <div className="mt-4 space-y-3">
                    {result.diagnosis.treatment.map((item) => (
                      <div key={item} className="flex gap-3">
                        <FiDroplet className="mt-0.5 text-cyan-300" size={16} />
                        <p className={`text-sm leading-relaxed ${secondaryTextClass}`}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`rounded-[1.75rem] p-5 ${innerCardClass}`}>
                  <p className={`text-xs font-black uppercase tracking-[0.18em] ${mutedClass}`}>Prevention</p>
                  <div className="mt-4 space-y-3">
                    {result.diagnosis.prevention.map((item) => (
                      <div key={item} className="flex gap-3">
                        <FiShield className="mt-0.5 text-emerald-300" size={16} />
                        <p className={`text-sm leading-relaxed ${secondaryTextClass}`}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-amber-500/20 bg-amber-500/10 p-5">
                <div className="flex gap-3">
                  <FiInfo className="mt-0.5 text-amber-300" size={18} />
                  <p className="text-sm leading-relaxed text-amber-100">{result.disclaimer}</p>
                </div>
              </div>

              <div className={`mt-8 rounded-[2rem] p-6 ${innerCardClass}`}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className={`text-xs font-black uppercase tracking-[0.18em] ${mutedClass}`}>Suggested products</p>
                    <h3 className={`mt-2 text-2xl font-black ${strongTextClass}`}>Relevant stock to review</h3>
                  </div>
                  <Link
                    href="/products"
                    className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-emerald-600"
                  >
                    Browse products
                  </Link>
                </div>

                {result.recommendedProducts?.length ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {result.recommendedProducts.map((product) => (
                      <div key={product.id} className={`overflow-hidden rounded-[1.75rem] ${darkFeatureCardClass}`}>
                        <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover" />
                        <div className="p-4">
                          <p className={`text-sm font-semibold ${mutedClass}`}>{product.brand}</p>
                          <h4 className={`mt-1 text-lg font-bold ${strongTextClass}`}>{product.name}</h4>
                          <p className={`mt-2 text-sm capitalize ${mutedClass}`}>{product.category}</p>
                          <p className="mt-3 text-xl font-black text-emerald-300">
                            {product.price ? `Rs ${product.price}` : 'Price on request'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={`mt-6 text-sm ${mutedClass}`}>
                    No in-stock products matched this diagnosis yet. Use the product catalog or contact the store for a manual recommendation.
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-emerald-600"
                >
                  <FiMessageCircle size={16} />
                  Ask on WhatsApp
                </a>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className={`inline-flex items-center gap-2 rounded-2xl px-5 py-4 text-sm font-black uppercase tracking-[0.18em] transition ${ghostButtonClass}`}
                >
                  <FiFileText size={16} />
                  Call store
                </a>
              </div>
            </section>
          ) : null}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </>
  );
}
