const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const LOGS_DIR = path.join(ROOT, 'logs');
const OUT_DIR = path.join(ROOT, 'apps', 'brickslab_catalog', 'public', 'data');
const FILES = ['audit-results.json', 'audit-results.csv', 'components-test-log.csv'];

function main() {
  if (!fs.existsSync(LOGS_DIR)) {
    console.error(`[audit:export] Missing logs directory: ${LOGS_DIR}`);
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  let copied = 0;
  for (const file of FILES) {
    const src = path.join(LOGS_DIR, file);
    if (!fs.existsSync(src)) {
      continue;
    }
    const dest = path.join(OUT_DIR, file);
    fs.copyFileSync(src, dest);
    copied += 1;
    console.log(`[audit:export] Copied ${file} -> ${dest}`);
  }

  if (copied === 0) {
    console.error('[audit:export] No audit files were copied.');
    process.exit(1);
  }

  console.log(`[audit:export] Done (${copied} file(s)).`);
}

main();
