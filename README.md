Brickslab - Platform

```
Voici les commandes à utiliser depuis la racine du monorepo :
                                                                                   
  Développement
                                                                                   
  pnpm dev              # sync composants + lance le catalog en watch

  Audit qualité (notre runner custom)

  pnpm run audit        # audit silencieux → génère logs/audit-results.json + .csv
  pnpm audit:verbose    # idem + affiche les tests échoués par composant
  Ne pas utiliser pnpm audit seul — c'est la commande pnpm native de sécurité npm.

  Build

  pnpm build            # audit → sync → build tous les packages (+ postbuild:
  test:components)
  pnpm build:catalog    # audit → sync → build uniquement le catalog Next.js

  Tests unitaires

  pnpm test:lint        # tests de linting
  pnpm test:components  # tests de composants (aussi lancé automatiquement en postbuild)
  pnpm test:audit       # suite node:test des seuils qualité (vérifie les scores)

  Résumé du flux build complet

  pnpm build
    ↓ pnpm run audit        → logs/audit-results.json (reset) + audit-results.csv
  (append)
    ↓ pnpm sync:components  → sync les fichiers
    ↓ pnpm -r build         → build ui-web + catalog
    ↓ postbuild             → pnpm test:components


```
