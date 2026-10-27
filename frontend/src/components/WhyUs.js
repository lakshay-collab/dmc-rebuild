import { Globe, Users, Shield, Zap } from "lucide-react";

const reasons = [
  { icon: Users, title: "One Point of Contact", desc: "One DMC relationship for bookings, supplier coordination and assistance." },
  { icon: Globe, title: "Destinations Made Easier", desc: "Sell more destinations without building operations in every market." },
  { icon: Zap, title: "Book Online", desc: "Browse and book available destination products through the agent portal." },
  { icon: Shield, title: "People When You Need Them", desc: "A specialised agent team for custom FIT, groups, MICE and quotations." },
];

export default function WhyUs() {
  return (
    <section id="why-us" data-testid="why-us-section" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#F4F1E8]">
      <div className="max-w-7xl mx-auto">
        {/* Top intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            <div className="group rounded-2xl overflow-hidden shadow-[0_12px_40px_-16px_rgba(13,27,42,0.18)] hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700&q=80" alt="Hi DMC team" className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-[#174358] text-white rounded-2xl p-6 shadow-[0_12px_40px_-16px_rgba(13,27,42,0.4)]">
              <p className="font-['Cormorant_Garamond'] text-4xl font-light">30+</p>
              <p className="text-xs text-white/60 mt-0.5">Years of excellence</p>
            </div>
          </div>
          <div className="font-['Manrope']">
            <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#174358]/60 mb-4">Why Hi DMC</p>
            <h2 data-testid="why-us-heading" className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl font-light text-[#0D1B2A] mb-6 leading-tight">
              One Global DMC. More destinations. <em className="text-[#174358]">Less to manage.</em>
            </h2>
            <p className="text-[#0D1B2A]/60 leading-relaxed mb-5">
              Selling more destinations shouldn't mean more suppliers to manage. Hi DMC brings your destination
              arrangements under one relationship.
            </p>
            <p className="text-sm text-[#0D1B2A]/45 leading-relaxed">
              We contract local transport, accommodation and experience suppliers, then coordinate the ground
              arrangements behind each booking — online when it's simple, with our team when it isn't.
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} data-testid={`why-${r.title.toLowerCase().replace(/\s+/g, '-').slice(0, 20)}`}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-[0_12px_40px_-16px_rgba(13,27,42,0.18)] transition-all duration-300 border border-[#0D1B2A]/[0.04] hover:border-[#174358]/[0.12]">
                <div className="w-14 h-14 rounded-2xl bg-[#174358]/[0.08] flex items-center justify-center mb-5 group-hover:bg-[#174358] transition-colors duration-300">
                  <Icon size={24} strokeWidth={1.5} className="text-[#174358] group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-['Manrope'] text-lg font-bold text-[#0D1B2A] mb-2">{r.title}</h4>
                <p className="font-['Manrope'] text-sm text-[#0D1B2A]/50 leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
