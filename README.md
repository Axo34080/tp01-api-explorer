# Guide d’évolution Pokémon

TP 01 — React, TypeScript et Zod avec PokéAPI. La recherche et la fiche Pokémon sont implémentées jusqu’à l’étape G du guide. L’affichage des familles d’évolution reste à développer.

## Utilisation actuelle

Saisir un nom anglais (par exemple `pikachu`) ou un numéro (`25`), puis soumettre le formulaire. La fiche affiche le numéro, le nom, l’image disponible et les types. Les espaces autour et la casse sont normalisés. Une recherche introuvable ou échouée affiche une erreur.

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
Les réponses de détail sont validées avec Zod avant affichage et mises en cache en mémoire par nom et numéro. Ce cache dure jusqu’au rechargement de la page. La liste paginée n’est pas encore intégrée.
Aucun `.env` nécessaire ; `.env.example` documente cette absence de configuration.

## Organisation

- `src/app/` : application et layout.
- `src/components/` : composants React.
- `src/hooks/` : logique React de recherche et état associé.
- `src/services/` : appels réseau et validation des données externes.
- `src/types/` : interfaces, schémas et types partagés.

Consignes de développement : `AGENTS.md`.
Guide de réalisation manuelle et exemples expliqués : `PLAN.md`.
L’alias `@/` pointe vers `src/` dans TypeScript et Vite.

Composants actuels : `PokemonSearch`, `PokemonCard` et son enfant `PokemonType`. La logique de recherche est dans `src/hooks/usePokemon.ts` ; `App` compose les composants et affiche l’état retourné.

## Avancement

- Configuration initiale : React, Vite, TypeScript strict, Zod, Oxlint et Git local.
- Palier 1 implémenté (étape F) : recherche, fiche avec composant enfant, chargement et erreurs, validation Zod.
- Déjà présents : cache des réponses en mémoire, annulation avec `AbortController` et protection contre les réponses obsolètes.
- Étape G réalisée : logique de recherche extraite dans `src/hooks/usePokemon.ts`, sans changement de comportement.
- Palier 2 à réaliser : liste paginée, sélection et détail.
- Guide d’évolution à réaliser : chargement de l’espèce et de sa chaîne, affichage des branches et sélection d’une évolution.

## Vérifications

- `npm run check` exécuté avec succès après l’étape G : lint, typage de l’application et de Vite, build. Les parcours navigateur n’ont pas été rejoués après cette extraction.
- Test navigateur confirmé par l’utilisateur : recherche par nom et numéro, affichage du Pokémon et de ses types.
- Parcours restant à confirmer dans le navigateur : nom inexistant, saisie vide, panne réseau, image absente et recherches rapides successives.

## Dépôt distant

Le remote `origin` est configuré vers [Axo34080/tp01-api-explorer](https://github.com/Axo34080/tp01-api-explorer).
Le travail en cours est sur la branche `Dev`. Le TP demande que le rendu final soit disponible sur `main` ; la présence des derniers changements sur le dépôt distant n’a pas été vérifiée ici.

Rendu attendu : URL du dépôt avec ce README mis à jour. Commits réguliers, messages en anglais à l’impératif. Aucun push ou merge automatique.
