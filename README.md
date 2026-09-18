# Explorateur de Pokémon

TP 01 — React, TypeScript et API. Socle initial uniquement ; aucun palier fonctionnel terminé.

## Démarrer

Node.js 22.12+ (Node 24 conseillé) et npm.

```sh
npm ci
npm run dev
```

Ouvrir ce dossier dans VS Code. Suivre l’adresse locale affichée par Vite.

## Vérifier avant chaque commit

```sh
npm run check
```

Cette commande exécute le lint, le typage de l’application et de Vite, puis le build.
`npx tsc --noEmit` vérifie également réellement les fichiers de `src/`.
`npm run preview` sert le dernier build pour une vérification locale.

## API

[PokéAPI v2](https://pokeapi.co/docs/v2/) : accès public sans clé.
Détail : `https://pokeapi.co/api/v2/pokemon/{id-or-name}/`.
Liste : `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`.
Respecter la politique de cache de l’API. Zod est installé pour valider les réponses au moment de leur intégration.
Aucun `.env` nécessaire ; `.env.example` documente cette absence de configuration.

## Organisation

- `src/app/` : application et layout.
- `src/components/` : composants React.
- `src/services/` : appels réseau et validation des données externes.
- `src/types/` : interfaces, schémas et types partagés.

Consignes de développement : `AGENTS.md`.

## Avancement

- Configuration initiale : React, Vite, TypeScript strict, Zod, Oxlint et Git local.
- Palier 1 à réaliser : recherche, fiche avec composant enfant, chargement et erreurs.
- Palier 2 à réaliser : liste paginée, sélection et détail.
- Bonus à réaliser : hook, cache du dernier résultat, annulation et relations imbriquées.

## Dépôt distant

Le dépôt local utilise `main`. Le dépôt GitHub/GitLab et son URL restent à configurer.
Après création du dépôt `tp01-api-explorer` sur le compte souhaité :

```sh
git remote add origin <URL_DU_DEPOT>
git push -u origin main
```

Rendu attendu : URL du dépôt avec ce README mis à jour. Commits réguliers, messages en anglais à l’impératif.
