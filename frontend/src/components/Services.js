import { ArrowRight, Package, Sparkles, Users, Hotel, Plane, Compass, Car, Map } from "lucide-react";

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

export default function Services() {
  return (
    <section id="services" data-testid="services-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#174358]/50 mb-3">Destination Services</p>
          <h2 data-testid="services-heading" className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-[#0D1B2A] mb-4">
            Everything Behind <em className="text-[#174358]">Your Destination Booking</em>
          </h2>
          <p className="text-[#0D1B2A]/60 max-w-2xl mx-auto">The destination services we source and coordinate for the travel trade — bookable in the portal, or arranged with our agent team.</p>
        </div>

        {/* Stats banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16 mt-10">
          {[
            { num: "2,500+", label: "FIT Packages" },
            { num: "500K+", label: "Hotel Properties" },
            { num: "10K+", label: "Curated Experiences" },
            { num: "200+", label: "Airline Partners" },
          ].map((s) => (
            <div key={s.label} data-testid={`service-stat-${s.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-[#174358] rounded-xl p-5 text-center">
              <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-light text-white">{s.num}</p>
              <p className="text-[11px] text-white/50 uppercase tracking-wider font-semibold mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Featured services - first 5 with alternating rows (includes Experiences) */}
        {services.slice(0, 5).map((s, i) => {
          const Icon = s.icon;
          const isEven = i % 2 === 0;
          return (
            <div key={s.title} data-testid={`service-card-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16 last:mb-0">
              <div className={isEven ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#174358]/8 flex items-center justify-center">
                    <Icon size={20} strokeWidth={1.5} className="text-[#174358]" />
                  </div>
                  <div className="bg-[#174358]/8 rounded-full px-4 py-1.5">
                    <span className="text-sm font-bold text-[#174358]">{s.stat}</span>
                    <span className="text-xs text-[#174358]/60 ml-1.5">{s.statLabel}</span>
                  </div>
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-[#0D1B2A] mb-3">{s.title}</h3>
                <p className="text-sm text-[#0D1B2A]/55 leading-relaxed mb-5">{s.desc}</p>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174358] hover:text-[#1e5a75] transition-colors group">
                  Learn more <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <div className={`${isEven ? "order-2 lg:order-2" : "order-2 lg:order-1"}`}>
                <div className="rounded-2xl overflow-hidden img-zoom shadow-lg">
                  <img src={s.image} alt={s.title} className="w-full h-[280px] object-cover" />
                </div>
              </div>
            </div>
          );
        })}

        {/* Compact grid for remaining services */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 pt-16 border-t border-[#0D1B2A]/08">
          {services.slice(5).map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} data-testid={`service-card-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group bg-[#F8FAFB] rounded-xl p-6 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer border border-transparent hover:border-[#174358]/08">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#174358]/8 flex items-center justify-center group-hover:bg-[#174358] transition-colors">
                    <Icon size={18} strokeWidth={1.5} className="text-[#174358] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-bold text-[#174358]">{s.stat} <span className="font-normal text-[#174358]/50">{s.statLabel}</span></span>
                </div>
                <h4 className="font-semibold text-[#0D1B2A] text-sm mb-2">{s.title}</h4>
                <p className="text-xs text-[#0D1B2A]/45 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
