import { useState } from "react";
import { ArrowRight, Check, Phone, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const benefits = [
  "One DMC relationship across every destination",
  "Book destination products in the agent portal",
  "Specialist team for FIT, groups & MICE",
];

const phoneCodes = [
  { code: "+91", flag: "\u{1F1EE}\u{1F1F3}", label: "India" },
  { code: "+1", flag: "\u{1F1FA}\u{1F1F8}", label: "USA" },
  { code: "+44", flag: "\u{1F1EC}\u{1F1E7}", label: "UK" },
  { code: "+971", flag: "\u{1F1E6}\u{1F1EA}", label: "UAE" },
  { code: "+65", flag: "\u{1F1F8}\u{1F1EC}", label: "Singapore" },
  { code: "+61", flag: "\u{1F1E6}\u{1F1FA}", label: "Australia" },
  { code: "+49", flag: "\u{1F1E9}\u{1F1EA}", label: "Germany" },
  { code: "+33", flag: "\u{1F1EB}\u{1F1F7}", label: "France" },
  { code: "+81", flag: "\u{1F1EF}\u{1F1F5}", label: "Japan" },
  { code: "+86", flag: "\u{1F1E8}\u{1F1F3}", label: "China" },
  { code: "+55", flag: "\u{1F1E7}\u{1F1F7}", label: "Brazil" },
  { code: "+27", flag: "\u{1F1FF}\u{1F1E6}", label: "South Africa" },
  { code: "+966", flag: "\u{1F1F8}\u{1F1E6}", label: "Saudi Arabia" },
  { code: "+39", flag: "\u{1F1EE}\u{1F1F9}", label: "Italy" },
  { code: "+34", flag: "\u{1F1EA}\u{1F1F8}", label: "Spain" },
  { code: "+7", flag: "\u{1F1F7}\u{1F1FA}", label: "Russia" },
  { code: "+82", flag: "\u{1F1F0}\u{1F1F7}", label: "South Korea" },
  { code: "+60", flag: "\u{1F1F2}\u{1F1FE}", label: "Malaysia" },
  { code: "+66", flag: "\u{1F1F9}\u{1F1ED}", label: "Thailand" },
  { code: "+90", flag: "\u{1F1F9}\u{1F1F7}", label: "Turkey" },
];

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const inputClass = "bg-white border-[#0D1B2A]/10 text-[#0D1B2A] placeholder:text-[#0D1B2A]/30 h-11 rounded-lg focus:border-[#174358]/40 focus:ring-1 focus:ring-[#174358]/20";

export default function ContactCTA() {
  const [form, setForm] = useState({ first_name: "", last_name: "", agency_name: "", email: "", phone_code: "+91", phone: "", state: "", comments: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isIndia = form.phone_code === "+91";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.agency_name || !form.email || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (isIndia && !form.state) {
      toast.error("Please select your state");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/inquiries`, { ...form, source_page: "Homepage" });
      setSubmitted(true);
      window.history.pushState({}, "", "/thank-you");
      toast.success("Request submitted!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <section id="contact" data-testid="contact-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F4F1E8]">
      <div className="max-w-6xl mx-auto">
        <div data-reveal-img className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] bg-white rounded-[1.75rem] overflow-hidden shadow-[0_44px_110px_-48px_rgba(13,27,42,0.55)]">
          {/* Royal destination image panel + condensed story */}
          <div className="relative min-h-[300px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1100&q=85&auto=format&fit=crop"
              alt="Iconic destination"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/70 via-[#0D1B2A]/55 to-[#0D1B2A]/88" aria-hidden="true" />
            <div className="relative h-full flex flex-col justify-between p-8 md:p-10 lg:p-12">
              <div>
                <p className="font-['Manrope'] text-[11px] tracking-[0.3em] uppercase font-semibold text-white/55 mb-6">Partner With Us</p>
                <h2 data-testid="contact-heading" className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-[42px] text-white leading-[1.1] mb-5">
                  More destinations.<br />One DMC relationship.
                </h2>
                <p className="font-['Manrope'] text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
                  Register for the agent portal, or share your next requirement.
                </p>
                <div className="space-y-3">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check size={14} className="text-white/60 mt-0.5 flex-shrink-0" />
                      <span className="font-['Manrope'] text-[13px] text-white/70 leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8 mt-8 border-t border-white/15 flex flex-wrap gap-x-7 gap-y-2">
                <a href="mailto:sales@hidmc.com" className="font-['Manrope'] flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors">
                  <Mail size={14} className="text-white/45" /> sales@hidmc.com
                </a>
                <a href="tel:+911244600000" className="font-['Manrope'] flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors">
                  <Phone size={14} className="text-white/45" /> +91 124 4600000
                </a>
              </div>
            </div>
          </div>

          {/* Elegant quote form */}
          <div className="p-8 md:p-10 lg:p-12">
            {submitted ? (
              <div data-testid="form-success" className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-14 h-14 rounded-full bg-[#174358]/10 flex items-center justify-center mb-5">
                  <Check size={28} className="text-[#174358]" />
                </div>
                <h3 className="font-['Manrope'] font-bold tracking-tight text-2xl text-[#0D1B2A] mb-3">Thank You — Request Received</h3>
                <p className="text-[#0D1B2A]/50 text-sm leading-relaxed max-w-sm">
                  Our agent team will review your requirement and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-testid="inquiry-form" className="space-y-4">
                <div className="mb-5">
                  <h3 className="font-['Manrope'] font-bold tracking-tight text-2xl text-[#0D1B2A] mb-1">Request a Quote</h3>
                  <p className="text-xs text-[#0D1B2A]/45">Tell us the requirement and our agent team will come back to you.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">First Name *</label>
                    <Input data-testid="input-first-name" placeholder="First name" value={form.first_name} onChange={(e) => update("first_name", e.target.value)}
                      className={inputClass} />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Last Name *</label>
                    <Input data-testid="input-last-name" placeholder="Last name" value={form.last_name} onChange={(e) => update("last_name", e.target.value)}
                      className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Agency Name *</label>
                  <Input data-testid="input-agency-name" placeholder="Your travel agency" value={form.agency_name} onChange={(e) => update("agency_name", e.target.value)}
                    className={inputClass} />
                </div>
                <div>
                  <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Phone Number *</label>
                  <div className="flex gap-2">
                    <Select value={form.phone_code} onValueChange={(v) => { update("phone_code", v); if (v !== "+91") update("state", ""); }}>
                      <SelectTrigger data-testid="phone-code-select" className="bg-white border-[#0D1B2A]/10 text-[#0D1B2A] h-11 rounded-lg w-[130px] flex-shrink-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#0D1B2A]/10 max-h-[250px]">
                        {phoneCodes.map((pc) => (
                          <SelectItem key={pc.code} value={pc.code} className="text-[#0D1B2A]/70 focus:text-[#0D1B2A] focus:bg-[#174358]/05">
                            <span className="mr-2">{pc.flag}</span> {pc.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input data-testid="input-phone" type="tel" placeholder="Phone number" value={form.phone} onChange={(e) => update("phone", e.target.value)}
                      className={`${inputClass} flex-1`} />
                  </div>
                </div>
                {isIndia && (
                  <div>
                    <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">State *</label>
                    <Select value={form.state} onValueChange={(v) => update("state", v)}>
                      <SelectTrigger data-testid="state-select" className="bg-white border-[#0D1B2A]/10 text-[#0D1B2A] h-11 rounded-lg w-full">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#0D1B2A]/10 max-h-[250px]">
                        {indianStates.map((s) => (
                          <SelectItem key={s} value={s} className="text-[#0D1B2A]/70 focus:text-[#0D1B2A] focus:bg-[#174358]/05">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Email *</label>
                  <Input data-testid="input-email" type="email" placeholder="email@agency.com" value={form.email} onChange={(e) => update("email", e.target.value)}
                    className={inputClass} />
                </div>
                <div>
                  <label className="text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block">Your Requirement</label>
                  <Textarea data-testid="input-requirement" placeholder="Destination, travel dates, pax, FIT / group / MICE" value={form.comments} onChange={(e) => update("comments", e.target.value)}
                    className="bg-white border-[#0D1B2A]/10 text-[#0D1B2A] placeholder:text-[#0D1B2A]/30 rounded-lg min-h-[72px] focus:border-[#174358]/40 focus:ring-1 focus:ring-[#174358]/20" />
                </div>
                <Button type="submit" data-testid="submit-inquiry-btn" disabled={loading}
                  className="w-full bg-[#174358] text-white hover:bg-[#1e5a75] rounded-full py-5 text-sm font-semibold shadow-md transition-all disabled:opacity-50">
                  {loading ? "Submitting..." : (<>Request a Quote <ArrowRight size={14} className="ml-1.5" /></>)}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
