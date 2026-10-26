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
    <section id="who-we-work-with" data-testid="who-we-work-with-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#174358]/50 mb-3">Who We Work With</p>
            <h2 data-testid="who-we-work-with-heading" className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-[#0D1B2A] mb-6">
              Built for the businesses that <em className="text-[#174358]">sell travel.</em>
            </h2>
            <p className="text-sm text-[#0D1B2A]/55 leading-relaxed mb-8">
              Every destination booking starts with sourcing. We contract local transport, accommodation and
              experience suppliers and coordinate the services each booking needs — so your agency deals with
              one DMC, not many vendors.
            </p>
            <p className="text-xs font-semibold text-[#174358]/70 tracking-wide mb-9">
              Local supplier contracting. Centralised coordination. One partner for the travel trade.
            </p>
            <a href="#contact" data-testid="who-we-work-with-cta">
              <Button className="bg-[#174358] text-white hover:bg-[#1e5a75] rounded-full px-8 py-6 text-sm font-semibold shadow-md transition-all">
                Partner with Hi DMC <ArrowRight size={15} className="ml-2" />
              </Button>
            </a>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {segments.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} data-testid={`segment-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group bg-[#F8FAFB] rounded-2xl p-7 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#174358]/[0.08]">
                  <div className="w-11 h-11 rounded-xl bg-[#174358]/[0.08] flex items-center justify-center mb-5 group-hover:bg-[#174358] transition-colors duration-300">
                    <Icon size={20} strokeWidth={1.5} className="text-[#174358] group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-base font-bold text-[#0D1B2A] mb-2">{s.title}</h4>
                  <p className="text-sm text-[#0D1B2A]/50 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
