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
    <section id="credentials" data-testid="accreditations-section" className="bg-[#FAFAFA] py-10 px-6 border-y border-[#0D1B2A]/05">
      <div className="max-w-7xl mx-auto">
        <p className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#0D1B2A]/20 text-center mb-8">Trusted Supply Partners & Certifications</p>
        <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
          {logos.map((p) => (
            <div key={p.name} data-testid={`partner-${p.name.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img src={p.src} alt={p.name} className="h-9 md:h-11 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
