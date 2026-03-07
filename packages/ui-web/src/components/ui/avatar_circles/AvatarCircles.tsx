import React from "react";
import { AvatarCirclesProps } from "./AvatarCircles.type";

export function AvatarCircles({
  avatarUrls,
  numPeople,
  className = "",
  size = 40,
  overlap = 10,
  max = 5,
  showTooltip = false,
}: AvatarCirclesProps) {
  const displayedAvatars = avatarUrls.slice(0, max);
  const remaining = avatarUrls.length - max;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
      }}
      className={className}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {displayedAvatars.map((avatar, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: `${size}px`,
              height: `${size}px`,
              marginLeft: index > 0 ? `-${overlap}px` : 0,
              zIndex: displayedAvatars.length - index,
            }}
          >
            {avatar.profileUrl ? (
              <a
                href={avatar.profileUrl}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: "2px solid var(--c-surface)",
                  overflow: "hidden",
                  transition: "transform 0.2s ease",
                }}
                title={showTooltip ? avatar.imageUrl : undefined}
              >
                <img
                  src={avatar.imageUrl}
                  alt="Avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </a>
            ) : (
              <div
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: "2px solid var(--c-surface)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={avatar.imageUrl}
                  alt="Avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>
        ))}

        {remaining > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: `${size}px`,
              height: `${size}px`,
              marginLeft: `-${overlap}px`,
              borderRadius: "50%",
              backgroundColor: "var(--color-brand)",
              color: "#FBFBFB",
              fontWeight: "var(--fontweight-semibold)",
              fontSize: `${size * 0.4}px`,
              border: "2px solid var(--c-surface)",
              zIndex: 0,
            }}
          >
            +{remaining}
          </div>
        )}
      </div>

      {numPeople && (
        <span
          style={{
            fontSize: "var(--fontsize-sm)",
            color: "var(--color-muted)",
            whiteSpace: "nowrap",
          }}
        >
          {numPeople} people
        </span>
      )}
    </div>
  );
}
