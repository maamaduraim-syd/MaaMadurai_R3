repo: maamaduraim-syd/maamadurai
branch: main

## Last sync
date: 2026-09-21T00:00:00Z

### Updated in this project
- Indexing fix: title, description, robots, canonical, OG/Twitter tags and all JSON-LD moved out of the body-level <helmet> block into the real static <head> on all 15 pages. Previously Googlebot's first-pass parse saw a head containing only charset + viewport — no title, no canonical — which is why 4 journal URLs sat in "Discovered / Crawled – currently not indexed" and why body-level rel=canonical was being ignored.
- Footer gained a "From the Journal" column linking all four articles from every page; the homepage "Read more" line now links the fourth article too. The articles were previously reachable only from the journal index.
- Vercel Analytics added as the static-site script tag (/_vercel/insights/script.js) on all 15 pages plus 404.html. Cookieless, so it is not consent-gated; already covered by the existing CSP 'self'. Needs enabling in the Vercel project dashboard.
- Sitemap lastmod refreshed to 2026-09-21.

### Previously
- Consent Mode v2: denied-by-default for analytics + advertising, set before any Google tag loads; Meta Pixel is not requested at all until advertising consent. Accept all / Reject non-essential / Manage preferences, reopenable from the footer.
- allow_enhanced_conversions:false on the Ads tag — the tag was scraping our own public email from the page and hashing it as customer data.
- Central GOOGLE_ADS_LABELS map, every label deliberately blank: a blank label never fires a conversion, and callers can no longer inject one.
- Lead de-duplicated: the success event now fires once on /thank-you only (generate_lead removed, pre-redirect event removed).
- CSP added as Report-Only + nosniff/Referrer-Policy/Permissions-Policy. Report-Only because the component runtime needs new Function().
- Production-hardening pass: no unresolved {{ }} template tokens in crawlable HTML, one viewport meta per page, lang="en-AU" in raw source, duplicate token CSS removed.
- Self-serving aggregateRating removed from BOTH the Reviews page and the homepage Restaurant entity (the homepage copy was the one Rich Results kept reporting as "Review snippets"); Restaurant defined once on the homepage and referenced by @id everywhere else.
- Thank-you page (/thank-you) added for Google Ads conversion tracking; forms redirect there on genuine success only.
- <noscript> nav + address/phone fallback on all 15 pages so header/footer fetch failures never hide navigation or NAP.
- Design-system token CSS (7.2 KB across 5 files) inlined into every page: 5 fewer requests per page, and token vars can no longer be lost to a crawler resource-budget drop (Rich Results was intermittently failing typography.css/spacing.css).
- ROOT CAUSE of the Rich Results 499s found and fixed: robots.txt "Disallow: /*.dc.html$" was blocking Googlebot from fetching SiteHeader/SiteFooter, so Google rendered every page with no header or footer. The components are now crawlable and kept out of the index with X-Robots-Tag: noindex instead.

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
