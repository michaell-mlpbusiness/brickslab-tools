export interface CarouselItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface MediaCarouselProps {
  items: CarouselItem[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  showDots?: boolean;
}
