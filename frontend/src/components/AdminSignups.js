import { useState, useEffect, useCallback, useRef } from "react";
import { Download, Search, Calendar, Users, Building2, Globe, X, Copy, Check, LogOut, Lock, Eye, EyeOff, ChevronLeft, Phone, Mail, MapPin, CheckCircle2, Circle, MessageSquare, Clock, UserCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/* ── Helpers ── */
function isServiceLead(src) {
  const s = (src || "").toLowerCase();
  return s.startsWith("service") || s === "homepage hero" || s === "signup page" || !s || s === "";
}

function fmtDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function fmtTime(d) {
  if (!d) return "";
  return new Date(d).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

/* ── Copy button ── */
function CopyBtn({ value }) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;
  const copy = (e) => { e.stopPropagation(); navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <button onClick={copy} className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-[#174358]/08">
      {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} className="text-[#0D1B2A]/25" />}
    </button>
  );
}

/* ── CSV Export ── */
function exportCSV(signups, tab) {
  const headers = ["Date", "Agency Name", "Contact Person", "Email", "Phone", "City", "State", "Destination", "Source Page"];
  const rows = signups.map((s) => [
    s.created_at ? new Date(s.created_at).toLocaleString() : "",
    s.agency_name || "", `${s.first_name || ""} ${s.last_name || ""}`.trim(), s.email || "",
    `${s.phone_code || ""} ${s.phone || ""}`.trim(), s.city || "", s.state || "", s.destination || "", s.source_page || "",
  ]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${(c || "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = `hidmc-${tab}-leads.csv`; a.click();
  URL.revokeObjectURL(url);
}

/* ── Login ── */
function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const res = await axios.post(`${API}/admin/login`, { email, password });
      onLogin(res.data.token);
    } catch (err) { setError(err.response?.data?.detail || "Login failed"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#174358] flex items-center justify-center mx-auto mb-4"><Lock size={20} className="text-white/80" /></div>
          <h1 className="font-['Cormorant_Garamond'] text-3xl text-white font-light">HI DMC</h1>
          <p className="text-white/30 text-xs mt-1 uppercase tracking-[0.2em]">Lead Management</p>
        </div>
        <form onSubmit={submit} className="bg-white/05 backdrop-blur-sm rounded-2xl p-6 border border-white/08 space-y-4">
          {error && <p className="text-red-400 text-xs bg-red-400/10 px-3 py-2 rounded-lg">{error}</p>}
          <div>
            <label className="text-white/40 text-[10px] uppercase tracking-wider font-semibold mb-1.5 block">Email</label>
            <Input data-testid="admin-login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@hidmc.com"
              className="bg-[#0D1B2A] border-white/15 text-white placeholder:text-white/25 h-11 rounded-xl" style={{ backgroundColor: "#0D1B2A", color: "white" }} />
          </div>
          <div>
            <label className="text-white/40 text-[10px] uppercase tracking-wider font-semibold mb-1.5 block">Password</label>
            <div className="relative">
              <Input data-testid="admin-login-password" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                className="bg-[#0D1B2A] border-white/15 text-white placeholder:text-white/25 h-11 rounded-xl pr-10" style={{ backgroundColor: "#0D1B2A", color: "white" }} />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <Button data-testid="admin-login-submit" type="submit" disabled={loading}
            className="w-full bg-[#174358] text-white hover:bg-[#1e5a75] rounded-xl py-5 text-xs font-bold uppercase tracking-[0.15em]">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

/* ── Onboarding Detail Screen ── */
function OnboardingScreen({ lead, token, onBack }) {
  const [checklist, setChecklist] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!lead) return;
    axios.get(`${API}/admin/onboarding/${lead.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setChecklist(res.data.checklist))
      .catch(() => {});
  }, [lead, token]);

  const toggleComplete = (idx) => {
    setChecklist(prev => prev.map((c, i) => i === idx ? {
      ...c,
      completed: !c.completed,
      completed_at: !c.completed ? new Date().toISOString() : null,
    } : c));
  };

  const toggleApprove = (idx) => {
    setChecklist(prev => prev.map((c, i) => i === idx ? {
      ...c,
      approved: !c.approved,
      approved_at: !c.approved ? new Date().toISOString() : null,
    } : c));
  };

  const updateComment = (idx, val) => {
    setChecklist(prev => prev.map((c, i) => i === idx ? { ...c, comments: val } : c));
  };

  const save = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/admin/onboarding/${lead.id}`, { checklist }, { headers: { Authorization: `Bearer ${token}` } });
      setSaved(true); setTimeout(() => setSaved(false), 2000);
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  const completedCount = checklist ? checklist.filter(c => c.completed).length : 0;
  const approvedCount = checklist ? checklist.filter(c => c.approved).length : 0;
  const totalSteps = checklist ? checklist.length : 8;
  const progress = checklist ? Math.round((completedCount / totalSteps) * 100) : 0;

  const name = `${lead.first_name || ""} ${lead.last_name || ""}`.trim();
  const phone = `${lead.phone_code || ""} ${lead.phone || ""}`.trim();

  return (
    <div data-testid="onboarding-screen" className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="bg-[#0D1B2A] px-6 md:px-12 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button data-testid="onboarding-back" onClick={onBack} className="flex items-center gap-1.5 text-white/40 text-xs hover:text-white/70 transition-colors">
              <ChevronLeft size={16} /> Back
            </button>
            <div>
              <h1 className="text-white text-base font-bold">{lead.agency_name || "Unknown Agency"}</h1>
              <p className="text-white/30 text-[10px] uppercase tracking-wider">Onboarding Checklist</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/30">{completedCount}/{totalSteps} complete</span>
            <Button data-testid="onboarding-save" onClick={save} disabled={saving || !checklist} size="sm"
              className={`rounded-lg text-[10px] px-4 h-8 font-bold ${saved ? "bg-emerald-500 text-white" : "bg-[#174358] text-white hover:bg-[#1e5a75]"}`}>
              {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-6">
        {/* Agency Info Card */}
        <div className="bg-white rounded-xl border border-[#0D1B2A]/06 p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div>
              <p className="text-[10px] text-[#0D1B2A]/30 uppercase tracking-wider font-semibold mb-1">Agency</p>
              <p className="text-sm font-bold text-[#0D1B2A]">{lead.agency_name || "\u2014"}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#0D1B2A]/30 uppercase tracking-wider font-semibold mb-1">Contact Person</p>
              <p className="text-sm text-[#0D1B2A]">{name || "\u2014"}</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Mail size={11} className="text-[#0D1B2A]/25" />
                <p className="text-xs text-[#174358]">{lead.email || "\u2014"}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={11} className="text-[#0D1B2A]/25" />
                <p className="text-xs text-[#0D1B2A]/60">{phone || "\u2014"}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <MapPin size={11} className="text-[#0D1B2A]/25" />
                <p className="text-xs text-[#0D1B2A]/60">{[lead.city, lead.state].filter(Boolean).join(", ") || "\u2014"}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={11} className="text-[#0D1B2A]/25" />
                <p className="text-xs text-[#0D1B2A]/60">{fmtDate(lead.created_at)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl border border-[#0D1B2A]/06 p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-[#0D1B2A]">Onboarding Progress</p>
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-[#0D1B2A]/40"><CheckCircle2 size={11} className="inline mr-1 text-emerald-500" />{completedCount} done</span>
              <span className="text-[10px] text-[#0D1B2A]/40"><UserCheck size={11} className="inline mr-1 text-blue-500" />{approvedCount} approved</span>
            </div>
          </div>
          <div className="w-full h-2 bg-[#0D1B2A]/06 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Checklist */}
        {checklist ? (
          <div className="space-y-3">
            {checklist.map((item, idx) => (
              <div key={item.step} data-testid={`checklist-item-${idx}`}
                className={`bg-white rounded-xl border p-5 transition-colors ${item.approved ? "border-emerald-200 bg-emerald-50/30" : item.completed ? "border-blue-200 bg-blue-50/20" : "border-[#0D1B2A]/06"}`}>
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button data-testid={`checklist-toggle-${idx}`} onClick={() => toggleComplete(idx)} className="mt-0.5 flex-shrink-0">
                    {item.completed
                      ? <CheckCircle2 size={22} className="text-emerald-500" />
                      : <Circle size={22} className="text-[#0D1B2A]/15 hover:text-[#0D1B2A]/30 transition-colors" />
                    }
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className={`text-sm font-bold ${item.completed ? "text-[#0D1B2A]/50 line-through" : "text-[#0D1B2A]"}`}>
                          {idx + 1}. {item.step}
                        </h3>
                        <p className="text-[10px] text-[#0D1B2A]/30 mt-0.5">
                          Assigned to: <span className="font-semibold text-[#174358]/60">{item.assigned_to}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.completed && item.completed_at && (
                          <span className="text-[9px] text-[#0D1B2A]/25 flex items-center gap-1">
                            <Clock size={10} /> {fmtDate(item.completed_at)}
                          </span>
                        )}
                        {item.completed && (
                          <button data-testid={`checklist-approve-${idx}`} onClick={() => toggleApprove(idx)}
                            className={`text-[9px] font-bold px-2.5 py-1 rounded-full border transition-colors ${
                              item.approved
                                ? "bg-emerald-500 text-white border-emerald-500"
                                : "bg-white text-[#0D1B2A]/40 border-[#0D1B2A]/10 hover:border-emerald-300 hover:text-emerald-600"
                            }`}>
                            {item.approved ? "Approved" : "Approve"}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Comments */}
                    <div className="flex items-start gap-2">
                      <MessageSquare size={12} className="text-[#0D1B2A]/15 mt-1.5 flex-shrink-0" />
                      <input
                        data-testid={`checklist-comment-${idx}`}
                        type="text" placeholder="Add a comment..."
                        value={item.comments || ""}
                        onChange={(e) => updateComment(idx, e.target.value)}
                        className="flex-1 text-xs text-[#0D1B2A]/70 placeholder:text-[#0D1B2A]/20 border-b border-transparent hover:border-[#0D1B2A]/10 focus:border-[#174358]/30 outline-none py-1 bg-transparent transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12"><div className="w-6 h-6 border-2 border-[#174358]/20 border-t-[#174358] rounded-full animate-spin mx-auto" /></div>
        )}
      </div>
    </div>
  );
}

/* ── Main Dashboard ── */
export default function AdminSignups() {
  const [token, setToken] = useState(null);
  const [signups, setSignups] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [tab, setTab] = useState("service");
  const [period, setPeriod] = useState("week");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const loaderRef = useRef(null);

  const fetchSignups = useCallback(async (pg = 1, append = false) => {
    if (!token) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: pg, limit: 30, tab, period });
      const res = await axios.get(`${API}/admin/signups?${params}`, { headers: { Authorization: `Bearer ${token}` } });
      setSignups(prev => append ? [...prev, ...res.data.signups] : res.data.signups);
      setTotal(res.data.total);
      setHasMore(res.data.has_more);
      setPage(pg);
    } catch (err) {
      if (err.response?.status === 401) setToken(null);
    } finally { setLoading(false); setInitialLoad(false); }
  }, [token, tab, period]);

  useEffect(() => {
    if (token) { setPage(1); setSignups([]); setInitialLoad(true); fetchSignups(1, false); }
  }, [token, tab, period, fetchSignups]);

  // Infinite scroll
  useEffect(() => {
    if (!loaderRef.current || !hasMore || loading) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && hasMore && !loading) fetchSignups(page + 1, true); }, { threshold: 0.5 });
    obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [hasMore, loading, page, fetchSignups]);

  if (!token) return <AdminLogin onLogin={setToken} />;
  if (selectedLead) return <OnboardingScreen lead={selectedLead} token={token} onBack={() => { setSelectedLead(null); fetchSignups(1, false); }} />;

  // Filter by search
  const filtered = signups.filter(s => {
    if (!search) return true;
    const q = search.toLowerCase();
    return [s.agency_name, s.first_name, s.last_name, s.email, s.phone, s.city, s.state, s.destination]
      .some(f => (f || "").toLowerCase().includes(q));
  });

  const servicePeriodCount = signups.filter(s => isServiceLead(s.source_page)).length;
  const destPeriodCount = signups.filter(s => !isServiceLead(s.source_page)).length;

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="bg-[#0D1B2A] px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white text-base font-bold">HI DMC Lead Dashboard</h1>
            <p className="text-white/30 text-[10px] uppercase tracking-wider">Agent Onboarding & Lead Management</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-white/40 text-xs hover:text-white transition-colors">Website</a>
            <button data-testid="admin-logout" onClick={() => setToken(null)} className="flex items-center gap-1.5 text-white/40 text-xs hover:text-white/70 transition-colors">
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5">
        {/* Tabs */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-1 bg-white rounded-lg border border-[#0D1B2A]/06 p-1">
            {[
              { key: "service", label: "Service Leads", icon: Building2 },
              { key: "destination", label: "Destination Leads", icon: Globe },
            ].map(t => (
              <button key={t.key} data-testid={`tab-${t.key}`} onClick={() => setTab(t.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold transition-colors ${
                  tab === t.key ? "bg-[#0D1B2A] text-white" : "text-[#0D1B2A]/40 hover:text-[#0D1B2A]/70"
                }`}>
                <t.icon size={13} /> {t.label}
              </button>
            ))}
          </div>

          {/* Period toggle */}
          <div className="flex gap-1">
            {[
              { key: "today", label: "Today" },
              { key: "week", label: "This Week" },
              { key: "month", label: "This Month" },
              { key: "all", label: "All" },
            ].map(p => (
              <button key={p.key} data-testid={`period-${p.key}`} onClick={() => setPeriod(p.key)}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full border transition-colors ${
                  period === p.key ? "bg-[#174358] text-white border-[#174358]" : "bg-white text-[#0D1B2A]/35 border-[#0D1B2A]/08 hover:border-[#0D1B2A]/20"
                }`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          <div className="bg-white rounded-xl p-3.5 border border-[#0D1B2A]/06">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#174358]/08 text-[#174358]"><Users size={15} /></div>
              <div><p className="text-xl font-bold text-[#0D1B2A]">{total}</p><p className="text-[10px] text-[#0D1B2A]/40">Total Leads ({period === "all" ? "All Time" : period === "today" ? "Today" : period === "week" ? "This Week" : "This Month"})</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3.5 border border-[#0D1B2A]/06">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600">{tab === "service" ? <Building2 size={15} /> : <Globe size={15} />}</div>
              <div><p className="text-xl font-bold text-[#0D1B2A]">{filtered.length}</p><p className="text-[10px] text-[#0D1B2A]/40">Showing</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3.5 border border-[#0D1B2A]/06">
            <Button data-testid="admin-export-csv" onClick={() => exportCSV(filtered, tab)} size="sm" className="w-full bg-[#174358] text-white hover:bg-[#1e5a75] h-9 text-[10px]">
              <Download size={12} className="mr-1.5" /> Export CSV
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl border border-[#0D1B2A]/06 p-3 mb-4">
          <div className="flex items-center gap-2">
            <Search size={13} className="text-[#0D1B2A]/30" />
            <Input data-testid="admin-search" placeholder="Search agency, name, email, destination..." value={search} onChange={e => setSearch(e.target.value)}
              className="border-0 shadow-none h-8 text-xs focus-visible:ring-0" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#0D1B2A]/06 overflow-hidden">
          {initialLoad ? (
            <div className="p-12 text-center"><div className="w-6 h-6 border-2 border-[#174358]/20 border-t-[#174358] rounded-full animate-spin mx-auto" /></div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-[#0D1B2A]/30 text-sm">No {tab} leads found for this period.</div>
          ) : (
            <div className="overflow-x-auto">
              <table data-testid="admin-signups-table" className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#0D1B2A]/06 bg-[#F7F8FA]">
                    <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-wider font-semibold text-[#0D1B2A]/40">#</th>
                    <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-wider font-semibold text-[#0D1B2A]/40">Agency</th>
                    <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-wider font-semibold text-[#0D1B2A]/40">Contact Person</th>
                    <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-wider font-semibold text-[#0D1B2A]/40">Email</th>
                    <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-wider font-semibold text-[#0D1B2A]/40">Phone</th>
                    <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-wider font-semibold text-[#0D1B2A]/40">Location</th>
                    {tab === "destination" && <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-wider font-semibold text-[#0D1B2A]/40">Destination</th>}
                    <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-wider font-semibold text-[#0D1B2A]/40">Date</th>
                    <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-wider font-semibold text-[#0D1B2A]/40">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => {
                    const name = `${s.first_name || ""} ${s.last_name || ""}`.trim();
                    const phone = s.phone ? `${s.phone_code || ""} ${s.phone}` : "";
                    const location = [s.city, s.state].filter(Boolean).join(", ");
                    return (
                      <tr key={s.id || `lead-${i}`} data-testid={`lead-row-${i}`}
                        onClick={() => setSelectedLead(s)}
                        className="border-b border-[#0D1B2A]/04 hover:bg-[#174358]/02 transition-colors cursor-pointer group">
                        <td className="px-4 py-3 text-[#0D1B2A]/20">{i + 1}</td>
                        <td className="px-4 py-3">
                          <p className="font-bold text-[#0D1B2A] text-sm">{s.agency_name || "\u2014"}</p>
                        </td>
                        <td className="px-4 py-3 text-[#0D1B2A]/60">{name || "\u2014"}</td>
                        <td className="px-4 py-3 text-[#174358] group">{s.email || "\u2014"} <CopyBtn value={s.email} /></td>
                        <td className="px-4 py-3 text-[#0D1B2A]/50 whitespace-nowrap">{phone || "\u2014"}</td>
                        <td className="px-4 py-3 text-[#0D1B2A]/50">{location || "\u2014"}</td>
                        {tab === "destination" && (
                          <td className="px-4 py-3">
                            {s.destination ? <span className="text-[9px] font-semibold text-[#174358] bg-[#174358]/06 px-2 py-0.5 rounded-full">{s.destination}</span> : "\u2014"}
                          </td>
                        )}
                        <td className="px-4 py-3 text-[#0D1B2A]/40 whitespace-nowrap">
                          {fmtDate(s.created_at)}
                          <span className="block text-[8px] text-[#0D1B2A]/20">{fmtTime(s.created_at)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                            isServiceLead(s.source_page) ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                          }`}>{s.source_page || "\u2014"}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {hasMore && (
            <div ref={loaderRef} className="py-6 text-center">
              {loading && <div className="w-5 h-5 border-2 border-[#174358]/20 border-t-[#174358] rounded-full animate-spin mx-auto" />}
            </div>
          )}
          {!hasMore && signups.length > 0 && (
            <p className="text-center text-[#0D1B2A]/20 text-[10px] py-4">All {total} leads loaded</p>
          )}
        </div>
      </div>
    </div>
  );
}
