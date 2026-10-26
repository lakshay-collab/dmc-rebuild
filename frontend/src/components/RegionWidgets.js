import { useRegion, REGIONS } from "../context/RegionContext";
import { X } from "lucide-react";

export function RegionBanner() {
  const { showBanner, detectedRegion, dismissBanner, acceptDetected } = useRegion();
  if (!showBanner || !detectedRegion) return null;
  const detected = REGIONS[detectedRegion];

  return (
    <div data-testid="region-banner" className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[90] animate-fadeInUp" style={{ animationDuration: "300ms" }}>
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{detected.flag}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-gray-900 mb-1">
              It looks like you're in {detected.label}
            </p>
            <p className="text-[12px] text-gray-500 mb-3">
              Switch to the {detected.label} version for {detected.currency} pricing and local support.
            </p>
            <div className="flex gap-2">
              <button onClick={acceptDetected} data-testid="region-banner-accept"
                className="px-4 py-2 bg-[#174358] text-white text-[11px] font-bold rounded-lg hover:bg-[#1e5a75] transition-colors">
                Switch to {detected.label}
              </button>
              <button onClick={dismissBanner} data-testid="region-banner-dismiss"
                className="px-4 py-2 text-gray-500 text-[11px] font-bold rounded-lg hover:bg-gray-100 transition-colors">
                Stay on India
              </button>
            </div>
          </div>
          <button onClick={dismissBanner} className="text-gray-300 hover:text-gray-500 transition-colors">
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
    <div data-testid="region-toggle" className="flex items-center gap-1.5 flex-wrap">
      {Object.values(REGIONS).map(r => (
        <button key={r.code} data-testid={`region-${r.code}`}
          onClick={() => setRegion(r.code)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
            region === r.code
              ? "bg-white/15 text-white border border-white/20"
              : "text-white/35 border border-transparent hover:text-white/60 hover:border-white/10"
          }`}>
          <span className="text-sm">{r.flag}</span>
          {r.label}
        </button>
      ))}
    </div>
  );
}
