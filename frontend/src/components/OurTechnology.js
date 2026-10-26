import { ArrowRight, Check, TrendingUp, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const IMAGES = {
  plan: "https://customer-assets.emergentagent.com/job_8c4b15f3-8e00-4f7a-acca-fa08d90aa8eb/artifacts/gw79q273_Plan.png",
  book: "https://customer-assets.emergentagent.com/job_8c4b15f3-8e00-4f7a-acca-fa08d90aa8eb/artifacts/z7l7l9xo_Create-plan-book-sell-HRZ-Format-%E2%80%93-1920x1080-2nd-vrs.png",
  expand: "https://customer-assets.emergentagent.com/job_8c4b15f3-8e00-4f7a-acca-fa08d90aa8eb/artifacts/bqeqrjk9_expand-3.png",
};

const features = [
  {
    icon: TrendingUp,
    label: "Browse",
    title: "See What's Available",
    desc: "Destination products, accommodation, transfers, tours and experiences across the destinations we service — in one place, under one relationship.",
    image: IMAGES.plan,
    points: ["Destination products across multiple countries", "Accommodation, transfers, tours and experiences", "Your agency terms applied in one portal"],
  },
  {
    icon: Zap,
    label: "Book",
    title: "Book Supported Products Online",
    desc: "Place bookings for products available in the portal. We coordinate the suppliers behind them, so you deal with one partner rather than many.",
    image: IMAGES.book,
    points: ["Book available destination products directly", "One point of contact for the arrangements we make", "Booking support from our agent team when you need it"],
  },
  {
    icon: Globe,
    label: "Ask",
    title: "Send Complex Requirements to Our Team",
    desc: "Custom FIT, ad hoc groups, large groups and MICE need more than a standard booking. Send the brief and our agent team comes back with a quotation.",
    image: IMAGES.expand,
    points: ["Customised FIT and multi-destination requirements", "Ad hoc and large group travel", "MICE programmes coordinated by a dedicated team"],
  },
];

export default function OurTechnology() {
  return (
    <section id="technology" data-testid="technology-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold text-white/40 mb-3">Agent Portal</p>
          <h2 data-testid="technology-heading" className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl font-light text-white mb-5">
            One portal for bookings. <em className="text-white/50">One team</em><br />for everything else.
          </h2>
          <p className="text-white/45 max-w-2xl mx-auto text-base leading-relaxed">
            Browse and book supported destination products in the portal. For custom itineraries, groups and MICE,
            our agent team prepares the quotation and coordinates the destination.
          </p>
        </div>

        {/* Three feature cards with images */}
        <div className="space-y-16 mb-16">
          {features.map((f, idx) => {
            const Icon = f.icon;
            const isReversed = idx % 2 !== 0;
            return (
              <div key={f.label} data-testid={`tech-feature-${f.label.toLowerCase()}`} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className={isReversed ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/08 flex items-center justify-center">
                      <Icon size={18} strokeWidth={1.5} className="text-white/60" />
                    </div>
                    <span className="text-xs tracking-[0.15em] uppercase font-semibold text-white/30">{f.label}</span>
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-white mb-4">{f.title}</h3>
                  <p className="text-white/45 leading-relaxed mb-6 text-sm">{f.desc}</p>
                  <div className="space-y-2.5 mb-6">
                    {f.points.map((p, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-white/08 flex items-center justify-center flex-shrink-0"><Check size={11} className="text-white/60" /></div>
                        <span className="text-sm text-white/50">{p}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/technology" data-testid={`tech-learn-more-${f.label.toLowerCase()}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors group">
                    Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className={isReversed ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
                  <div className="rounded-2xl overflow-hidden border border-white/08 bg-white/04 p-2">
                    <img src={f.image} alt={f.title} className="w-full rounded-xl" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats + CTA */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[{ value: "30+", label: "Years of Excellence" }, { value: "850+", label: "Active Agents" }, { value: "500K+", label: "Live Hotel Rates" }, { value: "99.9%", label: "Platform Uptime" }].map((s) => (
            <div key={s.label} className="bg-white/05 rounded-xl p-6 text-center border border-white/08 hover:border-white/15 transition-all">
              <p className="font-['Cormorant_Garamond'] text-3xl font-light text-white mb-1">{s.value}</p>
              <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#contact" data-testid="technology-cta">
            <Button className="bg-white text-[#174358] hover:bg-white/90 rounded-full px-8 py-5 text-sm font-semibold shadow-lg hover:shadow-xl transition-all">
              Speak to Our Team <ArrowRight size={15} className="ml-2" />
            </Button>
          </a>
          <Link to="/technology" data-testid="technology-explore-cta" className="ml-3">
            <Button variant="outline" className="rounded-full px-8 py-5 text-sm font-semibold border-white/20 text-white hover:bg-white/5 transition-all">
              Explore the Agent Portal <ArrowRight size={15} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
