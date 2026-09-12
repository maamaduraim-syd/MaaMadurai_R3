/* @ds-bundle: {"format":4,"namespace":"MaaMaduraiDesignSystem_c0cb48","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"MenuHighlightCard","sourcePath":"components/cards/MenuHighlightCard.jsx"},{"name":"MenuItemRow","sourcePath":"components/cards/MenuItemRow.jsx"},{"name":"SectionPanel","sourcePath":"components/cards/SectionPanel.jsx"},{"name":"SectionRule","sourcePath":"components/cards/SectionPanel.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"},{"name":"CategoryTabs","sourcePath":"components/navigation/CategoryTabs.jsx"},{"name":"SocialIconButton","sourcePath":"components/social/SocialIconButton.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"4c49bc93bf37","components/cards/MenuHighlightCard.jsx":"1efa27a05389","components/cards/MenuItemRow.jsx":"388b5b585d1e","components/cards/SectionPanel.jsx":"a7301c8c2530","components/feedback/Badge.jsx":"44773568cfc0","components/forms/Input.jsx":"7a882577aae0","components/forms/Textarea.jsx":"5f29e6ab5d60","components/icons/Icon.jsx":"80140da9a35d","components/navigation/CategoryTabs.jsx":"dcadbf3e962e","components/social/SocialIconButton.jsx":"a4f5fa5963b2","ui_kits/website/AboutSection.jsx":"73d30354003c","ui_kits/website/Footer.jsx":"7c570085e9f9","ui_kits/website/HeroSection.jsx":"4d3c8a9f7ba3","ui_kits/website/HoursContactSection.jsx":"67ce47b39a28","ui_kits/website/InstagramSection.jsx":"4793978ccd50","ui_kits/website/MenuSection.jsx":"8d10e6e7971b","ui_kits/website/ReviewsSection.jsx":"8c586a57639d","ui_kits/website/TopStrip.jsx":"0646cd853eb6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MaaMaduraiDesignSystem_c0cb48 = window.MaaMaduraiDesignSystem_c0cb48 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  fontFamily: 'var(--font-body)',
  border: 'none',
  cursor: 'pointer',
  transition: `all var(--duration-fast) var(--ease-standard)`,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8
};
const variants = {
  /* Solid gold pill — e.g. "Send Message" submit, active category tab */
  solid: {
    background: 'var(--accent-primary)',
    color: 'var(--background)',
    borderRadius: 'var(--radius-lg)',
    fontWeight: 600
  },
  /* Translucent card-red pill — inactive category tab */
  tab: {
    background: 'var(--background-card)',
    color: 'var(--foreground)',
    borderRadius: 'var(--radius-md)',
    fontWeight: 500
  },
  /* Active category tab */
  tabActive: {
    background: 'var(--accent-primary)',
    color: 'var(--background)',
    borderRadius: 'var(--radius-md)',
    fontWeight: 500
  },
  /* Outline uppercase — "Download Full PDF Menu", "View on Instagram" */
  outline: {
    background: 'transparent',
    color: 'var(--accent-primary)',
    border: '1px solid var(--accent-primary)',
    borderRadius: 'var(--radius-full)',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: 'var(--tracking-widest)'
  }
};
const sizes = {
  sm: {
    padding: '8px 16px',
    fontSize: 'var(--text-body-sm)'
  },
  md: {
    padding: '12px 24px',
    fontSize: 'var(--text-body)'
  },
  lg: {
    padding: '16px 32px',
    fontSize: 'var(--text-body-lg)'
  }
};
function Button({
  variant = 'solid',
  size = 'md',
  disabled,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const v = variants[variant] || variants.solid;
  const hoverStyle = variant === 'outline' ? {
    background: hover ? 'var(--accent-primary)' : 'transparent',
    color: hover ? 'var(--background)' : 'var(--accent-primary)'
  } : variant === 'tab' ? {
    background: hover ? 'rgba(160,42,19,0.7)' : 'var(--background-card)'
  } : variant === 'solid' ? {
    background: hover ? 'var(--accent-hover)' : 'var(--accent-primary)'
  } : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...v,
      ...sizes[size],
      ...hoverStyle,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/MenuHighlightCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Menu highlight tile — square image, black gradient scrim, title bottom-left,
   gold border on hover, slight zoom on image. Exact pattern from the
   "Our Menus" highlight grid. */
function MenuHighlightCard({
  image,
  title,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      aspectRatio: '1 / 1',
      overflow: 'hidden',
      borderRadius: 'var(--radius-md)',
      border: `2px solid ${hover ? 'var(--accent-primary)' : 'transparent'}`,
      cursor: 'pointer',
      transition: `border-color var(--duration-fast) var(--ease-standard)`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: hover ? 'scale(1.1)' : 'scale(1)',
      transition: `transform 0.5s var(--ease-standard)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-display-md)',
      color: hover ? 'var(--accent-primary)' : 'var(--foreground)',
      margin: 0,
      transition: `color var(--duration-fast) var(--ease-standard)`
    }
  }, title)));
}
Object.assign(__ds_scope, { MenuHighlightCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/MenuHighlightCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/SectionPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The site's one recurring section container: a rounded "elevated" panel
   floating on the deep-red page background, max-w-7xl, generous padding,
   subtle gold-tinted border. Every major section (Menu, About Us,
   Instagram, Reviews, Opening Hours/Location, Contact) is one of these. */
function SectionPanel({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      maxWidth: 'var(--section-max-width)',
      margin: '0 auto',
      background: 'var(--background-elevated)',
      padding: 'var(--section-padding-y) var(--section-padding-x)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      ...style
    }
  }, rest), children);
}

/* Gold divider rule under a section heading — w-24 h-1 bg-accent-primary mx-auto */
function SectionRule({
  align = 'center',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 96,
      height: 4,
      background: 'var(--accent-primary)',
      margin: align === 'center' ? '0 auto var(--space-8)' : '0 0 var(--space-8)',
      ...style
    }
  });
}
Object.assign(__ds_scope, { SectionPanel, SectionRule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/SectionPanel.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
/* Small pill badge — used for the "15% OFF" style discount tag (defined in
   the source but currently commented out of the live page; kept as it's
   part of the coded design language). */
function Badge({
  children,
  tone = 'gold',
  style
}) {
  const tones = {
    gold: {
      background: 'var(--accent-secondary)',
      color: '#6b7280'
    },
    dark: {
      background: 'var(--background-card)',
      color: 'var(--foreground)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      fontSize: 'var(--text-caption)',
      fontWeight: 500,
      ...tones[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Contact form text input — bg-background-card, transparent 2px border,
   gold border on focus, red border on error. */
function Input({
  error,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '16px 24px',
      background: 'var(--background-card)',
      border: `2px solid ${error ? '#ef4444' : focused ? 'var(--accent-primary)' : 'transparent'}`,
      borderRadius: 'var(--radius-lg)',
      color: 'var(--foreground)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body)',
      outline: 'none',
      transition: `border-color var(--duration-fast) var(--ease-standard)`,
      ...style
    }
  }, rest)), error && /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#ef4444',
      fontSize: 'var(--text-body-sm)',
      margin: '8px 0 0 8px'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  error,
  rows = 6,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '16px 24px',
      background: 'var(--background-card)',
      border: `2px solid ${error ? '#ef4444' : focused ? 'var(--accent-primary)' : 'transparent'}`,
      borderRadius: 'var(--radius-lg)',
      color: 'var(--foreground)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body)',
      outline: 'none',
      resize: 'none',
      transition: `border-color var(--duration-fast) var(--ease-standard)`,
      ...style
    }
  }, rest)), error && /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#ef4444',
      fontSize: 'var(--text-body-sm)',
      margin: '8px 0 0 8px'
    }
  }, error));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Stroke icons copied verbatim from lucide-icons/lucide (MIT), matching
   the exact set used in production (lucide-react dependency). Brand/social
   marks are copied verbatim from app/page.tsx's inline SVGs (fill icons). */
const STROKE_PATHS = {
  'map-pin': '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" />',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />',
  flame: '<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />',
  'chevron-left': '<path d="m15 18-6-6 6-6" />',
  'chevron-right': '<path d="m9 18 6-6-6-6" />',
  heart: '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />',
  'message-circle': '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />',
  mail: '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" />',
  phone: '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />',
  clock: '<circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />',
  'utensils-crossed': '<path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" /><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" /><path d="m2.1 21.8 6.4-6.3" /><path d="m19 5-7 7" />'
};
const FILL_PATHS = {
  facebook: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  tripadvisor: 'M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H2.04l1.73 1.896a5.788 5.788 0 0 0-.814 2.988 5.835 5.835 0 0 0 5.822 5.822 5.804 5.804 0 0 0 3.988-1.586l1.247 1.365 1.247-1.365a5.804 5.804 0 0 0 3.988 1.586 5.835 5.835 0 0 0 5.822-5.822 5.788 5.788 0 0 0-.814-2.988l1.73-1.896h-2.321c-2.307-1.569-4.975-2.353-7.659-2.353zm-.013 2.154c1.742 0 3.33.638 4.551 1.686a5.797 5.797 0 0 0-4.551 2.229 5.797 5.797 0 0 0-4.551-2.23 6.812 6.812 0 0 1 4.551-1.685zM8.778 9.525a3.685 3.685 0 1 1 0 7.37 3.685 3.685 0 0 1 0-7.37zm6.456 0a3.685 3.685 0 1 1 0 7.37 3.685 3.685 0 0 1 0-7.37zm-6.456 1.556a2.129 2.129 0 1 0 0 4.258 2.129 2.129 0 0 0 0-4.258zm6.456 0a2.129 2.129 0 1 0 0 4.258 2.129 2.129 0 0 0 0-4.258zm-6.456 1.239a.89.89 0 1 1 0 1.78.89.89 0 0 1 0-1.78zm6.456 0a.89.89 0 1 1 0 1.78.89.89 0 0 1 0-1.78z',
  ubereats: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c1.969 0 3.771.636 5.232 1.701L6.201 17.232A7.468 7.468 0 0 1 4.5 12c0-4.136 3.364-7.5 7.5-7.5zm0 15c-1.969 0-3.771-.636-5.232-1.701L17.799 6.768A7.468 7.468 0 0 1 19.5 12c0 4.136-3.364 7.5-7.5 7.5z',
  doordash: 'M12.5 2C8.364 2 4.5 4.91 3.27 9H2v4h1.045A9.955 9.955 0 0 0 3 14.5C3 19.747 7.253 24 12.5 24S22 19.747 22 14.5v-.5h-9v3h5.725C17.553 19.117 15.19 21 12.5 21 9.467 21 7 18.533 7 15.5S9.467 10 12.5 10H22V9C22 5.14 18.636 2 12.5 2z'
};
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  style,
  ...rest
}) {
  if (STROKE_PATHS[name]) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: style,
      dangerouslySetInnerHTML: {
        __html: STROKE_PATHS[name]
      }
    }, rest));
  }
  if (FILL_PATHS[name]) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: color,
      style: style
    }, rest), /*#__PURE__*/React.createElement("path", {
      d: FILL_PATHS[name]
    }));
  }
  return null;
}
Icon.availableIcons = [...Object.keys(STROKE_PATHS), ...Object.keys(FILL_PATHS)];
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// components/cards/MenuItemRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Full-menu list row — dish name + dietary icons, dotted leader, price.
   Exact pattern from the "Our Menu" full list view. */
function MenuItemRow({
  title,
  price,
  isVeg,
  isSpicy,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 8,
      marginBottom: 8,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body-lg)',
      fontWeight: 500,
      color: hover ? 'var(--accent-primary)' : 'var(--foreground)',
      margin: 0,
      transition: `color var(--duration-fast) var(--ease-standard)`
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, isVeg && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "leaf",
    size: 14,
    color: "var(--tag-veg)"
  }), isSpicy && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "flame",
    size: 14,
    color: "var(--tag-spicy)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flexGrow: 1,
      borderBottom: '1px dotted rgba(245,240,232,0.3)',
      margin: '0 8px',
      minWidth: 20
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-lg)',
      fontWeight: 600,
      color: 'var(--accent-primary)',
      flexShrink: 0
    }
  }, "$", price));
}
Object.assign(__ds_scope, { MenuItemRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/MenuItemRow.jsx", error: String((e && e.message) || e) }); }

// components/navigation/CategoryTabs.jsx
try { (() => {
/* Category pill row — wraps Button in tab/tabActive variant. Kept as its
   own component since it owns the active-state selection logic. */
function CategoryTabs({
  categories,
  active,
  onChange,
  extra
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 12,
      flexWrap: 'wrap',
      marginBottom: 'var(--space-12)'
    }
  }, categories.map(c => {
    const isActive = c === active;
    return /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: () => onChange && onChange(c),
      style: {
        padding: '12px 32px',
        fontSize: 'var(--text-body)',
        borderRadius: 'var(--radius-md)',
        fontWeight: 500,
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        transition: `all var(--duration-fast) var(--ease-standard)`,
        background: isActive ? 'var(--accent-primary)' : 'var(--background-card)',
        color: isActive ? 'var(--background)' : 'var(--foreground)'
      }
    }, c);
  }), extra && /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange && onChange(extra),
    style: {
      padding: '12px 32px',
      fontSize: 'var(--text-body)',
      borderRadius: 'var(--radius-md)',
      fontWeight: 500,
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      background: 'var(--background-card)',
      color: 'var(--foreground)'
    }
  }, extra));
}
Object.assign(__ds_scope, { CategoryTabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/CategoryTabs.jsx", error: String((e && e.message) || e) }); }

// components/social/SocialIconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Circular social-link button — exact pattern from the "Find & Connect" block
   in app/page.tsx (w-12 h-12 bg-background-card rounded-full, gold fill on hover). */
function SocialIconButton({
  icon,
  href,
  size = 48,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: "_blank",
    rel: "noreferrer",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-full)',
      background: hover ? 'var(--accent-primary)' : 'var(--background-card)',
      color: hover ? 'var(--background)' : 'var(--foreground)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: `all var(--duration-fast) var(--ease-standard)`,
      textDecoration: 'none'
    }
  }, rest), icon);
}
Object.assign(__ds_scope, { SocialIconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/social/SocialIconButton.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/AboutSection.jsx
try { (() => {
/* "Our Story" — founder-warmth prose + restaurant interior photo (flat,
   unfiltered), plus the Thirukkural (Kural 82) quoted in Tamil with English
   couplet beneath. Tamil lines use --font-tamil (Noto Sans Tamil). */
function AboutSection() {
  const {
    SectionPanel,
    SectionRule
  } = window.MaaMaduraiDesignSystem_c0cb48;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-8) var(--space-16)'
    }
  }, /*#__PURE__*/React.createElement(SectionPanel, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-display-lg)',
      textAlign: 'center',
      margin: 0
    }
  }, "Our Story"), /*#__PURE__*/React.createElement(SectionRule, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 'var(--space-12)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max-width)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      color: 'var(--foreground-muted)'
    }
  }, /*#__PURE__*/React.createElement("em", null, "Vaanga, Sapdalam"), " \u2013 come, eat with us. We started this restaurant to recreate that same warmth in Sydney: the ", /*#__PURE__*/React.createElement("em", null, "virundhombal"), " (cherishing guests) we grew up with in Madurai, so that here, you feel like you are eating at your ", /*#__PURE__*/React.createElement("em", null, "amma veedu"), " (mother\u2019s home)."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      color: 'var(--foreground-muted)'
    }
  }, "In Tamil, \u2018Maa\u2019 also means Great, and MaaMadurai celebrates Great Madurai \u2014 its street food, its temple-town spirit, and its hospitality."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-8)',
      paddingTop: 'var(--space-8)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-tamil)',
      fontSize: 'var(--text-body-xl)',
      color: 'var(--accent-primary)',
      margin: 0
    }
  }, "\u201C\u0B87\u0BA9\u0BCD\u0BA9\u0BCA\u0BB0\u0BC1 \u0BA8\u0B95\u0BB0\u0B6C\u0BCD \u0BA4\u0BC1\u0BB7\u0BCD\u0BAA\u0BC1\u0BAE\u0BCD \u0BA8\u0BBF\u0B99\u0BCD\u0B9F\u0BBE\u0BB0\u0BCD \u0B85\u0B95\u0BC1\u0BA8\u0BB0\u0BCD\u201D"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--foreground-muted)',
      marginTop: 'var(--space-2)'
    }
  }, "\u201CA town where hospitality dwells never sleeps in sorrow.\u201D \u2014 Thirukkural, Kural 82"))), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/restaurant-interior-landscape.png",
    alt: "MaaMadurai Street Food restaurant interior",
    style: {
      width: '100%',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-image)',
      display: 'block'
    }
  }))));
}
window.AboutSection = AboutSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/AboutSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* Footer — logo, tagline, social + delivery-platform circular icon buttons. */
function Footer() {
  const {
    SocialIconButton,
    Icon
  } = window.MaaMaduraiDesignSystem_c0cb48;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: 'var(--space-12) var(--space-8)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/logo.png",
    alt: "MaaMadurai Street Food",
    style: {
      height: 56,
      width: 56,
      borderRadius: '50%',
      marginBottom: 'var(--space-4)'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--foreground-muted)',
      fontSize: 'var(--text-body-sm)',
      marginBottom: 'var(--space-6)'
    }
  }, "Great Madurai unavu veedu \u2014 Toongabbie, NSW"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 12,
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(SocialIconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "facebook",
      size: 18
    }),
    href: "#",
    size: 40
  }), /*#__PURE__*/React.createElement(SocialIconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "instagram",
      size: 18
    }),
    href: "#",
    size: 40
  }), /*#__PURE__*/React.createElement(SocialIconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "tripadvisor",
      size: 18
    }),
    href: "#",
    size: 40
  }), /*#__PURE__*/React.createElement(SocialIconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "ubereats",
      size: 18
    }),
    href: "#",
    size: 40
  }), /*#__PURE__*/React.createElement(SocialIconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "doordash",
      size: 18
    }),
    href: "#",
    size: 40
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--foreground-muted)',
      fontSize: 'var(--text-caption)',
      opacity: 0.7
    }
  }, "\xA9 2026 MaaMadurai Street Food. All rights reserved."));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HeroSection.jsx
try { (() => {
/* Full-bleed rotating hero banner — 4 dish photos crossfade every 5s behind
   a black scrim, logo/location pill (backdrop-blur), centered small-caps H1. */
const HERO_IMAGES = ['../../assets/food/chicken-biryani.jpeg', '../../assets/food/pepper-chicken.jpeg', '../../assets/food/kothu-parotta.jpeg', '../../assets/food/seeraga-samba-mutton-biryani.jpeg'];
function HeroSection() {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);
  const {
    Button
  } = window.MaaMaduraiDesignSystem_c0cb48;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: 620,
      overflow: 'hidden'
    }
  }, HERO_IMAGES.map((src, i) => /*#__PURE__*/React.createElement("img", {
    key: src,
    src: src,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: i === index ? 1 : 0,
      transform: i === index ? 'scale(1.0)' : 'scale(1.1)',
      transition: 'opacity var(--duration-hero) var(--ease-standard), transform var(--duration-hero) var(--ease-standard)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(0,0,0,0.6)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'var(--space-16) var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 20px',
      borderRadius: 'var(--radius-full)',
      background: 'rgba(143,36,16,0.5)',
      backdropFilter: 'blur(6px)',
      marginBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/logo.png",
    alt: "MaaMadurai Street Food",
    style: {
      height: 32,
      width: 32,
      borderRadius: '50%'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--foreground-muted)'
    }
  }, "Toongabbie, Sydney")), /*#__PURE__*/React.createElement("h1", {
    style: {
      flexShrink: 0,
      fontSize: 'var(--text-hero)',
      fontVariant: 'small-caps',
      lineHeight: 1.2,
      margin: 0,
      marginBottom: 'var(--space-4)',
      color: 'var(--foreground)'
    }
  }, "MaaMadurai Street Food"), /*#__PURE__*/React.createElement("p", {
    style: {
      flexShrink: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body-xl)',
      color: 'var(--foreground-muted)',
      maxWidth: 640,
      margin: '0 0 var(--space-8)'
    }
  }, "A journey through the rich tapestry of Indian flavours, in the heart of Sydney\u2019s Western Suburbs."), /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "solid",
    size: "lg"
  }, "Explore Our Menu"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg"
  }, "Order on Uber Eats"))));
}
window.HeroSection = HeroSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HeroSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HoursContactSection.jsx
try { (() => {
/* Opening Hours & Location + Contact form — two side-by-side panels,
   MapPin/Clock icons, Input/Textarea + submit Button with loading state. */
function HoursContactSection() {
  const {
    SectionPanel,
    SectionRule,
    Icon,
    Input,
    Textarea,
    Button
  } = window.MaaMaduraiDesignSystem_c0cb48;
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  function submit(e) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1200);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-8) var(--space-16)'
    }
  }, /*#__PURE__*/React.createElement(SectionPanel, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-display-lg)',
      textAlign: 'center',
      margin: 0
    }
  }, "Opening Hours & Location"), /*#__PURE__*/React.createElement(SectionRule, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: 'var(--space-16)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 20,
    color: "var(--accent-primary)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--foreground-muted)',
      fontSize: 'var(--text-body-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Tue\u2013Fri 11am\u20139pm"), /*#__PURE__*/React.createElement("div", null, "Sat\u2013Sun 10am\u20139pm \xB7 Weekend breakfast (Idly) from 10am"), /*#__PURE__*/React.createElement("div", null, "Closed Monday"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 20,
    color: "var(--accent-primary)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--foreground-muted)',
      fontSize: 'var(--text-body-lg)'
    }
  }, "Shop P34, Portico Plaza, 17\u201319 Aurelia Street, Toongabbie NSW 2146", /*#__PURE__*/React.createElement("br", null), "(Opposite Woolworths)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 16,
    color: "var(--foreground-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--foreground-muted)'
    }
  }, "0424 077 120"))), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Your name",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "Your email",
    required: true
  }), /*#__PURE__*/React.createElement(Textarea, {
    placeholder: "Your message",
    rows: 4,
    required: true
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "solid",
    disabled: sending,
    type: "submit"
  }, sending ? 'Sending…' : sent ? '✓ Sent' : 'Send Message')))));
}
window.HoursContactSection = HoursContactSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HoursContactSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/InstagramSection.jsx
try { (() => {
/* Instagram feed section — staggered image grid, "View on Instagram" CTA.
   Real feed content isn't available offline, so tiles reuse the licensed
   food photography already in assets/ as stand-ins for actual IG posts. */
const IG_IMAGES = ['../../assets/food/goli-soda.jpeg', '../../assets/food/plain-parotta.jpeg', '../../assets/food/chicken-kothu-parotta-alt.png', '../../assets/food/parotta-chicken-gravy.jpeg', '../../assets/food/madurai-kola-urundai.jpeg', '../../assets/food/mutton-chukka.jpeg'];
function InstagramSection() {
  const {
    SectionPanel,
    SectionRule,
    Button,
    Icon
  } = window.MaaMaduraiDesignSystem_c0cb48;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-8) var(--space-16)'
    }
  }, /*#__PURE__*/React.createElement(SectionPanel, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-display-lg)',
      textAlign: 'center',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 32,
    color: "var(--accent-primary)"
  }), " Follow Our Journey"), /*#__PURE__*/React.createElement(SectionRule, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: 'var(--space-4)'
    }
  }, IG_IMAGES.map(src => /*#__PURE__*/React.createElement("div", {
    key: src,
    style: {
      aspectRatio: '1 / 1',
      overflow: 'hidden',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 'var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "View on Instagram"))));
}
window.InstagramSection = InstagramSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/InstagramSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/MenuSection.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* "Our Menus" section — highlight grid by default, full itemized list on
   toggle. Prices from guidelines/menu-pricing-current.md (Square/in-store
   price column) — supersedes stale prices baked into the old repo data. */
const HIGHLIGHTS = [{
  title: 'Madurai Chicken Biryani',
  image: '../../assets/food/chicken-biryani.jpeg'
}, {
  title: 'Madurai Pepper Chicken',
  image: '../../assets/food/pepper-chicken.jpeg'
}, {
  title: 'Chicken Kothu Parotta',
  image: '../../assets/food/kothu-parotta.jpeg'
}, {
  title: 'Seeraga Samba Mutton Biryani',
  image: '../../assets/food/seeraga-samba-mutton-biryani.jpeg'
}, {
  title: 'Madurai Mutton Chukka',
  image: '../../assets/food/mutton-chukka.jpeg'
}, {
  title: 'Chicken 65',
  image: '../../assets/food/chicken-65.jpeg'
}, {
  title: 'Madurai Kola Urundai',
  image: '../../assets/food/madurai-kola-urundai.jpeg'
}, {
  title: 'Madurai Jigarthanda',
  image: '../../assets/food/jigarthanda.jpeg'
}];
const CATEGORIES = ['Madurai Special', 'Dosa', 'Idly', 'Biryani', 'Parotta', 'Egg', 'Beverages'];
const FULL_MENU = {
  'Madurai Special': [{
    title: 'Madurai Pepper Chicken',
    price: '13.99',
    isSpicy: true
  }, {
    title: 'Madurai Mutton Chukka',
    price: '15.99',
    isSpicy: true
  }, {
    title: 'Chicken 65',
    price: '13.99',
    isSpicy: true
  }, {
    title: 'Madurai Kola Urundai (3 pcs)',
    price: '11.99',
    isSpicy: true
  }, {
    title: 'Chicken Kari Dosa',
    price: '16.99',
    isSpicy: true
  }, {
    title: 'Mutton Kari Dosa',
    price: '17.99',
    isSpicy: true
  }],
  Dosa: [{
    title: 'Plain Dosai',
    price: '9.99',
    isVeg: true
  }, {
    title: 'Egg Dosai',
    price: '11.99'
  }, {
    title: 'Cheese Dosai',
    price: '12.99',
    isVeg: true
  }, {
    title: 'Chocolate Dosai',
    price: '12.99',
    isVeg: true
  }, {
    title: 'Curry Leaves Podi Dosai',
    price: '11.99',
    isVeg: true
  }, {
    title: 'Garlic Podi Dosai',
    price: '11.99',
    isVeg: true
  }, {
    title: 'Ghee Roast Dosai',
    price: '12.99',
    isVeg: true
  }, {
    title: 'Onion Dosai',
    price: '11.99',
    isVeg: true
  }, {
    title: 'Masala Dosai',
    price: '12.99',
    isVeg: true
  }, {
    title: 'Cheese Masala Dosai',
    price: '14.99',
    isVeg: true
  }, {
    title: 'Mysore Masala Dosai',
    price: '14.99',
    isVeg: true,
    isSpicy: true
  }, {
    title: 'Ghee Roast Masala Dosai',
    price: '14.99',
    isVeg: true
  }, {
    title: 'Plain Uttappam',
    price: '9.99',
    isVeg: true
  }, {
    title: 'Onion Uttappam',
    price: '11.99',
    isVeg: true
  }, {
    title: 'Curry Leaves Podi Uttappam',
    price: '11.99',
    isVeg: true
  }, {
    title: 'Garlic Podi Uttappam',
    price: '11.99',
    isVeg: true
  }],
  Idly: [{
    title: 'Idly (3pcs)',
    price: '9.99',
    isVeg: true
  }, {
    title: 'Sambar Idly (3pcs)',
    price: '12.99',
    isVeg: true
  }, {
    title: 'Curry Leaves Podi Idly',
    price: '11.99',
    isVeg: true
  }, {
    title: 'Garlic Podi Idly',
    price: '11.99',
    isVeg: true
  }, {
    title: 'Methu Vadai (2pcs)',
    price: '4.99',
    isVeg: true
  }, {
    title: 'Sambar Methu Vadai (2pcs)',
    price: '8.99',
    isVeg: true
  }],
  Biryani: [{
    title: 'Madurai Chicken Biryani',
    price: '17.99',
    isSpicy: true
  }, {
    title: 'Madurai Seeraga Samba Mutton Biryani',
    price: '20.99',
    isSpicy: true
  }, {
    title: 'Vegetable Biryani',
    price: '13.99',
    isVeg: true
  }, {
    title: 'Chicken Kuska',
    price: '13.99'
  }, {
    title: 'Mutton Kuska',
    price: '13.99'
  }],
  Parotta: [{
    title: 'Plain Parotta (2 pcs) with Veg Gravy',
    price: '12.98',
    isVeg: true
  }, {
    title: 'Plain Parotta (2 pcs) with Chicken Gravy',
    price: '13.98'
  }, {
    title: 'Plain Parotta (2 pcs) with Pepper Chicken',
    price: '20.98',
    isSpicy: true
  }, {
    title: 'Plain Parotta (2 pcs) with Mutton Chukka',
    price: '22.98',
    isSpicy: true
  }, {
    title: 'Egg Kothu Parotta',
    price: '14.99'
  }, {
    title: 'Chicken Kothu Parotta',
    price: '16.99',
    isSpicy: true
  }, {
    title: 'Mutton Kothu Parotta',
    price: '17.99',
    isSpicy: true
  }, {
    title: 'Veg Kothu Parotta',
    price: '14.99',
    isVeg: true
  }, {
    title: 'Plain Parotta (2 pcs)',
    price: '6.99',
    isVeg: true
  }],
  Egg: [{
    title: 'Omelette',
    price: '7.99'
  }, {
    title: 'Chicken Omelette',
    price: '10.99'
  }, {
    title: 'Mutton Omelette',
    price: '11.99'
  }, {
    title: 'Kalakki',
    price: '8.99'
  }, {
    title: 'Chicken Kalakki',
    price: '10.99'
  }, {
    title: 'Mutton Kalakki',
    price: '11.99'
  }],
  Beverages: [{
    title: 'Filter Coffee',
    price: '4.99',
    isVeg: true
  }, {
    title: 'Masala Tea',
    price: '4.99',
    isVeg: true
  }, {
    title: 'Goli Soda',
    price: '5.99',
    isVeg: true
  }, {
    title: 'Rose Milk',
    price: '5.99',
    isVeg: true
  }, {
    title: 'Mango Lassi',
    price: '5.99',
    isVeg: true
  }, {
    title: 'Bottled Water',
    price: '2.99',
    isVeg: true
  }, {
    title: 'Madurai Jigarthanda',
    price: '12.99',
    isVeg: true
  }]
};
function MenuSection() {
  const [mode, setMode] = React.useState('highlights');
  const [category, setCategory] = React.useState('Madurai Special');
  const {
    SectionPanel,
    SectionRule,
    CategoryTabs,
    MenuHighlightCard,
    MenuItemRow,
    Button
  } = window.MaaMaduraiDesignSystem_c0cb48;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-16) var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(SectionPanel, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-display-lg)',
      textAlign: 'center',
      margin: 0
    }
  }, "Our Menu"), /*#__PURE__*/React.createElement(SectionRule, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 12,
      marginBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: mode === 'highlights' ? 'tabActive' : 'tab',
    size: "sm",
    onClick: () => setMode('highlights')
  }, "Highlights"), /*#__PURE__*/React.createElement(Button, {
    variant: mode === 'full' ? 'tabActive' : 'tab',
    size: "sm",
    onClick: () => setMode('full')
  }, "Full Menu")), mode === 'highlights' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: 'var(--space-6)'
    }
  }, HIGHLIGHTS.map(h => /*#__PURE__*/React.createElement(MenuHighlightCard, {
    key: h.title,
    image: h.image,
    title: h.title
  }))) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CategoryTabs, {
    categories: CATEGORIES,
    active: category,
    onChange: setCategory
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max-width)',
      margin: '0 auto'
    }
  }, FULL_MENU[category].map(item => /*#__PURE__*/React.createElement(MenuItemRow, _extends({
    key: item.title
  }, item))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 'var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "Download Full PDF Menu"))));
}
window.MenuSection = MenuSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/MenuSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ReviewsSection.jsx
try { (() => {
/* Google reviews embed — the live site frames an actual Google widget
   (soft ambient shadow-card). No embeddable widget offline, so this shows
   the same framed placeholder treatment with a disclaimer, not invented
   review content. */
function ReviewsSection() {
  const {
    SectionPanel,
    SectionRule,
    Icon
  } = window.MaaMaduraiDesignSystem_c0cb48;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-8) var(--space-16)'
    }
  }, /*#__PURE__*/React.createElement(SectionPanel, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-display-lg)',
      textAlign: 'center',
      margin: 0
    }
  }, "What Our Guests Say"), /*#__PURE__*/React.createElement(SectionRule, null), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max-width)',
      margin: '0 auto',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      background: 'var(--background-card)',
      padding: 'var(--space-16)',
      textAlign: 'center',
      color: 'var(--foreground-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 28,
    color: "var(--accent-primary)"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'var(--space-4)'
    }
  }, "Google Reviews widget embeds here on the live site \u2014 not reproducible offline in this recreation, shown as a framed placeholder only."))));
}
window.ReviewsSection = ReviewsSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ReviewsSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/TopStrip.jsx
try { (() => {
/* Sticky top info strip — phone / hours / social, auto-hides past 60px
   scroll (peek-then-disappear utility strip; not a persistent nav). */
function TopStrip() {
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY < 60);
    }
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const {
    Icon
  } = window.MaaMaduraiDesignSystem_c0cb48;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'var(--background-elevated)',
      borderBottom: '1px solid var(--border-subtle)',
      overflow: 'hidden',
      height: visible ? 40 : 0,
      opacity: visible ? 1 : 0,
      transition: 'height var(--duration-fast) var(--ease-standard), opacity var(--duration-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--section-max-width)',
      margin: '0 auto',
      height: 40,
      padding: '0 var(--space-8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: 'var(--text-micro)',
      color: 'var(--foreground-muted)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 12
  }), " 0424 077 120"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 12
  }), " hello@maamadurai.com.au"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 12
  }), " Tue\u2013Sun 11am\u20139pm \xB7 Closed Mon")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "facebook",
    size: 14
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 14
  }))));
}
window.TopStrip = TopStrip;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/TopStrip.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.MenuHighlightCard = __ds_scope.MenuHighlightCard;

__ds_ns.MenuItemRow = __ds_scope.MenuItemRow;

__ds_ns.SectionPanel = __ds_scope.SectionPanel;

__ds_ns.SectionRule = __ds_scope.SectionRule;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.CategoryTabs = __ds_scope.CategoryTabs;

__ds_ns.SocialIconButton = __ds_scope.SocialIconButton;

})();
