import { useEffect, useState, useRef } from "react";

const statsData = [
  { value: 45, suffix: "+", label: "Countries" },
  { value: 120, suffix: "+", label: "Destinations" },
  { value: 850, suffix: "+", label: "Agent Partners" },
  { value: 125, suffix: "K+", label: "Annual Bookings" },
  { value: 30, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
];

function AnimatedNumber({ value, suffix, isVisible }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let s = 0; const inc = value / 90;
    const t = setInterval(() => { s += inc; if (s >= value) { setCurrent(value); clearInterval(t); } else setCurrent(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [isVisible, value]);
  return (
    <span className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-[52px] leading-none text-[#0D1B2A]">
      {current}<span className="text-[#174358]">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.15 });
    if (ref.current) o.observe(ref.current);
    // Fallback: ensure the final figures always land even if the observer never fires.
    const t = setTimeout(() => setIsVisible(true), 1400);
    return () => { o.disconnect(); clearTimeout(t); };
  }, []);

  return (
    <section id="stats" ref={ref} data-testid="stats-section" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#F4F1E8]">
      <div data-reveal-group className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-12">
        {statsData.map((s) => (
          <div
            key={s.label}
            data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-center px-3 md:px-6 lg:border-l lg:border-[#0D1B2A]/10 lg:first:border-l-0"
          >
            <AnimatedNumber value={s.value} suffix={s.suffix} isVisible={isVisible} />
            <p className="font-['Manrope'] text-[10px] md:text-[11px] font-semibold text-[#0D1B2A]/45 mt-3 uppercase tracking-[0.18em]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
