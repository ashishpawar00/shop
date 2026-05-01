import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiChevronRight, FiGlobe, FiLogOut, FiMenu, FiMoon, FiSearch, FiShield, FiShoppingCart, FiSun, FiX } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

function LanguageToggle({ language, changeLanguage, mobile = false }) {
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

export default function NavbarModern() {
  const { language, changeLanguage } = useLanguage();
  const { user, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const { isLight, toggleTheme } = useTheme();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const labels = useMemo(
    () =>
      language === 'hi'
        ? {
            home: 'होम',
            products: 'उत्पाद',
            services: 'सेवाएं',
            cropDoctor: 'क्रॉप डॉक्टर',
            advisory: 'सलाह',
            about: 'हमारे बारे में',
            gallery: 'गैलरी',
            contact: 'संपर्क',
            login: 'लॉगिन',
            myOrders: 'मेरे ऑर्डर',
            cart: 'कार्ट',
            logout: 'लॉगआउट',
            adminPanel: 'एडमिन पैनल',
            menuTitle: 'फार्म नेविगेशन',
            supportTitle: 'सहायता',
            supportHeading: 'फसल जांच, सलाह और उत्पाद अब एक ही जगह',
            supportBody: 'भाषा बदलें, थीम चुनें, और सीधे जांच, सलाह या खरीद के अगले कदम पर जाएं।'
          }
        : {
            home: 'Home',
            products: 'Products',
            services: 'Services',
            cropDoctor: 'Crop Doctor',
            advisory: 'Advisory',
            about: 'About',
            gallery: 'Gallery',
            contact: 'Contact',
            login: 'Login',
            myOrders: 'My Orders',
            cart: 'Cart',
            logout: 'Logout',
            adminPanel: 'Admin Panel',
            menuTitle: 'Farm navigation',
            supportTitle: 'Support',
            supportHeading: 'Crop checks, guidance, and products in one place',
            supportBody: 'Switch language, manage theme, and jump straight into diagnosis, advisory, or buying from one drawer.'
          },
    [language]
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const { body } = document;
    const previousOverflow = body.style.overflow;

    if (isOpen) {
      body.style.overflow = 'hidden';
    }

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const navItems = useMemo(
    () => [
      { label: labels.home, href: '/' },
      { label: labels.products, href: '/products' },
      { label: labels.myOrders, href: '/my-orders' },
      { label: labels.services, href: '/services' },
      { label: labels.cropDoctor, href: '/crop-doctor', highlight: true },
      { label: labels.advisory, href: '/advisory' },
      { label: labels.about, href: '/about' }
    ],
    [labels]
  );

  const mobileOnlyItems = useMemo(
    () => [
      { label: labels.myOrders, href: user ? '/my-orders' : '/login?redirect=/my-orders' },
      { label: labels.gallery, href: '/gallery' },
      { label: labels.contact, href: '/contact' }
    ],
    [labels, user]
  );

  const isActive = href => router.pathname === href;

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'h-16 bg-slate-base/82 shadow-2xl shadow-black/12 backdrop-blur-2xl md:h-20'
          : 'h-20 bg-gradient-to-b from-slate-base/45 via-slate-base/18 to-transparent md:h-24'
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-emerald text-xl font-bold text-white shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-110">
            L
          </div>
          <div className="min-w-0">
            <span className="block truncate font-outfit text-lg font-bold leading-none tracking-tight text-ink-primary sm:text-xl">Laxmi Krashi</span>
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-accent-emerald opacity-80 sm:text-[10px]">Kendra</span>
          </div>
        </Link>

        <div className="hidden items-center gap-5 xl:flex">
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
          {/* Search toggle */}
          {showSearch ? (
            <form
              onSubmit={e => { e.preventDefault(); if (searchQuery.trim()) { router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`); setShowSearch(false); setSearchQuery(''); } }}
              className="flex items-center gap-1 rounded-full border border-accent-emerald/30 bg-slate-card/88 px-3 py-1.5"
            >
              <FiSearch size={14} className="text-ink-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={language === 'hi' ? '\u0916\u094b\u091c\u0947\u0902...' : 'Search...'}
                className="w-32 bg-transparent text-sm font-semibold text-ink-primary outline-none placeholder:text-ink-muted"
                autoFocus
              />
              <button type="button" onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="text-ink-muted hover:text-ink-primary">
                <FiX size={14} />
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setShowSearch(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-soft/10 bg-slate-card/88 text-ink-muted transition-all hover:border-accent-emerald/40 hover:text-accent-emerald"
              title="Search products"
            >
              <FiSearch size={18} />
            </button>
          )}

          <LanguageToggle language={language} changeLanguage={changeLanguage} />
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

          <Link
            href={user ? '/my-orders' : '/login?redirect=/my-orders'}
            className="inline-flex items-center gap-2 rounded-full border border-line-soft/10 bg-slate-card/88 px-4 py-2 text-sm font-bold text-ink-secondary transition-all hover:border-accent-emerald/40 hover:text-accent-emerald"
          >
            {labels.myOrders}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              {isAdmin ? (
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center gap-2 rounded-full border border-accent-emerald/25 bg-accent-emerald/10 px-4 py-2 text-sm font-bold text-accent-emerald transition-all hover:border-accent-emerald/45 hover:bg-accent-emerald/15"
                >
                  <FiShield size={16} />
                  {labels.adminPanel}
                </Link>
              ) : null}
              <div className="flex items-center gap-3 rounded-full border border-line-soft/10 bg-slate-card/88 px-3 py-1.5 shadow-inner">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-base font-bold text-accent-emerald">
                {user.name?.[0] || 'U'}
              </div>
              <button type="button" onClick={logout} className="p-1 text-ink-muted transition-colors hover:text-red-400">
                <FiLogOut size={18} />
              </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-line-soft/16 px-6 py-2.5 text-sm font-bold text-ink-secondary transition-all hover:border-accent-emerald/45 hover:bg-slate-card hover:text-ink-primary"
            >
              {labels.login}
            </Link>
          )}
        </div>

        {/* Mobile search + theme + hamburger */}
        <div className="flex items-center gap-1.5 md:hidden">
          <button
            type="button"
            onClick={() => router.push('/products')}
            className="rounded-full border border-line-soft/10 bg-slate-card/88 p-2.5 text-ink-muted transition-colors hover:text-accent-emerald"
            aria-label="Search products"
          >
            <FiSearch size={20} />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-line-soft/10 bg-slate-card/88 p-2.5 text-ink-muted transition-colors hover:text-accent-emerald"
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {isLight ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(open => !open)}
            className="rounded-full border border-line-soft/10 bg-slate-card/88 p-2.5 text-ink-muted transition-colors hover:text-accent-emerald"
            aria-label="Toggle navigation"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              aria-label="Close mobile navigation"
            />

            <motion.aside
              className="fixed inset-y-0 right-0 z-[60] flex w-[min(88vw,320px)] flex-col bg-slate-base shadow-2xl shadow-black/25 md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-line-soft/10 px-4 py-3">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-emerald text-sm font-bold text-white">L</div>
                  <span className="font-outfit text-base font-bold text-ink-primary">Laxmi Krashi</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-ink-muted hover:bg-slate-card"
                  aria-label="Close"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto py-2">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-5 py-3 text-[15px] font-semibold transition-colors ${
                      isActive(item.href)
                        ? 'border-r-[3px] border-accent-emerald bg-accent-emerald/8 text-accent-emerald'
                        : item.highlight
                          ? 'text-accent-emerald'
                          : 'text-ink-primary hover:bg-slate-card/60'
                    }`}
                  >
                    {item.label}
                    <FiChevronRight size={16} className="text-ink-muted" />
                  </Link>
                ))}
                {mobileOnlyItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-5 py-3 text-[15px] font-semibold transition-colors ${
                      isActive(item.href)
                        ? 'border-r-[3px] border-accent-emerald bg-accent-emerald/8 text-accent-emerald'
                        : 'text-ink-primary hover:bg-slate-card/60'
                    }`}
                  >
                    {item.label}
                    <FiChevronRight size={16} className="text-ink-muted" />
                  </Link>
                ))}

                {user && isAdmin ? (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="mx-4 mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent-emerald/10 px-4 py-2.5 text-sm font-bold text-accent-emerald"
                  >
                    <FiShield size={16} />
                    {labels.adminPanel}
                  </Link>
                ) : null}
              </div>

              {/* Bottom Actions */}
              <div className="border-t border-line-soft/10 px-4 py-3 space-y-3">
                {/* Cart & Login row */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="relative flex items-center justify-center gap-2 rounded-xl bg-accent-emerald py-2.5 text-sm font-bold text-white"
                  >
                    <FiShoppingCart size={16} />
                    {labels.cart}
                    {cartCount > 0 ? (
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
                        {cartCount}
                      </span>
                    ) : null}
                  </Link>

                  {user ? (
                    <button
                      type="button"
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="flex items-center justify-center gap-2 rounded-xl border border-line-soft/10 bg-slate-card py-2.5 text-sm font-bold text-ink-primary"
                    >
                      <FiLogOut size={16} />
                      {labels.logout}
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-xl border border-line-soft/10 bg-slate-card py-2.5 text-sm font-bold text-ink-primary"
                    >
                      {labels.login}
                    </Link>
                  )}
                </div>

                {/* Language & Theme row */}
                <div className="flex items-center justify-between gap-2">
                  <LanguageToggle language={language} changeLanguage={changeLanguage} />
                  <ThemeToggle isLight={isLight} toggleTheme={toggleTheme} />
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
