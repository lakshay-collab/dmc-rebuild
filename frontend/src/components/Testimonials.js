import { Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah Mitchell", role: "Director of Operations", company: "Wanderlux Travel", quote: "We've been routing all our India bookings through Hi DMC for three years. Their ground handling in Rajasthan and Kerala is impeccable — every hotel, every transfer, every guide is top-notch." },
  { name: "Carlos Vega", role: "CEO", company: "Horizonte Tours", quote: "Hi DMC handled an ad hoc group of 120 for our corporate incentive trip to Dubai. Flawless logistics from airport to farewell dinner. Our clients gave it a standing ovation." },
  { name: "Aisha Rahman", role: "Head of Partnerships", company: "NextGen Holidays", quote: "We book all our Europe tours through Hi DMC — Greece, Portugal, Iceland. The local teams in each destination make all the difference. Our repeat booking rate has tripled." },
  { name: "James Crawford", role: "Managing Director", company: "Pacific Journeys", quote: "The experiences Hi DMC curates are what sets us apart from competitors. From private temple visits in Japan to desert safaris in Morocco — our clients are always blown away." },
  { name: "Elena Petrov", role: "VP Sales", company: "EuroStar Travels", quote: "We needed a last-minute group tour for 50 to Thailand. Hi DMC turned it around in 48 hours with premium hotels and a detailed day-by-day itinerary. Outstanding." },
  { name: "Ravi Menon", role: "Founder", company: "Spice Route Holidays", quote: "Hi DMC is our go-to for Maldives and Indonesia. The resort partnerships they have mean we consistently get the best rates and upgrades for our honeymoon clients." },
  { name: "Lena Svensson", role: "Operations Head", company: "Nordic Adventures", quote: "Booking MICE events through Hi DMC takes the stress away completely. They managed a 200-person conference in Dubai — venue, catering, team-building — all seamlessly coordinated." },
  { name: "David Okonkwo", role: "CEO", company: "Sahara Expeditions", quote: "What I love about working with Hi DMC is the transparency. No hidden charges, clear commission structure, and a dedicated account manager who actually picks up the phone." },
];

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials];
  return (
    <section data-testid="testimonials-section" className="py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-10">
        <div className="text-center">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#174358]/50 mb-3">Testimonials</p>
          <h2 data-testid="testimonials-heading" className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-[#0D1B2A] mb-3">
            What Our <em className="text-[#174358]">Partners</em> Say
          </h2>
        </div>
      </div>
      <div className="relative">
        <div className="flex gap-5 animate-scroll-testimonials" style={{ width: "max-content" }}>
          {doubled.map((t, i) => (
            <div key={`${t.name}-${i}`} data-testid={i < testimonials.length ? `testimonial-${i}` : undefined}
              className="w-[360px] flex-shrink-0 bg-[#F8FAFB] rounded-xl p-6 hover:bg-white hover:shadow-sm transition-all">
              <Quote size={18} className="text-[#174358]/15 mb-3" strokeWidth={1.5} />
              <p className="text-sm text-[#0D1B2A]/60 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t border-[#0D1B2A]/08 pt-3">
                <p className="text-sm font-semibold text-[#0D1B2A]">{t.name}</p>
                <p className="text-[11px] text-[#0D1B2A]/40 mt-0.5">{t.role} at {t.company}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
