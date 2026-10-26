import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Eye, EyeOff } from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

export default function AgentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/api/agent/login`, { email, password });
      localStorage.setItem("agent_token", data.token);
      localStorage.setItem("agent_info", JSON.stringify(data.agent));
      navigate("/agent/dashboard");
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center px-4" data-testid="agent-login-page">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <img src="/logo.png" alt="Hi DMC" className="h-10 mx-auto" onError={(e) => { e.target.style.display = "none"; }} />
            <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#174358]">Hi DMC</span>
          </Link>
          <h1 className="font-['Cormorant_Garamond'] text-3xl font-light text-[#0D1B2A]">Agent Portal</h1>
          <p className="text-sm text-[#0D1B2A]/50 mt-2">Sign in to access your destination tools</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-sm border border-[#0D1B2A]/06 p-8 space-y-5">
          {error && (
            <div data-testid="login-error" className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#0D1B2A]/60 uppercase tracking-wider mb-2">Email</label>
            <input data-testid="agent-login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl border border-[#0D1B2A]/10 text-sm text-[#0D1B2A] placeholder:text-[#0D1B2A]/30 focus:outline-none focus:border-[#174358]/40 transition-colors"
              placeholder="agent@agency.com" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0D1B2A]/60 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <input data-testid="agent-login-password" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-[#0D1B2A]/10 text-sm text-[#0D1B2A] placeholder:text-[#0D1B2A]/30 focus:outline-none focus:border-[#174358]/40 transition-colors pr-11"
                placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0D1B2A]/30 hover:text-[#0D1B2A]/60">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button data-testid="agent-login-submit" type="submit" disabled={loading}
            className="w-full bg-[#174358] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#0D1B2A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            <LogIn size={16} />
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-[#0D1B2A]/50">
            Don't have an account?{" "}
            <Link to="/agent/register" className="text-[#174358] font-semibold hover:underline">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
