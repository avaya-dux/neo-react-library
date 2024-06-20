import clsx from "clsx";
import {
	type KeyboardEvent,
	type KeyboardEventHandler,
	useEffect,
	useId,
	useState,
} from "react";

import FocusLock from "react-focus-lock";
import { handleAccessbilityError } from "utils";

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

const propsAreAccessible = (
	title: string | JSX.Element | undefined,
	buttons: JSX.Element[] | null | undefined,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	rest: any,
): boolean => {
	if (!(title || rest["aria-label"] || rest["aria-labelledby"])) {
		handleAccessbilityError(
			"Drawer must have an have an accessible name. Please add a `title`, `aria-label`, or `aria-labelledby` prop.",
		);
		return false;
	}
	if (!title && buttons) {
		handleAccessbilityError(
			"If you add buttons, you must also provide a title",
		);
		return false;
	}
	return true;
};

interface BaseDrawerProps
	extends Omit<React.HTMLAttributes<HTMLDialogElement>, "title"> {
	children?: React.ReactNode;
	id?: string;
	onBack?: () => void;
	onClose?: () => void;
	closeOnScrimClick?: boolean;
	open?: boolean;
	width?: string;
}

export type DrawerProps = BaseDrawerProps & EnforcedAccessibleLabel;

/**
 * The Drawer component is a panel that slides out from the edge of the screen.
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
	closeOnScrimClick = true,
	width,

	...rest
}: DrawerProps) => {
	id = id || useId();
	const buttons = "actions" in rest ? rest.actions : null;

	if (propsAreAccessible(title, buttons, rest) && !buttons) {
		const [widthStyle, setWidthStyle] = useState<object | undefined>({});

		useEffect(() => {
			const drawerClosedStyle = { width, transform: `translate(${width})` };
			const drawerOpenStyle = { width };

			open ? setWidthStyle(drawerOpenStyle) : setWidthStyle(drawerClosedStyle);
		}, [open, width]);

		return (
			<BasicDrawer
				className={className}
				onBack={onBack}
				onClose={onClose}
				closeOnScrimClick={closeOnScrimClick}
				open={open}
				id={id}
				title={title}
				style={widthStyle}
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
	closeOnScrimClick,
	open,
	title,
	style,
	...rest
}: {
	children?: React.ReactNode;
	className?: string;
	id?: string;
	onBack?: () => void;
	onClose?: () => void;
	closeOnScrimClick: boolean;
	open: boolean;
	title?: string | JSX.Element;
	style?: object | undefined;
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
					role="dialog"
					style={style}
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
					onClick={closeOnScrimClick ? onClose : undefined}
					className="neo-drawer__scrim"
				/>
			)}
		</div>
	);
};

Drawer.displayName = "Drawer";
