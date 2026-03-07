export interface LocationMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  width?: number | string;
  height?: number | string;
  title?: string;
  placeLabel?: string;
  borderRadius?: string;
  showOpenStreetMapLink?: boolean;
}
