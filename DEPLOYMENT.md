# DAHAB · Guide de déploiement → negafadahab.ma

Ce document explique étape par étape comment mettre le site en ligne sur votre domaine `negafadahab.ma`.

---

## 1. Choisir un hébergement

Le site est entièrement statique (HTML / CSS / JS). N'importe quel hébergement web fait l'affaire — pas besoin de Node, PHP, ou base de données. Voici trois options recommandées par ordre croissant de coût.

### Option A — Cloudflare Pages (gratuit, recommandé) ⭐

| | |
|---|---|
| **Prix** | Gratuit |
| **Vitesse** | CDN mondial — très rapide depuis le Maroc |
| **HTTPS** | Automatique |
| **Forfait limites** | 500 builds/mois, illimité bandwidth |
| **Inconvénient** | Pas de panneau de contrôle email (pas de boîte mail @negafadahab.ma) |

**Étapes :**
1. Créez un compte sur https://dash.cloudflare.com (gratuit)
2. Allez dans **Workers & Pages** → **Create application** → **Pages** → **Upload assets**
3. Glissez le ZIP `negafadahab-deploy.zip` (fourni dans `/outputs/`)
4. Donnez-lui un nom (ex. `negafadahab`)
5. Une fois déployé, allez dans **Custom domains** et ajoutez `negafadahab.ma` et `www.negafadahab.ma`
6. Cloudflare vous donnera des serveurs DNS à configurer chez votre registrar marocain (voir section 2)

### Option B — Hébergeur marocain (cPanel) — pour @negafadahab.ma email inclus

| Hébergeur | Prix | Notes |
|---|---|---|
| **LWS Maroc** | ~ 199 MAD/an | Email + SSL inclus, support FR |
| **GENIOUS Communications** | ~ 350 MAD/an | Bon support local |
| **Maroc Hébergement** | ~ 250 MAD/an | Datacenter Casablanca |

**Étapes :**
1. Souscrivez à un plan "shared hosting" basique
2. Demandez à l'hébergeur de pointer le domaine `negafadahab.ma` vers leurs serveurs (ils s'en chargent souvent)
3. Connectez-vous au cPanel → **File Manager** → dossier `public_html`
4. **Supprimez** le fichier `index.html` par défaut
5. Uploadez le ZIP `negafadahab-deploy.zip` et **Extract**
6. Vérifiez que `.htaccess`, `index.html`, `favicon.ico` sont bien à la racine de `public_html/`
7. Activez SSL gratuit (Let's Encrypt) depuis cPanel → **SSL/TLS Status** → Run AutoSSL

### Option C — Vercel / Netlify (gratuit, déploiement git)

Si vous comptez ouvrir un compte GitHub plus tard pour gérer les modifications :
1. Mettez le code dans un dépôt GitHub
2. Connectez Vercel ou Netlify au dépôt
3. Pointez `negafadahab.ma` vers Vercel/Netlify

---

## 2. Configurer le DNS de negafadahab.ma

Vous avez acheté `negafadahab.ma` — il faut maintenant pointer ce domaine vers votre hébergement.

### Si vous avez choisi **Cloudflare Pages** (Option A) :
1. Dans Cloudflare, ajoutez votre domaine en tant que site
2. Cloudflare vous donnera **2 serveurs de noms** (ex. `kate.ns.cloudflare.com`, `john.ns.cloudflare.com`)
3. Connectez-vous au panneau de votre registrar `.ma` (ex. **GENIOUS** ou l'AMNES si vous l'avez acheté direct)
4. Modifiez les **DNS / serveurs de noms (nameservers)** : remplacez ceux par défaut par ceux de Cloudflare
5. Comptez 1 à 24 heures pour la propagation

### Si vous avez choisi un **hébergeur cPanel marocain** (Option B) :
1. L'hébergeur vous a donné une **IP du serveur** ou des **nameservers** (ex. `ns1.lws.fr`, `ns2.lws.fr`)
2. Chez le registrar de `negafadahab.ma`, créez deux records DNS :
   - **Type A**, nom `@`, valeur = IP du serveur
   - **Type A**, nom `www`, valeur = IP du serveur
3. Ou : remplacez les nameservers par ceux de l'hébergeur

**Vérifier que ça marche :**
```bash
dig negafadahab.ma
ping negafadahab.ma
```
Une fois propagé, ouvrez https://negafadahab.ma → vous devez voir le site.

---

## 3. Brancher le formulaire de contact

Le formulaire utilise **Formspree** (gratuit jusqu'à 50 envois/mois).

1. Créez un compte sur https://formspree.io
2. Cliquez **+ New Form** → choisissez "Forms" → donnez-lui un nom (ex. `DAHAB - rendez-vous`)
3. Spécifiez votre email de réception (ex. `contact@negafadahab.ma`)
4. Formspree vous donne un endpoint du type : `https://formspree.io/f/xpzgaoqv`
5. Ouvrez `/assets/js/config.js` sur votre serveur, et remplacez :
   ```js
   formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
   ```
   par votre endpoint réel. Sauvegardez et rechargez la page.
6. Testez en envoyant le formulaire depuis le site.

> Si vous ne configurez pas Formspree, le bouton "Envoyer ma demande" ouvrira simplement la messagerie email du visiteur avec votre adresse pré-remplie — fallback gracieux.

---

## 4. Activer le calendrier de réservation

Le site a une section "Choisissez votre rendez-vous" avec un placeholder. Pour activer un vrai calendrier :

1. Créez un compte gratuit sur https://calendly.com
2. Configurez votre disponibilité (jours/heures)
3. Créez un **Event Type** — ex. "Première visite — 60 minutes"
4. Calendly vous donne une URL du type `https://calendly.com/dahab-maison/rdv-60`
5. Ouvrez `/assets/js/config.js` et collez cette URL dans :
   ```js
   calendlyUrl: "https://calendly.com/dahab-maison/rdv-60",
   ```
6. Rechargez la page → le placeholder est remplacé par le vrai calendrier intégré.

---

## 5. Personnaliser les contacts

Toutes les coordonnées (téléphone, WhatsApp, email, adresse, horaires, réseaux sociaux) sont centralisées dans **un seul fichier** :

📄 `/assets/js/config.js`

Ouvrez-le, modifiez les valeurs, sauvegardez. Aucune autre modification du site n'est nécessaire — tout se met à jour automatiquement.

```js
window.DAHAB_CONFIG = {
  phone:       "+212 522 88 14 30",
  whatsapp:    "212661472288",          // chiffres uniquement, sans + ni espaces
  email:       "contact@negafadahab.ma",
  address:     "14, Rue de la Liberté, Casablanca 20250",
  hours:       "Mar – Sam · 10h00 – 19h30",
  instagram:   "https://instagram.com/negafadahab",
  // ... etc.
};
```

---

## 6. Ajouter vos photos et vidéo

### Photo de la fondatrice (section éditoriale)
Remplacez `/assets/images/founder.jpg` par votre photo. Format conseillé : **800×1000 px**, JPG.

### Photos de la galerie (collection)
Pour chaque article `<div class="gallery__item-photo">` dans `index.html`, ajoutez l'attribut `style` :
```html
<div class="gallery__item-photo" data-label="Takchita Royal · 01"
     style="--bg-image: url('/assets/images/gallery/takchita-01.jpg');"></div>
```
Format conseillé : **600×800 px**, JPG, optimisé (≤ 200 KB par image).

### Vidéo du hero
Placez votre vidéo MP4 (boucle silencieuse, ≤ 8 Mo) à `/assets/images/hero-negafa.mp4`. Format conseillé : **1920×1080**, codec H.264, durée 8–12 secondes en boucle.
Ajoutez aussi une image de fallback `/assets/images/hero-poster.jpg` (1920×1080) pour le chargement.

### Image OG (partage Facebook/WhatsApp)
Une image générique est fournie (`/assets/images/og-image.jpg`). Pour la personnaliser : créez une image **1200×630 px** avec votre photo + logo.

---

## 7. Vérification post-déploiement

Avant d'annoncer le site, vérifiez :

- [ ] https://negafadahab.ma s'ouvre (HTTPS, pas HTTP)
- [ ] https://www.negafadahab.ma redirige vers https://negafadahab.ma
- [ ] La version EN s'affiche : https://negafadahab.ma/en/
- [ ] Le bouton WhatsApp ouvre une conversation avec le bon numéro
- [ ] Le formulaire envoie un email test à votre boîte
- [ ] Sur mobile : menu hamburger fonctionne, les sections s'affichent bien
- [ ] Google PageSpeed ≥ 90 : https://pagespeed.web.dev/
- [ ] Sitemap accessible : https://negafadahab.ma/sitemap.xml
- [ ] 404 personnalisé : https://negafadahab.ma/page-qui-n-existe-pas

### Soumettre à Google
1. https://search.google.com/search-console → Add property → `negafadahab.ma`
2. Vérifiez la propriété (TXT record DNS ou fichier HTML)
3. Soumettez le sitemap : `https://negafadahab.ma/sitemap.xml`

### Configurer Google Business Profile (très important pour le SEO local)
1. https://business.google.com → créez la fiche "DAHAB — Maison de la Mariée"
2. Catégorie : **Salon de mariage** / **Couture nuptiale**
3. Adresse : votre adresse Casablanca
4. Téléphone, site web (`negafadahab.ma`), horaires
5. Ajoutez 8–12 belles photos (extérieur, intérieur, takchitas, équipe)

---

## 8. Maintenance courante

**Pour modifier un texte ou ajouter un témoignage :**
- Ouvrez `index.html` (ou `en/index.html` pour la version anglaise) dans un éditeur de texte
- Cherchez le texte à modifier (`Ctrl+F`)
- Sauvegardez et re-uploadez le fichier

**Pour mettre à jour les contacts :**
- Modifiez uniquement `/assets/js/config.js`

**Pour ajouter une photo dans la galerie :**
- Uploadez l'image dans `/assets/images/gallery/`
- Dupliquez un bloc `<article class="gallery__item">` dans `index.html` et `en/index.html`
- Ajoutez `style="--bg-image: url('/assets/images/gallery/votre-photo.jpg');"` au `gallery__item-photo`

---

## Support

Pour toute question sur le déploiement, vous pouvez revenir vers moi à tout moment.

🌿 Bon lancement.
