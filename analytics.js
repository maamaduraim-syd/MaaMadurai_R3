/* MaaMadurai — Google Analytics 4, Google Ads, Meta Pixel, consent bar.
   Loaded from every page's <helmet>. Fires only on the live domain. */
(function () {
  if (window.__mmAnalytics) return;
  window.__mmAnalytics = true;

  var GA4_ID   = 'G-QM40C43ERG';
  var ADS_ID   = 'AW-18147375939';
  var META_PIXEL_ID = '1141116921914127';
  var LIVE_HOST = /(^|\.)maamadurai\.com\.au$/;

  var optedOut = false;
  try { optedOut = localStorage.getItem('mm_tracking_optout') === '1'; } catch (e) {}
  var live = LIVE_HOST.test(location.hostname) && !optedOut;
  try { document.documentElement.lang = 'en-AU'; } catch (e) {}

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  if (live) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(s);

    gtag('js', new Date());
    gtag('config', GA4_ID, { send_page_view: true, anonymize_ip: true });
    gtag('config', ADS_ID);
    // No conversion on page view — conversions fire from real actions via mmTrack().

    if (META_PIXEL_ID) {
      !function (f, b, e, v, n, t, s2) {
        if (f.fbq) return; n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
        t = b.createElement(e); t.async = true; t.src = v;
        s2 = b.getElementsByTagName(e)[0]; s2.parentNode.insertBefore(t, s2);
      }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', META_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  } else {
    console.info('[analytics] preview host — tags logged, not sent');
  }

  /* ---- preview-only link shim: clean URLs resolve to local files off-domain ---- */
  if (!live) {
    var CLEAN = {
      '/': 'index.html', '/menu': 'Menu.dc.html', '/order': 'Order.dc.html', '/catering': 'Catering.dc.html',
      '/about': 'About.dc.html', '/reviews': 'Reviews.dc.html', '/journal': 'Blog.dc.html',
      '/contact': 'Contact.dc.html', '/privacy': 'Privacy.dc.html',
      '/journal/what-is-kothu-parotta': 'ArticleKothuParotta.dc.html',
      '/journal/seeraga-samba-biryani': 'ArticleSeeragaSamba.dc.html',
      '/journal/what-is-jigarthanda': 'ArticleJigarthanda.dc.html',
      '/journal/first-time-tamil-food-guide': 'ArticleFirstTimeGuide.dc.html'
    };
    document.addEventListener('click', function (e) {
      var a2 = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a2) return;
      var href = a2.getAttribute('href') || '';
      var hash = '';
      var hi = href.indexOf('#');
      if (hi > 0) { hash = href.slice(hi); href = href.slice(0, hi); }
      if (CLEAN[href]) { e.preventDefault(); location.href = CLEAN[href] + hash; }
    }, true);
  }

  /* ---- conversion tracking ---- */
  window.mmTrack = function (name, params) {
    params = params || {};
    if (live && window.gtag) {
      window.gtag('event', name, params);
      if (params.ads_label) {
        window.gtag('event', 'conversion', { send_to: ADS_ID + '/' + params.ads_label });
      }
    }
    if (live && window.fbq) window.fbq('trackCustom', name, params);
    if (!live) console.info('[analytics] ' + name, params);
  };

  // Auto-tracking by link type — no markup changes needed.
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var zone = a.closest('[data-track-location]');
    var where = (zone && zone.getAttribute('data-track-location'))
      || (a.closest('header') && 'header')
      || (a.closest('footer') && 'footer')
      || 'page';

    if (/^tel:/i.test(href)) {
      window.mmTrack('phone_click', { cta_location: where, page: location.pathname });
    } else if (/ubereats\.com/i.test(href)) {
      window.mmTrack('order_outbound', { order_platform: 'uber_eats', cta_location: where, page: location.pathname });
    } else if (/doordash\.com/i.test(href)) {
      window.mmTrack('order_outbound', { order_platform: 'doordash', cta_location: where, page: location.pathname });
    } else if (/instagram\.com|facebook\.com|tripadvisor\./i.test(href)) {
      window.mmTrack('social_profile_click', { network: /instagram/i.test(href) ? 'instagram' : (/facebook/i.test(href) ? 'facebook' : 'tripadvisor'), cta_location: where, page: location.pathname });
    } else if (/google\.[a-z.]+\/maps|share\.google|maps\.app\.goo\.gl|goo\.gl\/maps/i.test(href)) {
      window.mmTrack('directions_click', { cta_location: where, page: location.pathname });
    }
  }, true);


  /* ---- simple cookie notice bar ---- */
  function notice() {
    try { if (localStorage.getItem('mm_cookie_notice') === 'seen') return; } catch (err) { return; }
    var bar = document.createElement('div');
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie notice');
    bar.style.cssText = 'position:fixed;left:0;right:0;bottom:' + (window.matchMedia('(max-width: 860px)').matches ? '78px' : '0') + ';z-index:9999;display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:center;padding:14px 20px;background:#1a0d09;border-top:1px solid rgba(250,206,11,0.35);color:#f3e9dd;font:14px/1.6 system-ui,-apple-system,Segoe UI,sans-serif';
    var p = document.createElement('span');
    p.innerHTML = 'We use cookies to measure how people find and use our site. <a href="/privacy" style="color:#face0b">Privacy &amp; preferences</a>.';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Got it';
    btn.style.cssText = 'padding:8px 22px;border-radius:9999px;border:0;background:#face0b;color:#1a0d09;font-weight:600;font-size:14px;cursor:pointer';
    btn.addEventListener('click', function () {
      try { localStorage.setItem('mm_cookie_notice', 'seen'); } catch (err) {}
      bar.remove();
    });
    bar.appendChild(p); bar.appendChild(btn);
    document.body.appendChild(bar);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', notice);
  } else { notice(); }
})();
