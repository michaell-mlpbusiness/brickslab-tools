import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Désactivation du React Compiler pour forcer le build Webpack (évite Turbopack et son lock)
  reactCompiler: false,
  // Optimisation Phase 1: activer compression Gzip
  compress: true,
  // Optimiser la taille des chunks en mémoire
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;
