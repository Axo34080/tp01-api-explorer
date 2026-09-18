# Consignes du projet

## Objectif et références

Réaliser le TP 01 : explorateur PokéAPI en React, TypeScript et Zod.
Les trois PDF du cours sont dans le dossier parent :

- `TP_01_-_React_&_API.pdf` : exigences et paliers du rendu.
- `01_-_React_et_TypeScript___Architecture,_composants_et_gestion_d'état.pdf` : architecture, composants, état, KISS.
- `00_-_Fondations_avancées___JS_runtime_&_TypeScript.pdf` : runtime, strict, unknown, modélisation.

Respecter la demande courante de l’utilisateur, puis les exigences du TP. Le cours est la référence technique principale ; les principes Ponytail et Karpathy ci-dessous complètent ces exigences. Un exemple pédagogique n’est pas une obligation d’implémenter une fonctionnalité. Signaler les contradictions avant de choisir une solution qui affecte le rendu.

État initial : configuration uniquement. Ne développer les paliers que sur demande. Ne pas migrer vers Next.js : il concerne un TP ultérieur.

## TypeScript et Zod

- Conserver `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` et les contrôles de code inutilisé.
- Aucun `any`, explicite ou implicite. Les données externes entrent en `unknown` et sont validées avant utilisation.
- Inspecter une vraie réponse JSON avant de définir le modèle ; ne représenter que les champs utilisés, y compris leurs valeurs nulles réelles.
- Valider les réponses avec Zod dans les services ; ne jamais remplacer cette validation par `as Pokemon` ou un générique de fetch.
- Le TP exige une interface de ressource dans `src/types/` : la conserver et vérifier la compatibilité du schéma avec `z.ZodType<Pokemon>` (par exemple via `satisfies`). Ne pas ajouter un troisième modèle dupliqué. Les autres types peuvent être dérivés avec `z.infer`, `Pick` ou `Omit`.
- Réserver les assertions aux informations réellement indisponibles au compilateur ; pas de `!` pour masquer une absence possible.
- Employer les unions discriminées si elles évitent des états incohérents ; pas de génériques, brands ou mapped types sans besoin concret.

## Architecture et React

- Respecter `src/app/`, `src/components/`, `src/services/`, `src/types/`.
- Un composant par fichier ; props déclarées avec une interface nommée sur le paramètre. `children` explicite si nécessaire. Ne pas utiliser `React.FC`.
- Composer des composants imbriqués ; chaque enfant reçoit seulement ses données utiles.
- Aucun `fetch` dans un composant : réseau dans `services/`, contrôle de `response.ok`, erreur compréhensible et données validées en sortie.
- Prévoir chargement, erreur, résultat et état initial sans recherche. Clés de liste stables, jamais l’index.
- État local d’abord, remontée au parent commun quand nécessaire. Aucun store global sans besoin démontré.
- Nettoyer les effets ; empêcher toute réponse obsolète de modifier l’état, y compris dans `catch` et `finally`. Annuler avec `AbortController` au palier concerné.
- Formulaires accessibles : labels, boutons natifs et messages compréhensibles. Une présentation lisible suffit.

## PokéAPI

Documentation : <https://pokeapi.co/docs/v2/> . Pas d’authentification ni de backend requis.
Utiliser les endpoints de détail et de liste ; ne pas télécharger tout le Pokédex au démarrage. Respecter la politique de cache des ressources lors de l’implémentation des appels.
Ne pas présumer que les noms français sont acceptés par l’endpoint de détail. Définir explicitement le comportement de recherche lors du palier 1.
Ne jamais committer `.env` ou un secret. Les variables `VITE_*` sont publiques dans le bundle.

## Ponytail : simplicité sans sacrifier la correction

Avant d’ajouter du code : vérifier le besoin, chercher l’existant, préférer les API natives puis les dépendances installées.
Aucune abstraction pour un cas unique, factory, couche générique, dépendance ou fichier spéculatif. Généraliser seulement après deux cas concrets différents.
Préférer du code direct et lisible à du code astucieux ou excessivement condensé. Conserver la validation, les erreurs utiles, l’accessibilité et les exigences du TP.
Corriger les causes, pas seulement les symptômes. Tester la logique non triviale avec le plus petit contrôle pertinent ; pas de tests qui recopient simplement l’implémentation.

## Principes inspirés des observations d’Andrej Karpathy

1. Réfléchir avant de coder : expliciter les hypothèses importantes ; demander une précision si une ambiguïté bloque la bonne solution.
2. Privilégier la simplicité : réaliser seulement le comportement demandé, sans fonctionnalités anticipées.
3. Modifier précisément : chaque changement sert la demande ; respecter les modifications de l’utilisateur et éviter les refactorings annexes.
4. Travailler avec un résultat vérifiable : définir les critères de réussite, effectuer les contrôles, corriger les échecs et rapporter honnêtement les limites.

## Vérification et Git

Avant chaque commit, exécuter `npm run check` (lint sans avertissement, typage application et configuration, build).
`npx tsc --noEmit` est aussi opérationnel grâce au tsconfig racine qui inclut `src/`.
Lorsqu’une fonctionnalité est ajoutée, vérifier ses parcours pertinents : succès, absence de résultat, erreur réseau, données invalides et recherches rapides si applicable.
Commits à chaque palier, messages en anglais à l’impératif sur une ligne. Ne jamais déclarer un test réussi sans l’avoir exécuté.
Ne pas pousser, publier ou modifier un dépôt distant sans demande correspondante. Maintenir le README avec les paliers réellement terminés.
