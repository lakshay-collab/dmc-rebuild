import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRegion } from "../context/RegionContext";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FEATURED_DESTINATIONS = ["Egypt", "Japan", "Sri Lanka", "Vietnam", "Bhutan", "Kazakhstan"];
const EUROPE_IMG = "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80";

export default function TrendingDestinations() {
  const [destinations, setDestinations] = useState([]);
  const { config } = useRegion();
  const showEurope = !config.destinations || config.destinations.includes("Europe");

  useEffect(() => { axios.get(`${API}/destinations`).then((r) => {
    const all = config.destinations
      ? r.data.filter(d => config.destinations.includes(d.name))
      : r.data;
    const featured = FEATURED_DESTINATIONS.map(n => all.find(d => d.name === n)).filter(Boolean);
    setDestinations(featured.slice(0, 6));
  }).catch(() => {}); }, [config.code, config.destinations]);

  if (config.hideTrending) return null;
  if (!destinations.length) return null;

  return (
    <section id="destinations" data-testid="trending-destinations-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#174358]/50 mb-3">Our Key DMC Destinations</p>
          <h2 data-testid="trending-heading" className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-[#0D1B2A] mb-3">
            Destinations We <em className="text-[#174358]">Champion</em>
          </h2>
          <p className="text-[#0D1B2A]/55 max-w-lg">Hand-picked destinations where our on-ground DMC teams deliver exceptional experiences for your clients.</p>
        </div>
        <a href="#explore-destinations" className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-[#174358] hover:text-[#1e5a75] transition-colors whitespace-nowrap group">
          View all destinations <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
        {destinations[0] && (
          <Link to={`/destination/${encodeURIComponent(destinations[0].name)}`} data-testid={`destination-card-${destinations[0].name.toLowerCase()}`}
            className="md:col-span-7 md:row-span-2 relative group rounded-2xl overflow-hidden img-zoom cursor-pointer block" style={{ minHeight: "460px" }}>
            <img src={destinations[0].image_url} alt={destinations[0].name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-[#0D1B2A]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/60 font-semibold">{destinations[0].region}</span>
              <h3 className="font-['Cormorant_Garamond'] text-4xl font-light text-white mt-1">{destinations[0].name}</h3>
              <p className="text-white/65 text-sm mt-2 max-w-sm leading-relaxed">{destinations[0].description}</p>
            </div>
          </Link>
        )}
        {destinations.slice(1, 3).map((d) => (
          <Link to={`/destination/${encodeURIComponent(d.name)}`} key={d.name} data-testid={`destination-card-${d.name.toLowerCase()}`}
            className="md:col-span-5 relative group rounded-2xl overflow-hidden img-zoom cursor-pointer block" style={{ minHeight: "222px" }}>
            <img src={d.image_url} alt={d.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/85 via-[#0D1B2A]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/55 font-semibold">{d.region}</span>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white">{d.name}</h3>
              <p className="text-white/60 text-sm mt-1 line-clamp-1">{d.description}</p>
            </div>
          </Link>
        ))}
        {destinations.slice(3, 6).map((d) => (
          <Link to={`/destination/${encodeURIComponent(d.name)}`} key={d.name} data-testid={`destination-card-${d.name.toLowerCase()}`}
            className="md:col-span-4 relative group rounded-2xl overflow-hidden img-zoom cursor-pointer block" style={{ minHeight: "240px" }}>
            <img src={d.image_url} alt={d.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/85 via-[#0D1B2A]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/55 font-semibold">{d.region}</span>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white">{d.name}</h3>
              <p className="text-white/60 text-sm mt-1 line-clamp-1">{d.description}</p>
            </div>
          </Link>
        ))}
        {/* Europe featured card */}
        {showEurope && (
        <Link to="/destination/Europe" data-testid="destination-card-europe"
          className="md:col-span-12 relative group rounded-2xl overflow-hidden img-zoom cursor-pointer block" style={{ minHeight: "200px" }}>
          <img src={EUROPE_IMG} alt="Europe" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/85 via-[#0D1B2A]/50 to-[#0D1B2A]/20" />
          <div className="absolute inset-0 flex items-center px-8 md:px-12 z-10">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-semibold">20+ Countries</span>
              <h3 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-light text-white mt-1">Europe</h3>
              <p className="text-white/55 text-sm mt-2 max-w-md">France, Italy, Switzerland, Spain, UK, Germany, Scandinavia — one DMC partnership for all of Europe.</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 mt-3 group-hover:text-white transition-colors">
                Explore Europe <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </Link>
        )}
      </div>
    </section>
  );
}
