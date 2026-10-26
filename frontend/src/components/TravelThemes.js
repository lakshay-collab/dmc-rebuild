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
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#174358]/50 mb-3">Curated Experiences</p>
          <h2 data-testid="themes-heading" className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-[#0D1B2A] mb-4">
            Travel <em className="text-[#174358]">Styles</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {themes.map((t) => (
            <div key={t.title} data-testid={`theme-${t.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
              className="group bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="h-48 img-zoom">
                <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-['Cormorant_Garamond'] text-xl font-medium text-[#0D1B2A] mb-1.5">{t.title}</h3>
                <p className="text-xs text-[#0D1B2A]/35 mb-3">{t.desc}</p>
                <p className="text-[10px] text-[#174358]/50 font-semibold uppercase tracking-wider">{t.countries}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
