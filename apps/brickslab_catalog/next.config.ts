import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // Désactivation du React Compiler pour forcer le build Webpack (évite Turbopack et son lock)
  reactCompiler: false,
  // Monorepo: forcer la racine de tracing pour inclure correctement les fichiers workspace.
  outputFileTracingRoot: path.join(__dirname, "../.."),
  // Optimisation Phase 1: activer compression Gzip
  compress: true,
  // Optimiser la taille des chunks en mémoire
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;
