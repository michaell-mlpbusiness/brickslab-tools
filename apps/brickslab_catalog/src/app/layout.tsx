import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CatalogShell } from "../catalog/CatalogShell";
import { FooterBar } from "../catalog/FooterBar";
import { GoogleAnalytics } from "../catalog/GoogleAnalytics";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

export const metadata: Metadata = {
  title: "Brickslab.Tools",
  description: "Visual showcase of @brickslab./ui-web components",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <Script
          type="module"
          src="https://unpkg.com/@google/model-viewer@4.2.0/dist/model-viewer.min.js"
          strategy="beforeInteractive"
        />
        {/* apply theme class before React hydrates to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (theme === 'light') {
                document.documentElement.classList.add('light');
              } else if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
              }
            } catch (e) {}
          })();
        ` }} />
      </head>
      <body style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {gaMeasurementId ? <GoogleAnalytics measurementId={gaMeasurementId} /> : null}
        <CatalogShell />
        <main className="catalog-main">
          {children}
        </main>
        <FooterBar />
      </body>
    </html>
  );
}
