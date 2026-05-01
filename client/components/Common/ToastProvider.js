import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const ToastContext = createContext(null);

const ICONS = {
  success: FiCheck,
  error: FiAlertCircle,
  info: FiInfo
};

const COLORS = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500'
};

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useMemo(() => ({
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
  }), [addToast]);

  // Make toast callable directly as toast.success(), toast.error(), etc.
  const contextValue = { toast: addToast, ...toast };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed bottom-20 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-6 md:left-auto md:right-6 md:translate-x-0 md:items-end">
        <AnimatePresence>
          {toasts.map(t => {
            const Icon = ICONS[t.type] || FiInfo;
            const color = COLORS[t.type] || COLORS.info;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2.5 rounded-xl border border-line-soft/10 bg-slate-card px-4 py-3 shadow-2xl shadow-black/20"
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${color}`}>
                  <Icon size={14} />
                </span>
                <span className="text-sm font-semibold text-ink-primary">{t.message}</span>
                <button
                  type="button"
                  onClick={() => removeToast(t.id)}
                  className="ml-2 text-ink-muted hover:text-ink-primary"
                >
                  <FiX size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Return a no-op to avoid crashes when used outside provider
    return { toast: () => {}, success: () => {}, error: () => {}, info: () => {} };
  }
  return ctx;
}
