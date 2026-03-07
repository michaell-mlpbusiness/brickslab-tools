import React from "react";
import { LocationMapProps } from "./LocationMap.type";

const MIN_LAT = -85;
const MAX_LAT = 85;
const MIN_LNG = -180;
const MAX_LNG = 180;
const MIN_ZOOM = 1;
const MAX_ZOOM = 19;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function buildEmbedUrl(lat: number, lng: number, zoom: number): string {
  const clampedZoom = clamp(zoom, MIN_ZOOM, MAX_ZOOM);
  const halfSpan = 180 / Math.pow(2, clampedZoom + 1);
  const left = clamp(lng - halfSpan, MIN_LNG, MAX_LNG);
  const right = clamp(lng + halfSpan, MIN_LNG, MAX_LNG);
  const top = clamp(lat + halfSpan, MIN_LAT, MAX_LAT);
  const bottom = clamp(lat - halfSpan, MIN_LAT, MAX_LAT);

  const bbox = `${left},${bottom},${right},${top}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lng}`;
}

function buildOpenStreetMapUrl(lat: number, lng: number, zoom: number): string {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`;
}

export function LocationMap({
  lat,
  lng,
  zoom = 13,
  width = "100%",
  height = 320,
  title = "Location map",
  placeLabel,
  borderRadius = "var(--radius-md)",
  showOpenStreetMapLink = true,
}: LocationMapProps) {
  const safeLat = clamp(lat, MIN_LAT, MAX_LAT);
  const safeLng = clamp(lng, MIN_LNG, MAX_LNG);
  const safeZoom = clamp(zoom, MIN_ZOOM, MAX_ZOOM);
  const embedUrl = buildEmbedUrl(safeLat, safeLng, safeZoom);
  const openStreetMapUrl = buildOpenStreetMapUrl(safeLat, safeLng, safeZoom);

  return (
    <figure style={{ margin: 0, width }}>
      <div
        style={{
          border: "1px solid var(--c-border)",
          borderRadius,
          overflow: "hidden",
          background: "var(--c-surface)",
        }}
      >
        <iframe
          title={title}
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{
            display: "block",
            border: "none",
            width: "100%",
            height,
          }}
        />
      </div>

      {(placeLabel || showOpenStreetMapLink) && (
        <figcaption
          style={{
            marginTop: "var(--space-2)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "var(--space-2)",
            color: "var(--color-muted)",
            fontSize: "var(--fontsize-sm)",
            lineHeight: 1.4,
          }}
        >
          {placeLabel && <span>{placeLabel}</span>}
          {showOpenStreetMapLink && (
            <a
              href={openStreetMapUrl}
              target="_blank"
              rel="noreferrer noopener"
              style={{
                color: "var(--color-brand)",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
              aria-label={`Open this location on OpenStreetMap: ${safeLat}, ${safeLng}`}
            >
              Open in OpenStreetMap
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}
