import clsx from "clsx";
import { type KeyboardEvent, type KeyboardEventHandler, useId } from "react";

import { handleAccessbilityError } from "utils";
import FocusLock from "react-focus-lock";

import "./Drawer_shim.css";
import { IconButton } from "components/IconButton";
import { Keys } from "utils";

type EnforcedAccessibleLabel =
	| {
			title: string | JSX.Element;
			actions?: JSX.Element[];
			"aria-label"?: string;
			"aria-labelledby"?: string;
	  }
	| {
			title?: string | JSX.Element;
			"aria-label": string;
			"aria-labelledby"?: string;
	  }
	| {
			title?: string | JSX.Element;
			"aria-label"?: string;
			"aria-labelledby": string;
	  };

interface BaseDrawerProps
	extends Omit<React.HTMLAttributes<HTMLDialogElement>, "title"> {
	children?: React.ReactNode;
	id?: string;
	onBack?: () => void;
	onClose?: () => void;
	closeOnBackgroundClick?: boolean;
	open?: boolean;
}

export type DrawerProps = BaseDrawerProps & EnforcedAccessibleLabel;

/**
 * This component is used as a container of components that are dismisable.
 *
 * @example
 * <Drawer open={isOpen} title="Mini Form">
 *  <Form>
 *   <TextInput />
 *   <TextInput />
 *  </Form>
 * </Drawer>
 *
 * @see https://design.avayacloud.com/components/web/drawer-web
 */
export const Drawer = ({
	children,
	className,
	id,
	open = true,
	title,
	onBack,
	onClose,
	closeOnBackgroundClick = true,

	...rest
}: DrawerProps) => {
	const generatedId = useId();
	id = id || generatedId;
	const buttons = "actions" in rest ? rest.actions : null;

	if (!(title || rest["aria-label"] || rest["aria-labelledby"])) {
		handleAccessbilityError(
			"Drawer must have an have an accessible name. Please add a `title`, `aria-label`, or `aria-labelledby` prop.",
		);
	} else if (!title && buttons) {
		handleAccessbilityError(
			"If you add buttons, you must also provide a title",
		);
	} else if (!buttons) {
		return (
			<BasicDrawer
				className={className}
				onBack={onBack}
				onClose={onClose}
				closeOnBackgroundClick={closeOnBackgroundClick}
				open={open}
				id={id}
				title={title}
				{...rest}
			>
				{children}
			</BasicDrawer>
		);
	}
};

const BasicDrawer = ({
	children,
	className,
	id,
	onBack,
	onClose,
	closeOnBackgroundClick,
	open,
	title,
	...rest
}: {
	children?: React.ReactNode;
	className?: string;
	id?: string;
	onBack?: () => void;
	onClose?: () => void;
	closeOnBackgroundClick: boolean;
	open: boolean;
	title?: string | JSX.Element;
}) => {
	const onKeyDownScrimHandler: KeyboardEventHandler = (
		e: KeyboardEvent<HTMLButtonElement>,
	) => {
		if (onClose && e.key !== Keys.ESC) {
			onClose();
		}
	};

	return (
		<div>
			<FocusLock disabled={!open}>
				<div
					aria-labelledby={id}
					className={clsx(
						"neo-drawer",
						open && "neo-drawer--isOpen",
						className,
					)}
					{...rest}
				>
					<div className="neo-drawer__header">
						<div className="neo-drawer__header--left">
							{onBack !== undefined && (
								<IconButton
									onClick={onBack}
									variant="tertiary"
									shape="square"
									aria-label="back" // TODO: localize this aria-label
									icon="chevron-left"
									className="neo-drawer-icon-chevron-left"
								/>
							)}
							<div id={id}>{title}</div>
						</div>

						<div className="neo-drawer__header--right">
							{onClose !== undefined && (
								<IconButton
									onClick={onClose}
									variant="tertiary"
									shape="square"
									aria-label="close" // TODO: localize this aria-label
									icon="close"
									className="neo-drawer-icon-close"
								/>
							)}
						</div>
					</div>
					{children}
				</div>
			</FocusLock>
			{open && (
				<div
					onKeyDown={onKeyDownScrimHandler}
					onClick={closeOnBackgroundClick ? onClose : undefined}
					className="neo-drawer__scrim"
				/>
			)}
		</div>
	);
};

Drawer.displayName = "Drawer";
