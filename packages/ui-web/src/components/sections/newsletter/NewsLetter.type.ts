import React from "react";
import { ButtonVariant } from "../../ui/button/Button.type";
import { InputSize } from "../../ui/input/Input.type";


export type NewsLetterLayout = "inline" | "stacked";
export type NewsLetterStatus = "idle" | "loading" | "success" | "error";

export interface NewsLetterProps {
  /**
   * Callback déclenché à la soumission avec l'email validé.
   * Si async, le composant gère loading/success/error en interne.
   */
  onSubmit: (email: string) => void | Promise<void>;

  /** Titre affiché au-dessus du formulaire */
  title?: string;
  /** Sous-titre ou description */
  description?: string;
  /** Placeholder du champ email */
  placeholder?: string;
  /** Label du bouton CTA */
  buttonLabel?: string;
  /** Message affiché après succès */
  successMessage?: string;

  /**
   * Statut externe contrôlé.
   * Si fourni, prime sur la gestion interne.
   */
  status?: NewsLetterStatus;
  /**
   * Message d'erreur externe (ex: erreur API).
   * Prioritaire sur l'erreur de validation interne.
   */
  errorText?: string;

  /** Disposition du champ + bouton */
  layout?: NewsLetterLayout;
  /** Taille partagée entre Input et Button */
  size?: InputSize;
  /** Étend le container à 100% de son parent */
  fullWidth?: boolean;

  /** Variante du bouton */
  buttonVariant?: ButtonVariant;

  /** Valeur email contrôlée (mode contrôlé) */
  value?: string;
  /** onChange en mode contrôlé */
  onChange?: (email: string) => void;

  /** Styles inline sur le container racine */
  style?: React.CSSProperties;

  /** Classe CSS optionnelle sur le container racine */
  className?: string;
}