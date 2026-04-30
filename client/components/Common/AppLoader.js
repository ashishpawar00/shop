import { AnimatePresence, motion } from 'framer-motion';

export default function AppLoader({ visible }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-auto fixed inset-0 z-[100] flex items-center justify-center bg-slate-base/72 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute h-28 w-28 rounded-full bg-accent-emerald/18 blur-2xl"
              animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.62, 0.35] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="relative flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-accent-emerald/25 bg-slate-card/92 text-3xl font-black text-white shadow-2xl shadow-emerald-500/20"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-accent-emerald">L</span>
            </motion.div>

            <div className="mt-5 text-center">
              <p className="font-outfit text-2xl font-bold tracking-tight text-ink-primary">Laxmi Krashi</p>
              <p className="mt-1 text-[11px] font-black uppercase tracking-[0.34em] text-accent-emerald/90">Kendra</p>
            </div>

            <div className="mt-5 flex items-center gap-2">
              {[0, 1, 2].map(index => (
                <motion.span
                  key={index}
                  className="h-2.5 w-2.5 rounded-full bg-accent-emerald"
                  animate={{ opacity: [0.25, 1, 0.25], scale: [0.9, 1.12, 0.9] }}
                  transition={{ duration: 1, repeat: Infinity, delay: index * 0.18, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
