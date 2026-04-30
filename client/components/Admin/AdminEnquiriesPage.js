import { startTransition, useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import {
  FiClock,
  FiFilter,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiRefreshCw,
  FiSend,
  FiUser,
} from 'react-icons/fi';
import AdminLayout from '@/components/Admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { API_URL } from '@/lib/api';

const STATUS_OPTIONS = ['all', 'pending', 'contacted', 'resolved', 'spam'];

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

function StatCard({ label, value, hint, icon, tone = 'emerald' }) {
  const tones = {
    emerald: 'from-emerald-500/20 to-emerald-400/5 text-emerald-300',
    cyan: 'from-cyan-500/20 to-cyan-400/5 text-cyan-300',
    amber: 'from-amber-500/20 to-amber-400/5 text-amber-300',
    rose: 'from-rose-500/20 to-rose-400/5 text-rose-300',
  };

  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-slate-900 p-5 shadow-xl shadow-black/20">
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tones[tone]}`}>
        {icon}
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
      {hint ? <p className="mt-2 text-sm text-slate-500">{hint}</p> : null}
    </div>
  );
}

function Pill({ children, tone = 'slate' }) {
  const tones = {
    slate: 'bg-slate-800 text-slate-300',
    amber: 'bg-amber-500/15 text-amber-300',
    blue: 'bg-sky-500/15 text-sky-300',
    emerald: 'bg-emerald-500/15 text-emerald-300',
    rose: 'bg-rose-500/15 text-rose-300',
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${tones[tone]}`}>{children}</span>;
}

function getStatusTone(status) {
  switch (status) {
    case 'pending':
      return 'amber';
    case 'contacted':
      return 'blue';
    case 'resolved':
      return 'emerald';
    case 'spam':
      return 'rose';
    default:
      return 'slate';
  }
}

export default function AdminEnquiriesPage() {
  const { token, logout } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState('');
  const [savingId, setSavingId] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    query: '',
  });
  const [noteDrafts, setNoteDrafts] = useState({});
  const deferredQuery = useDeferredValue(filters.query);

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  const fetchJson = useCallback(
    async (path, options = {}) => {
      const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
          ...headers,
          ...(options.headers || {}),
        },
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          logout();
        }
        throw new Error(data.message || `Request failed for ${path}`);
      }

      return data;
    },
    [headers, logout]
  );

  const loadEnquiries = useCallback(async () => {
    if (!token) {
      return;
    }

    setRefreshing(true);
    setError('');

    try {
      const params = new URLSearchParams({
        limit: '100',
      });

      if (filters.status !== 'all') {
        params.set('status', filters.status);
      }

      const [enquiryData, enquiryStats] = await Promise.all([
        fetchJson(`/enquiries?${params.toString()}`),
        fetchJson('/enquiries/stats'),
      ]);

      const nextEnquiries = enquiryData.enquiries || [];
      setEnquiries(nextEnquiries);
      setStats(enquiryStats || {});
      setNoteDrafts((current) => {
        const nextDrafts = { ...current };
        nextEnquiries.forEach((enquiry) => {
          if (typeof nextDrafts[enquiry._id] !== 'string') {
            nextDrafts[enquiry._id] = '';
          }
        });
        return nextDrafts;
      });
    } catch (loadError) {
      setError(loadError.message || 'Unable to load enquiries.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fetchJson, filters.status, token]);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  const filteredEnquiries = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return enquiries;
    }

    return enquiries.filter((enquiry) => {
      const haystack = [
        enquiry.name,
        enquiry.email,
        enquiry.phone,
        enquiry.message,
        enquiry.source,
        enquiry.village,
        enquiry.product?.name,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [deferredQuery, enquiries]);

  const handleFilterChange = (key, value) => {
    startTransition(() => {
      setFilters((current) => ({
        ...current,
        [key]: value,
      }));
    });
  };

  const updateEnquiryStatus = async (enquiryId, status) => {
    setSavingId(enquiryId);
    setError('');

    try {
      await fetchJson(`/enquiries/${enquiryId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      await loadEnquiries();
    } catch (actionError) {
      setError(actionError.message || 'Unable to update enquiry.');
    } finally {
      setSavingId('');
    }
  };

  const addNote = async (enquiryId) => {
    const text = noteDrafts[enquiryId]?.trim();
    if (!text) {
      return;
    }

    setSavingId(enquiryId);
    setError('');

    try {
      await fetchJson(`/enquiries/${enquiryId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      setNoteDrafts((current) => ({
        ...current,
        [enquiryId]: '',
      }));
      await loadEnquiries();
    } catch (actionError) {
      setError(actionError.message || 'Unable to add note.');
    } finally {
      setSavingId('');
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Admin Enquiries | Laxmi Krashi Kendra</title>
      </Head>

      <div className="space-y-8">
        <section className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_32%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.98))] p-8 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">Enquiries Desk</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Keep every product question and lead follow-up moving.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Review inbound messages, mark contact progress, and save internal follow-up notes so nothing slips through the cracks.
              </p>
            </div>

            <button
              type="button"
              onClick={loadEnquiries}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-[1.5rem] bg-emerald-500 px-5 py-4 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiRefreshCw className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Refreshing...' : 'Refresh enquiries'}
            </button>
          </div>
        </section>

        {error ? (
          <div className="rounded-[1.75rem] border border-rose-500/20 bg-rose-500/10 px-5 py-4 text-sm font-medium text-rose-200">
            {error}
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total enquiries"
            value={stats.total || 0}
            hint={`${stats.pending || 0} waiting`}
            icon={<FiMessageSquare size={22} />}
            tone="emerald"
          />
          <StatCard
            label="Pending"
            value={stats.pending || 0}
            hint="Needs first response"
            icon={<FiClock size={22} />}
            tone="amber"
          />
          <StatCard
            label="Contacted"
            value={stats.contacted || 0}
            hint="In active follow-up"
            icon={<FiPhone size={22} />}
            tone="cyan"
          />
          <StatCard
            label="Resolved"
            value={stats.resolved || 0}
            hint="Closed successfully"
            icon={<FiFilter size={22} />}
            tone="rose"
          />
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-slate-900 p-5 shadow-xl shadow-black/20">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.6fr]">
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-400">Search</span>
              <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                <FiMessageSquare className="text-slate-500" />
                <input
                  type="text"
                  value={filters.query}
                  onChange={(event) => handleFilterChange('query', event.target.value)}
                  placeholder="Name, phone, email, message, product..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-400">Status</span>
              <select
                value={filters.status}
                onChange={(event) => handleFilterChange('status', event.target.value)}
                className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All statuses' : option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-xl shadow-black/20">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">Inbox</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Customer enquiries</h2>
            </div>
            <Pill tone="slate">{filteredEnquiries.length} visible</Pill>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-8 text-sm text-slate-300">Loading enquiries...</div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 px-5 py-8 text-sm text-slate-400">
                No enquiries matched the current filters.
              </div>
            ) : (
              filteredEnquiries.map((enquiry) => {
                const isExpanded = expandedId === enquiry._id;
                const isSaving = savingId === enquiry._id;
                const sourceLabel = enquiry.source ? enquiry.source.charAt(0).toUpperCase() + enquiry.source.slice(1) : 'Unknown';

                return (
                  <article key={enquiry._id} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-white">{enquiry.name || 'New enquiry'}</h3>
                            <p className="mt-1 text-sm text-slate-400">
                              {dateFormatter.format(new Date(enquiry.createdAt))}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Pill tone={getStatusTone(enquiry.status)}>{enquiry.status}</Pill>
                            <Pill tone="slate">{sourceLabel}</Pill>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-2 xl:grid-cols-4">
                          <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                            <p className="mb-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">Phone</p>
                            <p className="flex items-center gap-2 font-medium text-white">
                              <FiPhone className="text-slate-500" />
                              {enquiry.phone || 'Not provided'}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                            <p className="mb-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">Email</p>
                            <p className="flex items-center gap-2 font-medium text-white">
                              <FiMail className="text-slate-500" />
                              {enquiry.email || 'Not provided'}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                            <p className="mb-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">Village</p>
                            <p className="flex items-center gap-2 font-medium text-white">
                              <FiMapPin className="text-slate-500" />
                              {enquiry.village || 'Not provided'}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                            <p className="mb-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">Product</p>
                            <p className="flex items-center gap-2 font-medium text-white">
                              <FiUser className="text-slate-500" />
                              {enquiry.product?.name || 'General enquiry'}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 rounded-[1.35rem] border border-white/10 bg-slate-950/40 p-4">
                          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Message</p>
                          <p className="mt-3 text-sm leading-relaxed text-slate-300">{enquiry.message || 'No message provided.'}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 xl:w-[14rem] xl:flex-col">
                        {enquiry.status === 'pending' ? (
                          <button
                            type="button"
                            onClick={() => updateEnquiryStatus(enquiry._id, 'contacted')}
                            disabled={isSaving}
                            className="rounded-2xl bg-sky-500/15 px-4 py-3 text-sm font-semibold text-sky-300 transition hover:bg-sky-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Mark contacted
                          </button>
                        ) : null}

                        {enquiry.status !== 'resolved' ? (
                          <button
                            type="button"
                            onClick={() => updateEnquiryStatus(enquiry._id, 'resolved')}
                            disabled={isSaving}
                            className="rounded-2xl bg-emerald-500/15 px-4 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Mark resolved
                          </button>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? '' : enquiry._id)}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                        >
                          {isExpanded ? 'Hide notes' : 'Open notes'}
                        </button>
                      </div>
                    </div>

                    {isExpanded ? (
                      <div className="mt-5 grid gap-4 rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-5 xl:grid-cols-[0.9fr_1.1fr]">
                        <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
                          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Existing notes</p>
                          <div className="mt-4 space-y-3">
                            {enquiry.notes?.length ? (
                              enquiry.notes.map((note, index) => (
                                <div key={`${enquiry._id}-note-${index}`} className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                                  <p className="text-sm leading-relaxed text-slate-200">{note.text}</p>
                                  <p className="mt-2 text-xs text-slate-500">{dateFormatter.format(new Date(note.createdAt))}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-slate-400">No notes added yet.</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <label className="block">
                            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-400">Add follow-up note</span>
                            <textarea
                              value={noteDrafts[enquiry._id] || ''}
                              onChange={(event) =>
                                setNoteDrafts((current) => ({
                                  ...current,
                                  [enquiry._id]: event.target.value,
                                }))
                              }
                              rows={6}
                              className="w-full rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                              placeholder="Example: Called customer at 4:30 PM, sent available product options on WhatsApp."
                            />
                          </label>

                          <div className="flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() => addNote(enquiry._id)}
                              disabled={isSaving}
                              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <FiSend size={15} />
                              {isSaving ? 'Saving...' : 'Save note'}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setNoteDrafts((current) => ({
                                  ...current,
                                  [enquiry._id]: '',
                                }))
                              }
                              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                            >
                              Clear draft
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
