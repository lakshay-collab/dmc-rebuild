import { useEffect, useRef, useState } from "react";
import { Link, useNavigationType } from "react-router-dom";
import { Search, ArrowRight, ChevronDown, X } from "lucide-react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import heroCollage from "../assets/blog-hero-collage.webp";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/* Remember the blog list's filters + scroll so Back returns you where you left */
const RESTORE_KEY = "blogListState";
let spaMounted = false; // false during the first (full page) load, true after the SPA is live
const readSaved = () => {
  try { return JSON.parse(sessionStorage.getItem(RESTORE_KEY) || "{}"); } catch { return {}; }
};
const saveScroll = () => {
  try { sessionStorage.setItem(RESTORE_KEY, JSON.stringify({ ...readSaved(), scrollY: window.scrollY })); } catch {}
};
const clearSavedScroll = () => {
  try { const s = readSaved(); delete s.scrollY; sessionStorage.setItem(RESTORE_KEY, JSON.stringify(s)); } catch {}
};

/* Iconic Unsplash photo per destination — used on the cards and the destination banner */
const DEST_PHOTO = {
  "Egypt": "1503177119275-0aa32b3a9368",
  "Greece": "1570077188670-e3a8d69ac5ff",
  "India": "1564507592333-c60657eea523",
  "Indonesia": "1518548419970-58e3b4079ab2",
  "Japan": "1540959733332-eab4deabeeaf",
  "Maldives": "1514282401047-d79a71a590e8",
  "Mauritius": "1506929562872-bb421503ef21",
  "Morocco": "1489749798305-4fea3ae63d43",
  "South Africa": "1580060839134-75a5edca2e99",
  "Sri Lanka": "1566296314736-6eaac1ca0cb9",
  "Thailand": "1528181304800-259b08848526",
  "UAE": "1512453979798-5ea266f8880c",
  "Global": "1488646953014-85cb44e25828",
};
const destImg = (dest, w = 1000) =>
  DEST_PHOTO[dest] ? `https://images.unsplash.com/photo-${DEST_PHOTO[dest]}?w=${w}&q=80&auto=format&fit=crop` : null;

/* ── Image-overlay article card (Culture-Trip style, Hi DMC colours) ── */
function OverlayCard({ post, large = false }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      data-testid={`blog-card-${post.slug}`}
      onClick={saveScroll}
      className={`group relative block overflow-hidden rounded-2xl ${large ? "aspect-[16/11]" : "aspect-[4/5]"} shadow-sm hover:shadow-xl transition-shadow duration-300`}
    >
      <img
        src={post.image_url}
        alt={post.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/45 to-transparent" />
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <ArrowRight size={15} className="text-white" />
      </div>
      <div className={`absolute left-0 right-0 bottom-0 ${large ? "p-6 md:p-7" : "p-5"}`}>
        <span className="inline-block text-[10px] uppercase tracking-[0.15em] font-semibold text-white/70 mb-2">
          {post.destination} · {post.category}
        </span>
        <h3 className={`font-['Cormorant_Garamond'] font-medium text-white leading-snug ${large ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

/* ── Premium post card: image on top, label + title + arrow below (links to the post) ── */
function PremiumPostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      data-testid={`blog-card-${post.slug}`}
      onClick={saveScroll}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[16/11] shadow-sm">
        <img
          src={post.image_url}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between gap-3 mt-4 pr-0.5">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#174358]/60 mb-1.5">{post.destination} · {post.category}</p>
          <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl font-medium text-[#0D1B2A] leading-snug">{post.title}</h3>
        </div>
        <span className="shrink-0 mt-1 w-10 h-10 rounded-full border border-[#0D1B2A]/15 flex items-center justify-center text-[#174358] group-hover:bg-[#174358] group-hover:text-white group-hover:border-[#174358] transition-colors">
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}

/* ── Destination card: image on top, name + arrow below (opens that destination's blogs) ── */
function DestinationCard({ dest, image, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={`dest-card-${dest.toLowerCase()}`}
      className="group block text-left w-full"
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-sm">
        <img
          src={image}
          alt={dest}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex items-center justify-between gap-3 mt-3.5 pr-0.5">
        <div className="min-w-0">
          <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-[26px] font-medium text-[#0D1B2A] leading-tight truncate">{dest}</h3>
        </div>
        <span className="shrink-0 w-10 h-10 rounded-full border border-[#0D1B2A]/15 flex items-center justify-center text-[#174358] group-hover:bg-[#174358] group-hover:text-white group-hover:border-[#174358] transition-colors">
          <ArrowRight size={16} />
        </span>
      </div>
    </button>
  );
}

export default function BlogPage() {
  // A genuine Back/Forward is a router POP that is NOT the very first full-page load
  // (useNavigationType also reports "POP" on initial loads/reloads). For a hard
  // back_forward the browser's navigation entry confirms it.
  const navType = useNavigationType();
  const navEntry = (typeof performance !== "undefined" && performance.getEntriesByType)
    ? performance.getEntriesByType("navigation")[0] : null;
  const isBack = navType === "POP" && (spaMounted || navEntry?.type === "back_forward");
  const saved = isBack ? readSaved() : {};

  useEffect(() => { spaMounted = true; }, []);

  const [posts, setPosts] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeDestination, setActiveDestination] = useState(saved.activeDestination || "");
  const [activeCategory, setActiveCategory] = useState(saved.activeCategory || "");
  const [searchQuery, setSearchQuery] = useState(saved.searchQuery || "");
  const [loading, setLoading] = useState(true);
  const [floating, setFloating] = useState(false);
  const [destMenu, setDestMenu] = useState(false);
  const resultsRef = useRef(null);
  const restoreScroll = useRef(isBack ? (typeof saved.scrollY === "number" ? saved.scrollY : null) : null);

  // Fresh visit → start at top. Back/Forward → scroll is restored once posts load.
  useEffect(() => {
    if (restoreScroll.current == null) window.scrollTo(0, 0);
  }, []);

  // Keep the active filters saved so Back can return to the same view.
  useEffect(() => {
    try {
      sessionStorage.setItem(RESTORE_KEY, JSON.stringify({ ...readSaved(), activeDestination, activeCategory, searchQuery }));
    } catch {}
  }, [activeDestination, activeCategory, searchQuery]);

  // The filter bar stays permanently pinned; only add a frosted look once scrolled.
  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setLoading(true);
    // Fetch by destination only; category + search are applied client-side so the
    // category options can reflect just what's available for the open destination.
    const params = new URLSearchParams();
    if (activeDestination) params.set("destination", activeDestination);
    axios.get(`${API}/blog?${params.toString()}`)
      .then((r) => {
        setPosts(r.data.posts);
        setDestinations(r.data.destinations);
        setCategories(r.data.categories);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeDestination]);

  // Once the (restored) posts are in, jump back to where the reader left off.
  useEffect(() => {
    if (!loading && restoreScroll.current != null) {
      const y = restoreScroll.current;
      restoreScroll.current = null;
      clearSavedScroll(); // one-shot: later fresh visits start at the top
      requestAnimationFrame(() => window.scrollTo({ top: y, left: 0, behavior: "instant" }));
    }
  }, [loading]);

  const q = searchQuery.trim().toLowerCase();
  const matches = (p) => !q || p.title.toLowerCase().includes(q) || (p.excerpt || "").toLowerCase().includes(q);
  const filtered = posts.filter((p) => matches(p) && (!activeCategory || p.category === activeCategory));

  // Categories available for what's currently loaded (all posts, or just this destination's).
  const availableCategories = Array.from(new Set(posts.map((p) => p.category))).sort();

  // If the active category isn't offered by the open destination, drop it.
  useEffect(() => {
    if (activeCategory && posts.length && !posts.some((p) => p.category === activeCategory)) {
      setActiveCategory("");
    }
  }, [posts]); // eslint-disable-line react-hooks/exhaustive-deps

  const isBrowsing = !activeDestination && !activeCategory && !q;
  const featured = isBrowsing ? filtered.filter((p) => p.featured).slice(0, 3) : [];
  const featuredSlugs = new Set(featured.map((p) => p.slug));
  // One card per destination: a representative image (prefers a featured post) + article count.
  const destCards = isBrowsing
    ? destinations
        .map((d) => {
          const inDest = posts.filter((p) => p.destination === d);
          const cover = inDest.find((p) => p.featured) || inDest[0];
          return { dest: d, image: destImg(d, 800) || cover?.image_url, count: inDest.length };
        })
        .filter((c) => c.count > 0 && c.image)
        .sort((a, b) => b.count - a.count || a.dest.localeCompare(b.dest))
    : [];

  const scrollToResults = () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  return (
    <div data-testid="blog-page" className="min-h-screen bg-white">
      <Navbar forceLight />

      {activeDestination && destImg(activeDestination) ? (
        /* Destination banner — full iconic photo (never cropped), name only */
        <section className="relative overflow-hidden">
          <img
            src={destImg(activeDestination, 1800)}
            alt={activeDestination}
            className="block w-full select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 via-[#0D1B2A]/35 to-[#0D1B2A]/45" aria-hidden="true" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <button
              onClick={() => { setActiveDestination(""); scrollToTop(); }}
              className="mb-5 inline-flex items-center gap-1.5 text-xs font-semibold text-white/85 hover:text-white bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-4 py-2 transition-colors"
            >
              <ArrowRight size={13} className="rotate-180" /> All destinations
            </button>
            <h1 data-testid="blog-heading" className="font-['Manrope'] font-bold tracking-tight text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow">
              {activeDestination}
            </h1>
          </div>
        </section>
      ) : (
        /* Hero — collage banner (full width) with the title overlaid on top */
        <section className="relative overflow-hidden aspect-[16/7] min-h-[360px]" style={{ backgroundColor: "#F4F1E8" }}>
          <img
            src={heroCollage}
            alt="Iconic destinations and wildlife from around the world"
            className="absolute inset-0 w-full h-full object-cover object-[50%_82%] select-none pointer-events-none"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F4F1E8]/70 via-[#F4F1E8]/45 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <h1 data-testid="blog-heading" className="font-['Manrope'] font-bold tracking-tight text-[#0D1B2A] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight [text-shadow:0_2px_16px_rgba(244,241,232,0.95)]">
              Destination Insights by HI DMC
            </h1>
          </div>
        </section>
      )}

      {/* Category bar — premium frosted, hides on scroll down / reveals on scroll up */}
      <section
        className={`sticky top-[60px] z-30 transition-[background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          floating
            ? "bg-white/80 backdrop-blur-xl border-y border-[#0D1B2A]/08 shadow-[0_12px_40px_-16px_rgba(13,27,42,0.18)]"
            : "bg-white border-y border-[#0D1B2A]/06"
        }`}
      >
        <div className="max-w-none mx-auto px-6 md:px-12 py-3 flex items-center gap-2.5 sm:gap-3">
          {/* Search */}
          <div className="relative shrink-0 w-40 sm:w-56">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D1B2A]/30" />
            <input
              data-testid="blog-search"
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") scrollToResults(); }}
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-[#F8FAFB] border border-[#0D1B2A]/08 text-sm text-[#0D1B2A] placeholder:text-[#0D1B2A]/30 focus:outline-none focus:border-[#174358]/30 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0D1B2A]/30 hover:text-[#0D1B2A]/60"><X size={15} /></button>
            )}
          </div>

          {/* Category nav bar — horizontal tabs (not a dropdown) */}
          <div className="blog-tabs-scroll flex-1 min-w-0 overflow-x-auto flex items-center gap-1.5 sm:gap-2">
            <button
              data-testid="cat-tab-all"
              onClick={() => setActiveCategory("")}
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors ${!activeCategory ? "bg-[#174358] text-white" : "text-[#0D1B2A]/60 hover:text-[#174358] hover:bg-[#174358]/08"}`}
            >All</button>
            {availableCategories.map((c) => (
              <button
                key={c}
                data-testid={`cat-tab-${c.toLowerCase()}`}
                onClick={() => setActiveCategory(c)}
                className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors ${activeCategory === c ? "bg-[#174358] text-white" : "text-[#0D1B2A]/60 hover:text-[#174358] hover:bg-[#174358]/08"}`}
              >{c}</button>
            ))}
          </div>

          {/* Destination filter */}
          <div className="relative shrink-0">
            <button
              data-testid="dest-filter-btn"
              onClick={() => setDestMenu((v) => !v)}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 sm:px-4 py-2.5 text-[13px] font-semibold transition-colors ${activeDestination ? "bg-[#174358] text-white border-[#174358]" : "bg-white text-[#0D1B2A]/70 border-[#0D1B2A]/12 hover:border-[#174358]/40"}`}
            >
              <span className="hidden sm:inline">{activeDestination || "Destination"}</span>
              <span className="sm:hidden">{activeDestination || "Dest."}</span>
              <ChevronDown size={14} className={`transition-transform ${destMenu ? "rotate-180" : ""}`} />
            </button>
            {destMenu && (
              <>
                <button aria-hidden className="fixed inset-0 z-40 cursor-default" onClick={() => setDestMenu(false)} />
                <div className="absolute right-0 mt-2 z-50 w-52 max-h-72 overflow-y-auto rounded-2xl bg-white border border-[#0D1B2A]/08 shadow-xl p-1.5">
                  <button data-testid="dest-opt-all" onClick={() => { setActiveDestination(""); setDestMenu(false); scrollToTop(); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${!activeDestination ? "bg-[#174358]/10 text-[#174358]" : "text-[#0D1B2A]/70 hover:bg-[#0D1B2A]/05"}`}>All destinations</button>
                  {destinations.map((d) => (
                    <button key={d} data-testid={`dest-opt-${d.toLowerCase()}`} onClick={() => { setActiveDestination(d); setDestMenu(false); scrollToTop(); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${activeDestination === d ? "bg-[#174358]/10 text-[#174358]" : "text-[#0D1B2A]/70 hover:bg-[#0D1B2A]/05"}`}>{d}</button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <div ref={resultsRef} className="scroll-mt-[120px]">
        {loading ? (
          <div className="flex items-center justify-center py-28"><div className="w-8 h-8 border-2 border-[#174358]/20 border-t-[#174358] rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div data-testid="blog-no-results" className="text-center py-28">
            <p className="text-[#0D1B2A]/40 text-sm mb-2">No articles found.</p>
            <button onClick={() => { setActiveDestination(""); setActiveCategory(""); setSearchQuery(""); }} className="text-xs text-[#174358] font-semibold hover:underline">Clear filters</button>
          </div>
        ) : isBrowsing ? (
          <>
            {/* Featured row */}
            {featured.length > 0 && (
              <section className="py-14 md:py-16 px-6 md:px-12">
                <div className="max-w-none mx-auto">
                  <div className="text-center mb-10">
                    <h2 className="font-['Manrope'] font-medium tracking-tight text-[#0D1B2A] text-2xl sm:text-3xl md:text-4xl leading-tight">Featured Stories</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                    {featured.map((post) => <PremiumPostCard key={post.slug} post={post} />)}
                  </div>
                </div>
              </section>
            )}

            {/* Explore by destination — one card per destination, opens that destination's blogs */}
            {destCards.length > 0 && (
              <section className="pb-16 md:pb-20 px-6 md:px-12">
                <div className="max-w-none mx-auto">
                  <div className="text-center mb-10 border-t border-[#0D1B2A]/08 pt-14">
                    <h2 className="font-['Manrope'] font-medium tracking-tight text-[#0D1B2A] text-2xl sm:text-3xl md:text-4xl leading-tight">Explore by Destination</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-9">
                    {destCards.map((c) => (
                      <DestinationCard key={c.dest} dest={c.dest} image={c.image} count={c.count} onClick={() => { setActiveDestination(c.dest); scrollToTop(); }} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          /* Filtered / search view — single grid */
          <section className="py-14 md:py-16 px-6 md:px-12">
            <div className="max-w-none mx-auto">
              <div className="flex items-end justify-between mb-8">
                <h2 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-light text-[#0D1B2A]">
                  {activeDestination || activeCategory || (q && `“${searchQuery}”`)}
                </h2>
                <button onClick={() => { setActiveDestination(""); setActiveCategory(""); setSearchQuery(""); }} className="shrink-0 text-xs text-[#174358] font-semibold hover:underline">Clear</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filtered.map((post) => <OverlayCard key={post.slug} post={post} />)}
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
