# Deployment Vercel (brickslab-tools)

## Réglages projet

Dans Vercel, configure le projet avec:

- **Root Directory**: `apps/brickslab_catalog`
- **Framework Preset**: `Next.js` (détection auto)

Le fichier `apps/brickslab_catalog/vercel.json` force les commandes monorepo correctes:

- install: `pnpm -C ../.. install --frozen-lockfile`
- build: `pnpm -C ../.. run build`
- dev: `pnpm -C ../.. run dev`

## Détails importants

- Le build racine compile les packages workspace nécessaires (`@brickslab./token-contract`, `@brickslab./theme-default`, `@brickslab./ui-web`) avant `next build`.
- `outputFileTracingRoot` est configuré pour un contexte monorepo afin d'éviter les problèmes de tracing côté Vercel.
