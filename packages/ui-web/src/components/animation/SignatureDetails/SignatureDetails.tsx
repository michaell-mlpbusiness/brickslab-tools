import React from "react";
import { motion } from "framer-motion";
import type { SignatureDetailsProps } from "./SignatureDetails.type";

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = `
  .bl-sig-section { background: var(--c-surface, #f8f8f8); }
  .bl-sig-container { max-width: 1800px; margin: auto; padding: 0 40px; }
  .bl-sig-header {
    text-align: center;
    max-width: 900px;
    margin: 0 auto 120px;
  }
  .bl-sig-header h2 { font-size: clamp(40px, 6vw, 90px); margin-bottom: 20px; }
  .bl-sig-header p  { font-size: 18px; opacity: 0.7; }
  .bl-sig-grid { display: grid; gap: 40px; }
  .bl-sig-card { position: relative; overflow: hidden; cursor: pointer; }
  .bl-sig-img-wrap { overflow: hidden; background: #000; }
  .bl-sig-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
  .bl-sig-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 30px;
    color: white;
  }
  .bl-sig-overlay h3 { font-size: 24px; margin-bottom: 8px; }
  .bl-sig-overlay p  { font-size: 14px; opacity: 0.85; }
  .bl-sig-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
    color: white;
  }
`;

// ---------------------------------------------------------------------------
// Variants framer-motion (propagation depuis la carte parente)
// ---------------------------------------------------------------------------

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.5 } },
};

const overlayVariants = {
  rest:  { opacity: 0 },
  hover: { opacity: 1 },
};

const titleVariants = {
  rest:  { opacity: 1 },
  hover: { opacity: 0 },
};

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

export function SignatureDetails({
  details,
  title = "Détails Signature",
  subtitle = "Chaque pièce est définie par un savoir-faire méticuleux et des matériaux d'exception.",
  columns = 4,
  cardRadius = "4px",
  sectionPadding = "8rem 0",
  overlayColor = "rgba(20,20,20,0.9)",
  imageAspectRatio = "3/4",
  className = "",
}: SignatureDetailsProps) {
  return (
    <>
      <style>{styles}</style>

      <section
        className={`bl-sig-section${className ? ` ${className}` : ""}`}
        style={{ padding: sectionPadding }}
      >
        <div className="bl-sig-container">

          {/* Header */}
          <motion.div
            className="bl-sig-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </motion.div>

          {/* Grid */}
          <div
            className="bl-sig-grid"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {details.map((detail, index) => (
              <motion.div
                key={detail.id}
                className="bl-sig-card"
                style={{ borderRadius: cardRadius }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover="hover"
                animate="rest"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="bl-sig-img-wrap"
                  style={{ aspectRatio: imageAspectRatio, borderRadius: cardRadius }}
                >
                  <motion.img
                    src={detail.image}
                    alt={detail.title}
                    variants={imageVariants}
                    draggable={false}
                  />
                </div>

                {/* Overlay au survol */}
                <motion.div
                  className="bl-sig-overlay"
                  style={{
                    background: `linear-gradient(to top, ${overlayColor}, transparent)`,
                    borderRadius: cardRadius,
                  }}
                  variants={overlayVariants}
                >
                  <h3>{detail.title}</h3>
                  <p>{detail.description}</p>
                </motion.div>

                {/* Titre par défaut (masqué au survol) */}
                <motion.div className="bl-sig-title" variants={titleVariants}>
                  <h3>{detail.title}</h3>
                </motion.div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
