import clsx from "clsx";
import { forwardRef, type ReactNode, useId } from "react";
import ReactDOM from "react-dom";

import "./BasicModal/BasicModal_shim.css";

export interface InfoModalProps {
	children?: ReactNode;
	className?: string;
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
export const InfoModal = forwardRef(
	(
		{ children, className, id, onClose, open = false, title }: InfoModalProps,
		ref: React.Ref<HTMLDivElement>,
	) => {
		const generatedId = useId();
		id = id || generatedId;
		const titleId = id + "-title";
		if (!onClose) {
			console.error("onClose prop is required.");
		}

		if (!open) {
			return null;
		}

		return ReactDOM.createPortal(
			<div
				id={id}
				data-testid={id}
				className={clsx("neo-modal--active", className)}
				ref={ref}
			>
				<div className="neo-modal__background"></div>
				<div
					className="neo-modal__content"
					aria-labelledby={titleId}
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
							<h4 id={titleId}>{title}</h4>
						</div>
					)}
					<div className="neo-modal__body">
						<div className="neo-modal__message">{children}</div>
					</div>
				</div>
			</div>,
			document.body,
		);
	},
);
InfoModal.displayName = "InfoModal";
