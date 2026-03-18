export interface DetailItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface SignatureDetailsProps {
  details: DetailItem[];

  title?: string;
  subtitle?: string;

  columns?: 1 | 2 | 3 | 4;

  cardRadius?: string;
  sectionPadding?: string;
  overlayColor?: string;

  imageAspectRatio?: string;

  className?: string;
}
