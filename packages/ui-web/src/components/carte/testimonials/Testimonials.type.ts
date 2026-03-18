// components/Testimonial/Testimonial.type.ts
export interface TestimonialProps {
  /** Nom affiché de l'utilisateur */
  userName: string;
  /** Texte du commentaire */
  comment: string;
  /** Note 1–5 (float accepté) */
  rating: number;
  /** Taille du LogoMark / ajustement densité */
  size?: "sm" | "md" | "lg";
  imgSrc?: string;  // logo custom optionnel
  imgAlt?: string;
}