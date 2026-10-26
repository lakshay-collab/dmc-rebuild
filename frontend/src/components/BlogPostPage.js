import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Tag, User, X } from "lucide-react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/* Verified Unsplash photos, keyed to the specific place/attraction/experience shown. */
const IMG = {
  taj: "1564507592333-c60657eea523",        // Taj Mahal / Agra
  hawaMahal: "1477587458883-47145ed94245",  // Jaipur (Hawa Mahal)
  tiger: "1549480017-d76466a4b7e8",          // Bengal tiger (Ranthambore / Corbett)
  safari: "1516426122078-c23e76319801",      // Safari jeep & wildlife
  kerala: "1602216056096-3b40cc0c9944",      // Kerala backwaters houseboat
  goa: "1587922546307-776227941871",         // Goa beach
  varanasi: "1561361058-c24cecae35ca",       // Varanasi ghats
  delhi: "1587474260584-136574528ed5",       // Delhi (India Gate)
  dunes: "1509316785289-025f5b846b35",       // Desert dunes (Jaisalmer / desert safari / Sahara)
  burj: "1512453979798-5ea266f8880c",        // Dubai (Burj Khalifa)
  burjAlArab: "1518684079-3c830dcef090",     // Jumeirah / Palm (Burj Al Arab)
  maldives: "1514282401047-d79a71a590e8",    // Maldives overwater
  mauritius: "1506929562872-bb421503ef21",   // Mauritius lagoon
  slTrain: "1566296314736-6eaac1ca0cb9",     // Sri Lanka hill-country train (Ella / Nuwara Eliya)
  thai: "1528181304800-259b08848526",        // Thailand temple
  bali: "1518548419970-58e3b4079ab2",        // Bali (Tanah Lot)
  rice: "1555400038-63f5ba517a47",           // Bali rice terraces (Ubud)
  egypt: "1503177119275-0aa32b3a9368",       // Egypt pyramids
  santorini: "1570077188670-e3a8d69ac5ff",   // Santorini
  acropolis: "1555993539-1732b0258235",      // Acropolis / Athens
  fuji: "1540959733332-eab4deabeeaf",        // Mount Fuji
  tokyo: "1536098561742-ca998e48cbcc",       // Tokyo skyline
  morocco: "1489749798305-4fea3ae63d43",     // Morocco kasbah
  marrakech: "1539020140153-e479b8c22e70",   // Marrakech (Moroccan architecture)
  capeTown: "1580060839134-75a5edca2e99",    // Cape Town / Table Mountain
};

// Destination-level fallback image (one per blog) — always correct for the blog's country.
const DEST_PHOTO = {
  "Egypt": IMG.egypt, "Greece": IMG.santorini, "India": IMG.taj, "Indonesia": IMG.bali, "Japan": IMG.fuji,
  "Maldives": IMG.maldives, "Mauritius": IMG.mauritius, "Morocco": IMG.morocco, "South Africa": IMG.capeTown,
  "Sri Lanka": IMG.slTrain, "Thailand": IMG.thai, "UAE": IMG.burj, "Global": "1488646953014-85cb44e25828",
};

// Place/attraction keywords → image. Ordered most-specific first; matched on whole words.
const KEYWORD_IMAGE = [
  ["taj mahal", IMG.taj], ["agra", IMG.taj],
  ["hawa mahal", IMG.hawaMahal], ["amber fort", IMG.hawaMahal], ["city palace", IMG.hawaMahal], ["jaipur", IMG.hawaMahal],
  ["ranthambore", IMG.tiger], ["jim corbett", IMG.tiger], ["corbett", IMG.tiger], ["tiger", IMG.tiger],
  ["kaziranga", IMG.safari], ["yala", IMG.safari], ["kruger", IMG.safari], ["wildlife safari", IMG.safari],
  ["backwater", IMG.kerala], ["alleppey", IMG.kerala], ["kumarakom", IMG.kerala], ["munnar", IMG.kerala], ["kerala", IMG.kerala],
  ["goa", IMG.goa], ["varanasi", IMG.varanasi],
  ["jaisalmer", IMG.dunes], ["thar desert", IMG.dunes],
  ["india gate", IMG.delhi], ["delhi", IMG.delhi],
  ["rajasthan", IMG.hawaMahal],
  ["palm jumeirah", IMG.burjAlArab], ["burj al arab", IMG.burjAlArab], ["jumeirah", IMG.burjAlArab],
  ["desert safari", IMG.dunes], ["dune bashing", IMG.dunes], ["empty quarter", IMG.dunes], ["liwa", IMG.dunes],
  ["burj khalifa", IMG.burj], ["downtown dubai", IMG.burj], ["dubai", IMG.burj],
  ["overwater", IMG.maldives], ["maldives", IMG.maldives], ["atoll", IMG.maldives],
  ["le morne", IMG.mauritius], ["tamarin", IMG.mauritius], ["mauritius", IMG.mauritius],
  ["nine arch", IMG.slTrain], ["nuwara eliya", IMG.slTrain], ["ella", IMG.slTrain], ["hill country", IMG.slTrain], ["sri lanka", IMG.slTrain],
  ["bangkok", IMG.thai], ["chiang mai", IMG.thai], ["thailand", IMG.thai],
  ["ubud", IMG.rice], ["rice terrace", IMG.rice], ["tanah lot", IMG.bali], ["uluwatu", IMG.bali], ["seminyak", IMG.bali], ["bali", IMG.bali], ["indonesia", IMG.bali],
  ["pyramid", IMG.egypt], ["giza", IMG.egypt], ["sphinx", IMG.egypt], ["cairo", IMG.egypt], ["egypt", IMG.egypt],
  ["acropolis", IMG.acropolis], ["athens", IMG.acropolis], ["santorini", IMG.santorini], ["mykonos", IMG.santorini], ["greece", IMG.santorini],
  ["mount fuji", IMG.fuji], ["mt fuji", IMG.fuji], ["fuji", IMG.fuji], ["tokyo", IMG.tokyo],
  ["marrakech", IMG.marrakech], ["sahara", IMG.dunes], ["morocco", IMG.morocco],
  ["table mountain", IMG.capeTown], ["cape town", IMG.capeTown], ["garden route", IMG.capeTown], ["stellenbosch", IMG.capeTown], ["south africa", IMG.capeTown],
  ["safari", IMG.safari],
].map(([kw, id]) => [new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i"), id, kw]);

const uImg = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

// Find the image whose place is named in this section's text (heading + body).
function matchPlaceImage(text) {
  if (!text) return null;
  for (const [re, id, kw] of KEYWORD_IMAGE) {
    if (re.test(text)) return { id, alt: kw };
  }
  return null;
}

/* Interactive custom scrollbar on the right: click the track or drag the thumb to scroll */
function SideScrollBar() {
  const [m, setM] = useState({ top: 0, h: 48, show: false });
  const trackRef = useRef(null);
  const dragging = useRef(false);

  const recalc = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const trackH = window.innerHeight;
    const thumbH = Math.max(48, trackH * (window.innerHeight / doc.scrollHeight));
    const frac = scrollable > 0 ? window.scrollY / scrollable : 0;
    setM({ top: frac * (trackH - thumbH), h: thumbH, show: scrollable > 40 });
  };

  useEffect(() => {
    recalc();
    const id = setTimeout(recalc, 300); // after content/images lay out
    window.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", recalc);
    return () => { clearTimeout(id); window.removeEventListener("scroll", recalc); window.removeEventListener("resize", recalc); };
  }, []);

  const scrollToClientY = (clientY) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const thumbH = m.h;
    let frac = (clientY - rect.top - thumbH / 2) / (rect.height - thumbH);
    frac = Math.min(1, Math.max(0, frac));
    window.scrollTo({ top: frac * scrollable, behavior: "instant" });
  };

  const onThumbDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dragging.current = true;
    document.body.style.userSelect = "none";
    const move = (ev) => { if (dragging.current) scrollToClientY(ev.clientY); };
    const up = () => {
      dragging.current = false;
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  if (!m.show) return null;
  return (
    <div
      ref={trackRef}
      onClick={(e) => scrollToClientY(e.clientY)}
      className="fixed top-0 right-0 bottom-0 z-[100] w-2.5 bg-[#0D1B2A]/06 cursor-pointer hidden md:block"
      aria-hidden="true"
    >
      <div
        onPointerDown={onThumbDown}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 w-full rounded-full bg-[#174358] hover:bg-[#1e5a75] active:cursor-grabbing cursor-grab transition-colors"
        style={{ height: `${m.h}px`, top: `${m.top}px` }}
      />
    </div>
  );
}

/* A single wide, relevant image shown inside the article */
function SectionImage({ id, alt }) {
  return (
    <figure className="my-9 overflow-hidden rounded-2xl shadow-sm">
      <img src={uImg(id)} alt={alt} loading="lazy" className="w-full aspect-[16/9] object-cover" />
    </figure>
  );
}

const PHONE_CODES = [
  { code: "+91", flag: "🇮🇳" }, { code: "+971", flag: "🇦🇪" }, { code: "+44", flag: "🇬🇧" },
  { code: "+1", flag: "🇺🇸" }, { code: "+61", flag: "🇦🇺" }, { code: "+65", flag: "🇸🇬" },
  { code: "+49", flag: "🇩🇪" }, { code: "+33", flag: "🇫🇷" }, { code: "+39", flag: "🇮🇹" },
];

/* Quote-request modal — destination auto-filled, image changes per destination */
function QuoteModal({ destination, subtitle, onClose }) {
  const [name, setName] = useState("");
  const [agency, setAgency] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const img = DEST_PHOTO[destination] ? uImg(DEST_PHOTO[destination], 1000) : null;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !agency.trim() || !/\S+@\S+\.\S+/.test(email)) { setStatus("error"); return; }
    setStatus("sending");
    const [first, ...rest] = name.trim().split(/\s+/);
    try {
      await axios.post(`${API}/inquiries`, {
        first_name: first,
        last_name: rest.join(" ") || "-",
        agency_name: agency.trim(),
        email: email.trim(),
        phone_code: code,
        phone: phone.trim(),
        destination,
        source_page: `Blog - ${destination}`,
        form_type: "Blog Quote",
        comments: `Quote request from the ${destination} blog.`,
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const field = "w-full px-5 py-3.5 rounded-full bg-[#F4F1E8]/70 border border-[#0D1B2A]/08 text-sm text-[#0D1B2A] placeholder:text-[#0D1B2A]/40 focus:outline-none focus:border-[#174358]/40 focus:bg-white transition-colors";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Get a ${destination} quote`}>
      <div className="absolute inset-0 bg-[#0D1B2A]/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 animate-fadeInUp" style={{ animationDuration: "250ms" }}>
        {/* Left — destination image */}
        <div className="relative hidden md:block min-h-[420px]">
          {img && <img src={img} alt={destination} className="absolute inset-0 w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-[#0D1B2A]/30 to-[#0D1B2A]/20" />
          <div className="absolute bottom-0 left-0 p-8">
            <p className="text-[11px] tracking-[0.22em] uppercase text-white/70 font-semibold mb-2">Customise your</p>
            <h3 className="font-['Cormorant_Garamond'] text-4xl font-light text-white leading-tight">{destination} holiday</h3>
            {subtitle && <p className="text-white/60 text-sm mt-2">{subtitle}</p>}
          </div>
        </div>

        {/* Right — form */}
        <div className="p-7 sm:p-9 relative">
          <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0D1B2A]/05 hover:bg-[#0D1B2A]/10 flex items-center justify-center text-[#0D1B2A]/60 transition-colors z-10">
            <X size={18} />
          </button>

          {status === "done" ? (
            <div className="py-20 text-center px-4">
              <h3 className="font-['Cormorant_Garamond'] text-3xl text-[#0D1B2A] mb-2">Thank you!</h3>
              <p className="text-sm text-[#0D1B2A]/50">Our {destination} team will be in touch with you shortly.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3.5 mt-8 md:mt-10">
              <p className="md:hidden font-['Cormorant_Garamond'] text-2xl text-[#0D1B2A] mb-1">Customise your <span className="text-[#174358]">{destination} holiday</span></p>
              <input data-testid="quote-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={field} />
              <input data-testid="quote-agency" value={agency} onChange={(e) => setAgency(e.target.value)} placeholder="Agency name" className={field} />
              <div className="flex gap-2">
                <select value={code} onChange={(e) => setCode(e.target.value)} className="shrink-0 rounded-full bg-[#F4F1E8]/70 border border-[#0D1B2A]/08 text-sm text-[#0D1B2A] px-3 py-3.5 focus:outline-none focus:border-[#174358]/40">
                  {PHONE_CODES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                </select>
                <input data-testid="quote-phone" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="Enter your phone number" className={`flex-1 ${field}`} />
              </div>
              <input data-testid="quote-email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" className={field} />
              <button data-testid="quote-submit" type="submit" disabled={status === "sending"} className="w-full py-4 rounded-full bg-[#0D1B2A] text-white font-semibold hover:bg-[#174358] disabled:opacity-60 transition-colors">
                {status === "sending" ? "Sending…" : "Get my quote"}
              </button>
              {status === "error" && <p className="text-xs text-red-500 text-center">Please enter your name, agency name and a valid email address.</p>}
              <p className="text-center text-xs text-[#0D1B2A]/40">Free, no obligation. We never share your details.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    axios.get(`${API}/blog/${slug}`)
      .then((r) => setPost(r.data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-white"><Navbar /><div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-2 border-[#174358]/20 border-t-[#174358] rounded-full animate-spin" /></div></div>
  );

  if (!post) return (
    <div className="min-h-screen bg-white"><Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#0D1B2A]">Article not found</h2>
        <Link to="/blog" className="text-sm text-[#174358] hover:underline">Back to Blog</Link>
      </div>
    </div>
  );

  return (
    <div data-testid="blog-post-page" className="min-h-screen bg-white">
      <Navbar />

      {/* Interactive scrollbar on the right — click the track or drag the thumb to scroll */}
      <SideScrollBar />

      {/* Hero Image */}
      <section className="relative h-[400px] md:h-[480px] overflow-hidden">
        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 via-[#0D1B2A]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-4xl mx-auto px-6 md:px-12 pb-12">
          <Link to="/blog" data-testid="back-to-blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm font-medium mb-5 transition-colors">
            <ArrowLeft size={16} /> Blog
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] bg-white/15 text-white/80 px-3 py-1 rounded-full font-semibold uppercase tracking-wider flex items-center gap-1">
              <MapPin size={9} /> {post.destination}
            </span>
            <span className="text-[10px] bg-white/10 text-white/60 px-3 py-1 rounded-full font-semibold uppercase tracking-wider flex items-center gap-1">
              <Tag size={9} /> {post.category}
            </span>
          </div>
          <h1 data-testid="post-title" className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">{post.title}</h1>
        </div>
      </section>

      {/* Article Meta */}
      <section className="border-b border-[#0D1B2A]/06">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-5 flex items-center gap-6 text-xs text-[#0D1B2A]/40">
          <span className="flex items-center gap-1.5"><User size={12} /> {post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.created_at ? new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : ""}</span>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-base md:text-lg text-[#0D1B2A]/70 font-medium leading-relaxed mb-10 border-l-4 border-[#174358]/20 pl-5 italic">{post.excerpt}</p>
          <div className="blog-content">
            <RichContent content={post.content} post={post} />
          </div>
        </div>
      </article>

      {/* Bottom CTA — opens the quote form (destination auto-filled) */}
      <section className="py-12 px-6 md:px-12 bg-[#F8FAFB] border-t border-[#0D1B2A]/05">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#0D1B2A] mb-1">Planning a trip to {post.destination}?</p>
            <p className="text-xs text-[#0D1B2A]/40">Tell us a little about it and our {post.destination} team will craft a tailored quote.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setQuoteOpen(true)} data-testid="open-quote" className="bg-[#0D1B2A] text-white hover:bg-[#174358] rounded-full px-6 py-2.5 text-xs font-semibold transition-colors">
              Get my {post.destination} quote
            </button>
            <Link to="/blog" className="border border-[#0D1B2A]/15 text-[#0D1B2A]/60 hover:text-[#0D1B2A] rounded-full px-6 py-2.5 text-xs font-semibold transition-colors">
              More Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Floating quote button — always visible bottom-right */}
      {!quoteOpen && (
        <button
          onClick={() => setQuoteOpen(true)}
          data-testid="floating-quote"
          className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[90] bg-[#0D1B2A] text-white rounded-full px-5 md:px-6 py-3.5 text-sm font-semibold shadow-[0_12px_30px_-8px_rgba(13,27,42,0.5)] hover:bg-[#174358] transition-colors"
        >
          Get my quote
        </button>
      )}

      {quoteOpen && <QuoteModal destination={post.destination} subtitle={post.category} onClose={() => setQuoteOpen(false)} />}

      <Footer />
    </div>
  );
}


/** Inline formatter: **bold**, *italic*, `code` */
function formatInline(text) {
  const parts = [];
  let remaining = text;
  let key = 0;
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(remaining)) !== null) {
    if (match.index > lastIndex) parts.push(remaining.slice(lastIndex, match.index));
    if (match[2] && match[3]) parts.push(<a key={key++} href={match[3]} target="_blank" rel="noopener noreferrer" className="text-[#174358] underline underline-offset-2 decoration-[#174358]/40 hover:decoration-[#174358] transition-colors">{match[2]}</a>);
    else if (match[4]) parts.push(<strong key={key++} className="font-bold text-[#0D1B2A]">{match[4]}</strong>);
    else if (match[5]) parts.push(<em key={key++} className="italic text-[#174358]/80">{match[5]}</em>);
    else if (match[6]) parts.push(<code key={key++} className="bg-[#F8FAFB] text-[#174358] text-[13px] px-1.5 py-0.5 rounded font-mono">{match[6]}</code>);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < remaining.length) parts.push(remaining.slice(lastIndex));
  return parts.length ? parts : text;
}

/** Lightweight markdown-to-JSX renderer */
function RichContent({ content, post }) {
  if (!content) return null;
  const lines = content.split("\n");
  const elements = [];
  let i = 0;

  // Section-aware imagery: place an image only when the section actually names a known place.
  const used = new Set();
  let placed = 0;
  const BUDGET = 3;
  const isHeading = (s) => { const t = (s || "").trim(); return t.startsWith("## ") || t.startsWith("### "); };
  const sectionImageFor = (startIdx, headingText) => {
    if (placed >= BUDGET) return null;
    let txt = (headingText || "") + " ";
    for (let j = startIdx; j < lines.length && !isHeading(lines[j]); j++) txt += lines[j] + " ";
    const m = matchPlaceImage(txt);
    if (m && !used.has(m.id)) { used.add(m.id); placed++; return m; }
    return null;
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) { i++; continue; }

    // Headings (with a place-matched image when the section names one)
    if (trimmed.startsWith("### ")) {
      const htext = trimmed.slice(4);
      elements.push(
        <h3 key={i} className="font-['Cormorant_Garamond'] text-xl md:text-2xl font-semibold text-[#0D1B2A] mt-10 mb-4 tracking-tight">{formatInline(htext)}</h3>
      );
      const m = sectionImageFor(i + 1, htext);
      if (m) elements.push(<SectionImage key={`img${i}`} id={m.id} alt={m.alt} />);
      i++; continue;
    }
    if (trimmed.startsWith("## ")) {
      const htext = trimmed.slice(3);
      elements.push(
        <h2 key={i} className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold text-[#0D1B2A] mt-12 mb-5 pb-3 border-b border-[#0D1B2A]/10 tracking-tight">{formatInline(htext)}</h2>
      );
      const m = sectionImageFor(i + 1, htext);
      if (m) elements.push(<SectionImage key={`img${i}`} id={m.id} alt={m.alt} />);
      i++; continue;
    }

    // Horizontal rule
    if (trimmed === "---" || trimmed === "***") {
      elements.push(<hr key={i} className="my-10 border-t border-[#0D1B2A]/10" />);
      i++; continue;
    }

    // Blockquote (consecutive > lines grouped)
    if (trimmed.startsWith("> ")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <blockquote key={`q${i}`} className="my-8 pl-6 border-l-4 border-[#174358]/30 bg-[#F8FAFB] py-5 pr-6 rounded-r-lg">
          {quoteLines.map((ql, qi) => (
            <p key={qi} className="text-[15px] text-[#174358]/80 leading-relaxed italic font-medium">{formatInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Unordered list (consecutive - lines grouped)
    if (trimmed.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul${i}`} className="my-5 space-y-2 pl-1">
          {items.map((item, li) => (
            <li key={li} className="flex items-start gap-3 text-[15px] text-[#0D1B2A]/60 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#174358]/40 mt-2.5 flex-shrink-0" />
              <span>{formatInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list (consecutive 1. 2. lines grouped)
    if (/^\d+\.\s/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol${i}`} className="my-5 space-y-2 pl-1 counter-reset-list">
          {items.map((item, li) => (
            <li key={li} className="flex items-start gap-3 text-[15px] text-[#0D1B2A]/60 leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-[#174358]/10 text-[#174358] text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{li + 1}</span>
              <span>{formatInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-[15px] md:text-base text-[#0D1B2A]/60 leading-[1.85] mb-5">{formatInline(trimmed)}</p>
    );
    i++;
  }

  // If no section named a known place, show one destination-level image (always correct for the blog).
  if (placed === 0 && post && DEST_PHOTO[post.destination]) {
    const node = <SectionImage key="lead-img" id={DEST_PHOTO[post.destination]} alt={post.destination} />;
    let at = elements.findIndex((e) => e?.type === "h2" || e?.type === "h3");
    at = at >= 0 ? at + 1 : Math.min(1, elements.length);
    elements.splice(at, 0, node);
  }

  return <div>{elements}</div>;
}
