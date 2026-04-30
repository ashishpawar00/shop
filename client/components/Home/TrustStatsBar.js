import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

function CountUpNumber({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const motionValue = useMotionValue(0);
  const roundedValue = useTransform(motionValue, latest => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = roundedValue.on('change', latest => setDisplayValue(latest));
    return () => unsubscribe();
  }, [roundedValue]);

  useEffect(() => {
    if (!inView) {
      return undefined;
    }

    const controls = animate(motionValue, value, {
      duration: 1.25,
      ease: [0.22, 1, 0.36, 1]
    });

    return () => controls.stop();
  }, [inView, motionValue, value]);

  return (
    <span ref={ref} className="font-outfit text-3xl font-black text-accent-emerald md:text-4xl">
      {new Intl.NumberFormat('en-IN').format(displayValue)}
      {suffix}
    </span>
  );
}

export default function TrustStatsBar({ items = [] }) {
  const { isLight } = useTheme();

  return (
    <section className="bg-slate-base px-4 py-6 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-7xl rounded-[2rem] border px-5 py-4 shadow-2xl backdrop-blur-xl md:px-8 md:py-5 ${
          isLight
            ? 'border-line-soft/10 bg-white/90 shadow-slate-900/10'
            : 'border-line-soft/10 bg-slate-card/76 shadow-black/18'
        }`}
      >
        <div className="grid gap-4 md:grid-cols-3 md:gap-0">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col items-center justify-center rounded-[1.5rem] px-4 py-4 text-center ${
                index < items.length - 1 ? 'md:border-r md:border-line-soft/10' : ''
              }`}
            >
              <CountUpNumber value={item.value} suffix={item.suffix} />
              <p className="mt-2 font-outfit text-sm font-bold uppercase tracking-[0.18em] text-ink-muted md:text-base md:tracking-[0.16em]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
