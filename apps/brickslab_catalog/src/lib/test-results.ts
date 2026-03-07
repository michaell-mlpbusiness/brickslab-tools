import fs from "fs";
import path from "path";

/**
 * Server function to read test results from the log CSV
 * Returns the latest test results for up to `limit` components
 */
export async function getTestResults(limit = 5) {
  const logPath = path.join(process.cwd(), "logs", "components-test-log.csv");

  if (!fs.existsSync(logPath)) {
    return [];
  }

  try {
    const content = fs.readFileSync(logPath, "utf8");
    const lines = content
      .split("\n")
      .filter((l) => l.trim())
      .slice(1); // Skip header

    if (lines.length === 0) {
      return [];
    }

    // Parse CSV (format: component,date_iso,percentage)
    const entries = lines.map((line) => {
      const [component, dateIso, percentage] = line.split(",");
      return {
        label: component?.trim() ?? "",
        percent: parseInt(percentage?.trim() ?? "0", 10),
        dateIso: dateIso?.trim() ?? "",
      };
    });

    // Group by component and get the latest entry for each
    const latestByComponent: Record<string, (typeof entries)[0]> = {};
    entries.forEach((entry) => {
      if (
        !latestByComponent[entry.label] ||
        new Date(entry.dateIso) > new Date(latestByComponent[entry.label].dateIso)
      ) {
        latestByComponent[entry.label] = entry;
      }
    });

    // Return sorted by date (newest first) and limit
    return Object.values(latestByComponent)
      .sort((a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime())
      .slice(0, limit)
      .map(({ label, percent }) => ({ label, percent }));
  } catch (error) {
    console.error("Error reading test results:", error);
    return [];
  }
}

/**
 * Get average test score across all latest tests
 */
export async function getAverageTestScore() {
  const logPath = path.join(process.cwd(), "logs", "components-test-log.csv");

  if (!fs.existsSync(logPath)) {
    return 0;
  }

  try {
    const content = fs.readFileSync(logPath, "utf8");
    const lines = content
      .split("\n")
      .filter((l) => l.trim())
      .slice(1);

    if (lines.length === 0) {
      return 0;
    }

    const percentages = lines.map((line) => {
      const [, , percent] = line.split(",");
      return parseInt(percent?.trim() ?? "0", 10);
    });

    const sum = percentages.reduce((a, b) => a + b, 0);
    return Math.round(sum / percentages.length);
  } catch (error) {
    console.error("Error calculating average test score:", error);
    return 0;
  }
}
