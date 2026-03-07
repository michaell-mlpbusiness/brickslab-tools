"use client";

import { useState, useEffect } from "react";
import {
  AuroraText,
  WordRotate,
  NumberTicker,
  AnimatedGradientText,
  SparklesText,
  GlowPulseText,
  ProgressBar,
  Button,
  Badge,
  TagChip,
  Spinner,
  ToggleSwitch,
  Callout,
  BentoGrid,
  KpiCard,
  ComponentsCountCard,
  Marquee,
} from "@brickslab./ui-web";
import { componentsData, type ComponentData } from "../catalog/components.data";
import Link from "next/link";
import {
  FiZap,
  FiLayers,
  FiShield,
  FiPackage,
  FiCode,
  FiAward,
  FiMail,
  FiArrowRight,
} from "react-icons/fi";

// ── Overview Section ──────────────────────────────────────────────────────────
function OverviewSection({
  data,
  latestComponents,
}: {
  data: ComponentData[];
  latestComponents: ComponentData[];
}) {
  const [averageScore, setAverageScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const response = await fetch("/api/test-results", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          setAverageScore(data.average ?? 0);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Failed to load test results:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, []);

  const sectionCounts = data.reduce<Record<string, number>>((acc, c) => {
    acc[c.section] = (acc[c.section] || 0) + 1;
    return acc;
  }, {});
  const topSections = Object.entries(sectionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
  const maxCount = topSections[0]?.[1] ?? 1;

  return (
    <section
      style={{
        padding: "48px clamp(16px, 4vw, 56px)",
        borderTop: "1px solid var(--c-border)",
      }}
    >
      <BentoGrid columns={3} gap={16} className="overview-grid" style={{ alignItems: "stretch" }}>
        {/* ── Left: dark hero stat panel — col 1, rows 1-2 ── */}
        <Link href="/catalog" style={{ textDecoration: "none", gridColumn: "span 1", gridRow: "span 2" }}>
          <ComponentsCountCard
            count={data.length}
            variant="dark"
            animate
            sections={topSections.map(([label, count]) => ({ label, count }))}
            cta="Parcourir le catalogue"
          />
        </Link>

        {/* ── Score — col 2-3, row 1 ──────────────────────── */}
          <Link href="/tests" style={{ textDecoration: "none", gridColumn: "span 2" }}>
            <KpiCard
              eyebrow="Audit qualité · 8 axes"
              label="Score moyen"
              icon={<FiAward size={14} />}
              value={isLoading ? "—" : String(averageScore)}
              suffix="/100"
              progress={averageScore}
              loading={isLoading}
              helper={`47 tests × ${data.length} composants`}
              animate
              colorScheme="auto"
            />
          </Link>

        {/* ── Latest — col 2-3, row 2 ─────────────────────── */}
          <div
            style={{
              border: "1px solid var(--c-border)",
              borderRadius: "var(--radius-md)",
              background: "var(--c-surface)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gridColumn: "span 2",
            }}
          >
            <div
              style={{
                padding: "14px 20px",
                borderBottom: "1px solid var(--c-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.13em",
                    color: "var(--color-muted)",
                    display: "block",
                    marginBottom: 2,
                  }}
                >
                  Derniers ajouts
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-fg)" }}>Récemment publiés</span>
              </div>
              <Link
                href="/catalog"
                style={{
                  fontSize: 11,
                  color: "var(--color-brand)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  fontWeight: 600,
                }}
              >
                Tout voir <FiArrowRight size={10} />
              </Link>
            </div>

            <div style={{ flex: 1 }}>
              {latestComponents.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="overview-latest-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 20px",
                    textDecoration: "none",
                    borderBottom: i < latestComponents.length - 1 ? "1px solid var(--c-border)" : "none",
                    transition: "background 0.15s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--color-fg)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "var(--color-muted)",
                        background: "var(--c-surface-elevated)",
                        border: "1px solid var(--c-border)",
                        borderRadius: 10,
                        padding: "1px 7px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.section}
                    </span>
                  </div>
                  <FiArrowRight size={12} style={{ color: "var(--color-muted)", flexShrink: 0 }} />
                </a>
              ))}
            </div>
          </div>
      </BentoGrid>
    </section>
  );
}

// ── Features data ─────────────────────────────────────────────────────────────
const features = [
  {
    icon: <FiLayers size={20} />,
    title: "Design tokens CSS",
    description: "Variables cohérentes sur tout le projet. Personnalisables via le Theme Builder.",
  },
  {
    icon: <FiZap size={20} />,
    title: "Zero config",
    description: "Un import suffit. Aucune config webpack, aucun provider global requis.",
  },
  {
    icon: <FiShield size={20} />,
    title: "Audit qualité 8 axes",
    description: "Chaque composant est testé : API, rendu, a11y, tokens, responsive, sécurité, docs, performance FPS/CPU.",
  },
  {
    icon: <FiPackage size={20} />,
    title: "Tree-shakeable",
    description: "Importez seulement ce que vous utilisez. Bundle minimal en production.",
  },
  {
    icon: <FiCode size={20} />,
    title: "TypeScript natif",
    description: "Types stricts, autocomplétion complète, aucune déclaration manuelle.",
  },
  {
    icon: <FiAward size={20} />,
    title: "React 19 ready",
    description: "Compatible React 19, Server Components et Next.js App Router.",
  },
];

// ── Component Showcase ────────────────────────────────────────────────────────
function ShowcaseCell({
  label,
  href,
  children,
  span = 1,
}: {
  label: string;
  href?: string;
  children: React.ReactNode;
  span?: number;
}) {
  return (
    <div
      className={span === 2 ? "showcase-cell-span2" : ""}
      style={{
        padding: "20px 22px",
        border: "1px solid var(--c-border)",
        borderRadius: "var(--radius-md)",
        background: "var(--c-surface-elevated)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle corner glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 120,
          height: 120,
          background: "radial-gradient(circle at top right, rgba(204,74,72,0.05), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--color-muted)",
          }}
        >
          {label}
        </span>
        {href && (
          <Link
            href={href}
            style={{
              fontSize: 11,
              color: "var(--color-brand)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            Voir <FiArrowRight size={10} />
          </Link>
        )}
      </div>
      <div style={{ position: "relative", flex: 1 }}>{children}</div>
    </div>
  );
}

function ComponentShowcase() {
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(true);

  return (
    <section
      style={{
        padding: "64px clamp(16px, 4vw, 56px)",
        borderTop: "1px solid var(--c-border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 100%, rgba(204,74,72,0.04), transparent 55%)",
          pointerEvents: "none",
        }}
      />

      {/* Section header */}
      <div style={{ marginBottom: 40 }}>
        <div
          style={{
            display: "inline-flex",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-brand)",
            border: "1px solid var(--c-brand-border)",
            background: "var(--c-brand-subtle)",
            padding: "3px 12px",
            borderRadius: 20,
            marginBottom: 14,
          }}
        >
          Composants en action
        </div>
        <h2
          style={{
            fontSize: "clamp(22px, 4vw, 36px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: "0 0 10px 0",
            lineHeight: 1.1,
          }}
        >
          <AnimatedGradientText
            colorStops={["#CC4A48", "#F59E0B", "#CC4A48"]}
            speed={6}
            style={{ fontWeight: 800 }}
          >
            Vrais composants,
          </AnimatedGradientText>{" "}
          <span style={{ color: "var(--color-fg)" }}>prêts à intégrer.</span>
        </h2>
        <p style={{ fontSize: 15, color: "var(--color-muted)", margin: 0, maxWidth: 480, lineHeight: 1.6 }}>
          Chaque brique est testée, accessible et respecte les mêmes tokens CSS que votre projet.
        </p>
      </div>

      {/* Showcase grid */}
      <div
        className="showcase-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
        }}
      >
        {/* Boutons */}
        <ShowcaseCell label="Button" href="/components/button">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Button variant="primary" size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <Button variant="primary" size="sm">SM</Button>
              <Button variant="primary" size="md">MD</Button>
              <Button variant="primary" size="lg">LG</Button>
            </div>
          </div>
        </ShowcaseCell>

        {/* Badges */}
        <ShowcaseCell label="Badge · TagChip" href="/components/badge">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <Badge variant="success" size="sm">Stable</Badge>
              <Badge variant="warning" size="sm">Beta</Badge>
              <Badge variant="error" size="sm">Deprecated</Badge>
              <Badge variant="info" size="sm">New</Badge>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <TagChip label="React" variant="brand" />
              <TagChip label="TypeScript" variant="default" />
              <TagChip label="CSS" variant="muted" />
            </div>
          </div>
        </ShowcaseCell>

        {/* Spinners */}
        <ShowcaseCell label="Spinner" href="/components/spinner">
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <Spinner size="sm" variant="brand" />
              <span style={{ fontSize: 10, color: "var(--color-muted)" }}>sm</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <Spinner size="md" variant="brand" />
              <span style={{ fontSize: 10, color: "var(--color-muted)" }}>md</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <Spinner size="lg" variant="brand" />
              <span style={{ fontSize: 10, color: "var(--color-muted)" }}>lg</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <Spinner size="md" variant="success" speed="slow" />
              <span style={{ fontSize: 10, color: "var(--color-muted)" }}>slow</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <Spinner size="md" variant="warning" speed="fast" />
              <span style={{ fontSize: 10, color: "var(--color-muted)" }}>fast</span>
            </div>
          </div>
        </ShowcaseCell>

        {/* Toggles */}
        <ShowcaseCell label="ToggleSwitch — interactif" href="/components/toggle">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <ToggleSwitch
              checked={toggle1}
              onChange={setToggle1}
              label="Notifications activées"
            />
            <ToggleSwitch
              checked={toggle2}
              onChange={setToggle2}
              label="Mode compact"
            />
            <ToggleSwitch
              checked={toggle3}
              onChange={setToggle3}
              label="Animations"
            />
          </div>
        </ShowcaseCell>

        {/* Callout */}
        <ShowcaseCell label="Callout" href="/components/callout">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Callout variant="info" title="Info">
              Un composant prêt à l&apos;emploi.
            </Callout>
            <Callout variant="tip" title="Astuce">
              Utilisez les tokens CSS pour personnaliser.
            </Callout>
          </div>
        </ShowcaseCell>

        {/* Texte animé */}
        <ShowcaseCell label="Animated Text" href="/components/animatedgradienttext">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <AnimatedGradientText
              colorStops={["#CC4A48", "#F59E0B", "#4ADE80"]}
              speed={4}
              style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              Design system
            </AnimatedGradientText>
            <AnimatedGradientText
              colorStops={["#60A5FA", "#4ADE80", "#60A5FA"]}
              speed={5}
              style={{ fontSize: 18, fontWeight: 700 }}
            >
              Qualité & performance
            </AnimatedGradientText>
            <AnimatedGradientText
              colorStops={["#F59E0B", "#CC4A48", "#F59E0B"]}
              speed={3}
              style={{ fontSize: 15, fontWeight: 600 }}
            >
              Prêt pour la production
            </AnimatedGradientText>
          </div>
        </ShowcaseCell>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Brief",
    description: "Décrivez votre projet, vos objectifs et votre audience. On échange pour cerner l'ambition et établir un devis.",
    comment: "Réponse sous 48h",
  },
  {
    n: "02",
    title: "Design & intégration",
    description: "Nos composants sont assemblés, adaptés à votre identité visuelle et intégrés pour former votre interface sur mesure.",
    comment: "Basé sur notre catalogue de composants",
  },
  {
    n: "03",
    title: "Livraison",
    description: "Votre site, prêt à déployer. Code propre, performant, accessible et documenté.",
    comment: "Support inclus après livraison",
  },
];

function HowItWorks() {
  return (
    <section
      style={{
        padding: "64px clamp(16px, 4vw, 56px)",
        borderTop: "1px solid var(--c-border)",
        backgroundColor: "var(--c-surface-elevated)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, var(--c-border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 0% 50%, rgba(204,74,72,0.06), transparent 55%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-brand)",
            border: "1px solid var(--c-brand-border)",
            background: "var(--c-brand-subtle)",
            padding: "3px 12px",
            borderRadius: 20,
            marginBottom: 14,
          }}
        >
          Comment ça marche
        </div>

        <h2
          style={{
            fontSize: "clamp(22px, 4vw, 32px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            margin: "0 0 10px 0",
            color: "var(--color-fg)",
          }}
        >
          Votre site web en 3 étapes.
        </h2>
        <p style={{ fontSize: 15, color: "var(--color-muted)", margin: "0 0 40px 0", maxWidth: 480, lineHeight: 1.6 }}>
          On conçoit et intègre votre interface à partir de nos composants, adaptés à votre projet et votre identité.
        </p>

        <div
          className="quickstart-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {HOW_IT_WORKS.map(({ n, title, description, comment }) => (
            <div
              key={n}
              style={{
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--c-border)",
                overflow: "hidden",
                backgroundColor: "var(--c-surface)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "14px 16px",
                  borderBottom: "1px solid var(--c-border)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "-0.01em",
                    color: "var(--color-brand)",
                    background: "var(--c-brand-subtle)",
                    border: "1px solid var(--c-brand-border)",
                    padding: "1px 8px",
                    borderRadius: 12,
                  }}
                >
                  {n}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-fg)" }}>
                  {title}
                </span>
              </div>
              {/* Content */}
              <div
                style={{
                  padding: "16px",
                  background: "var(--c-surface-elevated)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: "var(--color-fg)",
                    lineHeight: 1.65,
                  }}
                >
                  {description}
                </p>
                <p style={{ margin: 0, fontSize: 11, color: "var(--color-muted)", fontStyle: "italic" }}>
                  {comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Bottom CTA ────────────────────────────────────────────────────────────────
function BottomCTA() {
  return (
    <section
      style={{
        padding: "80px clamp(16px, 4vw, 56px)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        borderTop: "1px solid var(--c-border)",
      }}
    >
      {/* Layered background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(204,74,72,0.09) 0%, transparent 60%), radial-gradient(ellipse at 20% 20%, rgba(245,158,11,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(74,222,128,0.03) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, var(--c-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
          pointerEvents: "none",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)",
        }}
      />

      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "inline-flex",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-brand)",
            border: "1px solid var(--c-brand-border)",
            background: "var(--c-brand-subtle)",
            padding: "3px 12px",
            borderRadius: 20,
            marginBottom: 20,
          }}
        >
          Sur mesure · Livraison rapide
        </div>

        <h2
          style={{
            fontSize: "clamp(28px, 6vw, 56px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            margin: "0 0 18px 0",
          }}
        >
          <AnimatedGradientText
            colorStops={["#CC4A48", "#F59E0B", "#4ADE80", "#60A5FA", "#CC4A48"]}
            speed={5}
            style={{ fontWeight: 900 }}
          >
            Votre prochain site web,
          </AnimatedGradientText>
          <br />
          <span style={{ color: "var(--color-fg)" }}>assemblé avec soin.</span>
        </h2>

        <p
          style={{
            fontSize: "clamp(14px, 2vw, 17px)",
            color: "var(--color-muted)",
            maxWidth: 480,
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          Nos {componentsData.filter((c) => c.type === "web").length} composants web et {componentsData.filter((c) => c.type === "mobile").length} composants mobile
          documentés sont la base de votre prochain projet produit. Contactez-nous pour en discuter.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
          <Link href="/catalog" className="home-cta-primary">
            Voir le catalogue
          </Link>
          <a
            href="mailto:contact@brickslab.io"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "11px 20px",
              background: "transparent",
              color: "var(--color-fg)",
              border: "1px solid var(--c-border)",
              borderRadius: "var(--radius-md)",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: 15,
              transition: "color 0.15s, border-color 0.15s, background 0.15s",
            }}
            className="home-cta-contact"
          >
            <FiMail size={16} />
            Nous contacter
          </a>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 32,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: componentsData.filter((c) => c.type === "web").length, label: "composants web" },
            { value: componentsData.filter((c) => c.type === "mobile").length, label: "composants mobile" },
            { value: "8", label: "axes d'audit" },
            { value: "Sur mesure", label: "chaque projet" },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "clamp(20px, 3vw, 28px)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--color-fg)",
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 3 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const latestComponents = [...componentsData]
    .filter((c) => c.addedAt)
    .sort((a, b) => (b.addedAt! > a.addedAt! ? 1 : -1))
    .slice(0, 5);
  const half = Math.ceil(componentsData.length / 2);
  const row1 = componentsData.slice(0, half).map((c) => c.label);
  const row2 = componentsData.slice(half).map((c) => c.label);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <style>{`
        .home-cta-primary {
          padding: 11px 28px;
          background: var(--color-brand);
          color: #FBFBFB;
          border-radius: var(--radius-md);
          font-weight: 600;
          text-decoration: none;
          font-size: 15px;
          border: 1px solid var(--color-brand);
          transition: box-shadow 0.2s, transform 0.2s;
          display: inline-block;
        }
        .home-cta-primary:hover {
          box-shadow: 0 0 0 3px rgba(204,74,72,0.25), 0 4px 12px rgba(204,74,72,0.3);
          transform: translateY(-1px);
        }
        .home-cta-secondary {
          padding: 11px 28px;
          background: transparent;
          color: var(--color-fg);
          border: 1px solid var(--c-border);
          border-radius: var(--radius-md);
          font-weight: 600;
          text-decoration: none;
          font-size: 15px;
          transition: border-color 0.2s, background 0.2s;
          display: inline-block;
        }
        .home-cta-secondary:hover {
          border-color: var(--color-brand);
          background: var(--c-brand-subtle);
        }
        .home-cta-contact:hover {
          color: var(--color-fg) !important;
          border-color: var(--c-brand-border) !important;
          background: var(--c-brand-subtle) !important;
        }
        .home-feature-card {
          padding: 24px;
          border: 1px solid var(--c-border);
          border-radius: var(--radius-md);
          background: var(--c-surface);
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .home-feature-card:hover {
          border-color: var(--c-brand-border);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .overview-latest-row:hover { background: var(--c-surface-elevated); }
        @media (max-width: 900px) {
          .home-grid { grid-template-columns: 1fr 1fr !important; }
          .overview-grid { grid-template-columns: 1fr !important; }
          .overview-grid > * { grid-column: span 1 !important; grid-row: span 1 !important; }
          .showcase-grid { grid-template-columns: 1fr 1fr !important; }
          .quickstart-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .home-grid { grid-template-columns: 1fr !important; }
          .home-features-grid { grid-template-columns: 1fr !important; }
          .showcase-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        style={{
          textAlign: "center",
          padding: "80px 24px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% -10%, rgba(204,74,72,0.12), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(204,74,72,0.04), transparent 45%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, var(--c-border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.6,
            pointerEvents: "none",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
          }}
        />

        <div style={{ position: "relative" }}>
          <AuroraText
            as="h1"
            colors={["#CC4A48", "#F59E0B", "#4ADE80", "#CC4A48"]}
            speed={5}
            style={{
              fontSize: "clamp(52px, 9vw, 96px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              margin: "0 0 20px 0",
              lineHeight: 1,
            }}
          >
            Brickslab.
          </AuroraText>

          <div
            style={{
              fontSize: "clamp(16px, 3vw, 22px)",
              color: "var(--color-muted)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              minHeight: 32,
            }}
          >
            <span>Build UIs with</span>
            <WordRotate
              words={["consistency.", "confidence.", "velocity.", "design tokens."]}
              style={{ color: "var(--color-brand)", fontWeight: 700, minWidth: 200, textAlign: "left" }}
              transition="slide"
              interval={2800}
            />
          </div>

          <p
            style={{
              color: "var(--color-muted)",
              fontSize: 15,
              maxWidth: 460,
              margin: "16px auto 0",
              lineHeight: 1.65,
            }}
          >
            <NumberTicker value={componentsData.length} suffix=" composants" duration={1.2} /> web + mobile documentés et testés, prêts à assembler.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            <Link href="/catalog" className="home-cta-primary">
              Parcourir le catalogue
            </Link>
            <Link href="/tests" className="home-cta-secondary">
              Voir les tests
            </Link>
          </div>

          {/* Tech tags */}
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              marginTop: 32,
              flexWrap: "wrap",
            }}
          >
            {["React 19", "TypeScript", "CSS Tokens", "Next.js 16", "Tree-shakeable", "a11y tested"].map(
              (tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 20,
                    border: "1px solid var(--c-border)",
                    color: "var(--color-muted)",
                    backgroundColor: "var(--c-surface)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid var(--c-border)",
          borderBottom: "1px solid var(--c-border)",
          padding: "12px 0",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          backgroundColor: "var(--c-surface-elevated)",
        }}
      >
        <Marquee speed={50} repeat={1}>
          {row1.map((item) => (
            <span
              key={item}
              style={{
                fontSize: 12,
                fontWeight: 500,
                padding: "4px 14px",
                borderRadius: 20,
                border: "1px solid var(--c-border)",
                color: "var(--color-muted)",
                backgroundColor: "var(--c-surface)",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
                marginRight: 8,
              }}
            >
              {item}
            </span>
          ))}
        </Marquee>
        <Marquee speed={50} reverse repeat={1}>
          {row2.map((item) => (
            <span
              key={item}
              style={{
                fontSize: 12,
                fontWeight: 500,
                padding: "4px 14px",
                borderRadius: 20,
                border: "1px solid var(--c-border)",
                color: "var(--color-muted)",
                backgroundColor: "var(--c-surface)",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
                marginRight: 8,
              }}
            >
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── Overview ──────────────────────────────────────────────────── */}
      <OverviewSection data={componentsData} latestComponents={latestComponents} />

      {/* ── Features ──────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "48px clamp(16px, 4vw, 56px) 64px",
          borderTop: "1px solid var(--c-border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 100% 50%, rgba(204,74,72,0.03), transparent 50%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ marginBottom: 36 }}>
          <div
            style={{
              display: "inline-flex",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-brand)",
              border: "1px solid var(--c-brand-border)",
              background: "var(--c-brand-subtle)",
              padding: "3px 12px",
              borderRadius: 20,
              marginBottom: 14,
            }}
          >
            Pourquoi Brickslab
          </div>
          <h2
            style={{
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: "0 0 8px 0",
              color: "var(--color-fg)",
            }}
          >
            Un design system pensé pour la production
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--color-muted)",
              margin: 0,
              maxWidth: 480,
              lineHeight: 1.6,
            }}
          >
            Chaque composant respecte les mêmes conventions, tokens et standards de qualité.
          </p>
        </div>
        <div
          className="home-features-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
        >
          {features.map(({ icon, title, description }) => (
            <div key={title} className="home-feature-card">
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "var(--c-brand-subtle)",
                  border: "1px solid var(--c-brand-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-brand)",
                  marginBottom: 14,
                }}
              >
                {icon}
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 6px 0", color: "var(--color-fg)" }}>
                {title}
              </h3>
              <p style={{ fontSize: 13, color: "var(--color-muted)", margin: 0, lineHeight: 1.6 }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Component Showcase ────────────────────────────────────────── */}
      <ComponentShowcase />

      {/* ── How It Works ──────────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      <BottomCTA />
    </div>
  );
}
