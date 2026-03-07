"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  Heading,
  TextBlock,
  SectionHeader,
  Badge,
  Alert,
  Callout,
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
  ToggleSwitch,
  Spinner,
  TagChip,
  StatusLabel,
  ProgressBar,
  MediaImage,
  LocationMap,
  TextCard,
  BentoCard,
  KpiCard,
  Breadcrumb,
  Marquee,
  PageHero,
  CodeBlock,
} from "@brickslab./ui-web";
import * as BrickslabUI from "@brickslab./ui-web";
import { componentsData, type ComponentData } from "../../../catalog/components.data";

// ── Constants ──────────────────────────────────────────────────────────────────

const GRID = 8;
const GUIDE = 40;
const DEFAULT_W = 320;

const VIEWPORTS = {
  desktop: { w: 1440, h: 900, label: "1440 × 900" },
  tablet:  { w: 768,  h: 1024, label: "768 × 1024" },
  mobile:  { w: 390,  h: 844,  label: "390 × 844"  },
} as const;
type ViewportKey = keyof typeof VIEWPORTS;

const HEIGHT_PRESETS = [900, 1440, 2160, 3000, 4320] as const;
type HeightPreset = typeof HEIGHT_PRESETS[number];

const ZOOM_LEVELS = [0.33, 0.5, 0.75, 1] as const;
type ZoomLevel = typeof ZOOM_LEVELS[number];
const ZOOM_LABELS: Record<ZoomLevel, string> = { 0.33: "33%", 0.5: "50%", 0.75: "75%", 1: "100%" };
const HEADER_COMPACT_BREAKPOINT = 1440;
const HISTORY_LIMIT = 100;
const AUTOSAVE_STORAGE_KEY = "brickslab:mockupbuilder:v1";
const ALIGN_SNAP_THRESHOLD = 6;
const COLOR_SWATCHES = [
  "#CC4A48",
  "#4ADE80",
  "#F59E0B",
  "#60A5FA",
  "#0F172A",
  "#1F2937",
  "#64748B",
  "#CBD5E1",
  "#FBFBFB",
] as const;

// ── Types ──────────────────────────────────────────────────────────────────────

type PropType = "string" | "number" | "boolean" | "enum";

interface PropDef {
  key: string;
  label: string;
  type: PropType;
  options?: string[];
  defaultValue: unknown;
}

interface RegistryEntry {
  name: string;
  category: string;
  description: string;
  defaultProps: Record<string, unknown>;
  propDefs: PropDef[];
  defaultW?: number;
  defaultH?: number;
  codegenMode?: "component" | "placeholder";
  previewHref?: string;
  render: (props: Record<string, unknown>) => React.ReactNode;
}

interface BlockInstance {
  id: string;
  componentName: string;
  props: Record<string, unknown>;
  x: number;
  y: number;
  w: number;
  h: number;     // 0 = auto height
  zIndex: number;
}

interface AutosaveDraft {
  version: 1;
  savedAt: string;
  viewport: ViewportKey;
  canvasH: HeightPreset;
  canvasBgColor: string | null;
  zoom: ZoomLevel;
  showGrid: boolean;
  blocks: BlockInstance[];
}

type DragState = {
  type: "move";
  blockId: string;
  startMouseX: number;
  startMouseY: number;
  startBlockX: number;
  startBlockY: number;
} | {
  type: "resize";
  blockId: string;
  startMouseX: number;
  startMouseY: number;
  startW: number;
  startH: number;
} | null;

interface AlignmentGuides {
  vertical: number[];
  horizontal: number[];
}

const COMPONENT_LABEL_ALIASES: Record<string, string> = {
  HeroCTASection: "HeroCtaSection",
};

const SECTION_CATEGORY_MAP: Record<string, string> = {
  "Typography": "Typographie",
  "Layout & Shell": "Layout",
  "Cards": "Cartes",
  "Carousel": "Médias",
  "Animated Text": "Texte animé",
  "Catalog/Docs": "Documentation",
  "Catalog/App": "Application",
  "Backgrounds": "Backgrounds",
  "UI Controls": "UI Controls",
  "Navigation": "Navigation",
  "Sections": "Sections",
  "Branding": "Branding",
  "Footer": "Footer",
  "Dashboard": "Dashboard",
  "Quiz": "Quiz",
  "Analytics": "Analytics",
  "Animation": "Animation",
};

function resolveComponentName(label: string): string {
  return COMPONENT_LABEL_ALIASES[label] ?? label;
}

function mapSectionToCategory(section: string): string {
  return SECTION_CATEGORY_MAP[section] ?? section;
}

function inferAutoEntrySize(section: string): Pick<RegistryEntry, "defaultW" | "defaultH"> {
  switch (section) {
    case "Backgrounds":
      return { defaultW: 760, defaultH: 320 };
    case "Layout & Shell":
    case "Sections":
    case "Catalog/Docs":
    case "Catalog/App":
    case "Dashboard":
    case "Analytics":
    case "Quiz":
      return { defaultW: 760, defaultH: 260 };
    case "Cards":
      return { defaultW: 420, defaultH: 220 };
    case "Animated Text":
    case "Typography":
      return { defaultW: 520, defaultH: 120 };
    default:
      return { defaultW: DEFAULT_W, defaultH: 110 };
  }
}

const NOOP = () => {};
const NOOP_ASYNC = async () => {};

const SAMPLE_NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "Composants", href: "/components" },
  { label: "Docs", href: "/docs" },
];

const SAMPLE_NAV_SECTIONS = [
  { title: "Navigation", items: SAMPLE_NAV_ITEMS },
  { title: "Ressources", items: [{ label: "Templates", href: "/templates" }] },
];

const SAMPLE_MENU_TREE = [
  { label: "Guide", children: [{ label: "Installation", href: "/getting-started" }, { label: "Usage", href: "/docs" }] },
  { label: "Composants", children: [{ label: "Button", href: "/components/button" }, { label: "Input", href: "/components/input" }] },
];

const SAMPLE_SEARCH_RESULTS = [
  { label: "Button", href: "/components/button", description: "Bouton d'action", section: "UI Controls", type: "web" as const },
  { label: "HeroCtaSection", href: "/components/heroctasection", description: "Section hero avec CTA", section: "Sections", type: "web" as const },
];

const SAMPLE_QUIZ_OPTIONS = [
  { id: "a", label: "Option A" },
  { id: "b", label: "Option B" },
  { id: "c", label: "Option C" },
];

const SAMPLE_QUIZ_QUESTION = {
  id: "q1",
  type: "single",
  label: "Quel composant utilisez-vous le plus ?",
  options: SAMPLE_QUIZ_OPTIONS,
};

const SAMPLE_QUIZ_SCHEMA = {
  id: "quiz-demo",
  title: "Quiz de demonstration",
  sections: [
    {
      id: "s1",
      title: "Section 1",
      questions: [
        SAMPLE_QUIZ_QUESTION,
      ],
    },
  ],
};

const SAMPLE_ANALYTICS_DISTRIBUTION = [
  { label: "Très satisfait", value: 42 },
  { label: "Satisfait", value: 35 },
  { label: "Neutre", value: 15 },
  { label: "Insatisfait", value: 8 },
];

const SAMPLE_FILTER_FIELDS = [
  { id: "country", label: "Pays", type: "select", options: [{ id: "fr", label: "France" }, { id: "ca", label: "Canada" }] },
  { id: "segment", label: "Segment", type: "tag" },
] as const;

class AutoPreviewErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  render(): React.ReactNode {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function getAutoPreviewCustomNode(name: string): React.ReactNode | null {
  if (name === "AppShell") {
    return (
      <div style={{ display: "grid", gridTemplateRows: "32px 1fr 26px", height: "100%", minHeight: 120, border: "1px solid var(--c-border)", borderRadius: 8, overflow: "hidden", background: "var(--c-surface)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", borderBottom: "1px solid var(--c-border)", fontSize: 11 }}>
          <strong>Header</strong>
          <span style={{ color: "var(--color-muted)" }}>Actions</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", minHeight: 0 }}>
          <div style={{ borderRight: "1px solid var(--c-border)", padding: 8, fontSize: 10, color: "var(--color-muted)" }}>Sidebar</div>
          <div style={{ padding: 10, fontSize: 11 }}>Contenu principal</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: "0 10px", borderTop: "1px solid var(--c-border)", fontSize: 10, color: "var(--color-muted)" }}>Footer</div>
      </div>
    );
  }

  if (name === "HeaderBar" || name === "Topbar") {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, height: "100%", minHeight: 68, border: "1px solid var(--c-border)", borderRadius: 8, background: "var(--c-surface)", padding: "0 12px" }}>
        <strong style={{ fontSize: 12 }}>Brickslab</strong>
        <div style={{ display: "flex", gap: 8, fontSize: 11, color: "var(--color-muted)" }}>
          <span>Accueil</span>
          <span>Docs</span>
          <span>Composants</span>
        </div>
        <Button size="sm">CTA</Button>
      </div>
    );
  }

  if (name === "Sidebar" || name === "BurgerMenu") {
    return (
      <div style={{ height: "100%", minHeight: 140, border: "1px solid var(--c-border)", borderRadius: 8, background: "var(--c-surface)", padding: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 8 }}>Navigation</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {["Accueil", "Composants", "Docs", "Templates"].map((item) => (
            <span key={item} style={{ fontSize: 11, color: "var(--color-fg)" }}>{item}</span>
          ))}
        </div>
      </div>
    );
  }

  if (name === "DrilldownPanel") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr minmax(150px, 42%)", height: "100%", minHeight: 120, border: "1px solid var(--c-border)", borderRadius: 8, overflow: "hidden", background: "var(--c-surface)" }}>
        <div style={{ background: "rgba(0,0,0,0.08)" }} />
        <div style={{ borderLeft: "1px solid var(--c-border)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "8px 10px", fontSize: 11, fontWeight: 700, borderBottom: "1px solid var(--c-border)" }}>Drilldown</div>
          <div style={{ padding: 10, fontSize: 11, color: "var(--color-muted)" }}>Détails de métrique</div>
        </div>
      </div>
    );
  }

  if (name === "SearchResults") {
    return (
      <div style={{ border: "1px solid var(--c-border)", borderRadius: 8, overflow: "hidden", backgroundColor: "var(--c-surface)" }}>
        {SAMPLE_SEARCH_RESULTS.map((result) => (
          <div key={result.href} style={{ padding: "8px 10px", borderBottom: "1px solid var(--c-border)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-fg)" }}>{result.label}</div>
            <div style={{ fontSize: 11, color: "var(--color-muted)" }}>{result.description}</div>
          </div>
        ))}
      </div>
    );
  }

  if (name === "Confetti") {
    return (
      <div style={{ position: "relative", height: "100%", minHeight: 100, border: "1px solid var(--c-border)", borderRadius: 8, background: "var(--c-surface)" }}>
        {["#CC4A48", "#4ADE80", "#F59E0B", "#60A5FA", "#FBFBFB"].map((color, idx) => (
          <span
            key={`${color}-${idx}`}
            style={{
              position: "absolute",
              width: 8,
              height: 12,
              borderRadius: 2,
              background: color,
              top: `${20 + (idx % 3) * 22}%`,
              left: `${12 + idx * 16}%`,
              transform: `rotate(${(idx - 2) * 17}deg)`,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}

function getAutoPreviewProps(name: string): Record<string, unknown> {
  switch (name) {
    case "Text":
      return { texte: "Texte de demonstration du composant Text.", variant: "body-md", align: "left" };
    case "IntroCard":
      return { title: "Bienvenue sur Brickslab", description: "Composants prets a l'emploi.", highlight: "Nouveau", cta: { label: "Voir", href: "#" } };
    case "SocialPostCard":
      return {
        platform: "x",
        author: { name: "Brickslab", handle: "@brickslab" },
        content: "Nouveaux composants disponibles dans la librairie UI.",
        metrics: { likes: 126, replies: 24, reposts: 18 },
      };
    case "AppShell":
      return {
        header: <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--c-border)", fontWeight: 600 }}>Header</div>,
        sidebar: <div style={{ height: "100%", borderRight: "1px solid var(--c-border)", padding: 12 }}>Sidebar</div>,
        footer: <div style={{ padding: "8px 12px", borderTop: "1px solid var(--c-border)", background: "var(--c-surface-elevated)" }}>Footer</div>,
        children: <div style={{ padding: 12 }}>Contenu principal</div>,
      };
    case "HeaderBar":
      return {
        logo: <strong>Brickslab</strong>,
        nav: <div style={{ display: "flex", gap: 10 }}><span>Accueil</span><span>Docs</span></div>,
        actions: <Button size="sm">Action</Button>,
      };
    case "SidebarNav":
    case "Sidebar":
      return { sections: SAMPLE_NAV_SECTIONS, activePath: "/components", width: 240 };
    case "Topbar":
      return { title: "Catalog", logo: <strong>BS</strong>, actions: <Button size="sm">CTA</Button> };
    case "BurgerMenu":
      return { isOpen: true, onClose: NOOP, sections: SAMPLE_NAV_SECTIONS, activePath: "/components" };
    case "TopNav":
      return { items: SAMPLE_NAV_ITEMS, activePath: "/components" };
    case "FooterBar":
      return { left: "© 2026", center: "Brickslab", right: "v1.0.0" };
    case "BentoGrid":
      return {
        columns: 2,
        children: (
          <>
            <TextCard cardtitle="Bloc 1" texte="Contenu" variant="default" />
            <TextCard cardtitle="Bloc 2" texte="Contenu" variant="opaque" />
          </>
        ),
      };
    case "SearchBar":
      return { value: "button", onChange: NOOP, placeholder: "Rechercher..." };
    case "MenuTree":
      return { items: SAMPLE_MENU_TREE, activePath: "/components/button" };
    case "PropsTable":
      return { componentName: "Button", props: [{ name: "variant", type: "\"primary\" | \"secondary\"", description: "Style visuel du bouton" }] };
    case "CopyButton":
      return { onCopy: NOOP, label: "Copier" };
    case "LinkList":
      return { title: "Raccourcis", links: [{ label: "Installation", href: "/getting-started" }, { label: "Catalogue", href: "/catalog" }] };
    case "SectionGallery":
      return { title: "Galerie", columns: 2, items: [<Badge key="1">Badge</Badge>, <Button key="2">Button</Button>, <TagChip key="3" label="Tag" />, <Spinner key="4" />] };
    case "SectionExampleCard":
      return { title: "Button", description: "Exemple de composant", preview: <Button size="sm">Preview</Button>, href: "#" };
    case "ComponentDetailPanel":
      return { name: "Button", description: "Composant action principal", code: "<Button>Action</Button>", badge: "UI" };
    case "ProjectDescriptionPanel":
      return { title: "Projet Atlas", description: "Dashboard analytics et quiz builder", tags: ["React", "TypeScript"], links: [{ label: "GitHub", href: "#" }] };
    case "ComponentCard":
      return { label: "Button", section: "UI Controls", description: "Bouton principal", href: "#", type: "web" };
    case "DocPageHeader":
      return { name: "Button", description: "Documentation du composant Button", packageName: "@brickslab./ui-web" };
    case "MediaCarousel":
      return {
        items: [
          { src: "https://picsum.photos/600/320?1", alt: "Slide 1", caption: "Slide 1" },
          { src: "https://picsum.photos/600/320?2", alt: "Slide 2", caption: "Slide 2" },
        ],
        currentIndex: 0,
        onNext: NOOP,
        onPrev: NOOP,
      };
    case "AnimatedList":
      return { items: ["Etape 1", "Etape 2", "Etape 3"].map((label) => <div key={label}>{label}</div>), loop: false };
    case "AnimatedStack":
      return { items: ["Alerte 1", "Alerte 2", "Alerte 3"].map((label) => <div key={label}>{label}</div>) };
    case "AvatarCircles":
      return {
        avatarUrls: [
          { imageUrl: "https://i.pravatar.cc/80?img=1" },
          { imageUrl: "https://i.pravatar.cc/80?img=2" },
          { imageUrl: "https://i.pravatar.cc/80?img=3" },
        ],
      };
    case "ConfettiButton":
      return { children: "Celebrer", onClick: NOOP };
    case "FooterLinks":
      return { title: "Produit", links: [{ label: "Composants", href: "#" }, { label: "Templates", href: "#" }] };
    case "SocialLinks":
      return { links: [{ platform: "github", href: "#" }, { platform: "linkedin", href: "#" }] };
    case "FooterContact":
      return { title: "Contact", email: "hello@brickslab.dev", phone: "+1 555 0101" };
    case "FooterLegal":
      return { copyright: "Brickslab", year: 2026, links: [{ label: "Privacy", href: "#" }] };
    case "BrandSlogan":
      return { company: "Brickslab", slogan: "Build fast. Stay consistent." };
    case "HeroCtaSection":
      return { title: "Construisez votre interface", subtitle: "Composants prets a l'emploi", ctaLabel: "Demarrer", secondaryLabel: "Voir la doc", hoverEffect: true };
    case "FeatureListSection":
      return { title: "Fonctionnalites", features: [{ title: "Rapide", description: "Composants performants" }, { title: "Accessible", description: "Conforme WCAG" }] };
    case "CarouselWithTextSection":
      return { title: "Showcase", description: "Composant combine", carousel: <MediaImage src="https://picsum.photos/500/280" alt="Demo" width="100%" height={220} /> };
    case "ComponentPresentationSection":
      return { name: "Button", description: "Presentation d'un composant", preview: <Button>Action</Button> };
    case "ComponentsCountCard":
      return { count: 137, subtitle: "Composants disponibles", animate: false };
    case "LatestComponentsList":
      return { title: "Derniers composants", items: [{ label: "LocationMap", section: "UI Controls" }, { label: "AnimatedStack", section: "Animation" }] };
    case "TestResultsCard":
      return { title: "Tests", results: [{ label: "Button", percent: 98 }, { label: "Input", percent: 96 }] };
    case "DashboardHero":
      return { totalComponents: 137, subtitle: "Etat du design system" };
    case "QuizBuilder":
      return { value: SAMPLE_QUIZ_SCHEMA, onChange: NOOP, mode: "preview", readOnly: true };
    case "QuizSection":
      return { id: "s1", title: "Section", description: "Questions", children: <div style={{ padding: 6 }}>Question 1</div> };
    case "QuestionCard":
      return {
        id: "q1",
        label: "Question",
        required: true,
        children: React.createElement(
          (BrickslabUI as Record<string, unknown>).SingleChoice as React.ComponentType<Record<string, unknown>>,
          { value: "a", onChange: NOOP, options: SAMPLE_QUIZ_OPTIONS },
        ),
      };
    case "QuestionRenderer":
      return { question: SAMPLE_QUIZ_QUESTION, value: "a", onChange: NOOP };
    case "ConditionalLogic":
      return {
        rules: [{ id: "r1", action: "show", targetId: "q2", conditions: [{ questionId: "q1", operator: "eq", value: "a" }] }],
        questionsIndex: [{ id: "q1", label: "Question 1", type: "single" }, { id: "q2", label: "Question 2", type: "text" }],
        onChange: NOOP,
      };
    case "SingleChoice":
      return { value: "a", onChange: NOOP, options: SAMPLE_QUIZ_OPTIONS };
    case "MultiChoice":
      return { value: ["a"], onChange: NOOP, options: SAMPLE_QUIZ_OPTIONS };
    case "ScaleLikert":
      return { value: 4, onChange: NOOP, min: 1, max: 5 };
    case "RatingStars":
      return { value: 3.5, onChange: NOOP, allowHalf: true };
    case "NPSQuestion":
      return { value: 8, onChange: NOOP, showBuckets: true };
    case "RangeSliderQuestion":
      return { value: [20, 70], onChange: NOOP, range: true, min: 0, max: 100 };
    case "FreeTextQuestion":
      return { value: "Très bonne experience", onChange: NOOP, multiline: true, showCount: true };
    case "MatrixQuestion":
      return {
        value: { design: "4", docs: "5" },
        onChange: NOOP,
        rows: [{ id: "design", label: "Design" }, { id: "docs", label: "Documentation" }],
        cols: [{ id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }, { id: "4", label: "4" }, { id: "5", label: "5" }],
      };
    case "RankOrderQuestion":
      return { value: ["a", "b", "c"], onChange: NOOP, options: SAMPLE_QUIZ_OPTIONS };
    case "QuizProgress":
      return { current: 2, total: 5, mode: "bar" };
    case "QuizTimer":
      return { durationSec: 180, onExpire: "warn", onExpireAction: NOOP };
    case "QuizNavigation":
      return { canPrev: true, canNext: true, onPrev: NOOP, onNext: NOOP, showSummary: true, summaryItems: [{ id: "s1", label: "Intro", completed: true }, { id: "s2", label: "Questions" }] };
    case "QuizSubmitBar":
      return { onSubmit: NOOP_ASYNC, onSaveDraft: NOOP_ASYNC };
    case "QuizResultSummary":
      return { result: { score: 84, maxScore: 100, badges: [{ id: "b1", label: "Expert" }] }, variant: "detailed" };
    case "AnswerReview":
      return { questions: [SAMPLE_QUIZ_QUESTION], answers: { q1: "a" }, corrections: { q1: { correct: true, feedback: "Bonne reponse" } } };
    case "ResponseTable":
      return {
        rows: [{ id: "r1", name: "Alice", score: 82 }, { id: "r2", name: "Bob", score: 76 }],
        columns: [{ id: "name", label: "Nom", type: "text" }, { id: "score", label: "Score", type: "number" }],
      };
    case "InsightCards":
      return { items: [{ label: "Completion", value: 82, delta: 5, trend: "up" }, { label: "Drop-off", value: 12, delta: -2, trend: "down" }] };
    case "SurveyFunnel":
      return { steps: [{ id: "start", label: "Start", started: 1000, completed: 1000 }, { id: "finish", label: "Finish", started: 1000, completed: 760 }], showRates: true };
    case "DistributionChart":
      return { data: SAMPLE_ANALYTICS_DISTRIBUTION, type: "bar" };
    case "HeatmapMatrix":
      return { rows: ["UX", "Doc", "Perf"], cols: ["Poor", "OK", "Good"], values: [[1, 2, 6], [0, 3, 7], [1, 4, 5]], showScale: true };
    case "CohortTrends":
      return {
        metric: "Retention",
        series: [
          { name: "Cohorte A", points: [{ x: "S1", y: 80 }, { x: "S2", y: 68 }, { x: "S3", y: 61 }] },
          { name: "Cohorte B", points: [{ x: "S1", y: 74 }, { x: "S2", y: 66 }, { x: "S3", y: 59 }] },
        ],
      };
    case "SegmentFilterBar":
      return { value: { country: "fr", segment: ["enterprise"] }, onChange: NOOP, fields: SAMPLE_FILTER_FIELDS };
    case "DashboardGrid":
      return {
        items: [
          { id: "w1", colSpan: 1, component: <KpiCard label="MRR" value="42k€" helper="+8%" /> },
          { id: "w2", colSpan: 1, component: <ProgressBar label="Objectif" value={72} max={100} /> },
        ],
        cols: 2,
      };
    case "KPITrendWidget":
      return { title: "Conversion", value: 3.6, delta: 0.5, target: 4, sparkline: [2.6, 2.9, 3.1, 3.3, 3.6] };
    case "AnomalyBadge":
      return { level: "warn", message: "Anomalie detectee", confidence: 0.86 };
    case "DrilldownPanel":
      return { open: true, onOpenChange: NOOP, title: "Drilldown", children: <div>Detail de metrique</div> };
    case "Radio":
      return { value: "option-a", checked: true, label: "Option A", onChange: NOOP, name: "radio-demo" };
    case "Tabs":
      return { tabs: [{ value: "overview", label: "Overview" }, { value: "details", label: "Details" }], value: "overview", onChange: NOOP };
    case "Accordion": {
      const AccordionItem = (BrickslabUI as Record<string, unknown>).AccordionItem as React.ComponentType<Record<string, unknown>> | undefined;
      return {
        children: AccordionItem ? (
          <>
            <AccordionItem title="Section 1" open>
              Contenu 1
            </AccordionItem>
            <AccordionItem title="Section 2">
              Contenu 2
            </AccordionItem>
          </>
        ) : <div>Contenu accordéon</div>,
      };
    }
    case "TextAnimate":
      return { children: "Texte anime", by: "word", preset: "rise" };
    case "TypingAnimation":
      return { text: "Brickslab UI Components", loop: true };
    case "AuroraText":
      return { children: "Aurora Text Demo" };
    case "NumberTicker":
      return { value: 137, suffix: "+" };
    case "AnimatedGradientText":
      return { children: "Gradient motion" };
    case "TextReveal":
      return { children: "Revelation progressive du texte." };
    case "WordRotate":
      return { words: ["rapide", "stable", "modulaire"], interval: 1600 };
    case "HyperText":
      return { children: "HyperText Demo", trigger: "auto" };
    case "SparklesText":
      return { children: "Sparkles" };
    case "TextHighlighter":
      return { children: "Texte mis en surbrillance", action: "underline" };
    case "NoiseRevealText":
      return { children: "Noise Reveal" };
    case "VariableFontWarpText":
      return { children: "Warp Text" };
    case "MagneticText":
      return { children: "Magnetic" };
    case "KineticUnderlineText":
      return { children: "Underline motion" };
    case "ShimmerBorderText":
      return { children: "Shimmer Border" };
    case "GlowPulseText":
      return { children: "Glow Pulse" };
    case "SegmentEmphasisText":
      return { children: "Mettez en avant les points importants", highlights: [{ match: "avant", effect: "underline" }, { match: "importants", effect: "glow" }] };
    case "ProgressiveBlurText":
      return { children: "Transition floue progressive sur chaque mot." };
    default:
      return {};
  }
}

function resolveRuntimeComponent(name: string): React.ComponentType<Record<string, unknown>> | null {
  const entry = (BrickslabUI as Record<string, unknown>)[name];
  if (typeof entry !== "function") return null;
  return entry as React.ComponentType<Record<string, unknown>>;
}

function AutoComponentPlaceholder({
  name,
  description,
  previewHref,
}: {
  name: string;
  description: string;
  previewHref?: string;
}) {
  const runtimeComponent = useMemo(() => resolveRuntimeComponent(name), [name]);
  const runtimeProps = useMemo(() => getAutoPreviewProps(name), [name]);
  const customPreview = useMemo(() => getAutoPreviewCustomNode(name), [name]);

  const fallback = (
    <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 11, color: "var(--color-muted)", lineHeight: 1.4 }}>{description}</span>
      {previewHref && (
        <a
          href={previewHref}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 11, color: "#CC4A48", textDecoration: "none", fontWeight: 600 }}
        >
          Ouvrir la page composant →
        </a>
      )}
    </div>
  );

  if (customPreview) return <>{customPreview}</>;

  if (runtimeComponent) {
    return (
      <AutoPreviewErrorBoundary key={name} fallback={fallback}>
        {React.createElement(runtimeComponent, runtimeProps)}
      </AutoPreviewErrorBoundary>
    );
  }

  return fallback;
}

// ── Registry ──────────────────────────────────────────────────────────────────

const REGISTRY: RegistryEntry[] = [
  // Typographie
  {
    name: "Heading",
    category: "Typographie",
    description: "Titre h1–h6",
    defaultProps: { level: 2, title: "Mon titre" },
    propDefs: [
      { key: "level", label: "Niveau", type: "enum", options: ["1","2","3","4","5","6"], defaultValue: 2 },
      { key: "title", label: "Texte", type: "string", defaultValue: "Mon titre" },
      { key: "align", label: "Alignement", type: "enum", options: ["left","center","right"], defaultValue: "left" },
    ],
    render: (p) => <Heading level={Number(p.level) as 1|2|3|4|5|6} title={p.title as string} align={p.align as "left"|"center"|"right"} />,
  },
  {
    name: "TextBlock",
    category: "Typographie",
    description: "Paragraphe de texte",
    defaultProps: { content: "Voici un paragraphe de texte.", align: "left" },
    propDefs: [
      { key: "content", label: "Texte", type: "string", defaultValue: "Voici un paragraphe de texte." },
      { key: "align", label: "Alignement", type: "enum", options: ["left","center","right"], defaultValue: "left" },
    ],
    render: (p) => <TextBlock content={p.content as string} align={p.align as "left"|"center"|"right"} />,
  },
  {
    name: "SectionHeader",
    category: "Typographie",
    description: "Titre de section avec sous-titre",
    defaultProps: {
      title: "Titre de section",
      subtitle: "Sous-titre explicatif",
      eyebrow: "Catégorie",
      align: "left",
      variant: "default",
    },
    propDefs: [
      { key: "title", label: "Titre", type: "string", defaultValue: "Titre de section" },
      { key: "subtitle", label: "Sous-titre", type: "string", defaultValue: "Sous-titre explicatif" },
      { key: "eyebrow", label: "Eyebrow", type: "string", defaultValue: "Catégorie" },
      { key: "align", label: "Alignement", type: "enum", options: ["left","center","right"], defaultValue: "left" },
      { key: "variant", label: "Variante", type: "enum", options: ["default","compact"], defaultValue: "default" },
      { key: "count", label: "Compteur", type: "number", defaultValue: 3 },
    ],
    defaultW: 560,
    render: (p) => (
      <SectionHeader
        title={p.title as string}
        subtitle={(p.subtitle as string) || undefined}
        eyebrow={(p.eyebrow as string) || undefined}
        align={p.align as "left"|"center"|"right"}
        variant={p.variant as "default"|"compact"}
        count={(p.variant as string) === "compact" ? (p.count as number) : undefined}
      />
    ),
  },

  // UI Controls
  {
    name: "Badge",
    category: "UI Controls",
    description: "Étiquette colorée",
    defaultProps: { children: "Nouveau", variant: "info" },
    propDefs: [
      { key: "children", label: "Label", type: "string", defaultValue: "Nouveau" },
      { key: "variant", label: "Variante", type: "enum", options: ["default","info","success","warning","error"], defaultValue: "info" },
      { key: "dot", label: "Point", type: "boolean", defaultValue: false },
    ],
    render: (p) => <Badge variant={p.variant as "default"|"info"|"success"|"warning"|"error"} dot={p.dot as boolean}>{p.children as string}</Badge>,
  },
  {
    name: "Alert",
    category: "UI Controls",
    description: "Message d'alerte",
    defaultProps: { title: "Attention", children: "Voici un message important.", variant: "warning" },
    propDefs: [
      { key: "title", label: "Titre", type: "string", defaultValue: "Attention" },
      { key: "children", label: "Message", type: "string", defaultValue: "Voici un message important." },
      { key: "variant", label: "Variante", type: "enum", options: ["info","success","warning","error"], defaultValue: "warning" },
    ],
    render: (p) => <Alert title={p.title as string} variant={p.variant as "info"|"success"|"warning"|"error"}>{p.children as string}</Alert>,
  },
  {
    name: "Callout",
    category: "UI Controls",
    description: "Encadré informatif",
    defaultProps: { children: "Une information importante à retenir.", variant: "info" },
    propDefs: [
      { key: "children", label: "Message", type: "string", defaultValue: "Une information importante à retenir." },
      { key: "variant", label: "Type", type: "enum", options: ["info","warning","tip","danger"], defaultValue: "info" },
      { key: "title", label: "Titre (optionnel)", type: "string", defaultValue: "" },
    ],
    render: (p) => <Callout variant={p.variant as "info"|"warning"|"tip"|"danger"} title={p.title as string || undefined}>{p.children as string}</Callout>,
  },
  {
    name: "Button",
    category: "UI Controls",
    description: "Bouton d'action",
    defaultProps: { children: "Cliquer", variant: "primary", size: "md", disabled: false },
    propDefs: [
      { key: "children", label: "Label", type: "string", defaultValue: "Cliquer" },
      { key: "variant", label: "Variante", type: "enum", options: ["primary","secondary","ghost","danger"], defaultValue: "primary" },
      { key: "size", label: "Taille", type: "enum", options: ["sm","md","lg"], defaultValue: "md" },
      { key: "disabled", label: "Désactivé", type: "boolean", defaultValue: false },
    ],
    render: (p) => <Button variant={p.variant as "primary"|"secondary"|"ghost"|"danger"} size={p.size as "sm"|"md"|"lg"} disabled={p.disabled as boolean}>{p.children as string}</Button>,
  },
  {
    name: "Input",
    category: "UI Controls",
    description: "Champ de saisie",
    defaultProps: { value: "", label: "Champ", placeholder: "Entrez du texte...", disabled: false, size: "md" },
    propDefs: [
      { key: "value", label: "Valeur", type: "string", defaultValue: "" },
      { key: "label", label: "Label", type: "string", defaultValue: "Champ" },
      { key: "placeholder", label: "Placeholder", type: "string", defaultValue: "Entrez du texte..." },
      { key: "size", label: "Taille", type: "enum", options: ["sm","md","lg"], defaultValue: "md" },
      { key: "disabled", label: "Désactivé", type: "boolean", defaultValue: false },
    ],
    render: (p) => (
      <Input
        value={p.value as string}
        onChange={() => {}}
        label={p.label as string}
        placeholder={p.placeholder as string}
        size={p.size as "sm"|"md"|"lg"}
        disabled={p.disabled as boolean}
        fullWidth
      />
    ),
  },
  {
    name: "Checkbox",
    category: "UI Controls",
    description: "Case à cocher",
    defaultProps: { label: "Accepter les conditions", checked: false },
    propDefs: [
      { key: "label", label: "Label", type: "string", defaultValue: "Accepter les conditions" },
      { key: "checked", label: "Coché", type: "boolean", defaultValue: false },
    ],
    render: (p) => <Checkbox label={p.label as string} checked={p.checked as boolean} onChange={() => {}} />,
  },
  {
    name: "Select",
    category: "UI Controls",
    description: "Liste déroulante",
    defaultProps: { value: "option-a", label: "Choix", placeholder: "Sélectionner...", disabled: false, size: "md" },
    propDefs: [
      { key: "label", label: "Label", type: "string", defaultValue: "Choix" },
      { key: "placeholder", label: "Placeholder", type: "string", defaultValue: "Sélectionner..." },
      { key: "value", label: "Valeur", type: "enum", options: ["option-a","option-b","option-c"], defaultValue: "option-a" },
      { key: "size", label: "Taille", type: "enum", options: ["sm","md","lg"], defaultValue: "md" },
      { key: "disabled", label: "Désactivé", type: "boolean", defaultValue: false },
    ],
    render: (p) => (
      <Select
        value={p.value as string}
        onChange={() => {}}
        label={p.label as string}
        placeholder={p.placeholder as string}
        size={p.size as "sm"|"md"|"lg"}
        disabled={p.disabled as boolean}
        fullWidth
        options={[
          { value: "option-a", label: "Option A" },
          { value: "option-b", label: "Option B" },
          { value: "option-c", label: "Option C" },
        ]}
      />
    ),
  },
  {
    name: "Textarea",
    category: "UI Controls",
    description: "Zone de texte multi-ligne",
    defaultProps: {
      value: "Votre message...",
      label: "Description",
      placeholder: "Décrivez votre besoin",
      rows: 4,
      disabled: false,
      size: "md",
    },
    propDefs: [
      { key: "value", label: "Valeur", type: "string", defaultValue: "Votre message..." },
      { key: "label", label: "Label", type: "string", defaultValue: "Description" },
      { key: "placeholder", label: "Placeholder", type: "string", defaultValue: "Décrivez votre besoin" },
      { key: "rows", label: "Lignes", type: "number", defaultValue: 4 },
      { key: "size", label: "Taille", type: "enum", options: ["sm","md","lg"], defaultValue: "md" },
      { key: "disabled", label: "Désactivé", type: "boolean", defaultValue: false },
    ],
    render: (p) => (
      <Textarea
        value={p.value as string}
        onChange={() => {}}
        label={p.label as string}
        placeholder={p.placeholder as string}
        rows={p.rows as number}
        size={p.size as "sm"|"md"|"lg"}
        disabled={p.disabled as boolean}
        fullWidth
      />
    ),
    defaultW: 420,
  },
  {
    name: "ToggleSwitch",
    category: "UI Controls",
    description: "Interrupteur on/off",
    defaultProps: { label: "Activer", checked: false },
    propDefs: [
      { key: "label", label: "Label", type: "string", defaultValue: "Activer" },
      { key: "checked", label: "Activé", type: "boolean", defaultValue: false },
    ],
    render: (p) => <ToggleSwitch label={p.label as string} checked={p.checked as boolean} onChange={() => {}} />,
  },
  {
    name: "Spinner",
    category: "UI Controls",
    description: "Indicateur de chargement",
    defaultProps: { size: "md", variant: "default" },
    propDefs: [
      { key: "size", label: "Taille", type: "enum", options: ["sm","md","lg","xl"], defaultValue: "md" },
      { key: "variant", label: "Couleur", type: "enum", options: ["default","brand","success","warning","error"], defaultValue: "default" },
    ],
    render: (p) => <Spinner size={p.size as "sm"|"md"|"lg"|"xl"} variant={p.variant as "default"|"brand"|"success"|"warning"|"error"} />,
  },
  {
    name: "TagChip",
    category: "UI Controls",
    description: "Tag / chip",
    defaultProps: { label: "Design System", variant: "default" },
    propDefs: [
      { key: "label", label: "Label", type: "string", defaultValue: "Design System" },
      { key: "variant", label: "Variante", type: "enum", options: ["default","brand","muted"], defaultValue: "default" },
    ],
    render: (p) => <TagChip label={p.label as string} variant={p.variant as "default"|"brand"|"muted"} />,
  },
  {
    name: "StatusLabel",
    category: "UI Controls",
    description: "Étiquette de statut",
    defaultProps: { label: "Actif", status: "active" },
    propDefs: [
      { key: "label", label: "Label", type: "string", defaultValue: "Actif" },
      { key: "status", label: "Statut", type: "enum", options: ["active","inactive","pending","error"], defaultValue: "active" },
    ],
    render: (p) => <StatusLabel label={p.label as string} status={p.status as "active"|"inactive"|"pending"|"error"} />,
  },
  {
    name: "ProgressBar",
    category: "UI Controls",
    description: "Barre de progression",
    defaultProps: { value: 60, max: 100, label: "Progression", colorScheme: "brand" },
    propDefs: [
      { key: "label", label: "Label", type: "string", defaultValue: "Progression" },
      { key: "value", label: "Valeur", type: "number", defaultValue: 60 },
      { key: "max", label: "Maximum", type: "number", defaultValue: 100 },
      { key: "colorScheme", label: "Couleur", type: "enum", options: ["brand","green","amber","red"], defaultValue: "brand" },
    ],
    render: (p) => <ProgressBar value={p.value as number} max={p.max as number} label={p.label as string} colorScheme={p.colorScheme as "brand"|"green"|"amber"|"red"} />,
  },
  {
    name: "ColorBlock",
    category: "UI Controls",
    description: "Bloc coloré simple",
    defaultProps: {
      color: "#CC4A48",
      opacity: 100,
      borderRadius: "12px",
      borderColor: "transparent",
      borderWidth: 0,
    },
    propDefs: [
      { key: "color", label: "Couleur", type: "string", defaultValue: "#CC4A48" },
      { key: "opacity", label: "Opacité (%)", type: "number", defaultValue: 100 },
      { key: "borderRadius", label: "Radius", type: "string", defaultValue: "12px" },
      { key: "borderColor", label: "Couleur bordure", type: "string", defaultValue: "transparent" },
      { key: "borderWidth", label: "Largeur bordure", type: "number", defaultValue: 0 },
    ],
    defaultW: 240,
    defaultH: 140,
    render: (p) => {
      const opacityRaw = Number(p.opacity);
      const opacity = Number.isFinite(opacityRaw) ? Math.min(100, Math.max(0, opacityRaw)) / 100 : 1;
      const borderWidth = Math.max(0, Number(p.borderWidth) || 0);
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: String(p.color ?? "#CC4A48"),
            opacity,
            borderRadius: String(p.borderRadius ?? "12px"),
            border: `${borderWidth}px solid ${String(p.borderColor ?? "transparent")}`,
            boxSizing: "border-box",
          }}
        />
      );
    },
  },

  // Cartes
  {
    name: "TextCard",
    category: "Cartes",
    description: "Carte texte simple",
    defaultProps: { cardtitle: "Titre de carte", texte: "Description courte de la carte.", variant: "default" },
    propDefs: [
      { key: "cardtitle", label: "Titre", type: "string", defaultValue: "Titre de carte" },
      { key: "texte", label: "Corps", type: "string", defaultValue: "Description courte de la carte." },
      { key: "variant", label: "Variante", type: "enum", options: ["default","opaque","blurred"], defaultValue: "default" },
    ],
    render: (p) => <TextCard cardtitle={p.cardtitle as string} texte={p.texte as string} variant={p.variant as "default"|"opaque"|"blurred"} />,
  },
  {
    name: "BentoCard",
    category: "Cartes",
    description: "Carte bento",
    defaultProps: { name: "Feature clé", description: "Une fonctionnalité importante de votre produit.", hoverEffect: "lift" },
    propDefs: [
      { key: "name", label: "Titre", type: "string", defaultValue: "Feature clé" },
      { key: "description", label: "Description", type: "string", defaultValue: "Une fonctionnalité importante de votre produit." },
      { key: "hoverEffect", label: "Effet hover", type: "enum", options: ["lift","glow","none"], defaultValue: "lift" },
    ],
    render: (p) => <BentoCard name={p.name as string} description={p.description as string} hoverEffect={p.hoverEffect as "lift"|"glow"|"none"} />,
  },
  {
    name: "KpiCard",
    category: "Cartes",
    description: "Carte indicateur KPI",
    defaultProps: { label: "Utilisateurs actifs", value: "12 430", helper: "+8% ce mois", colorScheme: "auto" },
    propDefs: [
      { key: "label", label: "Label", type: "string", defaultValue: "Utilisateurs actifs" },
      { key: "value", label: "Valeur", type: "string", defaultValue: "12 430" },
      { key: "helper", label: "Info complémentaire", type: "string", defaultValue: "+8% ce mois" },
      { key: "colorScheme", label: "Couleur", type: "enum", options: ["auto","brand","green","amber","red"], defaultValue: "auto" },
    ],
    render: (p) => <KpiCard label={p.label as string} value={p.value as string} helper={p.helper as string} colorScheme={p.colorScheme as "auto"|"brand"|"green"|"amber"|"red"} />,
  },

  // Layout
  {
    name: "PageHero",
    category: "Layout",
    description: "Hero de page avec statistiques",
    defaultProps: {
      title: "Build faster with Brickslab",
      subtitle: "Créez des interfaces cohérentes et rapides avec un design system prêt à l'emploi.",
      eyebrow: "Documentation",
    },
    propDefs: [
      { key: "eyebrow", label: "Eyebrow", type: "string", defaultValue: "Documentation" },
      { key: "title", label: "Titre", type: "string", defaultValue: "Build faster with Brickslab" },
      { key: "subtitle", label: "Sous-titre", type: "string", defaultValue: "Créez des interfaces cohérentes et rapides avec un design system prêt à l'emploi." },
    ],
    defaultW: 960,
    render: (p) => (
      <PageHero
        eyebrow={p.eyebrow as string}
        title={p.title as string}
        subtitle={p.subtitle as string}
        stats={[
          { value: "137", label: "Composants" },
          { value: "95%", label: "Score audit moyen" },
        ]}
      />
    ),
  },

  // Navigation
  {
    name: "Breadcrumb",
    category: "Navigation",
    description: "Fil d'Ariane",
    defaultProps: { items: [{ label: "Accueil", href: "/" }, { label: "Composants", href: "/components" }, { label: "Page actuelle" }] },
    propDefs: [],
    defaultW: 520,
    render: (p) => <Breadcrumb items={p.items as { label: string; href?: string }[]} />,
  },

  // Médias
  {
    name: "MediaImage",
    category: "Médias",
    description: "Image responsive",
    defaultProps: {
      src: "https://picsum.photos/960/540",
      alt: "Image de mockup",
      objectFit: "cover",
      borderRadius: "var(--radius-md)",
    },
    propDefs: [
      { key: "src", label: "URL", type: "string", defaultValue: "https://picsum.photos/960/540" },
      { key: "alt", label: "Alt", type: "string", defaultValue: "Image de mockup" },
      { key: "objectFit", label: "Object fit", type: "enum", options: ["cover","contain","fill","none"], defaultValue: "cover" },
      { key: "borderRadius", label: "Radius", type: "string", defaultValue: "var(--radius-md)" },
    ],
    defaultW: 480,
    defaultH: 300,
    render: (p) => (
      <MediaImage
        src={p.src as string}
        alt={p.alt as string}
        objectFit={p.objectFit as "cover"|"contain"|"fill"|"none"}
        borderRadius={p.borderRadius as string}
        width="100%"
        height="100%"
      />
    ),
  },
  {
    name: "LocationMap",
    category: "Médias",
    description: "Carte de localisation",
    defaultProps: {
      lat: 48.85837,
      lng: 2.294481,
      zoom: 14,
      title: "Carte de localisation",
      placeLabel: "Tour Eiffel, Paris",
    },
    propDefs: [
      { key: "lat", label: "Latitude", type: "number", defaultValue: 48.85837 },
      { key: "lng", label: "Longitude", type: "number", defaultValue: 2.294481 },
      { key: "zoom", label: "Zoom", type: "number", defaultValue: 14 },
      { key: "title", label: "Titre", type: "string", defaultValue: "Carte de localisation" },
      { key: "placeLabel", label: "Label", type: "string", defaultValue: "Tour Eiffel, Paris" },
      { key: "showOpenStreetMapLink", label: "Lien OSM", type: "boolean", defaultValue: true },
    ],
    defaultW: 520,
    defaultH: 340,
    render: (p) => (
      <LocationMap
        lat={p.lat as number}
        lng={p.lng as number}
        zoom={p.zoom as number}
        title={p.title as string}
        placeLabel={p.placeLabel as string}
        showOpenStreetMapLink={p.showOpenStreetMapLink as boolean}
        height="100%"
      />
    ),
  },

  // Animation
  {
    name: "Marquee",
    category: "Animation",
    description: "Défilement horizontal",
    defaultProps: {},
    propDefs: [
      { key: "reverse", label: "Inverser", type: "boolean", defaultValue: false },
      { key: "pauseOnHover", label: "Pause au survol", type: "boolean", defaultValue: true },
    ],
    defaultW: 720,
    defaultH: 48,
    render: (p) => (
      <Marquee reverse={p.reverse as boolean} pauseOnHover={p.pauseOnHover as boolean}>
        <span style={{ padding: "0 24px" }}>Item 1</span>
        <span style={{ padding: "0 24px" }}>Item 2</span>
        <span style={{ padding: "0 24px" }}>Item 3</span>
        <span style={{ padding: "0 24px" }}>Item 4</span>
      </Marquee>
    ),
  },
];

const MANUAL_REGISTRY_NAMES = new Set(REGISTRY.map((entry) => entry.name));

const AUTO_REGISTRY: RegistryEntry[] = componentsData
  .filter((component: ComponentData) => component.type === "web")
  .map<RegistryEntry | null>((component: ComponentData) => {
    const resolvedName = resolveComponentName(component.label);
    if (MANUAL_REGISTRY_NAMES.has(resolvedName)) return null;
    const size = inferAutoEntrySize(component.section);
    return {
      name: resolvedName,
      category: mapSectionToCategory(component.section),
      description: component.description,
      defaultProps: {},
      propDefs: [],
      defaultW: size.defaultW,
      defaultH: size.defaultH,
      codegenMode: "placeholder" as const,
      previewHref: component.href,
      render: () => (
        <AutoComponentPlaceholder
          name={resolvedName}
          description={component.description}
          previewHref={component.href}
        />
      ),
    };
  })
  .filter((entry): entry is RegistryEntry => entry !== null);

const FULL_REGISTRY: RegistryEntry[] = [...REGISTRY, ...AUTO_REGISTRY];

const REGISTRY_MAP = new Map(FULL_REGISTRY.map((e) => [e.name, e]));
const CATEGORIES = Array.from(new Set(FULL_REGISTRY.map((e) => e.category)));
const REGISTRY_BY_CATEGORY = CATEGORIES.reduce<Record<string, RegistryEntry[]>>((acc, cat) => {
  acc[cat] = FULL_REGISTRY.filter((e) => e.category === cat);
  return acc;
}, {});

// ── Layout Presets ────────────────────────────────────────────────────────────

interface LayoutPreset {
  name: string;
  description: string;
  viewport: ViewportKey;
  canvasH: HeightPreset;
  blocks: Array<Omit<BlockInstance, "id">>;
}

// Hauteurs conservatrices utilisées pour le calcul des positions :
// Heading h1 ≈ 100px · h2 ≈ 80px · h3 ≈ 56px
// TextBlock ≈ 56px (court) / 80px (long)
// Badge/TagChip/StatusLabel ≈ 36px · Button ≈ 48px
// Input ≈ 96px · Checkbox ≈ 40px
// KpiCard ≈ 140px · ProgressBar ≈ 72px
// BentoCard (h fixe) · Callout ≈ 100px · Breadcrumb ≈ 36px

const LAYOUT_PRESETS: LayoutPreset[] = [
  {
    name: "Landing Premium",
    description: "Navigation clean, hero de marque, argumentaire et highlights",
    viewport: "desktop",
    canvasH: 1440,
    blocks: [
      { componentName: "ColorBlock", props: { color: "#f4f1ee", opacity: 100, borderRadius: "20px", borderColor: "#e8dfd9", borderWidth: 1 }, x: 40, y: 88, w: 1360, h: 356, zIndex: 0 },
      { componentName: "Heading", props: { level: 2, title: "Brickslab" }, x: 48, y: 16, w: 220, h: 0, zIndex: 1 },
      { componentName: "TagChip", props: { label: "Produits", variant: "default" }, x: 360, y: 20, w: 82, h: 0, zIndex: 1 },
      { componentName: "TagChip", props: { label: "Composants", variant: "default" }, x: 456, y: 20, w: 108, h: 0, zIndex: 1 },
      { componentName: "TagChip", props: { label: "Templates", variant: "default" }, x: 576, y: 20, w: 94, h: 0, zIndex: 1 },
      { componentName: "TagChip", props: { label: "Documentation", variant: "default" }, x: 684, y: 20, w: 126, h: 0, zIndex: 1 },
      { componentName: "Button", props: { children: "Se connecter", variant: "ghost", size: "sm" }, x: 1128, y: 10, w: 140, h: 0, zIndex: 1 },
      { componentName: "Button", props: { children: "Demarrer", variant: "primary", size: "sm" }, x: 1280, y: 10, w: 150, h: 0, zIndex: 1 },
      { componentName: "PageHero", props: { eyebrow: "Design system", title: "Concevez des interfaces premium, plus vite", subtitle: "Brickslab unifie design et code pour des experiences produit solides, elegantes et maintenables." }, x: 120, y: 132, w: 1200, h: 0, zIndex: 2 },
      { componentName: "SectionHeader", props: { eyebrow: "Valeur", title: "Une base fiable pour passer du mockup au produit", subtitle: "Des composants prets a deployer, des tokens solides et une documentation orientee execution.", align: "center", variant: "default" }, x: 120, y: 536, w: 1200, h: 0, zIndex: 1 },
      { componentName: "BentoCard", props: { name: "Experience coherente", description: "Patterns de contenu, de formulaires et de navigation alignes sur un meme langage visuel.", hoverEffect: "lift" }, x: 80, y: 720, w: 432, h: 220, zIndex: 1 },
      { componentName: "BentoCard", props: { name: "Performance produit", description: "Composants legers, structure claire et integration rapide dans un workflow React moderne.", hoverEffect: "glow" }, x: 528, y: 720, w: 432, h: 220, zIndex: 1 },
      { componentName: "BentoCard", props: { name: "Personnalisation fine", description: "Tokens themables et overrides previsibles pour adapter chaque interface a votre marque.", hoverEffect: "lift" }, x: 976, y: 720, w: 432, h: 220, zIndex: 1 },
      { componentName: "Callout", props: { variant: "tip", title: "Conseil", children: "Utilisez ce layout comme base de page d'accueil puis adaptez les sections avec vos composants metier." }, x: 120, y: 988, w: 1200, h: 0, zIndex: 1 },
      { componentName: "Marquee", props: { reverse: false, pauseOnHover: true }, x: 0, y: 1312, w: 1440, h: 48, zIndex: 1 },
    ],
  },
  {
    name: "Hero Editorial",
    description: "Hero split premium avec media, argument et actions",
    viewport: "desktop",
    canvasH: 900,
    blocks: [
      { componentName: "ColorBlock", props: { color: "#f2f4f7", opacity: 100, borderRadius: "18px", borderColor: "#e2e8f0", borderWidth: 1 }, x: 72, y: 96, w: 1296, h: 544, zIndex: 0 },
      { componentName: "Badge", props: { children: "Nouveau lancement", variant: "info", dot: true }, x: 136, y: 148, w: 244, h: 0, zIndex: 1 },
      { componentName: "Heading", props: { level: 1, title: "Un message clair, une presence visuelle forte", align: "left" }, x: 136, y: 208, w: 620, h: 0, zIndex: 1 },
      { componentName: "TextBlock", props: { content: "Exposez votre promesse en quelques lignes, puis guidez l'utilisateur vers l'action principale avec un parcours sans friction.", align: "left" }, x: 136, y: 340, w: 560, h: 0, zIndex: 1 },
      { componentName: "StatusLabel", props: { label: "Deployement stable", status: "active" }, x: 136, y: 448, w: 164, h: 0, zIndex: 1 },
      { componentName: "Button", props: { children: "Demarrer", variant: "primary", size: "lg" }, x: 136, y: 506, w: 220, h: 0, zIndex: 1 },
      { componentName: "Button", props: { children: "Voir la demo", variant: "ghost", size: "lg" }, x: 372, y: 506, w: 190, h: 0, zIndex: 1 },
      { componentName: "MediaImage", props: { src: "https://picsum.photos/980/680", alt: "Hero media", objectFit: "cover", borderRadius: "var(--radius-md)" }, x: 790, y: 148, w: 500, h: 420, zIndex: 1 },
      { componentName: "TextCard", props: { cardtitle: "Narration produit", texte: "Ajoutez ici une preuve sociale, une statistique ou un mini storytelling pour renforcer l'impact.", variant: "opaque" }, x: 790, y: 590, w: 500, h: 172, zIndex: 1 },
      { componentName: "Marquee", props: { reverse: false, pauseOnHover: true }, x: 0, y: 820, w: 1440, h: 48, zIndex: 1 },
    ],
  },
  {
    name: "Navbar Produit",
    description: "Navigation premium avec bandeau produit et hero court",
    viewport: "desktop",
    canvasH: 900,
    blocks: [
      { componentName: "ColorBlock", props: { color: "#f8f8fa", opacity: 100, borderRadius: "0px", borderColor: "#e5e7eb", borderWidth: 1 }, x: 0, y: 0, w: 1440, h: 84, zIndex: 0 },
      { componentName: "Heading", props: { level: 2, title: "Brickslab Studio" }, x: 48, y: 22, w: 280, h: 0, zIndex: 1 },
      { componentName: "TagChip", props: { label: "Produit", variant: "brand" }, x: 340, y: 28, w: 80, h: 0, zIndex: 1 },
      { componentName: "TagChip", props: { label: "Use cases", variant: "default" }, x: 434, y: 28, w: 88, h: 0, zIndex: 1 },
      { componentName: "TagChip", props: { label: "Composants", variant: "default" }, x: 536, y: 28, w: 108, h: 0, zIndex: 1 },
      { componentName: "TagChip", props: { label: "Pricing", variant: "default" }, x: 658, y: 28, w: 74, h: 0, zIndex: 1 },
      { componentName: "StatusLabel", props: { label: "v2.1.1", status: "active" }, x: 928, y: 28, w: 102, h: 0, zIndex: 1 },
      { componentName: "Button", props: { children: "Connexion", variant: "ghost", size: "sm" }, x: 1080, y: 20, w: 150, h: 0, zIndex: 1 },
      { componentName: "Button", props: { children: "Essayer", variant: "primary", size: "sm" }, x: 1246, y: 20, w: 150, h: 0, zIndex: 1 },
      { componentName: "Alert", props: { title: "Annonce produit", children: "Nouvelle collection de layouts premium disponible dans le mockup builder.", variant: "info" }, x: 48, y: 108, w: 760, h: 0, zIndex: 1 },
      { componentName: "SectionHeader", props: { eyebrow: "Navigation", title: "Un header simple qui pose un cadre premium", subtitle: "Ce layout est ideal pour les sites docs, SaaS ou vitrines produit.", align: "left", variant: "default" }, x: 48, y: 248, w: 920, h: 0, zIndex: 1 },
      { componentName: "MediaImage", props: { src: "https://picsum.photos/1400/520", alt: "Navigation preview", objectFit: "cover", borderRadius: "var(--radius-md)" }, x: 48, y: 416, w: 1344, h: 360, zIndex: 1 },
    ],
  },
  {
    name: "Dashboard Executif",
    description: "Vue decisionnelle: KPIs, progression, resume et signal d'alerte",
    viewport: "desktop",
    canvasH: 900,
    blocks: [
      { componentName: "SectionHeader", props: { eyebrow: "Monitoring", title: "Performance produit globale", subtitle: "Suivez les signaux essentiels et priorisez les decisions avec une lecture immediate.", align: "left", variant: "compact", count: 4 }, x: 48, y: 28, w: 960, h: 0, zIndex: 0 },
      { componentName: "StatusLabel", props: { label: "Donnees synchronisees", status: "active" }, x: 1200, y: 48, w: 186, h: 0, zIndex: 0 },
      { componentName: "KpiCard", props: { label: "Utilisateurs actifs", value: "12 430", helper: "+8% ce mois", colorScheme: "brand" }, x: 48, y: 144, w: 318, h: 0, zIndex: 0 },
      { componentName: "KpiCard", props: { label: "Revenus", value: "48 290 EUR", helper: "+12% ce mois", colorScheme: "green" }, x: 390, y: 144, w: 318, h: 0, zIndex: 0 },
      { componentName: "KpiCard", props: { label: "Conversion", value: "3.4%", helper: "-0.2% ce mois", colorScheme: "red" }, x: 732, y: 144, w: 318, h: 0, zIndex: 0 },
      { componentName: "KpiCard", props: { label: "NPS", value: "62", helper: "+4 pts ce trimestre", colorScheme: "auto" }, x: 1074, y: 144, w: 318, h: 0, zIndex: 0 },
      { componentName: "TextCard", props: { cardtitle: "Synthese", texte: "La croissance est solide, mais la conversion mobile doit etre optimisee avant la prochaine campagne.", variant: "default" }, x: 48, y: 332, w: 560, h: 206, zIndex: 0 },
      { componentName: "ProgressBar", props: { label: "Objectif trimestriel", value: 74, max: 100, colorScheme: "brand" }, x: 648, y: 344, w: 744, h: 0, zIndex: 0 },
      { componentName: "ProgressBar", props: { label: "Retention utilisateurs", value: 88, max: 100, colorScheme: "green" }, x: 648, y: 432, w: 744, h: 0, zIndex: 0 },
      { componentName: "ProgressBar", props: { label: "Budget operationnel", value: 46, max: 100, colorScheme: "amber" }, x: 648, y: 520, w: 744, h: 0, zIndex: 0 },
      { componentName: "Callout", props: { title: "Point d'attention", children: "Le trafic mobile augmente, mais le tunnel de conversion reste le principal frein.", variant: "warning" }, x: 48, y: 620, w: 1344, h: 0, zIndex: 0 },
      { componentName: "ColorBlock", props: { color: "#f7f7f8", opacity: 100, borderRadius: "12px", borderColor: "#ececf1", borderWidth: 1 }, x: 48, y: 766, w: 1344, h: 108, zIndex: 0 },
    ],
  },
  {
    name: "Formulaire Premium",
    description: "Formulaire centre avec contexte, reassurance et action claire",
    viewport: "desktop",
    canvasH: 900,
    blocks: [
      { componentName: "ColorBlock", props: { color: "#f7f4f2", opacity: 100, borderRadius: "20px", borderColor: "#eaddd5", borderWidth: 1 }, x: 360, y: 56, w: 720, h: 780, zIndex: 0 },
      { componentName: "SectionHeader", props: { eyebrow: "Onboarding", title: "Creer votre espace Brickslab", subtitle: "Configurez votre organisation et demarrez un projet en quelques minutes.", align: "center", variant: "default" }, x: 440, y: 108, w: 560, h: 0, zIndex: 1 },
      { componentName: "Callout", props: { title: "Confidentialite", children: "Vos informations sont uniquement utilisees pour configurer votre espace.", variant: "tip" }, x: 440, y: 256, w: 560, h: 0, zIndex: 1 },
      { componentName: "Input", props: { label: "Nom complet", placeholder: "Jean Dupont", value: "", size: "md", disabled: false }, x: 440, y: 378, w: 560, h: 0, zIndex: 1 },
      { componentName: "Input", props: { label: "Email professionnel", placeholder: "jean@entreprise.com", value: "", size: "md", disabled: false }, x: 440, y: 494, w: 560, h: 0, zIndex: 1 },
      { componentName: "Select", props: { label: "Taille de l'equipe", placeholder: "Selectionner...", value: "option-a", size: "md", disabled: false }, x: 440, y: 610, w: 560, h: 0, zIndex: 1 },
      { componentName: "Checkbox", props: { label: "J'accepte les conditions d'utilisation", checked: false }, x: 440, y: 722, w: 560, h: 0, zIndex: 1 },
      { componentName: "Button", props: { children: "Creer mon compte", variant: "primary", size: "lg", disabled: false }, x: 440, y: 776, w: 560, h: 0, zIndex: 1 },
    ],
  },
  {
    name: "Bento Showcase",
    description: "Grille premium 2x3 pour valoriser la proposition de valeur",
    viewport: "desktop",
    canvasH: 900,
    blocks: [
      { componentName: "SectionHeader", props: { eyebrow: "Features", title: "137 composants pour construire des experiences haut de gamme", subtitle: "Une base robuste pour vos interfaces produit, marketing et operationnelles.", align: "center", variant: "default" }, x: 120, y: 48, w: 1200, h: 0, zIndex: 0 },
      { componentName: "BentoCard", props: { name: "Composants UI", description: "Structure claire pour les vues critiques et les workflows du quotidien.", hoverEffect: "lift" }, x: 48, y: 220, w: 432, h: 200, zIndex: 0 },
      { componentName: "BentoCard", props: { name: "Theming", description: "Tokens et variables pour adapter les interfaces a votre marque.", hoverEffect: "glow" }, x: 504, y: 220, w: 432, h: 200, zIndex: 0 },
      { componentName: "BentoCard", props: { name: "Documentation", description: "Exemples, props et patterns pour une adoption rapide par les equipes.", hoverEffect: "lift" }, x: 960, y: 220, w: 432, h: 200, zIndex: 0 },
      { componentName: "BentoCard", props: { name: "Accessibilite", description: "Principes de lisibilite et de feedback integres des la conception.", hoverEffect: "lift" }, x: 48, y: 444, w: 432, h: 200, zIndex: 0 },
      { componentName: "BentoCard", props: { name: "Type safety", description: "Props explicites et previsualisation fiable pour iterer sans perte de temps.", hoverEffect: "lift" }, x: 504, y: 444, w: 432, h: 200, zIndex: 0 },
      { componentName: "BentoCard", props: { name: "Qualite audit", description: "Controle continu sur l'API, le rendu, les tokens et la documentation.", hoverEffect: "glow" }, x: 960, y: 444, w: 432, h: 200, zIndex: 0 },
      { componentName: "Button", props: { children: "Explorer la librairie", variant: "primary", size: "lg", disabled: false }, x: 600, y: 708, w: 240, h: 0, zIndex: 0 },
    ],
  },
  {
    name: "Article Signature",
    description: "Mise en page editoriale avec hero media et colonne insights",
    viewport: "desktop",
    canvasH: 1440,
    blocks: [
      { componentName: "Breadcrumb", props: { items: [{ label: "Accueil", href: "/" }, { label: "Magazine", href: "/magazine" }, { label: "Edition produit" }] }, x: 120, y: 48, w: 640, h: 0, zIndex: 0 },
      { componentName: "SectionHeader", props: { eyebrow: "Analyse", title: "Concevoir un design system evolutif sans sacrifier la velocite", subtitle: "Une approche pragmatique pour aligner design, code et gouvernance produit.", align: "left", variant: "default" }, x: 120, y: 112, w: 920, h: 0, zIndex: 0 },
      { componentName: "MediaImage", props: { src: "https://picsum.photos/1400/760", alt: "Article cover", objectFit: "cover", borderRadius: "var(--radius-md)" }, x: 120, y: 300, w: 1200, h: 360, zIndex: 0 },
      { componentName: "TextBlock", props: { content: "Un design system durable repose sur des decisions de structure: limites de responsabilite, tokens stables et documentation actionnable.", align: "left" }, x: 120, y: 696, w: 820, h: 0, zIndex: 0 },
      { componentName: "Callout", props: { title: "A retenir", children: "Priorisez les composants a fort impact metier avant d'etendre le catalogue.", variant: "tip" }, x: 120, y: 840, w: 820, h: 0, zIndex: 0 },
      { componentName: "TextBlock", props: { content: "La standardisation ne doit pas figer l'innovation. Organisez des cycles courts de feedback entre designers et developpeurs.", align: "left" }, x: 120, y: 996, w: 820, h: 0, zIndex: 0 },
      { componentName: "TagChip", props: { label: "Design System", variant: "brand" }, x: 120, y: 1160, w: 120, h: 0, zIndex: 0 },
      { componentName: "TagChip", props: { label: "Produit", variant: "default" }, x: 252, y: 1160, w: 90, h: 0, zIndex: 0 },
      { componentName: "TagChip", props: { label: "Architecture", variant: "default" }, x: 354, y: 1160, w: 118, h: 0, zIndex: 0 },
      { componentName: "TextCard", props: { cardtitle: "Point de vue", texte: "Les equipes qui gagnent le plus de temps sont celles qui clarifient d'abord leurs principes de variation.", variant: "blurred" }, x: 980, y: 696, w: 340, h: 252, zIndex: 0 },
      { componentName: "KpiCard", props: { label: "Adoption interne", value: "87%", helper: "sur 3 equipes produit", colorScheme: "green" }, x: 980, y: 980, w: 340, h: 0, zIndex: 0 },
    ],
  },
  {
    name: "Contact Studio",
    description: "Hero contact, carte, formulaire et bloc de reassurance",
    viewport: "desktop",
    canvasH: 1440,
    blocks: [
      { componentName: "PageHero", props: { eyebrow: "Contact", title: "Parlons de votre prochain produit", subtitle: "Nous vous aidons a transformer une intention de design en experience exploitable." }, x: 120, y: 64, w: 1200, h: 0, zIndex: 0 },
      { componentName: "SectionHeader", props: { title: "Un interlocuteur dedie, des reponses concretes", subtitle: "Partagez votre contexte et nous vous proposons un cadre d'implementation adapte.", eyebrow: "Support", align: "left", variant: "default" }, x: 120, y: 420, w: 1200, h: 0, zIndex: 0 },
      { componentName: "LocationMap", props: { lat: 48.85837, lng: 2.294481, zoom: 14, title: "Localisation des bureaux", placeLabel: "Paris", showOpenStreetMapLink: true }, x: 120, y: 560, w: 640, h: 360, zIndex: 0 },
      { componentName: "Input", props: { label: "Nom", placeholder: "Votre nom", value: "", size: "md", disabled: false }, x: 800, y: 560, w: 520, h: 0, zIndex: 0 },
      { componentName: "Input", props: { label: "Email", placeholder: "vous@entreprise.com", value: "", size: "md", disabled: false }, x: 800, y: 680, w: 520, h: 0, zIndex: 0 },
      { componentName: "Textarea", props: { label: "Message", placeholder: "Parlez-nous de vos objectifs", value: "Bonjour, nous souhaitons structurer notre librairie de composants.", rows: 5, size: "md", disabled: false }, x: 800, y: 800, w: 520, h: 0, zIndex: 0 },
      { componentName: "Button", props: { children: "Envoyer la demande", variant: "primary", size: "lg", disabled: false }, x: 800, y: 1016, w: 520, h: 0, zIndex: 0 },
      { componentName: "TextCard", props: { cardtitle: "Delai de reponse", texte: "Un consultant vous repond sous 24h avec une proposition de cadrage.", variant: "default" }, x: 120, y: 948, w: 640, h: 188, zIndex: 0 },
      { componentName: "StatusLabel", props: { label: "Support disponible", status: "active" }, x: 800, y: 1104, w: 180, h: 0, zIndex: 0 },
    ],
  },
  {
    name: "Pricing Premium",
    description: "Comparatif de plans avec offre mise en avant et CTA clairs",
    viewport: "desktop",
    canvasH: 900,
    blocks: [
      { componentName: "SectionHeader", props: { eyebrow: "Pricing", title: "Choisissez le plan adapte a votre maturite produit", subtitle: "Structure simple pour comparer les offres sans alourdir la lecture.", align: "center", variant: "default" }, x: 120, y: 48, w: 1200, h: 0, zIndex: 0 },
      { componentName: "TextCard", props: { cardtitle: "Starter", texte: "Pour les equipes qui lancent leur base de composants.", variant: "blurred" }, x: 120, y: 240, w: 360, h: 280, zIndex: 0 },
      { componentName: "TextCard", props: { cardtitle: "Scale", texte: "Pour industrialiser les usages et standardiser les workflows UI.", variant: "opaque" }, x: 540, y: 216, w: 360, h: 320, zIndex: 0 },
      { componentName: "TextCard", props: { cardtitle: "Enterprise", texte: "Pour les organisations multi-equipes avec exigences avancees.", variant: "blurred" }, x: 960, y: 240, w: 360, h: 280, zIndex: 0 },
      { componentName: "Badge", props: { children: "Plan recommande", variant: "success", dot: true }, x: 636, y: 182, w: 168, h: 0, zIndex: 0 },
      { componentName: "Button", props: { children: "Choisir Starter", variant: "secondary", size: "lg", disabled: false }, x: 120, y: 560, w: 360, h: 0, zIndex: 0 },
      { componentName: "Button", props: { children: "Choisir Scale", variant: "primary", size: "lg", disabled: false }, x: 540, y: 560, w: 360, h: 0, zIndex: 0 },
      { componentName: "Button", props: { children: "Contacter Sales", variant: "secondary", size: "lg", disabled: false }, x: 960, y: 560, w: 360, h: 0, zIndex: 0 },
      { componentName: "Callout", props: { title: "Facturation flexible", children: "Mensuel ou annuel, avec accompagnement de migration pour les equipes existantes.", variant: "info" }, x: 120, y: 676, w: 1200, h: 0, zIndex: 0 },
    ],
  },
  {
    name: "Product Story",
    description: "Narration produit avec hero, preuve visuelle et bloc d'impact",
    viewport: "desktop",
    canvasH: 1440,
    blocks: [
      { componentName: "PageHero", props: { eyebrow: "Case study", title: "Comment une equipe produit a accelere de 40%", subtitle: "Un layout narratif pour presenter contexte, execution et impact business." }, x: 120, y: 56, w: 1200, h: 0, zIndex: 0 },
      { componentName: "MediaImage", props: { src: "https://picsum.photos/1200/760", alt: "Case study cover", objectFit: "cover", borderRadius: "var(--radius-md)" }, x: 120, y: 360, w: 760, h: 420, zIndex: 0 },
      { componentName: "SectionHeader", props: { eyebrow: "Contexte", title: "Une organisation en croissance devait unifier ses experiences", subtitle: "Ce bloc contextualise la problematique avant de montrer les resultats mesurables.", align: "left", variant: "compact", count: 3 }, x: 920, y: 380, w: 400, h: 0, zIndex: 0 },
      { componentName: "TextBlock", props: { content: "Le principal enjeu etait la coherence cross-equipe. Le mockup builder a servi de socle pour aligner design, produit et engineering.", align: "left" }, x: 920, y: 560, w: 400, h: 0, zIndex: 0 },
      { componentName: "Button", props: { children: "Lire l'etude complete", variant: "primary", size: "md", disabled: false }, x: 920, y: 708, w: 220, h: 0, zIndex: 0 },
      { componentName: "KpiCard", props: { label: "Time-to-market", value: "-40%", helper: "en 2 trimestres", colorScheme: "green" }, x: 120, y: 824, w: 240, h: 0, zIndex: 0 },
      { componentName: "KpiCard", props: { label: "Dette UI", value: "-55%", helper: "composants dupliques", colorScheme: "brand" }, x: 376, y: 824, w: 240, h: 0, zIndex: 0 },
      { componentName: "KpiCard", props: { label: "Satisfaction equipe", value: "9.1/10", helper: "survey interne", colorScheme: "auto" }, x: 632, y: 824, w: 240, h: 0, zIndex: 0 },
      { componentName: "Callout", props: { title: "Resultat", children: "L'equipe dispose maintenant d'un pipeline plus fluide, d'une base visuelle unifiee et d'une meilleure previsibilite produit.", variant: "tip" }, x: 120, y: 1020, w: 1200, h: 0, zIndex: 0 },
      { componentName: "Marquee", props: { reverse: false, pauseOnHover: true }, x: 0, y: 1328, w: 1440, h: 48, zIndex: 0 },
    ],
  },
  {
    name: "SaaS Feature Tour",
    description: "Parcours de fonctionnalites avec hero, cartes et preuves de valeur",
    viewport: "desktop",
    canvasH: 1440,
    blocks: [
      { componentName: "ColorBlock", props: { color: "#f4f6fb", opacity: 100, borderRadius: "18px", borderColor: "#e2e8f0", borderWidth: 1 }, x: 40, y: 104, w: 1360, h: 360, zIndex: 0 },
      { componentName: "PageHero", props: { eyebrow: "Product tour", title: "Montrez la valeur de votre produit en 90 secondes", subtitle: "Un layout pour guider vos visiteurs de la promesse a la preuve avec des blocs concrets." }, x: 120, y: 140, w: 1200, h: 0, zIndex: 1 },
      { componentName: "SectionHeader", props: { eyebrow: "Fonctionnalites", title: "Un systeme de composants adapte aux flux reels", subtitle: "Chaque section peut etre personnalisee pour presenter vos modules metier.", align: "center", variant: "default" }, x: 120, y: 540, w: 1200, h: 0, zIndex: 1 },
      { componentName: "BentoCard", props: { name: "Creation rapide", description: "Assemblez une page complete en glissant des composants prets a l'emploi.", hoverEffect: "lift" }, x: 80, y: 720, w: 432, h: 210, zIndex: 1 },
      { componentName: "BentoCard", props: { name: "Design coherent", description: "Conservez une identite visuelle stable entre toutes vos equipes.", hoverEffect: "glow" }, x: 528, y: 720, w: 432, h: 210, zIndex: 1 },
      { componentName: "BentoCard", props: { name: "Iteration sure", description: "Testez, comparez et exportez du code propre a partir de la maquette.", hoverEffect: "lift" }, x: 976, y: 720, w: 432, h: 210, zIndex: 1 },
      { componentName: "TextCard", props: { cardtitle: "Impact", texte: "Les equipes reduisent le temps de production tout en gardant un niveau premium.", variant: "opaque" }, x: 120, y: 972, w: 700, h: 196, zIndex: 1 },
      { componentName: "ProgressBar", props: { label: "Adoption interne", value: 84, max: 100, colorScheme: "green" }, x: 860, y: 992, w: 460, h: 0, zIndex: 1 },
      { componentName: "ProgressBar", props: { label: "Vitesse de livraison", value: 72, max: 100, colorScheme: "brand" }, x: 860, y: 1080, w: 460, h: 0, zIndex: 1 },
      { componentName: "Button", props: { children: "Demarrer la visite", variant: "primary", size: "lg", disabled: false }, x: 560, y: 1240, w: 320, h: 0, zIndex: 1 },
    ],
  },
  {
    name: "Testimonials Wall",
    description: "Section sociale premium avec avis clients et call to action",
    viewport: "desktop",
    canvasH: 900,
    blocks: [
      { componentName: "SectionHeader", props: { eyebrow: "Temoignages", title: "Des equipes produit qui livrent plus vite et mieux", subtitle: "Un mur d'avis pour renforcer la confiance sur une page marketing.", align: "center", variant: "default" }, x: 120, y: 44, w: 1200, h: 0, zIndex: 0 },
      { componentName: "Badge", props: { children: "4.9/5 satisfaction", variant: "success", dot: true }, x: 608, y: 190, w: 224, h: 0, zIndex: 0 },
      { componentName: "TextCard", props: { cardtitle: "Team Product", texte: "Le builder nous a permis de prototyper des pages completes en atelier.", variant: "blurred" }, x: 72, y: 248, w: 416, h: 236, zIndex: 0 },
      { componentName: "TextCard", props: { cardtitle: "Team Design", texte: "Le rendu reste premium meme sur des cycles d'iteration tres courts.", variant: "opaque" }, x: 512, y: 224, w: 416, h: 284, zIndex: 0 },
      { componentName: "TextCard", props: { cardtitle: "Team Engineering", texte: "Le passage maquette vers code est plus direct et plus fiable.", variant: "blurred" }, x: 952, y: 248, w: 416, h: 236, zIndex: 0 },
      { componentName: "Callout", props: { title: "Resultat global", children: "Les equipes gagnent en cohesion et en qualite percue sur les interfaces clefs.", variant: "tip" }, x: 120, y: 560, w: 1200, h: 0, zIndex: 0 },
      { componentName: "Button", props: { children: "Voir plus de cas clients", variant: "primary", size: "lg", disabled: false }, x: 560, y: 736, w: 320, h: 0, zIndex: 0 },
    ],
  },
  {
    name: "Support FAQ",
    description: "Page d'assistance avec recherche visuelle, categories et contact",
    viewport: "desktop",
    canvasH: 900,
    blocks: [
      { componentName: "ColorBlock", props: { color: "#f8fafc", opacity: 100, borderRadius: "16px", borderColor: "#e2e8f0", borderWidth: 1 }, x: 56, y: 120, w: 1328, h: 708, zIndex: 0 },
      { componentName: "SectionHeader", props: { eyebrow: "Help center", title: "Comment pouvons-nous vous aider", subtitle: "Un layout FAQ simple, propre et orienté action.", align: "center", variant: "default" }, x: 160, y: 48, w: 1120, h: 0, zIndex: 1 },
      { componentName: "Input", props: { label: "Recherche", placeholder: "Rechercher un article...", value: "", size: "md", disabled: false }, x: 200, y: 172, w: 1040, h: 0, zIndex: 1 },
      { componentName: "TextCard", props: { cardtitle: "Demarrage", texte: "Installation, theming et premiers composants en production.", variant: "default" }, x: 128, y: 326, w: 400, h: 180, zIndex: 1 },
      { componentName: "TextCard", props: { cardtitle: "Composants", texte: "Props, overrides et patterns de composition recommandes.", variant: "default" }, x: 544, y: 326, w: 352, h: 180, zIndex: 1 },
      { componentName: "TextCard", props: { cardtitle: "Mockup Builder", texte: "Assemblage rapide, guides d'alignement et export JSX.", variant: "default" }, x: 912, y: 326, w: 400, h: 180, zIndex: 1 },
      { componentName: "Callout", props: { title: "Besoin d'aide humaine", children: "Notre support produit repond sous 24h sur les demandes techniques.", variant: "info" }, x: 128, y: 566, w: 1184, h: 0, zIndex: 1 },
      { componentName: "Button", props: { children: "Contacter le support", variant: "primary", size: "md", disabled: false }, x: 612, y: 744, w: 216, h: 0, zIndex: 1 },
    ],
  },
  {
    name: "Tablet Product Overview",
    description: "Version tablette d'une page produit avec sections et visual",
    viewport: "tablet",
    canvasH: 1440,
    blocks: [
      { componentName: "ColorBlock", props: { color: "#f5f3f0", opacity: 100, borderRadius: "14px", borderColor: "#e7ddd4", borderWidth: 1 }, x: 20, y: 88, w: 728, h: 312, zIndex: 0 },
      { componentName: "Heading", props: { level: 2, title: "Brickslab" }, x: 24, y: 20, w: 220, h: 0, zIndex: 1 },
      { componentName: "StatusLabel", props: { label: "Version tablette", status: "active" }, x: 564, y: 26, w: 180, h: 0, zIndex: 1 },
      { componentName: "PageHero", props: { eyebrow: "Overview", title: "Composez des experiences premium sur tablette", subtitle: "Conservez une lecture claire et des actions visibles sur un canvas medium." }, x: 44, y: 128, w: 680, h: 0, zIndex: 1 },
      { componentName: "SectionHeader", props: { eyebrow: "Focus", title: "Les points cles de votre offre", subtitle: "Trois blocs suffisent pour presenter benefices, preuves et action.", align: "left", variant: "compact", count: 3 }, x: 44, y: 458, w: 680, h: 0, zIndex: 1 },
      { componentName: "TextCard", props: { cardtitle: "Benefice principal", texte: "Expliquez clairement ce que votre audience gagne.", variant: "opaque" }, x: 44, y: 620, w: 332, h: 188, zIndex: 1 },
      { componentName: "TextCard", props: { cardtitle: "Preuve concrete", texte: "Ajoutez un resultat mesurable ou une reference client.", variant: "blurred" }, x: 392, y: 620, w: 332, h: 188, zIndex: 1 },
      { componentName: "MediaImage", props: { src: "https://picsum.photos/900/560", alt: "Tablet visual", objectFit: "cover", borderRadius: "var(--radius-md)" }, x: 44, y: 844, w: 680, h: 340, zIndex: 1 },
      { componentName: "Button", props: { children: "Continuer", variant: "primary", size: "lg", disabled: false }, x: 224, y: 1236, w: 320, h: 0, zIndex: 1 },
    ],
  },
  {
    name: "Mobile Onboarding",
    description: "Sequence mobile d'accueil avec progression et appel a l'action",
    viewport: "mobile",
    canvasH: 1440,
    blocks: [
      { componentName: "ColorBlock", props: { color: "#f4f7fb", opacity: 100, borderRadius: "12px", borderColor: "#dbe5f0", borderWidth: 1 }, x: 8, y: 76, w: 374, h: 332, zIndex: 0 },
      { componentName: "StatusLabel", props: { label: "Etape 1/3", status: "pending" }, x: 16, y: 18, w: 128, h: 0, zIndex: 1 },
      { componentName: "Heading", props: { level: 2, title: "Bienvenue sur Brickslab", align: "left" }, x: 16, y: 116, w: 358, h: 0, zIndex: 1 },
      { componentName: "TextBlock", props: { content: "Configurez votre espace en quelques etapes pour lancer votre premiere maquette.", align: "left" }, x: 16, y: 206, w: 358, h: 0, zIndex: 1 },
      { componentName: "ProgressBar", props: { label: "Configuration", value: 35, max: 100, colorScheme: "brand" }, x: 16, y: 300, w: 358, h: 0, zIndex: 1 },
      { componentName: "Input", props: { label: "Nom de projet", placeholder: "Mon produit", value: "", size: "md", disabled: false }, x: 16, y: 470, w: 358, h: 0, zIndex: 1 },
      { componentName: "Select", props: { label: "Type d'equipe", placeholder: "Selectionner...", value: "option-a", size: "md", disabled: false }, x: 16, y: 586, w: 358, h: 0, zIndex: 1 },
      { componentName: "ToggleSwitch", props: { label: "Activer les suggestions", checked: true }, x: 16, y: 706, w: 358, h: 0, zIndex: 1 },
      { componentName: "Callout", props: { title: "Astuce", children: "Vous pourrez modifier ces parametres a tout moment.", variant: "tip" }, x: 16, y: 786, w: 358, h: 0, zIndex: 1 },
      { componentName: "Button", props: { children: "Suivant", variant: "primary", size: "lg", disabled: false }, x: 16, y: 952, w: 358, h: 0, zIndex: 1 },
      { componentName: "Button", props: { children: "Plus tard", variant: "ghost", size: "md", disabled: false }, x: 16, y: 1020, w: 358, h: 0, zIndex: 1 },
    ],
  },
  {
    name: "Mobile Checkout",
    description: "Checkout mobile avec recapitulatif, formulaire et validation",
    viewport: "mobile",
    canvasH: 1440,
    blocks: [
      { componentName: "SectionHeader", props: { eyebrow: "Checkout", title: "Finaliser la commande", subtitle: "Validation rapide sur mobile avec informations essentielles.", align: "left", variant: "compact", count: 2 }, x: 16, y: 28, w: 358, h: 0, zIndex: 1 },
      { componentName: "TextCard", props: { cardtitle: "Abonnement Scale", texte: "1 licence equipe, support prioritaire, acces complet.", variant: "default" }, x: 16, y: 176, w: 358, h: 176, zIndex: 1 },
      { componentName: "StatusLabel", props: { label: "Paiement securise", status: "active" }, x: 16, y: 372, w: 166, h: 0, zIndex: 1 },
      { componentName: "Input", props: { label: "Email", placeholder: "vous@entreprise.com", value: "", size: "md", disabled: false }, x: 16, y: 430, w: 358, h: 0, zIndex: 1 },
      { componentName: "Input", props: { label: "Numero de carte", placeholder: "4242 4242 4242 4242", value: "", size: "md", disabled: false }, x: 16, y: 546, w: 358, h: 0, zIndex: 1 },
      { componentName: "Input", props: { label: "Nom du titulaire", placeholder: "Jean Dupont", value: "", size: "md", disabled: false }, x: 16, y: 662, w: 358, h: 0, zIndex: 1 },
      { componentName: "Checkbox", props: { label: "Je confirme les conditions de vente", checked: false }, x: 16, y: 780, w: 358, h: 0, zIndex: 1 },
      { componentName: "Callout", props: { title: "Facturation", children: "Vous recevrez la facture automatiquement par email.", variant: "info" }, x: 16, y: 850, w: 358, h: 0, zIndex: 1 },
      { componentName: "Button", props: { children: "Payer maintenant", variant: "primary", size: "lg", disabled: false }, x: 16, y: 1020, w: 358, h: 0, zIndex: 1 },
      { componentName: "Button", props: { children: "Annuler", variant: "ghost", size: "md", disabled: false }, x: 16, y: 1090, w: 358, h: 0, zIndex: 1 },
    ],
  },
  {
    name: "Quiz Launch",
    description: "Page d'introduction quiz avec progression et builder de questionnaire",
    viewport: "desktop",
    canvasH: 1440,
    blocks: [
      { componentName: "SectionHeader", props: { eyebrow: "Quiz", title: "Lancez une evaluation engageante", subtitle: "Structure d'introduction avec contexte, progression et previsualisation de formulaire.", align: "center", variant: "default" }, x: 120, y: 52, w: 1200, h: 0, zIndex: 1 },
      { componentName: "ColorBlock", props: { color: "#f5f7fb", opacity: 100, borderRadius: "16px", borderColor: "#dbe3ef", borderWidth: 1 }, x: 80, y: 226, w: 1280, h: 1120, zIndex: 0 },
      { componentName: "QuizProgress", props: {}, x: 120, y: 268, w: 860, h: 0, zIndex: 1 },
      { componentName: "QuizTimer", props: {}, x: 1008, y: 264, w: 312, h: 0, zIndex: 1 },
      { componentName: "TextCard", props: { cardtitle: "Objectif", texte: "Mesurez la perception, identifiez les zones de friction et priorisez vos actions produit.", variant: "opaque" }, x: 120, y: 346, w: 536, h: 208, zIndex: 1 },
      { componentName: "Callout", props: { title: "Conseil de lancement", children: "Gardez 8 a 12 questions pour maximiser le taux de completion.", variant: "tip" }, x: 680, y: 356, w: 640, h: 0, zIndex: 1 },
      { componentName: "QuizBuilder", props: {}, x: 120, y: 594, w: 1200, h: 620, zIndex: 1 },
      { componentName: "Button", props: { children: "Demarrer le quiz", variant: "primary", size: "lg", disabled: false }, x: 520, y: 1256, w: 400, h: 0, zIndex: 1 },
    ],
  },
  {
    name: "Quiz Questionnaire",
    description: "Parcours de questions avec navigation, progression et soumission",
    viewport: "desktop",
    canvasH: 2160,
    blocks: [
      { componentName: "SectionHeader", props: { eyebrow: "Session", title: "Questionnaire principal", subtitle: "Template long format pour composer un quiz complet dans une seule vue.", align: "left", variant: "compact", count: 6 }, x: 120, y: 44, w: 1200, h: 0, zIndex: 1 },
      { componentName: "QuizProgress", props: {}, x: 120, y: 184, w: 960, h: 0, zIndex: 1 },
      { componentName: "QuizTimer", props: {}, x: 1100, y: 184, w: 220, h: 0, zIndex: 1 },
      { componentName: "QuestionCard", props: {}, x: 120, y: 272, w: 1200, h: 280, zIndex: 1 },
      { componentName: "SingleChoice", props: {}, x: 120, y: 584, w: 1200, h: 220, zIndex: 1 },
      { componentName: "MultiChoice", props: {}, x: 120, y: 836, w: 1200, h: 220, zIndex: 1 },
      { componentName: "ScaleLikert", props: {}, x: 120, y: 1088, w: 1200, h: 200, zIndex: 1 },
      { componentName: "NPSQuestion", props: {}, x: 120, y: 1320, w: 1200, h: 220, zIndex: 1 },
      { componentName: "RangeSliderQuestion", props: {}, x: 120, y: 1572, w: 1200, h: 220, zIndex: 1 },
      { componentName: "FreeTextQuestion", props: {}, x: 120, y: 1824, w: 1200, h: 210, zIndex: 1 },
      { componentName: "QuizNavigation", props: {}, x: 120, y: 2060, w: 1200, h: 0, zIndex: 1 },
      { componentName: "QuizSubmitBar", props: {}, x: 120, y: 2108, w: 1200, h: 0, zIndex: 1 },
    ],
  },
  {
    name: "Quiz Results Board",
    description: "Vue de resultat, revue des reponses et analytics de campagne",
    viewport: "desktop",
    canvasH: 2160,
    blocks: [
      { componentName: "SectionHeader", props: { eyebrow: "Analyse", title: "Resultats et insights quiz", subtitle: "Synthese score + analytics pour piloter vos decisions apres collecte.", align: "left", variant: "default" }, x: 120, y: 44, w: 1200, h: 0, zIndex: 1 },
      { componentName: "QuizResultSummary", props: {}, x: 120, y: 212, w: 560, h: 320, zIndex: 1 },
      { componentName: "InsightCards", props: {}, x: 704, y: 212, w: 616, h: 320, zIndex: 1 },
      { componentName: "SurveyFunnel", props: {}, x: 120, y: 568, w: 560, h: 300, zIndex: 1 },
      { componentName: "DistributionChart", props: {}, x: 704, y: 568, w: 616, h: 300, zIndex: 1 },
      { componentName: "ResponseTable", props: {}, x: 120, y: 900, w: 1200, h: 540, zIndex: 1 },
      { componentName: "AnswerReview", props: {}, x: 120, y: 1474, w: 1200, h: 560, zIndex: 1 },
      { componentName: "Callout", props: { title: "Prochaine etape", children: "Filtrez les reponses faibles et creez une boucle d'amelioration sur les points critiques.", variant: "tip" }, x: 120, y: 2058, w: 1200, h: 0, zIndex: 1 },
    ],
  },
  {
    name: "Mobile Quiz Session",
    description: "Parcours quiz mobile avec questions, notation et soumission",
    viewport: "mobile",
    canvasH: 2160,
    blocks: [
      { componentName: "StatusLabel", props: { label: "Quiz mobile", status: "active" }, x: 16, y: 16, w: 140, h: 0, zIndex: 1 },
      { componentName: "QuizProgress", props: {}, x: 16, y: 64, w: 358, h: 0, zIndex: 1 },
      { componentName: "QuestionRenderer", props: {}, x: 16, y: 138, w: 358, h: 250, zIndex: 1 },
      { componentName: "SingleChoice", props: {}, x: 16, y: 420, w: 358, h: 220, zIndex: 1 },
      { componentName: "RatingStars", props: {}, x: 16, y: 672, w: 358, h: 180, zIndex: 1 },
      { componentName: "NPSQuestion", props: {}, x: 16, y: 884, w: 358, h: 220, zIndex: 1 },
      { componentName: "RangeSliderQuestion", props: {}, x: 16, y: 1136, w: 358, h: 220, zIndex: 1 },
      { componentName: "RankOrderQuestion", props: {}, x: 16, y: 1388, w: 358, h: 230, zIndex: 1 },
      { componentName: "FreeTextQuestion", props: {}, x: 16, y: 1650, w: 358, h: 220, zIndex: 1 },
      { componentName: "QuizNavigation", props: {}, x: 16, y: 1900, w: 358, h: 0, zIndex: 1 },
      { componentName: "QuizSubmitBar", props: {}, x: 16, y: 1960, w: 358, h: 0, zIndex: 1 },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function snapVal(v: number): number {
  return Math.round(v / GRID) * GRID;
}

function clampValue(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  if (max <= min) return min;
  return Math.min(Math.max(value, min), max);
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function cloneBlocks(blocks: BlockInstance[]): BlockInstance[] {
  return blocks.map((b) => ({ ...b, props: { ...b.props } }));
}

function cloneValue<T>(value: T): T {
  if (typeof value !== "object" || value === null) return value;
  try {
    return structuredClone(value);
  } catch {
    return JSON.parse(JSON.stringify(value)) as T;
  }
}

function blocksEqual(a: BlockInstance[], b: BlockInstance[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  return JSON.stringify(a) === JSON.stringify(b);
}

function guidesEqual(a: AlignmentGuides, b: AlignmentGuides): boolean {
  if (a.vertical.length !== b.vertical.length || a.horizontal.length !== b.horizontal.length) return false;
  for (let i = 0; i < a.vertical.length; i += 1) {
    if (a.vertical[i] !== b.vertical[i]) return false;
  }
  for (let i = 0; i < a.horizontal.length; i += 1) {
    if (a.horizontal[i] !== b.horizontal[i]) return false;
  }
  return true;
}

function normalizeHexColor(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const prefixed = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
  if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(prefixed)) return null;
  if (prefixed.length === 4) {
    return `#${prefixed[1]}${prefixed[1]}${prefixed[2]}${prefixed[2]}${prefixed[3]}${prefixed[3]}`.toLowerCase();
  }
  return prefixed.toLowerCase();
}

function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tagName = el.tagName;
  if (tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA") return true;
  return el.isContentEditable;
}

function valuesEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a === "object" && a !== null && typeof b === "object" && b !== null) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return false;
}

function formatPropForJsx(key: string, value: unknown): string {
  if (typeof value === "string") {
    return `${key}={${JSON.stringify(value)}}`;
  }
  if (typeof value === "boolean") {
    return value ? key : `${key}={false}`;
  }
  if (value === null) {
    return `${key}={null}`;
  }
  return `${key}={${JSON.stringify(value)}}`;
}

function generateCode(
  blocks: BlockInstance[],
  vp: { w: number },
  canvasH: number,
  canvasBgColor: string | null,
): string {
  if (blocks.length === 0) return "// Canvas vide.";

  const sorted = [...blocks].sort((a, b) => a.zIndex - b.zIndex);
  const names = Array.from(new Set(
    sorted.flatMap((b) => {
      const entry = REGISTRY_MAP.get(b.componentName);
      if (!entry || entry.codegenMode === "placeholder") return [];
      return [b.componentName];
    }),
  ));
  const importLine = names.length > 0
    ? `import { ${names.join(", ")} } from "@brickslab./ui-web";`
    : null;

  const jsxBlocks = sorted.map((block) => {
    const entry = REGISTRY_MAP.get(block.componentName);
    if (!entry) return `      {/* ${block.componentName} */}`;

    const style = [
      `position: "absolute"`,
      `left: ${block.x}`,
      `top: ${block.y}`,
      `width: ${block.w}`,
      ...(block.h > 0 ? [`height: ${block.h}, overflow: "hidden"`] : []),
      ...(block.zIndex !== 0 ? [`zIndex: ${block.zIndex}`] : []),
    ].join(", ");

    const diffProps: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(block.props)) {
      const def = entry.propDefs.find((d) => d.key === key);
      const base = def ? def.defaultValue : entry.defaultProps[key];
      if (!valuesEqual(val, base)) diffProps[key] = val;
    }

    const propsStr = Object.entries(diffProps)
      .map(([k, v]) => formatPropForJsx(k, v))
      .join(" ");

    if (entry.codegenMode === "placeholder") {
      return [
        `      <div style={{ ${style} }}>`,
        `        {/* ${block.componentName}: configurez les props puis remplacez ce placeholder. */}`,
        `        <div style={{ border: "1px dashed #999", borderRadius: 8, padding: 12, fontSize: 12, color: "#555", background: "rgba(0,0,0,0.02)" }}>`,
        `          ${block.componentName} (placeholder)`,
        "        </div>",
        "      </div>",
      ].join("\n");
    }

    return [
      `      <div style={{ ${style} }}>`,
      `        <${block.componentName}${propsStr ? " " + propsStr : ""} />`,
      `      </div>`,
    ].join("\n");
  });

  return [
    ...(importLine ? [importLine, ""] : []),
    "export default function MyPage() {",
    "  return (",
    `    <div style={{ position: "relative", width: ${vp.w}, height: ${canvasH}, overflow: "hidden"${canvasBgColor ? `, backgroundColor: ${JSON.stringify(canvasBgColor)}` : ""} }}>`,
    ...jsxBlocks,
    "    </div>",
    "  );",
    "}",
  ].join("\n");
}

// ── Palette Item ───────────────────────────────────────────────────────────────

function PaletteItem({ entry }: { entry: RegistryEntry }) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentName", entry.name);
        e.dataTransfer.effectAllowed = "copy";
      }}
      title={entry.description}
      style={{
        padding: "7px 11px",
        borderRadius: 7,
        border: "1px solid var(--c-border)",
        backgroundColor: "var(--c-surface-elevated)",
        cursor: "grab",
        fontSize: 12,
        fontWeight: 500,
        color: "var(--color-fg)",
        userSelect: "none",
        transition: "background 0.12s, border-color 0.12s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.backgroundColor = "var(--c-brand-subtle)";
        el.style.borderColor = "var(--c-brand-border)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.backgroundColor = "var(--c-surface-elevated)";
        el.style.borderColor = "var(--c-border)";
      }}
    >
      {entry.name}
    </div>
  );
}

// ── Canvas Block ───────────────────────────────────────────────────────────────

function CanvasBlock({
  block,
  isSelected,
  onSelect,
  onDuplicate,
  onDelete,
  onBringForward,
  onSendBackward,
  onStartMove,
  onStartResize,
  onHeightMeasured,
}: {
  block: BlockInstance;
  isSelected: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  onStartMove: (e: React.MouseEvent) => void;
  onStartResize: (e: React.MouseEvent) => void;
  onHeightMeasured: (id: string, h: number) => void;
}) {
  const entry = REGISTRY_MAP.get(block.componentName);
  const blockDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = blockDivRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      onHeightMeasured(block.id, entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [block.id, onHeightMeasured]);

  return (
    <div
      ref={blockDivRef}
      data-block={block.id}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      style={{
        position: "absolute",
        left: block.x,
        top: block.y,
        width: block.w,
        height: block.h > 0 ? block.h : undefined,
        zIndex: block.zIndex,
        outline: isSelected ? "2px solid #CC4A48" : "2px solid transparent",
        outlineOffset: 2,
        borderRadius: 6,
        transition: "outline-color 0.1s",
      }}
    >
      {/* Toolbar (visible on hover/select) */}
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: -32,
            left: 0,
            display: "flex",
            alignItems: "center",
            gap: 2,
            backgroundColor: "#CC4A48",
            borderRadius: "5px 5px 0 0",
            padding: "3px 6px",
            zIndex: 9999,
            whiteSpace: "nowrap",
          }}
        >
          {/* Drag handle */}
          <span
            onMouseDown={onStartMove}
            style={{
              cursor: "move",
              color: "rgba(255,255,255,0.8)",
              fontSize: 13,
              padding: "0 4px",
              userSelect: "none",
            }}
            title="Déplacer"
          >
            ⠿
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "rgba(255,255,255,0.9)",
              padding: "0 6px",
              borderLeft: "1px solid rgba(255,255,255,0.3)",
              borderRight: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            {block.componentName}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onSendBackward(); }}
            title="Descendre d'un niveau"
            style={toolbarBtnStyle}
          >
            ↓
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onBringForward(); }}
            title="Monter d'un niveau"
            style={toolbarBtnStyle}
          >
            ↑
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
            title="Dupliquer"
            style={toolbarBtnStyle}
          >
            ⧉
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            title="Supprimer"
            style={{ ...toolbarBtnStyle, color: "rgba(255,255,255,0.9)" }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Component render */}
      <div style={{ width: "100%", height: "100%", overflow: block.h > 0 ? "hidden" : "visible", pointerEvents: "none" }}>
        {entry ? entry.render(block.props) : (
          <div style={{ padding: 12, fontSize: 12, color: "var(--color-muted)" }}>
            Composant inconnu
          </div>
        )}
      </div>

      {/* Resize handle (bottom-right) */}
      {isSelected && (
        <div
          onMouseDown={onStartResize}
          style={{
            position: "absolute",
            bottom: -4,
            right: -4,
            width: 12,
            height: 12,
            backgroundColor: "#CC4A48",
            borderRadius: 2,
            cursor: "se-resize",
            zIndex: 9999,
          }}
          title="Redimensionner"
        />
      )}

      {/* Right resize handle */}
      {isSelected && (
        <div
          onMouseDown={onStartResize}
          style={{
            position: "absolute",
            top: "50%",
            right: -4,
            transform: "translateY(-50%)",
            width: 8,
            height: 24,
            backgroundColor: "#CC4A48",
            borderRadius: 2,
            cursor: "e-resize",
            zIndex: 9999,
          }}
          title="Redimensionner la largeur"
        />
      )}
    </div>
  );
}

const toolbarBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "rgba(255,255,255,0.75)",
  fontSize: 13,
  lineHeight: 1,
  padding: "1px 4px",
  borderRadius: 3,
};

// ── Props Panel ────────────────────────────────────────────────────────────────

function PropsPanel({
  block,
  blocks,
  selectedId,
  onSelectBlock,
  onDeleteBlock,
  onBringForward,
  onSendBackward,
  onResetProps,
  onUpdateProp,
  onUpdateLayout,
}: {
  block: BlockInstance | null;
  blocks: BlockInstance[];
  selectedId: string | null;
  onSelectBlock: (id: string) => void;
  onDeleteBlock: (id: string) => void;
  onBringForward: (id: string) => void;
  onSendBackward: (id: string) => void;
  onResetProps: (id: string) => void;
  onUpdateProp: (id: string, key: string, value: unknown) => void;
  onUpdateLayout: (id: string, key: "x" | "y" | "w" | "h" | "zIndex", value: number) => void;
}) {
  const entry = block ? REGISTRY_MAP.get(block.componentName) : null;
  const sortedLayers = [...blocks].sort((a, b) => b.zIndex - a.zIndex || b.y - a.y);

  return (
    <div style={{ padding: 14 }}>
      <div style={groupStyle}>
        <div style={groupTitle}>Calques</div>
        {sortedLayers.length === 0 ? (
          <span style={{ fontSize: 12, color: "var(--color-muted)" }}>Aucun bloc sur le canvas</span>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {sortedLayers.map((layer) => {
              const isActive = selectedId === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => onSelectBlock(layer.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    width: "100%",
                    textAlign: "left",
                    padding: "7px 9px",
                    borderRadius: 7,
                    border: `1px solid ${isActive ? "rgba(204, 74, 72, 0.5)" : "var(--c-border)"}`,
                    backgroundColor: isActive ? "var(--c-brand-subtle)" : "var(--c-surface-elevated)",
                    color: isActive ? "var(--color-fg)" : "var(--color-muted)",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 145 }}>
                    {layer.componentName}
                  </span>
                  <span style={{ fontSize: 10, opacity: 0.75 }}>z{layer.zIndex}</span>
                </button>
              );
            })}
          </div>
        )}
        {block && (
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <button type="button" onClick={() => onSendBackward(block.id)} style={miniActionBtnStyle}>
              Couche -
            </button>
            <button type="button" onClick={() => onBringForward(block.id)} style={miniActionBtnStyle}>
              Couche +
            </button>
            <button
              type="button"
              onClick={() => onDeleteBlock(block.id)}
              style={{ ...miniActionBtnStyle, color: "#b8403e", borderColor: "rgba(184, 64, 62, 0.35)" }}
            >
              Suppr.
            </button>
          </div>
        )}
      </div>

      {!block ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            color: "var(--color-muted)",
            textAlign: "center",
            padding: "6px 10px 2px",
          }}
        >
          <span style={{ fontSize: 28 }}>☝️</span>
          <span style={{ fontSize: 12, lineHeight: 1.6 }}>
            Sélectionnez un composant sur le canvas pour éditer ses props
          </span>
        </div>
      ) : (
        <>
          <div style={sectionHeaderRowStyle}>
            <div style={{ ...sectionLabel, marginBottom: 0 }}>{block.componentName}</div>
            <button
              type="button"
              onClick={() => onResetProps(block.id)}
              style={miniResetBtnStyle}
            >
              Réinit. props
            </button>
          </div>

          {/* Layout */}
          <div style={groupStyle}>
            <div style={groupTitle}>Position & Taille</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {(["x", "y", "w", "h"] as const).map((key) => (
                <div key={key}>
                  <label style={labelStyle}>{key === "h" ? "H (0=auto)" : key.toUpperCase()}</label>
                  <input
                    type="number"
                    value={block[key]}
                    step={GRID}
                    onChange={(e) => onUpdateLayout(block.id, key, Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8 }}>
              <label style={labelStyle}>Couche (z-index)</label>
              <input
                type="number"
                value={block.zIndex}
                min={0}
                onChange={(e) => onUpdateLayout(block.id, "zIndex", Number(e.target.value))}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Component props */}
          {entry && entry.propDefs.length > 0 && (
            <div style={groupStyle}>
              <div style={groupTitle}>Props</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {entry.propDefs.map((def) => {
                  const val = block.props[def.key] ?? def.defaultValue;
                  const isColorBlockColorField = block.componentName === "ColorBlock" && (def.key === "color" || def.key === "borderColor");
                  const normalizedHex = normalizeHexColor(String(val ?? ""));
                  return (
                    <div key={def.key}>
                      <label style={labelStyle}>{def.label}</label>
                      {isColorBlockColorField ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {COLOR_SWATCHES.map((swatch) => {
                              const isSelected = normalizedHex === swatch.toLowerCase();
                              return (
                                <button
                                  key={`${def.key}-${swatch}`}
                                  type="button"
                                  onClick={() => onUpdateProp(block.id, def.key, swatch)}
                                  title={swatch}
                                  style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: 6,
                                    border: `1px solid ${isSelected ? "#CC4A48" : "var(--c-border)"}`,
                                    backgroundColor: swatch,
                                    cursor: "pointer",
                                    boxShadow: isSelected ? "0 0 0 2px rgba(204, 74, 72, 0.25)" : "none",
                                    padding: 0,
                                  }}
                                />
                              );
                            })}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <input
                              type="text"
                              value={String(val)}
                              onChange={(e) => onUpdateProp(block.id, def.key, e.target.value)}
                              placeholder="#CC4A48"
                              style={{ ...inputStyle, flex: 1 }}
                            />
                            <input
                              type="color"
                              value={normalizedHex ?? "#cc4a48"}
                              onChange={(e) => onUpdateProp(block.id, def.key, e.target.value)}
                              style={{
                                width: 34,
                                height: 34,
                                border: "1px solid var(--c-border)",
                                borderRadius: 6,
                                background: "transparent",
                                cursor: "pointer",
                                padding: 2,
                              }}
                              title="Sélecteur de couleur"
                            />
                          </div>
                        </div>
                      ) : def.type === "boolean" ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                          <input
                            type="checkbox"
                            checked={val as boolean}
                            onChange={(e) => onUpdateProp(block.id, def.key, e.target.checked)}
                            style={{ width: 15, height: 15, cursor: "pointer" }}
                          />
                          <span style={{ fontSize: 12, color: "var(--color-muted)" }}>
                            {val ? "Oui" : "Non"}
                          </span>
                        </div>
                      ) : def.type === "enum" ? (
                        <select
                          value={String(val)}
                          onChange={(e) => onUpdateProp(block.id, def.key, e.target.value)}
                          style={selectStyle}
                        >
                          {def.options!.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : def.type === "number" ? (
                        <input
                          type="number"
                          value={val as number}
                          onChange={(e) => onUpdateProp(block.id, def.key, Number(e.target.value))}
                          style={inputStyle}
                        />
                      ) : (
                        <input
                          type="text"
                          value={val as string}
                          onChange={(e) => onUpdateProp(block.id, def.key, e.target.value)}
                          style={inputStyle}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const miniActionBtnStyle: React.CSSProperties = {
  flex: 1,
  height: 28,
  borderRadius: 7,
  border: "1px solid var(--c-border)",
  backgroundColor: "var(--c-surface-elevated)",
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 700,
  cursor: "pointer",
};

const sectionLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  marginBottom: 12,
  opacity: 0.8,
};
const sectionHeaderRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  marginBottom: 12,
};
const miniResetBtnStyle: React.CSSProperties = {
  height: 24,
  padding: "0 8px",
  borderRadius: 6,
  border: "1px solid var(--c-border)",
  backgroundColor: "var(--c-surface-elevated)",
  color: "var(--color-muted)",
  fontSize: 10,
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap",
};
const groupStyle: React.CSSProperties = {
  marginBottom: 16,
  paddingBottom: 16,
  borderBottom: "1px solid var(--c-border)",
};
const groupTitle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  marginBottom: 10,
  opacity: 0.6,
};
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  color: "var(--color-muted)",
  marginBottom: 4,
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "6px 8px",
  borderRadius: 6,
  border: "1px solid var(--c-border)",
  backgroundColor: "var(--c-surface-elevated)",
  color: "var(--color-fg)",
  fontSize: 12,
  outline: "none",
  boxSizing: "border-box",
};
const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
};

// ── Code Modal ─────────────────────────────────────────────────────────────────

function CodeModal({ code, onClose }: { code: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 760,
          maxHeight: "82vh",
          backgroundColor: "var(--c-surface)",
          borderRadius: 14,
          border: "1px solid var(--c-border)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "13px 20px",
            borderBottom: "1px solid var(--c-border)",
            flexShrink: 0,
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 14, color: "var(--color-fg)" }}>Code exporté</span>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--color-muted)", padding: "2px 6px" }}
          >
            ✕
          </button>
        </div>
        <div style={{ overflowY: "auto", padding: 20, flex: 1 }}>
          <CodeBlock code={code} language="tsx" />
        </div>
      </div>
    </div>
  );
}

function ShortcutsModal({ onClose }: { onClose: () => void }) {
  const rows: Array<{ keys: string; label: string }> = [
    { keys: "Ctrl/Cmd + Z", label: "Annuler" },
    { keys: "Shift + Ctrl/Cmd + Z", label: "Rétablir" },
    { keys: "Ctrl/Cmd + C", label: "Copier le bloc sélectionné" },
    { keys: "Ctrl/Cmd + V", label: "Coller le bloc copié" },
    { keys: "Ctrl/Cmd + D", label: "Dupliquer le bloc sélectionné" },
    { keys: "Delete / Backspace", label: "Supprimer le bloc sélectionné" },
    { keys: "Flèches", label: "Déplacer le bloc (pas = grille)" },
    { keys: "Shift + Flèches", label: "Déplacer plus vite (pas x4)" },
    { keys: "Alt + Flèches", label: "Déplacer au pixel (pas fin)" },
    { keys: "?", label: "Afficher cette aide clavier" },
    { keys: "Escape", label: "Fermer les menus/modales" },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.48)",
        backdropFilter: "blur(2px)",
        zIndex: 180,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 640,
          maxHeight: "84vh",
          overflow: "hidden",
          backgroundColor: "var(--c-surface)",
          border: "1px solid var(--c-border)",
          borderRadius: 14,
          boxShadow: "0 16px 44px rgba(0,0,0,0.24)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: "1px solid var(--c-border)",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--color-fg)" }}>Raccourcis clavier</span>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--color-muted)", padding: "2px 6px" }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: 16, overflowY: "auto" }}>
          <div style={{ display: "grid", gap: 8 }}>
            {rows.map((row) => (
              <div
                key={row.keys + row.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(170px, 220px) 1fr",
                  gap: 10,
                  alignItems: "center",
                  padding: "8px 10px",
                  border: "1px solid var(--c-border)",
                  borderRadius: 8,
                  backgroundColor: "var(--c-surface-elevated)",
                }}
              >
                <code
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    width: "fit-content",
                    maxWidth: "100%",
                    padding: "4px 8px",
                    borderRadius: 6,
                    border: "1px solid var(--c-border)",
                    backgroundColor: "var(--c-surface)",
                    color: "var(--color-fg)",
                    fontSize: 12,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.keys}
                </code>
                <span style={{ fontSize: 12, color: "var(--color-fg)" }}>{row.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function MockupBuilderPage() {
  const [blocks, setBlocks] = useState<BlockInstance[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewport, setViewport] = useState<ViewportKey>("desktop");
  const [canvasH, setCanvasH] = useState<HeightPreset>(900);
  const [canvasBgColor, setCanvasBgColor] = useState<string | null>(null);
  const [canvasBgHexInput, setCanvasBgHexInput] = useState("");
  const [zoom, setZoom] = useState<ZoomLevel>(0.75);
  const [showGrid, setShowGrid] = useState(true);
  const [showAlignmentHelpers, setShowAlignmentHelpers] = useState(true);
  const [isDragOver, setIsDragOver] = useState(false);
  const [search, setSearch] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [paletteTab, setPaletteTab] = useState<"components" | "layouts">("components");
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [measuredHeights, setMeasuredHeights] = useState<Record<string, number>>({});
  const [pendingReflow, setPendingReflow] = useState(false);
  const [canRestore, setCanRestore] = useState(false);
  const [autosaveReady, setAutosaveReady] = useState(false);
  const [isCompactHeader, setIsCompactHeader] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [actionsMenuAnchor, setActionsMenuAnchor] = useState<{ top: number; right: number } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [alignmentGuides, setAlignmentGuides] = useState<AlignmentGuides>({ vertical: [], horizontal: [] });
  const [, setHistoryTick] = useState(0);

  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState>(null);
  const dragOriginRef = useRef<BlockInstance[] | null>(null);
  const blocksRef = useRef<BlockInstance[]>([]);
  const undoStackRef = useRef<BlockInstance[][]>([]);
  const redoStackRef = useRef<BlockInstance[][]>([]);
  const autosaveDraftRef = useRef<AutosaveDraft | null>(null);
  const clipboardBlockRef = useRef<BlockInstance | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const actionsButtonRef = useRef<HTMLButtonElement>(null);
  const actionsMenuRef = useRef<HTMLDivElement>(null);

  const selectedBlock = useMemo(
    () => blocks.find((b) => b.id === selectedId) ?? null,
    [blocks, selectedId],
  );
  const sortedCanvasBlocks = useMemo(
    () => [...blocks].sort((a, b) => a.zIndex - b.zIndex),
    [blocks],
  );
  const vp = VIEWPORTS[viewport];
  const viewportNames: Record<ViewportKey, string> = {
    desktop: "Desktop",
    tablet: "Tablette",
    mobile: "Mobile",
  };
  const viewportNamesCompact: Record<ViewportKey, string> = {
    desktop: "D",
    tablet: "T",
    mobile: "M",
  };
  const canUndo = undoStackRef.current.length > 0;
  const canRedo = redoStackRef.current.length > 0;
  const hasSecondaryActions = canRestore || blocks.length > 1 || blocks.length > 0;
  type BlocksUpdater = BlockInstance[] | ((prev: BlockInstance[]) => BlockInstance[]);

  const setGuides = useCallback((next: AlignmentGuides) => {
    setAlignmentGuides((prev) => (guidesEqual(prev, next) ? prev : next));
  }, []);

  const clearGuides = useCallback(() => {
    setGuides({ vertical: [], horizontal: [] });
  }, [setGuides]);

  const getEffectiveHeight = useCallback((block: BlockInstance): number => {
    if (block.h > 0) return block.h;
    return measuredHeights[block.id] ?? 80;
  }, [measuredHeights]);

  const clampXToCanvas = useCallback((x: number, width: number): number => {
    const boundedWidth = Math.max(0, width);
    return clampValue(x, 0, Math.max(0, vp.w - boundedWidth));
  }, [vp.w]);

  const clampYToCanvas = useCallback((y: number, height: number): number => {
    const boundedHeight = Math.max(0, height);
    return clampValue(y, 0, Math.max(0, canvasH - boundedHeight));
  }, [canvasH]);

  const clampWidthToCanvas = useCallback((x: number, width: number): number => {
    const minWidth = Math.min(GRID * 10, vp.w);
    const safeX = clampValue(x, 0, vp.w);
    const maxWidth = Math.max(minWidth, vp.w - safeX);
    return clampValue(width, minWidth, maxWidth);
  }, [vp.w]);

  const clampHeightToCanvas = useCallback((y: number, height: number): number => {
    const safeY = clampValue(y, 0, canvasH);
    const maxHeight = Math.max(0, canvasH - safeY);
    return clampValue(height, 0, maxHeight);
  }, [canvasH]);

  const clampBlockToCanvas = useCallback((block: BlockInstance): BlockInstance => {
    const normalizedWidth = clampValue(block.w, Math.min(GRID * 10, vp.w), vp.w);
    const x = clampXToCanvas(block.x, normalizedWidth);
    const w = clampWidthToCanvas(x, normalizedWidth);
    const effectiveHeight = block.h > 0 ? block.h : getEffectiveHeight(block);
    const y = clampYToCanvas(block.y, effectiveHeight);
    const h = block.h > 0 ? clampHeightToCanvas(y, block.h) : 0;
    if (x === block.x && y === block.y && w === block.w && h === block.h) return block;
    return { ...block, x, y, w, h };
  }, [canvasH, clampHeightToCanvas, clampWidthToCanvas, clampXToCanvas, clampYToCanvas, getEffectiveHeight, vp.w]);

  const computeMoveAlignment = useCallback((
    target: BlockInstance,
    allBlocks: BlockInstance[],
    rawX: number,
    rawY: number,
  ): { x: number; y: number; guides: AlignmentGuides } => {
    const targetH = getEffectiveHeight(target);
    const others = allBlocks.filter((b) => b.id !== target.id);

    const verticalGuides: number[] = [0, vp.w / 2, vp.w];
    const horizontalGuides: number[] = [0, canvasH / 2, canvasH];

    for (const block of others) {
      const h = getEffectiveHeight(block);
      verticalGuides.push(block.x, block.x + block.w / 2, block.x + block.w);
      horizontalGuides.push(block.y, block.y + h / 2, block.y + h);
    }

    const xPoints = [
      { value: rawX, offset: 0 },
      { value: rawX + target.w / 2, offset: target.w / 2 },
      { value: rawX + target.w, offset: target.w },
    ];
    const yPoints = [
      { value: rawY, offset: 0 },
      { value: rawY + targetH / 2, offset: targetH / 2 },
      { value: rawY + targetH, offset: targetH },
    ];

    let xSnap: { guide: number; delta: number } | null = null;
    let ySnap: { guide: number; delta: number } | null = null;

    for (const guide of verticalGuides) {
      for (const point of xPoints) {
        const delta = guide - point.value;
        if (Math.abs(delta) > ALIGN_SNAP_THRESHOLD) continue;
        if (!xSnap || Math.abs(delta) < Math.abs(xSnap.delta)) {
          xSnap = { guide, delta };
        }
      }
    }

    for (const guide of horizontalGuides) {
      for (const point of yPoints) {
        const delta = guide - point.value;
        if (Math.abs(delta) > ALIGN_SNAP_THRESHOLD) continue;
        if (!ySnap || Math.abs(delta) < Math.abs(ySnap.delta)) {
          ySnap = { guide, delta };
        }
      }
    }

    return {
      x: clampXToCanvas(rawX + (xSnap?.delta ?? 0), target.w),
      y: clampYToCanvas(rawY + (ySnap?.delta ?? 0), targetH),
      guides: {
        vertical: xSnap ? [xSnap.guide] : [],
        horizontal: ySnap ? [ySnap.guide] : [],
      },
    };
  }, [canvasH, clampXToCanvas, clampYToCanvas, getEffectiveHeight, vp.w]);

  const computeResizeAlignment = useCallback((
    target: BlockInstance,
    allBlocks: BlockInstance[],
    rawW: number,
    rawH: number,
  ): { w: number; h: number; guides: AlignmentGuides } => {
    const others = allBlocks.filter((b) => b.id !== target.id);
    const verticalGuides: number[] = [0, vp.w / 2, vp.w];
    const horizontalGuides: number[] = [0, canvasH / 2, canvasH];

    for (const block of others) {
      const h = getEffectiveHeight(block);
      verticalGuides.push(block.x, block.x + block.w / 2, block.x + block.w);
      horizontalGuides.push(block.y, block.y + h / 2, block.y + h);
    }

    const currentRight = target.x + rawW;
    const currentBottom = target.y + rawH;
    let rightSnap: { guide: number; delta: number } | null = null;
    let bottomSnap: { guide: number; delta: number } | null = null;

    for (const guide of verticalGuides) {
      const delta = guide - currentRight;
      if (Math.abs(delta) > ALIGN_SNAP_THRESHOLD) continue;
      if (!rightSnap || Math.abs(delta) < Math.abs(rightSnap.delta)) {
        rightSnap = { guide, delta };
      }
    }

    for (const guide of horizontalGuides) {
      const delta = guide - currentBottom;
      if (Math.abs(delta) > ALIGN_SNAP_THRESHOLD) continue;
      if (!bottomSnap || Math.abs(delta) < Math.abs(bottomSnap.delta)) {
        bottomSnap = { guide, delta };
      }
    }

    const snappedW = clampWidthToCanvas(target.x, rawW + (rightSnap?.delta ?? 0));
    const snappedH = clampHeightToCanvas(target.y, rawH + (bottomSnap?.delta ?? 0));

    return {
      w: snappedW,
      h: snappedH,
      guides: {
        vertical: rightSnap ? [rightSnap.guide] : [],
        horizontal: bottomSnap ? [bottomSnap.guide] : [],
      },
    };
  }, [canvasH, clampHeightToCanvas, clampWidthToCanvas, getEffectiveHeight, vp.w]);

  const touchHistory = useCallback(() => {
    setHistoryTick((v) => v + 1);
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 1300);
  }, []);

  useEffect(() => {
    setCanvasBgHexInput(canvasBgColor ?? "");
  }, [canvasBgColor]);

  const isCanvasBgHexDraftValid = useMemo(() => {
    const trimmed = canvasBgHexInput.trim();
    if (!trimmed) return true;
    return normalizeHexColor(trimmed) !== null;
  }, [canvasBgHexInput]);

  const applyCanvasBgHexInput = useCallback(() => {
    const trimmed = canvasBgHexInput.trim();
    if (!trimmed) {
      setCanvasBgColor(null);
      return;
    }
    const normalized = normalizeHexColor(trimmed);
    if (!normalized) {
      showToast("Couleur HEX invalide");
      return;
    }
    setCanvasBgColor(normalized);
    setCanvasBgHexInput(normalized);
  }, [canvasBgHexInput, showToast]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const setBlocksDirect = useCallback((updater: BlocksUpdater) => {
    const prev = blocksRef.current;
    const next = typeof updater === "function"
      ? (updater as (current: BlockInstance[]) => BlockInstance[])(prev)
      : updater;
    if (blocksEqual(prev, next)) return;
    blocksRef.current = next;
    setBlocks(next);
  }, []);

  const pushUndoSnapshot = useCallback((snapshot: BlockInstance[]) => {
    const undoStack = undoStackRef.current;
    const snapshotClone = cloneBlocks(snapshot);
    const last = undoStack[undoStack.length - 1];
    if (last && blocksEqual(last, snapshotClone)) return;
    undoStack.push(snapshotClone);
    if (undoStack.length > HISTORY_LIMIT) undoStack.shift();
    redoStackRef.current = [];
    touchHistory();
  }, [touchHistory]);

  const setBlocksWithHistory = useCallback((
    updater: BlocksUpdater,
    options?: { skipHistory?: boolean },
  ) => {
    const prev = blocksRef.current;
    const next = typeof updater === "function"
      ? (updater as (current: BlockInstance[]) => BlockInstance[])(prev)
      : updater;
    if (blocksEqual(prev, next)) return;
    if (!options?.skipHistory) pushUndoSnapshot(prev);
    blocksRef.current = next;
    setBlocks(next);
  }, [pushUndoSnapshot]);

  const undo = useCallback(() => {
    const undoStack = undoStackRef.current;
    const previous = undoStack.pop();
    if (!previous) return;

    const current = cloneBlocks(blocksRef.current);
    const redoStack = redoStackRef.current;
    const lastRedo = redoStack[redoStack.length - 1];
    if (!lastRedo || !blocksEqual(lastRedo, current)) {
      redoStack.push(current);
      if (redoStack.length > HISTORY_LIMIT) redoStack.shift();
    }

    const next = cloneBlocks(previous);
    blocksRef.current = next;
    setBlocks(next);
    setSelectedId((prev) => (prev && next.some((b) => b.id === prev) ? prev : null));
    touchHistory();
  }, [touchHistory]);

  const redo = useCallback(() => {
    const redoStack = redoStackRef.current;
    const restored = redoStack.pop();
    if (!restored) return;

    const current = cloneBlocks(blocksRef.current);
    const undoStack = undoStackRef.current;
    const lastUndo = undoStack[undoStack.length - 1];
    if (!lastUndo || !blocksEqual(lastUndo, current)) {
      undoStack.push(current);
      if (undoStack.length > HISTORY_LIMIT) undoStack.shift();
    }

    const next = cloneBlocks(restored);
    blocksRef.current = next;
    setBlocks(next);
    setSelectedId((prev) => (prev && next.some((b) => b.id === prev) ? prev : null));
    touchHistory();
  }, [touchHistory]);

  useEffect(() => {
    blocksRef.current = blocks;
  }, [blocks]);

  useEffect(() => {
    const onResize = () => {
      setIsCompactHeader(window.innerWidth <= HEADER_COMPACT_BREAKPOINT);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const updateActionsMenuAnchor = useCallback(() => {
    const button = actionsButtonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    setActionsMenuAnchor({
      top: rect.bottom + 6,
      right: Math.max(8, window.innerWidth - rect.right),
    });
  }, []);

  useEffect(() => {
    if (!showActionsMenu) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (actionsMenuRef.current?.contains(target)) return;
      if (actionsButtonRef.current?.contains(target)) return;
      setShowActionsMenu(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowActionsMenu(false);
    };

    const onViewportChange = () => {
      updateActionsMenuAnchor();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("scroll", onViewportChange, true);
    updateActionsMenuAnchor();
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("scroll", onViewportChange, true);
    };
  }, [showActionsMenu, updateActionsMenuAnchor]);

  // ── Document-level mouse handlers ──

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const d = dragRef.current;
      if (!d) return;

      const deltaX = (e.clientX - d.startMouseX) / zoom;
      const deltaY = (e.clientY - d.startMouseY) / zoom;

      if (d.type === "move") {
        const allBlocks = blocksRef.current;
        const target = allBlocks.find((b) => b.id === d.blockId);
        if (!target) return;
        const targetH = getEffectiveHeight(target);
        const rawX = snapVal(d.startBlockX + deltaX);
        const rawY = snapVal(d.startBlockY + deltaY);
        const aligned = showAlignmentHelpers
          ? computeMoveAlignment(target, allBlocks, rawX, rawY)
          : {
            x: clampXToCanvas(rawX, target.w),
            y: clampYToCanvas(rawY, targetH),
            guides: { vertical: [], horizontal: [] },
          };
        if (showAlignmentHelpers) {
          setGuides(aligned.guides);
        } else {
          clearGuides();
        }

        setBlocksDirect((prev) =>
          prev.map((b) =>
            b.id !== d.blockId ? b : {
              ...b,
              x: aligned.x,
              y: aligned.y,
            }
          )
        );
      } else if (d.type === "resize") {
        const allBlocks = blocksRef.current;
        const target = allBlocks.find((b) => b.id === d.blockId);
        if (!target) return;
        const rawW = snapVal(d.startW + deltaX);
        const rawH = snapVal(d.startH + deltaY);
        const aligned = showAlignmentHelpers
          ? computeResizeAlignment(target, allBlocks, rawW, rawH)
          : {
            w: clampWidthToCanvas(target.x, rawW),
            h: clampHeightToCanvas(target.y, rawH),
            guides: { vertical: [], horizontal: [] },
          };
        if (showAlignmentHelpers) {
          setGuides(aligned.guides);
        } else {
          clearGuides();
        }

        setBlocksDirect((prev) =>
          prev.map((b) =>
            b.id !== d.blockId ? b : {
              ...b,
              w: aligned.w,
              h: aligned.h,
            }
          )
        );
      }
    };

    const onUp = () => {
      const origin = dragOriginRef.current;
      if (origin && !blocksEqual(origin, blocksRef.current)) {
        pushUndoSnapshot(origin);
      }
      dragRef.current = null;
      dragOriginRef.current = null;
      clearGuides();
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [
    zoom,
    setBlocksDirect,
    pushUndoSnapshot,
    computeMoveAlignment,
    computeResizeAlignment,
    setGuides,
    clearGuides,
    showAlignmentHelpers,
    clampHeightToCanvas,
    clampWidthToCanvas,
    clampXToCanvas,
    clampYToCanvas,
    getEffectiveHeight,
  ]);

  useEffect(() => {
    if (showAlignmentHelpers) return;
    clearGuides();
  }, [showAlignmentHelpers, clearGuides]);

  useEffect(() => {
    setBlocksDirect((prev) => prev.map(clampBlockToCanvas));
  }, [setBlocksDirect, clampBlockToCanvas]);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showShortcuts) {
        if (e.key === "Escape") {
          e.preventDefault();
          setShowShortcuts(false);
        }
        return;
      }
      if (isTypingTarget(e.target)) return;

      if (e.key === "?") {
        e.preventDefault();
        setShowShortcuts(true);
        return;
      }

      const isMeta = e.metaKey || e.ctrlKey;
      const isUndoShortcut = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z";
      if (isUndoShortcut) {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
          showToast("Rétabli");
        } else {
          undo();
          showToast("Annulé");
        }
        return;
      }

      if (isMeta && e.key.toLowerCase() === "c") {
        if (!selectedId) return;
        const source = blocksRef.current.find((b) => b.id === selectedId);
        if (!source) return;
        e.preventDefault();
        clipboardBlockRef.current = { ...source, props: { ...source.props } };
        showToast("Bloc copié");
        return;
      }

      if (isMeta && e.key.toLowerCase() === "v") {
        const source = clipboardBlockRef.current;
        if (!source) return;
        e.preventDefault();
        const currentBlocks = blocksRef.current;
        const maxZ = currentBlocks.length > 0 ? Math.max(...currentBlocks.map((b) => b.zIndex)) : source.zIndex;
        const sourceEffectiveH = getEffectiveHeight(source);
        const copy: BlockInstance = {
          ...source,
          id: uid(),
          x: clampXToCanvas(snapVal(source.x + GRID * 2), source.w),
          y: clampYToCanvas(snapVal(source.y + GRID * 2), sourceEffectiveH),
          zIndex: maxZ + 1,
          props: { ...source.props },
        };
        setBlocksWithHistory((prev) => [...prev, copy]);
        setSelectedId(copy.id);
        showToast("Bloc collé");
        return;
      }

      if (isMeta && e.key.toLowerCase() === "d") {
        if (!selectedId) return;
        const source = blocksRef.current.find((b) => b.id === selectedId);
        if (!source) return;
        e.preventDefault();
        const currentBlocks = blocksRef.current;
        const maxZ = currentBlocks.length > 0 ? Math.max(...currentBlocks.map((b) => b.zIndex)) : source.zIndex;
        const sourceEffectiveH = getEffectiveHeight(source);
        const copy: BlockInstance = {
          ...source,
          id: uid(),
          x: clampXToCanvas(snapVal(source.x + GRID * 2), source.w),
          y: clampYToCanvas(snapVal(source.y + GRID * 2), sourceEffectiveH),
          zIndex: maxZ + 1,
          props: { ...source.props },
        };
        setBlocksWithHistory((prev) => [...prev, copy]);
        setSelectedId(copy.id);
        showToast("Bloc dupliqué");
        return;
      }

      if (selectedId && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const step = e.altKey ? 1 : e.shiftKey ? GRID * 4 : GRID;
        const dx = e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0;
        const dy = e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0;

        setBlocksWithHistory((prev) =>
          prev.map((b) => {
            if (b.id !== selectedId) return b;
            const effectiveH = getEffectiveHeight(b);
            const nextXRaw = clampXToCanvas(b.x + dx, b.w);
            const nextYRaw = clampYToCanvas(b.y + dy, effectiveH);
            const nextX = e.altKey ? nextXRaw : clampXToCanvas(snapVal(nextXRaw), b.w);
            const nextY = e.altKey ? nextYRaw : clampYToCanvas(snapVal(nextYRaw), effectiveH);
            return {
              ...b,
              x: nextX,
              y: nextY,
            };
          }),
        );
        return;
      }

      if (e.key !== "Delete" && e.key !== "Backspace") return;
      if (!selectedId) return;
      setBlocksWithHistory((prev) => prev.filter((b) => b.id !== selectedId));
      setSelectedId(null);
      showToast("Bloc supprimé");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [
    selectedId,
    undo,
    redo,
    setBlocksWithHistory,
    showShortcuts,
    showToast,
    clampXToCanvas,
    clampYToCanvas,
    getEffectiveHeight,
  ]);

  // ── Drop from palette ──
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const componentName = e.dataTransfer.getData("componentName");
    if (!componentName || !canvasRef.current) return;
    const entry = REGISTRY_MAP.get(componentName);
    if (!entry) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const rawX = (e.clientX - rect.left) / zoom;
    const rawY = (e.clientY - rect.top) / zoom;
    const minWidth = Math.min(GRID * 10, vp.w);
    const blockW = clampValue(entry.defaultW ?? DEFAULT_W, minWidth, vp.w);
    const blockH = Math.max(0, entry.defaultH ?? 0);
    const blockEffectiveH = blockH > 0 ? blockH : 80;
    const x = clampXToCanvas(snapVal(rawX - blockW / 2), blockW);
    const y = clampYToCanvas(snapVal(rawY - 20), blockEffectiveH);
    const currentBlocks = blocksRef.current;
    const maxZ = currentBlocks.length > 0 ? Math.max(...currentBlocks.map((b) => b.zIndex)) : -1;

    const newBlock: BlockInstance = {
      id: uid(),
      componentName,
      props: { ...entry.defaultProps },
      x, y,
      w: blockW,
      h: blockH > 0 ? clampHeightToCanvas(y, blockH) : 0,
      zIndex: maxZ + 1,
    };
    setBlocksWithHistory((prev) => [...prev, newBlock]);
    setSelectedId(newBlock.id);
  }, [zoom, setBlocksWithHistory, clampHeightToCanvas, clampXToCanvas, clampYToCanvas, vp.w]);

  // ── Start move ──
  const startMove = useCallback((e: React.MouseEvent, block: BlockInstance) => {
    e.stopPropagation();
    e.preventDefault();
    clearGuides();
    dragOriginRef.current = cloneBlocks(blocksRef.current);
    dragRef.current = {
      type: "move",
      blockId: block.id,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startBlockX: block.x,
      startBlockY: block.y,
    };
    setSelectedId(block.id);
  }, [clearGuides]);

  // ── Start resize ──
  const startResize = useCallback((e: React.MouseEvent, block: BlockInstance) => {
    e.stopPropagation();
    e.preventDefault();
    clearGuides();
    dragOriginRef.current = cloneBlocks(blocksRef.current);
    const blockEl = (e.currentTarget as HTMLElement).closest("[data-block]") as HTMLElement | null;
    const currentH = block.h > 0 ? block.h : (blockEl?.offsetHeight ?? 80);
    dragRef.current = {
      type: "resize",
      blockId: block.id,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startW: block.w,
      startH: currentH,
    };
  }, [clearGuides]);

  // ── Layout & prop updates ──
  const updateLayout = useCallback((id: string, key: "x"|"y"|"w"|"h"|"zIndex", value: number) => {
    if (!Number.isFinite(value)) return;
    setBlocksWithHistory((prev) => prev.map((b) => {
      if (b.id !== id) return b;
      if (key === "zIndex") {
        return { ...b, zIndex: Math.max(0, Math.round(value)) };
      }
      const next = { ...b, [key]: value };
      if (key === "h" && value <= 0) {
        next.h = 0;
      }
      return clampBlockToCanvas(next);
    }));
  }, [clampBlockToCanvas, setBlocksWithHistory]);

  const updateProp = useCallback((id: string, key: string, value: unknown) => {
    setBlocksWithHistory((prev) => prev.map((b) => b.id === id ? { ...b, props: { ...b.props, [key]: value } } : b));
  }, [setBlocksWithHistory]);

  const resetBlockProps = useCallback((id: string) => {
    const target = blocksRef.current.find((b) => b.id === id);
    if (!target) return;
    const entry = REGISTRY_MAP.get(target.componentName);
    if (!entry) return;
    const defaultProps = Object.fromEntries(
      Object.entries(entry.defaultProps).map(([k, v]) => [k, cloneValue(v)]),
    );
    setBlocksWithHistory((prev) => prev.map((b) => b.id === id ? { ...b, props: defaultProps } : b));
    showToast("Props réinitialisées");
  }, [setBlocksWithHistory, showToast]);

  const deleteBlock = useCallback((id: string) => {
    setBlocksWithHistory((prev) => prev.filter((b) => b.id !== id));
    setSelectedId((prev) => (prev === id ? null : prev));
  }, [setBlocksWithHistory]);

  const duplicateBlock = useCallback((id: string) => {
    const currentBlocks = blocksRef.current;
    const source = currentBlocks.find((b) => b.id === id);
    if (!source) return;
    const maxZ = currentBlocks.length > 0 ? Math.max(...currentBlocks.map((b) => b.zIndex)) : source.zIndex;
    const sourceEffectiveH = getEffectiveHeight(source);
    const copy: BlockInstance = {
      ...source,
      id: uid(),
      x: clampXToCanvas(snapVal(source.x + GRID * 2), source.w),
      y: clampYToCanvas(snapVal(source.y + GRID * 2), sourceEffectiveH),
      zIndex: maxZ + 1,
      props: { ...source.props },
    };
    setBlocksWithHistory((prev) => [...prev, copy]);
    setSelectedId(copy.id);
  }, [setBlocksWithHistory, clampXToCanvas, clampYToCanvas, getEffectiveHeight]);

  const bringForward = useCallback((id: string) => {
    setBlocksWithHistory((prev) => prev.map((b) => b.id === id ? { ...b, zIndex: b.zIndex + 1 } : b));
  }, [setBlocksWithHistory]);

  const sendBackward = useCallback((id: string) => {
    setBlocksWithHistory((prev) => prev.map((b) => b.id === id ? { ...b, zIndex: Math.max(0, b.zIndex - 1) } : b));
  }, [setBlocksWithHistory]);

  const searchNeedle = useMemo(() => search.trim().toLowerCase(), [search]);
  const filteredRegistry = useMemo(
    () => FULL_REGISTRY.filter((entry) => {
      if (!searchNeedle) return true;
      const haystack = `${entry.name} ${entry.category} ${entry.description}`.toLowerCase();
      return haystack.includes(searchNeedle);
    }),
    [searchNeedle],
  );

  // ── Height measurement & reflow ──

  const handleHeightMeasured = useCallback((id: string, h: number) => {
    setMeasuredHeights((prev) => {
      if (prev[id] === h) return prev;
      return { ...prev, [id]: h };
    });
  }, []);

  const reflow = useCallback((currentBlocks: BlockInstance[], heights: Record<string, number>) => {
    const GAP = 16;
    const BUCKET_SIZE = 96;
    const isBackgroundLayer = (block: BlockInstance): boolean => block.componentName === "ColorBlock";
    // Sort by y, then x (preserve horizontal bands)
    const sorted = [...currentBlocks].sort((a, b) => a.y - b.y || a.x - b.x);
    type PlacedBlock = BlockInstance & { measuredH: number; bottom: number };
    const placed: PlacedBlock[] = [];
    const buckets = new Map<number, PlacedBlock[]>();

    const getBucketRange = (x: number, w: number): [number, number] => {
      const start = Math.floor(x / BUCKET_SIZE);
      const end = Math.floor((x + Math.max(1, w) - 1) / BUCKET_SIZE);
      return [start, end];
    };

    const addToBuckets = (block: PlacedBlock) => {
      const [start, end] = getBucketRange(block.x, block.w);
      for (let i = start; i <= end; i += 1) {
        const list = buckets.get(i);
        if (list) {
          list.push(block);
        } else {
          buckets.set(i, [block]);
        }
      }
    };

    const collectCandidates = (x: number, w: number): PlacedBlock[] => {
      const [start, end] = getBucketRange(x, w);
      const set = new Set<PlacedBlock>();
      for (let i = start; i <= end; i += 1) {
        const list = buckets.get(i);
        if (!list) continue;
        for (const block of list) set.add(block);
      }
      return Array.from(set);
    };

    for (const block of sorted) {
      const measuredH = heights[block.id] ?? (block.h > 0 ? block.h : 80);
      if (isBackgroundLayer(block)) {
        placed.push({
          ...block,
          y: block.y,
          measuredH,
          bottom: block.y + measuredH,
        });
        continue;
      }

      let candidateY = block.y;
      const blockRight = block.x + block.w;
      const candidates = collectCandidates(block.x, block.w);

      let changed = true;
      while (changed) {
        changed = false;
        let nextY = candidateY;
        const blockBottom = candidateY + measuredH;
        for (const p of candidates) {
          const xOverlap = block.x < p.x + p.w && blockRight > p.x;
          if (!xOverlap) continue;
          if (candidateY < p.bottom && blockBottom > p.y) {
            nextY = Math.max(nextY, p.bottom + GAP);
          }
        }
        if (nextY !== candidateY) {
          candidateY = nextY;
          changed = true;
        }
      }

      const placedBlock: PlacedBlock = {
        ...block,
        y: candidateY,
        measuredH,
        bottom: candidateY + measuredH,
      };
      placed.push(placedBlock);
      addToBuckets(placedBlock);
    }

    const yById = new Map(placed.map((p) => [p.id, p.y]));
    return currentBlocks.map((b) => {
      const nextY = yById.get(b.id);
      if (nextY === undefined || nextY === b.y) return b;
      return { ...b, y: nextY };
    });
  }, []);

  // Auto-reflow after preset load once all heights measured
  useEffect(() => {
    if (!pendingReflow) return;
    const allMeasured = blocks.every((b) => b.id in measuredHeights);
    if (!allMeasured) return;
    setBlocksWithHistory((prev) => reflow(prev, measuredHeights), { skipHistory: true });
    setPendingReflow(false);
  }, [pendingReflow, blocks, measuredHeights, reflow, setBlocksWithHistory]);

  const loadLayout = useCallback((preset: LayoutPreset) => {
    const hasBlocks = blocksRef.current.length > 0;
    const confirmed = !hasBlocks || window.confirm(`Charger "${preset.name}" ? Le canvas actuel sera remplacé.`);
    if (!confirmed) return;
    const newBlocks = preset.blocks.map((b) => ({ ...b, id: uid(), props: { ...b.props } }));
    setMeasuredHeights({});
    setBlocksWithHistory(newBlocks);
    setPendingReflow(true);
    setSelectedId(null);
    setViewport(preset.viewport);
    setCanvasH(preset.canvasH);
    setZoom(0.75);
  }, [setBlocksWithHistory]);

  // ── Autosave ──
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(AUTOSAVE_STORAGE_KEY);
      if (!raw) {
        setCanRestore(false);
        return;
      }
      const parsed = JSON.parse(raw) as Partial<AutosaveDraft>;
      if (!Array.isArray(parsed.blocks) || parsed.blocks.length === 0) {
        window.localStorage.removeItem(AUTOSAVE_STORAGE_KEY);
        setCanRestore(false);
        return;
      }
      const viewportValue = parsed.viewport && parsed.viewport in VIEWPORTS ? parsed.viewport as ViewportKey : "desktop";
      const canvasHValue = typeof parsed.canvasH === "number" && HEIGHT_PRESETS.includes(parsed.canvasH as HeightPreset)
        ? parsed.canvasH as HeightPreset
        : 900;
      const zoomValue = typeof parsed.zoom === "number" && ZOOM_LEVELS.includes(parsed.zoom as ZoomLevel)
        ? parsed.zoom as ZoomLevel
        : 0.75;
      const canvasBgColorValue = typeof parsed.canvasBgColor === "string" ? parsed.canvasBgColor : null;
      const showGridValue = typeof parsed.showGrid === "boolean" ? parsed.showGrid : true;
      const draft: AutosaveDraft = {
        version: 1,
        savedAt: typeof parsed.savedAt === "string" ? parsed.savedAt : new Date().toISOString(),
        viewport: viewportValue,
        canvasH: canvasHValue,
        canvasBgColor: canvasBgColorValue,
        zoom: zoomValue,
        showGrid: showGridValue,
        blocks: cloneBlocks(parsed.blocks as BlockInstance[]),
      };
      autosaveDraftRef.current = draft;
      setCanRestore(true);
    } catch {
      window.localStorage.removeItem(AUTOSAVE_STORAGE_KEY);
      setCanRestore(false);
    } finally {
      setAutosaveReady(true);
    }
  }, []);

  useEffect(() => {
    if (!autosaveReady) return;

    const timeoutId = window.setTimeout(() => {
      try {
        if (blocks.length === 0) {
          // Keep the latest non-empty draft so users can restore after an accidental clear.
          return;
        }
        const draft: AutosaveDraft = {
          version: 1,
          savedAt: new Date().toISOString(),
          viewport,
          canvasH,
          canvasBgColor,
          zoom,
          showGrid,
          blocks: cloneBlocks(blocks),
        };
        window.localStorage.setItem(AUTOSAVE_STORAGE_KEY, JSON.stringify(draft));
        autosaveDraftRef.current = draft;
        setCanRestore(true);
      } catch {
        // Ignore storage errors (private mode / quota exceeded).
      }
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [autosaveReady, blocks, viewport, canvasH, canvasBgColor, zoom, showGrid]);

  const restoreAutosave = useCallback(() => {
    const draft = autosaveDraftRef.current;
    if (!draft || draft.blocks.length === 0) return;
    const hasBlocks = blocksRef.current.length > 0;
    const confirmed = !hasBlocks || window.confirm("Restaurer le brouillon autosauvegardé ? Le canvas actuel sera remplacé.");
    if (!confirmed) return;

    setMeasuredHeights({});
    setPendingReflow(false);
    setBlocksWithHistory(cloneBlocks(draft.blocks));
    setSelectedId(null);
    setViewport(draft.viewport);
    setCanvasH(draft.canvasH);
    setCanvasBgColor(draft.canvasBgColor ?? null);
    setZoom(draft.zoom);
    setShowGrid(draft.showGrid);
  }, [setBlocksWithHistory]);

  const gridBackground = useMemo<React.CSSProperties>(() => (
    showGrid
      ? {
          backgroundImage: [
            `linear-gradient(rgba(128,128,128,0.06) 1px, transparent 1px)`,
            `linear-gradient(90deg, rgba(128,128,128,0.06) 1px, transparent 1px)`,
            `linear-gradient(rgba(128,128,128,0.12) 1px, transparent 1px)`,
            `linear-gradient(90deg, rgba(128,128,128,0.12) 1px, transparent 1px)`,
          ].join(", "),
          backgroundSize: `${GRID}px ${GRID}px, ${GRID}px ${GRID}px, ${GUIDE}px ${GUIDE}px, ${GUIDE}px ${GUIDE}px`,
        }
      : {}
  ), [showGrid]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "var(--color-bg)",
        color: "var(--color-fg)",
        fontFamily: "var(--font-primary, Inter, sans-serif)",
        overflow: "hidden",
      }}
    >
      {/* ── Page Title ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: isCompactHeader ? "10px 12px 8px" : "14px 14px 10px",
          borderBottom: "1px solid var(--c-border)",
          backgroundColor: "var(--c-surface)",
          flexShrink: 0,
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: isCompactHeader ? 16 : 18,
            lineHeight: 1.2,
            fontWeight: 800,
            color: "var(--color-fg)",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          Mockup Builder
        </h1>
        <div style={{ ...topSegmentStyle, padding: "2px", flexShrink: 0 }}>
          <button
            onClick={undo}
            disabled={!canUndo}
            title="Annuler (Ctrl/Cmd+Z)"
            style={{
              ...secondaryBtnStyle,
              cursor: canUndo ? "pointer" : "not-allowed",
              opacity: canUndo ? 1 : 0.45,
            }}
          >
            Annuler
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            title="Rétablir (Shift+Ctrl/Cmd+Z)"
            style={{
              ...secondaryBtnStyle,
              cursor: canRedo ? "pointer" : "not-allowed",
              opacity: canRedo ? 1 : 0.45,
            }}
          >
            Rétablir
          </button>
        </div>
      </div>

      {/* ── Top Bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isCompactHeader ? "6px 12px" : "8px 14px",
          minHeight: isCompactHeader ? 46 : 52,
          borderBottom: "1px solid var(--c-border)",
          backgroundColor: "var(--c-surface)",
          flexShrink: 0,
          gap: 10,
          flexWrap: "nowrap",
          overflowX: "hidden",
          overflowY: "visible",
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* Center: canvas controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: isCompactHeader ? 6 : 8,
            flex: "1 1 auto",
            flexWrap: "nowrap",
            minWidth: 0,
            overflowX: "auto",
            overflowY: "hidden",
            paddingBottom: 2,
          }}
        >
          <div style={{ ...topControlGroupStyle, padding: isCompactHeader ? "3px 4px" : topControlGroupStyle.padding, gap: isCompactHeader ? 4 : topControlGroupStyle.gap }}>
            {!isCompactHeader && <span style={topControlLabelStyle}>Viewport</span>}
            <div style={topSegmentStyle}>
              {(Object.keys(VIEWPORTS) as ViewportKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setViewport(key)}
                  title={VIEWPORTS[key].label}
                  style={{
                    ...topSegmentBtnStyle,
                    padding: isCompactHeader ? "4px 7px" : topSegmentBtnStyle.padding,
                    backgroundColor: viewport === key ? "#CC4A48" : "transparent",
                    color: viewport === key ? "#fff" : "var(--color-muted)",
                  }}
                >
                  {isCompactHeader ? viewportNamesCompact[key] : viewportNames[key]}
                </button>
              ))}
            </div>
          </div>

          <div style={{ ...topControlGroupStyle, padding: isCompactHeader ? "3px 4px" : topControlGroupStyle.padding, gap: isCompactHeader ? 4 : topControlGroupStyle.gap }}>
            {!isCompactHeader && <span style={topControlLabelStyle}>Canvas</span>}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <select
                value={canvasH}
                onChange={(e) => setCanvasH(Number(e.target.value) as HeightPreset)}
                style={{ ...topSelectStyle, minWidth: isCompactHeader ? 96 : topSelectStyle.minWidth, height: isCompactHeader ? 28 : topSelectStyle.height }}
                title="Hauteur du canvas"
              >
                {HEIGHT_PRESETS.map((h) => (
                  <option key={h} value={h}>
                    {h}px ({Math.round((h / 900) * 10) / 10}x)
                  </option>
                ))}
              </select>
              <button
                onClick={() => setCanvasH((prev) => (Math.min(prev + 450, 9000) as HeightPreset))}
                title="Allonger de 450px"
                style={{ ...topUtilityBtnStyle, height: isCompactHeader ? 28 : topUtilityBtnStyle.height }}
              >
                {isCompactHeader ? "+" : "+450"}
              </button>
              <button
                onClick={() => setShowGrid((v) => !v)}
                title="Afficher/masquer la grille"
                style={{
                  ...topUtilityBtnStyle,
                  height: isCompactHeader ? 28 : topUtilityBtnStyle.height,
                  backgroundColor: showGrid ? "var(--c-brand-subtle)" : "var(--c-surface-elevated)",
                  color: showGrid ? "#CC4A48" : "var(--color-muted)",
                  borderColor: showGrid ? "rgba(204, 74, 72, 0.28)" : "var(--c-border)",
                }}
              >
                {isCompactHeader ? "G" : "Grille"}
              </button>
              <button
                onClick={() => setShowAlignmentHelpers((v) => !v)}
                title="Afficher/masquer les guides d'alignement"
                style={{
                  ...topUtilityBtnStyle,
                  height: isCompactHeader ? 28 : topUtilityBtnStyle.height,
                  backgroundColor: showAlignmentHelpers ? "var(--c-brand-subtle)" : "var(--c-surface-elevated)",
                  color: showAlignmentHelpers ? "#CC4A48" : "var(--color-muted)",
                  borderColor: showAlignmentHelpers ? "rgba(204, 74, 72, 0.28)" : "var(--c-border)",
                }}
              >
                {isCompactHeader ? "A" : "Guides"}
              </button>
              <input
                type="color"
                value={canvasBgColor ?? "#ffffff"}
                onChange={(e) => {
                  setCanvasBgColor(e.target.value);
                  setCanvasBgHexInput(e.target.value);
                }}
                title="Couleur de fond du canvas"
                style={{
                  width: isCompactHeader ? 28 : 34,
                  height: isCompactHeader ? 28 : 32,
                  padding: 0,
                  borderRadius: 7,
                  border: "1px solid var(--c-border)",
                  backgroundColor: "var(--c-surface-elevated)",
                  cursor: "pointer",
                }}
              />
              <input
                type="text"
                value={canvasBgHexInput}
                onChange={(e) => setCanvasBgHexInput(e.target.value)}
                onBlur={applyCanvasBgHexInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyCanvasBgHexInput();
                  }
                }}
                placeholder={isCompactHeader ? "#hex" : "#RRGGBB"}
                title="Couleur HEX du fond canvas"
                style={{
                  width: isCompactHeader ? 72 : 92,
                  height: isCompactHeader ? 28 : 32,
                  padding: "0 8px",
                  borderRadius: 7,
                  border: `1px solid ${isCanvasBgHexDraftValid ? "var(--c-border)" : "rgba(184, 64, 62, 0.5)"}`,
                  backgroundColor: "var(--c-surface-elevated)",
                  color: "var(--color-fg)",
                  fontSize: 12,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={() => {
                  setCanvasBgColor(null);
                  setCanvasBgHexInput("");
                }}
                title="Revenir au fond par défaut"
                style={{
                  ...topUtilityBtnStyle,
                  height: isCompactHeader ? 28 : topUtilityBtnStyle.height,
                }}
              >
                {isCompactHeader ? "D" : "Défaut"}
              </button>
            </div>
          </div>

          <div style={{ ...topControlGroupStyle, padding: isCompactHeader ? "3px 4px" : topControlGroupStyle.padding, gap: isCompactHeader ? 4 : topControlGroupStyle.gap }}>
            {!isCompactHeader && <span style={topControlLabelStyle}>Zoom</span>}
            <div style={topSegmentStyle}>
            {ZOOM_LEVELS.map((z) => (
              <button
                key={z}
                onClick={() => setZoom(z)}
                style={{
                    ...topSegmentBtnStyle,
                  padding: isCompactHeader ? "4px 7px" : topSegmentBtnStyle.padding,
                  backgroundColor: zoom === z ? "var(--c-surface)" : "transparent",
                  color: zoom === z ? "var(--color-fg)" : "var(--color-muted)",
                    boxShadow: zoom === z ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}
              >
                {ZOOM_LABELS[z]}
              </button>
            ))}
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flex: "0 1 auto",
            flexWrap: "nowrap",
            justifyContent: "flex-end",
            minWidth: 0,
            overflowX: "visible",
            overflowY: "visible",
            paddingBottom: 2,
          }}
        >
          <button
            onClick={() => {
              setShowActionsMenu(false);
              setShowShortcuts(true);
            }}
            title="Voir les raccourcis clavier (?)"
            style={secondaryBtnStyle}
          >
            {isCompactHeader ? "?" : "Raccourcis"}
          </button>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <button
              ref={actionsButtonRef}
              onClick={() => {
                if (!showActionsMenu) updateActionsMenuAnchor();
                setShowActionsMenu((v) => !v);
              }}
              title="Actions avancées"
              style={{
                ...secondaryBtnStyle,
                cursor: "pointer",
              }}
            >
              {isCompactHeader ? "Act." : "Actions"} ▾
            </button>
          </div>
          <button
            onClick={() => setShowCode(true)}
            disabled={blocks.length === 0}
            style={{
              ...secondaryBtnStyle,
              border: "none",
              backgroundColor: blocks.length > 0 ? "#CC4A48" : "var(--c-surface-elevated)",
              color: blocks.length > 0 ? "#fff" : "var(--color-muted)",
              cursor: blocks.length > 0 ? "pointer" : "not-allowed",
              opacity: blocks.length > 0 ? 1 : 0.6,
            }}
          >
            {isCompactHeader ? "Exporter" : "Exporter le code"}
          </button>
        </div>
      </div>

      {showActionsMenu && actionsMenuAnchor && (
        <div
          ref={actionsMenuRef}
          style={{
            ...actionsDropdownStyle,
            top: actionsMenuAnchor.top,
            right: actionsMenuAnchor.right,
          }}
        >
          <button
            disabled={!canRestore}
            onClick={() => {
              restoreAutosave();
              setShowActionsMenu(false);
              showToast("Brouillon restauré");
            }}
            style={{
              ...actionsDropdownItemStyle,
              cursor: canRestore ? "pointer" : "not-allowed",
              opacity: canRestore ? 1 : 0.45,
            }}
          >
            Restaurer
          </button>
          <button
            disabled={blocks.length <= 1}
            onClick={() => {
              setBlocksWithHistory((prev) => reflow(prev, measuredHeights));
              setShowActionsMenu(false);
              showToast("Reflow appliqué");
            }}
            style={{
              ...actionsDropdownItemStyle,
              cursor: blocks.length > 1 ? "pointer" : "not-allowed",
              opacity: blocks.length > 1 ? 1 : 0.45,
            }}
          >
            Reflow
          </button>
          <button
            disabled={blocks.length === 0}
            onClick={() => {
              setBlocksWithHistory([]);
              setSelectedId(null);
              setMeasuredHeights({});
              setShowActionsMenu(false);
              showToast("Canvas vidé");
            }}
            style={{
              ...actionsDropdownItemStyle,
              color: blocks.length > 0 ? "#b8403e" : "var(--color-muted)",
              cursor: blocks.length > 0 ? "pointer" : "not-allowed",
              opacity: blocks.length > 0 ? 1 : 0.45,
            }}
          >
            Vider
          </button>
          {!hasSecondaryActions && (
            <div style={actionsDropdownEmptyStyle}>Aucune action disponible</div>
          )}
        </div>
      )}

      {showShortcuts && (
        <ShortcutsModal
          onClose={() => setShowShortcuts(false)}
        />
      )}

      {toastMessage && (
        <div
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
            zIndex: 40,
            padding: "10px 12px",
            borderRadius: 9,
            border: "1px solid rgba(204, 74, 72, 0.28)",
            backgroundColor: "var(--c-surface)",
            color: "var(--color-fg)",
            fontSize: 12,
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(0,0,0,0.24)",
            pointerEvents: "none",
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* ── Body ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ── Palette (left) ── */}
        <aside
          style={{
            width: leftOpen ? 220 : 32,
            flexShrink: 0,
            borderRight: "1px solid var(--c-border)",
            backgroundColor: "var(--c-surface)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transition: "width 0.2s cubic-bezier(0.4,0,0.2,1)",
            position: "relative",
          }}
        >
          {/* Toggle button */}
          <button
            onClick={() => setLeftOpen((v) => !v)}
            title={leftOpen ? "Réduire la palette" : "Ouvrir la palette"}
            style={{
              position: "absolute",
              top: 8,
              right: leftOpen ? 8 : "50%",
              transform: leftOpen ? "none" : "translateX(50%)",
              zIndex: 30,
              width: 28,
              height: 28,
              borderRadius: 6,
              border: "1px solid var(--c-border)",
              backgroundColor: "var(--c-surface-elevated)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-fg)",
              fontSize: 14,
              fontWeight: 700,
              padding: 0,
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              flexShrink: 0,
            }}
          >
            {leftOpen ? "‹" : "›"}
          </button>

          {/* Panel content — hidden when collapsed */}
          <div style={{ opacity: leftOpen ? 1 : 0, transition: "opacity 0.15s", pointerEvents: leftOpen ? "auto" : "none", display: "flex", flexDirection: "column", flex: 1, minWidth: 220, overflow: "hidden", paddingTop: 44 }}>
            {/* Tabs */}
            <div style={{ borderBottom: "1px solid var(--c-border)", flexShrink: 0, padding: "8px 10px 6px" }}>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  border: "1px solid var(--c-border)",
                  borderRadius: 8,
                  overflow: "hidden",
                  backgroundColor: "var(--c-surface-elevated)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: "50%",
                    backgroundColor: "#CC4A48",
                    transform: paletteTab === "components" ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 0.2s ease",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                  }}
                />
                {(["components", "layouts"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setPaletteTab(tab)}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      flex: 1,
                      padding: "8px 0",
                      border: "none",
                      backgroundColor: "transparent",
                      color: paletteTab === tab ? "#ffffff" : "var(--color-muted)",
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                      letterSpacing: "0.04em",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {tab === "components" ? "Composants" : "Layouts"}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliding panels */}
            <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  width: "200%",
                  height: "100%",
                  transform: paletteTab === "components" ? "translateX(0)" : "translateX(-50%)",
                  transition: "transform 0.2s ease",
                }}
              >
                {/* Components panel */}
                <div style={{ width: "50%", height: "100%", overflowY: "auto" }}>
                  <div style={{ padding: "10px 10px 6px" }}>
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "6px 9px",
                        borderRadius: 6,
                        border: "1px solid var(--c-border)",
                        backgroundColor: "var(--c-surface-elevated)",
                        color: "var(--color-fg)",
                        fontSize: 12,
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div style={{ padding: "4px 10px 24px" }}>
                    {search ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 8 }}>
                        {filteredRegistry.length === 0
                          ? <span style={{ fontSize: 12, color: "var(--color-muted)" }}>Aucun résultat</span>
                          : filteredRegistry.map((e) => <PaletteItem key={e.name} entry={e} />)
                        }
                      </div>
                    ) : (
                      CATEGORIES.map((cat) => (
                        <div key={cat} style={{ marginTop: 14 }}>
                          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 7, opacity: 0.6 }}>
                            {cat}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {REGISTRY_BY_CATEGORY[cat].map((e) => (
                              <PaletteItem key={e.name} entry={e} />
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Layouts panel */}
                <div style={{ width: "50%", height: "100%", overflowY: "auto", padding: "10px 10px 24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {LAYOUT_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => loadLayout(preset)}
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          borderRadius: 8,
                          border: "1px solid var(--c-border)",
                          backgroundColor: "var(--c-surface-elevated)",
                          cursor: "pointer",
                          transition: "border-color 0.12s, background 0.12s",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.borderColor = "#CC4A48";
                          el.style.backgroundColor = "var(--c-brand-subtle)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.borderColor = "var(--c-border)";
                          el.style.backgroundColor = "var(--c-surface-elevated)";
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-fg)" }}>{preset.name}</span>
                        </div>
                        <div style={{ fontSize: 11, color: "var(--color-muted)", lineHeight: 1.4 }}>
                          {preset.description}
                        </div>
                        <div style={{ marginTop: 6, display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
                          {[preset.viewport, `${preset.canvasH}px`, `${preset.blocks.length} blocs`].map((tag) => (
                            <span key={tag} style={{
                              fontSize: 9,
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              color: "var(--color-muted)",
                              backgroundColor: "var(--c-surface)",
                              border: "1px solid var(--c-border)",
                              borderRadius: 3,
                              padding: "1px 5px",
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>{/* end panel content */}
        </aside>

        {/* ── Canvas scroll container (center) ── */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            backgroundColor: "#1a1a1a",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: 32,
          }}
          onClick={() => {
            setSelectedId(null);
            clearGuides();
          }}
        >
          {/* Sized wrapper so scrollbar matches zoomed canvas */}
          <div
            style={{
              width: vp.w * zoom,
              height: canvasH * zoom,
              flexShrink: 0,
              position: "relative",
            }}
          >
            {/* Canvas */}
            <div
              ref={canvasRef}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              style={{
                width: vp.w,
                height: canvasH,
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
                position: "relative",
                backgroundColor: canvasBgColor ?? "var(--color-bg)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.4)",
                outline: isDragOver ? "3px solid #CC4A48" : "none",
                outlineOffset: -2,
                ...gridBackground,
              }}
            >
              {/* Empty state */}
              {blocks.length === 0 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                    color: "rgba(128,128,128,0.5)",
                    pointerEvents: "none",
                  }}
                >
                  <span style={{ fontSize: 48 }}>🧱</span>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Canvas vide</div>
                    <div style={{ fontSize: 13 }}>Glissez des composants depuis la palette</div>
                  </div>
                </div>
              )}

              {/* Alignment guides (shown while move/resize) */}
              {alignmentGuides.vertical.map((x, index) => (
                <div
                  key={`guide-v-${index}-${x}`}
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: x,
                    width: 1,
                    backgroundColor: "rgba(204, 74, 72, 0.95)",
                    boxShadow: "0 0 0 1px rgba(204, 74, 72, 0.25)",
                    pointerEvents: "none",
                    zIndex: 3500,
                  }}
                />
              ))}
              {alignmentGuides.horizontal.map((y, index) => (
                <div
                  key={`guide-h-${index}-${y}`}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: y,
                    height: 1,
                    backgroundColor: "rgba(204, 74, 72, 0.95)",
                    boxShadow: "0 0 0 1px rgba(204, 74, 72, 0.25)",
                    pointerEvents: "none",
                    zIndex: 3500,
                  }}
                />
              ))}

              {/* Blocks (sorted by zIndex for render order) */}
              {sortedCanvasBlocks.map((block) => (
                  <CanvasBlock
                    key={block.id}
                    block={block}
                    isSelected={selectedId === block.id}
                    onSelect={() => setSelectedId(block.id)}
                    onDuplicate={() => duplicateBlock(block.id)}
                    onDelete={() => deleteBlock(block.id)}
                    onBringForward={() => bringForward(block.id)}
                    onSendBackward={() => sendBackward(block.id)}
                    onStartMove={(e) => startMove(e, block)}
                    onStartResize={(e) => startResize(e, block)}
                    onHeightMeasured={handleHeightMeasured}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* ── Props Panel (right) ── */}
        <aside
          style={{
            width: rightOpen ? 250 : 32,
            flexShrink: 0,
            borderLeft: "1px solid var(--c-border)",
            backgroundColor: "var(--c-surface)",
            overflowY: rightOpen ? "auto" : "hidden",
            transition: "width 0.2s cubic-bezier(0.4,0,0.2,1)",
            position: "relative",
          }}
        >
          {/* Toggle button */}
          <button
            onClick={() => setRightOpen((v) => !v)}
            title={rightOpen ? "Réduire les props" : "Ouvrir les props"}
            style={{
              position: "absolute",
              top: 8,
              left: rightOpen ? 8 : "50%",
              transform: rightOpen ? "none" : "translateX(-50%)",
              zIndex: 30,
              width: 28,
              height: 28,
              borderRadius: 6,
              border: "1px solid var(--c-border)",
              backgroundColor: "var(--c-surface-elevated)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-fg)",
              fontSize: 14,
              fontWeight: 700,
              padding: 0,
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              flexShrink: 0,
            }}
          >
            {rightOpen ? "›" : "‹"}
          </button>

          {/* Panel content — hidden when collapsed */}
          <div style={{ opacity: rightOpen ? 1 : 0, transition: "opacity 0.15s", pointerEvents: rightOpen ? "auto" : "none", minWidth: 250, paddingTop: 44 }}>
            <div
              style={{
                padding: "10px 14px",
                borderBottom: "1px solid var(--c-border)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                opacity: 0.7,
              }}
            >
              Props
            </div>
            <PropsPanel
              block={selectedBlock}
              blocks={blocks}
              selectedId={selectedId}
              onSelectBlock={(id) => setSelectedId(id)}
              onDeleteBlock={deleteBlock}
              onBringForward={bringForward}
              onSendBackward={sendBackward}
              onResetProps={resetBlockProps}
              onUpdateProp={updateProp}
              onUpdateLayout={updateLayout}
            />
          </div>
        </aside>
      </div>

      {/* ── Code Modal ── */}
      {showCode && (
        <CodeModal code={generateCode(blocks, vp, canvasH, canvasBgColor)} onClose={() => setShowCode(false)} />
      )}
    </div>
  );
}

const topControlGroupStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 6px",
  borderRadius: 10,
  border: "1px solid var(--c-border)",
  backgroundColor: "var(--c-surface-elevated)",
  flexShrink: 0,
};

const topControlLabelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  opacity: 0.72,
  paddingLeft: 2,
};

const topSegmentStyle: React.CSSProperties = {
  display: "flex",
  gap: 2,
  padding: 2,
  borderRadius: 8,
  border: "1px solid var(--c-border)",
  backgroundColor: "var(--c-surface)",
};

const topSegmentBtnStyle: React.CSSProperties = {
  padding: "5px 9px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontSize: 11,
  fontWeight: 700,
  backgroundColor: "transparent",
  color: "var(--color-muted)",
  transition: "background 0.12s, color 0.12s",
};

const topSelectStyle: React.CSSProperties = {
  height: 30,
  minWidth: 118,
  padding: "0 8px",
  borderRadius: 7,
  border: "1px solid var(--c-border)",
  backgroundColor: "var(--c-surface)",
  color: "var(--color-fg)",
  fontSize: 11,
  fontWeight: 600,
  outline: "none",
  cursor: "pointer",
};

const topUtilityBtnStyle: React.CSSProperties = {
  height: 30,
  padding: "0 10px",
  borderRadius: 7,
  border: "1px solid var(--c-border)",
  backgroundColor: "var(--c-surface-elevated)",
  color: "var(--color-muted)",
  cursor: "pointer",
  fontSize: 11,
  fontWeight: 700,
};

const secondaryBtnStyle: React.CSSProperties = {
  height: 30,
  padding: "0 12px",
  borderRadius: 7,
  border: "1px solid var(--c-border)",
  backgroundColor: "var(--c-surface-elevated)",
  color: "var(--color-muted)",
  cursor: "pointer",
  fontSize: 11,
  fontWeight: 700,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
  flexShrink: 0,
};

const actionsDropdownStyle: React.CSSProperties = {
  position: "fixed",
  minWidth: 160,
  padding: 4,
  borderRadius: 10,
  border: "1px solid var(--c-border)",
  backgroundColor: "var(--c-surface)",
  boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
  zIndex: 15,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const actionsDropdownItemStyle: React.CSSProperties = {
  height: 32,
  border: "none",
  borderRadius: 7,
  backgroundColor: "transparent",
  color: "var(--color-fg)",
  textAlign: "left",
  padding: "0 10px",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
};

const actionsDropdownEmptyStyle: React.CSSProperties = {
  padding: "8px 10px",
  fontSize: 11,
  color: "var(--color-muted)",
  opacity: 0.8,
};
