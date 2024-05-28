import { Fragment, type ReactElement } from "react";

import type { ButtonProps } from "components/Button";

type RequiredAttributes = Required<
	Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">
>;

type RestAttributes = Omit<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	"href"
>;

export interface BreadcrumbsLink extends RequiredAttributes, RestAttributes {
	text: string;
}

export interface BreadcrumbsProps
	extends Pick<React.HTMLAttributes<HTMLDivElement>, "className" | "role"> {
	links?: BreadcrumbsLink[];
	currentPageLink: BreadcrumbsLink;
	description?: string;
	buttons?: ReactElement<ButtonProps>[];
}

export const getNavCssName = (cssName?: string): string => {
	return ["neo-breadcrumbs", ...[cssName]].join(" ").trim();
};

export const Breadcrumbs = ({
	links = [],
	currentPageLink,
	className: cssName,
	description,
	buttons = [],
	...rest
}: BreadcrumbsProps) => {
	const currentPageIndex = links.length;
	const {
		href: hrefCurrentPageLink,
		text: textCurrentPageLink,
		...otherLinkAttributes
	} = currentPageLink;

	return (
		<nav className={getNavCssName(cssName)} {...rest}>
			<div className="neo-breadcrumbs__wrapper">
				<ol>
					{links.map((link, index) => {
						const { href, text, ...rest } = link;
						return (
							<li className="neo-breadcrumbs__link" key={index}>
								<a href={href} {...rest}>
									{text}
								</a>
							</li>
						);
					})}
					<li
						className="neo-breadcrumbs__link neo-breadcrumbs__link--current"
						key={currentPageIndex}
					>
						<a
							href={hrefCurrentPageLink}
							{...otherLinkAttributes}
							aria-current="page"
						>
							{textCurrentPageLink}
						</a>
					</li>
				</ol>
				{!!description && (
					<p className="neo-breadcrumbs__description">{description}</p>
				)}
			</div>

			<div className="neo-breadcrumbs__actions">
				{buttons.map((button, index) => (
					<Fragment key={`breadcrumbs_button_${index}`}>{button}</Fragment>
				))}
			</div>
		</nav>
	);
};

Breadcrumbs.displayName = "Breadcrumbs";
