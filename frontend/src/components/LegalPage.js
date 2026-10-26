import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const POLICIES = {
  "privacy-policy": {
    title: "Privacy Policy",
    effective: "June 19, 2025",
    sections: [
      { heading: "1. Introduction", text: "HI DMC, a division of HI Tours India Pvt. Ltd., is committed to respecting and protecting the privacy of our registered partners and their end clients. This policy describes the personal and business data we collect, how we use it, and your rights regarding that data." },
      { heading: "2. Scope", text: "This policy applies to partners who access our platform via the HI DMC portal, email, phone, or other communication channels. It covers partner account holders (e.g., travel agents, tour operators, corporates) and travelers booked through our system, where applicable." },
      { heading: "3. Information We Collect", text: "We collect partner information including business identity, agency or company name, address, registration number, and contact details. For travelers, we collect names, passport/ID numbers, nationality, and date of birth. We also collect usage data such as logs of digital interactions, communication records, and payment and billing information including invoice data and transaction details." },
      { heading: "4. How We Use Your Data", text: "We use your data for service delivery (facilitating travel bookings and liaising with third-party providers), communication (responding to inquiries, sending booking updates and operational alerts), compliance and administration (invoicing, accounting, audits, and legal obligations), and feedback and improvement (enhancing service quality and partner experience)." },
      { heading: "5. Data Sharing", text: "We share data with travel providers for service fulfillment, payment processors and service platforms for billing and analytics, legal authorities when required by law, and professional advisors under confidentiality provisions. We do not sell or rent personal data to third parties for marketing." },
      { heading: "6. Data Retention", text: "We retain personal and business data for as long as your account is active, plus any additional time required to meet regulatory, tax, or contractual obligations. Non-active data is securely archived or deleted." },
      { heading: "7. Data Security", text: "We implement modern industry-standard protections, including encryption, authentication, and access controls. Our team undergoes regular security training, and we conduct internal security reviews." },
      { heading: "8. Your Rights", text: "Under applicable data protection regulations, you may request access to or a copy of your personal data, remedy inaccuracies, request deletion or restrict processing, object to direct communications, withdraw consent, and request portability of your data." },
      { heading: "9. Cookies & Tracking", text: "Our partner portal employs essential cookies and session tokens for login and security. For analytics, we may use tools like Google Analytics. You can control these via your browser; however, disabling cookies may reduce portal functionality." },
      { heading: "10. International Data Transfers", text: "Data may be processed in India or other jurisdictions where our partners, providers, or services are located. We ensure adequate safeguards for cross-border data flows." },
      { heading: "11. Policy Updates", text: "This policy may be updated periodically. We will notify partners of material changes via email or within the portal." },
      { heading: "12. Contact", text: "HI Tours India Pvt. Ltd. (HI DMC)\n321 Vipul Agora, Gurugram, Haryana \u2013 122002, India\nEmail: hi@hidmc.com\nTel: 91 (124) 46 00 000" },
    ],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    effective: "June 19, 2025",
    sections: [
      { heading: "1. Introduction", text: "At HI DMC, a B2B division of HI Tours India Pvt. Ltd., we use cookies and related technologies to ensure our partner platforms operate smoothly, deliver enhanced functionality, and provide relevant user experiences. This policy applies to all visitors to our website and partner portals." },
      { heading: "2. What Are Cookies?", text: "Cookies are small text files stored on your browser or device when you access a website. First-party cookies are placed by HI DMC, while third-party cookies are placed by other service providers. Session cookies are deleted when your session ends, while persistent cookies remain for a set duration." },
      { heading: "3. Why We Use Cookies", text: "We use cookies for essential functions (login authentication, secure navigation), performance and functionality (remembering preferences, enabling live chat), analytics and customisation (understanding usage patterns, customising dashboards), advertising (delivering relevant promotional messages), and social networking (enabling content sharing)." },
      { heading: "4. Types of Cookies We Use", text: "Essential Cookies: Necessary for proper functioning of our website and partner dashboard. They enable secure access and maintain session integrity.\n\nPerformance and Functionality Cookies: Improve performance and customisation, remembering preferences and enhancing page load times.\n\nAnalytics and Customisation Cookies: Collect insights into how partners interact with our platform, tracking usage patterns for optimisation.\n\nAdvertising Cookies: Deliver relevant promotional content and measure campaign performance.\n\nSocial Media Cookies: Support integration with platforms such as LinkedIn and WhatsApp Business." },
      { heading: "5. Other Tracking Technologies", text: "We may use web beacons (tracking pixels) to track email open rates, monitor user journey flow, and understand referral traffic." },
      { heading: "6. Your Cookie Preferences", text: "You can adjust browser settings to block or delete cookies, set preferences via our consent pop-up, or opt out of analytics. Disabling essential cookies may limit access to key features." },
      { heading: "7. Updates", text: "We may update this Cookie Policy to reflect legal changes or service enhancements. Significant changes will be communicated via email or in-platform notification." },
      { heading: "8. Contact", text: "HI DMC (HI Tours India Pvt. Ltd.)\n321 Vipul Agora, Gurugram, Haryana \u2013 122002, India\nEmail: hi@hidmc.com\nTel: 91 (124) 46 00 000" },
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    effective: "June 19, 2025",
    sections: [
      { heading: "1. Acceptance of Terms", text: "By accessing or using any services provided by HI DMC, a division of HI Tours India Pvt. Ltd., you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services." },
      { heading: "2. Services", text: "HI DMC provides B2B destination management services including hotel bookings, ground transportation, guided experiences, group tour coordination, MICE event management, and related travel services across our operating destinations." },
      { heading: "3. Partner Registration", text: "Access to our booking platform requires registration as an approved travel partner. You must provide accurate business information and maintain the confidentiality of your account credentials. You are responsible for all activity under your account." },
      { heading: "4. Bookings & Confirmations", text: "All bookings are subject to availability and confirmation by HI DMC. Confirmed bookings will receive a written confirmation with all relevant details. Pricing quoted is valid for the period specified and may be subject to change due to currency fluctuations, supplier rate changes, or seasonal adjustments." },
      { heading: "5. Payments", text: "Payment terms are as specified in your partner agreement or on individual booking confirmations. A deposit may be required to secure bookings. Full payment is typically due 60 days prior to the travel date unless otherwise agreed. Late payments may incur additional charges." },
      { heading: "6. Amendments & Cancellations", text: "Amendment and cancellation policies vary by service and supplier. Requests must be submitted in writing. Cancellation charges may apply depending on the notice period and supplier terms. We strongly recommend that all travelers obtain comprehensive travel insurance." },
      { heading: "7. Liability", text: "HI DMC acts as an intermediary between partners and third-party service providers (hotels, transport operators, guides, etc.). While we exercise due diligence in selecting suppliers, we are not liable for acts, omissions, or defaults of third-party providers beyond our reasonable control." },
      { heading: "8. Intellectual Property", text: "All content, branding, and materials provided by HI DMC are the property of HI Tours India Pvt. Ltd. Partners may not reproduce, distribute, or modify our materials without prior written consent." },
      { heading: "9. Force Majeure", text: "HI DMC shall not be liable for failure to perform obligations due to circumstances beyond reasonable control, including natural disasters, pandemics, government actions, civil unrest, strikes, or other force majeure events." },
      { heading: "10. Governing Law", text: "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Gurugram, Haryana, India." },
      { heading: "11. Updates", text: "HI DMC reserves the right to update these Terms from time to time. Partners will be notified of material changes via email or through the partner portal." },
      { heading: "12. Contact", text: "HI Tours India Pvt. Ltd. (HI DMC)\n321 Vipul Agora, Gurugram, Haryana \u2013 122002, India\nEmail: hi@hidmc.com\nTel: 91 (124) 46 00 000" },
    ],
  },
};

export default function LegalPage() {
  const { slug } = useParams();
  const policy = POLICIES[slug];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!policy) return (
    <div className="min-h-screen bg-white"><Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#0D1B2A]">Page not found</h2>
        <Link to="/" className="text-sm text-[#174358] hover:underline">Back to Home</Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div data-testid="legal-page" className="min-h-screen bg-white">
      <Navbar forceLight />
      <div className="pt-28 pb-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-[#0D1B2A]/40 hover:text-[#0D1B2A]/70 text-xs font-semibold uppercase tracking-[0.15em] mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 data-testid="legal-title" className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-[#0D1B2A] mb-4">{policy.title}</h1>
          <p className="text-xs text-[#0D1B2A]/35 mb-12">Effective date: {policy.effective} &middot; Last revised: {policy.effective}</p>
          <div className="space-y-8">
            {policy.sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-base font-bold text-[#0D1B2A] mb-3">{s.heading}</h2>
                <p className="text-sm text-[#0D1B2A]/60 leading-relaxed whitespace-pre-line">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
