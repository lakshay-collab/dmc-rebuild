import { ArrowRight, Headphones, MonitorCheck } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  { n: "01", title: "Choose your destination", desc: "Browse what's available, or tell us what your customer needs." },
  { n: "02", title: "Book or ask us", desc: "Book eligible products in the portal. For custom FIT, groups and MICE, our team sends a quotation." },
  { n: "03", title: "We coordinate the ground", desc: "We manage the destination suppliers and services covered in your booking." },
  { n: "04", title: "You keep the customer", desc: "The client stays yours. We stay your contact for the destination." },
];

export default function TwoWays() {
  return (
    <section id="how-we-work" data-testid="two-ways-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#174358]/50 mb-3">Two Ways to Work With Us</p>
          <h2 data-testid="two-ways-heading" className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-[#0D1B2A]">
            Book online. Or let our team <em className="text-[#174358]">take it from here.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-24">
          <div data-testid="two-ways-portal" className="group bg-white rounded-2xl p-8 md:p-10 border border-[#0D1B2A]/[0.06] hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#174358]/[0.08] flex items-center justify-center mb-6 group-hover:bg-[#174358] transition-colors duration-300">
              <MonitorCheck size={22} strokeWidth={1.5} className="text-[#174358] group-hover:text-white transition-colors" />
            </div>
            <p className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[#174358]/50 mb-2">Agent Portal</p>
            <h3 className="text-lg md:text-xl font-bold text-[#0D1B2A] mb-3">Book available products directly</h3>
            <p className="text-sm text-[#0D1B2A]/55 leading-relaxed mb-7">
              Browse and book supported destination products in one place.
            </p>
            <Link to="/agent/login" data-testid="two-ways-portal-cta" className="inline-flex items-center gap-2 text-sm font-semibold text-[#174358] hover:text-[#1e5a75] transition-colors">
              Access the Agent Portal <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div data-testid="two-ways-contact-centre" className="group bg-[#174358] rounded-2xl p-8 md:p-10 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.08] flex items-center justify-center mb-6 group-hover:bg-white transition-colors duration-300">
              <Headphones size={22} strokeWidth={1.5} className="text-white group-hover:text-[#174358] transition-colors" />
            </div>
            <p className="text-[11px] tracking-[0.15em] uppercase font-semibold text-white/50 mb-2">Agent Contact Centre</p>
            <h3 className="text-lg md:text-xl font-bold text-white mb-3">Complex requirement? Talk to us.</h3>
            <p className="text-sm text-white/60 leading-relaxed mb-7">
              Custom FIT, ad hoc groups, large groups, MICE. Send the brief — we coordinate the destination
              and come back with a quotation.
            </p>
            <a href="#contact" data-testid="two-ways-contact-cta" className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors">
              Contact Our Team <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* How Hi DMC works */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#174358]/50 mb-3">How Hi DMC Works</p>
          <h2 data-testid="how-it-works-heading" className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-[#0D1B2A]">
            You bring the booking. <em className="text-[#174358]">We manage the destination.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0D1B2A]/[0.08] rounded-2xl overflow-hidden">
          {steps.map((s) => (
            <div key={s.n} data-testid={`how-step-${s.n}`} className="bg-[#F8FAFB] p-8 hover:bg-white transition-colors duration-300">
              <p className="font-['Cormorant_Garamond'] text-3xl font-light text-[#174358]/30 mb-5">{s.n}</p>
              <h4 className="text-base font-bold text-[#0D1B2A] mb-2.5">{s.title}</h4>
              <p className="text-sm text-[#0D1B2A]/50 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
