import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FiArrowRight,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
  FiShield,
  FiUser,
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

function SpinnerLabel({ text }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      {text}
    </span>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, login, signup } = useAuth();
  const [mode, setMode] = useState('login');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const redirectTarget = useMemo(() => {
    const redirect = router.query.redirect;
    return typeof redirect === 'string' && redirect.startsWith('/') ? redirect : '/my-orders';
  }, [router.query.redirect]);

  useEffect(() => {
    if (router.query.mode === 'signup') {
      setMode('signup');
    }
  }, [router.query.mode]);

  useEffect(() => {
    if (!loading && user) {
      router.replace(user.role === 'admin' ? '/admin/dashboard' : redirectTarget);
    }
  }, [loading, redirectTarget, router, user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const result = await login(loginForm.email.trim().toLowerCase(), loginForm.password);
      await router.push(result.user?.role === 'admin' ? '/admin/dashboard' : redirectTarget);
    } catch (submitError) {
      setError(submitError.message || 'Unable to sign in.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (!/^[6-9]\d{9}$/.test(signupForm.phone.trim())) {
        throw new Error('Enter a valid 10-digit mobile number.');
      }

      if (signupForm.password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }

      if (signupForm.password !== signupForm.confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      await signup(
        signupForm.name.trim(),
        signupForm.email.trim().toLowerCase(),
        signupForm.phone.trim(),
        signupForm.password
      );

      await router.push(redirectTarget);
    } catch (submitError) {
      setError(submitError.message || 'Unable to create account.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm font-semibold text-slate-200">
          Checking your session...
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Login | Laxmi Krashi Kendra</title>
      </Head>

      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_28%),linear-gradient(180deg,_#020617,_#0f172a)] px-4 pb-16 pt-32 text-slate-100 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <section className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">Customer Access</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Sign in to place orders, track deliveries, and save your details.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              The login route now uses the same backend auth flow as checkout, orders, and the admin console.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                'Checkout remembers your authenticated session.',
                'New accounts are created directly in the backend database.',
                'Order history loads only for signed-in customers.',
                'Admin users can still use the dedicated admin login page.',
              ].map((item) => (
                <div key={item} className="rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                    <FiCheckCircle size={20} />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-5 text-sm leading-relaxed text-slate-400">
              Need admin access instead?{' '}
              <Link href="/admin/login" className="font-semibold text-emerald-300 transition hover:text-emerald-200">
                Go to the admin login
              </Link>
              .
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-white/10 bg-slate-950/75 p-8 shadow-2xl shadow-black/20 sm:p-10">
            <div className="mb-8 flex rounded-2xl border border-white/10 bg-white/5 p-1">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className={`flex-1 rounded-[1rem] px-4 py-3 text-sm font-black uppercase tracking-[0.18em] transition ${
                  mode === 'login' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className={`flex-1 rounded-[1rem] px-4 py-3 text-sm font-black uppercase tracking-[0.18em] transition ${
                  mode === 'signup' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Create account
              </button>
            </div>

            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-emerald-500/15 text-emerald-300">
                    <FiShield size={28} />
                  </div>
                  <h2 className="mt-5 text-3xl font-black text-white">Welcome back</h2>
                  <p className="mt-2 text-sm text-slate-400">Use your email and password to continue.</p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">Email address</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                      <FiMail size={18} />
                    </span>
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                      placeholder="you@example.com"
                      autoComplete="username"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/10"
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
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginForm.password}
                      onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-14 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((visible) => !visible)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition hover:text-white"
                      aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                    >
                      {showLoginPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
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
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? <SpinnerLabel text="Signing in..." /> : (
                    <>
                      Continue
                      <FiArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-emerald-500/15 text-emerald-300">
                    <FiUser size={28} />
                  </div>
                  <h2 className="mt-5 text-3xl font-black text-white">Create your account</h2>
                  <p className="mt-2 text-sm text-slate-400">New customers can sign up and start ordering right away.</p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">Full name</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                      <FiUser size={18} />
                    </span>
                    <input
                      type="text"
                      value={signupForm.name}
                      onChange={(event) => setSignupForm((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Your name"
                      autoComplete="name"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/10"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-300">Email address</label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                        <FiMail size={18} />
                      </span>
                      <input
                        type="email"
                        value={signupForm.email}
                        onChange={(event) => setSignupForm((current) => ({ ...current, email: event.target.value }))}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-300">Mobile number</label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                        <FiPhone size={18} />
                      </span>
                      <input
                        type="tel"
                        value={signupForm.phone}
                        onChange={(event) => setSignupForm((current) => ({ ...current, phone: event.target.value }))}
                        placeholder="10-digit number"
                        autoComplete="tel"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">Password</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                      <FiLock size={18} />
                    </span>
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      value={signupForm.password}
                      onChange={(event) => setSignupForm((current) => ({ ...current, password: event.target.value }))}
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-14 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword((visible) => !visible)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition hover:text-white"
                      aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                    >
                      {showSignupPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">Confirm password</label>
                  <input
                    type="password"
                    value={signupForm.confirmPassword}
                    onChange={(event) => setSignupForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/10"
                    required
                  />
                </div>

                {error ? (
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-200">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? <SpinnerLabel text="Creating account..." /> : (
                    <>
                      Create account
                      <FiArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
