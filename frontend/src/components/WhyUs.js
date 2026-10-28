const reasons = [
  { title: "One Point of Contact", desc: "One DMC relationship for bookings, supplier coordination and assistance." },
  { title: "Destinations Made Easier", desc: "Sell more destinations without building operations in every market." },
  { title: "Book Online", desc: "Browse and book available destination products through the agent portal." },
  { title: "People When You Need Them", desc: "A specialised agent team for custom FIT, groups, MICE and quotations." },
];

export default function WhyUs() {
  return (
    <section id="why-us" data-testid="why-us-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F4F1E8] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main story — asymmetric editorial split */}
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* Cinematic travel image (~58%), allowed to break left of the grid */}
          <div className="lg:col-span-7 relative">
            <div data-reveal-img className="relative overflow-hidden rounded-sm lg:-ml-12 xl:-ml-24 shadow-[0_30px_80px_-40px_rgba(13,27,42,0.45)]">
              <img
                src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=85&auto=format&fit=crop"
                alt="Cinematic international travel destination"
                className="wu-img-scale w-full h-[400px] md:h-[520px] lg:h-[580px] object-cover"
              />
            </div>
          </div>

          {/* Headline + supporting copy (~42%) */}
          <div className="lg:col-span-5" data-reveal-group>
            <p data-reveal className="font-['Manrope'] text-[11px] tracking-[0.3em] uppercase font-semibold text-[#174358]/70 mb-7">Why Hi DMC</p>
            <h2 data-testid="why-us-heading" className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-[44px] text-[#0D1B2A] leading-[1.12] mb-8">
              <span data-reveal className="block">One Global DMC.</span>
              <span data-reveal className="block">More destinations.</span>
              <span data-reveal className="block">Less to manage.</span>
            </h2>
            <p data-reveal className="font-['Manrope'] text-[#0D1B2A]/65 leading-relaxed mb-5 max-w-md">
              Selling more destinations shouldn't mean more suppliers to manage. Hi DMC brings your destination
              arrangements under one relationship.
            </p>
            <p data-reveal className="font-['Manrope'] text-sm text-[#0D1B2A]/45 leading-relaxed max-w-md">
              We contract local transport, accommodation and experience suppliers, then coordinate the ground
              arrangements behind each booking — online when it's simple, with our team when it isn't.
            </p>
          </div>
        </div>

        {/* Benefits — horizontal editorial story strip (no cards, no icons) */}
        <div className="mt-24 md:mt-36">
          <div className="wu-rule h-px w-full bg-[#0D1B2A]/15 mb-12 md:mb-16" aria-hidden="true" />
          <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                data-testid={`why-${r.title.toLowerCase().replace(/\s+/g, '-').slice(0, 20)}`}
                className="group relative sm:pl-8 lg:pl-10 sm:border-l sm:border-[#0D1B2A]/10 sm:first:border-l-0 sm:first:pl-0 lg:[&:nth-child(odd)]:border-l lg:[&:nth-child(odd)]:border-[#0D1B2A]/10"
              >
                <span className="block font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl text-[#174358]/20 leading-none mb-6 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:text-[#174358]/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-['Manrope'] font-bold text-[13px] tracking-[0.12em] uppercase text-[#0D1B2A] leading-snug transition-transform duration-500 ease-out group-hover:translate-x-1">
                  {r.title}
                </h3>
                <div className="h-px w-8 bg-[#174358]/35 my-4 transition-all duration-500 ease-out group-hover:w-16" aria-hidden="true" />
                <p className="font-['Manrope'] text-sm text-[#0D1B2A]/50 leading-relaxed transition-transform duration-500 ease-out group-hover:translate-x-1">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
