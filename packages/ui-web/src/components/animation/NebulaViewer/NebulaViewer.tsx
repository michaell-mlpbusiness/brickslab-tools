import React from "react";
import type { NebulaViewerProps } from "./NebulaViewer.type";

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = `
  .bl-nebula-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 80px;
    padding: 80px;
    min-height: 100vh;
  }
  .bl-nebula-info { max-width: 420px; }
  .bl-nebula-info h1 { font-size: 60px; margin-bottom: 20px; }
  .bl-nebula-info p  { font-size: 18px; opacity: .7; margin-bottom: 30px; }
  .bl-nebula-cta {
    display: inline-block;
    padding: 14px 30px;
    border-radius: 30px;
    background: linear-gradient(135deg, #000, #333);
    color: white;
    text-decoration: none;
    font-weight: 600;
  }
  .bl-nebula-viewer-box { position: relative; aspect-ratio: 1; }
  .bl-nebula-halo {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, #ffffff, transparent 70%);
    filter: blur(80px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
  }
  .bl-nebula-viewer-box model-viewer { width: 100%; height: 100%; z-index: 1; }
  .bl-nebula-shadow {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 55%;
    height: 40px;
    border-radius: 50%;
    background: rgba(0,0,0,.2);
    filter: blur(25px);
  }
  .bl-nebula-options {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 16px;
  }
  .bl-nebula-opt {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid rgba(255,255,255,.5);
  }
  .bl-nebula-opt.active { border: 2px solid black; }
  .bl-nebula-pause-btn {
    position: absolute;
    right: -70px;
    top: 50%;
    transform: translateY(-50%);
    width: 55px;
    height: 55px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,.6);
    cursor: pointer;
  }
  @media (max-width: 1000px) {
    .bl-nebula-wrapper {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 40px;
      gap: 40px;
    }
    .bl-nebula-info { max-width: 90%; }
    .bl-nebula-info h1 { font-size: 40px; }
    .bl-nebula-info p  { font-size: 16px; }
    .bl-nebula-viewer-box { width: 90%; max-width: 500px; }
    .bl-nebula-pause-btn { right: 10px; top: -70px; transform: none; }
    .bl-nebula-options { bottom: -40px; }
  }
  @media (max-width: 600px) {
    .bl-nebula-wrapper { padding: 20px; gap: 20px; }
    .bl-nebula-info h1 { font-size: 32px; }
    .bl-nebula-info p  { font-size: 14px; }
    .bl-nebula-cta { padding: 10px 24px; font-size: 14px; }
    .bl-nebula-viewer-box { width: 100%; }
  }
`;

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

export function NebulaViewer({
  title = "Nebula",
  description = "Découvrez vos modèles 3D dans une expérience immersive et fluide.",
  ctaLabel = "Découvrir",
  ctaLink = "#",
  models,
  isRotating = true,
  onRotateChange,
  selectedModel,
  onModelChange,
  viewerWidth = "650px",
  haloSize = "500px",
  showPauseButton = true,
  className = "",
}: NebulaViewerProps) {
  const activeSrc = selectedModel ?? models[0]?.src;

  return (
    <>
      <style>{styles}</style>

      <section className={`bl-nebula-wrapper${className ? ` ${className}` : ""}`}>

        {/* TEXT */}
        <div className="bl-nebula-info">
          <h1>{title}</h1>
          <p>{description}</p>
          <a className="bl-nebula-cta" href={ctaLink}>
            {ctaLabel}
          </a>
        </div>

        {/* VIEWER */}
        <div className="bl-nebula-viewer-box" style={{ width: viewerWidth }}>
          <div
            className="bl-nebula-halo"
            style={{ width: haloSize, height: haloSize }}
          />

          <model-viewer
            src={activeSrc}
            camera-controls
            shadow-intensity="1"
            exposure="1"
            environment-image="neutral"
            {...(isRotating ? { "auto-rotate": "" } : {})}
          />

          <div className="bl-nebula-shadow" />

          {/* OPTIONS */}
          <div className="bl-nebula-options">
            {models.map((model, i) => (
              <div
                key={i}
                className={`bl-nebula-opt${activeSrc === model.src ? " active" : ""}`}
                style={{ background: model.color }}
                onClick={() => onModelChange?.(model.src)}
              />
            ))}
          </div>

          {/* PAUSE */}
          {showPauseButton && (
            <button
              className="bl-nebula-pause-btn"
              onClick={() => onRotateChange?.(!isRotating)}
              aria-label={isRotating ? "Mettre en pause la rotation" : "Reprendre la rotation"}
            >
              {isRotating ? "⏸" : "▶"}
            </button>
          )}
        </div>

      </section>
    </>
  );
}
