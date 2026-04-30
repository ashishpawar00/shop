import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FiArrowLeft,
  FiBox,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiMessageSquare,
  FiShoppingBag,
  FiShield,
  FiX,
  FiFileText,
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: FiGrid },
  { href: '/admin/orders', label: 'Orders', icon: FiShoppingBag },
  { href: '/admin/products', label: 'Products', icon: FiBox },
  { href: '/admin/enquiries', label: 'Enquiries', icon: FiMessageSquare },
  { href: '/admin/posts', label: 'Posts', icon: FiFileText },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user, loading, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace('/admin/login');
    }
  }, [loading, isAdmin, router]);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  const activePath = useMemo(() => router.pathname, [router.pathname]);

  const handleLogout = async () => {
    logout();
    await router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900 px-6 py-4 text-sm font-semibold text-slate-200">
          <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-400" />
          Checking admin session...
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 lg:hidden"
              aria-label="Toggle admin navigation"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
              <FiShield size={20} />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Admin Console</p>
              <p className="text-sm font-semibold text-white">Laxmi Krashi Kendra</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-right">
              <p className="text-sm font-semibold text-white">{user?.name || 'Admin'}</p>
              <p className="text-xs text-slate-400">{user?.email || 'Signed in'}</p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              <FiArrowLeft size={16} />
              View site
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <aside
          className={`fixed inset-y-24 left-4 z-30 w-[18rem] overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-900/95 p-4 shadow-2xl shadow-black/30 transition duration-300 lg:sticky lg:top-24 lg:block lg:h-[calc(100vh-7rem)] ${
            menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-[120%] opacity-0 lg:translate-x-0 lg:opacity-100'
          }`}
        >
          <div className="mb-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Signed in as</p>
            <p className="mt-2 text-base font-semibold text-white">{user?.name || 'Admin user'}</p>
            <p className="mt-1 text-sm text-slate-400">{user?.email}</p>
          </div>

          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activePath === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={17} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 grid gap-2 sm:hidden">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              <FiArrowLeft size={16} />
              View site
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        </aside>

        {menuOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-slate-950/60 lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="Close admin navigation"
          />
        ) : null}

        <main className="w-full pb-10 lg:pl-8">{children}</main>
      </div>
    </div>
  );
}
