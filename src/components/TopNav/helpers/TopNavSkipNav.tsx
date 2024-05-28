import { handleAccessbilityError } from "utils";

import { TopNavSkipNavProps } from "../TopNavTypes";

/**
 * Moves the user to the main content of the page.
 * The content inside a link should indicate where the link goes, even out of context.
 *
 * @example
 * <TopNav logo={Logo} skipNav={<TopNav.SkipNav href="#main-content">Skip To Main Content</TopNav.SkipNav>}>
 *   <TopNav.LinkButton href="/whats-new">Link</TopNav.LinkButton>
 * </TopNav>
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#accessibility
 */
export const TopNavSkipNav = ({
	children,
	href,
	...rest
}: TopNavSkipNavProps) => {
	if (!children && !rest["aria-label"]) {
		handleAccessbilityError(
			"A Skip Navigation link must have descriptive text. Either as children or an aria-label.",
		);
	}

	return (
		<a className="neo-skipnav" href={href} {...rest}>
			{children}
		</a>
	);
};
