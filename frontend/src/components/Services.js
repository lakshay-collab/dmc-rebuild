import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Package, Sparkles, Users, Hotel, Plane, Compass, Car, Map } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Package, title: "FIT Packages", stat: "2,500+", statLabel: "Packages", desc: "Fully independent travel packages for individual customers — flexible itineraries, accommodation and complete ground arrangements across the destinations we service.", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80" },
  { icon: Compass, title: "Experiences", stat: "10K+", statLabel: "Activities", desc: "Local experiences that make trips memorable — private tours, adventure activities, cultural immersions and cooking classes, sourced through our destination suppliers.", image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=700&q=80" },
  { icon: Users, title: "Group Tours", stat: "500+", statLabel: "Tours/Year", desc: "Ad hoc and large group travel handled end to end — logistics, guides, venues and activities coordinated by our specialised agent contact centre.", image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=700&q=80" },
  { icon: Hotel, title: "Hotels", stat: "500K+", statLabel: "Properties", desc: "Accommodation across major chains and boutique properties, contracted and coordinated by Hi DMC as part of your destination booking.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80" },
  { icon: Sparkles, title: "Custom Holidays", stat: "Assisted", statLabel: "Quotations", desc: "Share a customised FIT requirement with our specialised agent contact centre. We work up the destination arrangements and prepare a quotation for you to review or pass to your customer.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80" },
  { icon: Plane, title: "Flights", stat: "200+", statLabel: "Airlines", desc: "Multi-carrier flight inventory with competitive fares, flexible booking, and real-time seat availability for every route.", image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=700&q=80" },
  { icon: Car, title: "Transfers", stat: "Door", statLabel: "to Door", desc: "Airport pickups, intercity transfers and chauffeured services arranged through vetted local transport suppliers.", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&q=80" },
  { icon: Map, title: "MICE", stat: "45+", statLabel: "Countries", desc: "Meetings, incentives, conferences and exhibitions — destination ground arrangements coordinated by our dedicated team.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80" },
];

/* Compact horizontal service card — small image beside label + title + description + CTA.
   On desktop the image sits toward the central line (reversed for left-side items). */
function ServiceCard({ s, left }) {
  const Icon = s.icon;
  return (
    <div className={`group flex items-center gap-4 md:gap-5 ${left ? "md:flex-row-reverse md:text-right" : ""}`}>
      <div className="tl-img-anim relative overflow-hidden rounded-xl shrink-0 w-28 h-24 sm:w-36 sm:h-28 md:w-44 md:h-32">
        <img
          src={s.image}
          alt={s.title}
          loading="lazy"
          data-parallax="6"
          className="absolute inset-x-0 top-[-9%] h-[118%] w-full object-cover will-change-transform"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className={`flex items-center gap-2 mb-1.5 ${left ? "md:justify-end" : ""}`}>
          <Icon size={13} strokeWidth={1.75} className="text-[#174358]/70 shrink-0" />
          <span className="font-['Manrope'] text-[10px] tracking-[0.14em] uppercase font-semibold text-[#174358]/70">
            {s.stat} · {s.statLabel}
          </span>
        </div>
        <h3 className="font-['Manrope'] font-bold tracking-tight text-lg md:text-xl text-[#0D1B2A] leading-snug mb-1.5">{s.title}</h3>
        <p className="font-['Manrope'] text-xs md:text-[13px] text-[#0D1B2A]/55 leading-relaxed mb-2.5 line-clamp-2">{s.desc}</p>
        <a
          href="#contact"
          className={`font-['Manrope'] inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#174358] hover:text-[#1e5a75] transition-colors group/cta ${left ? "md:flex-row-reverse" : ""}`}
        >
          Learn more <ArrowRight size={14} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

export default function Services() {
  const timelineRef = useRef(null);
  const progressRef = useRef(null);

  // GSAP: draw the central progress line downward as the section scrolls past.
  // Reveals/nodes/connectors are CSS scroll-driven (bulletproof), so nothing is
  // ever left hidden if ScrollTrigger can't run. Respects prefers-reduced-motion.
  useLayoutEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      if (!progressRef.current) return;
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: timelineRef.current, start: "top 78%", end: "bottom 62%", scrub: 0.5 },
        }
      );
    }, timelineRef);
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => { ctx.revert(); clearTimeout(t); };
  }, []);

  return (
    <section id="services" data-testid="services-section" className="py-16 md:py-24 px-6 md:px-12 bg-[#F4F1E8]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-5">Destination Services</p>
          <h2 data-reveal data-testid="services-heading" className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl text-[#0D1B2A] mb-5 leading-tight">
            Everything Behind <em className="not-italic text-[#174358]">Your Destination Booking</em>
          </h2>
          <p data-reveal className="font-['Manrope'] text-[#0D1B2A]/60 max-w-2xl mx-auto leading-relaxed">The destination services we source and coordinate for the travel trade — bookable in the portal, or arranged with our agent team.</p>
        </div>

        {/* Stats banner */}
        <div data-reveal-group className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16 md:mb-20">
          {[
            { num: "2,500+", label: "FIT Packages" },
            { num: "500K+", label: "Hotel Properties" },
            { num: "10K+", label: "Curated Experiences" },
            { num: "200+", label: "Airline Partners" },
          ].map((s) => (
            <div key={s.label} data-testid={`service-stat-${s.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-[#0D1B2A] rounded-2xl p-5 md:p-6 text-center shadow-[0_18px_50px_-24px_rgba(13,27,42,0.35)]">
              <p className="font-['Manrope'] font-bold tracking-tight text-xl md:text-2xl text-white">{s.num}</p>
              <p className="font-['Manrope'] text-[10px] md:text-[11px] text-white/50 uppercase tracking-[0.2em] font-semibold mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Journey timeline — alternating left/right around a central drawn line */}
        <div ref={timelineRef} className="relative">
          {/* Central line: static base + scroll-drawn accent (left on mobile, centered on desktop) */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-[18px] md:left-1/2 md:-translate-x-1/2 w-px bg-[#174358]/15" aria-hidden="true" />
          <div ref={progressRef} className="pointer-events-none absolute top-0 bottom-0 left-[18px] md:left-1/2 md:-translate-x-1/2 w-px origin-top bg-gradient-to-b from-[#174358] via-[#174358]/70 to-[#174358]/20" aria-hidden="true" />

          <ol className="relative space-y-12 md:space-y-16">
            {services.map((s, i) => {
              const left = i % 2 === 0; // FIT Packages → left, Experiences → right, …
              return (
                <li
                  key={s.title}
                  data-testid={`service-card-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="relative"
                >
                  {/* Node on the central line */}
                  <span className="tl-node-anim absolute top-5 left-[18px] md:left-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-[#174358] ring-4 ring-[#F4F1E8] shadow-[0_0_0_1px_rgba(23,67,88,0.25)]" aria-hidden="true" />
                  {/* Connector from node toward the card */}
                  <span
                    aria-hidden="true"
                    className={`${left ? "tl-conn-left" : "tl-conn-right"} absolute top-[27px] h-px bg-[#174358]/30 left-[18px] w-7 ${left ? "md:left-auto md:right-1/2 md:w-12" : "md:left-1/2 md:w-12"}`}
                  />

                  {/* Card: full width (mobile, right of line) / half width alternating (desktop) */}
                  <div className={`pl-11 md:pl-0 md:w-1/2 ${left ? "tl-reveal-left md:mr-auto md:pr-14" : "tl-reveal-right md:ml-auto md:pl-14"}`}>
                    <ServiceCard s={s} left={left} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
