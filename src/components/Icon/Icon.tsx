import clsx from "clsx";

import { handleAccessbilityError } from "utils";

import type { IconNamesType } from "utils/icons";
import { getIconClass } from "utils/icons";

// import { SizeType } from "utils/size"; TODO https://jira.forge.avaya.com/browse/NEO-645
type SizeType = "sm" | "md" | "lg";
export interface IconProps extends React.BaseHTMLAttributes<HTMLElement> {
	"aria-label": string;
	className?: string;
	icon: IconNamesType;
	notification?: boolean;
	size?: SizeType;
	status?:
		| "available"
		| "away"
		| "busy"
		| "do-not-disturb"
		| "offline"
		| "lock"
		| "warning"
		| "missed"
		| "connected"
		| "inbound"
		| "outbound";
}

/**
 * The `Icon` component is used to display an icon.
 *
 * @example
 * <Icon icon="available-filled" aria-label="Check Icon" />
 * <Icon icon="check" aria-label="Check Icon" size="lg" />
 */
export const Icon: React.FC<IconProps> = ({
	className,
	icon,
	notification = false,
	size,
	status,
	...rest
}: IconProps) => {
	if (!rest["aria-label"]) {
		handleAccessbilityError(
			"A descriptive label is required for screen readers to identify the button's purpose",
		);
	}

	if (status !== undefined && size === "sm") {
		console.error(
			"Status icons are not supported in small size. Size set to medium.",
		);
		size = "md";
	}

	let sizing = "";
	if (status !== undefined && size === "lg") {
		sizing = "neo-icon-state--large";
	} else if (status === undefined) {
		const sizeCssWord =
			size === "lg" ? "large" : size === "md" ? "medium" : "small";
		sizing = `neo-icon--${sizeCssWord}`;
	}

	return (
		<span
			role="img"
			{...rest}
			className={clsx(
				icon && getIconClass(icon),
				sizing,
				status !== undefined && "neo-icon-state",
				status !== undefined && `neo-icon-state--${status}`,
				className,
			)}
		>
			{notification && <span className="neo-badge" />}
		</span>
	);
};

Icon.displayName = "Icon";
