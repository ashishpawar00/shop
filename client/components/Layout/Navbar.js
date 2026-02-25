// client/components/Layout/Navbar.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import {
  FiMenu, FiX, FiChevronDown, FiPhone, FiMessageCircle,
  FiHome, FiInfo, FiPackage, FiSettings,
  FiImage, FiMail, FiUser, FiLogIn, FiLogOut,
  FiEye, FiEyeOff, FiCheck, FiAlertCircle, FiShoppingCart,
  FiCamera, FiShield
} from 'react-icons/fi';
import { GiFarmer } from 'react-icons/gi';

const Navbar = () => {
  const { language, changeLanguage, t } = useLanguage();
  const { user, login, signup, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [authForm, setAuthForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState('');

  const phoneNumber = '9977938192';
  const whatsappNumber = '919977938192';

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(null);
    setShowUserMenu(false);
  }, [router.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.user-menu-container')) setShowUserMenu(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const navItems = [
    { label: language === 'hi' ? 'होम' : 'Home', href: '/', icon: <FiHome className="w-4 h-4" /> },
    { label: language === 'hi' ? 'हमारे बारे में' : 'About', href: '/about', icon: <FiInfo className="w-4 h-4" /> },
    {
      label: language === 'hi' ? 'उत्पाद' : 'Products', href: '/products', icon: <FiPackage className="w-4 h-4" />,
      dropdown: [
        { label: language === 'hi' ? 'बीज' : 'Seeds', href: '/products?category=seeds', icon: '🌱' },
        { label: language === 'hi' ? 'उर्वरक' : 'Fertilizers', href: '/products?category=fertilizers', icon: '🧪' },
        { label: language === 'hi' ? 'कीटनाशक' : 'Pesticides', href: '/products?category=pesticides', icon: '🐛' },
        { label: language === 'hi' ? 'उपकरण' : 'Hardware', href: '/products?category=hardware', icon: '🛠️' },
      ]
    },
    { label: language === 'hi' ? 'सेवाएं' : 'Services', href: '/services', icon: <FiSettings className="w-4 h-4" /> },
    { label: language === 'hi' ? 'फसल डॉक्टर' : 'Crop Doctor', href: '/crop-doctor', icon: <FiCamera className="w-4 h-4" />, highlight: true },
    { label: language === 'hi' ? 'कृषि सलाह' : 'Advisory', href: '/advisory', icon: <GiFarmer className="w-4 h-4" /> },
    { label: language === 'hi' ? 'गैलरी' : 'Gallery', href: '/gallery', icon: <FiImage className="w-4 h-4" /> },
    { label: language === 'hi' ? 'संपर्क' : 'Contact', href: '/contact', icon: <FiMail className="w-4 h-4" /> },
  ];

  const isActive = (href) => {
    if (href === '/') return router.pathname === href;
    return router.pathname.startsWith(href);
  };

  // Auth handlers
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    setAuthLoading(true);

    try {
      if (isLoginMode) {
        if (!authForm.email || !authForm.password) {
          throw new Error(language === 'hi' ? 'ईमेल और पासवर्ड भरें' : 'Enter email and password');
        }
        await login(authForm.email, authForm.password);
        setAuthSuccess(language === 'hi' ? '✅ सफलतापूर्वक लॉगिन!' : '✅ Login successful!');
        setTimeout(() => { setShowAuthModal(false); resetAuthForm(); }, 1000);
      } else {
        if (!authForm.name || !authForm.email || !authForm.password) {
          throw new Error(language === 'hi' ? 'सभी फ़ील्ड भरें' : 'Fill all fields');
        }
        if (authForm.password.length < 6) {
          throw new Error(language === 'hi' ? 'पासवर्ड 6+ अक्षर का हो' : 'Password must be 6+ characters');
        }
        if (authForm.password !== authForm.confirmPassword) {
          throw new Error(language === 'hi' ? 'पासवर्ड मेल नहीं खाते' : 'Passwords don\'t match');
        }
        await signup(authForm.name, authForm.email, authForm.phone, authForm.password);
        setAuthSuccess(language === 'hi' ? '✅ अकाउंट बनाया गया!' : '✅ Account created!');
        setTimeout(() => { setShowAuthModal(false); resetAuthForm(); }, 1000);
      }
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const resetAuthForm = () => {
    setAuthForm({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    setAuthError('');
    setAuthSuccess('');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push('/');
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-800 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-1.5">
            <div className="hidden md:flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></span>
                {language === 'hi' ? '25+ वर्षों का विश्वास' : '25+ Years of Trust'}
              </span>
              <span>{language === 'hi' ? 'सिराथा, मध्य प्रदेश' : 'Siratha, Madhya Pradesh'}</span>
            </div>
            <div className="flex items-center gap-4 mx-auto md:mx-0">
              <a href={`tel:${phoneNumber}`} className="flex items-center gap-1.5 hover:text-green-200 transition">
                <FiPhone size={13} /> {phoneNumber}
              </a>
              <span className="h-3 w-px bg-green-500"></span>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-green-200 transition">
                <FiMessageCircle size={13} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-xl py-0' : 'shadow-md py-0.5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">LK</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-gray-800 text-base leading-tight">
                  {language === 'hi' ? 'लक्ष्मी कृषि केंद्र' : 'Laxmi Krishi Kendra'}
                </h1>
                <p className="text-xs text-gray-500 leading-tight">
                  {language === 'hi' ? 'विश्वसनीय कृषि साथी' : 'Trusted Agri Partner'}
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-0.5">
              {navItems.map((item) => (
                <div key={item.href} className="relative"
                  onMouseEnter={() => item.dropdown && setDropdownOpen(item.href)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  {item.highlight ? (
                    <Link href={item.href}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${isActive(item.href)
                        ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'}`}
                    >
                      <span className="relative">{item.icon}<span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping"></span></span>
                      {item.label}
                    </Link>
                  ) : (
                    <Link href={item.href}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.href)
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-700 hover:text-green-600 hover:bg-green-50/60'}`}
                    >
                      <span className="opacity-60">{item.icon}</span>
                      {item.label}
                      {item.dropdown && <FiChevronDown size={12} className={`transition-transform ${dropdownOpen === item.href ? 'rotate-180' : ''}`} />}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.dropdown && dropdownOpen === item.href && (
                    <div className="absolute left-0 top-full mt-1 w-52 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 animate-fadeIn">
                      {item.dropdown.map((sub) => (
                        <Link key={sub.href} href={sub.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all"
                        >
                          <span className="text-lg">{sub.icon}</span>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
                <FiShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
                )}
              </Link>

              {/* Language Toggle — hidden on mobile, shown md+ */}
              <div className="hidden md:flex border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => changeLanguage('hi')}
                  className={`px-2 py-1.5 text-xs font-medium transition-all ${language === 'hi' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >हिं</button>
                <button onClick={() => changeLanguage('en')}
                  className={`px-2 py-1.5 text-xs font-medium transition-all ${language === 'en' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >EN</button>
              </div>

              {/* User / Auth — hidden on mobile, user can login via hamburger menu */}
              {user ? (
                <div className="relative user-menu-container hidden md:block">
                  <button onClick={(e) => { e.stopPropagation(); setShowUserMenu(!showUserMenu); }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-green-50 transition text-sm"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="hidden lg:block text-gray-700 font-medium max-w-[80px] truncate">{user.name?.split(' ')[0]}</span>
                    <FiChevronDown size={12} className="hidden lg:block text-gray-400" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 animate-fadeIn">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        {isAdmin && (
                          <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-semibold">
                            <FiShield size={10} /> Admin
                          </span>
                        )}
                      </div>
                      {isAdmin && (
                        <Link href="/admin/dashboard" onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                        >
                          <FiShield size={14} /> {language === 'hi' ? 'एडमिन पैनल' : 'Admin Panel'}
                        </Link>
                      )}
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <FiLogOut size={14} /> {language === 'hi' ? 'लॉगआउट' : 'Logout'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => { setIsLoginMode(true); setShowAuthModal(true); resetAuthForm(); }}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-700 border border-green-300 rounded-lg hover:bg-green-50 transition"
                >
                  <FiLogIn size={14} /> {language === 'hi' ? 'लॉगिन' : 'Login'}
                </button>
              )}

              {/* Mobile Menu Button */}
              <button onClick={() => setIsOpen(true)} className="xl:hidden p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
                <FiMenu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto">
            {/* Mobile Header */}
            <div className="p-5 border-b bg-gradient-to-r from-green-50 to-emerald-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow">
                  <span className="text-white font-bold text-sm">LK</span>
                </div>
                <div>
                  <h2 className="font-bold text-gray-800 text-sm">
                    {language === 'hi' ? 'लक्ष्मी कृषि केंद्र' : 'Laxmi Krishi Kendra'}
                  </h2>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <FiX size={20} />
              </button>
            </div>

            {/* Mobile Language Toggle */}
            <div className="px-5 py-3 border-b bg-gray-50 flex items-center justify-between">
              <span className="text-sm text-gray-600 font-medium">{language === 'hi' ? 'भाषा चुनें' : 'Language'}</span>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => changeLanguage('hi')}
                  className={`px-4 py-2 text-sm font-semibold transition-all ${language === 'hi' ? 'bg-green-600 text-white' : 'text-gray-600 bg-white hover:bg-gray-50'}`}
                >हिंदी</button>
                <button onClick={() => changeLanguage('en')}
                  className={`px-4 py-2 text-sm font-semibold transition-all ${language === 'en' ? 'bg-green-600 text-white' : 'text-gray-600 bg-white hover:bg-gray-50'}`}
                >English</button>
              </div>
            </div>

            {/* Mobile User Info */}
            {user && (
              <div className="p-4 border-b bg-green-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Nav Items */}
            <div className="p-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.highlight ? (
                    <Link href={item.href} onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow my-1"
                    >
                      <span className="relative">{item.icon}
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
                      </span>
                      {item.label}
                      <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full">NEW</span>
                    </Link>
                  ) : item.dropdown ? (
                    <details className="group">
                      <summary className="flex items-center justify-between px-4 py-3 text-gray-700 font-medium rounded-xl hover:bg-green-50 cursor-pointer transition">
                        <div className="flex items-center gap-3">
                          <span className="text-green-600">{item.icon}</span>
                          {item.label}
                        </div>
                        <FiChevronDown className="group-open:rotate-180 transition-transform text-gray-400" size={14} />
                      </summary>
                      <div className="pl-6 space-y-1 pb-2">
                        {item.dropdown.map((sub) => (
                          <Link key={sub.href} href={sub.href} onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-green-600 rounded-lg hover:bg-green-50 transition"
                          >
                            <span className="text-lg">{sub.icon}</span> {sub.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link href={item.href} onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive(item.href) ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:bg-green-50'}`}
                    >
                      <span className="text-green-600">{item.icon}</span>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Admin Link Mobile */}
              {isAdmin && (
                <Link href="/admin/dashboard" onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 text-amber-700 font-semibold border border-amber-200 mt-2"
                >
                  <FiShield size={16} /> {language === 'hi' ? 'एडमिन पैनल' : 'Admin Panel'}
                </Link>
              )}
            </div>

            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="p-4 border-t">
                <button onClick={() => { setIsLoginMode(true); setShowAuthModal(true); resetAuthForm(); setIsOpen(false); }}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl font-semibold shadow-md flex items-center justify-center gap-2"
                >
                  <FiLogIn /> {language === 'hi' ? 'लॉगिन / साइन अप' : 'Login / Sign Up'}
                </button>
              </div>
            )}

            {/* Mobile Logout */}
            {user && (
              <div className="p-4 border-t">
                <button onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-semibold flex items-center justify-center gap-2 border border-red-200"
                >
                  <FiLogOut /> {language === 'hi' ? 'लॉगआउट' : 'Logout'}
                </button>
              </div>
            )}

            {/* Mobile Call Bar */}
            <div className="p-4 border-t mt-auto">
              <a href={`tel:${phoneNumber}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white rounded-xl font-semibold"
              >
                <FiPhone /> {language === 'hi' ? `कॉल करें: ${phoneNumber}` : `Call: ${phoneNumber}`}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => { setShowAuthModal(false); resetAuthForm(); }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6">
              <button onClick={() => { setShowAuthModal(false); resetAuthForm(); }}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <FiX size={20} />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🌾</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{language === 'hi' ? 'लक्ष्मी कृषि केंद्र' : 'Laxmi Krishi Kendra'}</h3>
                </div>
              </div>
              {/* Toggle */}
              <div className="flex bg-white/10 rounded-lg p-1">
                <button onClick={() => { setIsLoginMode(true); setAuthError(''); setAuthSuccess(''); }}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition ${isLoginMode ? 'bg-white text-green-700' : 'text-white/80 hover:text-white'}`}
                >
                  {language === 'hi' ? 'लॉगिन' : 'Login'}
                </button>
                <button onClick={() => { setIsLoginMode(false); setAuthError(''); setAuthSuccess(''); }}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition ${!isLoginMode ? 'bg-white text-green-700' : 'text-white/80 hover:text-white'}`}
                >
                  {language === 'hi' ? 'साइन अप' : 'Sign Up'}
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleAuthSubmit} className="p-6 space-y-4">
              {authError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                  <FiAlertCircle /> {authError}
                </div>
              )}
              {authSuccess && (
                <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
                  <FiCheck /> {authSuccess}
                </div>
              )}

              {!isLoginMode && (
                <div>
                  <label className="text-sm font-medium text-gray-700">{language === 'hi' ? 'नाम' : 'Full Name'}</label>
                  <input type="text" value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder={language === 'hi' ? 'आपका नाम' : 'Your name'}
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700">{language === 'hi' ? 'ईमेल' : 'Email'}</label>
                <input type="email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  placeholder={language === 'hi' ? 'example@email.com' : 'example@email.com'}
                />
              </div>

              {!isLoginMode && (
                <div>
                  <label className="text-sm font-medium text-gray-700">{language === 'hi' ? 'फोन' : 'Phone'}</label>
                  <input type="tel" value={authForm.phone} onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                    className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder="9876543210"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700">{language === 'hi' ? 'पासवर्ड' : 'Password'}</label>
                <div className="relative mt-1">
                  <input type={showPassword ? 'text' : 'password'} value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition pr-10"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>

              {!isLoginMode && (
                <div>
                  <label className="text-sm font-medium text-gray-700">{language === 'hi' ? 'पासवर्ड दोबारा' : 'Confirm Password'}</label>
                  <input type="password" value={authForm.confirmPassword}
                    onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                    className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder="••••••••"
                  />
                </div>
              )}

              <button type="submit" disabled={authLoading}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl font-semibold shadow-md hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    {isLoginMode ? <FiLogIn /> : <FiUser />}
                    {isLoginMode
                      ? (language === 'hi' ? 'लॉगिन करें' : 'Login')
                      : (language === 'hi' ? 'अकाउंट बनाएं' : 'Create Account')}
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;