export interface MediaImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  objectFit?: "cover" | "contain" | "fill" | "none";
  borderRadius?: string;
}
