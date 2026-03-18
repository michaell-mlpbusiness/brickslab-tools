import type * as React from "react";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "model-viewer": React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & {
          src?: string;
          alt?: string;
          "camera-controls"?: boolean;
          "auto-rotate"?: boolean | "";
          "shadow-intensity"?: number | string;
          exposure?: number | string;
          "environment-image"?: string;
          [key: string]: any;
        };
      }
    }
  }
}

export {};
