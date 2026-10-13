# MaaMadurai Street Food — Design System

A design system for **MaaMadurai Street Food**, a Tamil (Madurai-style) street-food
restaurant in Toongabbie, Western Sydney, Australia. It serves biryani, kothu
parotta, dosai, idly, Chettinad-leaning gravies and Madurai street classics
(Jigarthanda, Goli Soda) from Shop P34, Portico Plaza, 17–19 Aurelia Street.

## Sources

- **Brand Guidelines PDF** — `uploads/maamadurai brand Guidelines.pdf` (6-page print
  brand book: logo do's/don'ts, color palette, primary/secondary typography, social
  post size specs).
- **Production codebase (GitHub)** — [`maamaduraim-syd/maamadurai`](https://github.com/maamaduraim-syd/maamadurai)
  (private repo), the live Next.js + Tailwind marketing site for maamadurai.com.au.
  This is the **ground truth** for real, shipped colors, type, spacing, copy and
  component patterns — it was read directly (`app/page.tsx`, `app/globals.css`,
  `app/layout.tsx`, `components/ContactForm.tsx`, `components/InstagramFeed.tsx`,
  `app/api/index.js` menu data) to build everything in this system. Explore that
  repo directly for the freshest source of truth, deployment config, and any
  content that has changed since this system was built.

There is exactly **one product**: the public marketing website. There is no
separate mobile app, admin dashboard, or ordering platform in the codebase —
online ordering happens through third-party delivery apps (Uber Eats, DoorDash),
linked out from the site.

## What's in this project

- `styles.css` — root stylesheet, import-only. Link this one file.
- `tokens/` — color, typography, spacing/radius/shadow/motion, and font-face CSS.
- `components/` — reusable React UI primitives, grouped by concern.
- `ui_kits/website/` — full click-through recreation of the marketing site.
- `assets/` — logo, food photography, restaurant interior shots, founder photo.
- `guidelines/` — foundation specimen cards (see the Design System tab).
- `SKILL.md` — portable skill definition for use in Claude Code.

## Fonts — flagged substitution

The Brand Guidelines PDF names **"Elephant"** as the primary display font and two
proprietary Tamil faces, **TAMIL-UNI025 / TAMIL-UNI005**, as secondary fonts.
None of these are distributable webfonts, and none of them are what the
production site actually ships. The live site uses **Cinzel** (serif display)
and **Poppins** (body) via Google Fonts — that's what this system uses too,
since the shipped code is ground truth. For Tamil-script copy (e.g. the Thirukkural
quote and "தூங்கா நகரத்தின்..." line in "Our Story"), **Noto Sans Tamil** is
substituted so the text actually renders.

**Ask:** if you have the real "Elephant" font files and the Tamil-UNI font files,
attach them and we'll swap the `@font-face` declarations in `tokens/fonts.css` —
this would bring headings and Tamil copy fully in line with the print brand book.

## Intentional additions

No component library existed in the source repo (`page.tsx` is one large inline-styled
page plus two page-section components). The component set here was reverse-engineered
from the *actual coded patterns* on the page — every component corresponds to a real,
shipped visual pattern, not an invented one. One addition: **`Icon`**, a small wrapper
so the lucide-react icons and inline social-brand SVGs the site uses are available as
one consistent primitive — reasonable given the site imports icons from `lucide-react`.

---

## Content fundamentals

**Voice:** warm, hospitable, a little devotional about the home city. Copy leans on
Tamil words used deliberately (not decoratively) and always glosses them in English
in the same breath: <em>"Vaanga, Sapdalam" – come, eat with us</em>; <em>virundhombal
(cherishing guests)</em>; <em>amma veedu (mother's home)</em>. This is a brand that
treats language as part of the hospitality, not a translation afterthought.

**Person:** mixes direct address ("you feel like you are eating at your amma
veedu") with first-person-plural warmth ("we started this restaurant to recreate
that same warmth in Sydney"). Never corporate "we're proud to announce" language.

**Casing & punctuation:** section headings are Title Case ("Our Story," "Our
Values," "Opening Hours"). Body copy is full sentences, no bullet-fragment
marketing-speak. En dashes for ranges ("Tue–Fri 11am–9pm"). Restaurant/dish
proper nouns keep their Tamil spelling and capitalization exactly (Seeraga Samba,
Kothu Parotta, Jigarthanda, Ulundu Vadai) — never anglicized or simplified.

**Emoji:** none, anywhere in the shipped UI. The only non-Latin glyphs are Tamil
script itself (used as real language, in prose and in a literary quotation from
the Thirukkural), plus a ✓ checkmark on the contact-form success message and
plain unicode bullet/middot separators (·) in the hours strip.

**Signature lines actually shipped in copy** (for tone reference — do not reuse
verbatim as filler, these are real brand copy):
- <em>"A journey through the rich tapestry of Indian flavours, in the heart of Sydney's Western Suburbs."</em>
- <em>"In Tamil, 'Maa' also means Great, and MaaMadurai celebrates Great Madurai."</em>
- The Thirukkural (Kural 82) is quoted in Tamil with an English couplet translation directly beneath it — literary, not source-cited inline (attribute to Thirukkural if reused).

**Tagline device:** "Great Madurai" recurs as a phrase across headings and body
copy (Great Madurai experience, Great Madurai unavu veedu) — it's the brand's
one repeating rhetorical hook.

---

## Visual foundations

**Color:** one dominant warm palette — a deep sindoor/brick red field
(`--background` #7d1d0d) with two lighter red steps for stacked surfaces
(`--background-elevated`, `--background-card`), and a single turmeric-gold accent
(`--accent-primary` #face0b) used for every interactive/emphasis moment: active
tab, headings' underline rule, prices, link hover, focus rings, CTA fills. White
and a warm off-white (`--foreground-muted` #f5f0e8) are the only text colors.
There is no blue, no purple, no gradient-as-decoration — the one gradient in the
whole UI is a functional black scrim behind hero text and image-card titles, never
a brand-color gradient. A cool lavender (`--accent-secondary`) exists in code for
one badge but isn't live on the page — use sparingly, it reads as an outlier
against the otherwise all-warm palette.

**Type:** two families only. **Cinzel** (serif, engraved/monumental letterforms)
for every heading — it's what gives the brand its "temple town / heritage"
feeling, reinforced by small-caps styling on the hero H1. **Poppins** (geometric
sans, weights 300–900) for all body copy, nav, buttons, form fields. Headings are
large and centered (48–96px), body text is comfortably sized (16–20px) with loose
1.6 line-height — nothing condensed or dense. Tamil-script lines use the same
serif/weight logic conceptually but need a Tamil-capable face (Noto Sans Tamil).

**Spacing & layout:** the entire page is a stack of "floating panel" sections —
each one a `background-elevated` rounded rectangle (`border-radius: 1rem`),
`max-width: 1280px`, centered, with large vertical padding (64px) — sitting on
the deep red page background with visible red gutters above/below/beside each
panel. This full-bleed-background + inset-card rhythm is the system's single
biggest structural signature; don't flatten sections edge-to-edge or drop the
red gutter margin.

**Imagery:** warm, saturated, appetite-forward food photography — shot close,
naturally lit, no black-and-white or desaturated treatment, no heavy grain or
filters. A rotating full-bleed hero banner (4 dish photos crossfading every 5s)
sits behind a black scrim (70% mobile / 50% desktop) so white hero type stays
readable. Menu highlight tiles are square crops with a bottom-up black gradient
scrim for title legibility. Restaurant/interior photography (the "About Us"
image) is a flat, unfiltered on-site photo, not styled lifestyle photography.

**Backgrounds:** solid color only for the page canvas; no patterns, no textures,
no illustration. Full-bleed only for the hero banner; every other section is an
inset panel (see Spacing above).

**Animation:** subtle, all Framer Motion. Sections fade-and-rise into view once on
scroll (`opacity 0→1`, `y +50→0`, 0.8s, `viewport once: true` — never re-triggers).
Hero banner images crossfade with a slight scale-down (1.1→1.0, 1.5s). Menu grid
items and Instagram tiles stagger in with a small per-item delay (0.05–0.1s ×
index). No bounce, no spring easing anywhere except one icon pop (Instagram
glyph scales in with a spring on first view) — treat that as the one expressive
exception, not the rule. A loading spinner (border-top-transparent, linear,
infinite) shows on form submit.

**Hover states:** color-shift only, never scale-on-container (except explicit
image-zoom cases). Buttons/pills darken or invert to the gold accent
(`bg-accent-primary/90`, or card-red → gold). Links go from muted white/grey to
full white or gold. Menu image tiles get a 2px gold border and the image itself
zooms 1.0→1.1 over 500ms — that zoom is scoped to the `<img>`, not the whole
card, so the border and gradient scrim stay crisp.

**Press states:** not explicitly coded (no `:active` scale/darken rules found in
source) — rely on the hover treatment holding through the click, don't invent a
separate press animation.

**Borders:** hairline gold-tinted borders at low opacity (`rgba(250,206,11,0.2–0.3)`)
outline every panel and separate them from the red page background — this is
the only border color used. Never a stark white or black border.

**Shadows:** minimal. A soft ambient shadow (`0 8px 40px rgba(0,0,0,0.25)`) only
on the embedded Google-reviews widget frame, and a stronger `shadow-2xl` only on
the "About Us" restaurant photo. Cards and buttons are otherwise flat — depth
comes from color-layering (red → redder → gold), not drop shadows.

**Corner radii:** generous and consistent — `0.75–1rem` for cards/panels/buttons,
full pill (`9999px`) for tag chips, tab-style CTAs, and every circular
avatar/social icon. Nothing sharp-cornered except the dotted menu-price leader line.

**Transparency & blur:** `backdrop-blur` + translucent background appears exactly
twice: the logo/location pill in the hero header (`bg-background-card/50
backdrop-blur-sm`) and floating scroll-arrows on the mobile Instagram carousel.
It's reserved for controls that float *over* imagery, never for static panels.

**Fixed elements:** the top info strip (phone/email/hours/social) is `sticky
top-0`, and auto-hides itself (height/opacity to 0) once the user scrolls past
60px — it's a peek-then-disappear utility strip, not a persistent nav bar. There
is no persistent header/nav beyond that strip.

---

## Iconography

- **System:** [lucide-react](https://lucide.dev) (stroke icons, 24×24 viewBox,
  2px stroke, round caps/joins) — the only icon set imported in the codebase
  (`MapPin`, `Leaf`, `Flame`, `Instagram`, `ChevronLeft/Right`, `Heart`,
  `MessageCircle`, plus unused-but-imported `UtensilsCrossed`, `Calendar`,
  `Gift` for a currently-commented-out promo row).
- **Brand/social marks:** hand-authored inline `<svg>` fill icons (not from
  lucide) for Facebook, Instagram, TripAdvisor, Uber Eats, and DoorDash — copied
  verbatim into `components/icons/Icon.jsx` and exposed via the same `Icon`
  component (`name="facebook"`, etc.) so both icon families share one API.
  Contact/phone/mail glyphs in the top info strip are also small hand-authored
  inline SVGs, not lucide.
- **No icon font, no PNG icons, no emoji** anywhere in the product.
- **Usage:** small (14–24px) and always paired with text or a clear circular
  hit-target (48px social buttons in Contact, 36px on the top strip). Dietary
  tags (Leaf = veg, Flame = spicy) sit inline next to a dish name at 14px.

## Assets copied into this system

- `assets/logos/logo.png` — the real MaaMadurai circular logo (site favicon/header mark).
- `assets/imagery/` — restaurant interior photos (landscape + portrait crops used
  in "About Us") and a founder headshot.
- `assets/food/` — 11 real dish photographs used across the hero banner and menu
  highlight grid (biryani, kothu parotta, chicken 65, mutton chukka, kola urundai,
  goli soda, pepper chicken, etc).

No separate logo mark needed to be drawn — the real file was available and used as-is.

---

## Components

Grouped by concern under `components/`:

- **`icons/Icon`** — the full lucide + brand-mark icon set behind one component.
- **`buttons/Button`** — solid / tab / tabActive / outline pill variants.
- **`forms/Input`, `forms/Textarea`** — contact-form fields (default/focus/error).
- **`cards/SectionPanel`, `cards/SectionRule`** — the site's one recurring section wrapper + gold divider.
- **`cards/MenuHighlightCard`** — square dish photo tile with gradient scrim.
- **`cards/MenuItemRow`** — full-menu list row (name + dietary icon + dotted leader + price).
- **`navigation/CategoryTabs`** — menu category pill switcher.
- **`social/SocialIconButton`** — circular social/delivery-platform link button.
- **`feedback/Badge`** — small pill tag (e.g. a discount badge).

## UI kits

- **`ui_kits/website/`** — click-through recreation of the marketing site: hero
  with rotating banner, menu (highlights + full list toggle), About Us/Our Story,
  Instagram feed section, Google reviews embed placeholder, opening hours &
  location, contact form, footer.

## Design System tab

Foundation specimen cards live in `guidelines/` (Colors, Type, Spacing, Brand
group). Component cards live alongside each component in `components/`. The
website UI kit card lives in `ui_kits/website/`.

## Menu pricing note

The full current menu (Square in-store prices, used as ground truth for the
UI kit) is in `guidelines/menu-pricing-current.md` — it supersedes the stale
prices baked into the old repo's `app/api/index.js`.

---

## Index / manifest

Root:
- `readme.md` — this file.
- `SKILL.md` — portable skill definition (Claude Code-compatible).
- `styles.css` — root stylesheet (import-only — link this one file).

`tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`.

`components/` (grouped by concern; each dir has `<Name>.jsx` + `.d.ts` +
`.prompt.md` + one `@dsCard`-tagged `.card.html`):
- `buttons/Button`
- `cards/SectionPanel` (+`SectionRule`), `cards/MenuHighlightCard`, `cards/MenuItemRow`
- `feedback/Badge`
- `forms/Input`, `forms/Textarea`
- `icons/Icon`
- `navigation/CategoryTabs`
- `social/SocialIconButton`

`guidelines/` — foundation specimen cards (Brand, Colors, Spacing, Type
groups) plus `menu-pricing-current.md`.

`assets/` — `logos/logo.png`, `food/` (11 dish photos), `imagery/`
(interior + founder photos).

`ui_kits/website/` — click-through recreation of the marketing site:
`index.html` (entry, tagged `@dsCard group="Website"`), `TopStrip.jsx`,
`HeroSection.jsx`, `MenuSection.jsx`, `AboutSection.jsx`,
`InstagramSection.jsx`, `ReviewsSection.jsx`, `HoursContactSection.jsx`,
`Footer.jsx`.

