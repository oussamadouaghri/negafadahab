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
  address:     "14, Rue de la Liberté, Casablanca 20250",
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
