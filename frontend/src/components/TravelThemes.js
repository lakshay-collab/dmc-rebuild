import { useRegion } from "../context/RegionContext";

const indiaThemes = [
  { title: "Safari & Wildlife", desc: "Big Five encounters, gorilla treks, and immersive wildlife experiences.", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&q=80", countries: "Kenya, Tanzania, South Africa" },
  { title: "Northern Lights", desc: "Chase the aurora across Iceland, Norway, and Finland.", image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=500&q=80", countries: "Iceland, Norway, Finland" },
  { title: "Honeymoon & Romance", desc: "Overwater villas, private dinners, and sunset cruises.", image: "https://images.unsplash.com/photo-1439130490301-25e322d88054?w=500&q=80", countries: "Maldives, Greece, Italy" },
  { title: "Adventure & Outdoors", desc: "Treks, bungee jumps, and adrenaline-charged itineraries.", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80", countries: "New Zealand, Peru, Iceland" },
  { title: "Cultural Immersions", desc: "Tea ceremonies, cooking classes, and temple tours.", image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=500&q=80", countries: "Japan, Morocco, Indonesia" },
  { title: "Luxury & Wellness", desc: "World-class spas, retreats, and private island escapes.", image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&q=80", countries: "Maldives, Thailand, UAE" },
];

const usUkThemes = [
  { title: "Safari & Wildlife", desc: "Big Five encounters, jungle safaris, and immersive wildlife experiences across Asia and Africa.", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&q=80", countries: "Sri Lanka, India, Nepal" },
  { title: "Honeymoon & Romance", desc: "Private villas, candlelit dinners on the beach, and sunset cruises on the Nile.", image: "https://images.unsplash.com/photo-1439130490301-25e322d88054?w=500&q=80", countries: "Sri Lanka, Egypt, Vietnam" },
  { title: "Luxury & Wellness", desc: "Ayurvedic retreats, world-class spas, and private island escapes.", image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&q=80", countries: "Sri Lanka, India, UAE" },
  { title: "Cultural Immersions", desc: "Tea ceremonies, temple trails, and cooking classes with local families.", image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=500&q=80", countries: "Japan, Cambodia, India" },
  { title: "Adventure & Outdoors", desc: "Himalayan treks, desert safaris, and whitewater rafting.", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80", countries: "Nepal, Jordan, Vietnam" },
  { title: "Beach & Island Escapes", desc: "Pristine coastlines, turquoise lagoons, and laidback tropical getaways.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80", countries: "Sri Lanka, Vietnam, Cambodia" },
];

export default function TravelThemes() {
  const { config } = useRegion();
  const isUsUk = config.code === "us" || config.code === "uk";
  const themes = isUsUk ? usUkThemes : indiaThemes;

  return (
    <section id="themes" data-testid="travel-themes-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-5">Curated Experiences</p>
          <h2 data-reveal data-testid="themes-heading" className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl text-[#0D1B2A] mb-4 leading-tight">
            Travel <em className="text-[#174358]">Styles</em>
          </h2>
        </div>
        <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {themes.map((t) => (
            <div key={t.title} data-testid={`theme-${t.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
              className="group relative rounded-2xl overflow-hidden shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] transition-shadow duration-500 cursor-pointer h-80 md:h-96">
              <img src={t.image} alt={t.title} data-parallax="20" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 font-['Manrope']">
                <p className="text-[11px] text-white/70 font-semibold uppercase tracking-[0.2em] mb-2">{t.countries}</p>
                <h3 className="font-['Manrope'] font-bold tracking-tight text-2xl text-white mb-1.5">{t.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
