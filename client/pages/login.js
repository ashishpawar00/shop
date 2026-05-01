import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  FiArrowRight,
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
      <div className="flex min-h-screen items-center justify-center bg-slate-base px-4">
        <div className="rounded-3xl border border-line-soft/10 bg-slate-card px-6 py-5 text-sm font-semibold text-ink-primary">
          Checking your session...
        </div>
      </div>
    );
  }

  const inputClasses =
    'w-full rounded-2xl border border-line-soft/10 bg-slate-base py-4 pl-12 pr-4 text-ink-primary outline-none transition placeholder:text-ink-muted focus:border-accent-emerald/50 focus:bg-slate-hover';
  const inputWithToggleClasses =
    'w-full rounded-2xl border border-line-soft/10 bg-slate-base py-4 pl-12 pr-14 text-ink-primary outline-none transition placeholder:text-ink-muted focus:border-accent-emerald/50 focus:bg-slate-hover';

  return (
    <>
      <Head>
        <title>Login | Laxmi Krashi Kendra</title>
      </Head>

      <div className="flex min-h-screen items-center justify-center bg-slate-base px-4 py-16 sm:px-6">
        <div className="w-full max-w-md">
          <section className="rounded-[2.5rem] border border-line-soft/10 bg-slate-card p-8 shadow-2xl shadow-black/10 sm:p-10">
            <div className="mb-8 flex rounded-2xl border border-line-soft/10 bg-slate-base p-1">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className={`flex-1 rounded-[1rem] px-4 py-3 text-sm font-black uppercase tracking-[0.18em] transition ${
                  mode === 'login' ? 'bg-accent-emerald text-white' : 'text-ink-muted hover:text-ink-primary'
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
                  mode === 'signup' ? 'bg-accent-emerald text-white' : 'text-ink-muted hover:text-ink-primary'
                }`}
              >
                Sign Up
              </button>
            </div>

            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-accent-emerald/15 text-accent-emerald">
                    <FiShield size={28} />
                  </div>
                  <h2 className="mt-5 text-3xl font-black text-ink-primary">Welcome back</h2>
                  <p className="mt-2 text-sm text-ink-muted">Use your email and password to continue.</p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink-secondary">Email address</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-muted">
                      <FiMail size={18} />
                    </span>
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                      placeholder="you@example.com"
                      autoComplete="username"
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink-secondary">Password</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-muted">
                      <FiLock size={18} />
                    </span>
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginForm.password}
                      onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className={inputWithToggleClasses}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((visible) => !visible)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-ink-muted transition hover:text-ink-primary"
                      aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                    >
                      {showLoginPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                {error ? (
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-600">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent-emerald px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
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
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-accent-emerald/15 text-accent-emerald">
                    <FiUser size={28} />
                  </div>
                  <h2 className="mt-5 text-3xl font-black text-ink-primary">Create your account</h2>
                  <p className="mt-2 text-sm text-ink-muted">Sign up and start ordering right away.</p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink-secondary">Full name</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-muted">
                      <FiUser size={18} />
                    </span>
                    <input
                      type="text"
                      value={signupForm.name}
                      onChange={(event) => setSignupForm((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Your name"
                      autoComplete="name"
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink-secondary">Email address</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-muted">
                      <FiMail size={18} />
                    </span>
                    <input
                      type="email"
                      value={signupForm.email}
                      onChange={(event) => setSignupForm((current) => ({ ...current, email: event.target.value }))}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink-secondary">Mobile number</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-muted">
                      <FiPhone size={18} />
                    </span>
                    <input
                      type="tel"
                      value={signupForm.phone}
                      onChange={(event) => setSignupForm((current) => ({ ...current, phone: event.target.value }))}
                      placeholder="10-digit number"
                      autoComplete="tel"
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink-secondary">Password</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-muted">
                      <FiLock size={18} />
                    </span>
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      value={signupForm.password}
                      onChange={(event) => setSignupForm((current) => ({ ...current, password: event.target.value }))}
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      className={inputWithToggleClasses}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword((visible) => !visible)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-ink-muted transition hover:text-ink-primary"
                      aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                    >
                      {showSignupPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink-secondary">Confirm password</label>
                  <input
                    type="password"
                    value={signupForm.confirmPassword}
                    onChange={(event) => setSignupForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className="w-full rounded-2xl border border-line-soft/10 bg-slate-base px-4 py-4 text-ink-primary outline-none transition placeholder:text-ink-muted focus:border-accent-emerald/50 focus:bg-slate-hover"
                    required
                  />
                </div>

                {error ? (
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-600">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent-emerald px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? <SpinnerLabel text="Creating account..." /> : (
                    <>
                      Sign Up
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
