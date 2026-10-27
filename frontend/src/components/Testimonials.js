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
    <section data-testid="testimonials-section" className="py-20 md:py-28 overflow-hidden bg-[#F4F1E8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-16 md:mb-20">
        <div className="text-center">
          <p data-reveal className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#174358]/60 mb-5">Testimonials</p>
          <h2 data-reveal data-testid="testimonials-heading" className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl text-[#0D1B2A] leading-tight">
            What Our <em className="not-italic text-[#174358]">Partners</em> Say
          </h2>
        </div>
      </div>
      <div className="relative">
        <div className="flex gap-7 animate-scroll-testimonials" style={{ width: "max-content" }}>
          {doubled.map((t, i) => (
            <div key={`${t.name}-${i}`} data-testid={i < testimonials.length ? `testimonial-${i}` : undefined}
              className="w-[380px] flex-shrink-0 bg-white rounded-[1.25rem] p-9 shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] hover:shadow-[0_26px_60px_-26px_rgba(13,27,42,0.32)] transition-all duration-300">
              <Quote size={28} className="text-[#174358]/20 mb-5" strokeWidth={1.5} />
              <p className="font-['Manrope'] text-sm text-[#0D1B2A]/65 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t border-[#0D1B2A]/[0.08] pt-4">
                <p className="font-['Manrope'] text-sm font-semibold text-[#0D1B2A]">{t.name}</p>
                <p className="font-['Manrope'] text-[11px] text-[#0D1B2A]/45 mt-0.5">{t.role} at {t.company}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#F4F1E8] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#F4F1E8] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
