# SOP-001: Website Redesign — Existing Site

**Version:** 1.0
**Last updated:** 2026-03-31
**Derived from:** CYS Accountants redesign project

---

## Overview

Use this SOP when a client has a live website and wants it rebuilt better. The existing site is the source of truth for brand, content, and structure. The goal is an elevated, modern rebuild that preserves identity while improving design quality, UX, animations, and code standards.

---

## Phase 0 — Client Intake

### 0.1 Get the raw HTML

Ask the client to:
1. Open their homepage in Chrome
2. Press `Ctrl+U` (View Source)
3. Press `Ctrl+A` then `Ctrl+C` to copy all
4. Paste directly into the chat

> Why paste HTML instead of providing the URL? Pasted HTML captures the exact current state. Direct fetching may miss dynamically loaded content, CMS-injected copy, or assets behind authentication.

### 0.2 Collect assets

- [ ] Logo file (SVG or PNG with transparency preferred)
- [ ] Any photography or imagery the client owns the rights to
- [ ] Any existing brand guidelines document (if one exists)
- [ ] Git repo URL or FTP access (if the codebase is available)

### 0.3 Ask these 7 business questions

| Question | Why it matters |
|---|---|
| What is the business name and tagline? | Meta tags, hero, footer |
| Who is the primary audience? | Influences tone and UX |
| What are the top 3–5 services or products? | Determines section structure |
| What are the contact details (address, phone, email, hours)? | Footer and contact section |
| Are there any sections or content that must NOT change? | Avoids breaking legal/compliance copy |
| What do you dislike most about the current site? | Informs the redesign brief |
| What is the rough timeline or launch deadline? | Scoping |

---

## Phase 1 — Clone and Analyse the Existing Site

### 1.1 Create the project folder structure

```
project-root/
├── assets/                         ← client-supplied files
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
├── BRANDING.md
├── index.html                      ← cloned original
├── style.css                       ← cloned original
└── script.js                       ← cloned original
```

### 1.2 Build the clone

Prompt:
> "Here is the raw HTML of the existing site. Please split it into three files: `index.html`, `style.css`, and `script.js`. Keep all content and styles exactly as-is — do not improve or redesign anything. This is the reference clone."

Verify the clone renders correctly by opening in a browser. Note any broken asset paths or missing images.

### 1.3 Generate BRANDING.md

Prompt:
> "Analyse `index.html` and `style.css` and produce a `BRANDING.md` file covering: colour palette (hex values + usage notes), typography (fonts, weights, treatments), logo file path and usage rules, iconography library and icons in use, button styles, layout and spacing system, imagery style, and copy voice/tone. Format as structured markdown with tables."

Review BRANDING.md and correct any values Claude could not reliably extract (exact image dimensions, icon library version, etc.).

---

## Phase 2 — Research and Inspiration

### 2.1 Find 2–3 reference sites

**Target: exactly 2–3 sites.** More creates decision fatigue. Fewer gives insufficient creative direction.

Where to look:

| Source | Best for |
|---|---|
| [Awwwards](https://awwwards.com) | Award-winning animations and interactions |
| [Land-book](https://land-book.com) | Real marketing and business sites |
| [Godly](https://godly.website) | Agency, SaaS, portfolio — curated premium |
| [Lapa Ninja](https://lapa.ninja) | Landing pages and hero treatments |
| Direct competitors | Industry-appropriate patterns |

### 2.2 Set up INSPIRATION.md

Create `research/INSPIRATION.md` from this template and give it to the client to fill in:

```markdown
# Redesign Inspiration Notes

## Reference 1 — (URL)

**What I like:**


**What I don't like:**


## Reference 2 — (URL)

**What I like:**


**What I don't like:**


## Reference 3 — (URL, if applicable)

**What I like:**


**What I don't like:**


## Overall Direction

(Describe the blend: e.g. "layout from ref 2, animations from ref 1")

**Must keep from current site:**
```

### 2.3 Run `/site-teardown` on each reference

For each reference URL the client has noted:

```
/site-teardown https://reference-url.com
```

The skill fetches HTML, JS, and CSS and outputs a detailed document covering layout, colour palette, typography, animation patterns, and component structure.

Save each output as:
- `research/reference-1/teardown.md`
- `research/reference-2/teardown.md`

### 2.4 Capture screenshots (Playwright MCP)

```
Navigate to https://reference-url.com
Take a full-page screenshot → research/reference-1/screenshots/full-page.png
Take a section screenshot of the hero → research/reference-1/screenshots/sections/hero.png
Take a section screenshot of the navigation → research/reference-1/screenshots/sections/nav.png
```

---

## Phase 3 — Design Direction Questions

Ask these **4 questions** before touching any build code. Each answer has significant technical implications — do not assume.

### Q1 — Hero media type

> "For the hero section background, which do you prefer?
> A) Static image (single strong visual)
> B) Image slideshow (3–5 images cycling with a fade transition)
> C) Looping background video (you provide the MP4)
> D) AI-generated video (we create using Nana Banana + Kling — see Phase 6)
> E) Abstract CSS/JS animation (floating particles or geometric shapes — no file needed)"

### Q2 — Navigation scroll behaviour

> "For the navigation bar, which scroll behaviour do you prefer?
> A) Always visible, always solid navy (traditional)
> B) Transparent over the hero, transitions to solid as you scroll down *(recommended)*
> C) Hidden when scrolling down, reappears when scrolling up
> D) Solid always, but shrinks in height on scroll"

### Q3 — Reviews / testimonials

> "For the social proof section:
> A) Horizontal infinite-scroll carousel (auto-scrolling, pauses on hover) *(recommended)*
> B) Static grid of cards
> C) Large featured quote with navigation arrows
> D) No reviews section at this stage"

### Q4 — Extras (multi-select)

> "Which of these enhancements would you like?
> - [ ] Custom cursor (branded teal dot with trailing ring)
> - [ ] Page preloader (logo shown while assets load, then fades out)
> - [ ] Scroll progress bar (thin teal line at top tracking read progress)
> - [ ] Scroll-triggered reveal animations (sections animate in as user scrolls)
> - [ ] Back-to-top button"

---

## Phase 4 — Plan the Build

### 4.1 Enter plan mode

```
Enter plan mode. Using BRANDING.md, research/INSPIRATION.md, and the teardown
documents for [reference 1] and [reference 2], plus these design decisions:
[paste answers to Q1–Q4], create a comprehensive phased implementation plan
for the redesign. Structure it as numbered phases, each independently buildable
and verifiable. Include exact file paths and a verification step per phase.
```

### 4.2 Review the plan before approving

- [ ] Every section the client mentioned is covered
- [ ] Every enhancement from Q4 is covered
- [ ] Responsive design is an explicit dedicated phase
- [ ] `prefers-reduced-motion` accessibility override is covered
- [ ] No phase depends on content from a later phase

**Decision point:** Do not approve until all of the above are confirmed.

### 4.3 Approve

Say: `"Plan approved. Begin Phase 1."`

---

## Phase 5 — Build the Redesign

### Standard 7-phase build structure

**Phase 1 — Foundation**
- Copy `assets/` → `redesign/assets/`
- `redesign/index.html` — full HTML shell: all section IDs as empty placeholders
- `redesign/style.css` — CSS custom properties (design tokens) from BRANDING.md + reset
- `redesign/script.js` — empty IIFE: `(function(){ 'use strict'; })();`
- Verification: page opens, no console errors, fonts loading

**Phase 2 — Navigation + Hero**
- Nav: transparent → solid scroll transition, hamburger menu, anchor smooth scroll
- Hero: selected media type, dark overlay, headline, subtitle, CTA button, stats bar (if desired)
- Verification: Playwright screenshot at desktop (1440px) and mobile (390px)

**Phase 3 — Services + About**
- Services: 2-col card grid with icon boxes, headings, body copy, hover effects
- About: dark navy section with company story and credential/partner images
- Verification: Playwright screenshot

**Phase 4 — Reviews**
- Format as selected in Q3 (carousel or grid)
- If carousel: use the infinite-scroll clone technique (JS clones 6 cards → 12, CSS animation scrolls −50%)
- Verification: Playwright screenshot

**Phase 5 — Contact + Footer**
- Contact: 2-col layout — form (labels above inputs, 2-col field rows, arrow submit button) + info panel
- Footer: 3-col (logo + tagline / nav links / contact summary) + copyright bar
- Verification: Playwright screenshot + form submission test

**Phase 6 — Enhancements**
Build only what was selected in Q4:
- Preloader: full-screen navy overlay, centred logo, fades on `window.load + 400ms`
- Scroll progress: `position: fixed; top: 0; height: 3px;` teal bar, width driven by scroll %
- Custom cursor: 8px dot (exact mouse position) + 32px ring (rAF lerp at 12%), enlarges on `a, button, .card`
- Reveal animations: `IntersectionObserver` on `.js-reveal` → adds `.is-visible` class
- Back-to-top: appears after 500px scroll, smooth scroll to top
- Verification: Playwright screenshot

**Phase 7 — Responsive + Accessibility**
Standard breakpoints:

| Breakpoint | Changes |
|---|---|
| ≤ 1024px | Tighten nav padding, adjust grid gaps |
| ≤ 900px | Services + credentials + contact collapse to 1-col |
| ≤ 700px | Hamburger nav, hero text size reduction |
| ≤ 480px | Full-width cards, stacked icon + text, 16px base |

Also add:
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all CSS transitions and animations */
  /* Hide custom cursor */
  /* Stop carousel */
}
```

Verification: Playwright screenshots at 1440, 1024, 768, 390px

---

## Phase 6 — AI Hero Video (Nana Banana → Kling)

Use when Q1 answer was D (AI-generated video).

### Step 1 — Generate start frame (Nana Banana)

Prompt structure:
```
[Industry/setting], [time of day] lighting, [brand colour] accent tones
visible naturally, no people visible, cinematic wide angle,
photorealistic, 16:9 aspect ratio
```

Example for an accounting firm:
```
Modern accounting office interior, warm morning light through floor-to-ceiling
windows, navy and teal tones in furnishings, no people, cinematic wide angle,
8K photorealistic, 16:9
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

## Phase 7 — Playwright Verification

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

## Phase 8 — GitHub

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

## Phase 9 — Handoff and Deploy

### Pre-launch checklist

**Technical:**
- [ ] All placeholder copy replaced with client-approved content
- [ ] Hero video: `autoplay muted loop playsinline` attributes present, poster fallback set
- [ ] Contact form: submit flow tested end-to-end
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`
- [ ] Favicon present
- [ ] Meta title and description present
- [ ] No console errors in production
- [ ] Lighthouse audit: 90+ on Performance and Accessibility
- [ ] `prefers-reduced-motion` tested: enable OS accessibility setting, verify all animations stop

**Content:**
- [ ] All images final (not placeholder)
- [ ] Business details verified (phone, address, hours, email)
- [ ] Logo in final approved version

### Deploy options

| Platform | Method |
|---|---|
| Netlify | Drag-and-drop `redesign/` folder at app.netlify.com, or `netlify deploy --prod` |
| Vercel | `vercel --prod` from project root (set output dir to `redesign`) |
| GitHub Pages | Settings → Pages → Source: `redesign/` folder on `main` branch |
| cPanel | Upload `redesign/` contents (not the folder itself) to `public_html/` |
| Cloudflare Pages | Connect GitHub repo, output directory: `redesign` |

### Deliverables to client

- [ ] Live URL
- [ ] `BRANDING.md` — their permanent brand reference document
- [ ] Project folder as ZIP backup
- [ ] Brief summary of what was built and any pending items (real reviews, form backend, etc.)

---

## Quick Reference

### Tools used in this SOP

| Tool / Skill | When to use |
|---|---|
| `/site-teardown` | Analyse each reference site → teardown.md |
| Plan mode | Before writing any build code |
| Playwright MCP | Visual verification after each build phase |
| Nana Banana | Generate start + end frame images for hero video |
| Kling | Generate hero video from start/end keyframes |
| `ffmpeg` / Handbrake | Compress hero video for web (<8MB) |
| `gh` CLI | Create and manage GitHub repository |

### Design questions cheat sheet

1. Hero media: static / slideshow / video / AI video / CSS animation?
2. Nav scroll: always solid / transparent→solid / hide-on-scroll / shrink-on-scroll?
3. Reviews: infinite carousel / static grid / featured quote / none?
4. Extras: cursor / preloader / scroll-progress / reveal animations / back-to-top?
