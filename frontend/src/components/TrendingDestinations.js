import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRegion } from "../context/RegionContext";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FEATURED_DESTINATIONS = ["Egypt", "Japan", "Sri Lanka", "Vietnam", "Bhutan", "Kazakhstan"];
const EUROPE_IMG = "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80";

// Iconic Unsplash photo per destination (same approach as the blog) — falls back to the API image.
const DEST_IMG = {
  "Egypt": "1503177119275-0aa32b3a9368",
  "Japan": "1540959733332-eab4deabeeaf",
  "Sri Lanka": "1566296314736-6eaac1ca0cb9",
  "Vietnam": "1528127269322-539801943592",
  "Bhutan": "1558005530-a7958896ec60",
};
const destImg = (d) => (DEST_IMG[d.name] ? `https://images.unsplash.com/photo-${DEST_IMG[d.name]}?w=1100&q=80&auto=format&fit=crop` : d.image_url);

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
      <div className="max-w-7xl mx-auto mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p data-reveal className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#174358]/60 mb-5">Our Key DMC Destinations</p>
          <h2 data-reveal data-testid="trending-heading" className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl text-[#0D1B2A] mb-5 leading-tight">
            Destinations We <em className="not-italic text-[#174358]">Champion</em>
          </h2>
          <p data-reveal className="font-['Manrope'] text-[#0D1B2A]/60 max-w-lg leading-relaxed">Hand-picked destinations where our on-ground DMC teams deliver exceptional experiences for your clients.</p>
        </div>
        <a data-reveal href="#explore-destinations" className="hidden md:inline-flex items-center gap-2 font-['Manrope'] text-sm font-semibold text-[#174358] hover:text-[#1e5a75] transition-colors whitespace-nowrap group">
          View all destinations <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
      <div data-reveal-group className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-9">
        {destinations.map((d) => (
          <Link to={`/destination/${encodeURIComponent(d.name)}`} key={d.name} data-testid={`destination-card-${d.name.toLowerCase()}`} className="group block">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-[0_18px_50px_-24px_rgba(13,27,42,0.22)]">
              <img src={destImg(d)} alt={d.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex items-center justify-between gap-3 mt-4 pr-0.5">
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#174358]/60 mb-1">{d.region}</p>
                <h3 className="font-['Manrope'] font-bold tracking-tight text-xl md:text-2xl text-[#0D1B2A] truncate">{d.name}</h3>
              </div>
              <span className="shrink-0 w-10 h-10 rounded-full border border-[#0D1B2A]/15 flex items-center justify-center text-[#174358] group-hover:bg-[#174358] group-hover:text-white group-hover:border-[#174358] transition-colors">
                <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        ))}
        {showEurope && (
          <Link to="/destination/Europe" data-testid="destination-card-europe" className="group block">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-[0_18px_50px_-24px_rgba(13,27,42,0.22)]">
              <img src={EUROPE_IMG} alt="Europe" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex items-center justify-between gap-3 mt-4 pr-0.5">
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#174358]/60 mb-1">20+ Countries</p>
                <h3 className="font-['Manrope'] font-bold tracking-tight text-xl md:text-2xl text-[#0D1B2A] truncate">Europe</h3>
              </div>
              <span className="shrink-0 w-10 h-10 rounded-full border border-[#0D1B2A]/15 flex items-center justify-center text-[#174358] group-hover:bg-[#174358] group-hover:text-white group-hover:border-[#174358] transition-colors">
                <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
