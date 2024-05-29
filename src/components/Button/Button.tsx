import { forwardRef, useMemo } from "react";

import { Spinner } from "components";
import {
	type IconNamesType,
	computeBadge,
	getAnimationClass,
	getBadgeClass,
	getIconClass,
	getSizeClass,
	getVariantClasses,
	rootBtnClass,
	showSpinner,
} from "utils";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	animation?: "none" | "spinner" | "pulse";
	badge?: string;
	icon?: IconNamesType;
	size?: "default" | "compact" | "wide";
	status?: "default" | "success" | "alert" | "warning" | "info" | "event";
	variant?: "primary" | "secondary" | "tertiary";
}

/**
 * The `Button` component is used to trigger an action or event, such as submitting a form,
 * opening a dialog, canceling an action, or performing a delete operation.
 *
 * @example
 * <Button>Example</Button>
 * <Button variant="secondary">Cancel</Button>
 * <Button animation="spinner" disabled>Loading</Button>
 * <Button size="wide">Submit</Button>
 *
 * @see https://design.avayacloud.com/components/web/buttons-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-button
 */
export const Button = forwardRef(
	(
		{
			animation = "none",
			badge,
			children,
			className,
			icon,
			size = "default",
			status = "default",
			variant = "primary",
			type = "button",
			...rest
		}: ButtonProps,
		ref: React.Ref<HTMLButtonElement>,
	) => {
		const displaySpinner = useMemo(() => showSpinner(animation), [animation]);

		const buttonClasses = useMemo(() => {
			const result = [
				rootBtnClass,
				getSizeClass(size),
				...getVariantClasses("none", variant, status),
			];

			const animationClass = getAnimationClass(animation);
			if (animationClass) {
				result.push(animationClass);
			}

			const badgeClass = getBadgeClass(badge);
			if (badgeClass) {
				result.push(badgeClass);
			}

			if (icon) {
				result.push(getIconClass(icon));
			}

			if (className) {
				result.push(className);
			}

			return result.join(" ");
		}, [animation, badge, size, status, variant, icon, className]);

		return (
			<button
				className={buttonClasses}
				data-badge={computeBadge(badge)}
				type={type}
				ref={ref}
				{...rest}
			>
				{displaySpinner && <Spinner />}
				{children}
			</button>
		);
	},
);
Button.displayName = "Button";
