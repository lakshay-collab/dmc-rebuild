import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ArrowRight } from "lucide-react";
import { useRegion } from "../context/RegionContext";
import axios from "axios";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function GlobalDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeRegion, setActiveRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { config } = useRegion();

  const hideSearch = !!config.hideDestSearch;
  const hideFilters = !!config.hideRegionFilters;

  useEffect(() => {
    axios.get(`${API}/destinations`).then((r) => {
      const all = config.destinations
        ? r.data.filter(d => config.destinations.includes(d.name))
        : r.data;
      setDestinations(all);
      setFiltered(all);
    }).catch(() => {});
  }, [config.code, config.destinations]);

  useEffect(() => {
    let result = destinations;
    if (activeRegion !== "All") {
      result = result.filter((d) => d.region === activeRegion);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((d) =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        (d.region || "").toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [activeRegion, searchQuery, destinations]);

  if (!destinations.length) return null;

  // Group destinations by continent for US/UK view
  const grouped = {};
  if (hideFilters) {
    destinations.forEach(d => {
      const region = d.region || "Other";
      if (!grouped[region]) grouped[region] = [];
      grouped[region].push(d);
    });
  }

  // Derive regions dynamically from actual destination data
  const REGION_ORDER = ["South Asia", "East Asia", "Southeast Asia", "Central Asia", "Middle East", "North Africa", "Africa", "Indian Ocean Islands", "Europe", "South America", "Oceania"];
  const availableRegions = ["All", ...REGION_ORDER.filter(r => destinations.some(d => d.region === r)),
    ...Array.from(new Set(destinations.map(d => d.region).filter(Boolean))).filter(r => !REGION_ORDER.includes(r)).sort()
  ];

  return (
    <section id="explore-destinations" data-testid="global-destinations-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4">Discover</p>
            <h2 data-reveal data-testid="global-destinations-heading" className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl leading-tight text-[#0D1B2A] mb-4">
              More Destinations. <em className="not-italic text-[#174358]">One DMC Relationship.</em>
            </h2>
            <p data-reveal className="font-['Manrope'] text-[#0D1B2A]/60 max-w-lg text-sm leading-relaxed">
              Destinations serviced through Hi DMC's contracted suppliers and booking operations. Need something
              that isn't listed? Send us the enquiry and we'll advise on the options.
            </p>
          </div>
          {!hideSearch && (
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D1B2A]/30" />
              <input data-testid="destination-search" type="text" placeholder="Search destinations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[280px] pl-10 pr-4 py-2.5 rounded-full bg-[#F8FAFB] border border-[#0D1B2A]/08 text-sm text-[#0D1B2A] placeholder:text-[#0D1B2A]/30 focus:outline-none focus:border-[#174358]/30 transition-colors" />
            </div>
          )}
        </div>

        {/* Region filter tabs - same style for all regions */}
        <div className="hidden md:flex items-center gap-2 flex-wrap mb-8">
          {availableRegions.map((r) => (
            <button key={r} data-testid={`region-filter-${r.toLowerCase().replace(/ /g, '-')}`} onClick={() => setActiveRegion(r)}
              className={`px-4 py-2 rounded-full text-[13px] tracking-wide font-semibold transition-all ${
                activeRegion === r ? "bg-[#174358] text-white shadow-sm" : "bg-[#F8FAFB] text-[#0D1B2A]/55 hover:text-[#0D1B2A]/80"
              }`}>{r}</button>
          ))}
        </div>
        <div className="md:hidden mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button data-testid="region-filter-mobile" variant="outline" className="rounded-full text-sm"><Filter size={14} className="mr-2" />{activeRegion}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              {availableRegions.map((r) => (
                <DropdownMenuItem key={r} onClick={() => setActiveRegion(r)} className="cursor-pointer">{r}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {filtered.length === 0 ? (
          <div data-testid="no-results" className="text-center py-16">
            <p className="text-[#0D1B2A]/40 text-sm">No destinations found matching your search.</p>
          </div>
        ) : (
          <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((d) => <DestCard key={d.name} d={d} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function DestCard({ d }) {
  return (
    <Link to={`/destination/${encodeURIComponent(d.name)}`} data-testid={`global-dest-${d.name.toLowerCase().replace(/ /g, '-')}`}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] hover:shadow-[0_28px_70px_-28px_rgba(13,27,42,0.35)] transition-shadow duration-500 group cursor-pointer block">
      <div className="h-56 overflow-hidden">
        <img src={d.image_url} alt={d.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-['Manrope'] font-bold tracking-tight text-2xl text-[#0D1B2A]">{d.name}</h3>
        </div>
        <p className="font-['Manrope'] text-xs text-[#0D1B2A]/60 leading-relaxed line-clamp-2 mb-4">{d.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-[#0D1B2A]/06">
          <span className="text-xs text-[#174358]/50 font-semibold uppercase tracking-wider">{d.region}</span>
          <span className="text-xs font-semibold text-[#174358] group-hover:text-[#1e5a75] inline-flex items-center gap-1 transition-colors">
            View <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
