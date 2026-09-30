# DEHA Watches

Site vitrine / boutique statique (HTML, CSS, JS, sans build).

- `index.html` : structure de la page
- `style.css` : design
- `app.js` : catalogue produits, cadrans SVG, filtres, panier (sauvegardé dans le navigateur)
- `images/` : vos photos de montres

## Ajouter vos photos

Déposez une image dans `images/` nommée comme l'`id` du produit dans `app.js`,
par exemple `images/atlas-chrono-noir.jpg`. Elle remplace automatiquement le
cadran dessiné. Pour modifier les noms, prix ou collections, éditez le tableau
`PRODUCTS` en haut de `app.js`.

Les avis clients de `index.html` sont des exemples, à remplacer par de vrais avis.

Voir le site en local : `python3 -m http.server` dans ce dossier, puis http://localhost:8000
