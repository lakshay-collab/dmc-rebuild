import { createContext, useContext, useState, useEffect } from "react";

const RegionContext = createContext();

const REGION_KEY = "hidmc_region";
const DETECTED_KEY = "hidmc_region_detected";

export const REGIONS = {
  in: {
    code: "in",
    label: "India",
    flag: "\ud83c\uddee\ud83c\uddf3",
    currency: "INR",
    currencySymbol: "\u20b9",
    phoneCode: "+91",
    branding: "Hi DMC India",
    legalEntity: "Hi Tours India Pvt. Ltd.",
    prefix: "",
    destinations: null, // null = show all
  },
  us: {
    code: "us",
    label: "United States",
    flag: "\ud83c\uddfa\ud83c\uddf8",
    currency: "USD",
    currencySymbol: "$",
    phoneCode: "+1",
    branding: "Hi DMC",
    legalEntity: "Hi Tours Group",
    prefix: "/us",
    destinations: ["India", "Nepal", "Sri Lanka", "Maldives", "Bhutan", "Kazakhstan", "Egypt", "Jordan", "Japan", "Vietnam", "Laos", "Cambodia", "UAE", "China", "Mauritius", "Seychelles"],
    hideTrending: true,
    hideDestSearch: true,
    hideRegionFilters: false,
    travelStyles: ["Safari & Wildlife", "Honeymoon & Romance", "Luxury & Wellness", "Cultural Immersions", "Adventure & Outdoors", "Beach & Island Escapes"],
  },
  uk: {
    code: "uk",
    label: "United Kingdom",
    flag: "\ud83c\uddec\ud83c\udde7",
    currency: "GBP",
    currencySymbol: "\u00a3",
    phoneCode: "+44",
    branding: "Hi DMC",
    legalEntity: "Hi Tours Group",
    prefix: "/uk",
    destinations: ["India", "Nepal", "Sri Lanka", "Maldives", "Bhutan", "Kazakhstan", "Egypt", "Jordan", "Japan", "Vietnam", "Laos", "Cambodia", "UAE", "China", "Mauritius", "Seychelles"],
    hideTrending: true,
    hideDestSearch: true,
    hideRegionFilters: false,
    travelStyles: ["Safari & Wildlife", "Honeymoon & Romance", "Luxury & Wellness", "Cultural Immersions", "Adventure & Outdoors", "Beach & Island Escapes"],
  },
  global: {
    code: "global",
    label: "Global",
    flag: "\ud83c\udf0d",
    currency: "USD",
    currencySymbol: "$",
    phoneCode: "+91",
    branding: "Hi DMC",
    legalEntity: "Hi Tours Group",
    prefix: "/global",
    destinations: ["India", "Nepal", "Sri Lanka", "Maldives", "Bhutan", "Kazakhstan", "Egypt", "Jordan", "Japan", "Vietnam", "Laos", "Cambodia", "UAE", "China", "Mauritius", "Seychelles"],
  },
};

// Map country codes from IP API to our region codes
function countryToRegion(countryCode) {
  if (countryCode === "IN") return "in";
  if (countryCode === "US") return "us";
  if (countryCode === "GB") return "uk";
  return "global";
}

export function RegionProvider({ children }) {
  const [region, setRegionState] = useState(() => {
    const saved = localStorage.getItem(REGION_KEY);
    return saved && REGIONS[saved] ? saved : "in";
  });
  const [detectedRegion, setDetectedRegion] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  // Detect region via IP on first visit
  useEffect(() => {
    const alreadyDetected = localStorage.getItem(DETECTED_KEY);
    if (alreadyDetected) return;

    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(data => {
        const detected = countryToRegion(data.country_code);
        setDetectedRegion(detected);
        localStorage.setItem(DETECTED_KEY, "true");
        if (detected !== "in" && region === "in") {
          setShowBanner(true);
        }
      })
      .catch(() => {});
  }, [region]);

  const setRegion = (code) => {
    if (REGIONS[code]) {
      setRegionState(code);
      localStorage.setItem(REGION_KEY, code);
      setShowBanner(false);
    }
  };

  const dismissBanner = () => setShowBanner(false);

  const acceptDetected = () => {
    if (detectedRegion) setRegion(detectedRegion);
    setShowBanner(false);
  };

  const config = REGIONS[region];

  // Filter destinations for the current region
  const filterDestinations = (allDests) => {
    if (!config.destinations) return allDests; // India shows all
    return allDests.filter(d => config.destinations.includes(d.name));
  };

  return (
    <RegionContext.Provider value={{ region, config, setRegion, filterDestinations, showBanner, detectedRegion, dismissBanner, acceptDetected }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within RegionProvider");
  return ctx;
}
