import { useRegion } from "../context/RegionContext";

const allLogos = [
  { name: "Marriott", src: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/ql8ywhfb_Download%20225x225.png" },
  { name: "Hilton", src: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/tvyx2nn7_Image%20225x225.png" },
  { name: "Emirates", src: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/y7lxzjfa_Image%20218x231.png" },
  { name: "Expedia", src: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/euccdyev_Download%20300x168.png" },
  { name: "TUI Musement", src: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/qa5zbbm9_Download%20474x106.png" },
  { name: "Travelife", src: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/smw07n0z_Image%20290x174.jpeg" },
  { name: "ISO 35001", src: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/lp6gx1is_Download%20225x224.png" },
  { name: "Inspired by Iceland", src: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/713rlxw0_Download%20245x206.png", hideForUsUk: true },
];

export default function Accreditations() {
  const { config } = useRegion();
  const isUsUk = config.code === "us" || config.code === "uk";
  const logos = isUsUk ? allLogos.filter(l => !l.hideForUsUk) : allLogos;

  return (
    <section id="credentials" data-testid="accreditations-section" className="bg-white py-14 px-6 border-y border-[#0D1B2A]/[0.06]">
      <div className="max-w-7xl mx-auto">
        <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#174358]/60 text-center mb-10">Trusted Supply Partners & Certifications</p>
        <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
          {logos.map((p) => (
            <div key={p.name} data-testid={`partner-${p.name.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-center justify-center grayscale opacity-45 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300">
              <img src={p.src} alt={p.name} className="h-9 md:h-11 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
