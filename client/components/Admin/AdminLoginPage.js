import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiEye, FiEyeOff, FiLock, FiShield, FiUser } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, logout, loading: authLoading, isAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && isAdmin) {
      router.replace('/admin/dashboard');
    }
  }, [authLoading, isAdmin, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const result = await login(email.trim().toLowerCase(), password);

      if (result.user?.role !== 'admin') {
        logout();
        throw new Error('This account does not have admin access.');
      }

      await router.push('/admin/dashboard');
    } catch (submitError) {
      setError(submitError.message || 'Unable to sign in.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Laxmi Krashi Kendra</title>
      </Head>

      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_28%),linear-gradient(180deg,_#020617,_#0f172a)] px-4 py-10 text-slate-100 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              <FiArrowLeft size={16} />
              Back to site
            </Link>

            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
              Admin only
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">Secure Access</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Sign in to manage orders, products, and enquiries.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
                This admin console is connected to the live backend, so approved actions here affect real inventory and customer workflows.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Order control',
                    description: 'Track incoming orders, payments, and fulfillment status from one dashboard.',
                  },
                  {
                    title: 'Lead follow-up',
                    description: 'Review enquiries quickly and keep customer conversations moving.',
                  },
                  {
                    title: 'Inventory watch',
                    description: 'Keep tabs on featured products, stock levels, and catalog health.',
                  },
                  {
                    title: 'Protected session',
                    description: 'Admin access is verified against the API before protected pages load.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-5">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                      <FiShield size={20} />
                    </div>
                    <h2 className="text-lg font-bold text-white">{item.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-black/20 sm:p-10">
              <div className="mb-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-emerald-500/15 text-emerald-300">
                  <FiLock size={28} />
                </div>
                <h2 className="mt-5 text-3xl font-black text-white">Admin Login</h2>
                <p className="mt-2 text-sm text-slate-400">Use the admin account created on the server to continue.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">Email address</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                      <FiUser size={18} />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="admin@example.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/10"
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">Password</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                      <FiLock size={18} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-14 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/10"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition hover:text-white"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                {error ? (
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-200">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting || authLoading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiShield size={16} />
                  {submitting ? 'Signing in...' : 'Enter admin console'}
                </button>
              </form>

              <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-slate-400">
                If admin login does not work yet, make sure the backend is running and the admin account has been seeded in the server database.
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
