/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import {
  FiCalendar,
  FiEdit2,
  FiEye,
  FiFileText,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiSearch,
  FiTrash2,
  FiX,
} from 'react-icons/fi';
import AdminLayout from '@/components/Admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { API_URL } from '@/lib/api';

const CATEGORY_OPTIONS = [
  { value: 'crop-advisory', label: 'Crop Advisory' },
  { value: 'fertilizer-tips', label: 'Fertilizer Tips' },
  { value: 'pest-control', label: 'Pest Control' },
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'general', label: 'General' },
];

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

const emptyForm = {
  title: '',
  titleHindi: '',
  content: '',
  contentHindi: '',
  category: 'general',
  status: 'draft',
  image: '',
  tags: '',
  cropType: '',
};

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

function statusTone(status) {
  switch (status) {
    case 'published':
      return 'bg-emerald-500/15 text-emerald-300';
    case 'draft':
      return 'bg-amber-500/15 text-amber-300';
    case 'archived':
      return 'bg-slate-700 text-slate-300';
    default:
      return 'bg-slate-700 text-slate-300';
  }
}

export default function AdminPostsPage() {
  const { token, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPostId, setEditingPostId] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

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

  const loadPosts = useCallback(async () => {
    if (!token) {
      return;
    }

    setRefreshing(true);
    setError('');

    try {
      const params = new URLSearchParams({ limit: '150' });
      if (statusFilter !== 'all') {
        params.set('status', statusFilter);
      }

      const [postsData, statsData] = await Promise.all([
        fetchJson(`/posts/admin/list?${params.toString()}`),
        fetchJson('/posts/admin/stats'),
      ]);

      setPosts(postsData.posts || []);
      setStats(statsData || {});
    } catch (loadError) {
      setError(loadError.message || 'Unable to load posts.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fetchJson, statusFilter, token]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return posts;
    }

    return posts.filter((post) =>
      [post.title, post.titleHindi, post.content, post.contentHindi, post.category, ...(post.tags || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [posts, search]);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingPostId('');
    setImageFile(null);
    setImagePreview('');
    setShowForm(false);
  };

  const startCreate = () => {
    setError('');
    setEditingPostId('');
    setFormData(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setShowForm(true);
  };

  const startEdit = (post) => {
    setError('');
    setEditingPostId(post._id);
    setFormData({
      title: post.title || '',
      titleHindi: post.titleHindi || '',
      content: post.content || '',
      contentHindi: post.contentHindi || '',
      category: post.category || 'general',
      status: post.status || 'draft',
      image: post.image || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      cropType: Array.isArray(post.cropType) ? post.cropType.join(', ') : '',
    });
    setImageFile(null);
    setImagePreview(post.image || '');
    setShowForm(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const nextFile = event.target.files?.[0] || null;
    setImageFile(nextFile);

    if (nextFile) {
      setImagePreview(URL.createObjectURL(nextFile));
    } else {
      setImagePreview(formData.image || '');
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = new FormData();
      payload.set('title', formData.title.trim());
      payload.set('titleHindi', formData.titleHindi.trim() || formData.title.trim());
      payload.set('content', formData.content.trim());
      payload.set('contentHindi', formData.contentHindi.trim() || formData.content.trim());
      payload.set('category', formData.category);
      payload.set('status', formData.status);
      payload.set('image', formData.image || '');
      payload.set('tags', formData.tags);
      payload.set('cropType', formData.cropType);

      if (imageFile) {
        payload.set('image', imageFile);
      }

      if (editingPostId) {
        await fetchJson(`/posts/${editingPostId}`, {
          method: 'PUT',
          body: payload,
        });
      } else {
        await fetchJson('/posts', {
          method: 'POST',
          body: payload,
        });
      }

      resetForm();
      await loadPosts();
    } catch (submitError) {
      setError(submitError.message || 'Unable to save post.');
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (postId) => {
    const confirmed = typeof window !== 'undefined' ? window.confirm('Delete this post permanently?') : false;
    if (!confirmed) {
      return;
    }

    setError('');

    try {
      await fetchJson(`/posts/${postId}`, {
        method: 'DELETE',
      });
      await loadPosts();
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete post.');
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Admin Posts | Laxmi Krashi Kendra</title>
      </Head>

      <div className="space-y-8">
        <section className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_32%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.98))] p-8 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">Publishing Desk</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Manage advisory posts that power the public farming guidance feed.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Create bilingual posts, keep drafts in progress, and publish only the updates that are ready for farmers to see.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={loadPosts}
                disabled={refreshing}
                className="inline-flex items-center justify-center gap-2 rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm font-bold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiRefreshCw className={refreshing ? 'animate-spin' : ''} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              <button
                type="button"
                onClick={startCreate}
                className="inline-flex items-center justify-center gap-2 rounded-[1.5rem] bg-emerald-500 px-5 py-4 text-sm font-bold text-white transition hover:bg-emerald-600"
              >
                <FiPlus size={16} />
                New post
              </button>
            </div>
          </div>
        </section>

        {error ? (
          <div className="rounded-[1.75rem] border border-rose-500/20 bg-rose-500/10 px-5 py-4 text-sm font-medium text-rose-200">
            {error}
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total posts" value={stats.total || 0} hint={`${stats.totalViews || 0} total views`} icon={<FiFileText size={22} />} />
          <StatCard label="Published" value={stats.published || 0} hint="Visible on advisory page" icon={<FiEye size={22} />} tone="cyan" />
          <StatCard label="Drafts" value={stats.draft || 0} hint="Still in progress" icon={<FiEdit2 size={22} />} tone="amber" />
          <StatCard label="Archived" value={stats.archived || 0} hint="Hidden from the live site" icon={<FiTrash2 size={22} />} tone="rose" />
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-slate-900 p-5 shadow-xl shadow-black/20">
          <div className="grid gap-4 lg:grid-cols-[1fr_0.4fr]">
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-400">Search</span>
              <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                <FiSearch className="text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by title, Hindi title, content, or tags..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-400">Status filter</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none"
              >
                <option value="all">All statuses</option>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        {showForm ? (
          <section className="rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-xl shadow-black/20">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
                  {editingPostId ? 'Edit post' : 'Create post'}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  {editingPostId ? 'Update advisory content' : 'Add a new advisory update'}
                </h2>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">English title</span>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                    placeholder="Example: Disease pressure after heavy rain"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">Hindi title</span>
                  <input
                    type="text"
                    name="titleHindi"
                    value={formData.titleHindi}
                    onChange={handleChange}
                    className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                    placeholder="Optional, falls back to English if left empty"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">English content</span>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={8}
                    required
                    className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                    placeholder="Write the advisory in English..."
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">Hindi content</span>
                  <textarea
                    name="contentHindi"
                    value={formData.contentHindi}
                    onChange={handleChange}
                    rows={8}
                    className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                    placeholder="Optional Hindi version"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">Category</span>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">Status</span>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">Upload image</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="w-full rounded-[1.25rem] border border-dashed border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-emerald-600"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Upload a post cover image. If you leave this empty while editing, the current image stays in place.
                  </p>
                </label>
              </div>

              {imagePreview ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-slate-200">Cover preview</p>
                  <div className="mt-3 overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950/60">
                    <img src={imagePreview} alt="Post preview" className="h-56 w-full object-cover" />
                  </div>
                </div>
              ) : null}

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">Tags</span>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                    placeholder="fungus, humidity, wheat"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">Crop types</span>
                  <input
                    type="text"
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleChange}
                    className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                    placeholder="wheat, rice, soybean"
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-[1.25rem] bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiSave size={15} />
                  {saving ? 'Saving...' : editingPostId ? 'Update post' : 'Create post'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-[1.25rem] border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        ) : null}

        <section className="rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-xl shadow-black/20">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">Content queue</p>
              <h2 className="mt-2 text-2xl font-bold text-white">All posts</h2>
            </div>
            <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-300">
              {filteredPosts.length} visible
            </span>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-8 text-sm text-slate-300">Loading posts...</div>
            ) : filteredPosts.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 px-5 py-8 text-sm text-slate-400">
                No posts matched the current filters.
              </div>
            ) : (
              filteredPosts.map((post) => (
                <article key={post._id} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    {post.image ? (
                      <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/60 xl:w-56">
                        <img src={post.image} alt={post.title} className="h-40 w-full object-cover" />
                      </div>
                    ) : null}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white">{post.title}</h3>
                          {post.titleHindi ? <p className="mt-1 text-sm text-slate-400">{post.titleHindi}</p> : null}
                        </div>

                        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${statusTone(post.status)}`}>
                          {post.status}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                        <span className="inline-flex items-center gap-2">
                          <FiCalendar size={14} />
                          {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <FiEye size={14} />
                          {post.views || 0} views
                        </span>
                        <span className="rounded-full bg-slate-950/60 px-3 py-1 text-xs font-semibold text-slate-300">
                          {CATEGORY_OPTIONS.find((option) => option.value === post.category)?.label || post.category}
                        </span>
                      </div>

                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-300">{post.content}</p>

                      {post.tags?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span key={`${post._id}-${tag}`} className="rounded-full bg-slate-950/60 px-3 py-1 text-xs font-medium text-slate-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap gap-2 xl:w-[13rem] xl:flex-col">
                      {post.status === 'published' ? (
                        <a
                          href={`/advisory/${post._id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-emerald-500/15 px-4 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/25"
                        >
                          <FiEye size={15} />
                          View live
                        </a>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => startEdit(post)}
                        className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-sky-500/15 px-4 py-3 text-sm font-semibold text-sky-300 transition hover:bg-sky-500/25"
                      >
                        <FiEdit2 size={15} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePost(post._id)}
                        className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-rose-500/15 px-4 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/25"
                      >
                        <FiTrash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
