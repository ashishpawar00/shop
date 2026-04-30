// client/components/Layout/Navbar.js
import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { FiChevronRight, FiGlobe, FiLogOut, FiMenu, FiMoon, FiShoppingCart, FiSun, FiX } from 'react-icons/fi';

function LanguageToggle({ language, changeLanguage, mobile = false }) {
  return (
    <div className={`flex items-center rounded-full bg-slate-card ${mobile ? 'w-full justify-center p-1' : 'p-1'}`}>
      <FiGlobe className="ml-2 mr-1 text-slate-500" />
      {['hi', 'en'].map(code => (
        <button
          key={code}
          type="button"
          onClick={() => changeLanguage(code)}
          className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase transition ${
            language === code ? 'bg-accent-emerald text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          {code === 'hi' ? 'हि' : 'EN'}
        </button>
      ))}
    </div>
  );
}

const Navbar = () => {
  const { language, changeLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: language === 'hi' ? 'होम' : 'Home', href: '/' },
    { label: language === 'hi' ? 'उत्पाद' : 'Products', href: '/products' },
    { label: language === 'hi' ? 'फसल डॉक्टर' : 'Crop Doctor', href: '/crop-doctor', highlight: true },
    { label: language === 'hi' ? 'हमारे बारे में' : 'About', href: '/about' },
  ];

  const normalizedNavItems = useMemo(
    () => [
      { label: t('nav_home'), href: '/' },
      { label: t('nav_products'), href: '/products' },
      { label: t('nav_crop_doctor'), href: '/crop-doctor', highlight: true },
      { label: t('nav_about'), href: '/about' }
    ],
    [t]
  );

  const isActive = href => router.pathname === href;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-base/80 backdrop-blur-xl h-20 shadow-2xl shadow-black/20' : 'bg-transparent h-24'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-accent-emerald rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">L</div>
          <div>
            <span className="text-xl font-outfit font-bold tracking-tight text-white block leading-none">Laxmi Krashi</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-emerald opacity-80">Kendra</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
           {normalizedNavItems.map(item => (
             <Link
               key={item.href}
               href={item.href}
               className={`text-sm font-bold tracking-wide transition-all duration-300 ${item.highlight ? 'px-5 py-2.5 bg-accent-emerald text-white rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95' : isActive(item.href) ? 'text-accent-emerald' : 'text-slate-400 hover:text-white'}`}
             >
               {item.label}
             </Link>
           ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageToggle language={language} changeLanguage={changeLanguage} />
          </div>

          <Link href="/cart" className="relative p-2.5 text-slate-400 hover:text-white transition-colors bg-slate-card rounded-xl">
            <FiShoppingCart size={20} />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-base bg-accent-emerald text-[10px] font-black text-white">{cartCount}</span>}
          </Link>

          {user ? (
             <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-slate-card shadow-inner">
                <div className="w-8 h-8 rounded-lg bg-slate-base flex items-center justify-center text-accent-emerald font-bold">{user.name?.[0]}</div>
                <button onClick={logout} className="text-slate-500 hover:text-red-400 p-1 transition-colors"><FiLogOut size={18} /></button>
             </div>
          ) : (
            <Link href="/login" className="hidden sm:flex px-6 py-2.5 rounded-xl border border-slate-hover text-slate-300 font-bold text-sm hover:bg-slate-card hover:text-white transition-all">
               {t('login')}
            </Link>
          )}

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2.5 text-slate-400 hover:text-white transition-colors bg-slate-card rounded-xl">
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[100%] bg-slate-base border-t border-slate-hover shadow-2xl p-6 animate-in slide-in-from-top-4">
           <div className="flex flex-col gap-4">
              {normalizedNavItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-4 rounded-2xl font-bold ${item.highlight ? 'bg-accent-emerald text-white' : 'bg-slate-card text-slate-300'}`}
                >
                  {item.label}
                  <FiChevronRight className="opacity-40" />
                </Link>
              ))}
              <LanguageToggle language={language} changeLanguage={changeLanguage} mobile />
              {!user && (
                 <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-4 rounded-2xl border border-slate-hover text-slate-400 font-bold uppercase tracking-widest text-xs">
                    {t('login')} / {t('create_account')}
                 </Link>
              )}
           </div>
        </div>
      )}
    </nav>
  );
};

function SafeLanguageToggle({ language, changeLanguage, mobile = false }) {
  return (
    <div
      className={`flex items-center rounded-full border border-line-soft/10 bg-slate-card/88 font-outfit ${
        mobile ? 'w-full justify-between p-1.5' : 'p-1.5'
      }`}
    >
      <FiGlobe className="ml-2 mr-2 text-ink-muted" />
      {['hi', 'en'].map(code => (
        <button
          key={code}
          type="button"
          onClick={() => changeLanguage(code)}
          className={`rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] transition ${
            language === code ? 'bg-accent-emerald text-white' : 'text-ink-muted hover:text-ink-primary'
          }`}
        >
          {code === 'hi' ? 'HI' : 'EN'}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle({ isLight, toggleTheme, mobile = false }) {
  const Icon = isLight ? FiMoon : FiSun;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex items-center justify-center rounded-full border border-line-soft/10 bg-slate-card/88 text-ink-muted transition-all hover:border-accent-emerald/40 hover:text-accent-emerald ${
        mobile ? 'h-12 w-12' : 'h-11 w-11'
      }`}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <Icon size={mobile ? 20 : 18} />
    </button>
  );
}

const CleanNavbar = () => {
  const { language, changeLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { isLight, toggleTheme } = useTheme();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeDrawer = () => setIsOpen(false);
    window.addEventListener('resize', closeDrawer);
    return () => window.removeEventListener('resize', closeDrawer);
  }, [isOpen]);

  const navItems = useMemo(
    () => [
      { label: t('nav_home'), href: '/' },
      { label: t('nav_products'), href: '/products' },
      { label: t('nav_crop_doctor'), href: '/crop-doctor', highlight: true },
      { label: t('nav_about'), href: '/about' }
    ],
    [t]
  );

  const isActive = href => router.pathname === href;

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'h-20 bg-slate-base/82 shadow-2xl shadow-black/12 backdrop-blur-2xl'
          : 'h-24 bg-gradient-to-b from-slate-base/45 via-slate-base/18 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-emerald text-xl font-bold text-white shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-110">
            L
          </div>
          <div>
            <span className="block font-outfit text-xl font-bold leading-none tracking-tight text-ink-primary">Laxmi Krashi</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-emerald opacity-80">Kendra</span>
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-bold tracking-wide transition-all duration-300 ${
                item.highlight
                  ? 'rounded-full bg-accent-emerald px-5 py-2.5 text-white shadow-lg shadow-emerald-500/20 hover:scale-105'
                  : isActive(item.href)
                    ? 'text-accent-emerald'
                    : 'text-ink-muted hover:text-ink-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <SafeLanguageToggle language={language} changeLanguage={changeLanguage} />
          <ThemeToggle isLight={isLight} toggleTheme={toggleTheme} />

          <Link
            href="/cart"
            className="relative rounded-full border border-line-soft/10 bg-slate-card/88 p-2.5 text-ink-muted transition-colors hover:text-accent-emerald"
          >
            <FiShoppingCart size={20} />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-base bg-accent-emerald text-[10px] font-black text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>

          {user ? (
            <div className="flex items-center gap-3 rounded-full border border-line-soft/10 bg-slate-card/88 px-3 py-1.5 shadow-inner">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-base font-bold text-accent-emerald">
                {user.name?.[0] || 'U'}
              </div>
              <button type="button" onClick={logout} className="p-1 text-ink-muted transition-colors hover:text-red-400">
                <FiLogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-line-soft/16 px-6 py-2.5 text-sm font-bold text-ink-secondary transition-all hover:border-accent-emerald/45 hover:bg-slate-card hover:text-ink-primary"
            >
              {t('login')}
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(open => !open)}
          className="rounded-full border border-line-soft/10 bg-slate-card/88 p-2.5 text-ink-muted transition-colors hover:text-accent-emerald md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[55] bg-slate-base/58 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              aria-label="Close mobile navigation"
            />

            <motion.aside
              className="fixed inset-y-0 right-0 z-[60] flex w-[min(88vw,360px)] flex-col border-l border-line-soft/10 bg-slate-base/96 px-5 pb-6 pt-5 shadow-2xl shadow-black/18 backdrop-blur-2xl md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-accent-emerald">Menu</p>
                  <p className="mt-2 font-outfit text-xl font-bold text-ink-primary">Farm navigation</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-line-soft/10 bg-slate-card/88 p-2.5 text-ink-muted"
                  aria-label="Close mobile navigation"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-[1.5rem] px-4 py-4 font-outfit text-base font-bold ${
                      item.highlight
                        ? 'bg-accent-emerald text-white shadow-lg shadow-emerald-500/20'
                        : 'border border-line-soft/10 bg-slate-card/88 text-ink-primary'
                    }`}
                  >
                    {item.label}
                    <FiChevronRight className={item.highlight ? 'opacity-80' : 'text-ink-muted'} />
                  </Link>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <SafeLanguageToggle language={language} changeLanguage={changeLanguage} mobile />
                <div className="flex items-center justify-end gap-3 rounded-full border border-line-soft/10 bg-slate-card/88 px-3">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-ink-muted">Theme</span>
                  <ThemeToggle isLight={isLight} toggleTheme={toggleTheme} mobile />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-[1.35rem] border border-line-soft/10 bg-slate-card/88 px-4 py-3 font-outfit font-bold text-ink-primary"
                >
                  <FiShoppingCart className="mr-2 text-accent-emerald" />
                  Cart
                  {cartCount > 0 ? (
                    <span className="ml-2 rounded-full bg-accent-emerald px-2 py-0.5 text-[10px] font-black text-white">
                      {cartCount}
                    </span>
                  ) : null}
                </Link>

                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center rounded-[1.35rem] border border-line-soft/10 bg-slate-card/88 px-4 py-3 font-outfit font-bold text-ink-primary"
                  >
                    <FiLogOut className="mr-2 text-accent-emerald" />
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center rounded-[1.35rem] border border-line-soft/10 bg-slate-card/88 px-4 py-3 font-outfit font-bold text-ink-primary"
                  >
                    {t('login')}
                  </Link>
                )}
              </div>

              <div className="mt-auto rounded-[1.75rem] border border-line-soft/10 bg-slate-card/88 p-4">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-accent-emerald">Support</p>
                <p className="mt-3 font-outfit text-lg font-bold text-ink-primary">Crop help and products in one place</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Switch language, manage theme, and jump straight into diagnosis or inputs from one drawer.
                </p>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

export default CleanNavbar;
