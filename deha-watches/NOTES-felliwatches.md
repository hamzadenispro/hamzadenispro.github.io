# Références felliwatches.com — Nautilus noir / bleu / blanc

Collecte du 2026-11-10 via l'API publique Shopify (`/products/<handle>.js`, `/products.json?limit=250`)
et le HTML des pages. Boutique « Felli Watches » (vendor Shopify : « Felli Mods », marque affichée « Fellimods »).
Catalogue : 193 produits sur une seule page de `products.json` (pages 2 et 3 vides), dont 16 contenant « nautilus ».

**Chaque produit retenu n'a qu'une seule image** dans Shopify, donc un seul fichier par modèle.
Les images ont été demandées avec `&width=1200` ; quand l'original est moins large, Shopify renvoie l'original
(d'où 1101–1138 px de large pour certaines). Format réel : PNG (vérifié avec `file`), fond blanc, photo détourée
de face, bracelet acier entier visible.

## Images

| Fichier | Taille | Produit (titre / handle) | URL source |
|---|---|---|---|
| `nautilus-noir-1.png` | 1200×1200 | Nautilus Black & Silver / `nautilus-black-silver-1` | https://cdn.shopify.com/s/files/1/1031/3138/2137/files/IMG-4663.png?v=1787343231&width=1200 |
| `nautilus-bleu-1.png` | 1101×1429 | Nautilus Midnight Blue / `nautilus-midnight-blue` | https://cdn.shopify.com/s/files/1/1031/3138/2137/files/C70DF845-98FD-4A78-92DC-40A7D6AE1E33.png?v=1787343277&width=1200 |
| `nautilus-blanc-1.png` | 1138×1382 | Nautilus White / `nautilus-white` | https://cdn.shopify.com/s/files/1/1031/3138/2137/files/8ACA1640-7601-4ACD-8319-87675949E207.png?v=1787343298&width=1200 |
| `nautilus-bleu-royal-1.png` (alternative) | 1122×1402 | Nautilus Royal Blue / `nautilus-royal-blue` | https://cdn.shopify.com/s/files/1/1031/3138/2137/files/D37860A2-B504-4487-B7D1-A68F7BDE8CE6.png?v=1787343314&width=1200 |
| `nautilus-bleu-ciel-1.png` (alternative) | 1200×1200 | Nautilus Baby Blue / `nautilus-baby-blue` | https://cdn.shopify.com/s/files/1/1031/3138/2137/files/A972762E-C388-419D-ADEA-039F18E0A7F4.png?v=1787343278&width=1200 |

Choix du bleu : trois Nautilus bleus acier/acier existent. « Midnight Blue » (cadran bleu dégradé vers le noir,
guilloché horizontal, date à 3h « 22 ») est retenu comme bleu principal ; « Royal Blue » est quasi identique
visuellement ; « Baby Blue » est un bleu ciel/turquoise clair (style « Tiffany »). Les deux derniers sont gardés
en alternatives. Écartés : versions or rose, « Open Heart », bracelet cuir, Skeleton, Chocolate Brown, Silver,
et `nautilus-black-silver` (titré « Aquanaut Black & Silver », donc pas un Nautilus).

Description visuelle commune : boîtier coussin acier brossé/poli à « oreilles » latérales, lunette octogonale
arrondie, bracelet intégré acier à maillons brossés + maillons centraux polis, index bâtons et aiguilles bâton
luminescents, guichet date à 3h, mention « AUTOMATIC » à 6h, cadran à stries horizontales.

## Modèles — prix et caractéristiques

Les trois fiches ont exactement la même description technique :

- Matière : acier inoxydable (la FAQ précise acier 316L)
- Taille : 41 mm
- Mouvement : « mouvement automatique officiel » (FAQ : mouvements Seiko NH34 automatiques ou hybrides VK63)
- Verre : saphir traité anti-rayures et antireflet
- Étanchéité : 10 bar / 100 m
- Bracelet : acier intégré (d'après les photos ; non précisé dans le texte)
- Garantie : 2 ans (défauts de fabrication et problèmes de fonctionnement en usage normal)
- Une seule variante (« Default Title »), pas de choix de taille/bracelet ; type produit vide, aucun tag.

| Modèle | Prix | Prix barré | Remise affichée |
|---|---|---|---|
| Nautilus Black & Silver (noir) | 229,99 € | 274,99 € | « Économisez 16 % » |
| Nautilus Midnight Blue (bleu) | 214,99 € | 274,99 € | ~ -22 % |
| Nautilus White (blanc) | 214,99 € | 274,99 € | ~ -22 % |
| Nautilus Royal Blue / Baby Blue (alt.) | 214,99 € | 274,99 € | ~ -22 % |

Pour comparaison : les Nautilus or rose / « Open Heart » sont à 249,99 € (barré 289,99 €), la version or rose
bracelet cuir à 329,99 € (barré 419,99 €).

## Page produit (ex. `/products/nautilus-black-silver-1`), sections dans l'ordre

1. **Bandeau défilant** (haut de page, commun au site) : « 30 jours satisfait ou remboursé » ✦ « Livraison gratuite
   dans le monde entier » ✦ « +2 000 personnes ultra-satisfaites » ✦ « Garantie produit 2 ans incluse ».
2. **Header** : menu Home / Felli Watches / Configurateur / Contact / Suivez votre commande ; recherche, connexion, panier
   (tiroir panier avec emplacement d'upsell et minuterie « Cart reserved for »).
3. **Bloc principal** : galerie (une image, ouvrable en modale) ; étoile + « +2000 avis vérifiés » ; titre ;
   prix 229,99 € + prix barré 274,99 € + pastille « Économisez 16 % » ; bouton « Ajouter au panier »
   (un libellé « Épuisé » est présent dans le HTML mais l'API indique le produit disponible) ;
   frise d'étapes de livraison « Commandé → Commande prête → Livré » ; barre d'achat collante qui répète titre/prix ;
   liste des caractéristiques (voir ci-dessus) ; encart « 4.8/5 — basé sur +2 000 avis · Trustpilot » avec phrase
   sur la qualité des finitions et la commande « intégralement assurée » ; lien « Afficher tous les détails ».
4. **Produits associés** (section vide dans le HTML statique, chargée en JS).
5. **Avis Trustpilot** : titre « +2 000 hommes ont déjà switché. », note 4.8/5, carrousel de 8 avis 5★ marqués
   « Vérifié » (prénom + initiale, ville française/belge, ancienneté de 3 jours à 6 semaines), chacun avec un
   intitulé emoji : finitions premium, agréable au poignet, qualité bluffante, client fidèle, cadeau parfait,
   détails soignés, style validé.
6. **Bloc urgence / offre** : « Offre limitée — stock critique », « -20 % OFF », « Il reste peu de pièces » ;
   deux paliers de prix (la majorité 274,99 → 214,99 € ; bestsellers GMT & Nautilus 289,99 → 249,99 €) ;
   jauge « 78 % du stock écoulé » ; compte à rebours (« 23 h 47 min 12 s » en dur dans le HTML) ;
   CTA « Profiter de l'offre » ; 4 pictos de réassurance (remboursé 30 j, garantie 2 ans, livraison gratuite,
   paiement sécurisé).
7. **FAQ** « Tes questions. Nos réponses honnêtes. » (accordéon, ton tutoiement) : qu'est-ce qu'une « Mod »
   (montre réelle à mouvement Seiko habillée de composants premium) ; retour 30 jours sans condition ;
   garantie 2 ans sans frais ; délai ~12 jours ouvrés (FR/BE/CH/LU), suivi par email, livraison offerte sans minimum ;
   qualité (saphir, acier 316L, NH34/VK63) ; paiement (CB, PayPal, Apple Pay, Google Pay, Klarna 3x, Shop Pay, SSL).
8. Popup promo, bouton retour en haut, lecteur de musique global (sections sans contenu statique).
9. **Footer** : inscription newsletter ; liens légaux (mentions, confidentialité, remboursement, expédition, CGV, CGU,
   suivi de commande) ; moyens de paiement ; © 2026 Felli Watches.

## Page d'accueil (`/`), sections dans l'ordre

1. Bandeau défilant de réassurance + header (identiques à la page produit).
2. **Hero** : badge « ★★★★★ Excellent · Trustpilot » ; accroche provocatrice en très gros titre sur 4 lignes
   (« La montre que [grande marque] ne veut pas que tu découvres. ») ; sous-titre « finitions premium — portées comme
   des montres à 3 000 € » ; « +2 000 hommes ont déjà switché » ; CTA « Découvrir toutes nos montres » ;
   micro-réassurance « Paiement sécurisé · Satisfait ou remboursé 30 jours ».
3. **Barre de preuves** (4 colonnes) : Trustpilot Excellent ; +2 000 clients satisfaits ; « Vu dans la presse :
   GQ · FHH · Hodinkee » ; garantie 2 ans ; remboursé 30 jours.
4. **Best-sellers** « Les montres dont tout le monde parle. » : 6 cartes (5★, nom, ligne spec « 40mm · mouvement ·
   Saphir · 10 ATM », prix + barré + % de remise, « Voir la pièce → ») ; prix de 214,99 à 289,99 € (remises -20 à -25 %) ;
   CTA « Voir toute la collection ».
5. **Collections** « Explore nos collections — 15 univers » : carrousel horizontal de cartes (emoji + nombre de
   pièces + nom + sous-titre d'une ligne, ex. Nautilus « Le sport chic par excellence », 13 pièces ; 82 pièces au total),
   « Glisser pour explorer ».
6. **Avis Trustpilot** : même carrousel de 8 avis que sur la page produit.
7. **Offre limitée / urgence** et **FAQ** : mêmes blocs que sur la page produit.
8. Footer (newsletter, liens légaux, paiement).

## Synthèse des promesses commerciales

- Livraison : gratuite, sans minimum, « dans le monde entier » ; ~12 jours ouvrés (FR, BE, CH, LU), numéro de suivi.
- Garantie : 2 ans défauts de fabrication, prise en charge sans frais.
- Retours : satisfait ou remboursé 30 jours après réception, sans condition.
- Avis : 4.8/5, « +2 000 avis vérifiés » Trustpilot (les avis affichés sont codés en dur dans le thème, 8 avis 5★).
- Offres : prix barrés permanents (-16 à -25 %), bandeau « -20 % », jauge de stock et compte à rebours statiques.
- Paiement : CB, PayPal, Apple Pay, Google Pay, Klarna 3x sans frais, Shop Pay.
- Ton : tutoiement, cible masculine, langage « switch », emojis dans tous les titres de blocs.
