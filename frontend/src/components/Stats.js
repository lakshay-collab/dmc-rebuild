import { useEffect, useState, useRef } from "react";
import { MapPin, Globe, Users, Briefcase, BookOpen, Award } from "lucide-react";

const statsData = [
  { icon: Globe, value: 45, suffix: "+", label: "Countries" },
  { icon: MapPin, value: 120, suffix: "+", label: "Destinations" },
  { icon: Users, value: 850, suffix: "+", label: "Agent Partners" },
  { icon: BookOpen, value: 125, suffix: "K+", label: "Annual Bookings" },
  { icon: Briefcase, value: 30, suffix: "+", label: "Years Experience" },
  { icon: Award, value: 98, suffix: "%", label: "Satisfaction Rate" },
];

function AnimatedNumber({ value, suffix, isVisible }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let s = 0; const inc = value / 125;
    const t = setInterval(() => { s += inc; if (s >= value) { setCurrent(value); clearInterval(t); } else setCurrent(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [isVisible, value]);
  return <span className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl text-[#174358]">{current}<span className="text-[#174358]/40">{suffix}</span></span>;
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.2 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section id="stats" ref={ref} data-testid="stats-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 border-b border-[#0D1B2A]/05">
      <div data-reveal-group className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 md:gap-8">
        {statsData.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`} className="text-center">
              <Icon size={18} strokeWidth={1.5} className="text-[#174358]/30 mx-auto mb-3" />
              <AnimatedNumber value={s.value} suffix={s.suffix} isVisible={isVisible} />
              <p className="text-xs font-semibold text-[#0D1B2A]/40 mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
