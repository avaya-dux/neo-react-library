import clsx from "clsx";
import { forwardRef, useMemo } from "react";

import { Spinner } from "components/Spinner";
import {
	type IconNamesType,
	computeBadge,
	getAnimationClass,
	getBadgeClass,
	getSizeClass,
	getVariantClasses,
	handleAccessbilityError,
	rootBtnClass,
	showSpinner,
} from "utils";
import "./IconButton_shim.css";

export interface IconButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
	"aria-label": string;
	animation?: "none" | "spinner" | "pulse";
	badge?: string;
	icon: IconNamesType;
	shape?: "circle" | "square";
	size?: "default" | "compact" | "wide" | "large";
	iconSize?: "sm" | "md" | "lg";
	status?: "default" | "success" | "alert" | "warning" | "info" | "event";
	variant?: "primary" | "secondary" | "tertiary";
}

//https://neo-react-library-storybook.netlify.app/?path=/story/components-iconbutton

/**
 * IconButton is a button that contains an icon and has no text
 *
 * @example
 * <IconButton aria-label="add item" icon="add" />
 * <IconButton aria-label="add item" icon="add" shape="circle" />
 *
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-iconbutton
 */
export const IconButton = forwardRef(
	(
		{
			"aria-label": ariaLabel,
			animation = "none",
			badge,
			className,
			icon,
			shape = "square",
			size = "default",
			iconSize = "sm",
			status = "default",
			variant = "primary",
			...rest
		}: IconButtonProps,
		ref: React.Ref<HTMLButtonElement>,
	) => {
		if (!ariaLabel) {
			handleAccessbilityError(
				"`aria-label` is REQUIRED by accessibility standards.",
			);
		}

		const displaySpinner = useMemo(() => showSpinner(animation), [animation]);

		const buttonClasses = useMemo(() => {
			const sizeOrShapeClass =
				size === "wide"
					? `${rootBtnClass}-${size}`
					: `${rootBtnClass}-${shape}`;

			const result = [
				rootBtnClass,
				sizeOrShapeClass,
				getSizeClass(size),
				...getVariantClasses(shape, variant, status),
			];

			const animationClass = getAnimationClass(animation);
			if (animationClass) {
				result.push(animationClass);
			}

			const badgeClass = getBadgeClass(badge);
			if (badgeClass) {
				result.push(badgeClass);
			}

			if (className) {
				result.push(className);
			}

			return result.join(" ");
		}, [animation, badge, shape, size, status, variant, className]);

		return (
			<button
				aria-label={ariaLabel}
				className={buttonClasses}
				data-badge={computeBadge(badge)}
				ref={ref}
				{...rest}
			>
				{displaySpinner ? (
					<Spinner style={{ color: "inherit" }} />
				) : (
					<span
						className={clsx(
							`neo-icon-${icon}`,
							iconSize === "lg" && "neo-icon-state--large",
							iconSize === "md" && "neo-icon--medium",
						)}
					/>
				)}
			</button>
		);
	},
);
IconButton.displayName = "IconButton";
