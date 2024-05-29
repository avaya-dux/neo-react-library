import clsx from "clsx";
import {
	type ReactNode,
	forwardRef,
	useCallback,
	useEffect,
	useId,
} from "react";
import ReactDOM from "react-dom";
import FocusLock from "react-focus-lock";

import { Button } from "components/Button";

import "./BasicModal_shim.css";
import { Keys } from "utils";

export interface BasicModalProps {
	actions?: JSX.Element[];
	children?: ReactNode;
	closeButtonLabel?: string;
	onClose: () => void;
	open: boolean;
	title: string;
	className?: string;
	id?: string;
}

export const BasicModal = forwardRef(
	(
		{
			className,
			children,
			closeButtonLabel = "Close",
			onClose,
			open,
			title,
			id,
			...rest
		}: BasicModalProps,
		ref: React.Ref<HTMLDivElement>,
	) => {
		const generatedId = useId();
		id = id || generatedId;
		const buttons = "actions" in rest ? rest.actions : null;

		const onKeyDown = useCallback(
			(e: KeyboardEvent) => {
				if (e.key === Keys.ESC && open) {
					onClose();
				}
			},
			[open, onClose],
		);

		useEffect(() => {
			document.addEventListener("keyup", onKeyDown, false);
			return () => {
				document.removeEventListener("keyup", onKeyDown, false);
			};
		}, [onKeyDown]);

		const modal = (
			<FocusLock>
				<div ref={ref} id={id} className={clsx("neo-modal--active", className)}>
					<div className="neo-modal__background" />
					<div
						className="neo-modal__content"
						aria-modal="true"
						aria-labelledby={title}
						role="dialog"
					>
						<div className="neo-modal__header">
							<h4>{title}</h4>
						</div>
						<div className="neo-modal__body">
							<div className="neo-modal__message">{children}</div>
						</div>
						<div className="neo-modal__footer">
							<Button
								variant="secondary"
								data-dismiss="modal"
								onClick={onClose}
							>
								{closeButtonLabel}
							</Button>
							{buttons}
						</div>
					</div>
				</div>
			</FocusLock>
		);
		return open ? ReactDOM.createPortal(modal, document.body) : null;
	},
);

BasicModal.displayName = "BasicModal";
