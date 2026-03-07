# brickslab-tools

Plateforme outils en ligne Brickslab.

## Périmètre

- Theme Builder
- Mockup Builder
- Catalogue composants (web + mobile)
- Templates et pages de présentation pour implémentation rapide

## Stack

- `apps/brickslab_catalog`
- `packages/ui-web`
- `packages/ui-mobile`
- `packages/token-contract`
- `packages/theme-default`

## Commandes

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm sync:components
```

## Notes

- Ce repo est orienté produit/outils.
- Les pages tools doivent rester actives dans le catalogue:
  - `/components/themebuilder`
  - `/components/mockupbuilder`
