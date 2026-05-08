# Brancher le widget Instagram en 5 minutes

La section **« Le journal de la maison »** sur la page d'accueil affiche un placeholder. Pour qu'elle se mette à jour automatiquement avec votre compte `@dahab_maison_mariee`, il faut brancher un widget tiers. Voici **3 services au choix** — installation et qualité comparées :

| Service | Prix | Watermark | Limite posts | Recommandé pour |
|---|---|---|---|---|
| **Behold.so** ⭐ | Gratuit (jusqu'à 9 posts) | Aucun | 9 free / illimité Pro | Look haut de gamme propre |
| **LightWidget** | Gratuit | Petit logo discret | 12 posts | Compromis prix/qualité |
| **Elfsight** | 200 vues/mois gratuit | Sur free | 9 posts | Plus de personnalisation |

---

## Option A — Behold.so (recommandé) ⭐

### 1. Créez le widget
1. Allez sur https://behold.so → **Sign up free** (compte gratuit, 9 posts inclus)
2. Cliquez **+ New Widget** → **Connect Instagram**
3. Connectez `@dahab_maison_mariee` via le bouton "Continue with Facebook" (Instagram passe par Meta)
4. Choisissez le template **« Grid »** → **3 colonnes × 3 lignes** = 9 posts
5. Personnalisez :
   - **Gap** entre photos : 8 px
   - **Hover** : zoom subtil + caption visible
   - **Border radius** : 0 (pour rester éditorial, conforme à la maison)
   - **Show captions** : Off (l'image parle d'elle-même)
6. Cliquez **Save & Embed**

### 2. Copiez le code et collez-le

Behold vous donnera 2 lignes :
```html
<script src="https://w.behold.so/widget.js" type="module"></script>
<behold-widget feed-id="VOTRE_ID_BEHOLD"></behold-widget>
```

Ouvrez `index.html`, cherchez la balise commentaire `<!-- Drop-in widget code -->` (autour de la ligne 510) et remplacez le bloc `<div class="instagram-feed__placeholder">…</div>` par :

```html
<behold-widget feed-id="VOTRE_ID_BEHOLD"></behold-widget>
```

Puis ajoutez le `<script>` Behold avant `</body>` (à la fin du fichier, juste après les autres `<script>`).

Faites la même chose dans `en/index.html`.

---

## Option B — LightWidget (gratuit avec petit watermark)

### 1. Créez le widget
1. Allez sur https://lightwidget.com → **Create your widget**
2. Connectez Instagram via OAuth
3. Choisissez **Grid Gallery** — 3×3 = 9 posts
4. **Settings** :
   - Color theme : Dark
   - Hover effect : Zoom
   - Show captions : Off
5. **Save** → vous obtenez un iframe ressemblant à :

```html
<iframe src="//lightwidget.com/widgets/VOTRE_HASH.html" 
  scrolling="no" allowtransparency="true" 
  class="lightwidget-widget" 
  style="width:100%;border:0;overflow:hidden;">
</iframe>
```

### 2. Collez l'iframe

Dans `index.html` et `en/index.html`, remplacez le bloc `<div class="instagram-feed__placeholder">…</div>` par cet iframe.

---

## Option C — Elfsight Instagram Feed

### 1. Créez le widget
1. https://elfsight.com/instagram-feed-instashow/ → **Try for free**
2. Connectez `@dahab_maison_mariee`
3. Layout : **Grid** • Items : **9** • Columns : **3**
4. Style :
   - Background : transparent
   - Hover : élégant (caption ou couleur)
   - Header / footer du widget : **disabled**
5. **Save & Get Code**

### 2. Collez le snippet
Elfsight donne :
```html
<script src="https://static.elfsight.com/platform/platform.js" async></script>
<div class="elfsight-app-VOTRE_APP_ID"></div>
```

Remplacez le bloc `<div class="instagram-feed__placeholder">…</div>` par le `<div class="elfsight-app-…">`, et ajoutez le `<script>` avant `</body>`.

---

## Vérification

Une fois branché, ouvrez `negafadahab.ma` (en local ou en ligne) :

- ✅ Les 9 dernières photos de `@dahab_maison_mariee` apparaissent en grille 3×3
- ✅ Cliquer sur une photo ouvre le post Instagram dans un nouvel onglet
- ✅ Le widget se met à jour automatiquement quand vous publiez un nouveau post (entre 5 min et 1 h selon le service)
- ✅ Sur mobile, la grille devient 3×3 ou 2×… selon le widget

## Si le widget ne charge pas

- **Behold** : assurez-vous que le compte `@dahab_maison_mariee` est en **mode professionnel** (Settings → Account → Switch to Professional). Les comptes personnels ne sont pas supportés par l'API Meta.
- **LightWidget / Elfsight** : reconnectez Instagram dans le dashboard du service ; le token expire après 60 jours s'il n'est pas auto-renouvelé.
- **Bloqueurs de pubs** : certaines extensions (uBlock Origin, Ghostery) bloquent ces widgets. Testez en navigation privée.

## Pour passer à 12+ posts

- **Behold** : passez au plan **Pro à $9/mois** (illimité posts, custom CSS, plusieurs widgets)
- **LightWidget** : plan **Pro $5/mois** (retire le watermark, plus de posts)
- **Elfsight** : plan **Basic $5/mois** (200 vues → 5 000 vues/mois)

---

Une fois fait, dites-moi si vous voulez que la section ressemble plus à un **journal éditorial** (ratio 4:5 portrait, captions visibles) ou à une **mosaïque profil Insta** (1:1 carré, caption au hover) — j'ajuste le CSS en conséquence.
