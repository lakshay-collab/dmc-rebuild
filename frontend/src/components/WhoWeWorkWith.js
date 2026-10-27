import { ArrowRight, Briefcase, Building2, Plane, Users } from "lucide-react";
import { Button } from "../components/ui/button";

const segments = [
  { icon: Plane, title: "Travel Agents", desc: "Sell multiple destinations without a supplier list for every trip." },
  { icon: Building2, title: "Travel Companies", desc: "Centralise destination sourcing and booking coordination." },
  { icon: Briefcase, title: "Tour Operators", desc: "FIT and group requirements through one Global DMC." },
  { icon: Users, title: "MICE Specialists", desc: "Ground arrangements for meetings, incentives and events." },
];

export default function WhoWeWorkWith() {
  return (
    <section id="who-we-work-with" data-testid="who-we-work-with-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F4F1E8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-5">
            <p data-reveal className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#174358]/60 mb-5">Who We Work With</p>
            <h2 data-reveal data-testid="who-we-work-with-heading" className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl text-[#0D1B2A] mb-6 leading-tight">
              Built for the businesses that <em className="not-italic text-[#174358]">sell travel.</em>
            </h2>
            <p data-reveal className="font-['Manrope'] text-sm text-[#0D1B2A]/60 leading-relaxed mb-8">
              Every destination booking starts with sourcing. We contract local transport, accommodation and
              experience suppliers and coordinate the services each booking needs — so your agency deals with
              one DMC, not many vendors.
            </p>
            <p data-reveal className="font-['Manrope'] text-xs font-semibold text-[#174358]/70 tracking-wide mb-9">
              Local supplier contracting. Centralised coordination. One partner for the travel trade.
            </p>
            <a data-reveal href="#contact" data-testid="who-we-work-with-cta">
              <Button className="bg-[#174358] text-white hover:bg-[#1e5a75] rounded-full px-8 py-6 font-['Manrope'] text-sm font-semibold shadow-sm transition-all">
                Partner with Hi DMC <ArrowRight size={15} className="ml-2" />
              </Button>
            </a>
          </div>

          <div data-reveal-group className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {segments.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} data-testid={`segment-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group bg-white rounded-[1.25rem] p-8 shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] hover:shadow-[0_26px_60px_-26px_rgba(13,27,42,0.32)] transition-all duration-300 border border-[#0D1B2A]/[0.06] hover:border-[#174358]/20">
                  <div className="w-14 h-14 rounded-full bg-[#174358]/[0.08] flex items-center justify-center mb-6 group-hover:bg-[#174358] transition-colors duration-300">
                    <Icon size={20} strokeWidth={1.5} className="text-[#174358] group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-['Manrope'] font-bold tracking-tight text-2xl text-[#0D1B2A] mb-2">{s.title}</h4>
                  <p className="font-['Manrope'] text-sm text-[#0D1B2A]/50 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
