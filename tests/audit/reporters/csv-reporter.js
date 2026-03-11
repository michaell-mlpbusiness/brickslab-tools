/**
 * csv-reporter.js
 * Génère le CSV synthétique pour vue dashboard globale
 * Format : component_name, timestamp, global_score, status, total_tests, passed_tests, failed_tests, skipped_tests
 */

const fs = require("fs");
const path = require("path");

const LOGS_DIR = path.join(process.cwd(), "logs");
const CSV_PATH = path.join(LOGS_DIR, "audit-results.csv");

const CSV_HEADER = "component_name,timestamp,global_score,status,total_tests,passed_tests,failed_tests,skipped_tests\n";

function ensureLogsDir() {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
}

function initCsv() {
  ensureLogsDir();
  fs.writeFileSync(CSV_PATH, CSV_HEADER);
}

function appendComponentResult(result) {
  ensureLogsDir();
  const { component, timestamp, globalScore, status, summary } = result;
  const row = [
    component,
    timestamp,
    globalScore,
    status,
    summary.total,
    summary.passed,
    summary.failed,
    summary.skipped,
  ].join(",");
  fs.appendFileSync(CSV_PATH, row + "\n");
}

/**
 * Append-only : le CSV conserve l'historique de tous les runs.
 * Le header n'est écrit qu'à la création du fichier.
 */
function writeCsvReport(results) {
  ensureLogsDir();

  // Créer le fichier avec le header si inexistant
  if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(CSV_PATH, CSV_HEADER);
  }

  // Toujours APPEND — ne jamais écraser l'historique
  let rows = "";
  for (const result of results) {
    const { component, timestamp, globalScore, status, summary } = result;
    rows +=
      [
        component,
        timestamp,
        globalScore,
        status,
        summary.total,
        summary.passed,
        summary.failed,
        summary.skipped,
      ].join(",") + "\n";
  }
  fs.appendFileSync(CSV_PATH, rows);
  return CSV_PATH;
}

module.exports = { initCsv, appendComponentResult, writeCsvReport, CSV_PATH };
