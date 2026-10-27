import { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const banners = [
  { image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1600&q=85", title: "Destinations Worldwide", subtitle: "One DMC relationship across multiple destinations" },
  { image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=85", title: "Built for the Travel Trade", subtitle: "Agents, travel companies, tour operators and MICE businesses" },
  { image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85", title: "FIT, Groups & MICE", subtitle: "Specialised agent contact centre for complex requirements" },
  { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=85", title: "Ground Arrangements Handled", subtitle: "We coordinate the destination suppliers behind your booking" },
];

export default function Hero() {
  const [bIdx, setBIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBIdx((i) => (i + 1) % banners.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" data-testid="hero-section" className="relative min-h-screen overflow-hidden bg-[#0D1B2A]">
      {/* Background carousel */}
      {banners.map((b, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-[1200ms] ${i === bIdx ? "opacity-100" : "opacity-0"}`}>
          <img src={b.image} alt={b.title} className={`w-full h-full object-cover transition-transform ease-out duration-[6500ms] ${i === bIdx ? "scale-105" : "scale-100"}`} />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/95 via-[#0D1B2A]/75 to-[#0D1B2A]/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/70 to-transparent" />

      {/* Copy */}
      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-28 pb-32">
        <div className="max-w-3xl">
          <p data-testid="hero-eyebrow" className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-white/50 mb-5">
            Global Destination Management for the Travel Trade
          </p>
          <h1 data-testid="hero-heading" className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.08] mb-6">
            You sell the world, <em className="text-white/70">we handle the destination</em> on the ground.
          </h1>
          <p data-testid="hero-subcopy" className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl mb-9">
            Your Global DMC. Book destination products through our agent portal, or send custom FIT,
            group and MICE briefs to our specialised agent team.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <a href="#contact" data-testid="hero-quote-cta">
              <Button className="w-full sm:w-auto bg-white text-[#174358] hover:bg-white/90 rounded-full px-8 py-6 text-sm font-semibold shadow-lg hover:shadow-xl transition-all">
                Request a Quote <ArrowRight size={15} className="ml-2" />
              </Button>
            </a>
            <Link to="/agent/register" data-testid="hero-register-cta">
              <Button variant="outline" className="w-full sm:w-auto rounded-full px-8 py-6 text-sm font-semibold border-white/25 text-white bg-transparent hover:bg-white/10 transition-all">
                Register as a Travel Agent
              </Button>
            </Link>
            <a href="#explore-destinations" data-testid="hero-destinations-cta" className="text-sm font-semibold text-white/60 hover:text-white transition-colors sm:ml-2">
              Explore Destinations
            </a>
          </div>

          <p data-testid="hero-microcopy" className="text-[11px] text-white/35 mt-7 tracking-wide">
            For travel agents, tour operators and MICE businesses.
          </p>
        </div>
      </div>

      {/* Carousel controls */}
      <div className="absolute bottom-14 right-6 md:right-12 lg:right-24 hidden md:flex items-center gap-4 z-20">
        <button data-testid="hero-prev" onClick={() => setBIdx((i) => (i - 1 + banners.length) % banners.length)} className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/25 transition-colors"><ChevronLeft size={20} className="text-white" /></button>
        <div className="flex gap-2">{banners.map((_, i) => (<button key={i} data-testid={`hero-dot-${i}`} onClick={() => setBIdx(i)} className={`h-2 rounded-full transition-all duration-500 ${i === bIdx ? "w-8 bg-white" : "w-2 bg-white/30"}`} />))}</div>
        <button data-testid="hero-next" onClick={() => setBIdx((i) => (i + 1) % banners.length)} className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/25 transition-colors"><ChevronRight size={20} className="text-white" /></button>
      </div>

      <a href="#stats" data-testid="scroll-indicator" className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 hover:text-white/70 transition-colors animate-float z-20">
        <span className="text-[9px] tracking-[0.2em] uppercase font-semibold">Scroll</span><ChevronDown size={14} />
      </a>
    </section>
  );
}
