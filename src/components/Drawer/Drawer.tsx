import clsx from "clsx";
import { useId } from "react";

import { handleAccessbilityError, useIsInitialRender } from "utils";

import "./Drawer_shim.css";
import { IconButton } from "components/IconButton";

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
	open?: boolean;
	slide?: boolean;
}

export type DrawerProps = BaseDrawerProps & EnforcedAccessibleLabel;

/**
 * This component is used as a container of components that are dismisable.
 *
 * @example
 * <Drawer open={isOpen} slide={true} title="Mini Form">
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
	slide = true,
	title,
	onBack,
	onClose,

	...rest
}: DrawerProps) => {
	const generatedId = useId();
	id = id || generatedId;
	const initialRender = useIsInitialRender();
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
				open={open}
				id={id}
				initialRender={initialRender}
				slide={slide}
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
	initialRender,
	onBack,
	onClose,
	open,
	slide,
	title,
	...rest
}: {
	children?: React.ReactNode;
	className?: string;
	id?: string;
	initialRender: boolean;
	onBack?: () => void;
	onClose?: () => void;
	open: boolean;
	slide: boolean;
	title?: string | JSX.Element;
}) => {
	return (
		<div
			aria-labelledby={id}
			className={clsx(
				"neo-drawer",
				slide && "neo-slide",
				slide && open && "drawer-horizontal-slide-in-shim",
				slide && !open && "drawer-horizontal-slide-out-shim",
				!open && (initialRender || !slide) && "neo-display-none",
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
	);
};

Drawer.displayName = "Drawer";
