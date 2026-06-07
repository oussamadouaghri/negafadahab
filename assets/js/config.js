/* ============================================================
   DAHAB — Site Configuration
   ↓ Edit this file to update contact info, links, and IDs.
   These values are used everywhere on the site at runtime.
   ============================================================ */
window.DAHAB_CONFIG = {
  // ── Contact information ───────────────────────────────
  phone:       "+212 661 62 79 89",
  whatsapp:    "212661627989",                    // digits only, no + or spaces
  email:       "contact@negafadahab.ma",
  address:     "Negafa Dahab Maison Mariée, Casablanca",
  mapsUrl:     "https://www.google.com/maps/place/Negafa+Dahab+Maison+Mari%C3%A9e/@33.5688744,-7.626472,17z/data=!3m1!4b1!4m6!3m5!1s0xda7cdc6066617ef:0xc5bc9b69dc99b32a!8m2!3d33.5688744!4d-7.626472!16s%2Fg%2F11njtmp37s",
  hours:       "7j/7 sur rendez-vous",

  // ── Social ────────────────────────────────────────────
  instagram:   "https://www.instagram.com/dahab_maison_mariee/",
  pinterest:   "https://pinterest.com/negafadahab",
  tiktok:      "https://tiktok.com/@negafadahab",
  facebook:    "https://facebook.com/negafadahab",

  // ── Form backend ──────────────────────────────────────
  // 1. Sign up at https://formspree.io (free for 50 submissions/month)
  // 2. Create a new form, copy your endpoint URL
  // 3. Paste it below and the form will start sending to your email
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",   // ← REPLACE THIS

  // ── Booking calendar ──────────────────────────────────
  // 1. Sign up at https://calendly.com (free)
  // 2. Create your event type (e.g. "Première visite — 60 min")
  // 3. Paste your event URL below — e.g. "https://calendly.com/dahab-maison/rdv-60"
  calendlyUrl:       "",                          // ← leave empty to show placeholder, or paste URL

  // ── Pre-filled WhatsApp message ───────────────────────
  whatsappMessage: {
    fr: "Bonjour DAHAB, je souhaite prendre rendez-vous pour discuter de mon mariage.",
    en: "Hello DAHAB, I would like to book an appointment to discuss my wedding."
  },

  // ── Domain (for canonical / OG tags) ──────────────────
  baseUrl: "https://negafadahab.ma"
};
