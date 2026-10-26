import { useState, useEffect } from "react";
import { Send, CheckCircle, AlertCircle, Calendar, Users, MapPin, MessageSquare, User, Phone, Mail, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const DESTINATIONS = ["India", "Sri Lanka", "Maldives", "Bhutan", "Thailand", "Vietnam", "Cambodia", "Laos", "Indonesia", "Bali", "Japan", "South Korea", "Taiwan", "China", "Malaysia", "Singapore", "Philippines", "Kazakhstan", "UAE", "Greece", "Morocco"];

const init = { name: "", phone_number: "", email: "", start_date: "", no_of_days: "", no_of_adults: "", no_of_children: "", destination: "", comments: "" };

export default function PlanMyTrip() {
  const [form, setForm] = useState(init);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const update = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone_number.trim()) e.phone_number = "Phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true); setResult(null);
    try {
      const payload = { name: form.name, phone_number: form.phone_number };
      if (form.email) payload.email = form.email;
      if (form.start_date) payload.start_date = form.start_date;
      if (form.no_of_days) payload.no_of_days = parseInt(form.no_of_days);
      if (form.no_of_adults) payload.no_of_adults = parseInt(form.no_of_adults);
      if (form.no_of_children) payload.no_of_children = parseInt(form.no_of_children);
      if (form.destination) payload.destination = form.destination;
      if (form.comments) payload.comments = form.comments;

      await axios.post(`${API}/trip-plan-request`, payload);
      setResult({ ok: true });
      setForm(init);
      window.history.pushState({}, "", "/plan-my-trip/thank-you");
    } catch (err) {
      setResult({ ok: false, msg: err.response?.data?.detail || "Something went wrong. Please try again." });
    } finally { setLoading(false); }
  };

  return (
    <div data-testid="plan-trip-page" className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[#0D1B2A]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A] via-[#0D1B2A]/95 to-[#174358]/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 w-full">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold text-white/30 mb-4">Plan Your Trip</p>
          <h1 data-testid="plan-trip-heading" className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight mb-4">
            Tell Us What You <em className="text-white/60">Need</em>
          </h1>
          <p className="text-base text-white/45 max-w-xl">Share your travel requirements and our team will craft a custom itinerary with the best rates — typically within 48 hours.</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          {result?.ok ? (
            <div data-testid="plan-trip-success" className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-emerald-500" />
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-light text-[#0D1B2A] mb-3">Request Submitted</h2>
              <p className="text-sm text-[#0D1B2A]/50 max-w-md mx-auto mb-6">Thank you! Our team will review your requirements and get back to you with a custom itinerary within 48 hours.</p>
              <Button onClick={() => { setResult(null); window.history.pushState({}, "", "/plan-my-trip"); }} className="bg-[#174358] text-white hover:bg-[#1e5a75] rounded-full px-8 py-3 text-sm font-bold">
                Plan Another Trip
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {result?.ok === false && (
                <div data-testid="plan-trip-error" className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                  <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{result.msg}</p>
                </div>
              )}

              {/* Name & Phone (required) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D1B2A]/25" />
                    <Input data-testid="trip-name" value={form.name} onChange={(e) => update("name", e.target.value)}
                      placeholder="Your full name" className={`pl-10 h-11 border-[#0D1B2A]/10 text-sm ${errors.name ? "border-red-400" : ""}`} />
                  </div>
                  {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D1B2A]/25" />
                    <Input data-testid="trip-phone" type="tel" value={form.phone_number} onChange={(e) => update("phone_number", e.target.value)}
                      placeholder="+91 98765 43210" className={`pl-10 h-11 border-[#0D1B2A]/10 text-sm ${errors.phone_number ? "border-red-400" : ""}`} />
                  </div>
                  {errors.phone_number && <p className="text-[11px] text-red-500 mt-1">{errors.phone_number}</p>}
                </div>
              </div>

              {/* Email & Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D1B2A]/25" />
                    <Input data-testid="trip-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                      placeholder="you@agency.com" className="pl-10 h-11 border-[#0D1B2A]/10 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Destination</label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D1B2A]/25" />
                    <select data-testid="trip-destination" value={form.destination} onChange={(e) => update("destination", e.target.value)}
                      className="w-full pl-10 pr-4 h-11 rounded-md border border-[#0D1B2A]/10 text-sm text-[#0D1B2A] bg-white appearance-none focus:outline-none focus:border-[#174358]/40">
                      <option value="">Select destination</option>
                      {DESTINATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Date & Duration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Start Date</label>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D1B2A]/25" />
                    <Input data-testid="trip-date" type="date" value={form.start_date} onChange={(e) => update("start_date", e.target.value)}
                      className="pl-10 h-11 border-[#0D1B2A]/10 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">No. of Days</label>
                  <Input data-testid="trip-days" type="number" min="1" value={form.no_of_days} onChange={(e) => update("no_of_days", e.target.value)}
                    placeholder="7" className="h-11 border-[#0D1B2A]/10 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Adults</label>
                    <Input data-testid="trip-adults" type="number" min="1" value={form.no_of_adults} onChange={(e) => update("no_of_adults", e.target.value)}
                      placeholder="2" className="h-11 border-[#0D1B2A]/10 text-sm" />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Children</label>
                    <Input data-testid="trip-children" type="number" min="0" value={form.no_of_children} onChange={(e) => update("no_of_children", e.target.value)}
                      placeholder="0" className="h-11 border-[#0D1B2A]/10 text-sm" />
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Additional Requirements</label>
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-3 top-3 text-[#0D1B2A]/25" />
                  <textarea data-testid="trip-comments" value={form.comments} onChange={(e) => update("comments", e.target.value)}
                    placeholder="Tell us about special requests, hotel preferences, activities..."
                    rows={3} className="w-full pl-10 pr-4 py-2.5 rounded-md border border-[#0D1B2A]/10 text-sm text-[#0D1B2A] placeholder:text-[#0D1B2A]/30 focus:outline-none focus:border-[#174358]/40 resize-none" />
                </div>
              </div>

              {/* Submit */}
              <Button data-testid="trip-submit" type="submit" disabled={loading}
                className="w-full bg-[#174358] text-white hover:bg-[#1e5a75] rounded-full py-6 text-sm font-bold shadow-lg shadow-[#174358]/15 disabled:opacity-60">
                {loading ? <><Loader2 size={16} className="mr-2 animate-spin" /> Submitting...</> : <><Send size={14} className="mr-2" /> Submit Trip Request</>}
              </Button>

              <p className="text-[11px] text-[#0D1B2A]/30 text-center">Our team typically responds within 48 hours with a custom itinerary and rates.</p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
