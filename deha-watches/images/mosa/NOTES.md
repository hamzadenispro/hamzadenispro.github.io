# Notes de référence — mosawatches.fr

Relevé effectué le 2026-11-10 avec curl (HTML rendu côté serveur + bundle JS du site).

**Plateforme :** ce n'est pas un thème Shopify classique. `/products.json` et `/collections.json` renvoient 404 (une page HTML). Le site est une application React (TanStack Router, chemins `/produit/<handle>` et `/collections/<handle>`) qui s'appuie sur l'API Storefront de Shopify : les ID produits sont du type `gid://shopify/Product/...` et les images sont servies par `cdn.shopify.com`. Le catalogue complet (36 montres et 3 boîtes) est intégré dans le HTML de chaque page.

## Images téléchargées

Sur le site, **chaque produit n'a qu'une seule image**. Il n'existe aucune photo portée ni de détail, donc il n'y a qu'un fichier `-1` par modèle. Les images ont été téléchargées en ajoutant `&width=1200` à l'URL source. Elles font toutes 1200×1200 px, sur fond blanc.

| Fichier | Format réel | Produit Mosa (titre exact) | Page produit | URL source exacte |
|---|---|---|---|---|
| `nautilus-bleu-1.jpg` | JPEG | Montre Nautilus Bleu Argent | https://mosawatches.fr/produit/montre-nautilus-bleu-argent | https://cdn.shopify.com/s/files/1/1091/4971/6820/files/IMG-5551.jpg?v=1793473390 |
| `nautilus-blanc-1.jpg` | JPEG | Montre Nautilus Blanc Argent | https://mosawatches.fr/produit/montre-nautilus-blanc-argent | https://cdn.shopify.com/s/files/1/1091/4971/6820/files/IMG-5550.jpg?v=1793473390 |
| `nautilus-noir-1.png` | PNG | Montre PTK Noir Argent | https://mosawatches.fr/produit/montre-ptk-noir-argent | https://cdn.shopify.com/s/files/1/1091/4971/6820/files/5D5CF776-12CF-4D92-9941-7EB57675F3D4.png?v=1793473380 |

**⚠ Point important sur le modèle noir :** Mosa ne vend **aucun Nautilus à cadran noir**. La « Montre PTK Noir Argent » est classée dans la collection Nautilus, mais c'est visuellement un style **Aquanaut** : bracelet caoutchouc à motif, cadran noir quadrillé et non strié horizontalement, chiffres arabes, lunette lisse brossée. Les modèles bleu et blanc correspondent bien au style Nautilus : boîtier coussin/octogonal avec « oreilles » latérales, cadran strié horizontal, index bâtons, guichet date à 3 h et bracelet acier intégré. Le 4ᵉ modèle de la collection est « Montre Nautilus Or Rose » (handle `or-rose-ntls`). Il n'a pas été téléchargé.

## Page d'accueil — structure (dans l'ordre)

Titre de la page : « mosawatches — Montres premium à moins de 250 € ».

1. **Bandeau défilant** (en boucle) : « -30% sur toute la collection ✦ Livraison offerte partout ✦ Garantie 2 ans ✦ Écrin cadeau inclus ».
2. **En-tête** : liens Accueil / Boutique / La Maison, logo centré, puis FAQ / Contact.
3. **Hero** (image plein écran `hero-*.jpg`)
   - Badge : « -30 % sur tout le catalogue »
   - Titre : « Le look d'une montre à 3 000 €. / Le prix d'une à 200 €. »
   - Sous-titre : « Acier 316L, verre anti-rayures, finitions contrôlées une à une. »
   - Bouton « Voir les montres » (→ /boutique), puis la mention « Paiement sécurisé · Livraison 7 à 10 jours ».
4. **Barre de réassurance** : Livraison en 7 à 10 jours · Commande traitée en 24h · Garantie 2 ans · Mouvement inclus · Produits authentiques · Mouvement Seiko · 4.8 / 5 · +2 000 clients.
5. **« Nos best-sellers — Les montres dont tout le monde parle »** : 4 cartes produit (Cadran Chiffres Romain, Bracelet Caoutchouc, Diamant Or Rose, Cadran Panda). Chaque carte affiche un badge « -23% », une note « 4.8 », une ligne de specs, le prix et le prix barré, et un bouton « Ajouter au panier ». Lien « Voir les 36 montres ».
6. **« Nos univers — Choisissez votre style »** : 7 tuiles de collection avec nombre de pièces et accroche : Daytona (13, « Chronographes sportifs »), Datejust (6, « Classiques du quotidien »), Day-Date (3, « Pièces d'exception »), Nautilus (4, « Silhouette sport-chic »), Santos (3, « Lignes carrées iconiques »), GMT Master (2, « Second fuseau horaire »), Royal Oak (2, « Lunette octogonale culte »).
7. **« Ils portent mosawatches — Votre satisfaction, notre exigence »**
   - « 4,9 / 5 — 14 500+ avis vérifiés »
   - 13 avis clients, chacun avec photo portée, citation courte, prénom + initiale, date et mention « Achat vérifié ». L'un d'eux (Foued A.) cite « le boîtier octogonal et le cadran bleu texturé ».
8. **« Nos boîtes — Les coffrets pour ranger vos montres »** : Boîte 3 Montres (29,99 € au lieu de 38,99 €), Boîte 4 Montres (49,99 € au lieu de 64,99 €), Boîte Verte 3 Montres (26,99 € au lieu de 35,09 €). Accroche commune : « Coffret multi-montres · Livraison offerte ».
9. **« Questions fréquentes — Tout savoir avant de commander »** : 5 questions en accordéon (délais, livraison offerte, authenticité, garantie, étanchéité) et un lien « Voir toutes les réponses ».
10. **Pied de page**
    - Texte de marque : « Des montres de caractère, pensées en France et assemblées avec des composants sélectionnés… »
    - Inscription à la newsletter (champ « Votre e-mail », bouton « -10% »)
    - Liens Collections et Aide, Instagram et e-mail
    - « Paiement sécurisé · Visa · Mastercard · PayPal · Apple Pay »
    - Crédit « Site imaginé & créé par Mzn Design »

## Les 3 modèles de référence

| Modèle | Prix | Prix barré | Remise affichée |
|---|---|---|---|
| Montre Nautilus Bleu Argent | 214,99 € | 279,49 € | -23% |
| Montre Nautilus Blanc Argent | 214,99 € | 279,49 € | -23% |
| Montre PTK Noir Argent | 244,99 € | 318,49 € | -23% |

Les trois produits n'ont qu'une seule variante (« Default Title ») et sont en stock (`availableForSale: true`).

**Caractéristiques affichées sur la carte produit** (identiques pour les 3) : « 41 mm · Automatique · Verre saphir · Étanche 10 ATM ».

**Fiche produit** (le texte est identique pour les 3, et le champ description Shopify est vide) :
- Fil d'Ariane, image unique, collection « nautilus », titre, prix et prix barré.
- Texte : « Boîtier en acier inoxydable 316L, verre traité anti-rayures, mouvement à quartz de précision et bracelet ajustable. Livrée dans son écrin cadeau. »
- Sélecteur de quantité et bouton « Ajouter au panier ».
- Réassurance : « Commande traitée en 24h, livraison en 7 à 10 jours » · « Garantie 2 ans mouvement et fabrication ».
- Mini-FAQ (les 5 mêmes questions), puis une section « Vous aimerez aussi » avec 4 produits.
- Aucune note ni aucun avis n'est affiché sur la fiche elle-même. La note 4.8 apparaît seulement sur les cartes.

**Incohérences relevées sur le site** :
- **Mouvement :** « Automatique » sur les cartes, mais « mouvement à quartz de précision » dans le texte de la fiche. La FAQ et la réassurance parlent de « mouvements Seiko originaux ».
- **Verre :** « Verre saphir » sur les cartes, « verre traité anti-rayures » sur la fiche, et « verre saphir minéral traité anti-rayures » dans la FAQ.

**Autres caractéristiques données par la FAQ complète** (/faq) :
- **Matériaux :** boîtier en acier 316L ; bracelet acier, cuir ou caoutchouc selon le modèle.
- **Étanchéité :** 10 ATM (100 m) ; douche et piscine OK, sauna déconseillé.
- **Bracelet :** outil d'ajustement fourni dans l'écrin pour les bracelets acier.

## Offres, livraison, garantie

- **Promotions :** -30 % annoncé dans le bandeau et le hero, alors que les cartes affichent un badge « -23% ». Code de -10 % contre une inscription à la newsletter (pied de page).
- **Aucune offre de type « 2 achetées »** ni lot ou bundle n'a été trouvée, ni dans le HTML ni dans le bundle JS.
- **Livraison :** offerte sans minimum. Commande traitée en 24h ouvrées. Livraison suivie en 7 à 10 jours en France métropolitaine et 10 à 15 jours en Europe. Lien de suivi envoyé dès l'expédition. La meta description de la FAQ mentionne pourtant une « livraison 48h ».
- **Garantie :** 2 ans sur le mouvement et les défauts de fabrication. La meta description de la FAQ mentionne des « retours sous 30 jours ».
- **Paiement :** CB, Apple Pay, PayPal, Klarna, paiement en 3x sans frais.
- **Écrin cadeau :** inclus.
- **Notes affichées :** 4.8 sur chaque carte produit, « 4.8 / 5 · +2 000 clients » dans la barre de réassurance, et « 4,9 / 5 — 14 500+ avis vérifiés » dans la section avis. Ces chiffres ne sont pas cohérents entre eux.
