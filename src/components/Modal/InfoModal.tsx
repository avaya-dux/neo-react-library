import { ReactNode, useId } from "react";
import ReactDOM from "react-dom";

export interface InfoModalProps {
  children?: ReactNode;
  id?: string;
  onClose: React.ReactEventHandler<HTMLButtonElement>;
  open: boolean;
  title: string | ReactNode;
}

/**
 * Can be used to build a modal with a well defined structure for child components
 *
 * @example
 * <InfoModal
 *  title="This is a modal title"
 *  open={showModal}
 *  onClose={onModalCloseHandler}
 * />
 *   <div> This is the main content for the info modal </div>
 * </InfoModal>

 * @see https://design.avayacloud.com/components/web/modal-web
 */
export const InfoModal = ({
  children,
  id = useId(),
  onClose,
  open = false,
  title,
}: InfoModalProps) => {
  if (!onClose) {
    console.error("onClose prop is required.");
  }

  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <div id={id} data-testid={id} className="neo-modal--active">
      <div className="neo-modal__background"></div>
      <div
        className="neo-modal__content"
        aria-label="This is an informational modal" // TODO: What should this value be? Ask Matt or Terri.
        aria-modal="true"
        role="dialog"
      >
        <div className="neo-modal__info-close">
          <button
            aria-label="close" // TODO: Localize this field.
            className="neo-close"
            onClick={onClose}
          />
        </div>
        {title && (
          <div className="neo-modal__header">
            <h4>{title}</h4>
          </div>
        )}
        <div className="neo-modal__body">
          <div className="neo-modal__message">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};
