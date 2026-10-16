// Vercel Function: GET = bookable days, POST = validate order → Square payment link → Google Sheet log.
// Secrets come from environment variables only.
const { randomUUID } = require("crypto");
const { BIRYANIS, STARTERS, MAX_BUCKETS, formatSlot, getSettings, openDays } = require("./_diwali-config.js");

const SQUARE_BASE =
  process.env.SQUARE_ENVIRONMENT === "sandbox" ? "https://connect.squareupsandbox.com" : "https://connect.squareup.com";

function send(res, status, obj, cache) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", cache || "no-store");
  res.end(JSON.stringify(obj));
}
const bad = (res, error, status = 400) => send(res, status, { error });
const clean = (s, max) => (typeof s === "string" ? s.trim().slice(0, max) : "");

function toE164(phone) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (/^04\d{8}$/.test(digits)) return "+61" + digits.slice(1);
  if (/^\+614\d{8}$/.test(digits)) return digits;
  if (/^614\d{8}$/.test(digits)) return "+" + digits;
  return null;
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

module.exports = async function handler(req, res) {
  if (req.method === "GET") {
    const settings = await getSettings();
    const days = settings.open ? openDays(Date.now(), settings.closedDates) : [];
    return send(
      res,
      200,
      {
        open: days.length > 0,
        days: days.map((d) => ({
          date: d.date,
          label: d.label,
          slots: d.slots.map((v) => ({ value: v, label: formatSlot(v) })),
        })),
      },
      "public, s-maxage=60, stale-while-revalidate=30",
    );
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return bad(res, "Method not allowed.", 405);
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return bad(res, "Invalid request.");
  }

  // --- Validate order ---
  const raw = Array.isArray(body.buckets) ? body.buckets : [];
  if (raw.length < 1 || raw.length > MAX_BUCKETS) return bad(res, "Choose between 1 and " + MAX_BUCKETS + " buckets.");
  const buckets = [];
  for (const b of raw) {
    if (!b || !Object.hasOwn(BIRYANIS, b.biryani) || !Object.hasOwn(STARTERS, b.starter))
      return bad(res, "Please check your bucket choices.");
    buckets.push({ biryani: b.biryani, starter: b.starter });
  }

  const settings = await getSettings();
  if (!settings.open) return bad(res, "Sorry, Diwali pre-orders are now closed.", 409);
  const day = openDays(Date.now(), settings.closedDates).find((d) => d.date === body.date);
  if (!day) return bad(res, "That pickup day is no longer available. Please pick another day.", 409);
  if (!body.slot || !day.slots.includes(body.slot)) return bad(res, "Please choose a valid pickup time.");

  const name = clean(body.name, 80);
  const email = clean(body.email, 120);
  const phone = clean(body.phone, 20);
  const notes = clean(body.notes, 300);
  const phoneE164 = toE164(phone);
  if (!name) return bad(res, "Please enter your name.");
  if (!phoneE164) return bad(res, "Please enter a valid Australian mobile number.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad(res, "Please enter a valid email.");

  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  if (!token || !locationId) return bad(res, "Online payment is not set up yet. Please call 0424 077 120.", 503);

  // Test mode: /diwali?test=<DIWALI_TEST_CODE> charges $1 per bucket. Remove the env var to switch off.
  const testCode = process.env.DIWALI_TEST_CODE;
  const isTest = !!testCode && body.testCode === testCode;
  const priceOf = (b) => (isTest ? 1 : BIRYANIS[b.biryani].price);

  const bookingId = (isTest ? "TEST-" : "DW-") + randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
  const pickup = day.label + " at " + formatSlot(body.slot);
  const total = buckets.reduce((s, b) => s + priceOf(b), 0);
  const itemsText = buckets.map((b) => BIRYANIS[b.biryani].name + " + FREE " + STARTERS[b.starter]);
  const origin = (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://" + (req.headers["x-forwarded-host"] || req.headers.host)
  ).replace(/\/$/, "");

  // --- Create Square payment link ---
  // A PICKUP fulfillment makes the paid order appear in Square POS > Orders (and auto-print).
  const fulfillment = {
    type: "PICKUP",
    state: "PROPOSED",
    pickup_details: {
      recipient: { display_name: name, phone_number: phoneE164, email_address: email },
      schedule_type: "SCHEDULED",
      pickup_at: day.date + "T" + body.slot + ":00+11:00",
      note: (bookingId + " · " + itemsText.join(" | ") + (notes ? " · Note: " + notes : "")).slice(0, 500),
    },
  };
  const createLink = (withFulfillment) =>
    fetch(SQUARE_BASE + "/v2/online-checkout/payment-links", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "Square-Version": "2024-10-17",
      },
      body: JSON.stringify({
        idempotency_key: randomUUID(),
        description: "Diwali pre-order " + bookingId,
        order: {
          location_id: locationId,
          reference_id: bookingId,
          line_items: buckets.map((b) => ({
            name: (isTest ? "TEST – " : "") + "Diwali Half Bucket – " + BIRYANIS[b.biryani].name,
            quantity: "1",
            // Item notes always print on Square order tickets — carry the pickup slot + ref here.
            note: "FREE " + STARTERS[b.starter] + " · PICKUP " + pickup + " · " + bookingId + " · " + name,
            base_price_money: { amount: priceOf(b) * 100, currency: "AUD" },
          })),
          ...(withFulfillment ? { fulfillments: [fulfillment] } : {}),
        },
        checkout_options: {
          redirect_url: origin + "/diwali/thanks?ref=" + bookingId,
          ask_for_shipping_address: false,
        },
        pre_populated_data: { buyer_email: email, buyer_phone_number: phoneE164 },
        payment_note: bookingId + " · " + name + " · Pickup " + pickup,
      }),
    });
  let squareRes, squareData;
  try {
    squareRes = await createLink(true);
    squareData = await squareRes.json().catch(() => ({}));
    if (!squareRes.ok) {
      console.error("Square rejected pickup fulfillment, retrying without", JSON.stringify(squareData.errors || squareData));
      squareRes = await createLink(false);
      squareData = await squareRes.json().catch(() => ({}));
    }
  } catch (err) {
    console.error("Square request failed", err);
    return bad(res, "We couldn't start payment just now. Please try again or call 0424 077 120.", 502);
  }
  const checkoutUrl = squareData && squareData.payment_link && squareData.payment_link.url;
  if (!squareRes.ok || !checkoutUrl) {
    console.error("Square payment link failed", squareRes.status, JSON.stringify((squareData && squareData.errors) || squareData));
    return bad(res, "We couldn't start payment just now. Please try again or call 0424 077 120.", 502);
  }

  // --- Log to Google Sheet (best effort: payment details are also in Square) ---
  const sheetUrl = process.env.DIWALI_SHEET_URL;
  if (sheetUrl) {
    try {
      await fetch(sheetUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        signal: AbortSignal.timeout(8000),
        body: JSON.stringify({
          secret: process.env.DIWALI_SHEET_SECRET || "",
          bookingId,
          createdAt: new Date().toISOString(),
          pickupDate: day.date,
          pickupTime: formatSlot(body.slot),
          pickup,
          name,
          phone,
          email,
          items: itemsText,
          chicken: buckets.filter((b) => b.biryani === "chicken").length,
          mutton: buckets.filter((b) => b.biryani === "mutton").length,
          chicken65: buckets.filter((b) => b.starter === "chicken65").length,
          kolaUrundai: buckets.filter((b) => b.starter === "kolaUrundai").length,
          total,
          notes,
          squareOrderId: squareData.payment_link.order_id || "",
          checkoutUrl,
        }),
      });
    } catch (err) {
      console.error("Diwali sheet log failed", bookingId, err);
    }
  }

  return send(res, 200, { checkoutUrl, bookingId });
};
