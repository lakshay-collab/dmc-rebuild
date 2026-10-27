import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, MapPin, Users, User, Filter, Send, X, Clock, Tag, ChevronRight, FileText } from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

function authHeaders() {
  const token = localStorage.getItem("agent_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function AgentDashboard() {
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [activeDest, setActiveDest] = useState(null);
  const [typeFilter, setTypeFilter] = useState("All");
  const [showRfp, setShowRfp] = useState(false);
  const [rfpDest, setRfpDest] = useState("");
  const [loading, setLoading] = useState(true);

  // Auth check
  useEffect(() => {
    const info = localStorage.getItem("agent_info");
    const token = localStorage.getItem("agent_token");
    if (!info || !token) { navigate("/agent/login"); return; }
    setAgent(JSON.parse(info));

    // Verify token is still valid
    axios.get(`${API}/api/agent/me`, { headers: authHeaders() })
      .catch(() => { localStorage.removeItem("agent_token"); localStorage.removeItem("agent_info"); navigate("/agent/login"); });
  }, [navigate]);

  // Load destinations
  useEffect(() => {
    axios.get(`${API}/api/agent/destinations`).then((r) => {
      setDestinations(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Load packages when destination or type changes
  const fetchPackages = useCallback(() => {
    const params = {};
    if (activeDest) params.destination = activeDest;
    if (typeFilter !== "All") params.type = typeFilter;
    axios.get(`${API}/api/agent/packages`, { params }).then((r) => setPackages(r.data));
  }, [activeDest, typeFilter]);

  useEffect(() => { fetchPackages(); }, [fetchPackages]);

  const handleLogout = () => {
    localStorage.removeItem("agent_token");
    localStorage.removeItem("agent_info");
    navigate("/agent/login");
  };

  const handleDestClick = (name) => {
    setActiveDest(activeDest === name ? null : name);
    setTypeFilter("All");
  };

  if (!agent) return null;

  const totalPackages = destinations.reduce((s, d) => s + d.packages_count, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFB]" data-testid="agent-dashboard">
      {/* Top Nav */}
      <nav className="bg-white border-b border-[#0D1B2A]/06 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="font-['Manrope'] font-bold tracking-tight text-xl font-bold text-[#174358]">Hi DMC</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#174358]/40 bg-[#174358]/06 px-2.5 py-1 rounded-full">Agent Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-[#0D1B2A]">{agent.name}</p>
              <p className="text-[11px] text-[#0D1B2A]/40">{agent.agency_name}</p>
            </div>
            <button data-testid="agent-logout-btn" onClick={handleLogout}
              className="p-2 rounded-lg text-[#0D1B2A]/40 hover:text-red-500 hover:bg-red-50 transition-colors" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-12">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl text-[#0D1B2A]">
            Welcome back, <span className="text-[#174358] font-medium">{agent.name}</span>
          </h1>
          <p className="text-sm text-[#0D1B2A]/45 mt-2">{agent.agency_name}</p>
          <div className="flex items-center gap-6 mt-5">
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={15} className="text-[#174358]" />
              <span className="text-[#0D1B2A]/70"><strong className="text-[#0D1B2A]">{destinations.length}</strong> Destinations</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileText size={15} className="text-[#174358]" />
              <span className="text-[#0D1B2A]/70"><strong className="text-[#0D1B2A]">{totalPackages}</strong> Packages Available</span>
            </div>
          </div>
        </div>

        {/* Destination Cards */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#0D1B2A]/40">Select a Destination</h2>
            {activeDest && (
              <button onClick={() => { setActiveDest(null); setTypeFilter("All"); }}
                className="text-xs text-[#174358] font-semibold hover:underline">Clear filter</button>
            )}
          </div>
          {loading ? (
            <div className="text-sm text-[#0D1B2A]/40">Loading destinations...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {destinations.map((d) => (
                <button key={d.name} data-testid={`agent-dest-${d.name.toLowerCase().replace(/ /g, '-')}`}
                  onClick={() => handleDestClick(d.name)}
                  className={`text-left rounded-xl overflow-hidden border-2 transition-all duration-200 group ${
                    activeDest === d.name
                      ? "border-[#174358] shadow-lg shadow-[#174358]/10"
                      : "border-transparent bg-white hover:border-[#174358]/20 hover:shadow-md"
                  }`}>
                  <div className="flex items-center gap-4 p-4">
                    <img src={d.image_url} alt={d.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[#0D1B2A] text-[15px]">{d.name}</h3>
                      <p className="text-xs text-[#0D1B2A]/40 mt-0.5">{d.region}</p>
                      <p className="text-xs text-[#174358] font-semibold mt-1">{d.packages_count} package{d.packages_count !== 1 ? "s" : ""}</p>
                    </div>
                    <ChevronRight size={16} className={`ml-auto flex-shrink-0 transition-transform ${activeDest === d.name ? "rotate-90 text-[#174358]" : "text-[#0D1B2A]/20"}`} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filters + RFP */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[#0D1B2A]/30" />
            {["All", "FIT", "Group"].map((t) => (
              <button key={t} data-testid={`agent-filter-${t.toLowerCase()}`}
                onClick={() => setTypeFilter(t)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  typeFilter === t ? "bg-[#174358] text-white" : "text-[#0D1B2A]/40 hover:bg-[#0D1B2A]/05"
                }`}>{t}</button>
            ))}
          </div>
          <button data-testid="rfp-open-btn" onClick={() => { setRfpDest(activeDest || ""); setShowRfp(true); }}
            className="inline-flex items-center gap-2 bg-[#174358] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0D1B2A] transition-colors">
            <Send size={14} /> Request Proposal (RFP)
          </button>
        </div>

        {/* Package Cards */}
        {packages.length === 0 ? (
          <div data-testid="no-packages" className="bg-white rounded-2xl border border-[#0D1B2A]/06 p-12 text-center">
            <FileText size={32} className="mx-auto text-[#0D1B2A]/15 mb-3" />
            <p className="text-sm text-[#0D1B2A]/40">
              {activeDest ? `No ${typeFilter !== "All" ? typeFilter : ""} packages found for ${activeDest}.` : "Select a destination above to view packages."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {packages.map((pkg) => (
              <PackageCard key={`${pkg.destination}-${pkg.title}`} pkg={pkg} onRfp={() => { setRfpDest(pkg.destination); setShowRfp(true); }} />
            ))}
          </div>
        )}
      </div>

      {/* RFP Modal */}
      {showRfp && <RFPModal dest={rfpDest} destinations={destinations} onClose={() => setShowRfp(false)} />}
    </div>
  );
}


function PackageCard({ pkg, onRfp }) {
  return (
    <div data-testid={`package-card-${pkg.title.toLowerCase().replace(/ /g, '-')}`}
      className="bg-white rounded-2xl border border-[#0D1B2A]/06 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex">
        <img src={pkg.image_url} alt={pkg.title} className="w-32 sm:w-40 object-cover hidden sm:block" />
        <div className="p-5 flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-[#0D1B2A] text-[15px] leading-snug">{pkg.title}</h3>
              <p className="text-xs text-[#0D1B2A]/40 mt-0.5">{pkg.destination}</p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                pkg.type === "FIT" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
              }`}>{pkg.type}</span>
              {pkg.tag && <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#174358]/06 text-[#174358]">{pkg.tag}</span>}
            </div>
          </div>

          <p className="text-xs text-[#0D1B2A]/50 leading-relaxed line-clamp-2 mb-3">{pkg.description}</p>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#0D1B2A]/50 mb-3">
            <span className="inline-flex items-center gap-1"><Clock size={11} /> {pkg.duration}</span>
            <span className="inline-flex items-center gap-1"><MapPin size={11} /> {pkg.cities}</span>
            <span className="inline-flex items-center gap-1"><Users size={11} /> {pkg.pax_range}</span>
          </div>

          {pkg.highlights && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {pkg.highlights.slice(0, 3).map((h) => (
                <span key={h} className="text-[10px] text-[#0D1B2A]/40 bg-[#F8FAFB] px-2 py-0.5 rounded-full">{h}</span>
              ))}
            </div>
          )}

          <button onClick={onRfp}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174358] hover:text-[#0D1B2A] transition-colors">
            <Send size={12} /> Request Proposal
          </button>
        </div>
      </div>
    </div>
  );
}


function RFPModal({ dest, destinations, onClose }) {
  const [form, setForm] = useState({ destination: dest, package_title: "", pax_count: "", travel_dates: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await axios.post(`${API}/api/agent/rfp`, {
        ...form,
        pax_count: form.pax_count ? parseInt(form.pax_count) : null,
      }, { headers: authHeaders() });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4" onClick={onClose}>
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send size={22} className="text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-[#0D1B2A] mb-2">Proposal Requested!</h3>
          <p className="text-sm text-[#0D1B2A]/50 mb-6">Our team will get back to you within 24 hours with a detailed proposal.</p>
          <button data-testid="rfp-close-btn" onClick={onClose}
            className="bg-[#174358] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0D1B2A] transition-colors">Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[#0D1B2A]">Request for Proposal</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#0D1B2A]/05 text-[#0D1B2A]/40"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</div>}

          <div>
            <label className="block text-xs font-semibold text-[#0D1B2A]/60 uppercase tracking-wider mb-1.5">Destination</label>
            <select data-testid="rfp-destination" value={form.destination} onChange={set("destination")} required
              className="w-full px-4 py-2.5 rounded-xl border border-[#0D1B2A]/10 text-sm focus:outline-none focus:border-[#174358]/40 bg-white">
              <option value="">Select destination</option>
              {destinations.map((d) => <option key={d.name} value={d.name}>{d.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0D1B2A]/60 uppercase tracking-wider mb-1.5">Package (Optional)</label>
            <input data-testid="rfp-package" type="text" value={form.package_title} onChange={set("package_title")}
              className="w-full px-4 py-2.5 rounded-xl border border-[#0D1B2A]/10 text-sm focus:outline-none focus:border-[#174358]/40"
              placeholder="e.g. Classic Egypt & Nile Cruise" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0D1B2A]/60 uppercase tracking-wider mb-1.5">No. of Pax</label>
              <input data-testid="rfp-pax" type="number" value={form.pax_count} onChange={set("pax_count")} min="1"
                className="w-full px-4 py-2.5 rounded-xl border border-[#0D1B2A]/10 text-sm focus:outline-none focus:border-[#174358]/40"
                placeholder="e.g. 4" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0D1B2A]/60 uppercase tracking-wider mb-1.5">Travel Dates</label>
              <input data-testid="rfp-dates" type="text" value={form.travel_dates} onChange={set("travel_dates")}
                className="w-full px-4 py-2.5 rounded-xl border border-[#0D1B2A]/10 text-sm focus:outline-none focus:border-[#174358]/40"
                placeholder="e.g. Oct 15-22, 2026" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0D1B2A]/60 uppercase tracking-wider mb-1.5">Additional Requirements</label>
            <textarea data-testid="rfp-message" value={form.message} onChange={set("message")} rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-[#0D1B2A]/10 text-sm focus:outline-none focus:border-[#174358]/40 resize-none"
              placeholder="Any special requests, hotel preferences, etc." />
          </div>

          <button data-testid="rfp-submit-btn" type="submit" disabled={submitting}
            className="w-full bg-[#174358] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#0D1B2A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            <Send size={14} />
            {submitting ? "Submitting..." : "Submit Proposal Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
