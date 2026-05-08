# Workflow GitHub → Cloudflare Pages

Éditez votre site dans le navigateur, Cloudflare publie automatiquement.

---

## Setup initial — une seule fois (15 min)

### 1️⃣ Créer un compte GitHub (3 min)

1. https://github.com/signup
2. Email + mot de passe + nom d'utilisateur (ex. `dahab-maison`)
3. Plan **Free** suffit largement (illimité pour repos publics ET privés)
4. Vérifiez votre email

### 2️⃣ Créer le repository (5 min)

#### Option A — Méthode visuelle (recommandée pour non-développeurs)

1. Sur https://github.com → bouton vert **« New »** en haut à gauche
2. **Repository name** : `negafadahab` (ou ce que vous voulez)
3. **Visibility** : **Private** (recommandé — votre site n'a pas besoin d'être public sur GitHub)
4. ⚠️ **Ne cochez RIEN** d'autre (pas de README, pas de .gitignore — on les a déjà)
5. **Create repository**

GitHub vous montre une page avec des commandes Terminal — **ignorez-les**, on va uploader autrement.

6. Sur cette même page, cliquez le lien **« uploading an existing file »** (au milieu de la page)
7. Glissez **TOUT le contenu du dossier `negafadahab.ma/`** (pas le dossier lui-même, son contenu) dans la zone d'upload
   - Important : il doit y avoir `index.html`, `assets/`, `en/`, etc. à la racine
8. Au bas de la page : **Commit message** : `Initial site upload`
9. Cliquez **Commit changes**

⏱️ Attendez ~1 minute que tous les fichiers s'uploadent.

#### Option B — Si vous avez Git installé localement

```bash
cd /chemin/vers/negafadahab.ma
git init
git add .
git commit -m "Initial site upload"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/negafadahab.git
git push -u origin main
```

### 3️⃣ Connecter Cloudflare Pages à GitHub (5 min)

1. Sur Cloudflare → **Compute (Workers)** → **Pages**
2. Si vous avez déjà un projet `negafadahab` créé via Direct Upload :
   - Cliquez dessus → **Settings** → **Builds & deployments** → **Configure source** → **Connect to Git**
   - Note : ceci remplace l'upload direct. C'est un changement irréversible mais sain.
   
   Ou plus simple : **supprimez l'ancien projet Direct Upload** et recréez-en un nouveau via GitHub.

3. **Create application** → **Pages** → onglet **Connect to Git**
4. **Authorize Cloudflare** sur GitHub → choisissez votre compte
5. **Repository access** : *Only select repositories* → choisissez `negafadahab`
6. Sélectionnez le repo dans Cloudflare → **Begin setup**
7. **Project name** : `negafadahab`
8. **Production branch** : `main`
9. **Build settings** :
   - **Framework preset** : `None`
   - **Build command** : *laissez vide* (site statique, pas de build)
   - **Build output directory** : *laissez vide* ou tapez `/`
10. **Save and Deploy**

⏱️ Cloudflare clone le repo, déploie. Premier déploiement = ~1 minute.

11. **Si vous n'aviez pas encore connecté `negafadahab.ma`** : retournez à l'onglet **Custom domains** et ajoutez votre domaine (cf. CLOUDFLARE-DEPLOY.md étape 3)

---

## Workflow quotidien (après setup)

### Modifier un fichier

1. Allez sur https://github.com/VOTRE-USERNAME/negafadahab
2. Naviguez vers le fichier (ex. `assets/js/config.js`)
3. Cliquez l'icône crayon ✏️ en haut à droite
4. Modifiez dans l'éditeur web (syntax highlighting inclus, comme dans VS Code)
5. En bas : **Commit changes** → ajoutez un court message (`Updated phone number`)
6. Cliquez **Commit changes**

⏱️ **Cloudflare détecte le push automatiquement et redéploie en 30 secondes.**

Vous verrez sur Cloudflare → Pages → projet → **Deployments** chaque modification listée avec :
- ✅ Date / heure
- ✅ Commit message
- ✅ Aperçu du changement (file diff)
- ✅ Bouton **Rollback** si vous voulez revenir en arrière

### Ajouter une nouvelle photo

1. GitHub → naviguez dans `assets/images/`
2. **Add file** → **Upload files** → glissez la photo
3. Commit : `Add new founder portrait`
4. Cloudflare déploie auto

### Modifier plusieurs fichiers en bloc

1. Si vous avez beaucoup de modifs locales (chez vous), sur Mac : **GitHub Desktop** (gratuit, https://desktop.github.com) → drag/drop le dossier, commit, push, fini.
2. Cloudflare se charge du reste

---

## Comparaison rapide

| Workflow | Temps par modif | Difficulté |
|---|---|---|
| **Direct Upload** (ancien) | 5 min : ouvrir local → modifier → zipper → upload Cloudflare | Facile |
| **GitHub Web** (recommandé) ⭐ | 1 min : ouvrir github.com → modifier → commit | Très facile |
| **GitHub Desktop** (avancé) | 30 sec : modifier en local → app GitHub → push | Facile (1× setup à 5 min) |

---

## Autres avantages que vous gagnez gratuitement

### 🔄 Rollback ultra-rapide
Si vous publiez par erreur quelque chose qui casse le site :
- Cloudflare → Deployments → clic sur l'ancien deployment → **Rollback to this deployment**
- Délai : 10 secondes

### 🌿 Branches d'aperçu
Vous voulez essayer un nouveau design sans toucher au site live ?
1. GitHub → créez une branche **`test-redesign`**
2. Modifiez ce que vous voulez sur cette branche
3. Cloudflare crée automatiquement une URL d'aperçu : `test-redesign.negafadahab.pages.dev`
4. Vous testez tranquillement → quand satisfait, **Pull Request** → **Merge** dans `main` → live sur `negafadahab.ma`

### 🔍 Historique infini
Toutes les modifications gardées avec date, auteur, commit message. Vous pouvez voir exactement *« qu'est-ce qui a changé entre janvier et mars »*.

### 👥 Collaboration future
Quand vous embaucherez une personne marketing :
- Donnez-lui accès en lecture/écriture au repo GitHub
- Elle peut éditer les textes elle-même
- Vous voyez chaque changement dans l'historique avant qu'il ne soit publié (Pull Request workflow)

---

## ⚠️ Bonne pratique

**Ne supprimez JAMAIS le repo GitHub.** C'est votre source unique de vérité. Si vous le supprimez, Cloudflare ne peut plus déployer (mais le site existant reste en ligne).

Pour mettre en pause les déploiements automatiques (rare) : Cloudflare → Pages → projet → Settings → Builds & deployments → **Pause auto-deploys**.

---

## Mes recommandations

**Aujourd'hui — premier déploiement :**
1. Faites le setup GitHub (15 min en suivant ci-dessus)
2. Connectez Cloudflare au repo
3. Validez que `negafadahab.ma` marche

**Plus tard — quand vous voulez modifier quelque chose :**
- Texte / config rapide → éditez sur github.com directement
- Plus complexe (nouvelle section, refonte) → vous me ping, je fais une **Pull Request** sur le repo, vous validez (Merge), Cloudflare déploie

🌿 Bon push.
