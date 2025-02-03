import clsx from "clsx";
import {
	type KeyboardEvent,
	type KeyboardEventHandler,
	type MouseEvent,
	useEffect,
	useId,
	useMemo,
	useState,
} from "react";

import { Button } from "components";

import FocusLock from "react-focus-lock";
import { handleAccessbilityError } from "utils";

import "./Drawer_shim.css";
import { IconButton } from "components/IconButton";
import { Keys } from "utils";

const propsAreAccessible = (
	title: string | JSX.Element | undefined,
): boolean => {
	if (!title) {
		handleAccessbilityError(
			"Drawer must have a title prop to provide an accessible name.",
		);
		return false;
	}
	return true;
};

type DrawerOverrideProps = {
	title: string | JSX.Element;
	"aria-label"?: never;
	"aria-labelledby"?: never;
};

export interface BaseDrawerProps
	extends Omit<React.HTMLAttributes<HTMLDialogElement>, "title"> {
	children?: React.ReactNode;
	id?: string;
	onBack?: () => void;
	onClose?: () => void;
	onCancel?: (e: MouseEvent<HTMLButtonElement>) => void;
	onApply?: (e: MouseEvent<HTMLButtonElement>) => void;
	disableApplyButton?: boolean;
	hasScrim?: boolean;
	closeOnScrimClick?: boolean;
	ref?: React.Ref<HTMLDivElement>;
	open?: boolean;
	width?: string;
	actions?: React.ReactNode[];
	translations?: {
		apply: string;
		back: string;
		cancel: string;
		close: string;
	};
}

export type DrawerProps = Omit<BaseDrawerProps, "closeOnScrimClick"> &
	DrawerOverrideProps;

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
	ref,
	children,
	className,
	id,
	open = true,
	title,
	onBack,
	onClose,
	onApply,
	onCancel,
	disableApplyButton = false,
	width,
	actions,
	translations,

	...rest
}: DrawerProps) => {
	id = id || useId();

	if (propsAreAccessible(title)) {
		const [widthStyle, setWidthStyle] = useState<object | undefined>({});

		useEffect(() => {
			const drawerClosedStyle = { width, transform: `translate(${width})` };
			const drawerOpenStyle = { width };

			open ? setWidthStyle(drawerOpenStyle) : setWidthStyle(drawerClosedStyle);
		}, [open, width]);

		const closeOnScrimClick = useMemo(() => {
			return !onApply && !actions;
		}, [actions, onApply]);

		return (
			<BasicDrawer
				className={className}
				onBack={onBack}
				onClose={onClose}
				onApply={onApply}
				onCancel={onCancel}
				disableApplyButton={disableApplyButton}
				closeOnScrimClick={closeOnScrimClick}
				open={open}
				id={id}
				title={title}
				style={widthStyle}
				actions={actions}
				translations={translations}
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
	onCancel,
	onApply,
	disableApplyButton,
	hasScrim = true,
	closeOnScrimClick,
	open,
	title,
	style,
	actions,
	translations = {
		apply: "Apply",
		back: "Go back",
		cancel: "Cancel",
		close: "Close drawer",
	},
	...rest
}: {
	children?: React.ReactNode;
	className?: string;
	id?: string;
	onBack?: () => void;
	onClose?: () => void;
	onCancel?: (e: MouseEvent<HTMLButtonElement>) => void;
	onApply?: (e: MouseEvent<HTMLButtonElement>) => void;
	disableApplyButton: boolean;
	hasScrim?: boolean;
	closeOnScrimClick: boolean;
	open: boolean;
	title?: string | JSX.Element;
	style?: object | undefined;
	actions?: React.ReactNode[];
	translations?: {
		apply: string;
		back: string;
		cancel: string;
		close: string;
	};
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
					aria-modal={open}
					style={style}
					aria-labelledby={id}
					className={clsx("neo-drawer", open && "neo-drawer--open", className)}
					{...rest}
				>
					<div className="neo-drawer__header">
						<div className="neo-drawer__header--left">
							{onBack !== undefined && (
								<IconButton
									type="button"
									onClick={onBack}
									variant="tertiary"
									shape="square"
									aria-label={translations?.back}
									icon="chevron-left"
									className="neo-drawer-icon-chevron-left"
								/>
							)}
							<div id={id}>{title}</div>
						</div>

						<div className="neo-drawer__header--right">
							{onClose !== undefined && onCancel === undefined && (
								<IconButton
									type="button"
									onClick={onClose}
									variant="tertiary"
									shape="square"
									aria-label={translations?.close}
									icon="close"
									className="neo-drawer-icon-close"
								/>
							)}
						</div>
					</div>
					<div className="neo-drawer__content">{children}</div>
					{actions && <div className="neo-drawer__actions">{actions}</div>}
					{/* The code below will render the default buttons in the footer section */}
					{(onCancel || onApply) && (
						<div className="neo-drawer__actions">
							{onCancel && (
								<Button type="button" onClick={onCancel} key="cancel-btn" variant="secondary">
									{translations?.cancel}
								</Button>
							)}
							{onApply && (
								<Button
									disabled={disableApplyButton}
									onClick={onApply}
									key="apply-btn"
									type="submit"
								>
									{translations?.apply}
								</Button>
							)}
						</div>
					)}
				</div>
			</FocusLock>
			{hasScrim && open && (
				<div
					onKeyDown={onKeyDownScrimHandler}
					onClick={closeOnScrimClick ? onClose : undefined}
					className="neo-drawer__scrim"
					data-testid="scrim"
				/>
			)}
		</div>
	);
};

Drawer.displayName = "Drawer";
