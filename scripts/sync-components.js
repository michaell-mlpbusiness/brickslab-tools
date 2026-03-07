#!/usr/bin/env node

/**
 * Sync script: components.csv → components.data.ts
 * 
 * This script reads the components.csv file and generates the TypeScript
 * data file to keep all component metadata in sync.
 * 
 * Usage: node scripts/sync-components.js
 */

const fs = require("fs");
const path = require("path");

// Parse CSV
function parseCSV(csvPath) {
  const content = fs.readFileSync(csvPath, "utf-8");
  const lines = content.trim().split("\n");
  const headers = lines[0].split(",");
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header.trim()] = values[idx].trim();
    });
    data.push(obj);
  }
  
  return data;
}

// Generate TypeScript file
function generateTypeScriptFile(components) {
  const tsContent = `// Données des composants pour la recherche et la navigation avec descriptions
// [AUTO-GENERATED] Synchronized from components.csv
export interface ComponentData {
  label: string;
  href: string;
  section: string;
  type: "web" | "mobile";
  description: string;
  addedAt?: string;
}

export const componentsData: ComponentData[] = [
${components
  .map(
    (comp) => `  {
    label: "${comp.label}",
    href: "${comp.href}",
    section: "${comp.section}",
    type: "${comp.type}" as const,
    description: "${comp.description.replace(/"/g, '\\"')}",${comp.addedAt ? `\n    addedAt: "${comp.addedAt}",` : ""}
  }`
  )
  .join(",\n")}
];

export function isNewComponent(comp: ComponentData, windowDays = 30): boolean {
  if (!comp.addedAt) return false;
  const diff = Date.now() - new Date(comp.addedAt).getTime();
  return diff >= 0 && diff <= windowDays * 86_400_000;
}

export function searchComponents(
  query: string,
  filterType?: "web" | "mobile"
): ComponentData[] {
  const q = query.toLowerCase().trim();

  if (!q) return [];

  return componentsData.filter((comp) => {
    const matchesQuery =
      comp.label.toLowerCase().includes(q) ||
      comp.section.toLowerCase().includes(q) ||
      comp.description.toLowerCase().includes(q);

    const matchesType = !filterType || comp.type === filterType;

    return matchesQuery && matchesType;
  });
}
`;

  return tsContent;
}

// Main
function main() {
  const projectRoot = path.join(__dirname, "..");
  const csvPath = path.join(projectRoot, "components_docs", "components.csv");
  const tsPath = path.join(
    projectRoot,
    "apps/brickslab_catalog/src/catalog/components.data.ts"
  );

  try {
    const components = parseCSV(csvPath);
    const tsContent = generateTypeScriptFile(components);
    
    fs.writeFileSync(tsPath, tsContent);
    console.log(`✓ Synchronized ${components.length} components`);
    console.log(`  CSV:  ${csvPath}`);
    console.log(`  TS:   ${tsPath}`);
  } catch (error) {
    console.error("✗ Sync failed:", error.message);
    process.exit(1);
  }
}

main();
