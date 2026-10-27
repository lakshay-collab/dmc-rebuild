import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals (data-reveal / data-reveal-group / data-reveal-img) are handled by pure
 * CSS scroll-driven animations in index.css — bulletproof: in-view elements render
 * at their end state and it no-ops safely where unsupported, so content is never
 * left hidden. This component adds GSAP parallax only (data-parallax), which simply
 * stays static if it can't run. Respects prefers-reduced-motion.
 */
export default function ScrollEffects() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.getAttribute("data-parallax")) || 40;
        gsap.to(el, {
          yPercent: amt, ease: "none",
          scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });

    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => { ctx.revert(); clearTimeout(t); };
  }, [location.pathname]);

  return null;
}
