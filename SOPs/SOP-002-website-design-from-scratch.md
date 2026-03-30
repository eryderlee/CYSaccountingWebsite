# SOP-002: Website Design — New Site from Scratch

**Version:** 1.0
**Last updated:** 2026-03-31
**Derived from:** CYS Accountants redesign project

---

## Overview

Use this SOP when a client has no existing website (or the existing site is being completely discarded). There is no reference clone to work from — brand, structure, and content all need to be defined before a single line of code is written. Expect more time on discovery and brand definition than when redesigning an existing site.

---

## Phase 0 — Client Discovery

### 0.1 Business fundamentals (7 questions)

| Question | Why it matters |
|---|---|
| What is the business name and tagline? | Meta tags, hero headline, footer |
| In one sentence, what does the business do? | Hero subheadline and about copy |
| Who is the primary customer? (demographics, pain points) | Tone, UX priorities, copy voice |
| What are the top 3–5 services or products? | Determines section structure and card count |
| What makes this business different from competitors? | Differentiator statement in hero/about |
| What is the physical location? (city, suburb, or online-only?) | Footer, contact section, meta geo tags |
| What are the contact details (phone, email, hours)? | Footer and contact section |

### 0.2 Goals and constraints (6 questions)

| Question | Why it matters |
|---|---|
| What is the single most important goal of this website? | Determines hierarchy and CTA placement |
| What action should visitors take first? | Primary CTA button text and placement |
| How many pages does the site need? | Single-page vs multi-page scoping |
| How will visitors contact you? (form / phone / email / booking link) | Contact section build |
| Is there a launch deadline? | Scoping and phase prioritisation |
| Is there a budget that affects technology choices? | Self-hosted vs platform, custom backend vs demo |

### 0.3 Brand assets inventory

Check what the client already has:

- [ ] Logo file (SVG preferred, PNG with transparency accepted)
- [ ] Existing brand colours (hex values or Pantone)
- [ ] Existing fonts (name of typeface, not just "our usual font")
- [ ] Professional photography the client owns the rights to
- [ ] Any written copy (about blurb, service descriptions, bio)
- [ ] Testimonials / reviews (text, name, date)

> If none of the above exist, everything gets built from scratch in Phase 1.

### 0.4 Competitive landscape

Ask for:
1. Two or three competitor website URLs
2. Two or three sites the client wishes theirs looked like (any industry)
3. One sentence describing the feeling they want their site to convey (e.g., "trustworthy and modern", "bold and creative", "calm and premium")

---

## Phase 1 — Brand Definition

### 1.1 Colour palette

**Step 1 — Brand personality descriptors**

Ask the client to pick 3 adjectives from this list (or suggest their own):

| Trustworthy | Bold | Playful | Elegant | Modern |
|---|---|---|---|---|
| Calm | Energetic | Premium | Friendly | Professional |
| Minimal | Warm | Technical | Creative | Approachable |

**Step 2 — Map descriptors to colour direction**

| Personality cluster | Colour direction |
|---|---|
| Trustworthy / Professional / Calm | Navy or deep blue primary, white/grey secondary |
| Bold / Energetic / Creative | Saturated primary, contrasting accent |
| Premium / Elegant / Minimal | Black or dark charcoal, gold or off-white accent |
| Warm / Friendly / Approachable | Warm mid-tones (terracotta, sage, warm grey) |
| Technical / Modern | Steel blue or dark slate, electric accent |

**Step 3 — Define 4–6 design tokens**

```
--color-primary:    #______  (main brand colour — headers, CTA buttons)
--color-accent:     #______  (highlight colour — hover states, icons, underlines)
--color-bg-light:   #______  (page background — usually #f8f9fa or #ffffff)
--color-bg-dark:    #______  (dark section background — about, footer)
--color-text:       #______  (body text — usually #1a1a2e or #333333)
--color-text-muted: #______  (secondary text — captions, labels)
```

**Step 4 — Accessibility validation**

Before finalising, verify contrast ratios at [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/):
- Body text on light background: **minimum 4.5:1**
- Large text / headings on dark background: **minimum 3:1**
- CTA button text on button background: **minimum 4.5:1**

### 1.2 Typography

Select one heading font and one body font. Keep it to two families maximum.

**Heading font options (Google Fonts, free):**

| Font | Best for |
|---|---|
| Montserrat (700/800) | Professional services, finance, law |
| Space Grotesk (600/700) | Tech, SaaS, modern agencies |
| Playfair Display (700) | Premium, luxury, editorial |
| Inter (600/700) | Neutral, versatile, product-focused |
| Raleway (600/800) | Creative, architecture, design |

**Body font options:**

| Font | Best for |
|---|---|
| Roboto (300/400) | Pairs with most heading fonts, high readability |
| Inter (400/500) | Works as both heading and body |
| Open Sans (400) | Friendly, approachable |
| Lato (300/400) | Warm and professional |

### 1.3 Generate BRANDING.md

Once colour and typography are confirmed, generate the brand document:

> "Based on the following decisions, produce a `BRANDING.md` file covering: colour palette (hex values + usage notes), typography (fonts, weights, treatments), logo file path and usage rules, button styles, layout and spacing system, imagery style, and copy voice/tone. Format as structured markdown with tables.
>
> Colours: [paste token list]
> Heading font: [name + weights]
> Body font: [name + weights]
> Personality: [3 adjectives]
> Industry: [e.g., accounting, legal, beauty]"

Review BRANDING.md and confirm all values before proceeding.

### 1.4 Copy and content checklist

Before writing any code, collect or draft the following content. Do not build with placeholders that haven't been approved — placeholder text almost never gets replaced.

- [ ] Hero headline (punchy, 5–10 words, benefit-focused)
- [ ] Hero subheadline (1–2 sentences expanding the headline)
- [ ] Primary CTA button text (action verb + outcome, e.g., "Get Your Free Quote")
- [ ] Service names (3–5), each with a short description (2–3 sentences)
- [ ] About / company story paragraph (3–5 sentences)
- [ ] 3–6 testimonials (quote text + name + date + service)
- [ ] Contact section headline + any explanatory text
- [ ] Footer tagline (different from hero subheadline)
- [ ] Meta title (60 chars max) and meta description (155 chars max)

---

## Phase 2 — Folder Structure

```
project-root/
├── assets/                         ← client-supplied files (logo, photos)
├── research/
│   ├── INSPIRATION.md
│   ├── reference-1/
│   │   ├── teardown.md
│   │   └── screenshots/
│   │       └── sections/
│   ├── reference-2/
│   │   ├── teardown.md
│   │   └── screenshots/
│   │       └── sections/
│   └── reference-3/
│       ├── teardown.md
│       └── screenshots/
│           └── sections/
├── redesign/
│   ├── assets/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── BRANDING.md
```

> Note: unlike SOP-001, there is no root `index.html` / `style.css` / `script.js` — `redesign/` is the only build target.

---

## Phase 3 — Research and Inspiration

### Target: exactly 3 reference sites

One more than the redesign SOP because there is no existing brand to anchor from. The references collectively establish the visual identity.

**Diversity target — one reference from each category:**

| Category | Purpose |
|---|---|
| Industry match | Confirms appropriate visual conventions for the sector |
| Desired animation quality | Sets the bar for interaction complexity |
| Desired layout / spacing | Establishes hierarchy and breathing room |

### Where to look

| Source | Best for |
|---|---|
| [Awwwards](https://awwwards.com) | Award-winning animations and interactions |
| [Godly](https://godly.website) | Agency, SaaS, portfolio — curated premium |
| [Land-book](https://land-book.com) | Real marketing and business sites |
| [Lapa Ninja](https://lapa.ninja) | Landing pages and hero treatments |
| [Mobbin](https://mobbin.com) | Mobile-first layouts and patterns |
| [SaaS Landing Page](https://saaslandingpage.com) | SaaS and product sites |
| Direct competitor URLs | Industry-appropriate patterns |

> **Agree on a one-sentence design direction with the client before searching.** For example: "We want a spacious, premium feel with subtle motion — like a high-end law firm, but warmer." This anchors reference selection and prevents scope creep.

### 3.1 Set up INSPIRATION.md

Create `research/INSPIRATION.md` from this extended template and give it to the client to fill in:

```markdown
# Design Inspiration Notes

## Reference 1 — (URL)

**Industry match:** yes / no — (notes)

**What I like:**


**What I don't like:**


---

## Reference 2 — (URL)

**Industry match:** yes / no — (notes)

**What I like:**


**What I don't like:**


---

## Reference 3 — (URL)

**Industry match:** yes / no — (notes)

**What I like:**


**What I don't like:**


---

## Overall Direction

(Describe the blend: e.g. "layout from ref 2, animations from ref 1, colour mood from ref 3")

**Things to avoid:**

**Must-have features:**
```

### 3.2 Run `/site-teardown` on each reference

```
/site-teardown https://reference-url.com
```

Save each output as:
- `research/reference-1/teardown.md`
- `research/reference-2/teardown.md`
- `research/reference-3/teardown.md`

### 3.3 Capture screenshots (Playwright MCP)

```
Navigate to https://reference-url.com
Take a full-page screenshot → research/reference-1/screenshots/full-page.png
Take a section screenshot of the hero → research/reference-1/screenshots/sections/hero.png
Take a section screenshot of the navigation → research/reference-1/screenshots/sections/nav.png
Take a section screenshot of the services/features area → research/reference-1/screenshots/sections/services.png
```

Repeat for all 3 references.

---

## Phase 4 — Design Direction Questions

Ask these **7 questions** before touching any build code. More questions than SOP-001 because there is no existing site to default from.

### Q1 — Site structure

> "Which sections do you want on the site? (tick all that apply)
> - [ ] Hero / above the fold
> - [ ] Services or products
> - [ ] About / team
> - [ ] Process / how it works
> - [ ] Portfolio / case studies
> - [ ] Testimonials / reviews
> - [ ] Pricing
> - [ ] FAQ
> - [ ] Blog / articles
> - [ ] Contact form
> - [ ] Footer"

### Q2 — Hero media type

> "For the hero section background:
> A) Static image (single strong visual)
> B) Image slideshow (3–5 images cycling with a fade)
> C) Looping background video (you provide the MP4)
> D) AI-generated video (we create using Nana Banana + Kling — see Phase 8)
> E) Abstract CSS/JS animation (floating particles or geometric shapes)"

### Q3 — Navigation style

> "For the navigation bar:
> A) Always visible, always solid (traditional)
> B) Transparent over hero, transitions to solid on scroll *(recommended)*
> C) Minimal — just a logo and one CTA button, no links
> D) Sidebar / off-canvas navigation"

### Q4 — Layout personality

> "Which layout feel suits the brand best?
> A) Spacious — generous whitespace, large type, calm (premium/luxury feel)
> B) Balanced — standard spacing, clear hierarchy (professional/corporate feel)
> C) Content-rich — denser layout, more info per section (informational/enterprise)
> D) Full-bleed — edge-to-edge sections, dramatic imagery (agency/creative feel)"

### Q5 — Interaction level

> "How much animation and motion do you want?
> A) Essential only — hover states, smooth scroll, no extras
> B) Tasteful — scroll-reveal on sections, smooth transitions *(recommended)*
> C) Expressive — custom cursor, parallax elements, entrance animations
> D) Minimal — static site, no JavaScript animations"

### Q6 — Extras (multi-select)

> "Which enhancements would you like?
> - [ ] Custom cursor (branded dot with trailing ring)
> - [ ] Page preloader (logo shown while assets load, then fades out)
> - [ ] Scroll progress bar (thin accent line at top tracking read progress)
> - [ ] Scroll-triggered reveal animations (sections animate in as user scrolls)
> - [ ] Parallax depth on hero or section backgrounds
> - [ ] Back-to-top button"

### Q7 — Social proof format

> "For the testimonials / reviews section:
> A) Horizontal infinite-scroll carousel (auto-scrolling, pauses on hover) *(recommended)*
> B) Static grid of cards
> C) Large featured quote with navigation arrows
> D) No reviews section at this stage"

---

## Phase 5 — Plan the Build

### 5.1 Assemble all context — verify before entering plan mode

- [ ] `BRANDING.md` written and reviewed
- [ ] `research/INSPIRATION.md` filled in by client
- [ ] `research/reference-1/teardown.md` exists
- [ ] `research/reference-2/teardown.md` exists
- [ ] `research/reference-3/teardown.md` exists
- [ ] Answers to Q1–Q7 confirmed
- [ ] Section list (Q1) confirmed
- [ ] Copy/content checklist (Phase 1.4) at least 80% complete

### 5.2 Enter plan mode

```
Enter plan mode. Using BRANDING.md, research/INSPIRATION.md, and the teardown
documents for [reference 1], [reference 2], and [reference 3], plus these design
decisions: [paste answers to Q1–Q7] and this section list: [paste Q1 checklist],
create a comprehensive phased implementation plan for the site. Structure it as
numbered phases, each independently buildable and verifiable. Include exact file
paths and a verification step per phase.
```

### 5.3 Review the plan before approving

- [ ] Every section from Q1 is covered
- [ ] Every enhancement from Q5 and Q6 is covered
- [ ] Responsive design is an explicit dedicated phase
- [ ] `prefers-reduced-motion` accessibility override is covered
- [ ] No phase depends on content from a later phase
- [ ] Copy placeholders are clearly marked and match the content checklist

**Decision point:** Do not approve until all of the above are confirmed.

### 5.4 Approve

Say: `"Plan approved. Begin Phase 1."`

---

## Phase 6 — Build the Site

### Standard 7-phase build structure

**Phase 1 — Foundation**
- `redesign/index.html` — full HTML shell with all section IDs as empty placeholders
- `redesign/style.css` — CSS custom properties (design tokens) from BRANDING.md + reset
- `redesign/script.js` — empty IIFE: `(function(){ 'use strict'; })();`
- Copy `assets/` → `redesign/assets/`
- Verification: page opens, no console errors, fonts loading

**Phase 2 — Navigation + Hero**
- Nav: selected style from Q3, hamburger menu, anchor smooth scroll
- Hero: selected media type from Q2, dark overlay, headline, subtitle, CTA button
- Verification: Playwright screenshot at desktop (1440px) and mobile (390px)

**Phase 3 — Core Content Sections**
- Build sections from Q1 checklist (services, about, process, portfolio, pricing, FAQ — whatever was selected)
- Apply scroll-reveal classes to all section content
- Verification: Playwright screenshot at each major section

**Phase 4 — Social Proof**
- Format as selected in Q7 (carousel, grid, featured quote, or skip)
- If carousel: use the infinite-scroll clone technique (JS clones cards → 2×, CSS animation scrolls −50%)
- Verification: Playwright screenshot

**Phase 5 — Contact + Footer**
- Contact: selected contact method from Q2 (form / phone / email / booking link)
- If form: 2-col layout — form (labels above inputs) + info panel
- Footer: logo + tagline / nav links / contact summary + copyright bar
- Verification: Playwright screenshot + form submission test

**Phase 6 — Enhancements**
Build only what was selected in Q5 and Q6:
- Preloader: full-screen overlay, centred logo, fades on `window.load + 400ms`
- Scroll progress: `position: fixed; top: 0; height: 3px;` accent bar, width driven by scroll %
- Custom cursor: 8px dot (exact mouse position) + 32px ring (rAF lerp at 12%), enlarges on `a, button, .card`
- Parallax: CSS `transform: translateY(calc(var(--scroll-y) * 0.3))` via JS scroll event
- Reveal animations: `IntersectionObserver` on `.js-reveal` → adds `.is-visible` class
- Back-to-top: appears after 500px scroll, smooth scroll to top
- Verification: Playwright screenshot

**Phase 7 — Responsive + Accessibility**
Standard breakpoints:

| Breakpoint | Changes |
|---|---|
| ≤ 1024px | Tighten nav padding, adjust grid gaps |
| ≤ 900px | Multi-col sections collapse to 1-col |
| ≤ 700px | Hamburger nav, hero text size reduction |
| ≤ 480px | Full-width cards, stacked icon + text, 16px base |

Also add:
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all CSS transitions and animations */
  /* Hide custom cursor */
  /* Stop carousel */
  /* Disable parallax */
}
```

Verification: Playwright screenshots at 1440, 1024, 768, 390px

---

## Phase 7 — Copy Review

Before signing off on the build, review all written content against these quality checks.

### Hero headline
- [ ] Punchy: 5–10 words
- [ ] Specific: names the outcome, not the process
- [ ] Benefit-focused: answers "what's in it for me?"
- [ ] Avoid: "Welcome to [Business Name]", "Your Trusted [Industry] Partner"

### CTA button
- [ ] Action verb + outcome (e.g., "Get Your Free Quote", "Book a Consultation", "See Our Work")
- [ ] Avoid: "Contact Us", "Learn More", "Click Here"

### Testimonials / reviews
- [ ] Real quotes with attribution (name + service + date)
- [ ] At least 3 reviews before launch
- [ ] If placeholders are used, they are clearly marked `[PLACEHOLDER]`

### SEO basics
- [ ] Single `<h1>` on the page
- [ ] Heading hierarchy: h1 → h2 → h3 (no skipped levels)
- [ ] All images have descriptive `alt` text
- [ ] Page load under 3 seconds on a mid-range connection
- [ ] No broken links

---

## Phase 8 — AI Hero Video (Nana Banana → Kling)

Use when Q2 answer was D (AI-generated video). Since there is no existing site imagery to reference, the prompt must be built entirely from BRANDING.md.

### Step 1 — Generate start frame (Nana Banana)

Use this prompt structure (fill in from BRANDING.md):

```
[Industry/setting], [time of day] lighting, [primary colour] and [accent colour]
tones visible naturally in furnishings/decor, no people visible,
cinematic wide angle, photorealistic, 16:9 aspect ratio, 8K
```

Example for a new accounting firm:
```
Modern accounting office interior, warm morning light through floor-to-ceiling
windows, navy and teal tones in furnishings and artwork, no people,
cinematic wide angle, 8K photorealistic, 16:9
```

Download as PNG → **start frame**.

### Step 2 — Generate end frame (Nana Banana)

Modify the prompt with a subtle environmental shift:
- Light angle shifted slightly (morning → mid-morning)
- Camera position nudged 3–5% closer or sideways
- Same composition otherwise

Use the start frame as a reference image in Nana Banana if supported.
Download as PNG → **end frame**.

### Step 3 — Generate video (Kling)

Go to [klingai.com](https://klingai.com):
- Mode: **Image-to-Video** (start + end frame)
- Duration: **5–8 seconds**
- Motion: **Low** (high motion looks unnatural as a background)
- Quality: **Professional**

Prompt:
```
Slow smooth ambient camera drift, soft [lighting quality] light,
calm professional atmosphere, no rapid movement
```

Download the MP4.

### Step 4 — Compress for web

Target: under 8MB, H.264 codec, no audio.

```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -an hero.mp4
```

Or use Handbrake: Preset → Web > Gmail Large 3 Minutes 720p30, remove all audio tracks.

### Step 5 — Deploy

Save as `redesign/assets/hero.mp4`. The site auto-detects it via `fetch HEAD` — no code changes needed. If the file isn't present, the site falls back to the image slideshow.

---

## Phase 9 — Playwright Verification

Run after each build phase.

### Standard sequence

```
Navigate to file:///absolute/path/redesign/index.html
Resize viewport to 1440x900
Take screenshot → redesign/screenshots/phase-N-desktop.png
Resize to 390x844
Take screenshot → redesign/screenshots/phase-N-mobile.png
```

### Screenshot checklist

- [ ] No horizontal overflow (scrollbar visible = fail)
- [ ] Text is legible against its background
- [ ] Images loaded (no broken image icons)
- [ ] Nav present and correctly positioned
- [ ] CTA button visible

### Full interaction pass (Phase 6+)

```
Navigate to file:///absolute/path/redesign/index.html
Wait 2500ms for preloader to dismiss
Take screenshot — verify preloader gone
Scroll to Y=200px
Take screenshot — verify nav is solid
Scroll to bottom of page
Take screenshot — verify scroll progress bar at 100%
```

---

## Phase 10 — GitHub

### Commit after each phase

```bash
git add redesign/
git commit -m "Phase N: short description"
git push
```

**Never use `git add -A` or `git add .`** — stage specific files/folders only to avoid accidentally committing `.env`, credentials, or large binaries.

### .gitignore minimum

```
.claude/
*.DS_Store
Thumbs.db
# Research screenshots (large files, local only)
research/*/screenshots/
```

---

## Phase 11 — Launch Checklist

More extensive than SOP-001 because there is no existing site to fall back on — this is the first impression.

### Technical pre-launch

- [ ] All placeholder copy replaced with client-approved content
- [ ] Hero video: `autoplay muted loop playsinline` attributes present, poster fallback set
- [ ] Contact form: submit flow tested end-to-end
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`
- [ ] Favicon present
- [ ] Meta title and description present and reviewed
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`) — for social sharing previews
- [ ] `robots.txt` present (at minimum: `User-agent: * / Allow: /`)
- [ ] No console errors in production
- [ ] Lighthouse audit: 90+ on Performance and Accessibility
- [ ] `prefers-reduced-motion` tested: enable OS accessibility setting, verify all animations stop

### Content pre-launch (written client sign-off required)

- [ ] All copy approved in writing by client
- [ ] All images final (not placeholder)
- [ ] Business details verified (phone, address, hours, email)
- [ ] Logo in final approved version
- [ ] Testimonials confirmed as real and approved for publication

### Deploy options

| Platform | Method |
|---|---|
| Netlify | Drag-and-drop `redesign/` folder at app.netlify.com, or `netlify deploy --prod` |
| Vercel | `vercel --prod` from project root (set output dir to `redesign`) |
| GitHub Pages | Settings → Pages → Source: `redesign/` folder on `main` branch |
| cPanel | Upload `redesign/` contents (not the folder itself) to `public_html/` |
| Cloudflare Pages | Connect GitHub repo, output directory: `redesign` |

### Post-launch

- [ ] Cross-browser check: Chrome, Firefox, Safari (if Mac available), Edge
- [ ] iOS video test: open on an iPhone, confirm hero video plays muted with `playsinline`
- [ ] Submit to Google Search Console (add property → verify via DNS or HTML tag)
- [ ] Share live URL with client for final approval

### Deliverables to client

- [ ] Live URL
- [ ] `BRANDING.md` — their permanent brand reference document
- [ ] Project folder as ZIP backup
- [ ] Brief summary of what was built, any placeholder content still needing replacement, and recommended next steps (real reviews, form backend, blog, etc.)

---

## Quick Reference

### Tools used in this SOP

| Tool / Skill | When to use |
|---|---|
| `/site-teardown` | Analyse each reference site → teardown.md |
| Plan mode | Before writing any build code |
| Playwright MCP | Visual verification after each build phase |
| WebAIM Contrast Checker | Validate colour accessibility before BRANDING.md |
| Nana Banana | Generate start + end frame images for hero video |
| Kling | Generate hero video from start/end keyframes |
| `ffmpeg` / Handbrake | Compress hero video for web (<8MB) |
| Google Search Console | Submit site post-launch |
| `gh` CLI | Create and manage GitHub repository |

### Design questions cheat sheet

1. Site structure: which sections?
2. Hero media: static / slideshow / video / AI video / CSS animation?
3. Nav style: always solid / transparent→solid / minimal / sidebar?
4. Layout personality: spacious / balanced / content-rich / full-bleed?
5. Interaction level: essential / tasteful / expressive / minimal?
6. Extras: cursor / preloader / scroll-progress / reveal / parallax / back-to-top?
7. Social proof: carousel / static grid / featured quote / none?

### Key differences from SOP-001 (Redesign)

| Aspect | SOP-001: Redesign | SOP-002: From Scratch |
|---|---|---|
| Reference sites | 2–3 | 3 (required) |
| Brand foundation | Clone existing site | Build from personality + tokens |
| BRANDING.md source | Extracted from live site | Constructed from decisions |
| Design questions | 4 | 7 |
| Phase count | 9 | 11 |
| Copy review | Implicit | Explicit dedicated phase |
| Launch checklist | Standard | Extended (OG tags, robots.txt, Search Console, client sign-off) |
| Risk profile | Lower (brand established) | Higher (all decisions are new) |
