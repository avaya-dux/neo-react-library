import clsx from "clsx";
import { type ButtonHTMLAttributes, type Ref, forwardRef } from "react";

import { Button } from "components/Button";
import { computeBadge, handleAccessbilityError } from "utils";

import type {
	TopNavIconButtonProps,
	TopNavLinkButtonProps,
} from "../TopNavTypes";

/**
 * Is meant to be used as a button that is nested under a `TopNav`.
 *
 * @example
 * <TopNav>
 *   <TopNav.IconButton icon="settings" aria-label="Settings" badge="12" />
 *   <TopNav.IconButton icon="settings" aria-label="Settings" active />
 * </TopNav>
 *
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-top-navigation--buttons-example
 */
export const TopNavIconButton = forwardRef(
	(
		{
			active = false,
			badge,
			disabled = false,
			className,
			icon,
			...rest
		}: TopNavIconButtonProps,
		ref: Ref<HTMLButtonElement>,
	) => {
		if (!rest["aria-label"]) {
			handleAccessbilityError(
				"A Icon Button must have descriptive text as an aria-label.",
			);
		}

		return (
			<div
				className={clsx(
					"neo-badge__navbutton",
					active && !disabled && "neo-badge__navbutton--active",
					disabled && !active && "neo-badge__navbutton--disabled",
					active && disabled && "neo-badge__navbutton--active-disabled",
				)}
			>
				<button
					className={clsx(
						"neo-badge__navbutton--content neo-btn",
						!!icon && `neo-icon-${icon}`,
						className,
					)}
					disabled={disabled}
					ref={ref}
					{...rest}
				/>

				{badge && (
					<span className="neo-badge__icon" data-badge={computeBadge(badge)} />
				)}
			</div>
		);
	},
);
TopNavIconButton.displayName = "TopNavIconButton";

/**
 * Is meant to be used as a button that is nested under a `TopNav`.
 *
 * @example
 * <TopNav>
 *  <TopNav.LinkButton href="#first">First Item</TopNav.LinkButton>
 *  <TopNav.LinkButton href="#second" active>Second Item</TopNav.LinkButton>
 * </TopNav>
 *
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-top-navigation--buttons-example
 */
export const TopNavLinkButton = forwardRef(
	(
		{
			active = false,
			className,
			disabled = false,
			href,
			children,
			...rest
		}: TopNavLinkButtonProps,
		ref: Ref<HTMLAnchorElement>,
	) => {
		if (!rest["aria-label"] && !children) {
			handleAccessbilityError(
				"Descriptive text must be provided as either `children` as text, or as an aria-label.",
			);
		}

		return href && !disabled ? (
			<a
				className={clsx(
					"neo-nav-link-btn",
					active && "neo-nav-link-btn-active",
					className,
				)}
				href={href}
				ref={ref}
				{...rest}
			>
				{children}
			</a>
		) : (
			<Button
				className={clsx(
					"neo-nav-link-btn",
					active && "neo-nav-link-btn-active",
					className,
				)}
				disabled={disabled}
				variant="tertiary"
				ref={ref as Ref<HTMLButtonElement>}
				{...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
			>
				{children}
			</Button>
		);
	},
);
TopNavLinkButton.displayName = "TopNavLinkButton";
