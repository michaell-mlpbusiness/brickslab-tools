import React from "react";

import { NewsLetterProps, NewsLetterStatus } from "./NewsLetter.type";
import { Button, Input } from "../../..";

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = `
  .bl-newsletter { box-sizing: border-box; }

  .bl-newsletter__header { margin-bottom: var(--space-3); }

  .bl-newsletter__title {
    margin: 0 0 var(--space-1) 0;
    font-size: var(--fontsize-medium);
    font-weight: var(--fontweight-semibold);
    color: var(--color-fg);
    line-height: 1.3;
  }

  .bl-newsletter__description {
    margin: 0;
    font-size: var(--fontsize-sm);
    color: var(--color-muted);
    line-height: 1.5;
  }

  /* INLINE : input + bouton côte à côte */
  .bl-newsletter__row--inline {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-2);
  }
  .bl-newsletter__row--inline .bl-newsletter__input-wrap {
    flex: 1;
    min-width: 0;
  }

  /* STACKED : colonne */
  .bl-newsletter__row--stacked {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  /*
   * Border override par statut.
   * On cible [data-bl-input-field] à travers le wrapper
   * sans toucher Input.type.ts.
   * !important nécessaire car Input applique ses styles en inline.
   */
  .bl-newsletter__input-wrap--error [data-bl-input-field] {
    border-color: var(--color-error) !important;
  }
  .bl-newsletter__input-wrap--success [data-bl-input-field] {
    border-color: var(--color-success, #16a34a) !important;
  }

  /* Messages (succès, erreur API, erreur de validation) */
  .bl-newsletter__message {
    margin: 0;
    font-size: var(--fontsize-xs);
    line-height: 1.4;
  }
  .bl-newsletter__message--error      { color: var(--color-error); }
  .bl-newsletter__message--success    { color: var(--color-success, #16a34a); }
  .bl-newsletter__message--validation { color: var(--color-error); }

  /* Responsive inline → stacked sous 480px */
  @media (max-width: 480px) {
    .bl-newsletter__row--inline {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

type MessageType = "success" | "error" | "validation";

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

export function NewsLetter({
  onSubmit,
  title,
  description,
  placeholder = "votre@email.com",
  buttonLabel = "S'inscrire",
  successMessage = "Merci, vous êtes inscrit !",
  status: externalStatus,
  errorText: externalError,
  layout = "inline",
  size = "md",
  fullWidth = false,
  buttonVariant = "primary",
  value: controlledValue,
  onChange: controlledOnChange,
  style,
  className,
}: NewsLetterProps) {
  // -- État -----------------------------------------------------------------
  const [internalEmail, setInternalEmail] = React.useState("");
  const [internalStatus, setInternalStatus] = React.useState<NewsLetterStatus>("idle");
  const [validationError, setValidationError] = React.useState<string | undefined>();

  // Mode contrôlé vs non-contrôlé
  const email     = controlledValue    ?? internalEmail;
  const setEmail  = controlledOnChange ?? setInternalEmail;

  // Statut externe prime sur interne
  const status = externalStatus ?? internalStatus;

  const isError   = status === "error";
  const isSuccess = status === "success";
  const isLoading = status === "loading";

  /*
   * isStatic : l'utilisateur ne peut plus interagir.
   * Input → readOnly, Button → disabled.
   */
  const isStatic = isError || isSuccess;

  // -- Message à afficher ---------------------------------------------------
  const statusMessage: string | undefined = isSuccess
    ? successMessage
    : isError
    ? (externalError ?? "Une erreur est survenue, réessayez.")
    : validationError;

  const messageType: MessageType | undefined = isSuccess
    ? "success"
    : isError
    ? "error"
    : validationError
    ? "validation"
    : undefined;

  // -- Classe CSS du wrapper input ------------------------------------------
  /*
   * On pilote la couleur du border via une classe wrapper
   * qui cible [data-bl-input-field] sans modifier Input.type.ts.
   * La validation locale réutilise la classe "error".
   */
  const inputWrapClass = [
    "bl-newsletter__input-wrap",
    isError || messageType === "validation" ? "bl-newsletter__input-wrap--error"   : "",
    isSuccess                               ? "bl-newsletter__input-wrap--success" : "",
  ].filter(Boolean).join(" ");

  // -- IDs a11y -------------------------------------------------------------
  const liveRegionId  = React.useId();
  const descriptionId = React.useId();

  // -- Handlers -------------------------------------------------------------
  const handleChange = (val: string) => {
    setEmail(val);
    if (validationError) setValidationError(undefined);
  };

  const handleSubmit = async () => {
    setValidationError(undefined);

    if (!isValidEmail(email)) {
      setValidationError("Adresse email invalide.");
      return;
    }

    // Statut piloté en externe : on délègue sans toucher l'état interne
    if (externalStatus !== undefined) {
      await onSubmit(email.trim());
      return;
    }

    setInternalStatus("loading");
    try {
      await onSubmit(email.trim());
      setInternalStatus("success");
    } catch {
      setInternalStatus("error");
    }
  };

  // -- Sous-rendus ----------------------------------------------------------

  /**
   * Message de feedback.
   * Stacked → rendu entre Input et Button (voir DOM ci-dessous).
   * Inline  → rendu sous la row.
   */
  const renderMessage = () => {
    if (!statusMessage || !messageType) return null;
    return (
      <p
        className={`bl-newsletter__message bl-newsletter__message--${messageType}`}
        role={messageType !== "success" ? "alert" : "status"}
      >
        {statusMessage}
      </p>
    );
  };

  const renderInput = () => (
    <div className={inputWrapClass}>
      <Input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder={placeholder}
        size={size}
        fullWidth
        disabled={isLoading}
        readOnly={isStatic}
        required
        aria-label="Adresse email"
      />
    </div>
  );

  const renderButton = () => (
    <Button
      variant={buttonVariant}
      size={size}
      isLoading={isLoading}
      disabled={isStatic || isLoading}
      onClick={handleSubmit}
      type="submit"
      fullWidth={layout === "stacked"}
      style={{ flexShrink: 0 }}
      aria-label={isLoading ? "Inscription en cours…" : buttonLabel}
    >
      {buttonLabel}
    </Button>
  );

  // -- Rendu ----------------------------------------------------------------
  return (
    <>
      <style>{styles}</style>

      {/* Live region invisible — lu par les screen readers */}
      <div
        id={liveRegionId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
        }}
      >
        {statusMessage ?? ""}
      </div>

      <div
        className={["bl-newsletter", className].filter(Boolean).join(" ")}
        style={{ width: fullWidth ? "100%" : undefined, ...style }}
        role="region"
        aria-label="Inscription à la newsletter"
      >
        {(title || description) && (
          <div className="bl-newsletter__header">
            {title && (
              <p className="bl-newsletter__title" role="heading" aria-level={2}>
                {title}
              </p>
            )}
            {description && (
              <p className="bl-newsletter__description" id={descriptionId}>
                {description}
              </p>
            )}
          </div>
        )}

        {/*
         * STACKED : Input → Message → Button
         * INLINE  : [Input | Button] → Message sous la row
         */}
        {layout === "stacked" ? (
          <div className="bl-newsletter__row--stacked">
            {renderInput()}
            {renderMessage()}
            {renderButton()}
          </div>
        ) : (
          <>
            <div className="bl-newsletter__row--inline">
              {renderInput()}
              {renderButton()}
            </div>
            {renderMessage()}
          </>
        )}
      </div>
    </>
  );
}