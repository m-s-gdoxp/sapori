# Project Brief: Quick Upgrades

## Quick upgrades (at a glance)
- Add success metrics (Core Web Vitals, page weight, uptime) so "premium" is measurable.
- Specify a tech/CMS blueprint (stack, hosting, image/CDN, i18n) to avoid rework.
- Define a design system (tokens, components, motion) so the look stays consistent as content scales.
- Lock in accessibility & RTL rules (Arabic first-class, WCAG 2.2 AA).
- Describe reservation UX end-to-end (from hero CTA → seating map → WhatsApp confirm + QR).
- Bake in SEO & Schema (Restaurant, Menu, Event) + multilingual hreflang.
- Clarify admin governance (roles, preview, audit) and analytics (events to track).
- Create performance budgets and acceptance tests to keep quality non-negotiable.

## 0) Success Metrics & KPIs
- Core Web Vitals (mobile, 4G): LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms, TTI ≤ 3.5s
- Page weight: ≤ 1.5 MB per page (hero ≤ 900 KB incl. video fallback)
- FPS: Animations 60fps; respect prefers-reduced-motion
- Uptime: ≥ 99.9% monthly; TTFB ≤ 200ms on cached pages
- Conversion: Reservation completion rate baseline +15% after launch
- Accessibility: WCAG 2.2 AA across EN/FR/AR (incl. RTL, screen readers)

## 1) Tech & CMS Blueprint
- Stack: Next.js (App Router) + TypeScript + Tailwind + Framer Motion (micro-interactions)
- i18n & RTL: Built-in locale routing (EN/FR/AR), mirrored layout for AR, RTL-aware components
- CMS (Headless): Sanity/Strapi/Directus with preview drafts; content types below
- Media/CDN: Next Image + AVIF/WebP, responsive srcset, blur-up, focal-point cropping; global CDN cache
- Deploy/CI: Git branching, preview URLs per PR, Lighthouse budget checks in CI
- Email/QR: Transactional email (e.g., Resend/Mailgun). Server-side QR (PNG/SVG).
- WhatsApp: WhatsApp Business API message template for confirmations (opt-in toggle).

## 2) Content Model (CMS)
- MenuCategory: name, accentColor, heroImage, description, order
- Dish: title, price, currency, description (EN/FR/AR), allergens, dietaryTags [Halal/Vegan/Spicy], image, availability (Lunch/Dinner/Dessert)
- Event: title, date/time, artist(s), media (video/audio), ticketLink/RSVP, teaser, heroImage
- Artist: name, bio, socials, media gallery
- ReservationSettings: service hours, table map (schema below), deposit policy, cancellation terms, WhatsApp template text
- Table: id, capacity, zone (Terrace/Indoor/VIP), status (free/held/booked), min/max party
- Page: slug, hero (image/video), sections [rich text + media + pattern], SEO meta
- Global: nav, footer, socials, legal, languages, currency options

## 3) Design System & Typography
- Type pairing:
  - Headings (Latin): Playfair Display or Cormorant (variable), optical sizes on
  - Body (Latin): Inter or Lato
  - Arabic: headings Reem Kufi (display) or Amiri (serif); body Cairo or Noto Naskh Arabic
- Tokens: 8pt spacing scale, radius (8/12/20), shadows (xs/s/m/l), motion (120–240ms), easing (out-quad)
- Palette: Safi Blue / Terracotta / Gold / Deep Charcoal + accessible tints; minimum contrast 4.5:1
- Patterns: Moroccan motifs as SVG dividers (subtle, 5–10% opacity), parallax at < 0.3 factor
- Icons: Custom SVG set: Halal, Terrace, Live Music, Family—stroke-based to match typography

## 4) Performance Budget & Media
- Hero media: short loop ≤ 8s, ≤ 800 KB (AV1/VP9), fallback poster image
- Lazy-everything: below-the-fold images, video, and embeds; component-level code-split
- Preload: key fonts (woff2) + critical hero image; font-display: swap; limit to 2 font families + Arabic
- Hydration: islands for heavy UI (seating map, carousels) to reduce JS payload

## 5) Accessibility & Internationalization
- Full RTL: mirrored layout, logical focus order, bidi-safe strings, Arabic numerals/date formats
- Keyboard: visible focus rings, skip-to-content, trap-free dialogs (reservation modal)
- ARIA: landmark roles, semantic headings, alt text guidelines for dishes/events
- Motion: respect prefers-reduced-motion; provide static fallbacks for video heroes
- Forms: clear errors, inline validation, labels tied to inputs, sensible autocomplete attrs

## 6) SEO & Structured Data
- Schema.org: Restaurant, Menu, MenuItem, Event, FAQPage (policies), PostalAddress
- Multilingual: hreflang for EN/FR/AR; localized meta + Open Graph per locale
- Sitemaps: dynamic XML per locale; robots.txt with image/video allowances
- OG/Twitter: rich cards for Events and Menu categories (with accent color & hero)

## 7) Reservation UX Flow
- Entry points: Primary CTAs in hero and sticky header; secondary CTAs on Menu/Event pages
- Flow: date → time → party size → interactive seating map (table capacity + zone badges) → contact → WhatsApp toggle → confirm
- Edge cases: holds (5–10 min), over-capacity warnings, split-table option, wheelchair accessible flag
- Confirmation: on-screen summary + email with QR (bookingId, date, time, party, table) + .ics calendar invite
- Policy clarity: tooltip “deposit & cancel terms” + link to full policy (FAQPage schema)

## 8) Events & Media
- Countdowns: real-time timers; auto-promote “This Week” block on Home
- Previews: 10–20s muted loops; artist mini-bios; “Add to Calendar” per event
- Ticketing: integrate external link or lightweight checkout; clear seat zones if seated shows

## 9) Footer & Legal
- Footer groups: Contact, Social, Newsletter, Legal (Privacy, Cookies, Terms, Allergen info)
- Consent: CMP for cookies; tracking off until consent; simple language per locale

## 10) Admin & Governance
- Roles: Admin, Content Editor, Event Manager, Host Staff (read-only reservations)
- Preview & versioning: draft previews, change history, rollback
- Audit & security: 2FA login, rate-limited booking endpoints, input validation, basic WAF
- Image pipeline: focal point + smart crop presets per section

## 11) Analytics & Experiments
- Events to track: click “Reserve Now”, abandon step, seat selection, WhatsApp opt-in, PDF menu downloads, event RSVPs
- Dashboards: conversions by locale, device, and entry page; top dishes; event interest
- A/B levers: hero media vs. stills, copy variations, CTA placement

## 12) QA & Acceptance Tests
- Navigation: keyboard-only user can access every page and submit a reservation
- Reservation: user completes booking < 45s; receives email + working QR + valid .ics
- Menu: filters (Halal/Vegan/Spicy) update cards without layout shift (CLS < 0.02)
- Events: countdown matches event date across timezones/locales
- Arabic: full RTL mirroring; no mixed-direction truncation; dates numerals localized
- Performance: Lighthouse mobile ≥ 90 Performance/Accessibility/Best Practices/SEO on Home, Menu, Reservations

## Small copy edits (polish your brief)
- "Human-crafted translations with locale-specific tone; RTL layout and Arabic typography treated as first-class."
- "Commission a consistent SVG icon set (24/32 px grid) aligned with the brand’s stroke weight."
- "Low-amplitude parallax (<0.3) and staggered reveals (120–180ms); respect reduced-motion."
- "Admin portal with 2FA, role-based permissions, audit logs, and draft preview links."

## Optional nice-to-haves (if time/budget allow)
- PWA: installable, offline menu & contact
- Table QR at venue: guests view live menu / allergens / events from table
- Chef’s tasting flow: limited-seats drops with countdown + waitlist
- Gift cards & experiences: brunch, music night packages

