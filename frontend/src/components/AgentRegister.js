import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

export default function AgentRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "", agency_name: "", phone: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/api/agent/register`, form);
      localStorage.setItem("agent_token", data.token);
      localStorage.setItem("agent_info", JSON.stringify(data.agent));
      navigate("/agent/dashboard");
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center px-4 py-12" data-testid="agent-register-page">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#174358]">Hi DMC</span>
          </Link>
          <h1 className="font-['Cormorant_Garamond'] text-3xl font-light text-[#0D1B2A]">Agent Registration</h1>
          <p className="text-sm text-[#0D1B2A]/50 mt-2">Create your account to access destination tools</p>
        </div>

        <form onSubmit={handleRegister} className="bg-white rounded-2xl shadow-sm border border-[#0D1B2A]/06 p-8 space-y-4">
          {error && (
            <div data-testid="register-error" className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#0D1B2A]/60 uppercase tracking-wider mb-1.5">Full Name</label>
            <input data-testid="agent-register-name" type="text" value={form.name} onChange={set("name")} required
              className="w-full px-4 py-2.5 rounded-xl border border-[#0D1B2A]/10 text-sm focus:outline-none focus:border-[#174358]/40 transition-colors"
              placeholder="John Smith" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0D1B2A]/60 uppercase tracking-wider mb-1.5">Agency Name</label>
            <input data-testid="agent-register-agency" type="text" value={form.agency_name} onChange={set("agency_name")} required
              className="w-full px-4 py-2.5 rounded-xl border border-[#0D1B2A]/10 text-sm focus:outline-none focus:border-[#174358]/40 transition-colors"
              placeholder="Your Travel Agency" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0D1B2A]/60 uppercase tracking-wider mb-1.5">Email</label>
            <input data-testid="agent-register-email" type="email" value={form.email} onChange={set("email")} required
              className="w-full px-4 py-2.5 rounded-xl border border-[#0D1B2A]/10 text-sm focus:outline-none focus:border-[#174358]/40 transition-colors"
              placeholder="agent@agency.com" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0D1B2A]/60 uppercase tracking-wider mb-1.5">Phone (Optional)</label>
            <input data-testid="agent-register-phone" type="tel" value={form.phone} onChange={set("phone")}
              className="w-full px-4 py-2.5 rounded-xl border border-[#0D1B2A]/10 text-sm focus:outline-none focus:border-[#174358]/40 transition-colors"
              placeholder="+91 9876543210" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0D1B2A]/60 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <input data-testid="agent-register-password" type={showPw ? "text" : "password"} value={form.password} onChange={set("password")} required
                className="w-full px-4 py-2.5 rounded-xl border border-[#0D1B2A]/10 text-sm focus:outline-none focus:border-[#174358]/40 transition-colors pr-11"
                placeholder="Minimum 6 characters" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0D1B2A]/30 hover:text-[#0D1B2A]/60">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button data-testid="agent-register-submit" type="submit" disabled={loading}
            className="w-full bg-[#174358] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#0D1B2A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
            <UserPlus size={16} />
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-[#0D1B2A]/50">
            Already have an account?{" "}
            <Link to="/agent/login" className="text-[#174358] font-semibold hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
