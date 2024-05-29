import clsx from "clsx";
import { type HTMLAttributes, type MouseEventHandler, useState } from "react";

import { Avatar } from "components/Avatar";
import type { IconNamesType } from "utils";

export interface ChipProps
	extends Exclude<HTMLAttributes<HTMLDivElement>, "onClick"> {
	avatarInitials?: string;
	children: string;
	closable?: boolean;
	closeButtonAriaLabel?: string;
	disabled?: boolean;
	icon?: IconNamesType;
	onClose?: MouseEventHandler<HTMLButtonElement>;
	variant?: "alert" | "default" | "info" | "success" | "warning";
}

/**
 * Used to display a single chip
 *
 * @example
 * <Chip>default</Chip>
 * <Chip disabled>default</Chip>
 * <Chip avatarInitials="TJ">default</Chip>
 * <Chip variant="info" icon="info" closable>default</Chip>
 *
 * @see https://design.avayacloud.com/components/web/chip-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-chips
 */
export const Chip = ({
	avatarInitials,
	children,
	className,
	closable = false,
	closeButtonAriaLabel = "Close",
	disabled = false,
	icon,
	onClose,
	variant = "default",
	...rest
}: ChipProps) => {
	const [closed, setClosed] = useState(false);

	if (avatarInitials && icon) {
		throw new Error(
			"Chip cannot have both an Avatar and an Icon, it must have one or the other.",
		);
	}

	return closed ? (
		<></>
	) : (
		<div
			className={clsx(
				`neo-chip neo-chip--${variant}`,
				disabled && `neo-chip--${variant}--disabled`,
				icon && `neo-icon-${icon}`,
				closable && `neo-chip--close neo-chip--close--${variant}`,
				className,
			)}
			{...rest}
		>
			{avatarInitials && <Avatar initials={avatarInitials} size="sm" />}
			{children}
			{closable && (
				<button
					type="button"
					className="neo-close neo-close--clear"
					aria-label={closeButtonAriaLabel}
					// TO-DO: NEO-1549: Add the below styling rule in the CSS library
					style={{ pointerEvents: disabled ? "none" : "initial" }}
					disabled={disabled}
					onClick={(e) => {
						setClosed(true);
						onClose?.(e);
					}}
				/>
			)}
		</div>
	);
};

Chip.displayName = "Chip";
