import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ItineraryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.src = "https://ibe.hidmc.in/integration/v1/hitoursgroup/embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return (
    <div data-testid="itinerary-page" className="min-h-screen bg-white">
      <Navbar forceLight />
      <div className="pt-20">
        <div id="nz-planner"></div>
      </div>
      <Footer />
    </div>
  );
}
