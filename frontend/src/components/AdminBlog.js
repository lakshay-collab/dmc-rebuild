import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Search, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const DESTINATIONS = ["India", "Greece", "Japan", "Morocco", "Indonesia", "UAE", "Maldives", "South Africa", "Peru", "New Zealand", "Portugal", "Thailand"];
const CATEGORIES = ["Cuisine", "Hotels", "Experiences", "Culture", "Adventure"];

const inputClass = "border-[#0D1B2A]/10 h-10 text-sm";

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", image_url: "", destination: "", category: "", author: "Hi DMC Editorial", published: true });

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/blog`);
      setPosts(res.data.posts);
    } catch { console.error("Failed to fetch posts"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const filtered = posts.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.destination.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const resetForm = () => {
    setForm({ title: "", slug: "", excerpt: "", content: "", image_url: "", destination: "", category: "", author: "Hi DMC Editorial", published: true });
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.content || !form.destination || !form.category || !form.image_url) {
      toast.error("Please fill all required fields"); return;
    }
    try {
      if (editing) {
        await axios.put(`${API}/blog/${editing}`, form);
        toast.success("Post updated");
      } else {
        await axios.post(`${API}/blog`, form);
        toast.success("Post created");
      }
      resetForm();
      fetchPosts();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await axios.delete(`${API}/blog/${id}`);
      toast.success("Post deleted");
      fetchPosts();
    } catch { toast.error("Failed to delete"); }
  };

  const handleEdit = (post) => {
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, image_url: post.image_url, destination: post.destination, category: post.category, author: post.author || "Hi DMC Editorial", published: post.published });
    setEditing(post.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="bg-[#0D1B2A] px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-bold">Blog Manager</h1>
            <p className="text-white/40 text-sm">Create and manage blog articles</p>
          </div>
          <div className="flex gap-3">
            <a href="/admin/signups" className="text-white/40 text-sm hover:text-white/60 transition-colors">Signups</a>
            <a href="/" className="text-white/50 text-sm hover:text-white transition-colors">Back to Website</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Create/Edit Form */}
        <div className="bg-white rounded-xl border border-[#0D1B2A]/06 p-6 mb-8">
          <h2 className="text-base font-bold text-[#0D1B2A] mb-4">{editing ? "Edit Post" : "Create New Post"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Title *</label>
                <Input data-testid="blog-input-title" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Article title" className={inputClass} />
              </div>
              <div>
                <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Slug (auto-generated if empty)</label>
                <Input data-testid="blog-input-slug" value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="article-url-slug" className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Destination *</label>
                <Select value={form.destination} onValueChange={(v) => update("destination", v)}>
                  <SelectTrigger data-testid="blog-select-dest" className="border-[#0D1B2A]/10 h-10 text-sm"><SelectValue placeholder="Select destination" /></SelectTrigger>
                  <SelectContent className="bg-white">{DESTINATIONS.map((d) => (<SelectItem key={d} value={d}>{d}</SelectItem>))}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Category *</label>
                <Select value={form.category} onValueChange={(v) => update("category", v)}>
                  <SelectTrigger data-testid="blog-select-cat" className="border-[#0D1B2A]/10 h-10 text-sm"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent className="bg-white">{CATEGORIES.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Author</label>
                <Input data-testid="blog-input-author" value={form.author} onChange={(e) => update("author", e.target.value)} placeholder="Author name" className={inputClass} />
              </div>
            </div>
            <div>
              <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Image URL *</label>
              <Input data-testid="blog-input-image" value={form.image_url} onChange={(e) => update("image_url", e.target.value)} placeholder="https://images.unsplash.com/..." className={inputClass} />
            </div>
            <div>
              <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Excerpt *</label>
              <textarea data-testid="blog-input-excerpt" value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} placeholder="Short description (shown on cards)" rows={2}
                className="w-full border border-[#0D1B2A]/10 rounded-lg px-3 py-2 text-sm text-[#0D1B2A] placeholder:text-[#0D1B2A]/30 focus:outline-none focus:border-[#174358]/40 resize-none" />
            </div>
            <div>
              <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Content *</label>
              <textarea data-testid="blog-input-content" value={form.content} onChange={(e) => update("content", e.target.value)} placeholder="Full article content (use line breaks for paragraphs)" rows={8}
                className="w-full border border-[#0D1B2A]/10 rounded-lg px-3 py-2 text-sm text-[#0D1B2A] placeholder:text-[#0D1B2A]/30 focus:outline-none focus:border-[#174358]/40 resize-y" />
            </div>
            <div className="flex items-center gap-4">
              <Button type="submit" data-testid="blog-submit-btn" className="bg-[#174358] text-white hover:bg-[#1e5a75] h-10 text-sm">
                <Plus size={14} className="mr-2" /> {editing ? "Update Post" : "Create Post"}
              </Button>
              {editing && (
                <Button type="button" variant="outline" onClick={resetForm} className="h-10 text-sm border-[#0D1B2A]/10">Cancel</Button>
              )}
            </div>
          </form>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-xl border border-[#0D1B2A]/06 p-5 mb-4">
          <div className="flex items-center gap-3">
            <Search size={16} className="text-[#0D1B2A]/30" />
            <Input data-testid="blog-admin-search" placeholder="Search posts by title, destination, category..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-[#0D1B2A]/10 h-10 text-sm flex-1" />
            <span className="text-xs text-[#0D1B2A]/40 whitespace-nowrap">{filtered.length} posts</span>
          </div>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="bg-white rounded-xl p-12 text-center text-[#0D1B2A]/30 text-sm border border-[#0D1B2A]/06">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center text-[#0D1B2A]/30 text-sm border border-[#0D1B2A]/06">No posts found.</div>
          ) : filtered.map((post) => (
            <div key={post.id} data-testid={`blog-admin-row-${post.slug}`} className="bg-white rounded-xl border border-[#0D1B2A]/06 p-4 flex items-center gap-4 hover:border-[#174358]/10 transition-colors">
              <img src={post.image_url} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[#0D1B2A] truncate">{post.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-[#174358]/08 text-[#174358]/70 px-2 py-0.5 rounded-full font-semibold">{post.destination}</span>
                  <span className="text-[10px] bg-[#0D1B2A]/05 text-[#0D1B2A]/50 px-2 py-0.5 rounded-full font-semibold">{post.category}</span>
                  {!post.published && <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-semibold">Draft</span>}
                  <span className="text-[10px] text-[#0D1B2A]/25">{post.created_at ? new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : ""}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(post)} className="h-8 w-8 p-0" title="Edit">
                  <Pencil size={14} className="text-[#174358]" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)} className="h-8 w-8 p-0" title="Delete">
                  <Trash2 size={14} className="text-red-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
