import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const banners = [
  { image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1600&q=85", title: "Destinations Worldwide" },
  { image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=85", title: "Built for the Travel Trade" },
  { image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85", title: "FIT, Groups & MICE" },
  { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=85", title: "Ground Arrangements Handled" },
];

export default function Hero() {
  const [bIdx, setBIdx] = useState(0);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setBIdx((i) => (i + 1) % banners.length), 1000);
    return () => clearInterval(t);
  }, []);

  const submitSearch = (e) => { e.preventDefault(); navigate("/blog"); };

  return (
    <section id="hero" data-testid="hero-section" className="relative min-h-screen flex flex-col overflow-hidden bg-[#0D1B2A]">
      {/* Background carousel */}
      {banners.map((b, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-[600ms] ${i === bIdx ? "opacity-100" : "opacity-0"}`}>
          <img src={b.image} alt={b.title} className={`w-full h-full object-cover transition-transform ease-out duration-[6500ms] ${i === bIdx ? "scale-105" : "scale-100"}`} />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/75 via-[#0D1B2A]/45 to-[#0D1B2A]/85" />

      {/* Centered content */}
      <div data-reveal-group className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-10">
        <h1 data-testid="hero-heading" className="font-['Manrope'] font-bold tracking-tight text-white text-4xl sm:text-5xl md:text-6xl leading-[1.08] max-w-4xl">
          You sell the world, we handle the destination
        </h1>
        <div className="mb-8" />

        {/* Search */}
        <form onSubmit={submitSearch} className="w-full max-w-2xl flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full p-2 pl-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]">
          <MapPin size={18} className="text-[#174358]/60 shrink-0" />
          <input
            data-testid="hero-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a destination"
            className="flex-1 min-w-0 bg-transparent text-[#0D1B2A] placeholder:text-[#0D1B2A]/40 text-sm md:text-base focus:outline-none py-2.5 font-['Manrope']"
          />
          <button type="submit" aria-label="Search" className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#174358] hover:bg-[#1e5a75] text-white flex items-center justify-center transition-colors">
            <Search size={18} />
          </button>
        </form>

        {/* Trust pill */}
        <div className="mt-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-full pl-2.5 pr-5 py-2">
          <div className="flex -space-x-2">
            {[12, 32, 45].map((n) => (
              <img key={n} src={`https://i.pravatar.cc/56?img=${n}`} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} className="w-7 h-7 rounded-full border-2 border-white/70 object-cover" />
            ))}
          </div>
          <span className="font-['Manrope'] text-sm text-white/85 font-medium">850+ agent partners worldwide</span>
        </div>

        {/* Secondary CTAs */}
        <div className="mt-6 flex items-center gap-4 font-['Manrope'] text-sm font-semibold">
          <a href="#contact" data-testid="hero-quote-cta" className="text-white/85 hover:text-white inline-flex items-center gap-1.5 transition-colors">
            Request a quote <ArrowRight size={14} />
          </a>
          <span className="text-white/25">·</span>
          <Link to="/agent/register" data-testid="hero-register-cta" className="text-white/85 hover:text-white transition-colors">
            Register as a travel agent
          </Link>
        </div>
      </div>

      {/* Bottom trust strip */}
      <div className="relative z-10 bg-[#F4F1E8]/95 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex flex-wrap items-center justify-center gap-x-8 gap-y-1 text-[13px] text-[#0D1B2A]/70 font-['Manrope']">
          <span className="inline-flex items-center gap-2"><Calendar size={14} className="text-[#174358]" /> Established in <strong className="text-[#0D1B2A] font-semibold">1995</strong></span>
          <span className="hidden sm:inline text-[#0D1B2A]/20">|</span>
          <span>Over <strong className="text-[#0D1B2A] font-semibold">30 years</strong> of trust</span>
          <span className="hidden sm:inline text-[#0D1B2A]/20">|</span>
          <span><strong className="text-[#0D1B2A] font-semibold">45+</strong> countries</span>
          <span className="hidden md:inline text-[#0D1B2A]/20">|</span>
          <span className="hidden md:inline"><strong className="text-[#0D1B2A] font-semibold">120+</strong> destinations</span>
        </div>
      </div>

    </section>
  );
}
