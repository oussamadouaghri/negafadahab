# DAHAB · Maison de la Mariée

Site vitrine officiel — `negafadahab.ma`

## Stack

- **HTML / CSS / JavaScript statique** — aucun build, aucun framework
- **Multilingue** : Français (par défaut) + Anglais (`/en/`)
- **Responsive** : desktop, tablette, mobile
- **SEO** : JSON-LD `BeautySalon`, Open Graph, sitemap, hreflang
- **Performance** : fonts préchargées, animations respectent `prefers-reduced-motion`

## Structure

```
negafadahab.ma/
├── index.html              ← page d'accueil française
├── 404.html                ← page d'erreur
├── sitemap.xml
├── robots.txt
├── favicon.ico
├── .htaccess               ← config Apache (HTTPS, cache, gzip)
├── en/
│   └── index.html          ← page anglaise
├── assets/
│   ├── css/style.css       ← styles complets
│   ├── js/
│   │   ├── config.js       ← ⚙️  contacts à éditer
│   │   └── main.js         ← interactions
│   └── images/             ← logos, og-image, photos
└── DEPLOYMENT.md           ← guide de mise en ligne
```

## Fonctionnalités

- Navigation sticky avec hamburger mobile
- Hero vidéo en boucle + ornements khatam animés
- 6 sections narratives : Héritage · Services · Atelier · Galerie · Témoignages · Booking · Contact
- **Galerie filtrable** (Takchita / Caftan / Ammariya / Henné) avec lightbox
- **Bouton WhatsApp flottant** avec message pré-rempli
- **Calendrier de réservation** prêt pour Calendly
- **Formulaire de contact** prêt pour Formspree (avec fallback mailto)
- Switch de langue FR ↔ EN
- Smooth scroll, reveal-on-scroll, hover lift sur les cartes

## Configuration

Ouvrez `assets/js/config.js` pour modifier :
- Téléphone, WhatsApp, email, adresse, horaires
- Liens réseaux sociaux
- Endpoint Formspree
- URL Calendly

## Déploiement

Voir [`DEPLOYMENT.md`](./DEPLOYMENT.md) pour le guide complet (3 options d'hébergement, configuration DNS, Formspree, Calendly).

## Crédits

- Design : motif **Khatam Sulaymani** (étoile à 8 pointes — Sceau de Salomon) en zellige marocain
- Polices : Cormorant Garamond, Cinzel, Amiri, Inter (Google Fonts)
- Couleurs : vert profond / or warm / ivoire (palette Maison)
