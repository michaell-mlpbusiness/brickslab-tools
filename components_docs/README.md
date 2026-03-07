# Components Documentation & Metadata

This directory contains documentation and metadata for all Brickslab UI components.

## CSV Format

The `components.csv` file stores metadata for all components used by the search and navigation system.

### CSV Columns

| Column | Description | Example |
|--------|-------------|---------|
| `label` | Component display name | `AppShell` |
| `section` | Category/section | `Layout & Shell` |
| `type` | Component type | `web` or `mobile` |
| `description` | Short description | `Container component for page layout...` |
| `href` | Documentation URL | `/components/appshell` |

### CSV Structure

```csv
label,section,type,description,href
AppShell,Layout & Shell,web,Container component for page layout with header sidebar and footer,/components/appshell
HeaderBar,Layout & Shell,web,Top navigation and branding header component,/components/headerbar
```

## How It Works

1. **Search Integration**: The `components.csv` is imported as TypeScript data in `components.data.ts`
2. **Search Function**: `searchComponents(query, filterType?)` filters components by:
   - Label (component name)
   - Section (category)
   - Description (feature-rich text search)
   - Type (web/mobile)

3. **UI Display**: SearchResults dropdown shows all matching components with their descriptions

## Maintaining the CSV

When adding a new component:

1. Add a row to `components.csv` with all required fields
2. Update `apps/brickslab_catalog/src/catalog/components.data.ts` with the new entry
3. Run `pnpm build` to verify the search index
4. The search will automatically pick up the new component

### Best Practices

- **Descriptions**: Keep them concise (50-100 characters)
- **Labels**: Use component names without special characters
- **Sections**: Use consistent groupings (Layout & Shell, Navigation, etc.)
- **href**: Must match the actual component page route

