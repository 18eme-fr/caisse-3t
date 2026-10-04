# Caisse du 3T

Caisse tactile pour prendre les commandes au café-théâtre des 3T (Toulouse) : ardoises, vins, bières, softs.
Un toucher ajoute un produit, l'addition calcule le total et la monnaie à rendre, et l'écran « Soirée » donne le total encaissé.

**Ouvrir l'appli :** https://18eme-fr.github.io/caisse-3t/

## Installer sur le téléphone

- **iPhone :** ouvrir le lien dans Safari → bouton Partager → « Sur l'écran d'accueil ».
- **Android :** ouvrir le lien dans Chrome → menu ⋮ → « Ajouter à l'écran d'accueil » (ou « Installer l'application »).

L'appli s'ouvre alors en plein écran et fonctionne sans réseau.

## À savoir

- La carte et les ventes sont enregistrées sur chaque téléphone. Elles ne sont pas partagées entre plusieurs téléphones.
- La carte se modifie directement dans l'appli (« Modifier la carte »). La carte de base se trouve dans `index.html` (`DEFAULT_MENU`).

## Fichiers

- `index.html` : l'appli complète
- `manifest.webmanifest`, `icon-*.png` : nom et icône pour l'écran d'accueil
- `sw.js` : fonctionnement hors connexion. Changer `CACHE` à chaque mise à jour de l'appli.
