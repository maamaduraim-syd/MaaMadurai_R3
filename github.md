repo: maamaduraim-syd/maamadurai
branch: main

## Last sync
date: 2026-09-18T00:00:00Z

### Updated in this project
- Production-hardening pass: no unresolved {{ }} template tokens in crawlable HTML, one viewport meta per page, lang="en-AU" in raw source, duplicate token CSS removed.
- Self-serving aggregateRating removed from Reviews schema; Restaurant defined once on the homepage and referenced by @id everywhere else.
- Thank-you page (/thank-you) added for Google Ads conversion tracking; forms redirect there on genuine success only.
- <noscript> nav + address/phone fallback on all 15 pages so header/footer fetch failures never hide navigation or NAP.

### Previously
- Second-pass production audit: menu, FAQs, catering packages and homepage dish cards are now static HTML instead of client-rendered arrays.
- Clean canonical URLs (/menu, /order, /catering, /about, /reviews, /journal, /contact, /privacy) with 301s from the old .dc.html paths.
- Contact and new catering forms post to Formspree with real sending, error and success states; ad conversions no longer fire on page view.
- Journal split into four crawlable article URLs; added /privacy, a branded 404, breadcrumb + WebSite/WebPage schema.

## Sync history
- 2026-09-08T08:07:27Z — built the 8-page SEO site from the live site's content, imported 15 photos, per-page meta/canonical/OG/JSON-LD.

## Screen map
| Screen | Repo files |
| --- | --- |
| index.html / Home.dc.html | app/page.tsx, app/layout.tsx, public/*.jpeg |
| Menu.dc.html | app/api/index.js (structure), design-system menu-pricing-current.md (prices) |
| About.dc.html | app/page.tsx (Our Story / Our Values sections), public/a2-landscape.png, public/HeadShot.jpeg |
| Catering.dc.html | design-system menu-pricing-current.md (bucket pricing) |
| Order.dc.html | app/page.tsx (Uber Eats / DoorDash links) |
| Contact.dc.html | app/page.tsx (contact block), components/ContactForm.tsx |
| Reviews.dc.html | app/page.tsx (SociableKit Google reviews iframe), components/InstagramFeed.tsx |
| Blog.dc.html + journal/*.dc.html | new content, no repo source |
| Privacy.dc.html / 404.html | new, no repo source |
| SiteHeader.dc.html / SiteFooter.dc.html | app/page.tsx (top info strip, footer), app/globals.css |
| ThankYou.dc.html | new, no repo source |
