# DEHA Watches

Site vitrine / boutique statique (HTML, CSS, JS, sans build).

- `index.html` : structure de la page
- `style.css` : design
- `app.js` : les 3 montres (tableau `PRODUCTS`), fiche produit, comparatif, panier
- `images/` : photos des montres (`chrono-panda.webp`, `riviera-blanc.webp`, `riviera-bleu.webp`)

## Modifier une montre

Noms, prix, descriptions et caractéristiques sont dans le tableau `PRODUCTS`
en haut de `app.js`. Vérifiez les caractéristiques techniques (taille, mouvement,
étanchéité…) auprès de votre fournisseur. Pour changer une photo, remplacez le
fichier dans `images/` (fond blanc de préférence).

Les avis clients de `index.html` sont des exemples, à remplacer par de vrais avis.

Voir le site en local : `python3 -m http.server` dans ce dossier, puis http://localhost:8000
