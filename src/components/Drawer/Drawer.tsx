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
			actions?: React.ReactNode[];
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
	actionNodes: React.ReactNode[] | undefined,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	rest: any,
): boolean => {
	if (!(title || rest["aria-label"] || rest["aria-labelledby"])) {
		handleAccessbilityError(
			"Drawer must have an have an accessible name. Please add a `title`, `aria-label`, or `aria-labelledby` prop.",
		);
		return false;
	}
	if (!title && actionNodes) {
		handleAccessbilityError(
			"If you add actions, you must also provide a title",
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
	actions?: React.ReactNode[];
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
	actions,

	...rest
}: DrawerProps) => {
	id = id || useId();

	if (propsAreAccessible(title, actions, rest)) {
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
				actions={actions}
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
	actions,
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
	actions?: React.ReactNode[];
}) => {
	const onKeyDownScrimHandler: KeyboardEventHandler = (
		e: KeyboardEvent<HTMLButtonElement>,
	) => {
		if (onClose && e.key === Keys.ESC) {
			onClose();
		}
	};

	return (
		<div>
			<FocusLock disabled={!open}>
				<div
					onKeyDown={onKeyDownScrimHandler}
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
					<div className="neo-drawer__content">{children}</div>
					{actions && <div className="neo-drawer__actions">{actions}</div>}
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
