# Déployer DAHAB sur Cloudflare Pages — 15 minutes

Ce guide vous emmène de zéro à `https://negafadahab.ma` en ligne, gratuitement.

---

## Étape 1 — Créer un compte Cloudflare (2 min)

1. Allez sur https://dash.cloudflare.com/sign-up
2. Email + mot de passe → **Create Account**
3. Confirmez l'email

> ⚠️ **N'achetez pas de domaine** chez Cloudflare. Le vôtre `negafadahab.ma` est déjà acheté ailleurs (probablement chez l'AMNES ou un registrar marocain). On va juste pointer le DNS vers Cloudflare.

---

## Étape 2 — Déployer le site sur Cloudflare Pages (5 min)

1. Dans le dashboard Cloudflare → menu gauche → **Compute (Workers)** → **Pages**
2. Cliquez **Create application** → onglet **Direct Upload** (PAS « Connect to Git »)
3. **Project name** : `negafadahab` (ou ce que vous voulez — c'est juste l'identifiant interne)
4. **Production branch** : laissez `production`
5. Cliquez **Create project**
6. Faites glisser le fichier **`negafadahab-deploy.zip`** dans la zone de drop (ou cliquez « select from computer »)
7. Attendez 30 secondes — Cloudflare extrait et déploie
8. **Save and Deploy**

✅ Votre site est maintenant en ligne à `https://negafadahab.pages.dev` (URL temporaire de Cloudflare).
Ouvrez-la dans un nouvel onglet pour vérifier que tout fonctionne.

---

## Étape 3 — Connecter votre domaine `negafadahab.ma` (5 min)

### 3a. Ajouter le domaine dans Cloudflare

1. Dans le dashboard Cloudflare → menu gauche → **Websites** → **Add a site**
2. Tapez : `negafadahab.ma` → **Continue**
3. **Plan** : choisissez **Free** (suffit largement)
4. Cloudflare scanne les DNS existants (probablement vides) → **Continue**
5. Cloudflare vous donne **2 nameservers** ressemblant à :
   ```
   kate.ns.cloudflare.com
   john.ns.cloudflare.com
   ```
   (les noms varient — copiez ce que Cloudflare vous montre)

### 3b. Pointer votre registrar (.ma) vers Cloudflare

Connectez-vous au panneau d'administration où vous avez **acheté** `negafadahab.ma` :
- Si AMNES : https://www.amnes.ma → Mes domaines
- Si LWS : https://panel.lws.fr
- Si Genious : leur back-office
- Autre : cherchez « DNS » ou « Nameservers »

Cherchez **« Nameservers »** ou **« Serveurs de noms »** ou **« DNS Management »** :
- **Supprimez** les nameservers actuels
- **Ajoutez** les 2 nameservers Cloudflare que vous avez copiés
- **Sauvegardez**

> ⏱️ La propagation DNS prend de **5 minutes à 24 heures** selon votre registrar. En général, < 1 h pour les .ma.

### 3c. Vérifier dans Cloudflare

Retournez sur Cloudflare → **Websites** → `negafadahab.ma` → **DNS**.

Une fois propagé, vous verrez **« Active »** en haut. Si toujours « Pending Nameserver Update » après 1 heure, attendez ou cliquez **Re-check now**.

### 3d. Connecter le domaine au site Pages

1. Cloudflare dashboard → **Compute (Workers)** → **Pages** → cliquez sur le projet `negafadahab`
2. Onglet **Custom domains** → **Set up a custom domain**
3. Tapez : `negafadahab.ma` → **Continue** → **Activate domain**
4. Faites pareil pour `www.negafadahab.ma` (Cloudflare le redirigera automatiquement vers l'apex grâce au `_redirects`)

Cloudflare crée automatiquement les records DNS nécessaires (`A` ou `CNAME` vers Pages).

⏱️ **Activation HTTPS** : Cloudflare génère un certificat SSL gratuit en 5-15 minutes.

---

## Étape 4 — Vérifications finales (3 min)

Une fois les DNS propagés et le SSL actif, testez :

- [ ] https://negafadahab.ma s'ouvre (cadenas vert dans la barre)
- [ ] https://www.negafadahab.ma redirige vers https://negafadahab.ma
- [ ] http://negafadahab.ma redirige vers https:// (Cloudflare le fait auto)
- [ ] Le widget Instagram charge (peut prendre 1-2 secondes)
- [ ] Le bouton WhatsApp ouvre une conversation avec votre numéro
- [ ] La page anglaise s'affiche : https://negafadahab.ma/en/
- [ ] Le 404 personnalisé : https://negafadahab.ma/page-quinexistepas

---

## Étape 5 — Vitesse (optionnel, 2 min)

Cloudflare a quelques options gratuites qui peuvent encore accélérer le site :

1. Cloudflare dashboard → `negafadahab.ma` → **Speed** → **Optimization**
2. Activez :
   - ✅ **Auto Minify** : HTML, CSS, JS (gain ~10%)
   - ✅ **Brotli** : compression supérieure à gzip
   - ✅ **Early Hints** : aide les navigateurs à précharger
3. Cloudflare dashboard → **Caching** → **Configuration**
   - **Browser Cache TTL** : `Respect Existing Headers` (pour respecter mes `_headers`)
   - **Caching Level** : `Standard`

Test final : https://pagespeed.web.dev/ → entrez votre URL → score doit être ≥ 90 sur mobile et desktop.

---

## Étape 6 — SEO (optionnel mais important, 5 min)

### Soumettre à Google
1. https://search.google.com/search-console → **Add property** → entrez `negafadahab.ma`
2. Choix **Domain** (recommandé) → vous donnera un TXT record DNS à ajouter
3. Ajoutez ce record dans Cloudflare → **DNS** → **Add record** → Type `TXT`, Name `@`, value = ce que Google donne
4. Retournez sur Search Console → **Verify**
5. Une fois vérifié → **Sitemaps** → ajoutez : `https://negafadahab.ma/sitemap.xml`

### Créer la fiche Google Business Profile
1. https://business.google.com → **Manage now**
2. Nom : `DAHAB Maison Mariée`
3. Catégorie : `Salon de mariage` (et sous-catégories : Couture, Coiffure mariage)
4. Adresse : votre vraie adresse Casablanca
5. Téléphone : `+212 661 62 79 89`
6. Site web : `https://negafadahab.ma`
7. Vérification : Google envoie un courrier postal avec un code (5-7 jours)
8. Une fois vérifié → ajoutez **8-12 photos** (atelier, takchitas, équipe, ammariya)

---

## Si quelque chose ne marche pas

### Le site ne s'ouvre pas après 24h
- Vérifiez que les nameservers chez votre registrar sont **exactement** ceux de Cloudflare
- Dans Cloudflare → Overview, le statut doit être **« Active »**
- Sinon, contactez votre registrar (AMNES, LWS…) — parfois ils bloquent les changements

### Le site s'ouvre mais HTTPS donne erreur
- Attendez 15 minutes (génération SSL)
- Cloudflare → **SSL/TLS** → **Edge Certificates** → **Always Use HTTPS** : ON
- Mode SSL/TLS : **Full**

### Widget Instagram vide
- Vérifiez sur https://elfsight.com/dashboard/ que le widget est bien **publié**
- Compte Instagram doit être **professionnel** (Business)

### Pour mettre à jour le site
1. Modifiez les fichiers en local
2. Re-zippez le dossier `negafadahab.ma/`
3. Cloudflare → Pages → projet `negafadahab` → **Create deployment** → uploadez le nouveau ZIP
4. Le nouveau déploiement remplace l'ancien en ~30 secondes

---

## Coût total

**0 MAD/mois.** 

Les seuls frais que vous aurez sont :
- Le renouvellement du domaine `negafadahab.ma` (~150 MAD/an chez la plupart des registrars marocains)
- Si vous activez Calendly Pro (5$/mois — optionnel)
- Si vous activez Elfsight Basic (5$/mois — recommandé pour > 200 vues/mois sur la galerie)
- Si vous voulez une boîte mail `contact@negafadahab.ma` → ~50 MAD/mois chez un mail-host (ex. Zoho Mail, ProtonMail), Cloudflare ne fait pas mail.

---

## Bonus : Email pour `contact@negafadahab.ma`

Cloudflare Pages ne fait pas d'email. Pour avoir une vraie boîte `contact@negafadahab.ma` :

### Option gratuite — Cloudflare Email Routing
1. Cloudflare dashboard → `negafadahab.ma` → **Email** → **Email Routing**
2. **Enable Email Routing** (Cloudflare ajoute auto les MX records)
3. Créez une **règle** : `contact@negafadahab.ma` → forward vers votre Gmail/Yahoo personnel
4. Toutes les emails à `contact@negafadahab.ma` arrivent dans votre Gmail
5. **Limitation** : vous pouvez recevoir, mais pas envoyer DEPUIS contact@negafadahab.ma (Cloudflare fait du forwarding only)

### Option payante — Zoho Mail
- ~12$/an (le moins cher) pour pouvoir aussi **envoyer** depuis `contact@negafadahab.ma`
- https://www.zoho.com/mail/

---

🌿 Bon lancement.
