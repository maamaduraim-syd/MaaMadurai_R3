/* MaaMadurai — Consent Mode v2 (advanced for Google, blocked for Meta),
   GA4 + Google Ads base tag, controlled event model.

   Load order matters: this file sets consent defaults BEFORE any Google tag
   is requested, so no advertising or analytics storage is used until the
   visitor chooses. Meta Pixel is not requested at all until advertising
   consent is granted.

   Google Ads conversion labels live in GOOGLE_ADS_LABELS below and are all
   intentionally blank. A blank label NEVER fires a conversion. Do not paste
   iFVSCOjxlc8cEMP2q81D here — that label is attached by an account-level
   page-view conversion action and is not a business action. */
(function () {
  if (window.__mmAnalytics) return;
  window.__mmAnalytics = true;

  var GA4_ID = 'G-QM40C43ERG';
  var ADS_ID = 'AW-18147375939';
  var META_PIXEL_ID = '1141116921914127';
  var LIVE_HOST = /(^|\.)maamadurai\.com\.au$/;
  var STORE = 'mm_consent_v2';

  /* Central mapping of event name -> approved Google Ads conversion label.
     Every value is blank pending owner confirmation in Google Ads
     (Goals > Conversions). Events with a blank label are sent to GA4 only. */
  var GOOGLE_ADS_LABELS = {
    phone_click: '',
    contact_form_success: '',
    catering_form_success: '',
    order_outbound: '',
    directions_click: ''
  };

  var live = LIVE_HOST.test(location.hostname);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  /* ---- consent storage ---- */
  function readConsent() {
    try {
      var raw = localStorage.getItem(STORE);
      if (raw) {
        var c = JSON.parse(raw);
        if (c && typeof c.analytics === 'boolean' && typeof c.ads === 'boolean') return c;
      }
      // Honour the previous opt-out flag so earlier choices are not silently reversed.
      if (localStorage.getItem('mm_tracking_optout') === '1') return { analytics: false, ads: false, ts: null, legacy: true };
    } catch (e) {}
    return null;
  }
  function writeConsent(c) {
    c.ts = new Date().toISOString();
    try { localStorage.setItem(STORE, JSON.stringify(c)); } catch (e) {}
    return c;
  }

  function consentSignal(c) {
    return {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.ads ? 'granted' : 'denied',
      ad_user_data: c.ads ? 'granted' : 'denied',
      ad_personalization: c.ads ? 'granted' : 'denied'
    };
  }

  /* ---- 1. consent defaults, before any tag loads ---- */
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', true);

  /* ---- 2. Google tags (advanced consent mode: load with denied defaults) ---- */
  var metaLoaded = false;
  if (live) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(s);

    gtag('js', new Date());
    gtag('config', GA4_ID, { send_page_view: true, anonymize_ip: true });
    /* Ads base tag only. allow_enhanced_conversions:false stops the tag
       scanning the page for email/phone — our own public contact details
       were being hashed and sent as if they were customer data. */
    gtag('config', ADS_ID, { allow_enhanced_conversions: false, send_page_view: false });
  } else {
    console.info('[analytics] preview host — events logged, not sent');
  }

  function loadMeta() {
    if (metaLoaded || !live || !META_PIXEL_ID) return;
    metaLoaded = true;
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

  function applyConsent(c) {
    gtag('consent', 'update', consentSignal(c));
    if (c.ads) loadMeta();
  }

  /* ---- 3. event model ---- */
  var fired = {};
  function once(key, ms) {
    var now = Date.now();
    if (fired[key] && now - fired[key] < (ms || 1500)) return false;
    fired[key] = now;
    return true;
  }

  /* Events that represent a completed lead. These are the only events that
     send anything to Meta, and they send no enquiry content. */
  var LEAD_EVENTS = { contact_form_success: 1, catering_form_success: 1 };

  window.mmTrack = function (name, params) {
    params = params || {};
    delete params.ads_label; // labels come from GOOGLE_ADS_LABELS only, never from a caller
    if (!once('ev:' + name + ':' + (params.cta_location || '') + ':' + (params.order_platform || ''))) return;

    if (!live) { console.info('[analytics] ' + name, params); return; }

    if (window.gtag) {
      window.gtag('event', name, params);
      var label = GOOGLE_ADS_LABELS[name];
      if (label) window.gtag('event', 'conversion', { send_to: ADS_ID + '/' + label });
    }
    // Meta: one standard Lead per successful submission, no parameters.
    if (LEAD_EVENTS[name] && window.fbq) window.fbq('track', 'Lead');
  };

  /* ---- 4. auto-tracking by link type ---- */
  document.addEventListener('click', function (e) {
    if (!e.isTrusted) return; // ignore programmatic clicks
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
    } else if (a.closest('nav[aria-label="Menu categories"]')) {
      // menu_view: a real interaction with the menu, not a page load. Once per page.
      if (!fired.menuView) { fired.menuView = 1; window.mmTrack('menu_view', { page: location.pathname }); }
    }
  }, true);

  /* ---- 5. preview-only link shim: clean URLs resolve to local files off-domain ---- */
  if (!live) {
    var CLEAN = {
      '/': 'index.html', '/menu': 'Menu.dc.html', '/order': 'Order.dc.html', '/catering': 'Catering.dc.html',
      '/about': 'About.dc.html', '/reviews': 'Reviews.dc.html', '/journal': 'Blog.dc.html',
      '/contact': 'Contact.dc.html', '/privacy': 'Privacy.dc.html', '/thank-you': 'ThankYou.dc.html',
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

  /* ---- 6. consent interface ---- */
  var GOLD = '#face0b', INK = '#1a0d09', CREAM = '#f3e9dd';
  var panel = null, lastFocus = null, keyHandler = null;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* kind: 'choice'   — the real options. Accept and Reject MUST look identical:
                        equal size, weight, border and contrast. No nudging.
     kind: 'tertiary' — a lighter secondary control (Manage preferences). */
  function btn(label, kind) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    var tertiary = kind === 'tertiary';
    b.style.cssText = 'padding:11px 20px;border-radius:9999px;font:' + (tertiary ? '500' : '600') +
      ' 14px/1.2 system-ui,-apple-system,Segoe UI,sans-serif;cursor:pointer;min-height:44px;white-space:nowrap;background:transparent;' +
      (tertiary
        ? 'border:1px solid rgba(243,233,221,0.3);color:rgba(243,233,221,0.85);text-decoration:underline'
        : 'border:1px solid ' + CREAM + ';color:' + CREAM);
    b.addEventListener('focus', function () { b.style.outline = '2px solid ' + GOLD; b.style.outlineOffset = '2px'; });
    b.addEventListener('blur', function () { b.style.outline = 'none'; });
    return b;
  }

  function close() {
    if (!panel) return;
    if (keyHandler) document.removeEventListener('keydown', keyHandler, true);
    keyHandler = null;
    panel.remove();
    panel = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }

  function decide(analytics, ads) {
    applyConsent(writeConsent({ analytics: analytics, ads: ads }));
    close();
  }

  function row() {
    var d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;align-items:center';
    return d;
  }

  function open(managing) {
    // A stale reference must never lock the dialog shut — if the node left the
    // DOM by any path other than close(), the visitor could otherwise never
    // change their consent choice again.
    if (panel && panel.isConnected) return;
    panel = null;
    lastFocus = document.activeElement;
    var existing = readConsent() || { analytics: false, ads: false };

    panel = document.createElement('div');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Privacy preferences');
    var bottom = window.matchMedia('(max-width: 860px)').matches ? '86px' : '16px';
    panel.style.cssText = 'position:fixed;left:16px;right:16px;bottom:' + bottom + ';z-index:10000;max-width:680px;margin:0 auto;' +
      'background:' + INK + ';border:1px solid rgba(250,206,11,0.35);border-radius:14px;padding:20px;color:' + CREAM +
      ';font:14px/1.65 system-ui,-apple-system,Segoe UI,sans-serif;box-shadow:0 12px 44px rgba(0,0,0,0.5);' +
      (reduce ? '' : 'animation:mmFade .18s ease-out');

    var h = document.createElement('p');
    h.style.cssText = 'margin:0 0 8px;font-weight:600;font-size:15px';
    h.textContent = 'Your privacy choices';
    var p = document.createElement('p');
    p.style.cssText = 'margin:0 0 16px';
    p.innerHTML = 'We use measurement and advertising cookies only if you allow them. The menu, ordering, calling and enquiry forms all work either way. See our <a href="/privacy" style="color:' + GOLD + '">privacy notice</a>.';
    panel.appendChild(h);
    panel.appendChild(p);

    if (!managing) {
      var r = row();
      var accept = btn('Accept all', 'choice');
      accept.addEventListener('click', function () { decide(true, true); });
      var reject = btn('Reject non-essential', 'choice');
      reject.addEventListener('click', function () { decide(false, false); });
      var manage = btn('Manage preferences', 'tertiary');
      manage.addEventListener('click', function () { close(); open(true); });
      r.appendChild(accept); r.appendChild(reject); r.appendChild(manage);
      panel.appendChild(r);
    } else {
      var mk = function (id, label, note, checked, disabled) {
        var w = document.createElement('label');
        w.style.cssText = 'display:flex;gap:10px;align-items:flex-start;margin:0 0 12px;cursor:' + (disabled ? 'default' : 'pointer');
        var cb = document.createElement('input');
        cb.type = 'checkbox'; cb.id = id; cb.checked = checked; cb.disabled = !!disabled;
        cb.style.cssText = 'margin:3px 0 0;width:18px;height:18px;accent-color:' + GOLD;
        var t = document.createElement('span');
        t.innerHTML = '<strong style="font-weight:600">' + label + '</strong><br><span style="opacity:.8">' + note + '</span>';
        w.appendChild(cb); w.appendChild(t);
        panel.appendChild(w);
        return cb;
      };
      mk('mm-c-nec', 'Necessary', 'Needed for the site to work. Always on.', true, true);
      var ca = mk('mm-c-an', 'Analytics', 'Anonymous measurement of how people find and use the site.', existing.analytics);
      var cd = mk('mm-c-ad', 'Advertising', 'Google Ads and Meta measurement. Loads Meta Pixel.', existing.ads);
      var r2 = row();
      var save = btn('Save preferences', 'choice');
      save.addEventListener('click', function () { decide(ca.checked, cd.checked); });
      var back = btn('Reject non-essential', 'choice');
      back.addEventListener('click', function () { decide(false, false); });
      r2.appendChild(save); r2.appendChild(back);
      panel.appendChild(r2);
    }

    document.body.appendChild(panel);

    var focusables = panel.querySelectorAll('button, input:not([disabled]), a[href]');
    if (focusables.length) focusables[0].focus();
    keyHandler = function (e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab' || !panel) return;
      var f = panel.querySelectorAll('button, input:not([disabled]), a[href]');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', keyHandler, true);
  }

  window.mmConsent = {
    open: function () { open(true); },
    get: function () { return readConsent(); },
    set: function (analytics, ads) { decide(!!analytics, !!ads); }
  };

  if (!document.getElementById('mm-consent-kf')) {
    var st = document.createElement('style');
    st.id = 'mm-consent-kf';
    st.textContent = '@keyframes mmFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}';
    document.head.appendChild(st);
  }

  function boot() {
    var c = readConsent();
    if (c) applyConsent(c); // stored choice — no banner
    else open(false);       // no choice yet — ask, defaults stay denied
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
