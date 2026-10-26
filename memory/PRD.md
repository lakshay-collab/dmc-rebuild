# Hi DMC — B2B Destination Management Company Website

## Original Problem Statement
Build a B2B website for "Hi DMC" to attract and convert travel agents by showcasing global destinations, DMC services (FIT, group tours, MICE), and an agent-focused technology platform.

## Tech Stack
- Frontend: React + Tailwind CSS + Shadcn/UI
- Backend: FastAPI + MongoDB + Static file serving + Office 365 SMTP
- Third-party: Sembark API (dual-token), Office 365 SMTP (no-reply@hidmc.com)

## What's Been Implemented

### Core B2B Website
- Full SPA with dynamic mega-menus, Hero lead form (India State->City cascade)
- 26 dynamic destination pages, Egypt detailed packages, Europe continental page
- PackageDetailPage with luxury Maharaja layout
- Legal pages, About Us, Blog system, Technology page, Webinars
- Sembark API dual-token routing

### Geo-Region Framework
- RegionContext (India, US, UK, Global) dynamically alters phone codes, forms, hero copy, destination lists
- Footer region toggle widgets
- Region-aware Navbar with "Recently Searched" destinations

### Destination Explorer
- Dynamic region filter tabs derived from actual DB data (South Asia, East Asia, Southeast Asia, Central Asia, Middle East, North Africa, Africa, Indian Ocean Islands, Europe, South America, Oceania)
- Mauritius, Seychelles, and Nepal added; 29 total destinations
- Maldives visible across all region views (India, US, UK, Global)

### Homepage Blog Preview (Jun 2026)
- "Destination Insights" section renders between Explore Destinations and Testimonials
- Shows 3 blog posts from /api/blog, falls back to placeholder posts

### Admin Dashboard
- Two tabs: Service Leads | Destination Leads
- Period filter: Today / This Week / This Month / All
- Agency-first table layout
- Onboarding Checklist (8 steps with hardcoded assignees, comments, approval)

### Email Automation
- Office 365 SMTP via no-reply@hidmc.com
- Auto-sends thank-you email on every lead submission
- Two templates: Welcome (service leads) / Inquiry Received (destination leads)

### B2C Ad Landing Page (NEW)
- Route: `/ads/egypt-tour-packages` (not in main nav)
- Mobile-first design optimized for Indian ad traffic
- 12 Egypt package cards with filters (Duration + Travel Style)
- Sticky sidebar form (desktop): "Speak to Egypt Specialists" with team avatars
- Sticky floating "Request Callback" CTA (mobile)
- Callback modal: Full Name + Phone (+91 flag) + Email
- Accreditation breaker: TripAdvisor, ISO, MOT, IATA, PATA badges
- Review card with star rating
- Travel style tag sections: Family, Honeymoon, Cultural tours
- "Why Choose Hi DMC" section
- Blog placeholder cards
- "Load More" with "You viewed X of 44 packages"
- Only first 2 cards link to actual itineraries, rest open callback form
- Leads tracked as form_type: "B2C" with source_page: "Ad LP - ..."

## Key Technical Notes
- Sembark API does NOT support Trip Source creation — Admin Dashboard workaround
- Europe route must come before generic destination route
- Placeholder team names in onboarding checklist
- Admin: admin@hidmc.com / HiDMC@2026
- SMTP: smtp.office365.com:587 with no-reply@hidmc.com

### Agent Portal (Phase 1 — Jun 2026)
- Agent login + self-registration at `/agent/login` and `/agent/register`
- Single-page dashboard at `/agent/dashboard` with welcome section, stats, destination cards
- 3 initial destinations: Sri Lanka, Vietnam, Egypt (4 packages each, mix of FIT and Group)
- In-page destination filtering — click a card to filter packages below
- FIT / Group toggle filter
- Request for Proposal (RFP) modal with destination, pax, dates, requirements
- JWT auth stored in localStorage (agent_token, agent_info)
- Backend: agent_routes.py, agent_seed.py, agents/agent_packages/rfp_requests collections

## Prioritized Backlog
- P1: More destination landing pages (Japan, Bali, etc.)
- P2: Replace placeholder onboarding team names with real names
- P3: Download Itinerary as PDF
- P4: Comprehensive SEO optimization
- Refactoring: Break server.py into /routes folder

## 2026-06 — Homepage repositioned to Global DMC brief
Source of truth: Hi_DMC_Emergent_Website_Brand_and_Copy_Brief.md (uploaded by user).
- Brand line used verbatim in H1: "You sell the world, we handle the destination on the ground."
- Hero.js rewritten: full-bleed carousel + left-aligned copy; enquiry form removed from hero.
  CTAs (user-chosen order): Request a Quote (#contact) > Register as a Travel Agent (/agent/register) > Explore Destinations (#explore-destinations).
- WhyUs.js: value-prop section B copy, region branching removed (US/UK "local offices" claim was non-compliant).
- New TwoWays.js (portal vs agent contact centre + 4-step "How Hi DMC Works").
- New WhoWeWorkWith.js (4 trade segments + ground-sourcing copy), mounted after GlobalDestinations.
- OurTechnology.js: rewritten as booking channel + contact centre (removed "lowest price", instant confirmation, drag-and-drop itinerary claims).
- Services.js, GlobalDestinations.js, ContactCTA.js copy rewritten agent-first; "24/7", white-label and quote-builder claims removed.
- ContactCTA form is now "Request a Quote" with a requirement textarea (maps to `comments` on /api/inquiries). Verified end-to-end in preview.
- SEO title/meta updated per brief section 10.
- USER DECISION: all existing numeric claims (45+ countries, 850+ agents, 500K+ hotels, 125K bookings, 99.9% uptime, 2,500+ packages) were KEPT as-is at user's instruction, though the brief flags them as needing Hi DMC verification.
Pending from brief: About, Groups & MICE, Destinations and Contact page copy; FAQ section (section 7 approved answers).
