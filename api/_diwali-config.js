// Diwali 2026 half-bucket pre-order — all offer rules live here.
// Times are Sydney (AEDT, UTC+11) for the whole campaign window.
// Files starting with "_" inside /api are not deployed as endpoints.

const BIRYANIS = {
  chicken: { name: "Madurai Chicken Biryani", price: 100 },
  mutton: { name: "Madurai Seeraga Samba Mutton Biryani", price: 110 },
};

const STARTERS = {
  chicken65: "Chicken 65",
  kolaUrundai: "Kola Urundai",
};

const MAX_BUCKETS = 6;

// Each weekend closes Thursday 6pm before it.
const WEEKENDS = [
  { cutoff: "2026-10-29T18:00:00+11:00", days: ["2026-10-30", "2026-10-31", "2026-11-01"] },
  { cutoff: "2026-11-05T18:00:00+11:00", days: ["2026-11-06", "2026-11-07", "2026-11-08"] },
  { cutoff: "2026-11-12T18:00:00+11:00", days: ["2026-11-13", "2026-11-14", "2026-11-15"] },
];

// Pickup window per weekday (24h), 30-minute slots, last slot included.
const HOURS = {
  5: ["11:00", "20:30"], // Friday
  6: ["10:00", "20:30"], // Saturday
  0: ["09:00", "19:30"], // Sunday
};

function utcDate(date) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function dayLabel(date) {
  return utcDate(date)
    .toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" })
    .replace(",", "");
}

function slotsFor(date) {
  const [open, close] = HOURS[utcDate(date).getUTCDay()];
  const toMin = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
  const out = [];
  for (let m = toMin(open); m <= toMin(close); m += 30) {
    out.push(String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"));
  }
  return out;
}

const ALL_DAYS = WEEKENDS.flatMap((w) =>
  w.days.map((date) => ({ date, label: dayLabel(date), cutoff: w.cutoff, slots: slotsFor(date) })),
);

/** Days still bookable right now: before their Thursday cutoff and not manually closed. */
function openDays(now, closedDates = []) {
  return ALL_DAYS.filter((d) => now < Date.parse(d.cutoff) && !closedDates.includes(d.date));
}

function formatSlot(slot) {
  const h = Number(slot.slice(0, 2));
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return h12 + ":" + slot.slice(3) + suffix;
}

// Manual on/off switch from the Google Sheet "Settings" tab (scripts/diwali-bookings.gs), cached 60s.
let cached = { at: 0, value: null };

async function getSettings() {
  const url = process.env.DIWALI_SHEET_URL;
  if (!url) return { open: true, closedDates: [] };
  if (cached.value && Date.now() - cached.at < 60000) return cached.value;
  try {
    const res = await fetch(url + "?action=settings", { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const value = {
      open: data.open !== false,
      closedDates: Array.isArray(data.closedDates) ? data.closedDates.map(String) : [],
    };
    cached = { at: Date.now(), value };
    return value;
  } catch {
    // If the sheet can't be reached, stay open rather than lose orders.
    return cached.value || { open: true, closedDates: [] };
  }
}

module.exports = { BIRYANIS, STARTERS, MAX_BUCKETS, ALL_DAYS, openDays, formatSlot, getSettings };
