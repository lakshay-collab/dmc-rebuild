import { useRegion, REGIONS } from "../context/RegionContext";
import { X } from "lucide-react";

export function RegionBanner() {
  const { showBanner, detectedRegion, dismissBanner, acceptDetected } = useRegion();
  if (!showBanner || !detectedRegion) return null;
  const detected = REGIONS[detectedRegion];

  return (
    <div data-testid="region-banner" className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[90] animate-fadeInUp" style={{ animationDuration: "300ms" }}>
      <div className="bg-white rounded-[1.25rem] shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] border border-[#0D1B2A]/08 p-6 font-['Manrope']">
        <div className="flex items-start gap-3.5">
          <span className="text-2xl">{detected.flag}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#0D1B2A] mb-1">
              It looks like you're in {detected.label}
            </p>
            <p className="text-[12px] text-[#0D1B2A]/55 mb-4 leading-relaxed">
              Switch to the {detected.label} version for {detected.currency} pricing and local support.
            </p>
            <div className="flex gap-2">
              <button onClick={acceptDetected} data-testid="region-banner-accept"
                className="px-5 py-2 bg-[#174358] text-white text-[11px] font-semibold rounded-full hover:bg-[#1e5a75] shadow-sm transition-colors">
                Switch to {detected.label}
              </button>
              <button onClick={dismissBanner} data-testid="region-banner-dismiss"
                className="px-5 py-2 text-[#0D1B2A]/55 text-[11px] font-semibold rounded-full border border-[#0D1B2A]/15 hover:border-[#174358]/40 transition-colors">
                Stay on India
              </button>
            </div>
          </div>
          <button onClick={dismissBanner} className="text-[#0D1B2A]/25 hover:text-[#0D1B2A]/60 transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function RegionFooterToggle() {
  const { region, setRegion } = useRegion();

  return (
    <div data-testid="region-toggle" className="flex items-center gap-2 flex-wrap font-['Manrope']">
      {Object.values(REGIONS).map(r => (
        <button key={r.code} data-testid={`region-${r.code}`}
          onClick={() => setRegion(r.code)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${
            region === r.code
              ? "bg-[#174358] text-white"
              : "text-white/45 border border-white/15 hover:text-white/75 hover:border-white/30"
          }`}>
          <span className="text-sm">{r.flag}</span>
          {r.label}
        </button>
      ))}
    </div>
  );
}
