

# Payitragam — Hybrid UX Architecture Plan

## Executive recommendation

Adopt a **hybrid, device-native navigation model**:

- **Desktop (≥1024px):** sticky top navbar with the existing playful hanging-tile links + a persistent "Enroll Now" CTA. No hamburger on desktop.
- **Tablet (768–1023px):** condensed sticky top bar (logo + Enroll CTA + hamburger) that opens a full-screen sheet menu. No bottom bar.
- **Mobile (<768px):** simplified sticky top bar (logo + WhatsApp + Call) **plus a fixed bottom navigation bar** with 5 thumb-zone items and a centered raised "Enroll" FAB-style action.

This pattern matches platform conventions (web-rich on desktop, app-like on mobile), keeps admissions CTAs one tap away on every screen, and preserves the playful brand identity without overwhelming small viewports.

---

## 1. Why this architecture beats the alternatives

| Alternative | Why we reject it |
|---|---|
| Top nav on all sizes | Mobile users lose CTA visibility on scroll; tap targets fall outside the thumb zone. |
| Hamburger on all sizes | Hides primary IA on desktop where users expect rich, scannable navigation. Hurts SEO discoverability of section names. |
| Bottom bar on all sizes | Eats vertical space on desktop; no precedent in web conventions; looks toy-like. |
| Pure single-page hash nav (current) | Acceptable for a single landing page, but Programs / Gallery / Blogs are strong candidates for dedicated routes later (SEO + share metadata). The plan keeps anchors now and leaves a migration path. |

The hybrid model gives **rich exploration on desktop**, **thumb-first speed on mobile**, and **one architecture, two presentations** — same React components, breakpoint-driven chrome.

---

## 2. Breakpoint behavior matrix

| Element | Mobile <768 | Tablet 768–1023 | Desktop ≥1024 |
|---|---|---|---|
| Top bar | Logo + Call + WhatsApp icons | Logo + Enroll + Hamburger | Logo + 8 hanging tiles + Enroll |
| Hamburger | No (bottom bar replaces it) | Yes (full-screen sheet) | No |
| Bottom nav | **Yes — 5 items, centered FAB** | No | No |
| Hero layout | Single column, image below text | Single column, image right inset | Two columns, floating cards visible |
| Programs grid | 1 col, swipeable carousel | 2 col | 3 col |
| Gallery grid | 2 col masonry | 3 col | 4 col + lightbox |
| Stats counter | 2×2 grid | 4 inline | 4 inline + animated |
| Blogs | 1 col stack | 2 col | 3 col |
| Announcements ticker | Hidden (replaced by pinned card) | Visible | Visible |
| Decorative SVGs | Hidden (`display:none`) | Reduced opacity 0.4 | Full opacity |
| Section padding | 48px y | 72px y | 96px y |
| Footer | Stacked accordion | 2 col | 4 col |
| Floating WhatsApp | Hidden (in bottom bar) | Visible bottom-right | Visible bottom-right |

---

## 3. Information architecture & priority

Reordered for parent decision-making, not feature listing:

1. **Hero + trust badge** (years/students/teachers/branches)
2. **Programs** (the "what do you teach my child" answer)
3. **About / Methodology** (Montessori + Reggio + Play Way credibility)
4. **Gallery** (visual proof — highest emotional conversion)
5. **Play Area** (differentiator)
6. **Announcements** (urgency: admissions open)
7. **Blogs** (SEO + parenting authority)
8. **Branches + Contact / Enquiry form** (conversion close)
9. **Footer** (links, social, admin entry)

Mobile reorders **Gallery above About** — visual proof converts faster on small screens than long-form copy.

---

## 4. Mobile bottom navigation — exact spec

5 items, fixed bottom, safe-area aware, 64px tall + safe-area inset:

```text
┌──────────────────────────────────────────────────┐
│  🏠       🎨        ✨         🖼️       📞      │
│ Home   Programs  ENROLL    Gallery   Contact     │
└──────────────────────────────────────────────────┘
```

- Items 1, 2, 4, 5: 24px icon + 10px label, tap target ≥48×48px.
- **Center item ("Enroll")**: 56px circular FAB, raised −18px above the bar, crimson background, white sparkle icon, hard shadow. This is the conversion anchor on every screen.
- Active state: filled icon + crimson label + 3px top accent bar (matches brand).
- Hidden items moved to a "More" sheet (About, Play Area, Blogs, Announcements, Branches) — accessible from the top-bar hamburger OR a swipe-up handle on the bottom bar.

---

## 5. Desktop navigation — exact spec

Keep the existing hanging-tile aesthetic, refine for density:

- Sticky top, 72px tall when scrolled, 96px at top.
- Left: logo + tagline (tagline hides <1280px).
- Center: 8 hanging tiles → trim to **6 primary** (Home, About, Programs, Gallery, Blogs, Contact). Move Play Area into Programs page-section, Announcements into a top-right "Notices 🔔" bell with a badge counter.
- Right: persistent "✨ Enroll Now" pill (crimson, hard shadow, slight bob animation on hover).
- **No hamburger** on desktop. If links exceed width at 1024–1199px, swap to compact text-only labels (drop emoji icons), still horizontal.

---

## 6. Layout, spacing, typography rules

**Spacing scale (4-pt base):** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 72 / 96. Mobile sections use 48–56, desktop 72–96. Card internal padding: 16 mobile / 24 desktop.

**Typography:**

- Display (Fredoka 700): clamp(28px, 5vw, 56px), line-height 1.05.
- H2: clamp(22px, 3.5vw, 36px).
- Body: 16px mobile / 17px desktop, line-height 1.6, max-width 65ch.
- Small/labels: 12px uppercase tracking 0.05em.
- Never below 14px on mobile body.

**Cards / grids:**

- Border-radius 20px mobile / 24px desktop.
- Shadow tokens: `--shadow-toy` rest, `--shadow-toy-lg` on hover (desktop only — disable hover transforms on touch via `@media (hover:hover)`).
- Grid gaps: 12 mobile / 20 tablet / 28 desktop.

**Visual density:** mobile shows 1 hero stat row + 1 program card per viewport; desktop shows 2 program cards + floating decorations simultaneously.

---

## 7. CTA hierarchy

| Priority | CTA | Desktop placement | Mobile placement |
|---|---|---|---|
| P0 | Enroll Now | Top-right pill + Hero + Contact section | Bottom-bar FAB + Hero |
| P1 | WhatsApp chat | Floating bottom-right bubble | Top-bar icon + Contact card |
| P1 | Call now | Footer + Contact | Top-bar icon (tel:) |
| P2 | Take a Tour | Hero secondary | Hero secondary (outlined) |
| P3 | Download brochure | Footer | "More" sheet |

Only **one P0** visible per viewport at a time to avoid CTA fatigue.

---

## 8. Accessibility & thumb-zone rules

- All interactive elements ≥44×44px (WCAG 2.5.5), bottom-bar items 56×56px.
- Bottom nav within easy-thumb arc: bottom 25% of screen, center FAB at the natural thumb pivot.
- Contrast: all text on cream ≥4.5:1; crimson-on-white verified AA, navy-on-cream AAA.
- Focus rings: 3px cyan outline + 2px offset on every focusable element.
- Bottom nav uses `<nav aria-label="Primary mobile">` with `aria-current="page"` on active item.
- `prefers-reduced-motion`: disable bob/swing/parallax; keep cross-fade only.
- Skip-to-content link before the top bar.
- Bottom bar uses `padding-bottom: env(safe-area-inset-bottom)` for iOS notch devices.

---

## 9. Interaction rules

- **Scroll spy:** IntersectionObserver (rootMargin `-40% 0px -55% 0px`) sets active section; both top tiles and bottom bar reflect it.
- **Sticky top bar:** shrinks 96→72px after 20px scroll, gains soft shadow.
- **Bottom bar:** auto-hides on scroll-down >120px, reappears on scroll-up (use `translateY` + 200ms ease). FAB never hides.
- **Anchor scroll:** smooth scroll with offset = top-bar height + 8px to avoid clipping headings.
- **Motion budget:** ≤3 simultaneous animations on screen; honor reduced-motion.
- **Loading:** skeletons for Gallery + Blogs (live data); no full-page spinner.

---

## 10. Mobile content simplification

- Hide all `SectionDeco` SVG layers (`hidden md:block`).
- Hero stats: 2×2 grid, 22px numbers (down from animated 56px).
- Programs: horizontal swipe carousel with snap + dot indicators (1 card per view).
- Gallery: 2-col masonry, lazy-load below the fold, lightbox on tap.
- Announcements ticker → single pinned card with "View all" link.
- Footer: collapse Quick Links / Programs / Branches into accordion sections.
- Forms: single-column, 48px input height, native input types (`tel`, `email`), inline validation.

---

## 11. Performance recommendations

- Bottom bar: pure CSS + 5 inline SVG icons, zero JS deps.
- Images: `loading="lazy"`, `decoding="async"`, AVIF/WebP via Supabase transform, `srcset` for hero.
- Defer Quill (admin) — already separate route.
- Inline critical hero CSS, defer Google Fonts with `font-display: swap`.
- Lighthouse targets: LCP <2.5s, CLS <0.05, TBT <200ms on mid-tier Android.
- Disable scroll-driven parallax on `prefers-reduced-data` and on connection `2g/slow-2g`.

---

## 12. Component structure (developer-ready)

```text
src/components/
  navigation/
    TopBar.tsx           // sticky, breakpoint-aware (renders desktop tiles or mobile compact)
    BottomNav.tsx        // mobile-only, fixed, 5 items + center FAB, scroll-hide
    MoreSheet.tsx        // shared bottom-sheet for overflow links (mobile + tablet hamburger)
    NavConfig.ts         // single source of truth: items, icons, hrefs, breakpoint visibility
  sections/              // (existing) Hero, About, Programs, Gallery, Blogs, ...
  shared/
    FloatingWhatsApp.tsx // hidden on mobile (in bottom bar), visible tablet+
    AnnouncementsBell.tsx
```

`NavConfig.ts` drives both desktop tiles and bottom bar from one array — no drift.

---

## 13. Implementation roadmap

**Phase 1 — Foundations (design system)**
- Lock spacing/typography tokens in `styles.css` (`--space-*`, fluid type clamps).
- Add `@media (hover:hover)` guards around all hover transforms.
- Add `safe-area-inset` utilities.

**Phase 2 — Navigation chrome**
- Build `NavConfig.ts`, `TopBar.tsx`, `BottomNav.tsx`, `MoreSheet.tsx`.
- Wire scroll-spy hook (shared between top + bottom).
- Replace existing `Navbar` import in `LiveHomePage`.

**Phase 3 — Section responsive pass**
- Hero: stack on mobile, hide floating cards.
- Programs: convert grid → swipe carousel <md.
- Gallery: 2/3/4 col + lightbox.
- Footer: accordion <md.
- Hide all `SectionDeco` <md.

**Phase 4 — Conversion polish**
- FAB Enroll behavior + scroll-hide bottom bar.
- WhatsApp + Call tel-links wired from `site_settings`.
- Reduced-motion + focus-ring audit.

**Phase 5 — QA + Lighthouse pass**
- Test on iPhone SE (375), iPhone 14 (390), Pixel 7 (412), iPad (768), iPad Pro (1024), MacBook (1440).
- Verify safe-area on iOS, gesture nav on Android.
- Lighthouse mobile + desktop ≥90 across all categories.

---

## 14. Final QA checklist

- [ ] Bottom nav visible only <768px, never overlaps content (page has `pb-24 md:pb-0`).
- [ ] FAB always visible, scrolls don't hide it.
- [ ] Active section highlights in both top tiles and bottom bar simultaneously.
- [ ] All tap targets ≥44px; bottom-bar items ≥56px.
- [ ] Safe-area inset respected on iPhone notch devices.
- [ ] Hero text readable without horizontal scroll at 320px width.
- [ ] No decorative SVG visible <768px.
- [ ] WhatsApp + Call links open correct apps from mobile top bar.
- [ ] Enquiry form submits and shows toast on success.
- [ ] Admin link present in footer, not in primary nav.
- [ ] Reduced-motion disables bob/swing/parallax.
- [ ] Lighthouse mobile: Perf ≥90, A11y ≥95, Best Practices ≥95, SEO ≥95.
- [ ] Keyboard tab order: skip-link → top bar → main → footer → bottom bar.
- [ ] Screen reader announces "Primary mobile navigation" on bottom bar.
- [ ] Live admin edits (logo, hero, gallery, blogs) reflect on homepage after refresh.

---

## Recommended architecture summary

> **One React component tree, two device-native navigation shells.** Desktop keeps the playful hanging-tile top bar with persistent Enroll CTA. Mobile gets a fixed 5-item bottom bar with a raised crimson Enroll FAB at the thumb pivot. Tablet bridges with a compact top bar + hamburger sheet. All navigation is driven by a single `NavConfig.ts`, scroll-spy keeps both shells in sync, and decorative density scales down predictably across breakpoints. Result: rich and informative on desktop, app-like and conversion-focused on mobile — without forking the codebase.

