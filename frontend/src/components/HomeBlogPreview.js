import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const PLACEHOLDER_POSTS = [
  { title: "Best Time to Visit Egypt: A Month-by-Month Guide", slug: "best-time-egypt", excerpt: "From the scorching summers of Luxor to the mild winters of Cairo, here's when to plan your Egypt trip for the perfect experience.", image_url: "https://images.unsplash.com/photo-1678388103961-5e1254fcc42a?w=500&q=80", category: "Destination Guide", destination: "Egypt" },
  { title: "Sri Lanka in 10 Days: The Ultimate Itinerary", slug: "sri-lanka-10-days", excerpt: "Tea plantations, ancient temples, whale watching, and pristine beaches — how to see the best of Sri Lanka in under two weeks.", image_url: "https://images.unsplash.com/photo-1578519050142-afb511e518de?w=500&q=80", category: "Itinerary", destination: "Sri Lanka" },
  { title: "Why Japan in Cherry Blossom Season is Worth Every Penny", slug: "japan-cherry-blossom", excerpt: "A DMC insider's guide to planning the perfect sakura trip — from timing and crowds to hidden spots your clients will love.", image_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80", category: "Insider Tips", destination: "Japan" },
];

export default function HomeBlogPreview() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/blog`).then(r => {
      const data = r.data.posts || [];
      setPosts(data.length >= 3 ? data.slice(0, 3) : PLACEHOLDER_POSTS);
    }).catch(() => setPosts(PLACEHOLDER_POSTS));
  }, []);

  if (!posts.length) return null;

  return (
    <section data-testid="home-blog-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <p data-reveal className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#174358]/60 mb-5 flex items-center gap-2">
              <BookOpen size={14} /> From Our Travel Journal
            </p>
            <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl text-[#0D1B2A] leading-tight">
              Destination <em className="not-italic text-[#174358]">Insights</em>
            </h2>
          </div>
          <Link data-reveal to="/blog" className="hidden sm:inline-flex items-center gap-2 font-['Manrope'] text-sm font-semibold text-[#174358] hover:text-[#1e5a75] transition-colors group">
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div data-reveal-group className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} data-testid={`blog-preview-${post.slug}`}
              className="group bg-white rounded-[1.25rem] overflow-hidden shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] hover:shadow-[0_30px_70px_-28px_rgba(13,27,42,0.4)] border border-[#0D1B2A]/[0.06] hover:border-[#174358]/20 transition-all duration-300 block">
              <div className="h-56 overflow-hidden">
                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#174358] bg-[#174358]/[0.07] px-3 py-1 rounded-full">{post.category || post.destination}</span>
                </div>
                <h3 className="font-['Manrope'] font-bold tracking-tight text-2xl text-[#0D1B2A] leading-snug mb-2 line-clamp-2 group-hover:text-[#174358] transition-colors">{post.title}</h3>
                <p className="font-['Manrope'] text-xs text-[#0D1B2A]/45 leading-relaxed line-clamp-2">{post.excerpt}</p>
                <div className="mt-5 pt-4 border-t border-[#0D1B2A]/[0.08]">
                  <span className="font-['Manrope'] text-xs font-semibold text-[#174358] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="sm:hidden text-center mt-8">
          <Link to="/blog" className="inline-flex items-center gap-2 font-['Manrope'] text-sm font-semibold text-[#174358] hover:text-[#1e5a75] transition-colors">
            View All Posts <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
